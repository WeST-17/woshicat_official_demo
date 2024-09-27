'use client';
import Collapse from "@/app/components/collapse-item";
import { FAQ } from "@/app/components/textLists/data";

export default function BrandFAQ() {
  
  return (
    <>
      <main className="w-screen h-fit flex justify-center">
        <div className="flex flex-col mt-32 mb-8 w-1/2 gap-12">
          <div className="flex flex-col justify-start w-full h-fit">
            <h1 className="text-5xl">Frequently Asked Questions:</h1>
            <Collapse />
          </div>
          
          {/* FAQ List */}
          {FAQ.map((question) => (
            <div className="flex flex-col justify-start w-full h-fit" key={question.link}>
              <h2 className="text-2xl" id={question.link}>{question.q}</h2>
              <p>
                {question.a}
              </p>
            </div>
          ))}
          
        </div>
      </main>
    </>
  );
}
