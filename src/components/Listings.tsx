import {  FaBed, FaStar, FaBath, FaUserFriends } from "react-icons/fa";
import { BiWindow } from "react-icons/bi";
import {Heart, MapPin} from "lucide-react"
//import { useEffect, useState } from "react";

const properties = [
	{
		id: 1,
		title: "Maison",
		location: "Location",
		price: "Prix",
		rating: 4.9,
		beds: 5,
		baths: 5,
		guests: 5,
		image:
			"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: 2,
		title: "Maison",
		location: "Location",
		price: "Prix",
		rating: 4,
		beds: 3,
		baths: 2,
		guests: 6,
		image:
			"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: 1,
		title: "Maison",
		location: "Location",
		price: "Prix",
		rating: 4.9,
		beds: 5,
		baths: 5,
		guests: 5,
		image:
			"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: 2,
		title: "Maison",
		location: "Location",
		price: "Prix",
		rating: 4,
		beds: 3,
		baths: 2,
		guests: 6,
		image:
			"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: 1,
		title: "Maison",
		location: "Location",
		price: "Prix",
		rating: 4.9,
		beds: 5,
		baths: 5,
		guests: 5,
		image:
			"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: 2,
		title: "Maison",
		location: "Location",
		price: "Prix",
		rating: 4,
		beds: 3,
		baths: 2,
		guests: 6,
		image:
			"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: 1,
		title: "Maison",
		location: "Location",
		price: "Prix",
		rating: 4.9,
		beds: 5,
		baths: 5,
		guests: 5,
		image:
			"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: 2,
		title: "Maison",
		location: "Location",
		price: "Prix",
		rating: 4,
		beds: 3,
		baths: 2,
		guests: 6,
		image:
			"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
	},
];

function Listings(){
    return (
			<section className="py-12 px-8 bg-gray-50 ml-4 mt-4 mr-4 rounded-xl shadow-md">
				<div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold text-zinc-950">
						Available Properties
					</h2>
					<div>
						<span className="text-gray-950">
							Additionnal content and buttons
						</span>
					</div>
					<button>
						<BiWindow />
					</button>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto ">
					{properties.map((p) => (
						<div
							key={p.id}
							className="bg-gray-200 rounded-xl hover:shadow-xl hover:cursor-pointer transition overflow-hidden relative"
						>
							<div className="relative rounded-md">
								<div className="items-center ">
									<img
										src={p.image}
										alt={p.title}
										className="w-full h-52 object-cover rounded-xl transition-transform hover:scale-110"
									/>
								</div>
								<button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-blue-50">
									<Heart className="text-gray-600 hover:text-blue-500" />
								</button>
							</div>

							<div className="p-5">
								<div className="flex justify-between items-center mb-1">
									<h3 className="font-bold text-lg text-gray-800">{p.title}</h3>
									<div className="flex items-center text-yellow-500">
										<FaStar className="mr-1" />
										<span className="font-medium text-gray-700">
											{p.rating}
										</span>
									</div>
								</div>

								<div className="font-medium text-gray-600 flex flex-row mb-1">
									<div>
										<MapPin className="w-5 h-5 mt-1" />
									</div>{" "}
									{p.location}
								</div>
								<span className=" text-gray-700  font-medium py-3  ">
									{p.price}
								</span>

								<div className="flex justify-between text-gray-600 text-sm border-t pt-3">
									<div className="flex items-center gap-1">
										<FaBed /> {p.beds} beds
									</div>
									<div className="flex items-center gap-1">
										<FaBath /> {p.baths} baths
									</div>
									<div className="flex items-center gap-1">
										<FaUserFriends /> {p.guests} guests
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		);
}

export default Listings;