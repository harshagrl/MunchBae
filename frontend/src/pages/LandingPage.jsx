import { Link, useNavigate } from "react-router-dom";
import munchBaeLogo from "../assets/munch-bae-logo.png";
import scooterImg from "../assets/scooter.png";
import deliveryVideo from "../assets/Delivery_video.mp4";
import landingBgVideo from "../assets/LandingPage_Video.mp4";
import image1 from "../assets/image1.jpg";
import image5 from "../assets/image5.jpg";
import image7 from "../assets/image7.jpg";
import image3 from "../assets/image3.jpg";
import image6 from "../assets/image6.jpg";
import image2 from "../assets/image2.webp";
import { FiSearch, FiArrowRight, FiMapPin, FiClock, FiShield, FiX } from "react-icons/fi";
import { FaStar, FaPlay } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const bgVideoRef = useRef(null);

  useEffect(() => {
    const video = bgVideoRef.current;
    if (video) {
      video.play().catch(() => {});
      // Keep video playing - force resume if browser pauses it
      const keepPlaying = setInterval(() => {
        if (video.paused) {
          video.play().catch(() => {});
        }
      }, 500);
      // Unmute on first user interaction
      const unmute = () => {
        video.muted = false;
        video.volume = 0.05;
        document.removeEventListener("click", unmute);
        document.removeEventListener("scroll", unmute);
      };
      document.addEventListener("click", unmute);
      document.addEventListener("scroll", unmute);
      return () => {
        clearInterval(keepPlaying);
        document.removeEventListener("click", unmute);
        document.removeEventListener("scroll", unmute);
      };
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredFoods = [
    { name: "Samosa Platter", price: "₹120", rating: 4.8, image: image1, category: "Snacks" },
    { name: "Cheese Burger", price: "₹250", rating: 4.9, image: image5, category: "Burgers" },
    { name: "South Indian Thali", price: "₹350", rating: 4.7, image: image7, category: "Meals" },
    { name: "Chocolate Cake", price: "₹450", rating: 4.9, image: image3, category: "Desserts" },
    { name: "Grilled Sandwich", price: "₹180", rating: 4.6, image: image6, category: "Snacks" },
    { name: "Seared Scallops", price: "₹550", rating: 4.8, image: image2, category: "Premium" },
  ];

  const categories = ["All", "Snacks", "Burgers", "Meals", "Desserts", "Premium"];

  const stats = [
    { number: "500+", label: "Restaurants" },
    { number: "10K+", label: "Happy Customers" },
    { number: "50+", label: "Cities" },
    { number: "4.9", label: "App Rating" },
  ];

  return (
    <div className="min-h-screen bg-[#fefaf6] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <nav className="w-full px-6 md:px-16 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <img src={munchBaeLogo} alt="MunchBae Logo" className="w-20 h-20 object-contain drop-shadow-md" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[#2d2d2d] font-semibold text-sm hover:text-[#e84c3d] transition-colors duration-300 relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e84c3d] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <a href="#about" className="text-[#6b6b6b] font-medium text-sm hover:text-[#e84c3d] transition-colors duration-300 relative group">
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e84c3d] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#featured" className="text-[#6b6b6b] font-medium text-sm hover:text-[#e84c3d] transition-colors duration-300 relative group">
            Menu
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e84c3d] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#how-it-works" className="text-[#6b6b6b] font-medium text-sm hover:text-[#e84c3d] transition-colors duration-300 relative group">
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e84c3d] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-[#6b6b6b] font-medium text-sm hover:text-[#e84c3d] transition-colors duration-300 relative group">
            Contact Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e84c3d] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/signin"
            className="px-6 py-2.5 bg-[#e84c3d] text-white rounded-full text-sm font-semibold hover:bg-[#d44235] transition-all duration-300 shadow-lg shadow-red-200 hover:shadow-red-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-16 pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Background Video */}
        <video
          ref={bgVideoRef}
          src={landingBgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ opacity: 0.45 }}
        />
        {/* Dark overlay for extra dimming */}
        <div className="absolute inset-0 bg-[#fefaf6]/30 z-[1]"></div>

        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#e84c3d]/5 rounded-full blur-3xl z-[2]"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100/50 rounded-full blur-3xl z-[2]"></div>

        <div className="flex flex-col gap-12 max-w-7xl mx-auto relative z-10">
          <div
            className={`max-w-2xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="inline-flex items-center gap-2 bg-[#e84c3d]/10 text-[#e84c3d] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-[#e84c3d] rounded-full animate-pulse"></span>
              #1 Food Delivery App
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2d2d2d] leading-tight mb-6">
              Your Favourite{" "}
              <br />
              Food{" "}
              <span className="text-[#e84c3d] relative">
                delivery
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C40 2 80 2 100 6C120 10 160 4 198 8" stroke="#e84c3d" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                </svg>
              </span>{" "}
              <br />
              Partner
            </h1>

            <p className="text-gray-700 text-lg mb-8 max-w-md leading-relaxed">
              We are focused on being the best helping hand to the local
              businesses. Fast, reliable, and delicious food at your doorstep.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <Link
                to="/signup"
                className="px-8 py-4 bg-[#e84c3d] text-white rounded-xl text-base font-semibold hover:bg-[#d44235] transition-all duration-300 shadow-lg shadow-red-200 hover:shadow-red-300 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
              >
                Order Now
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-3 text-[#2d2d2d] font-medium hover:text-[#e84c3d] transition-colors duration-300 group cursor-pointer"
              >
                <span className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                  <FaPlay size={12} className="text-[#e84c3d] ml-0.5" />
                </span>
                Watch Video
              </button>
            </div>

            {/* Customer Badge */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-md bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">A</div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">R</div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-md bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">S</div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-md bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">K</div>
              </div>
              <div>
                <p className="font-bold text-[#2d2d2d] text-sm">Our Happy Customers</p>
                <div className="flex items-center gap-1.5">
                  <FaStar className="text-amber-400" size={14} />
                  <span className="font-bold text-[#2d2d2d] text-sm">4.9</span>
                  <span className="text-[#6b6b6b] text-xs">(10.2K Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <p className="text-3xl md:text-4xl font-extrabold text-[#e84c3d] mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </p>
                <p className="text-[#6b6b6b] text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 md:px-16 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2d2d2d] mb-4">
              How It <span className="text-[#e84c3d]">Works</span>
            </h2>
            <p className="text-[#6b6b6b] max-w-lg mx-auto">
              Order your favourite food in just 3 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <FiSearch size={28} />,
                title: "Choose Your Food",
                desc: "Browse through hundreds of restaurants and find your favourite dishes",
                color: "from-orange-400 to-[#e84c3d]",
              },
              {
                step: "02",
                icon: <FiShield size={28} />,
                title: "Make Payment",
                desc: "Pay securely with multiple payment options available",
                color: "from-emerald-400 to-teal-500",
              },
              {
                step: "03",
                icon: <FiMapPin size={28} />,
                title: "Fast Delivery",
                desc: "Get your food delivered to your doorstep in minutes",
                color: "from-violet-400 to-purple-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative group bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute top-6 right-6 text-6xl font-extrabold text-gray-100 group-hover:text-[#e84c3d]/10 transition-colors duration-500">
                  {item.step}
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">{item.title}</h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Food Section */}
      <section id="featured" className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Our Menu
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#2d2d2d]">
                Our Featured <span className="text-[#e84c3d]">Food</span>
              </h2>
            </div>
            <Link
              to="/signup"
              className="hidden md:flex items-center gap-2 text-[#e84c3d] font-semibold text-sm hover:gap-3 transition-all duration-300"
            >
              See all Food <FiArrowRight />
            </Link>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-[#e84c3d] text-white shadow-lg shadow-red-200"
                    : "bg-white text-[#6b6b6b] hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFoods
              .filter(
                (food) =>
                  activeCategory === 0 || food.category === categories[activeCategory]
              )
              .map((food, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md">
                      <FaStar className="text-amber-400" size={12} />
                      <span className="text-xs font-bold text-[#2d2d2d]">{food.rating}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#2d2d2d] group-hover:text-[#e84c3d] transition-colors duration-300">
                        {food.name}
                      </h3>
                      <span className="text-xs font-medium text-[#6b6b6b] bg-gray-100 px-2.5 py-1 rounded-full">{food.category}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-extrabold text-[#e84c3d]">{food.price}</p>
                      <button
                        onClick={() => navigate("/signin")}
                        className="w-10 h-10 rounded-xl bg-[#e84c3d] text-white flex items-center justify-center hover:bg-[#d44235] transition-colors duration-300 shadow-md shadow-red-200 hover:shadow-lg cursor-pointer"
                      >
                        <span className="text-lg font-bold">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex md:hidden justify-center mt-8">
            <Link
              to="/signup"
              className="flex items-center gap-2 text-[#e84c3d] font-semibold text-sm hover:gap-3 transition-all duration-300"
            >
              See all Food <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 md:px-16 py-20 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e84c3d]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-[#e84c3d]/20 text-[#e84c3d] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Why People Choose <br />
                <span className="text-[#e84c3d]">MunchBae</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We deliver happiness to your doorstep with the fastest delivery service, 
                premium quality food, and an experience that keeps you coming back.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Lightning Fast Delivery", desc: "Average delivery time under 30 minutes", icon: "⚡" },
                  { title: "Fresh & Hygienic", desc: "Quality checked at every step", icon: "✨" },
                  { title: "Best Prices", desc: "Affordable prices with great offers", icon: "💰" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#e84c3d]/20 flex items-center justify-center text-xl group-hover:bg-[#e84c3d] transition-colors duration-300 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#e84c3d]/20 to-orange-500/10 rounded-3xl p-8">
                <img
                  src={scooterImg}
                  alt="Delivery"
                  className="w-full max-w-sm mx-auto drop-shadow-2xl"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <FiShield className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="text-[#2d2d2d] font-bold text-sm">100% Safe</p>
                    <p className="text-gray-400 text-xs">Contactless Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2d2d2d] mb-4">
              What Our <span className="text-[#e84c3d]">Customers</span> Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ananya S.", review: "MunchBae delivers the best food experience! The delivery is always on time and the food is always fresh.", rating: 5 },
              { name: "Rahul K.", review: "Amazing app! So many restaurants to choose from. The interface is super easy to use.", rating: 5 },
              { name: "Priya M.", review: "I love the live tracking feature. It's so convenient to know exactly when my food will arrive.", rating: 4 },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative"
              >
                <div className="absolute top-6 right-6 text-6xl text-[#e84c3d]/10 font-serif">"</div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < item.rating ? "text-amber-400" : "text-gray-200"}
                      size={16}
                    />
                  ))}
                </div>
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6">"{item.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e84c3d] to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                    {item.name[0]}
                  </div>
                  <p className="font-bold text-[#2d2d2d] text-sm">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#e84c3d] to-[#d44235] rounded-3xl px-8 md:px-16 py-14 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Hungry? We've Got You Covered!
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8 text-lg">
                Join thousands of happy customers and start ordering your favourite food today.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#e84c3d] rounded-xl font-bold text-base hover:bg-gray-100 transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                Get Started Now
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-6 md:px-16 py-16 bg-[#2d2d2d] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <img src={munchBaeLogo} alt="MunchBae" className="w-16 h-16 mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Your favourite food delivery partner. We deliver happiness to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 text-sm hover:text-[#e84c3d] transition-colors duration-300">About Us</a></li>
                <li><a href="#featured" className="text-gray-400 text-sm hover:text-[#e84c3d] transition-colors duration-300">Menu</a></li>
                <li><a href="#how-it-works" className="text-gray-400 text-sm hover:text-[#e84c3d] transition-colors duration-300">Delivery</a></li>
                <li><Link to="/faqs" className="text-gray-400 text-sm hover:text-[#e84c3d] transition-colors duration-300">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/partner-with-us" className="text-gray-400 text-sm hover:text-[#e84c3d] transition-colors duration-300">Partner with us</Link></li>
                <li><Link to="/blog" className="text-gray-400 text-sm hover:text-[#e84c3d] transition-colors duration-300">Blog</Link></li>
                <li><Link to="/terms-privacy" className="text-gray-400 text-sm hover:text-[#e84c3d] transition-colors duration-300">Terms & Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="text-gray-400 text-sm">munchbaehelp@gmail.com</li>
                <li className="text-gray-400 text-sm">+91 95342-14839</li>
                <li className="text-gray-400 text-sm">Jalandhar, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 MunchBae. All rights reserved. Made with ❤️ for food lovers.
            </p>
          </div>
        </div>
      </footer>
      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors duration-300 cursor-pointer"
            >
              <FiX size={20} />
            </button>
            <video
              src={deliveryVideo}
              controls
              autoPlay
              className="w-full aspect-video"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
