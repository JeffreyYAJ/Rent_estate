import React from "react";
import {  Facebook, Twitter, Instagram, Linkedin, } from "lucide-react";
import { FaHouse } from "react-icons/fa6";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-900 border-t border-gray-800 py-12">
			<div className="container mx-auto px-4 md:px-6">
				{/* <div className="flex flex-col md:flex-row justify-between items-center mb-8">
					
				</div> */}

				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					<div className="space-y-3">
						<div className="flex items-center gap-2 mb-4 md:mb-0">
							<FaHouse size={20} className="text-blue-600" />
							<span className="text-xl font-bold tracking-tight">
								Rent<span className="text-blue-600">Hub</span>
							</span>
						</div>
						<p className="text-gray-400">
							Your trusted platform for finding the perfect accomodation
							anywhere in the world.
						</p>
						<div className="flex gap-4">
							<a
								href="#"
								className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
							>
								<Facebook
									size={20}
									className="text-gray-400 hover:text-blue-600"
								/>
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
							>
								<Twitter
									size={20}
									className="text-gray-400 hover:text-blue-600"
								/>
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
							>
								<Instagram
									size={20}
									className="text-gray-400 hover:text-blue-600"
								/>
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
							>
								<Linkedin
									size={20}
									className="text-gray-400 hover:text-blue-600"
								/>
							</a>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-4 text-white">Company</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									About us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Careers
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Press
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Blog
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4 text-white">Support</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Help center
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Contact us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Trust & Safety
								</a>
							</li>
							
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Privacy policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Terms of service
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Cookie policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-emerald-400 transition-colors"
								>
									Accessibility
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-gray-800 text-center">
					<p className="text-gray-500 text-sm">
						&copy; {new Date().getFullYear()} RentHub. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};
