import { Link } from "react-router-dom";
import munchBaeLogo from "../assets/munch-bae-logo.png";
import { FiArrowLeft, FiTruck, FiHome, FiDollarSign, FiTrendingUp, FiUsers, FiCheckCircle } from "react-icons/fi";

const benefits = [
  {
    icon: <FiTrendingUp size={28} />,
    title: "Grow Your Business",
    desc: "Reach thousands of new customers in your city with our platform.",
    color: "from-orange-400 to-[#e84c3d]",
  },
  {
    icon: <FiDollarSign size={28} />,
    title: "Increase Revenue",
    desc: "Our partners see an average 30% increase in monthly revenue.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Dedicated Support",
    desc: "Get a dedicated account manager and 24/7 operational support.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: <FiTruck size={28} />,
    title: "Reliable Delivery",
    desc: "Our fleet of trained delivery partners ensures your food reaches customers hot and fresh.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: <FiHome size={28} />,
    title: "Easy Onboarding",
    desc: "Get set up in under 48 hours with our streamlined onboarding process.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: <FiCheckCircle size={28} />,
    title: "Real-Time Analytics",
    desc: "Track orders, revenue, and customer feedback with our powerful dashboard.",
    color: "from-blue-400 to-indigo-500",
  },
];

const steps = [
  { step: "01", title: "Apply Online", desc: "Fill out the simple registration form with your restaurant details." },
  { step: "02", title: "Verification", desc: "Our team verifies your documents and restaurant within 48 hours." },
  { step: "03", title: "Go Live", desc: "Set up your menu, pricing, and start receiving orders!" },
];

const PartnerWithUs = () => {
  return (
    <div className="min-h-screen bg-[#fefaf6]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <nav className="w-full px-6 md:px-16 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <img src={munchBaeLogo} alt="MunchBae Logo" className="w-16 h-16 object-contain drop-shadow-md" />
        </Link>
        <Link to="/" className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#e84c3d] font-medium text-sm transition-colors duration-300">
          <FiArrowLeft size={18} />
          Back to Home
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-16 py-20 text-center relative overflow-hidden">
        <div className="absolute top-10 right-0 w-80 h-80 bg-[#e84c3d]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-orange-100/50 rounded-full blur-3xl"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Join Our Network
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2d2d2d] mb-6">
            Partner with <span className="text-[#e84c3d]">MunchBae</span>
          </h1>
          <p className="text-[#6b6b6b] text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            Join 500+ restaurants already growing their business with us. Reach more customers, increase revenue, and let us handle the delivery.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e84c3d] text-white rounded-xl font-bold text-base hover:bg-[#d44235] transition-all duration-300 shadow-lg shadow-red-200 hover:-translate-y-1"
          >
            Register Your Restaurant
          </Link>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d2d2d] mb-3">
              Why Partner With <span className="text-[#e84c3d]">Us?</span>
            </h2>
            <p className="text-[#6b6b6b] max-w-md mx-auto">Everything you need to grow your food business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2 group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">{b.title}</h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d2d2d] mb-3">
              How to <span className="text-[#e84c3d]">Join</span>
            </h2>
            <p className="text-[#6b6b6b]">Get started in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#e84c3d]/10 flex items-center justify-center mb-6 group-hover:bg-[#e84c3d] transition-colors duration-300">
                  <span className="text-2xl font-extrabold text-[#e84c3d] group-hover:text-white transition-colors duration-300">{s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-[#2d2d2d] mb-2">{s.title}</h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#e84c3d] to-[#d44235] rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">Join MunchBae today and start receiving orders from thousands of hungry customers.</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#e84c3d] rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:-translate-y-0.5"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerWithUs;
