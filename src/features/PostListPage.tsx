/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Heading,
  Link,
  Text,
  SimpleGrid,
  Container,
  Flex,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Layout } from '@/components/Layout'
import { Pagination } from '@/components/Pagination'
import { Tags } from '@/components/Tags'
import { PostType } from '@/types/post'

interface Props {
  pagePosts: PostType[]
  totalCount: number
}

export const PostListPage: React.FC<Props> = ({ pagePosts, totalCount }) => {
  return (
    <>
      <Layout>
        <Box>
          <Container maxW={'5xl'} mt='10' mb='10'>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={10}>
              {pagePosts.map((post) => (
                <Box key={post.slug} borderWidth='1px' borderRadius='lg'>
                  <NextLink href={`/posts/${post.slug}`} passHref>
                    <Link
                      textDecoration='none'
                      _hover={{ textDecoration: 'none' }}
                      _focus={{ boxShadow: 'none' }}
                    >
                      <Flex
                        boxShadow={'lg'}
                        maxW={'initial'}
                        direction={{ base: 'column', md: 'row' }}
                        width={'full'}
                        height={'100%'}
                        justifyContent={'space-between'}
                        position={'relative'}
                        borderWidth='1px'
                        borderRadius='lg'
                        bg={useColorModeValue('white', 'gray.800')}
                      >
                        <VStack width={'full'} spacing={6} align='stretch'>
                          <Box p='6'>
                            <Text color={'gray.500'}>{post.date}</Text>
                            <Heading fontSize='xl' marginTop='2'>
                              {post.title}
                            </Heading>
                            <Tags tags={post.tags} marginTop='5' />
                          </Box>
                        </VStack>
                      </Flex>
                    </Link>
                  </NextLink>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
        <Box mb={'30px'}>
          <Pagination totalCount={totalCount} />
        </Box>
      </Layout>
    </>
  )
}
