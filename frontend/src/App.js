import React, { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const apps = [
    { name: "Super Racer", description: "Fast multiplayer racing fun!", icon: "/image/game1.jpg", rating: 4.8, trending: true },
    { name: "StudyMate", description: "Track study time and boost productivity.", icon: "/image/app1.jpg", rating: 4.6 },
    { name: "TuneBlast", description: "Stream and download your favorite songs.", icon: "/image/music1.jpg", rating: 4.9, trending: true },
    { name: "WeatherPro", description: "Live weather updates and forecasts worldwide.", icon: "/image/weather.jpg", rating: 4.4 },
    { name: "PhotoCam", description: "Take stunning pictures with smart filters.", icon: "/image/camera.jpg", rating: 4.7 },
    { name: "QuickNotes", description: "Write, save, and organize notes easily.", icon: "/image/notes.jpg", rating: 4.5 },
    { name: "Galaxy Shooter", description: "Fight alien ships in epic space battles.", icon: "/image/game2.jpg", rating: 4.8, trending: true },
    { name: "ChatZone", description: "Chat with friends and meet new people.", icon: "/image/social.jpg", rating: 4.3 },
    { name: "Learnify", description: "Interactive lessons for all ages.", icon: "/image/education.jpg", rating: 4.9 },
  ];

  const reviews = [
    "This app is absolutely amazing! ⭐⭐⭐⭐⭐",
    "Really smooth and fast, love it!",
    "Great user experience, highly recommend.",
    "Could use more themes, but overall awesome.",
    "Five stars! Perfect app design and features.",
  ];

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const topRated = apps.filter(app => app.rating >= 4.8);
  const trending = apps.filter(app => app.trending);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} transition-all duration-500`}>
      {/* Header */}
      <header className="text-center py-8 border-b border-gray-700 relative">
        <h1 className="text-4xl font-extrabold text-indigo-400">Thomas App Store</h1>
        <p className="text-gray-400 mt-2">Explore, Search, and Download Apps</p>

        <button
          onClick={toggleDarkMode}
          className="absolute right-5 top-5 bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-1 rounded-full text-sm transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Search Bar */}
      <section className="text-center mt-6">
        <input
          type="text"
          placeholder="🔍 Search apps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`px-4 py-2 rounded-full w-2/3 sm:w-1/3 border ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />
      </section>

      {/* Trending Section */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-pink-400">🔥 Trending Now</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trending.map((app, i) => (
            <div
              key={i}
              onClick={() => setSelectedApp(app)}
              className={`cursor-pointer p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img src={app.icon} alt={app.name} className="w-full h-40 object-cover rounded-lg mb-3" />
              <h3 className="text-xl font-bold text-indigo-400">{app.name}</h3>
              <p className="text-sm text-gray-400">{app.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="mt-14 px-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-400">⭐ Top Rated Apps</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topRated.map((app, i) => (
            <div
              key={i}
              onClick={() => setSelectedApp(app)}
              className={`cursor-pointer p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img src={app.icon} alt={app.name} className="w-full h-40 object-cover rounded-lg mb-3" />
              <h3 className="text-xl font-bold text-indigo-400">{app.name}</h3>
              <p className="text-sm text-gray-400">{app.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search Results */}
      {search && (
        <section className="mt-14 px-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-green-400">🔎 Search Results</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredApps.map((app, i) => (
              <div
                key={i}
                onClick={() => setSelectedApp(app)}
                className={`cursor-pointer p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img src={app.icon} alt={app.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="text-xl font-bold text-indigo-400">{app.name}</h3>
                <p className="text-sm text-gray-400">{app.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* App Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className={`rounded-xl p-6 w-11/12 md:w-1/2 ${darkMode ? "bg-gray-800" : "bg-white text-black"}`}>
            <button onClick={() => setSelectedApp(null)} className="float-right text-red-400 text-lg font-bold">
              ✖
            </button>
            <img src={selectedApp.icon} alt={selectedApp.name} className="w-full h-60 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold text-indigo-400 mb-2">{selectedApp.name}</h2>
            <p className="text-gray-400 mb-2">{selectedApp.description}</p>
            <p className="text-yellow-400 mb-4">⭐ Rating: {selectedApp.rating}/5</p>

            {/* Reviews */}
            <h4 className="text-lg font-semibold text-indigo-300 mb-2">User Reviews</h4>
            <ul className="space-y-2 mb-4">
              {reviews.slice(0, 3).map((review, i) => (
                <li key={i} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                  {review}
                </li>
              ))}
            </ul>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md"
              onClick={() => alert(`Downloading ${selectedApp.name}...`)}
            >
              ⬇️ Download Now
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-16 pb-10">
        <h3 className="text-2xl font-semibold mb-3 text-indigo-300">Created by</h3>
        <img src="/image/thomas.jpg" alt="Thomas" className="w-32 h-32 rounded-full mx-auto mb-3 object-cover border-4 border-indigo-500 shadow-lg hover:scale-110 transition-transform duration-300" />
        <p className="text-lg font-medium">Thomas</p>
        <p className="text-sm text-gray-400">App Store Creator & Developer</p>
      </footer>
    </div>
  );
}

export default App;
