import Layout from 'components/layout'
import Pagination from 'components/pagination'
import { getAllPosts, getPagePosts } from 'lib/api'
import { PER_PAGE } from 'lib/constants'
import Post from 'types/post'
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  SpaceProps,
  SimpleGrid,
  Container,
} from '@chakra-ui/react'

type Props = {
  pagePosts: Post[],
  totalCount: number
}

interface IBlogTags {
  tags: Array<string>
  marginTop?: SpaceProps['marginTop']
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag
            size={'md'}
            variant="solid"
            bg={'#E0A6AF'}
            color={'#333333'}
            key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}

const Posts = ({ pagePosts, totalCount }: Props) => {
  return (
    <>
      <Layout>
        <Box p={10}>
          <Container maxW={'5xl'} mt='10' mb='10'>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {pagePosts.map((post) => (
                // ブログカード
                <Box key={post.slug} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                  <Link href={`/posts/${post.slug}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image
                      src={ post.coverImage }
                      alt="Cover Image"
                      objectFit="contain"
                    />
                    <Box p='6'>
                      <BlogTags tags={['Engineering', 'Product']} marginTop="3" />
                      <Heading fontSize="xl" marginTop="2">
                        { post.title }
                      </Heading>
                      <Text color={'gray.500'} marginTop="2">
                        { post.date }
                      </Text>
                    </Box>
                  </Link>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
        <Pagination totalCount={totalCount} />
      </Layout>
    </>
  )
}

export default Posts

export const getStaticProps = async ( context: { params: { page: string } } ) => {
  const page = +context.params.page
  const offset = PER_PAGE * (page - 1)
  const posts = getPagePosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ], offset, PER_PAGE)

  return {
    props: { 
      pagePosts: posts.pagePosts,
      totalCount: posts.totalCount
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])
  const totalCount = posts.length
  const range = (start: number, end: number) => 
    [...Array(end - start + 1)].map((_, i) => start + i)

  return {
    paths: range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => `/page/${number}`),
    fallback: false,
  }
}