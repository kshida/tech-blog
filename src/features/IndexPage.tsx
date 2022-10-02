/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  SimpleGrid,
  Container,
  Flex,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { Layout } from '@/components/Layout'
import { Tags } from '@/components/Tags'
import { PostType } from '@/types/post'

interface Props {
  recentPosts: PostType[]
}

export const IndexPage: React.FC<Props> = ({ recentPosts }) => {
  return (
    <>
      <Layout>
        <Box p={10}>
          <Container maxW={'5xl'} mt='10' mb='10'>
            <SimpleGrid columns={{ base: 1 }} spacing={10}>
              {recentPosts.map((post) => (
                <Box key={post.slug} borderWidth='1px' borderRadius='lg'>
                  <Link
                    href={`/posts/${post.slug}`}
                    textDecoration='none'
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Flex
                      boxShadow={'lg'}
                      maxW={'initial'}
                      direction={{ base: 'column', md: 'row' }}
                      width={'full'}
                      justifyContent={'space-between'}
                      position={'relative'}
                      borderWidth='1px'
                      borderRadius='lg'
                      bg={useColorModeValue('white', 'gray.800')}
                    >
                      <Image
                        src={post.coverImage}
                        alt='Cover Image'
                        objectFit='cover'
                        maxW={{ base: 'full', md: '20vw' }}
                      />
                      <VStack width={'full'} spacing={6} align='stretch'>
                        <Box p='6'>
                          <Heading fontSize='xl' marginTop='2'>
                            {post.title}
                          </Heading>
                          <Tags tags={['Engineering', 'Product']} marginTop='3' />
                          <Text color={'gray.500'} marginTop='2'>
                            {post.date}
                          </Text>
                        </Box>
                      </VStack>
                    </Flex>
                  </Link>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      </Layout>
    </>
  )
}
