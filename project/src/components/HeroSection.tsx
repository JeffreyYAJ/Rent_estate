import { Search } from "lucide-react";

function HeroSection(){
    return (
			<section
				className="relative bg-cover bg-center h-[70vh] flex flex-col justify-center items-center text-white"
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80')",
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-r from-purple-800/70 to-indigo-800/70"></div>

				<div className="relative text-center z-10">
					<h1 className="text-5xl font-bold mb-3">Find Your Perfect Stay</h1>
					<p className="text-lg mb-8">
						Discover amazing places to stay, from cozy homes to luxury hotels,
						all in one place
					</p>

					<div className="bg-white rounded-xl shadow-lg flex flex-wrap gap-2 items-center justify-between px-4 py-3 w-[120%] max-w-3xl">
						<div className="flex-row">
							<p className="text-gray-500">Where</p>
							<input
								type="text"
								placeholder="Search destinations"
								className="flex-1 px-3 py-2 rounded-md border border-gray-200 focus:outline-gray-600 focus:ring-1 focus:ring-blue-500 text-gray-700"
							/>
						</div>
						<div>
							<p className="text-gray-500">Check-in</p>
							<input
								type="date"
								className="px-3 py-2 rounded-md border border-gray-200 focus:outline-gray-600 focus:ring-1 focus:ring-blue-500 text-gray-700"
							/>
						</div>
						<div>
							<p className="text-gray-500">Check-out</p>
							<input
								type="date"
								className="px-3 py-2 rounded-md border border-gray-200 focus:outline-gray-600 focus:ring-1 focus:ring-blue-500 text-gray-700"
							/>
						</div>
						<button className="bg-blue-600 text-white flex-row px-6 py-2 rounded-md hover:bg-blue-700">
							<span className=" text-gray-50 flex text-xs">
								<Search className="w-4 h-4" /> {" "} Search
							</span>
						</button>
					</div>
				</div>
			</section>
		);
}

export default HeroSection;