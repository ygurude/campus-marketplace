import BlogCard from "../components/BlogCard";
import FilterIllustration from "../components/FilterIllustration";

const blogPosts = [
  {
    image: "/window.svg",
    title: "How to Find the Perfect Sublease as a Student",
    description: "Tips and tricks for finding a great apartment near your campus, even on a budget!",
    illustration: <FilterIllustration />,
  },
  {
    image: "/file.svg",
    title: "Subleasing 101: What You Need to Know",
    description: "A beginner's guide to subleasing your apartment safely and easily.",
  },
  {
    image: "/globe.svg",
    title: "Roommate Harmony: Living with New People",
    description: "How to get along with new roommates and make your sublease experience fun.",
  },
  {
    image: "/vercel.svg",
    title: "Packing Hacks for College Moves",
    description: "Make your next move-in or move-out a breeze with these packing tips.",
    illustration: <FilterIllustration />,
  },
];

export default function BlogPage() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-black mb-8 text-center">Student Living & Subleasing Tips</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogPosts.map((post, idx) => (
          <BlogCard key={idx} {...post} />
        ))}
      </div>
    </div>
  );
} 