import { CoverImage } from '@/components/CoverImage'
import { DateFormatter } from '@/components/DateFormatter'
import { PostTitle } from '@/components/PostTitle'

interface Props {
  title: string
  coverImage: string
  date: string
}

export const PostHeader: React.FC<Props> = ({ title, coverImage, date }) => {
  return (
    <>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-8 md:mb-16 sm:mx-0'>
          <CoverImage title={title} src={coverImage} />
        </div>
        <PostTitle>{title}</PostTitle>
        <div className='mb-6 text-lg'>
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}
