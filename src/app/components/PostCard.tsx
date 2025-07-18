import Image from "next/image";
import { Listing } from "../../lib/services/listings";
import ListingDialog from "./ListingDialog";
import { useState } from "react";

interface PostCardProps {
  listing: Listing;
}

export default function PostCard({ listing }: PostCardProps) {
  // Add safety checks for undefined listing
  if (!listing) {
    console.error('PostCard received undefined listing');
    return (
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm flex flex-col w-full max-w-xs overflow-hidden">
        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const { images, price, location, tags, distance, title } = listing;
  const [currentImage, setCurrentImage] = useState(0);
  const hasImages = images && images.length > 0;
  const imageList = hasImages ? images : ["/images/standard.jpeg"];
  const totalImages = imageList.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };
  
  return (
    <ListingDialog listing={listing}>
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm flex flex-col w-full flex-1 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <div className="relative w-full h-48 flex items-center justify-center">
        <Image 
          src={imageList[currentImage]} 
          alt={title || "Apartment"} 
          fill 
          className="object-cover"
          onError={(e) => {
            console.error('Image failed to load:', imageList[currentImage]);
            const target = e.target as HTMLImageElement;
            target.src = "/images/standard.jpeg";
          }}
        />
        {totalImages > 1 && (
          <>
            <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white z-10" aria-label="Previous image">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white z-10" aria-label="Next image">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs rounded px-2 py-0.5">{currentImage + 1}/{totalImages}</span>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-[var(--foreground)]">${price}/mo</span>
          <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{distance} to campus</span>
        </div>
        <div className="text-sm text-gray-700 font-medium truncate">{location}</div>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags && tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
    </ListingDialog>
  );
} 