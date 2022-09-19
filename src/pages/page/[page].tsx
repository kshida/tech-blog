/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  // eslint-disable-next-line import/named
  SpaceProps,
  SimpleGrid,
  Container,
  Flex,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Layout from "components/layout";
import Pagination from "components/pagination";
import { getAllPosts, getPagePosts } from "lib/api";
import { PER_PAGE } from "lib/constants";
import Post from "types/post";

type Props = {
  pagePosts: Post[];
  totalCount: number;
};

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag
            size={"md"}
            variant="solid"
            bg={"#E0A6AF"}
            color={"#333333"}
            key={tag}
          >
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

const Posts = ({ pagePosts, totalCount }: Props) => {
  return (
    <>
      <Layout>
        <Box p={10}>
          <Container maxW={"5xl"} mt="10" mb="10">
            <SimpleGrid columns={{ base: 1 }} spacing={10}>
              {pagePosts.map((post) => (
                <Box key={post.slug} borderWidth="1px" borderRadius="lg">
                  <Link
                    href={`/posts/${post.slug}`}
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex
                      boxShadow={"lg"}
                      maxW={"initial"}
                      direction={{ base: "column", md: "row" }}
                      width={"full"}
                      justifyContent={"space-between"}
                      position={"relative"}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg={useColorModeValue("white", "gray.800")}
                    >
                      <Image
                        src={post.coverImage}
                        alt="Cover Image"
                        objectFit="cover"
                        maxW={{ base: "full", md: "20vw" }}
                      />
                      <VStack width={"full"} spacing={6} align="stretch">
                        <Box p="6">
                          <Heading fontSize="xl" marginTop="2">
                            {post.title}
                          </Heading>
                          <BlogTags
                            tags={["Engineering", "Product"]}
                            marginTop="3"
                          />
                          <Text color={"gray.500"} marginTop="2">
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
        <Pagination totalCount={totalCount} />
      </Layout>
    </>
  );
};

export default Posts;

export const getStaticProps = async (context: { params: { page: string } }) => {
  const page = +context.params.page;
  const offset = PER_PAGE * (page - 1);
  const posts = getPagePosts(
    ["title", "date", "slug", "author", "coverImage", "excerpt"],
    offset,
    PER_PAGE
  );

  return {
    props: {
      pagePosts: posts.pagePosts,
      totalCount: posts.totalCount,
    },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  const totalCount = posts.length;
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return {
    paths: range(1, Math.ceil(totalCount / PER_PAGE)).map(
      (number) => `/page/${number}`
    ),
    fallback: false,
  };
}
