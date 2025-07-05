import * as React from "react";

interface AboutSectionProps {
  imageSrc?: string;
  content?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  imageSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/0218261abcc1744d8eb14911db947f9ec0253443?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8",
  content = "Nós da Prato Pronto prezamos pela usabilidade, qualidade e segurança. Oferecendo gratuitamente um site para o compartilhamento de receitas e aprendizado na cozinha, com experiências únicas e receitas saborosas prontas para serem descobertas."
}) => {
  return (
    <section className="flex flex-col justify-center items-center self-stretch px-16 py-11 mt-5 w-full bg-amber-100 max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1505px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <img
              src={imageSrc}
              alt="About us illustration"
              className="object-contain grow w-full aspect-[1.5] max-md:mt-10 max-md:max-w-full"
            />
          </div>
          <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="text-3xl text-black max-md:mt-10 max-md:max-w-full">
              Nós da Prato Pronto prezamos pela usabilidade, qualidade e
              segurança. Oferecendo gratuitamente um site para o
              compartilhamento de receitas e aprendizado na cozinha, com
              experiências únicas e receitas saborosas prontas para serem
              descobertas.
              <br />
              <br />
              <br />
              Temos chefes verificados que compartilham algumas de suas
              melhores receitas em troca de avaliações positivas dos usuários,
              não perca tempo e comece a cozinhar, ou se preferir compartilhe
              a sua receita favorita para que outras pessoas possam apreciá-la
              também.
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
