import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

interface Filters {
  type?: string;
  min_price?: number;
  max_price?: number;
  min_surface?: number;
  city?: string;
  district?: string;
  furnished?: boolean;
  number_of_rooms?: number;
  number_of_bedrooms?: number;
  where?: string;
  rent?: string;
}

const FilterBar: React.FC<{ onFilterChange: (filters: Filters) => void; filters: Filters }> = ({
  onFilterChange,
  filters: initialFilters,
}) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // Synchronise les filtres internes si la prop filters change (ex: navigation)
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const toggleFilter = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleChange = (key: keyof Filters, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="relative z-20 flex items-center justify-between px-6 py-3 bg-white shadow-sm border rounded-full w-fit space-x-3">
      <div className="flex space-x-3">
        {/* --- PRICE --- */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("Price")}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              openFilter === "Price"
                ? "bg-gray-100 border-gray-400 text-gray-900"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            Price
          </button>

          {openFilter === "Price" && (
            <div className="absolute left-0 top-12 w-64 bg-white border rounded-xl shadow-lg p-4 z-50">
              <label className="text-sm text-gray-700">Min price</label>
              <input
                type="number"
                placeholder="300000"
                className="w-full text-zinc-800 border rounded-md px-2 py-1 mb-2 mt-1 text-sm"
                value={filters.min_price || ''}
                onChange={(e) =>
                  handleChange("min_price", e.target.value ? parseInt(e.target.value) : undefined)
                }
              />
              <label className="text-sm text-gray-700">Max price</label>
              <input
                type="number"
                placeholder="600000"
                className="w-full border text-zinc-800 rounded-md px-2 py-1 mt-1 text-sm"
                value={filters.max_price || ''}
                onChange={(e) =>
                  handleChange("max_price", e.target.value ? parseInt(e.target.value) : undefined)
                }
              />
              <div className="flex justify-between mt-4">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs"
                  onClick={handleReset}
                  type="button"
                >
                  Reset filter
                </button>
                <button
                  className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
                  onClick={() => setOpenFilter(null)}
                  type="button"
                >
                  Apply filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- TYPE --- */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("Type")}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              openFilter === "Type"
                ? "bg-gray-100 border-gray-400 text-gray-900"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            Type
          </button>

          {openFilter === "Type" && (
            <div className="absolute left-0 top-12 w-56 bg-white border rounded-xl shadow-lg p-3 z-50">
              {["HOUSE", "APARTMENT", "STUDIO", "ROOM"].map((type) => (
                <label key={type} className="flex items-center space-x-2 mb-1">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={filters.type === type}
                    onChange={() => handleChange("type", type)}
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs"
                  onClick={handleReset}
                  type="button"
                >
                  Reset filter
                </button>
                <button
                  className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
                  onClick={() => setOpenFilter(null)}
                  type="button"
                >
                  Apply filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- LOCATION --- */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("Location")}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              openFilter === "Location"
                ? "bg-gray-100 border-gray-400 text-gray-900"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            Location
          </button>

          {openFilter === "Location" && (
            <div className="absolute left-0 top-12 w-64 bg-white border rounded-xl shadow-lg p-4 z-50">
              <input
                type="text"
                placeholder="City"
                className="w-full border rounded-md px-2 py-1 mb-2 text-sm"
                value={filters.city || ''}
                onChange={(e) => handleChange("city", e.target.value)}
              />
              <input
                type="text"
                placeholder="District"
                className="w-full border rounded-md px-2 py-1 text-sm"
                value={filters.district || ''}
                onChange={(e) => handleChange("district", e.target.value)}
              />
              <div className="flex justify-between mt-4">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs"
                  onClick={handleReset}
                  type="button"
                >
                  Reset filter
                </button>
                <button
                  className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
                  onClick={() => setOpenFilter(null)}
                  type="button"
                >
                  Apply filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- MORE FILTERS --- */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("More")}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              openFilter === "More"
                ? "bg-gray-100 border-gray-400 text-gray-900"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            More filters
          </button>

          {openFilter === "More" && (
            <div className="absolute left-0 top-12 w-72 bg-white border rounded-xl shadow-lg p-4 z-50">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-700">Furnished</label>
                <input
                  type="checkbox"
                  checked={!!filters.furnished}
                  onChange={(e) => handleChange("furnished", e.target.checked)}
                />
              </div>

              <label className="text-sm text-gray-700">Rooms</label>
              <input
                type="number"
                className="w-full border rounded-md px-2 py-1 mb-2 text-sm"
                value={filters.number_of_rooms || ''}
                onChange={(e) =>
                  handleChange("number_of_rooms", e.target.value ? parseInt(e.target.value) : undefined)
                }
              />

              <label className="text-sm text-gray-700">Bedrooms</label>
              <input
                type="number"
                className="w-full border rounded-md px-2 py-1 text-sm"
                value={filters.number_of_bedrooms || ''}
                onChange={(e) =>
                  handleChange("number_of_bedrooms", e.target.value ? parseInt(e.target.value) : undefined)
                }
              />
              <div className="flex justify-between mt-4">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs"
                  onClick={handleReset}
                  type="button"
                >
                  Reset filter
                </button>
                <button
                  className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
                  onClick={() => setOpenFilter(null)}
                  type="button"
                >
                  Apply filter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- SAVE SEARCH --- */}
      <button className="flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium space-x-1">
        <Bookmark size={16} strokeWidth={2} />
        <span>Save search</span>
      </button>
    </div>
  );
};

export default FilterBar;
