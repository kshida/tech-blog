import Layout from 'components/layout'
import { getPagePosts } from 'lib/api'
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
  recentPosts: Post[]
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

const Index = ({ recentPosts }: Props) => {
  return (
    <>
      <Layout>
        <Box p={10}>
          <Container maxW={'5xl'} mt='10' mb='10'>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {recentPosts.map((post) => (
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
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const recentPosts = getPagePosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]).pagePosts

  return {
    props: { recentPosts },
  }
}
