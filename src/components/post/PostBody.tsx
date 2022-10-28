import { Box } from '@chakra-ui/react'
import { PostSnsShare } from '@/features/PostSnsShare'
import markdownStyles from '@/styles/markdown-styles.module.css'

interface Props {
  title: string
  content: string
  slug: string
}

export const PostBody: React.FC<Props> = ({ title, content, slug }) => {
  return (
    <Box
      maxW='790px'
      mx='auto'
      px={{ base: 5, md: 10 }}
      pb={10}
      bg='#fff'
      borderRadius={{ base: 'none', md: '8px' }}
    >
      <Box className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} />
      <PostSnsShare title={title} slug={slug} />
    </Box>
  )
}
