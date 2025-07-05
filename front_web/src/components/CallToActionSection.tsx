import * as React from "react";

interface CallToActionSectionProps {
  signUpText?: string;
  loginText?: string;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  signUpText = "Cadastre-se",
  loginText = "Já possui conta?"
}) => {
  return (
    <section className="flex flex-col items-center mt-20 max-md:mt-10">
      <button className="px-16 py-5 max-w-full text-5xl leading-tight text-center text-black whitespace-nowrap rounded-3xl shadow-sm bg-amber-500 bg-opacity-60 w-[928px] max-md:px-5 hover:bg-opacity-80 transition-all">
        {signUpText}
      </button>
      <p className="mt-5 text-3xl text-black">
        {loginText}
      </p>
    </section>
  );
};
