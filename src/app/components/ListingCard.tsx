import Image from "next/image";
import { Listing } from "../../lib/services/listings";
import ListingDialog from "./ListingDialog";
import { useState } from "react";
import { motion } from "framer-motion";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  // Add safety checks for undefined listing
  if (!listing) {
    console.error('ListingCard received undefined listing');
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg flex flex-col w-full overflow-hidden">
        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const { images, price, location, tags, distance, title, roomType, university } = listing;
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
      <motion.div 
        className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg flex flex-col w-full flex-1 overflow-hidden cursor-pointer group"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-full h-56 flex items-center justify-center overflow-hidden">
          <Image 
            src={imageList[currentImage]} 
            alt={title || "Apartment"} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              console.error('Image failed to load:', imageList[currentImage]);
              const target = e.target as HTMLImageElement;
              target.src = "/images/standard.jpeg";
            }}
          />
          {totalImages > 1 && (
            <>
              <motion.button 
                onClick={handlePrev} 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button 
                onClick={handleNext} 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
              <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1 font-medium">
                {currentImage + 1}/{totalImages}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">{university}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{location}</div>
              <div className="text-sm text-gray-600 mb-2">{roomType} • {distance} to campus</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent">
                ${price}/mo
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags && tags.map((tag) => (
              <span key={tag} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium border border-blue-200/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </ListingDialog>
  );
} 