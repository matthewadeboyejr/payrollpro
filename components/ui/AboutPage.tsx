import React from "react";

const AboutPage = ({ about }: { about: string }) => {
  return (
    <div className="flex flex-col gap-2 bg-white p-5 rounded-md dark:bg-gray-800">
      <p className="dark:text-white">{about}</p>
    </div>
  );
};

export default AboutPage;
