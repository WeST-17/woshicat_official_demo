import React from "react"

interface Description {
    description: string
}

const ProductDescription: React.FC<Description> = ({ description }) => {
    return (
        <>
            <p>
                {description}
            </p>
        </>
    )
}

export default ProductDescription;