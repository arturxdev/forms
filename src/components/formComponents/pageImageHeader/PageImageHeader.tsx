import React from "react";
import Image from "next/image";

interface PageImageHeaderProps {
  imageUrl: string;
  altText?: string;
  className?: string;
  size?: string;
}

export const PageImageHeader: React.FC<PageImageHeaderProps> = ({
  imageUrl,
  altText = "Logo",
  className = "",
  size = "w-24 h-24",
}) => {
  return (
    <div className={`${size} rounded-full overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={altText}
        className="h-full w-full object-cover"
        width={96}
        height={96}
        priority
        style={{ display: "block" }}
      />
    </div>
  );
};
