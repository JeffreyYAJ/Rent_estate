import React from "react";

const ProfilePage: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-gray-900">
						Explore Properties on Map
					</h1>
					<div className="mt-4 bg-white rounded-lg shadow p-6">
						<div className="text-red-600">
							<h2 className="text-lg font-semibold">
								Open Something went wrong.
							</h2>
							<p className="text-sm mt-1">
								The page didn't load Google Maps correctly. See the JavaScript
								console for technical details.
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left Column - Profile Info */}
					<div className="lg:col-span-2 space-y-6">
						{/* Profile Card */}
						<div className="bg-white rounded-lg shadow p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">
								Manage Your Profile
							</h2>

							<div className="flex items-center space-x-4 mb-6">
								<div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
									SJ
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900">
										Sarah Johnson
									</h3>
									<p className="text-gray-600 text-sm">Member since 2021</p>
									<div className="flex items-center space-x-1 mt-1">
										<span className="text-yellow-500">📄</span>
										<span className="text-gray-700 text-sm">
											43 (33 reviews)
										</span>
									</div>
								</div>
							</div>

							{/* Personal Information */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-gray-900">
									Personal Information
								</h3>

								<div>
									<label className="text-sm font-medium text-gray-700">
										Email
									</label>
									<a
										href="mailto:sarah.johnson@email.com"
										className="block text-blue-600 hover:text-blue-800 mt-1"
									>
										sarah.johnson@email.com
									</a>
								</div>

								<div>
									<label className="text-sm font-medium text-gray-700">
										Phone
									</label>
									<p className="text-gray-900 mt-1">+1 (555) 123-4567</p>
								</div>

								<div>
									<label className="text-sm font-medium text-gray-700">
										Location
									</label>
									<p className="text-gray-900 mt-1">San Francisco, CA</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Recent Bookings */}
					<div className="space-y-6">
						<div className="bg-white rounded-lg shadow p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Recent Bookings
							</h3>

							<div className="space-y-4">
								{/* Booking 1 */}
								<div className="border-b border-gray-200 pb-4">
									<h4 className="font-semibold text-gray-900">
										Beachfront Villa
									</h4>
									<p className="text-gray-600 text-sm">
										Miami Beach • Mar 15-20, 2024
									</p>
									<div className="flex items-center justify-between mt-2">
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
											Completed
										</span>
									</div>
								</div>

								{/* Booking 2 */}
								<div className="border-b border-gray-200 pb-4">
									<h4 className="font-semibold text-gray-900">
										Mountain Retreat
									</h4>
									<p className="text-gray-600 text-sm">
										Aspen • Apr 5-10, 2024
									</p>
									<div className="flex items-center justify-between mt-2">
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											Upcoming
										</span>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex space-x-3 mt-6">
								<button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium">
									Cancel
								</button>
								<button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-medium">
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
