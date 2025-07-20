"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Listing } from "../../lib/services/listings";
import Image from "next/image";
import { MessageCircle, MapPin, Calendar, DollarSign, Users, Home, Car, PawPrint, Zap } from "lucide-react";
import { useState } from "react";
import { 
  AnimatedCard, 
  AnimatedButton, 
  GradientText, 
  AnimatedBadge,
  AnimatedListItem,
  AnimatedDivider
} from "../../components/ui/aceternity";

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

  const [showContact, setShowContact] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            <GradientText>{title}</GradientText>
          </DialogTitle>
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
          <AnimatedCard delay={0.1}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${Math.round(price)}/month
                </div>
                <div className="text-gray-600 flex items-center gap-2 mt-2 font-medium">
                  <MapPin className="w-4 h-4" />
                  {location}
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">{distance} to campus</div>
              </div>
            </div>
          </AnimatedCard>

          {/* Description */}
          <AnimatedCard delay={0.2}>
            <h3 className="text-lg font-semibold mb-3">
              <GradientText>Description</GradientText>
            </h3>
            <p className="text-gray-700 leading-relaxed text-base font-medium tracking-wide">{description}</p>
          </AnimatedCard>

          {/* Key Details */}
          <AnimatedCard delay={0.3}>
            <h3 className="text-lg font-semibold mb-4">
              <GradientText>Property Details</GradientText>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <AnimatedListItem delay={0.1}>
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Room Type: <span className="font-semibold text-gray-900">{roomType}</span></span>
                  </div>
                </AnimatedListItem>
                <AnimatedListItem delay={0.2}>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">University: <span className="font-semibold text-gray-900">{university}</span></span>
                  </div>
                </AnimatedListItem>
                <AnimatedListItem delay={0.3}>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Available: <span className="font-semibold text-gray-900">{formatDate(startDate || '')} - {formatDate(endDate || '')}</span></span>
                  </div>
                </AnimatedListItem>
              </div>
              
              <div className="space-y-3">
                <AnimatedListItem delay={0.4}>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Price: <span className="font-semibold text-gray-900">${Math.round(price)}/month</span></span>
                  </div>
                </AnimatedListItem>
                <AnimatedListItem delay={0.5}>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Distance: <span className="font-semibold text-gray-900">{distance}</span></span>
                  </div>
                </AnimatedListItem>
                <AnimatedListItem delay={0.6}>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Landlord: <span className="font-semibold text-gray-900">{userName || "Anonymous"}</span></span>
                  </div>
                </AnimatedListItem>
              </div>
            </div>
          </AnimatedCard>

          {/* Amenities */}
          <AnimatedCard delay={0.4}>
            <h3 className="text-lg font-semibold mb-4">
              <GradientText>Amenities</GradientText>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <AnimatedListItem delay={0.1}>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${isFurnished ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">Furnished</span>
                </div>
              </AnimatedListItem>
              <AnimatedListItem delay={0.2}>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${utilitiesIncluded ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Utilities Included</span>
                </div>
              </AnimatedListItem>
              <AnimatedListItem delay={0.3}>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${petsAllowed ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                  <PawPrint className="w-4 h-4" />
                  <span className="text-sm font-medium">Pets Allowed</span>
                </div>
              </AnimatedListItem>
              <AnimatedListItem delay={0.4}>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${parkingAvailable ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                  <Car className="w-4 h-4" />
                  <span className="text-sm font-medium">Parking</span>
                </div>
              </AnimatedListItem>
            </div>
          </AnimatedCard>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <AnimatedCard delay={0.5}>
              <h3 className="text-lg font-semibold mb-4">
                <GradientText>Features</GradientText>
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <AnimatedBadge key={tag} variant="default" className="text-sm">
                    {tag}
                  </AnimatedBadge>
                ))}
              </div>
            </AnimatedCard>
          )}

          {/* Contact Section */}
          <AnimatedCard delay={0.6}>
            <AnimatedDivider className="mb-6" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-blue-200">
                  <AvatarImage src={undefined} alt={userName || "Landlord"} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                    {(userName || "L")[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">{userName || "Anonymous Landlord"}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Verified Landlord
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <AnimatedButton 
                  variant="gradient"
                  onClick={() => setShowContact((v) => !v)}
                  className="px-6 py-3"
                >
                  {showContact ? 'Hide Contact Details' : 'Get Contact Details'}
                </AnimatedButton>
                {showContact && (
                  <AnimatedCard className="mt-3 p-4 min-w-[280px]">
                                          <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">Email:</span>
                          <span className="text-blue-600 font-medium">{listing.contactInfo?.email || listing.userEmail || 'N/A'}</span>
                        </div>
                        {listing.contactInfo?.phone && (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-700">Phone:</span>
                            <span className="text-blue-600 font-medium">{listing.contactInfo?.phone}</span>
                          </div>
                        )}
                      </div>
                  </AnimatedCard>
                )}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </DialogContent>
    </Dialog>
  );
} 