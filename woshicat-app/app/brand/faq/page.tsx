'use client';
import Collapse from "@/app/components/collapse-item";
import { FAQ } from "@/app/components/textLists/data";
import Link from "next/link";

export default function BrandFAQ() {
  
  return (
    <>
      <main className="w-screen h-fit flex justify-center">
        <div className="flex flex-col mt-32 mb-8 w-1/2 gap-2">
          <div className="flex flex-col justify-start w-full h-fit">
            <h1 className="text-5xl mb-4">Frequently Asked Questions:</h1>
          </div>
          
          {/* FAQ List */}
          {FAQ.map((question) => (
            <div className="flex flex-col justify-start w-full h-fit border-b-2" key={question.link}>
              <h2 className="text-xl" id={question.link}>{question.q}</h2>
              <Collapse>
                <p className="p-2">
                  {question.a}
                </p>
              </Collapse>
            </div>
          ))}
          
        </div>
      </main>
    </>
  );
}
