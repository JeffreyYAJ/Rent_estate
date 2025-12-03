import { Star } from "lucide-react";

export default function ProfileCard() {
  return (
	<section className="py-12 px-6 bg-white">
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-8 text-zinc-950">
        Manage Your Profile
      </h2>

      {/* Contenu principal */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Partie gauche */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-950">Sarah Johnson</h3>
              <p className="text-sm text-gray-500">Member since 2021</p>
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                <span>4.9</span>
                <span className="text-gray-400">(23 reviews)</span>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <h4 className="text-md font-semibold mb-3 text-gray-800">Personal Information</h4>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                defaultValue="sarah.johnson@email.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                defaultValue="+1 (555) 123-4567"
                className="w-full border border-gray-300 rounded-lg text-gray-600 px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                defaultValue="San Francisco, CA"
                className="w-full border border-gray-300 text-gray-600 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        {/* Partie droite */}
        <div className="flex-1">
          <h4 className="text-md font-semibold mb-3">Recent Bookings</h4>
          <div className="space-y-4">
            {/* Réservation 1 */}
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/60"
                  alt="Beachfront Villa"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">Beachfront Villa</p>
                  <p className="text-sm text-gray-500">
                    Miami Beach • Mar 15–20, 2024
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-green-500">
                Completed
              </span>
            </div>

            {/* Réservation 2 */}
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/60"
                  alt="Mountain Retreat"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">Mountain Retreat</p>
                  <p className="text-sm text-gray-500">
                    Aspen • Apr 5–10, 2024
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-blue-500">
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3 mt-8">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-600">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </div>
	</section>
  );
}
