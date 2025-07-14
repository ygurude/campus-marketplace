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
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm flex flex-col w-full max-w-xs overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative w-full h-48">
        <Image src={image} alt="Apartment" fill className="object-cover" />
        <button className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors" aria-label="Favorite">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-[var(--foreground)]">{price}</span>
          <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{distance} to campus</span>
        </div>
        <div className="text-sm text-gray-700 font-medium truncate">{location}</div>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 