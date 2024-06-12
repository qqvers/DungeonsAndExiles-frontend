import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex h-full w-full items-start justify-start pt-48 2xl:justify-center">
      <div className="customShadow ml-6 h-[400px] w-[400px] rounded-lg bg-black/90 p-8 text-center text-yellow-500">
        <h1 className="text-4xl">Resource Not Found</h1>
        <h3 className="mt-24">
          The resource you are looking for does not exist or has been removed.
        </h3>
      </div>
    </div>
  );
};

export default ErrorPage;
