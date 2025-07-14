import Image from "next/image";

interface PostCardProps {
  image: string;
  price: string;
  location: string;
  tags: string[];
  distance: string;
}

export default function PostCard({ image, price, location, tags, distance }: PostCardProps) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-4 flex flex-col gap-3 w-full max-w-xs hover:shadow-md transition-shadow duration-200">
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <Image src={image} alt="Apartment" fill className="object-cover" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-semibold text-[var(--foreground)]">{price}</span>
        <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors" aria-label="Like">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <span>{location}</span>
        <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 ml-auto">{distance} to campus</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((tag) => (
          <span key={tag} className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
} 