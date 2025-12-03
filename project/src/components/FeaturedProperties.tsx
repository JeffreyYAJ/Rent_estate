import { FaHeart, FaBed, FaStar, FaBath, FaUserFriends } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

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
			"https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=80",
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
			"https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 3,
		title: "Maison",
		location: "location",
		price: "Prix",
		rating: 4.7,
		beds: 2,
		baths: 2,
		guests: 4,
		image:
			"https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=80",
	},
];

function FeaturedProperties(){
    return (
			<section className="py-12 px-8 bg-gray-50">
				<div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold text-zinc-950">
						Featured Properties
					</h2>
					<a
						href="#"
						className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
					>
						View All <ArrowRight className="w-5 h-5" />
					</a>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto ">
					{properties.map((p) => (
						<div
							key={p.id}
							className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition overflow-hidden relative"
						>
							<div className="relative">
								<img
									src={p.image}
									alt={p.title}
									className="w-full h-56 object-cover"
								/>
								<button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-blue-50">
									<FaHeart className="text-gray-600 hover:text-red-500" />
								</button>
								<span className="absolute bottom-3 left-3 bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded-md shadow">
									{p.price}
								</span>
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
								<p className="font-medium text-gray-600">{p.location}</p>

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

export default FeaturedProperties;