import { db } from '@/lib/db'
import { INFINITE_SCROLL_PAGINATION_NUMBER } from '@/config';
import PostFeed from '@/components/layouts/PostFeed';


const GeneralFeed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subForum: true,
      SavedPost: true
    },
    take: INFINITE_SCROLL_PAGINATION_NUMBER,
  })

  return <>
    <PostFeed initialPosts={posts} />
  </>
}

export default GeneralFeed