import markdownStyles from '@/styles/markdown-styles.module.css'

interface Props {
  content: string
}

export const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div className='max-w-2xl mx-auto'>
      <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}