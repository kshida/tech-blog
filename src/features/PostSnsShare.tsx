import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { PostShare } from './PostShare'

interface Props {
  title: string
  slug: string
}

export const PostSnsShare: React.FC<Props> = ({ title, slug }) => {
  return (
    <Box mt={12} mb={4} p={{ base: 5, md: 10 }} bg='#edf2f7'>
      <Stack align='center' pb={5}>
        <Text fontSize='16px' as='b'>
          最後まで読んでいただきありがとうございます！
        </Text>
        <Text fontSize='16px' as='b'>
          シェアしていただけると嬉しくてモチベーションになります 🙌
        </Text>
      </Stack>
      <HStack justifyContent='space-evenly' mx='auto'>
        <PostShare title={title} slug={slug} />
      </HStack>
    </Box>
  )
}
