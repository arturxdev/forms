import React from "react";
import Image from "next/image";

interface PageImageHeaderProps {
  imageUrl: string;
  altText?: string;
  className?: string;
  height?: string;
}

export const PageImageHeader: React.FC<PageImageHeaderProps> = ({
  imageUrl,
  altText = "Encabezado de página",
  className = "",
  height = "h-40",
}) => {
  return (
    <div className={`${height} w-full overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={altText}
        className="h-full w-full object-cover"
        width={1600}
        height={400}
        priority
        style={{ display: "block" }}
      />
    </div>
  );
};
