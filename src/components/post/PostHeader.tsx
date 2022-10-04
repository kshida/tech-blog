import { PostTitle } from '@/components/post/PostTitle'

interface Props {
  title: string
  date: string
}

export const PostHeader: React.FC<Props> = ({ title, date }) => {
  return (
    <div className='max-w-[790px] mx-auto px-10'>
      <PostTitle>{title}</PostTitle>
      <div className='mb-6 text-lg'>投稿日：{date}</div>
    </div>
  )
}
