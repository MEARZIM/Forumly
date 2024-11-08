import React from 'react'

const CommunityPage = ({ params }: {
    params: {
        slug: string
    }
}) => {
    return (
        <div>
            {params.slug ? params.slug : "No data available."}
        </div>
    )
}

export default CommunityPage
