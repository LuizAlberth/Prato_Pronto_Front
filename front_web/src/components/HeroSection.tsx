import * as React from "react";

interface HeroSectionProps {
  heroImageSrc?: string;
  title?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroImageSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/d4513a4da6b1d34935867e9cb4f91f3fe02714cc?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8",
  title = "Aqui você é o chefe da cozinha"
}) => {
  return (
    <section className="w-full">
      <img
        src={heroImageSrc}
        alt="Hero banner"
        className="object-contain self-stretch w-full aspect-[1.68] max-md:max-w-full"
      />
      <h1 className="mt-4 text-6xl text-center text-black max-md:max-w-full max-md:text-4xl">
        {title}
      </h1>
    </section>
  );
};
