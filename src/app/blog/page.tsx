import BlogCard from "../components/BlogCard";
import FilterIllustration from "../components/FilterIllustration";
import Link from "next/link";

const blogPosts = [
  {
    image: "/images/hub.jpeg",
    title: "How to Find the Perfect Sublease as a Student",
    description: "Discover proven strategies for finding affordable, safe, and convenient housing near your campus. Learn about timing, budgeting, and red flags to avoid.",
    link: "/blog/finding-perfect-sublease",
    category: "Housing Guide",
    readTime: "5 min read"
  },
  {
    image: "/images/mark.jpeg",
    title: "Subleasing 101: What You Need to Know",
    description: "Master the basics of subleasing - from understanding your rights and responsibilities to handling deposits and utilities. Essential knowledge for every student.",
    link: "/blog/subleasing-101",
    category: "Legal Guide",
    readTime: "7 min read"
  },
  {
    image: "/images/sq5.jpeg",
    title: "Roommate Harmony: Living with New People",
    description: "Navigate the challenges of living with roommates you don't know. Tips for communication, setting boundaries, and creating a positive living environment.",
    link: "/blog/roommate-harmony",
    category: "Living Tips",
    readTime: "6 min read"
  },
  {
    image: "/images/standard.jpeg",
    title: "Safety Tips for Student Housing",
    description: "Essential safety considerations when choosing and living in student housing. From neighborhood research to apartment security measures.",
    link: "/blog/safety-tips",
    category: "Safety",
    readTime: "5 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">Student Living & Subleasing Tips</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Expert advice to help you navigate student housing, find great deals, and make the most of your college living experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {blogPosts.map((post, idx) => (
          <Link key={idx} href={post.link} className="block hover:scale-105 transition-transform duration-200">
            <BlogCard {...post} />
          </Link>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-black mb-4">Need More Help?</h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our community is here to help!
        </p>
        <Link 
          href="/listings" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Browse Available Subleases
        </Link>
      </div>
    </div>
  );
} 