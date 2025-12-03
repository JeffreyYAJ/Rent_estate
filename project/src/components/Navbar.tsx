//import { Home } from "lucide-react";
import { FaHouse } from "react-icons/fa6";
import { Bell, Heart, Menu } from "lucide-react";


function Navbar(){
    return (
			<nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
				<div className="flex justify-center">
					<FaHouse className="text-blue-600 w-9 h-9 pr-2 mb-2" />
					<p className="text-2xl font-bold text-gray-800 mt-1"> RentHub</p>
				</div>

				<ul className="flex gap-6 text-gray-500 font-medium">
					<li className="hover:text-blue-600 cursor-pointer">Browse</li>
					<li className="hover:text-blue-600 cursor-pointer">Hotels</li>
					<li className="hover:text-blue-600 cursor-pointer">Homes</li>
					<li className="hover:text-blue-600 cursor-pointer">Experiences</li>
				</ul>
				<div className="flex items-center gap-4">
					<button className="text-gray-600 hover:text-blue-600">
						<Heart className="w-5 h-5 fa-regular fa-heart"> </Heart>
					</button>
					<button className="text-gray-600 hover:text-blue-600">
						<Bell className="w-5 h-5 fa-regular fa-user-circle text-2xl"></Bell>
					</button>
					<button className="text-gray-600 hover:text-blue-600">
						<Menu className="w-5 h-5 fa-regular fa-user-circle text-2xl"></Menu>
					</button>
					<div><img src="" alt="img" /></div>
				</div>
			</nav>
		);
}

export default Navbar;