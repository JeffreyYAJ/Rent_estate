import { div } from 'framer-motion/client';
import React, { useState } from 'react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

      // return (
      //   <div className="relative" style={{ position: 'relative', display: 'inline-block' }}>
      //     <button onClick={toggleMenu}>Cliquez ici</button>
      //     {isOpen && (
      //       <div style={{
      //         position: 'absolute',
      //         top: '100%', // Positionne le menu juste en dessous du bouton
      //         left: 0,
      //         color: 'blue',
      //         backgroundColor: 'gray',
      //         border: '1px solid #ccc',
      //         boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      //         zIndex: 1
      //       }}>
      //         <ul style={{ listStyleType: 'none', padding: '10px', margin: 0 }}>
      //           <li><a href="#item1">Item 1</a></li>
      //           <li><a href="#item2">Item 2</a></li>
      //           <li><a href="#item3">Item 3</a></li>
      //         </ul>
      //       </div>
      //     )}
      //   </div>
      // );

      return (
        <div className='left-80 relative inline-block'>
          <button onClick={toggleMenu}>YO</button>
          {isOpen && (
            <div className='absolute top-full left-0 bg-gray-200 z-10 rounded-sm text-blue-600'>
              <ul style={{ listStyleType: 'none', padding: '10px', margin: 0 }}>
      //           <li><a href="#item1">Item 1</a></li>
      //           <li><a href="#item2">Item 2</a></li>
      //           <li><a href="#item3">Item 3</a></li>
      //         </ul>
            </div>
          )}
        </div>
      )
};
 
export default DropdownMenu;
