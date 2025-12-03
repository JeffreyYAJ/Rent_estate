import { useState } from "react";
import { Home, Search, Brain, User, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  icon: JSX.Element;
}

export default function FooterBar() {
  const [active, setActive] = useState<string>("home");

  const navItems: NavItem[] = [
    { name: "Home", icon: <Home size={22} /> },
    { name: "Search", icon: <Search size={22} /> },
    { name: "AI Assist", icon: <Brain size={22} /> },
    { name: "Favorites", icon: <Heart size={22} /> },
    { name: "Profile", icon: <User size={22} /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md flex justify-around py-2">
      {navItems.map((item) => {
        const isActive = active === item.name;
        const classes = "relative flex flex-row items-center justify-center p-2 rounded-2xl transition-all duration-500 " + (
              isActive ? "bg-blue-950 text-white" : "text-gray-500")
        return (
					
						<button
							key={item.name}
							onClick={() => setActive(item.name)}
							className={classes}
						>
							{item.icon}
							<AnimatePresence>
								{isActive && (
									<motion.span
										className="text-xl mt-1 ml-1 font-medium"
										initial={{ opacity: 0, y: 4 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 4 }}
										transition={{ duration: 0.15 }}
									>
										{item.name}
									</motion.span>
								)}
							</AnimatePresence>
						</button>
					
				);
      })}
    </footer>
  );
}

