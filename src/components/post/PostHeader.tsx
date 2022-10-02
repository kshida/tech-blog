import { DateFormatter } from '../DateFormatter'
import { PostTitle } from './PostTitle'

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
