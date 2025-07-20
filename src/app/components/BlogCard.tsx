import Image from "next/image";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  link?: string;
  category?: string;
  readTime?: string;
  illustration?: React.ReactNode;
}

export default function BlogCard({ image, title, description, category, readTime, illustration }: BlogCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-4 w-full hover:shadow-lg transition-all duration-200 relative overflow-hidden group">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        {illustration && <div className="absolute top-3 right-3 opacity-60">{illustration}</div>}
      </div>
      
      <div className="flex flex-col gap-3">
        {category && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full w-fit">
            {category}
          </span>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
        
        {readTime && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
            <span>📖</span>
            <span>{readTime}</span>
          </div>
        )}
      </div>
    </div>
  );
} 