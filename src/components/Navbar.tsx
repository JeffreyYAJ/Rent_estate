import { FaHouse, FaMessage } from "react-icons/fa6";
import { Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
<nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-8 bg-white shadow-sm ">
      <Link to='/' className="flex justify-center">
        <FaHouse className="text-blue-600 w-9 h-9 pr-2 mb-2" />
        <p className="text-2xl font-bold text-gray-800 mt-1"> RentHub</p>
      </Link>

      <ul className="flex gap-6 text-gray-600 font-bold ">
        <Link to="/" className="hover:text-blue-600 cursor-pointer">Browse
        </Link>
        <Link to="/favorites" className="hover:text-blue-600 cursor-pointer">Wishlist
        </Link>
        <li className="hover:text-blue-600 cursor-pointer">Homes</li>
        <li className="hover:text-blue-600 cursor-pointer">Experiences</li>
      </ul>
      <div className="flex items-center gap-4">
        <Link to="/messages" className="text-gray-600 hover:text-blue-600">
          <FaMessage className="w-5 h-5 fa-regular fa-heart"/> 
        </Link>
        <button className="text-gray-600 hover:text-blue-600">
          <Bell className="w-5 h-5 fa-regular fa-user-circle text-2xl"></Bell>
        </button>
        <button className="text-gray-600 hover:text-blue-600">
          <Menu className="w-5 h-5 fa-regular fa-user-circle text-2xl"></Menu>
        </button>
        <div>
          <Link to="/profile">
          <img src="" alt="img" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// import { FaHouse } from "react-icons/fa6";
// import { Bell, Heart, Menu } from "lucide-react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
//       {/* Logo */}
//       <div className="flex justify-center">
//         <FaHouse className="text-blue-600 w-9 h-9 pr-2 mb-2" />
//         <p className="text-2xl font-bold text-gray-800 mt-1">RentHub</p>
//       </div>

//       {/* Menu principal */}
//       <ul className="flex gap-6 text-gray-500 font-medium">
//         <li className="hover:text-blue-600 cursor-pointer">Browse</li>
//         <li className="hover:text-blue-600 cursor-pointer">Hotels</li>
//         <li className="hover:text-blue-600 cursor-pointer">Homes</li>
//         <li className="hover:text-blue-600 cursor-pointer">Experiences</li>
//       </ul>

//       {/* Icônes droites */}
//       <div className="flex items-center gap-4">
//         {/* Bouton favoris */}
//         <Link to="/favorites" className="text-gray-600 hover:text-blue-600">
//           <Heart className="w-5 h-5" />
//         </Link>

//         <button className="text-gray-600 hover:text-blue-600">
//           <Bell className="w-5 h-5" />
//         </button>

//         <button className="text-gray-600 hover:text-blue-600">
//           <Menu className="w-5 h-5" />
//         </button>

//         <div>
//           <img src="" alt="img" />
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

