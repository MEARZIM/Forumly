import React from 'react'

const SingleUserPage = async ({
    params
}: {
    params: {
        slug: string
    }
}) => {
    const { slug } = await params;
    return (
        <>
            Your username: {slug}
        </>
    )
}

export default SingleUserPage
