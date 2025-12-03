import { useEffect, useState, useMemo, useRef } from 'react';
import { Search, Send, ArrowLeft, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Pour le scroll automatique vers le bas
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const location = useLocation(); 
  const token = localStorage.getItem("token");
  // On suppose que tu stockes l'ID du user connecté. Sinon il faudra le décoder du token.
  const currentUserId = parseInt(localStorage.getItem("user_id") || "0"); 

  // 1. Charger les messages (GET)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/messages/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data.results || []);
      } catch (err) {
        console.error("Erreur chargement messages :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // 2. Grouper les messages par conversation (Par Propriété)
  const groupedConversations = useMemo(() => {
    const groups = messages.reduce((acc: any, msg) => {
      // L'API renvoie "property" (int) et "property_detail" (obj)
      const propId = msg.property; 
      
      // Déterminer qui est l'autre personne
      const isMeSender = msg.sender.id === currentUserId;
      const otherUser = isMeSender ? msg.recipient : msg.sender;

      if (!acc[propId]) {
        acc[propId] = {
          id: propId, // ID unique de la conversation = ID de la propriété
          property: msg.property_detail, // Objet complet pour titre/image
          otherUser: otherUser,
          messages: [],
          lastMessage: '',
          lastMessageTime: ''
        };
      }
      
      acc[propId].messages.push(msg);
      
      // Mettre à jour le dernier message pour le tri
      // On suppose que l'API renvoie dans l'ordre, sinon on compare les dates
      acc[propId].lastMessage = msg.content;
      acc[propId].lastMessageTime = msg.sent_at;
      
      return acc;
    }, {});

    // On transforme l'objet en tableau et on trie par date récente
    return Object.values(groups).sort((a: any, b: any) => 
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
  }, [messages, currentUserId]);


  // 3. Gérer l'arrivée depuis l'annonce (PropertyDetail)
  useEffect(() => {
    if (!loading && location.state) {
      const { propertyId, propertyTitle, propertyImage, landlordName } = location.state;
      
      // Chercher si la conversation existe déjà
      const existingConv = groupedConversations.find((c: any) => c.id === propertyId);

      if (existingConv) {
        setSelectedConversation(existingConv);
      } else {
        // CRÉATION D'UNE CONVERSATION TEMPORAIRE (Optimiste)
        // Elle sert juste à afficher l'interface avant le premier message
        setSelectedConversation({
          id: propertyId,
          isNew: true, // Marqueur important
          property: {
            id: propertyId,
            title: propertyTitle,
            primary_photo: { url: propertyImage } // Adapter selon ton objet photo
          },
          otherUser: {
            full_name: landlordName,
            role: "LANDLORD" // On suppose qu'on écrit au proprio
          },
          messages: [] 
        });
      }
      // Nettoyer l'historique pour ne pas rebooter la conv si on refresh
      window.history.replaceState({}, document.title);
    }
  }, [loading, location.state, groupedConversations]);

  // Scroll automatique vers le bas quand un message arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);


  // 4. Envoyer un message (POST API CORRIGÉ)
  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    const textToSend = messageText;
    setMessageText(''); // Clear input immédiat

    // Message temporaire pour l'affichage immédiat
    const tempMessage = {
        id: `temp-${Date.now()}`,
        content: textToSend,
        sent_at: new Date().toISOString(),
        sender: { id: currentUserId, role: "TENANT" }, // On assume qu'on est le locataire qui écrit
        isTemp: true
    };

    // Mise à jour optimiste de l'UI
    const updatedMessages = [...selectedConversation.messages, tempMessage];
    setSelectedConversation({ ...selectedConversation, messages: updatedMessages });

    try {
      // --- CORRECTION MAJEURE ICI SELON TA DOC API ---
      const payload = {
        property_id: selectedConversation.property.id || selectedConversation.id, // L'ID de la propriété
        subject: `Question sur : ${selectedConversation.property.title}`, // Sujet obligatoire ou conseillé
        content: textToSend
      };

      const res = await axios.post('http://127.0.0.1:8000/api/messages/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Si succès, on remplace le message temporaire par le vrai message du serveur
      // Ou plus simple : on ajoute le message reçu à la liste globale
      setMessages((prev) => [...prev, res.data]);
      
      // Si c'était une nouvelle conversation, elle devient "réelle"
      if (selectedConversation.isNew) {
         // L'ajout dans setMessages va déclencher le useMemo et recréer la conversation proprement
         // On laisse le useEffect/useMemo faire le travail de mise à jour
      }

    } catch (err) {
      console.error("Erreur envoi :", err);
      alert("Erreur lors de l'envoi du message.");
      // Idéalement : retirer le message temporaire ici
    }
  };

  // --- RENDU (Similaire à avant, ajusté pour ton API) ---
  
  // Formatage date
  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Filtrage recherche
  const filteredList = (groupedConversations as any[]).filter((c: any) => 
     c.otherUser.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="pt-20 h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="max-w-7xl w-full mx-auto h-full flex gap-4 p-4">
        
        {/* LISTE DES CONVERSATIONS (Gauche) */}
        <div className={`w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col
             ${selectedConversation ? "hidden lg:flex" : "flex"}`}>
            
            <div className="p-4 border-b">
                <div className="bg-gray-100 flex items-center px-3 py-2 rounded-xl">
                    <Search className="text-gray-400 w-5 h-5"/>
                    <input 
                        className="bg-transparent border-none outline-none ml-2 text-sm w-full"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Affichage spécial si c'est une nouvelle conv temporaire */}
                {selectedConversation?.isNew && (
                    <div className="bg-blue-50 p-4 border-l-4 border-blue-500 cursor-pointer">
                        <p className="font-bold text-gray-800">{selectedConversation.otherUser.full_name}</p>
                        <p className="text-xs text-blue-600">Nouvelle conversation...</p>
                    </div>
                )}

                {filteredList.map((conv: any) => (
                    <div 
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer flex gap-3
                        ${selectedConversation?.id === conv.id ? "bg-blue-50 border-l-4 border-l-blue-500" : "border-l-4 border-l-transparent"}`}
                    >
                        <img 
                           src={conv.property.primary_photo?.url || "/placeholder.jpg"} 
                           className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                        />
                        <div className="overflow-hidden flex-1">
                            <div className="flex justify-between">
                                <span className="font-semibold truncate">{conv.otherUser.full_name}</span>
                                <span className="text-xs text-gray-400">{formatTime(conv.lastMessageTime)}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{conv.property.title}</p>
                            <p className="text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* ZONE DE CHAT (Droite) */}
        <div className={`flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden
             ${selectedConversation ? "flex" : "hidden lg:flex"}`}>
            
            {!selectedConversation ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                    <MessageSquare size={50} className="mb-4 opacity-20"/>
                    <p>Sélectionnez une conversation</p>
                </div>
            ) : (
                <>
                    {/* Header Chat */}
                    <div className="p-4 border-b flex items-center gap-3 bg-white z-10 shadow-sm">
                        <button onClick={() => setSelectedConversation(null)} className="lg:hidden">
                            <ArrowLeft />
                        </button>
                        <img 
                           src={selectedConversation.property.primary_photo?.url || "/placeholder.jpg"} 
                           className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                            <h3 className="font-bold text-gray-800">{selectedConversation.otherUser.full_name}</h3>
                            <p className="text-xs text-blue-600 truncate max-w-[200px]">
                                {selectedConversation.property.title}
                            </p>
                        </div>
                    </div>

                    {/* Zone Messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                        {selectedConversation.messages.map((msg: any, idx: number) => {
                            // Vérifie si le message vient de moi
                            const isMe = msg.sender.id === currentUserId || msg.isTemp;
                            return (
                                <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm
                                        ${isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 border rounded-tl-none"}`}>
                                        {msg.content}
                                        <div className={`text-[10px] mt-1 text-right ${isMe ? "text-blue-100" : "text-gray-400"}`}>
                                            {formatTime(msg.sent_at)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Div invisible pour scroller automatiquement */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t flex gap-2">
                        <input 
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200 transition"
                            placeholder="Votre message..."
                            value={messageText}
                            onChange={e => setMessageText(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!messageText.trim()}
                            className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 disabled:opacity-50 transition shadow-md">
                            <Send size={20} />
                        </button>
                    </div>
                </>
            )}
        </div>

      </div>
    </div>
  );
}