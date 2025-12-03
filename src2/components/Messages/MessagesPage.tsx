import { useState } from 'react';
import { Search, Send, ArrowLeft, MessageSquare } from 'lucide-react';
import { Conversation, Message } from '../../types';

const mockConversations: Conversation[] = [
  {
    id: '1',
    listingId: '1',
    listingTitle: 'Appartement moderne avec vue',
    listingImage: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=100',
    otherUserId: '2',
    otherUserName: 'Marie Dubois',
    otherUserAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'Le logement est-il disponible ce week-end ?',
    lastMessageTime: new Date('2025-10-10T14:30:00'),
    unreadCount: 2
  },
  {
    id: '2',
    listingId: '2',
    listingTitle: 'Villa luxueuse avec piscine',
    listingImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=100',
    otherUserId: '3',
    otherUserName: 'Pierre Martin',
    otherUserAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'Merci pour votre réponse rapide !',
    lastMessageTime: new Date('2025-10-09T16:45:00'),
    unreadCount: 0
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    listingId: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Bonjour, je suis intéressé par votre logement.',
    timestamp: new Date('2025-10-10T14:00:00'),
    read: true
  },
  {
    id: '2',
    listingId: '1',
    senderId: '2',
    receiverId: '1',
    content: 'Bonjour ! Je serais ravi de vous accueillir. Quelles sont vos dates ?',
    timestamp: new Date('2025-10-10T14:15:00'),
    read: true
  },
  {
    id: '3',
    listingId: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Le logement est-il disponible ce week-end ?',
    timestamp: new Date('2025-10-10T14:30:00'),
    read: false
  }
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.otherUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.listingTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Hier';
    } else if (days < 7) {
      return `${days}j`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Messages
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          <div className={`
            backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col
            ${selectedConversation ? 'hidden lg:flex' : 'flex'}
          `}>
            <div className="p-4 border-b border-white/10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 flex items-center px-4 py-2">
                  <Search className="w-4 h-4 text-cyan-400 mr-2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`
                      w-full p-4 flex items-start space-x-3 transition-all border-b border-white/5
                      ${selectedConversation?.id === conv.id
                        ? 'bg-cyan-500/10 border-l-2 border-l-cyan-400'
                        : 'hover:bg-white/5'
                      }
                    `}
                  >
                    <img
                      src={conv.otherUserAvatar}
                      alt={conv.otherUserName}
                      className="w-12 h-12 rounded-full border-2 border-white/10"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white text-sm truncate">
                          {conv.otherUserName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTime(conv.lastMessageTime)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1 truncate">{conv.listingTitle}</div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400 truncate flex-1">
                          {conv.lastMessage}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="ml-2 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Aucune conversation
                </div>
              )}
            </div>
          </div>

          <div className={`
            lg:col-span-2 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col
            ${selectedConversation ? 'flex' : 'hidden lg:flex'}
          `}>
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-white/10 flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  <img
                    src={selectedConversation.listingImage}
                    alt={selectedConversation.listingTitle}
                    className="w-12 h-12 rounded-lg object-cover border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">
                      {selectedConversation.otherUserName}
                    </div>
                    <div className="text-sm text-gray-400 truncate">
                      {selectedConversation.listingTitle}
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {mockMessages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          max-w-[70%] rounded-2xl px-4 py-2
                          ${message.senderId === '1'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-sm'
                            : 'backdrop-blur-sm bg-white/10 text-white rounded-bl-sm'
                          }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 flex items-center px-4 py-2">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Écrire un message..."
                        className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="ml-2 p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                      >
                        <Send className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
                    <MessageSquare className="relative w-16 h-16 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Sélectionnez une conversation
                  </h3>
                  <p className="text-gray-500">
                    Choisissez une conversation pour commencer à discuter
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
