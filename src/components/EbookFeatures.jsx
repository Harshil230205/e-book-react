import React from "react";
import {
  RiBookOpenLine,
  RiDownload2Line,
  RiSmartphoneLine,
} from "react-icons/ri";

const features = [
  {
    title: "Vast Collection",
    description:
      "Explore thousands of e-books across various genres and categories.",
    icon: <RiBookOpenLine className="w-14 h-14 text-orange-500" />,
  },
  {
    title: "Instant Access",
    description:
      "Download or read your favorite books instantly from any device.",
    icon: <RiDownload2Line className="w-14 h-14 text-orange-500" />,
  },
  {
    title: "Read Anywhere",
    description:
      "Enjoy e-books on mobile, tablet, or desktop without limitations.",
    icon: <RiSmartphoneLine className="w-14 h-14 text-orange-500" />,
  },
];

const EbookFeatures = () => {
  return (
    <section className="py-16">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Why Choose Our E-Books?
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Discover a new world of reading with our extensive collection and
          seamless experience.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-16 lg:px-32">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="bg-orange-100 p-4 rounded-full">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mt-5">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-base mt-3">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EbookFeatures;
