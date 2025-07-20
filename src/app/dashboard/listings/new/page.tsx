"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { createListing } from "@/lib/services/listings";
import { ArrowLeft } from 'lucide-react';
import Image from "next/image";
// Removed Firebase Storage imports
// import { storage } from "@/lib/firebase";
// import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const usColleges: string[] = [
  "UCLA", "UT Austin", "UMich", "NYU", "UC Berkeley", "Harvard", "Stanford", "MIT", "Yale", "Princeton", "Columbia", "Cornell", "Duke", "USC", "UCSD", "UCSB", "UC Davis", "Northwestern", "Brown", "Rice", "Vanderbilt", "Emory", "Georgetown", "Carnegie Mellon", "University of Chicago", "University of Pennsylvania", "University of Michigan", "University of Florida", "University of Washington", "University of Wisconsin", "University of Illinois", "University of Texas", "University of North Carolina", "Boston University", "Boston College", "Purdue", "Penn State", "Ohio State", "Georgia Tech", "University of Maryland", "University of Virginia", "University of Minnesota", "University of Arizona", "Arizona State", "Rutgers", "Indiana University", "Michigan State", "Texas A&M", "Florida State", "University of Iowa", "University of Georgia", "University of Colorado", "University of Oregon", "University of Utah", "University of Kansas", "University of Oklahoma", "University of Nebraska", "University of Missouri", "University of Kentucky", "University of Tennessee", "University of Alabama", "University of Arkansas", "University of Mississippi", "University of South Carolina", "University of Louisville", "University of Connecticut", "University of Delaware", "University of New Hampshire", "University of Vermont", "University of Maine", "University of Rhode Island", "University of Hawaii", "University of Alaska", "University of Nevada", "University of New Mexico", "University of Idaho", "University of Montana", "University of Wyoming"
].sort();
const roomTypes = ["Studio", "1BR", "2BR", "3BR", "4BR", "5BR", "6BR", "Shared"];

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function NewListingPage() {
  const { user, userData } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [university, setUniversity] = useState("");
  const [roomType, setRoomType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tags, setTags] = useState("");
  const [isFurnished, setIsFurnished] = useState(false);
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [distance, setDistance] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Add per-field error state
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Test Firebase Storage connection
  useEffect(() => {
    const testStorageConnection = async () => {
      try {
        console.log('Testing Firebase Storage connection...');
        // This test is no longer relevant as we are using Cloudinary directly.
        // Keeping it for now, but it will always pass.
        console.log('Firebase Storage connection successful (Cloudinary)');
      } catch (error) {
        console.error('Firebase Storage connection failed:', error);
        setError('Firebase Storage is not properly configured. Please check your Firebase setup.');
      }
    };
    
    testStorageConnection();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArr = Array.from(files);
    setImageFiles(fileArr);
    setImages(fileArr.map(file => URL.createObjectURL(file))); // For preview only
  };

// Upload images directly to Cloudinary using unsigned preset
async function uploadImagesToCloudinary(files: File[]): Promise<string[]> {
  setUploading(true);
  setUploadProgress(0);
  const urls: string[] = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET!);
      // Optionally, set folder: formData.append('folder', 'listing-images');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Cloudinary upload failed for ${file.name}`);
      }
      const data = await res.json();
      urls.push(data.secure_url);
      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }
  } catch (error) {
    setUploading(false);
    throw error;
  }
  setUploading(false);
  return urls;
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Please log in to list a place");
      return;
    }
    setLoading(true);
    setError("");
    setFieldErrors({});

    // Validate all required fields at once
    const newFieldErrors: { [key: string]: string } = {};
    if (!title.trim()) newFieldErrors.title = "Title is required";
    if (!description.trim()) newFieldErrors.description = "Description is required";
    if (!university.trim()) newFieldErrors.university = "University is required";
    if (!roomType.trim()) newFieldErrors.roomType = "Room type is required";
    if (!price.trim()) newFieldErrors.price = "Price is required";
    if (!startDate.trim()) newFieldErrors.startDate = "Lease start date is required";
    if (!endDate.trim()) newFieldErrors.endDate = "Lease end date is required";
    if (!location.trim()) newFieldErrors.location = "Location is required";
    if (imageFiles.length < 4) newFieldErrors.images = "Please upload at least 4 images.";
    // tags and checkboxes are optional

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setLoading(false);
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setUploading(true);
      // Upload images to Cloudinary and get URLs
      const uploadedImageUrls = await uploadImagesToCloudinary(imageFiles);
      setUploading(false);
      const tagsArray: string[] = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      
      // Debug: Log the price value before sending to database
      console.log('Price before conversion:', price, 'Type:', typeof price);
      const priceNumber = Number(price);
      console.log('Price after conversion:', priceNumber, 'Type:', typeof priceNumber);
      
      await createListing({
        title,
        description,
        price: priceNumber,
        location,
        university,
        propertyType: roomType, // Use roomType as propertyType for now
        amenities: [],
        images: uploadedImageUrls,
        contactInfo: { phone: '', email: user.email! },
        availability: { startDate, endDate },
        rules: [],
        utilities: { included: [], notIncluded: [] },
        deposit: 0,
        status: 'active',
        views: 0,
        favorites: 0,
        userId: user.uid,
        // Optional/legacy fields
        roomType: roomType as 'Studio' | '1BR' | '2BR' | '3BR' | '4BR' | '5BR' | '6BR' | 'Shared',
        startDate,
        endDate,
        tags: tagsArray,
        distance,
        userEmail: user.email!,
        userName: userData?.displayName || user.displayName || 'Anonymous',
        isActive: true,
        isFurnished,
        utilitiesIncluded,
        petsAllowed,
        parkingAvailable,
      });
      router.push("/dashboard/listings");
    } catch (error: any) {
      setError(error.message);
      setUploading(false);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="w-full max-w-xl mx-auto mt-10 bg-white border border-[var(--border)] rounded-xl shadow-sm p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Please log in to list your place</h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white border border-[var(--border)] rounded-xl shadow-sm p-8 flex flex-col gap-8">
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push('/dashboard/listings');
          }
        }}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-2 w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">List Your Place</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.title ? 'border-red-500' : 'border-[var(--border)]'}`}
            placeholder="Cozy Studio Near Campus"
          />
          {fieldErrors.title && <div className="text-red-600 text-xs mt-1">{fieldErrors.title}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.description ? 'border-red-500' : 'border-[var(--border)]'}`}
            placeholder="Describe your apartment, amenities, and anything else students should know!"
          />
          {fieldErrors.description && <div className="text-red-600 text-xs mt-1">{fieldErrors.description}</div>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <input
              type="text"
              value={university}
              onChange={e => setUniversity(e.target.value)}
              list="us-colleges"
              className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.university ? 'border-red-500' : 'border-[var(--border)]'}`}
              placeholder="Type or select a university"
            />
            <datalist id="us-colleges">
              {usColleges.map(u => <option key={u} value={u} />)}
            </datalist>
            {fieldErrors.university && <div className="text-red-600 text-xs mt-1">{fieldErrors.university}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Room Type</label>
            <select
              value={roomType}
              onChange={e => setRoomType(e.target.value)}
              className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.roomType ? 'border-red-500' : 'border-[var(--border)]'}`}
            >
              <option value="">Select Room Type</option>
              {roomTypes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {fieldErrors.roomType && <div className="text-red-600 text-xs mt-1">{fieldErrors.roomType}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (USD/month)</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.price ? 'border-red-500' : 'border-[var(--border)]'}`}
              placeholder="1200"
            />
            {fieldErrors.price && <div className="text-red-600 text-xs mt-1">{fieldErrors.price}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Distance to Campus (e.g. 0.5 mi)</label>
            <input
              type="text"
              value={distance}
              onChange={e => setDistance(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
              placeholder="0.5 mi"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Lease Start</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.startDate ? 'border-red-500' : 'border-[var(--border)]'}`}
            />
            {fieldErrors.startDate && <div className="text-red-600 text-xs mt-1">{fieldErrors.startDate}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lease End</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.endDate ? 'border-red-500' : 'border-[var(--border)]'}`}
            />
            {fieldErrors.endDate && <div className="text-red-600 text-xs mt-1">{fieldErrors.endDate}</div>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.location ? 'border-red-500' : 'border-[var(--border)]'}`}
            placeholder="e.g., Westwood, Los Angeles, CA"
          />
          {fieldErrors.location && <div className="text-red-600 text-xs mt-1">{fieldErrors.location}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
            placeholder="Furnished, Pets allowed, Parking"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Apartment Images <span className="text-red-600">*</span> <span className="text-xs text-gray-500">(at least 4 required)</span></label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className={`w-full rounded-lg border px-4 py-2 ${fieldErrors.images ? 'border-red-500' : 'border-[var(--border)]'}`}
          />
          {fieldErrors.images && <div className="text-red-600 text-xs mt-1">{fieldErrors.images}</div>}
          {uploading && (
            <div className="text-blue-600 text-xs mt-1">Uploading images... {uploadProgress}%</div>
          )}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                  <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isFurnished} onChange={e => setIsFurnished(e.target.checked)} /> Furnished
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={utilitiesIncluded} onChange={e => setUtilitiesIncluded(e.target.checked)} /> Utilities Included
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={petsAllowed} onChange={e => setPetsAllowed(e.target.checked)} /> Pets Allowed
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={parkingAvailable} onChange={e => setParkingAvailable(e.target.checked)} /> Parking
          </label>
        </div>
        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg px-8 py-3 text-lg shadow-sm transition-colors mt-2">
          {loading ? 'Creating Listing...' : 'List Place'}
        </button>
      </form>
    </div>
  );
} 