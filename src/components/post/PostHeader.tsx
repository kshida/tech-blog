import { Box, HStack, Text } from '@chakra-ui/react'
import { PostTitle } from '@/components/post/PostTitle'

interface Props {
  title: string
  date: string
}

export const PostHeader: React.FC<Props> = ({ title, date }) => {
  return (
    <Box maxWidth='790px' mx='auto' px={{ base: 5, md: 10 }}>
      <PostTitle>{title}</PostTitle>
      <HStack mb={6} fontSize='18px' lineHeight='28px' justifyContent='space-between'>
        <Text>投稿日：{date}</Text>
      </HStack>
    </Box>
  )
}
