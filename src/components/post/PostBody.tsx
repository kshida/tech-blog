import markdownStyles from '@/styles/markdown-styles.module.css'

interface Props {
  content: string
}

export const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div className='max-w-[790px] mx-auto px-10 pb-10 bg-white rounded-lg'>
      <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
