import Image from "next/image";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  illustration?: React.ReactNode;
}

export default function BlogCard({ image, title, description, illustration }: BlogCardProps) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-4 flex flex-col gap-3 w-full max-w-md hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-2">{description}</p>
      {illustration && <div className="absolute top-3 right-3 opacity-60">{illustration}</div>}
    </div>
  );
} 