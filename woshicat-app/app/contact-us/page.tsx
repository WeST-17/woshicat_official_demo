'use client';
import Link from "next/link";
import TransitionSlide from "../components/transitionWipe";
import Transition from "../components/transition";

const Contact = () => {
  return (
    <>
      <main className="w-screen h-fit flex justify-center">
        <div className="flex flex-col mt-12 mb-8 p-2 w-full lg:w-1/2 gap-2">
          <div className="flex flex-col justify-start w-full h-fit">
            <h1 className="text-5xl mb-4">Contact Us</h1>
          </div>
          
          {/* Contact Us */}
            <div className="flex flex-col justify-start w-full h-fit text-xl gap-4">
              <p>
                {`Need answers to some questions you have? Send us an email at help@woshicat.com. You can also refer to our FAQ`} <Link href={'/about/faq'} className="font-bold hover:text-[#CD000A] transition duration-300">here.</Link>
              </p>
              <p>
                {`Returns must be initiated by contacting us through our email. Returns are only accepted for unworn and unwashed items within 30 days of delivery. The customer is responsible for return shipment costs.`}
              </p>
              <p>
                {`
                  Email: help@woshicat.com
                `}
              </p>
              <p>
                {`
                  Address: P.O. Box 820275 Houston, TX 77282
                `}
              </p>
              
            </div>
        </div>
      </main>
      <TransitionSlide />
    </>
  );
}

export default Contact;
