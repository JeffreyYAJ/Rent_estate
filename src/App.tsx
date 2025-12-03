import Webpage from "./pages/Webpage";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";



import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import MessagesPage from "./pages/MessagesPage";
import MyProperties from "./components/MyProperties";
import PropertyDetail from "./components/PropertyDetail";
import PropertyPage from "./components/PropertyComp";
import Login from "./pages/Login";

function App() {
  return (
    <>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />  
        <Route path="/properties" element={<PropertyPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/messages" element={<MessagesPage/>} />
        <Route path="/profile" element={<MyProperties/>} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        
      </Routes>
      
    </>
  );
}

export default App;
