'use client';
import Collapse from "@/app/components/ProductComps-Layouts/collapse-item";
import { FAQ } from "@/app/about/faq/faqData";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";

const BrandFAQ = () => {
  
  return (
    <>
      <main className="w-screen h-fit flex justify-center items-center grid grid-cols-1 mb-40">
        <div className="mx-auto flex flex-col w-full p-2 lg:w-1/2 mt-30 h-fit">
          <div className="flex flex-col justify-start w-full">
            <h1 className="text-5xl mb-8">Frequently Asked Questions:</h1>
          </div>
          
          {/* FAQ List */}
          {FAQ.map((question) => (
            <div className="flex flex-col justify-start w-full h-fit transition duration-300" key={question.link}>
              <Collapse classProp="text-base -translate-y-5 flex justify-start items-center" title={`${question.q}`}>
                <p className="mb-2 w-full flex justify-start">
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
