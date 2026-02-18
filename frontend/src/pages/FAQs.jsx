import { useState } from "react";
import { Link } from "react-router-dom";
import munchBaeLogo from "../assets/munch-bae-logo.png";
import { FiChevronDown, FiArrowLeft } from "react-icons/fi";

const faqs = [
  {
    question: "What is MunchBae?",
    answer:
      "MunchBae is a food delivery platform that connects you with the best local restaurants. We ensure fast, reliable, and hygienic food delivery right to your doorstep.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply sign up or log in, browse restaurants and menus, add items to your cart, choose your delivery address, and place your order. It's that easy!",
  },
  {
    question: "What are the delivery charges?",
    answer:
      "Delivery charges vary based on the distance between the restaurant and your location. We keep our charges minimal and transparent — you can see the exact amount before placing your order.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Average delivery time is 25–35 minutes depending on your location and the restaurant's preparation time. You can track your order in real-time using our live tracking feature.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel your order before the restaurant starts preparing it. Once preparation begins, cancellation may not be possible. Please check the cancellation policy in the app for more details.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, credit/debit cards, net banking, and popular wallets. We also support Cash on Delivery (COD) in select areas.",
  },
  {
    question: "How do I become a delivery partner?",
    answer:
      "Visit our 'Partner with Us' page and fill out the application form. Our team will review your application and get back to you within 48 hours.",
  },
  {
    question: "Is there a minimum order value?",
    answer:
      "Minimum order values are set by individual restaurants. You can check the minimum order requirement on each restaurant's page.",
  },
  {
    question: "How do I report an issue with my order?",
    answer:
      "You can reach out to our support team through the app or email us at support@munchbae.com. We aim to resolve all issues within 24 hours.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes! If there's a genuine issue with your order (e.g., wrong items, missing items, quality concerns), we offer full or partial refunds depending on the situation.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div
      className="min-h-screen bg-[#fefaf6]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <nav className="w-full px-6 md:px-16 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={munchBaeLogo}
            alt="MunchBae Logo"
            className="w-16 h-16 object-contain drop-shadow-md"
          />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#e84c3d] font-medium text-sm transition-colors duration-300"
        >
          <FiArrowLeft size={18} />
          Back to Home
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Got Questions?
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2d2d2d] mb-4">
            Frequently Asked{" "}
            <span className="text-[#e84c3d]">Questions</span>
          </h1>
          <p className="text-[#6b6b6b] text-lg max-w-md mx-auto">
            Find answers to the most common questions about MunchBae.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "border-[#e84c3d]/30 shadow-lg shadow-red-50"
                  : "border-gray-100 shadow-sm hover:shadow-md"
              }`}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <span
                  className={`font-semibold text-base pr-4 transition-colors duration-300 ${
                    openIndex === index
                      ? "text-[#e84c3d]"
                      : "text-[#2d2d2d]"
                  }`}
                >
                  {faq.question}
                </span>
                <FiChevronDown
                  size={20}
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index
                      ? "rotate-180 text-[#e84c3d]"
                      : "text-[#6b6b6b]"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-60 pb-6" : "max-h-0"
                }`}
              >
                <p className="px-6 text-[#6b6b6b] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#e84c3d] to-[#d44235] rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-white/80 mb-6">
            Our support team is here to help you 24/7.
          </p>
          <a
            href="mailto:munchbaehelp@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#e84c3d] rounded-xl font-bold text-sm hover:bg-gray-100 transition-all duration-300 shadow-xl hover:-translate-y-0.5"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
