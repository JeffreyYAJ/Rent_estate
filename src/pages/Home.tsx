import Listings from "../components/Listings";
import Filters from "../components/Filters";
import FilterBar from "../components/FilterBar";
import AvailableProps from "../components/AvaliableProps";
import FooterBar from "../components/FooterBar";
import PropertyPage from "../components/PropertyComp";
import PriceMap from "../components/PriceMap";
import WaitingPage from "../components/WaitingPage";

export default function Home(){
    return (
        <div>
          {/* <WaitingPage/> */}
          <div className="min-h-screen flex flex-col bg-white">
            
            
              <PropertyPage />
          </div>
          <div className="position-absolute">
            <FooterBar />
          </div>
      </div>
    );
}

// const sampleData = [
//   { id: 1, title: "Studio centre-ville", price: 720, lat: 11.5020752, lng:  3.8480325 },
//   { id: 2, title: "T2 spacieux", price: 980, lat: 11.853, lng: 3.3499 },
//   { id: 3, title: "Appartement cosy", price: 1150, lat: 11.8606, lng: 3.3376 },
// ];

// export default function Home() {
//   return (
//     <div className="h-screen p-4 bg-gray-100">
//       <h1 className="text-2xl text-black font-bold mb-4">Carte des propriétés</h1>

//       <div className="h-[80vh]">
//         <PriceMap properties={sampleData} />
//       </div>
//     </div>
//   );
// }

