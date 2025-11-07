import React, { useState, useEffect } from "react";
import axios from "axios"; 
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [apps, setApps] = useState([
    { name: "Super Racer", description: "Fast multiplayer racing fun!", icon: "/image/game1.jpg", rating: 4.8, trending: true, likes: 120, downloads: 350 },
    { name: "StudyMate", description: "Track study time and boost productivity.", icon: "/image/app1.jpg", rating: 4.6, likes: 85, downloads: 270 },
    { name: "TuneBlast", description: "Stream and download your favorite songs.", icon: "/image/music1.jpg", rating: 4.9, trending: true, likes: 210, downloads: 500 },
    { name: "WeatherPro", description: "Live weather updates and forecasts worldwide.", icon: "/image/weather.jpg", rating: 4.4, likes: 60, downloads: 190 },
    { name: "PhotoCam", description: "Take stunning pictures with smart filters.", icon: "/image/camera.jpg", rating: 4.7, likes: 95, downloads: 340 },
    { name: "QuickNotes", description: "Write, save, and organize notes easily.", icon: "/image/notes.jpg", rating: 4.5, likes: 75, downloads: 220 },
    { name: "Galaxy Shooter", description: "Fight alien ships in epic space battles.", icon: "/image/game2.jpg", rating: 4.8, trending: true, likes: 200, downloads: 410 },
    { name: "ChatZone", description: "Chat with friends and meet new people.", icon: "/image/social.jpg", rating: 4.3, likes: 65, downloads: 180 },
    { name: "Learnify", description: "Interactive lessons for all ages.", icon: "/image/education.jpg", rating: 4.9, likes: 300, downloads: 520 },
  ]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("thomasUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLike = (name) => {
    if (!user) {
      alert("You must log in to like apps!");
      return;
    }
    setApps(apps.map(app =>
      app.name === name ? { ...app, likes: app.likes + 1 } : app
    ));
  };

  const handleDownload = (name) => {
    if (!user) {
      alert("You must log in to download apps!");
      return;
    }
    setApps(apps.map(app =>
      app.name === name ? { ...app, downloads: app.downloads + 1 } : app
    ));
    alert(`⬇️ Downloading ${name}...`);
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );
  const trending = apps.filter(app => app.trending);

 

const handleAuth = async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    if (isLogin) {
      // LOGIN
      const res = await axios.post("https://thomas-app-store-backend.onrender.com/api/login", {
        username,
        password,
      });

      setUser({ username: res.data.username });
      localStorage.setItem("thomasUser", JSON.stringify({ username: res.data.username }));
      alert(`Welcome back, ${res.data.username}!`);
      setShowAuthModal(false);
    } else {
      // SIGNUP
      const res = await axios.post("https://thomas-app-store-backend.onrender.com/api/signup", {
        username,
        password,
      });

      setUser({ username: res.data.username });
      localStorage.setItem("thomasUser", JSON.stringify({ username: res.data.username }));
      alert("✅ Account created successfully!");
      setShowAuthModal(false);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error: " + (err.response?.data?.message || "Server error"));
  }
};


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("thomasUser");
    alert("You have logged out.");
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} transition-all duration-500`}>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-5 border-b border-gray-700">
        <h1 className="text-3xl font-extrabold text-indigo-400">Thomas App Store</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="🔍 Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-3 py-1 rounded-full text-sm border ${
              darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"
            }`}
          />
          <button
            onClick={toggleDarkMode}
            className="bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-1 rounded-full text-sm transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {!user ? (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
            >
              Login / Signup
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-indigo-300 text-sm">👤 {user.username}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* App Grid */}
      <section className="px-6 mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
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
            <div className="flex justify-between mt-2 text-sm">
              <span>⭐ {app.rating}</span>
              <span>❤️ {app.likes}</span>
              <span>⬇️ {app.downloads}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Modal for App Details */}
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

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => handleLike(selectedApp.name)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
              >
                ❤️ Like ({selectedApp.likes})
              </button>
              <button
                onClick={() => handleDownload(selectedApp.name)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
              >
                ⬇️ Download ({selectedApp.downloads})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className={`p-6 rounded-xl w-96 ${darkMode ? "bg-gray-800" : "bg-white text-black"}`}>
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-400">
              {isLogin ? "Login" : "Create Account"}
            </h2>
            <form onSubmit={handleAuth} className="flex flex-col gap-3">
              <input type="text" name="username" placeholder="Username" required className="p-2 rounded bg-gray-700 text-white" />
              <input type="password" name="password" placeholder="Password" required className="p-2 rounded bg-gray-700 text-white" />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mt-3">
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-400">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <button onClick={() => setIsLogin(false)} className="text-indigo-400 underline">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setIsLogin(true)} className="text-indigo-400 underline">
                    Log in
                  </button>
                </>
              )}
            </p>
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
