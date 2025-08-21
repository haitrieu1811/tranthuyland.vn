import React from "react";

export default function PageTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-secondary py-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-center tracking-tight">
          {title}
        </h1>
        {description && <p className="text-center">{description}</p>}
      </div>
    </div>
  );
}
