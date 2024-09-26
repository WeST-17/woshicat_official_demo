import React from "react"

interface Description {
    description: string
}

const ProductDescription: React.FC<Description> = ({ description }) => {
    return (
        <>
            <p className="pe-4">
                {description}
            </p>
        </>
    )
}

export default ProductDescription;