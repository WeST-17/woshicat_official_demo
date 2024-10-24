'use client';
import TransitionSlide from "../components/transitionWipe";
import { TermsOfServiceDoc } from "./ServiceTerms";

const PrivacyPolicy = () => {
  return (
    <>
      <main className="w-screen h-fit flex justify-center">
        <div className="flex flex-col mt-12 mb-8 p-2 w-full lg:w-1/2 gap-2">
          <div className="flex flex-col justify-start w-full h-fit">
            <h1 className="text-5xl mb-4">Terms of Service:</h1>
          </div>
          
          {/* Terms of Service */}
          {TermsOfServiceDoc.map((section) => (
            <div className="flex flex-col justify-start w-full h-fit" key={section.index}>
              <h2 className="text-xl my-2 font-bold">{section.header}</h2>
              {section.body.split('\n').map((line, index) => (
                <p key={index} className="my-2">
                  {line} {section.link && (
                    <a href={section.link.url} target="">
                    {section.link.text}
                    </a>
                  )}
                </p>
              ))}
              
            </div>
          ))}
        </div>
      </main>
      <TransitionSlide/>
    </>
  );
}

export default PrivacyPolicy;
