import React from "react"
import Collapse from "./collapse-item";

interface Description {
    description: string
}

const splitParagraph = (paragraph: string) => {
    const newParagraph = paragraph.split('|');
    return newParagraph;
}

const ProductDescription: React.FC<Description> = ({ description }) => {
    const updateDesc = splitParagraph(description);

    return (
        <>
            <div className="text-lg border-y border-stone-300 w-full py-2">
                <p className="font-medium text-xl mb-2">Description</p>
                {updateDesc[0]}
            </div>
            <div className="border-b border-stone-300 w-full pb-2"> 
                <Collapse plus={'Product Details +'} minus={'Product Details -'} classProp='w-full text-stone-500 pb-1 hover:text-black transition duration-200 text-lg'>
                    {updateDesc.slice(1).map((val: string, index) => (
                        <div className="w-full" key={index}>
                            {val !== " " ? <div className="">{val}</div> : <br></br>}
                        </div>
                    ))}
                </Collapse>
            </div>
        </>
    )
}

export default ProductDescription;