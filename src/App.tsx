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
import ProfilePage from "./components/Settings/ProfilePage";
import SettingsPage from "./components/Settings/SettingPage";
import AccountLayout from "./components/Settings/AccountLayout";
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
        <Route path="/profileproperties" element={<MyProperties/>} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/account" element={<AccountLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        </Route>
        
      </Routes>
      
    </>
  );
}

export default App;
