import { Link } from "react-router-dom";
import munchBaeLogo from "../assets/munch-bae-logo.png";
import image1 from "../assets/image1.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image3 from "../assets/image3.jpg";
import image2 from "../assets/image2.webp";
import { FiArrowLeft, FiClock, FiArrowRight } from "react-icons/fi";

const blogs = [
  {
    title: "10 Must-Try Street Foods in Mumbai",
    excerpt: "From Vada Pav to Pav Bhaji, discover the street food gems that make Mumbai a foodie paradise. Our curated list covers the best vendors and spots across the city.",
    image: image1,
    category: "Food Guide",
    readTime: "5 min read",
    date: "Feb 15, 2026",
  },
  {
    title: "The Art of the Perfect Burger",
    excerpt: "What makes a burger truly great? From the bun to the patty, the sauce to the toppings, we break down the anatomy of an unforgettable burger.",
    image: image5,
    category: "Food Science",
    readTime: "7 min read",
    date: "Feb 12, 2026",
  },
  {
    title: "Healthy Eating Made Easy with MunchBae",
    excerpt: "Eating healthy doesn't mean sacrificing taste. Learn how to make nutritious choices while ordering from your favourite restaurants.",
    image: image6,
    category: "Health & Nutrition",
    readTime: "4 min read",
    date: "Feb 8, 2026",
  },
  {
    title: "South Indian Cuisine: A Culinary Journey",
    excerpt: "Explore the rich flavours of South Indian cuisine — from crispy dosas to fluffy idlis, tangy sambar to creamy coconut chutneys.",
    image: image7,
    category: "Cuisine Spotlight",
    readTime: "6 min read",
    date: "Feb 5, 2026",
  },
  {
    title: "How MunchBae Ensures Food Safety",
    excerpt: "Your safety is our priority. Learn about the rigorous food safety standards and hygiene protocols we follow at every step of delivery.",
    image: image2,
    category: "Behind the Scenes",
    readTime: "4 min read",
    date: "Jan 30, 2026",
  },
  {
    title: "Desserts That Will Make Your Day",
    excerpt: "Treat yourself to our top dessert picks! From decadent chocolate cakes to creamy ice-cream sundaes, satisfy your sweet tooth today.",
    image: image3,
    category: "Desserts",
    readTime: "3 min read",
    date: "Jan 25, 2026",
  },
];

const Blog = () => {
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

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2d2d2d] mb-4">
            Food Stories & <span className="text-[#e84c3d]">Insights</span>
          </h1>
          <p className="text-[#6b6b6b] text-lg max-w-lg mx-auto">
            Discover food guides, recipes, and behind-the-scenes stories from MunchBae.
          </p>
        </div>

        {/* Featured Blog */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 grid grid-cols-1 md:grid-cols-2 group hover:shadow-2xl transition-all duration-500">
            <div className="overflow-hidden h-64 md:h-auto">
              <img src={blogs[0].image} alt={blogs[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
                {blogs[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#2d2d2d] mb-4 group-hover:text-[#e84c3d] transition-colors duration-300">
                {blogs[0].title}
              </h2>
              <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6">{blogs[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#6b6b6b] text-xs">
                  <FiClock size={14} />
                  <span>{blogs[0].readTime}</span>
                  <span className="mx-1">•</span>
                  <span>{blogs[0].date}</span>
                </div>
                <span className="flex items-center gap-1 text-[#e84c3d] text-sm font-semibold cursor-pointer hover:gap-2 transition-all duration-300">
                  Read More <FiArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(1).map((blog, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 group hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2">
              <div className="overflow-hidden h-48">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {blog.category}
                </span>
                <h3 className="text-lg font-bold text-[#2d2d2d] mb-2 group-hover:text-[#e84c3d] transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#6b6b6b] text-xs">
                    <FiClock size={12} />
                    <span>{blog.readTime}</span>
                  </div>
                  <span className="text-xs text-[#6b6b6b]">{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
