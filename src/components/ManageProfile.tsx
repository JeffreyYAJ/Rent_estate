// function ManageProfile(){
//     return (
// 			<section className="bg-white px-12 py-8 ">
// 				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
					
// 						<div className="relative overflow-hidden rounded-xl shadow hover:shadow-lg transition">
// 							<div className="relative">
// 								{/* <img
// 									src={p.image}
// 									alt={p.name}
// 									className="w-full h-56 object-cover brightness-50"
// 								/> */}

								
// 							</div>
// 						</div>
					
// 				</div>
// 			</section>
// 		);
// }

// export default ManageProfile;


import React from 'react';

const ProfileManagement: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 font-sans text-gray-800">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold mb-6 text-black">Manage Your Profile</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            SJ
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black">Sarah Johnson</h2>
            <p className="text-gray-600 text-sm mb-2">Member since 2021</p>
            <div className="flex items-center gap-1">
              <span>📌</span>
              <span className="text-gray-600 text-sm">4.9 (23 reviews)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="h-px bg-gray-300 my-6"></div>

      {/* Personal Information */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-black">Personal Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <a 
              href="mailto:sarah.johnson@email.com" 
              className="text-blue-500 hover:text-blue-700 text-base"
            >
              sarah.johnson@email.com
            </a>
          </div>
          
          <div>
            <label className="block text-gray-600 text-sm mb-1">Phone</label>
            <span className="text-black text-base">+1 (555) 123-4567</span>
          </div>
          
          <div>
            <label className="block text-gray-600 text-sm mb-1">Location</label>
            <span className="text-black text-base">San Francisco, CA</span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gray-300 my-6"></div>

      {/* Recent Bookings */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-black">Recent Bookings</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-start p-3 border border-gray-300 rounded-lg">
            <div>
              <h4 className="font-semibold text-black">Beachfront Villa</h4>
              <p className="text-gray-600 text-sm">Miami Beach • Mar 15-20, 2024</p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full uppercase">
              Completed
            </span>
          </div>
          
          <div className="flex justify-between items-start p-3 border border-gray-300 rounded-lg">
            <div>
              <h4 className="font-semibold text-black">Mountain Retreat</h4>
              <p className="text-gray-600 text-sm">Aspen • Apr 5-10, 2024</p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full uppercase">
              Upcoming
            </span>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button className="px-5 py-2 border border-gray-400 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-5 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileManagement;