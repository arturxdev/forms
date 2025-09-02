import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`pt-6 ${className}`}>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h1>
      <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>
    </div>
  );
};
