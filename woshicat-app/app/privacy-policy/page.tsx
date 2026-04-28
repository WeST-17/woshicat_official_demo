'use client';
import TransitionSlide from "../components/transitions-navigation/transitionWipe";
import { privacyDoc } from "./privacyData";
import { DarkMode } from "../components/toggles/Dark_Mode/darkModeContext";

const PrivacyPolicy = () => {
  const { darkMode } = DarkMode();
  return (
    <>
      <main className={`w-screen h-full flex justify-center ${darkMode ? 'bg-stone-900/95 text-stone-100' : 'bg-white text-stone-900'}`}>
        <div className="flex flex-col mt-20 mb-8 p-2 w-full lg:w-1/2 gap-2">
          <div className="flex flex-col justify-start w-full h-fit">
            <h1 className="text-5xl mb-4">Privacy Policy:</h1>
          </div>
          
          {/* Privacy Policy */}
          {privacyDoc.map((section) => (
            <div className="flex flex-col justify-start w-full h-fit" key={section.index}>
              <h2 className="text-xl my-2 font-bold">{section.header}</h2>
              {section.body.split('\n').map((line, index) => (
                <p key={index} className="my-2">
                  {line}
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
