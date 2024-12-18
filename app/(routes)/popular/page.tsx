import React from 'react'

import PopularPostFeed from '@/components/layouts/Home/PopularPostFeed'

const PopularPage = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-bold m-4">Popular Posts</h1>
      <PopularPostFeed initialPosts={[]} />
    </div>
  )
}

export default PopularPage
