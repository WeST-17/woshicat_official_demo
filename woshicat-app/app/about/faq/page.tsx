'use client';
import Collapse from "@/app/components/ProductComps-Layouts/collapse-item";
import { FAQ } from "@/app/about/faq/faqData";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";

const BrandFAQ = () => {
  
  return (
    <>
      <main className="w-screen h-fit flex justify-center">
        <div className="flex flex-col mt-28 mb-8 w-full p-2 lg:w-1/2 gap-2">
          <div className="flex flex-col justify-start w-full h-fit">
            <h1 className="text-5xl mb-8">Frequently Asked Questions:</h1>
          </div>
          
          {/* FAQ List */}
          {FAQ.map((question) => (
            <div className="flex flex-col justify-start w-full h-fit border-b-2 hover:border-[#CD000A] transition duration-250" key={question.link}>
              <h2 className="text-xl" id={question.link}>{question.q}</h2>
              <Collapse classProp="-translate-y-5 justify-end">
                <p className="mb-2">
                  {question.a}
                </p>
              </Collapse>
            </div>
          ))}
          
        </div>
      </main>
      <TransitionSlide />
    </>
  );
}

export default BrandFAQ;
