import React from "react";

export const Devider = () => {
  return (
    <div className="flex items-center w-full my-4">
      <div className="h-px flex-1 bg-gray-300"></div>
      <span className="px-4 text-sm text-gray-500">OR</span>
      <div className="h-px flex-1 bg-gray-300"></div>
    </div>
  );
};
