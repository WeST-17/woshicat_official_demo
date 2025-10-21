import React from "react"
import Collapse from "./collapse-item";

interface Description {
    description: string,

}

const splitParagraph = (paragraph: string) => {
    const newParagraph = paragraph.split('~');
    return newParagraph;
}

const MainProductDescription: React.FC<Description> = ({ description }) => {
    const updateDesc = splitParagraph(description);
    const splitDetails = updateDesc.slice(1); // rest of array that contains remaining details about product

    return (
        <>
            <span className='w-full h-px bg-stone-600/50 rounded-full' />
            <div className="w-full my-2 text-sm">
                <p className="mb-2 text-xl">Description</p>
                {updateDesc[0]}
            </div>
            
            <div className="relative w-full mt-8">
                {splitDetails.map((lines: string, index) => (
                    
                    <div className="relative w-full" key={index}>
                        <Collapse title={`${lines.split('-')[0]}`} classProp="text-sm text-stone-600">
                            {lines.split('-').splice(1).map((line: string) => (
                                <div className="w-full text-sm flex justify-start items-center" key={line}>
                                    {"- "}{line}
                                </div>
                            ))}
                        </Collapse>
                    </div>
                ))}
            </div>
            <span className="flex w-full h-[0.5px] bg-stone-600/50 rounded-full" /> 
        </>
    )
}

export default MainProductDescription;