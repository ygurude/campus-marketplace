"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Listing } from "../../lib/services/listings";
import Image from "next/image";
import { MessageCircle, MapPin, Calendar, DollarSign, Users, Home, Car, PawPrint, Zap } from "lucide-react";
import { useState } from "react";

interface ListingDialogProps {
  listing: Listing;
  children: React.ReactNode;
}

export default function ListingDialog({ listing, children }: ListingDialogProps) {
  const { 
    title, 
    description, 
    price, 
    location, 
    university, 
    roomType, 
    startDate, 
    endDate, 
    tags, 
    images, 
    distance,
    isFurnished,
    utilitiesIncluded,
    petsAllowed,
    parkingAvailable,
    userName
  } = listing;

  const [currentImage, setCurrentImage] = useState(0);
  const hasImages = images && images.length > 0;
  const imageList: string[] = hasImages ? images.filter((img): img is string => typeof img === 'string' && Boolean(img)) : ["/images/standard.jpeg"];
  const totalImages = imageList.length;
  const imageSrc: string = typeof imageList[currentImage] === 'string' ? imageList[currentImage] : '/images/standard.jpeg';

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  function getImageSrc(): string {
    const src = imageList[currentImage];
    if (typeof src === 'string' && src.length > 0) return src;
    return '/images/standard.jpeg';
  }

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const lightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };
  const lightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => openLightbox(currentImage)}>
            <Image 
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              onError={(e) => {
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

          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60" onClick={closeLightbox}>
              <div className="relative max-w-2xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <button onClick={closeLightbox} className="absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10" aria-label="Close">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="relative w-[90vw] max-w-2xl h-[60vw] max-h-[80vh] flex items-center justify-center">
                  <Image
                    src={typeof imageList[lightboxIndex] === 'string' ? imageList[lightboxIndex] : '/images/standard.jpeg'}
                    alt={title}
                    fill
                    className="object-contain rounded-lg bg-black"
                  />
                  {totalImages > 1 && (
                    <>
                      <button onClick={lightboxPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10" aria-label="Previous image">
                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={lightboxNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10" aria-label="Next image">
                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs rounded px-2 py-0.5">{lightboxIndex + 1}/{totalImages}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Price and Location */}
          <div className="flex justify-between items-start">
            <div>
              <div className="text-3xl font-bold text-green-600">${price}/month</div>
              <div className="text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {location}
              </div>
              <div className="text-sm text-gray-500 mt-1">{distance} to campus</div>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Landlord
            </Button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Room Type: <span className="font-semibold">{roomType}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">University: <span className="font-semibold">{university}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Available: <span className="font-semibold">{formatDate(startDate || '')} - {formatDate(endDate || '')}</span></span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Price: <span className="font-semibold">${price}/month</span></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Distance: <span className="font-semibold">{distance}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Landlord: <span className="font-semibold">{userName || "Anonymous"}</span></span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className={`flex items-center gap-2 p-2 rounded ${isFurnished ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                <Home className="w-4 h-4" />
                <span className="text-sm">Furnished</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded ${utilitiesIncluded ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                <Zap className="w-4 h-4" />
                <span className="text-sm">Utilities Included</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded ${petsAllowed ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                <PawPrint className="w-4 h-4" />
                <span className="text-sm">Pets Allowed</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded ${parkingAvailable ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                <Car className="w-4 h-4" />
                <span className="text-sm">Parking</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={undefined} alt={userName || "Landlord"} />
                  <AvatarFallback>{(userName || "L")[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{userName || "Anonymous Landlord"}</div>
                  <div className="text-sm text-gray-500">Verified Landlord</div>
                </div>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Landlord
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 