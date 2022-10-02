import { DateFormatter } from '@/components/DateFormatter'
import { PostTitle } from '@/components/post/PostTitle'

interface Props {
  title: string
  date: string
}

export const PostHeader: React.FC<Props> = ({ title, date }) => {
  return (
    <div className='max-w-2xl mx-auto'>
      <PostTitle>{title}</PostTitle>
      <div className='mb-6 text-lg'>
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}
