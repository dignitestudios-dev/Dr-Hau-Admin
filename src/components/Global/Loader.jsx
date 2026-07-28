import React from "react";

export const Spinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full min-h-[200px]">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} border-gray-200 border-t-black rounded-full animate-spin`}
      ></div>
      {text && <p className="mt-3 text-sm font-medium text-gray-500 animate-pulse">{text}</p>}
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-3 p-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-gray-200 rounded-md w-full"></div>
      ))}
    </div>
  );
};

export default Spinner;
