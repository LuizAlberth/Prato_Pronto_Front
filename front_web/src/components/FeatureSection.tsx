import * as React from "react";
import { FeatureCard } from "./FeatureCard/FeatureCard";

export const FeatureSection: React.FC = () => {
  const features = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/145aa4ddad9dd2f1d010ec179b3fa553c162e3fa?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8",
      title: "Deixamos a sua dieta mais diversificada",
      imageAlt: "Diet diversification icon"
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbbe7635f9fc711d5a030b6c0868361dddc84459?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8",
      title: "Sem tempo? Temos o que você precisa então",
      imageAlt: "Quick recipes icon"
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/772fec05fb19a01a917fb0a6da115387e9c4b35e?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8",
      title: "Aqui você encontra as melhores receitas",
      imageAlt: "Best recipes icon"
    }
  ];

  return (
    <section className="mt-12 w-full max-w-[1451px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        {features.map((feature, index) => (
          <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
            <FeatureCard
              imageSrc={feature.imageSrc}
              title={feature.title}
              imageAlt={feature.imageAlt}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
