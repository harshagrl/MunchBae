import { useState } from "react";
import { Link } from "react-router-dom";
import munchBaeLogo from "../assets/munch-bae-logo.png";
import { FiArrowLeft } from "react-icons/fi";

const TermsPrivacy = () => {
  const [activeTab, setActiveTab] = useState("terms");

  const termsContent = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the MunchBae platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including customers, restaurant partners, and delivery partners.",
    },
    {
      title: "2. Use of Services",
      content: "MunchBae provides an online food ordering and delivery platform. You must be at least 18 years of age to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
    },
    {
      title: "3. Ordering & Payments",
      content: "All orders placed through MunchBae are subject to availability and restaurant acceptance. Prices displayed include applicable taxes unless stated otherwise. Payment is processed at the time of order placement. We support various payment methods including UPI, cards, and Cash on Delivery.",
    },
    {
      title: "4. Cancellation & Refunds",
      content: "Orders can be cancelled before the restaurant begins preparation. Refunds for cancelled orders are processed within 5–7 business days. In case of issues with delivered orders, refunds are evaluated on a case-by-case basis. Contact our support team for assistance.",
    },
    {
      title: "5. Delivery",
      content: "Estimated delivery times are approximate and may vary based on factors like traffic, weather, and restaurant preparation time. MunchBae and its delivery partners will make reasonable efforts to deliver your order in a timely manner.",
    },
    {
      title: "6. User Conduct",
      content: "Users must not misuse the platform, provide false information, or engage in fraudulent activities. MunchBae reserves the right to suspend or terminate accounts that violate these terms or engage in abusive behavior toward restaurant or delivery partners.",
    },
    {
      title: "7. Limitation of Liability",
      content: "MunchBae acts as an intermediary between customers and restaurants. We are not liable for the quality, safety, or legality of food items provided by restaurant partners. Our liability is limited to the order value in case of service-related issues.",
    },
  ];

  const privacyContent = [
    {
      title: "1. Information We Collect",
      content: "We collect personal information such as your name, email address, phone number, delivery address, and payment details when you create an account and place orders. We also collect device information, location data, and usage analytics to improve our services.",
    },
    {
      title: "2. How We Use Your Information",
      content: "Your information is used to process orders, provide delivery services, communicate updates, personalize your experience, and improve our platform. We may also use it for fraud prevention, analytics, and to comply with legal obligations.",
    },
    {
      title: "3. Data Sharing",
      content: "We share your information with restaurant partners (for order preparation), delivery partners (for delivery), and payment processors (for transactions). We do not sell your personal data to third parties for marketing purposes.",
    },
    {
      title: "4. Data Security",
      content: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your data. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "5. Cookies & Tracking",
      content: "We use cookies and similar technologies to enhance your browsing experience, remember preferences, and gather analytics. You can control cookie settings through your browser, though some features may not work properly without cookies.",
    },
    {
      title: "6. Your Rights",
      content: "You have the right to access, update, or delete your personal information at any time through your account settings. You may also request a copy of your data or opt out of marketing communications by contacting our support.",
    },
    {
      title: "7. Contact Us",
      content: "For any privacy-related concerns or questions, please contact our Data Protection Officer at privacy@munchbae.com. We aim to respond to all inquiries within 48 hours.",
    },
  ];

  const content = activeTab === "terms" ? termsContent : privacyContent;

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

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2d2d2d] mb-4">
            Terms & <span className="text-[#e84c3d]">Privacy</span>
          </h1>
          <p className="text-[#6b6b6b]">Last updated: February 2026</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 max-w-sm mx-auto">
          <button
            onClick={() => setActiveTab("terms")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "terms" ? "bg-[#e84c3d] text-white shadow-lg shadow-red-200" : "text-[#6b6b6b] hover:text-[#2d2d2d]"
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "privacy" ? "bg-[#e84c3d] text-white shadow-lg shadow-red-200" : "text-[#6b6b6b] hover:text-[#2d2d2d]"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {content.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#2d2d2d] mb-3">{section.title}</h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsPrivacy;
