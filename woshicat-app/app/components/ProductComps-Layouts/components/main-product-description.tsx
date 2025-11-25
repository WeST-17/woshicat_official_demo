import React from "react"
import Collapse from "./collapse-item";
import { data, ApparelSizing } from "../ProductPages/apparelSizing";

interface Description {
    description: string,
    isApparel: string,
    collectionHandle: string
}

const splitParagraph = (paragraph: string) => {
    const newParagraph = paragraph.split('~');
    return newParagraph;
}

const MainProductDescription: React.FC<Description> = ({ description, isApparel, collectionHandle }) => {
    const updateDesc = splitParagraph(description);
    const splitDetails = updateDesc.slice(1); // rest of array that contains remaining details about product

    return (
        <>
            <span className='w-full bg-stone-600/50 rounded-full' />
            <div className="w-full my-2 text-sm">
                <p className="mb-2 text-xl">Description</p>
                {updateDesc[0]}
            </div>
            
            <div className="relative w-full mt-4">
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
                {isApparel && (
                    <div className="relative w-full">
                        <Collapse title={`Apparel Sizing Guide`} classProp="text-sm text-stone-600">
                                <div className="w-full text-sm flex justify-start items-center mt-1">
                                    <table className="h-36 rounded-sm overflow-hidden">
                                        <tbody>
                                        <tr className="bg-stone-300/50 text-xs h-8">
                                            <th>{`Size`}</th>
                                            <th>{`Body Length`}</th>
                                            <th>{`Shoulder Width`}</th>
                                            <th>{`Chest Width`}</th>
                                            <th>{`Sleeve Length`}</th>
                                        </tr>
                                        {data[collectionHandle].map((val: any, index: number) => {
                                            return (
                                                <tr className={`${index % 2 !== 0 ? "bg-stone-300/25" : ""}`} key={index}>
                                                    <td>{val.Size}</td>
                                                    <td>{val.Body_Length}</td>
                                                    <td>{val.Shoulder_Width}</td>
                                                    <td>{val.Chest_Width}</td>
                                                    <td>{val.Sleeve_Length}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                        </Collapse>
                    </div>
                )}
            </div>
            <span className="flex w-full h-[0.5px] bg-stone-600/50 rounded-full" /> 
        </>
    )
}

export default MainProductDescription;