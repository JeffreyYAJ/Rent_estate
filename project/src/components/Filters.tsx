import React, { useState } from "react";

interface FiltersProps {
	onFiltersChange?: (filters: FilterState) => void;
}

interface FilterState {
	propertyType: string[];
	priceRange: [number, number];
	amenities: string[];
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
	const [filters, setFilters] = useState<FilterState>({
		propertyType: ["Entire Home"],
		priceRange: [0, 1000],
		amenities: [],
	});

	const handlePropertyTypeChange = (type: string) => {
		const newPropertyTypes = filters.propertyType.includes(type)
			? filters.propertyType.filter((t) => t !== type)
			: [...filters.propertyType, type];

		const newFilters = { ...filters, propertyType: newPropertyTypes };
		setFilters(newFilters);
		onFiltersChange?.(newFilters);
	};

	const handlePriceChange = (min: number, max: number) => {
		const newFilters = { ...filters, priceRange: [min, max] };
		setFilters(newFilters);
		onFiltersChange?.(newFilters);
	};

	const handleAmenityChange = (amenity: string) => {
		const newAmenities = filters.amenities.includes(amenity)
			? filters.amenities.filter((a) => a !== amenity)
			: [...filters.amenities, amenity];

		const newFilters = { ...filters, amenities: newAmenities };
		setFilters(newFilters);
		onFiltersChange?.(newFilters);
	};

	const propertyTypes = ["Entire Home", "Hotel Room", "Apartment"];
	const amenitiesList = ["WiFi", "Pool", "Parking"];

	return (
		<div className="bg-white rounded-xl shadow-lg p-6 w-80 ml-5 mt-4">
			<h1 className="text-xl font-semibold text-gray-900 mb-2">Filters</h1>

			<div className="mb-6">
				<h2 className="text-lg font-medium text-gray-900 mb-2">
					Property Type
				</h2>
				<div className="space-y-2">
					{propertyTypes.map((type) => (
						<label
							key={type}
							className="flex items-center space-x-3 cursor-pointer"
						>
							<input
								type="checkbox"
								checked={filters.propertyType.includes(type)}
								onChange={() => handlePropertyTypeChange(type)}
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
							/>
							<span className="text-gray-700">{type}</span>
						</label>
					))}
				</div>
			</div>


			<div className="mb-4">
				<h2 className="text-lg font-medium text-gray-900 mb-4">
					Price Range
				</h2>

				<div className="flex justify-between text-sm text-gray-600 mb-1">
					<span>$0</span>
					<span>$300</span>
					<span>$1000+</span>
				</div>

				{/* Custom Range Slider */}
				<div className="relative pt-1">
					<div className="flex justify-between items-center mb-2">
						<input
							type="range"
							min="0"
							max="1000"
							value={filters.priceRange[0]}
							onChange={(e) =>
								handlePriceChange(Number(e.target.value), filters.priceRange[1])
							}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
					</div>
					<div className="flex justify-between items-center">
						<input
							type="range"
							min="0"
							max="1000"
							value={filters.priceRange[1]}
							onChange={(e) =>
								handlePriceChange(filters.priceRange[0], Number(e.target.value))
							}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
					</div>

					{/* Selected Price Display */}
					<div className="mt-2 p-2 bg-gray-50 rounded-lg text-center">
						<span className="text-sm font-medium text-gray-700">
							Selected: ${filters.priceRange[0]} - ${filters.priceRange[1]}
						</span>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-lg font-semibold text-gray-900 mb-2">Amenities</h2>
				<div className="space-y-2">
					{amenitiesList.map((amenity) => (
						<label
							key={amenity}
							className="flex items-center space-x-3 cursor-pointer"
						>
							<input
								type="checkbox"
								checked={filters.amenities.includes(amenity)}
								onChange={() => handleAmenityChange(amenity)}
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
							/>
							<span className="text-gray-700">{amenity}</span>
						</label>
					))}
				</div>
			</div>

			<button
				onClick={() => {
					const resetFilters = {
						propertyType: [],
						priceRange: [0, 1000],
						amenities: [],
					};
					setFilters(resetFilters);
					onFiltersChange?.(resetFilters);
				}}
				className="w-full mt-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 text-sm font-medium"
			>
				Reset Filters
			</button>
		</div>
	);
};

export default Filters;
