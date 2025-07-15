import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div
      className="flex w-screen justify-center items-center"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <Image
        src="https://res.cloudinary.com/dioamie16/image/upload/v1752420971/donation_project_images/donation_logo_v1.png"
        height={60}
        width={60}
        alt="Loading logo"
        className="animate-pulse filter grayscale"
      />
    </div>
  );
};

export default Loader;
