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
import { getPagePosts } from "lib/api";
import Post from "types/post";

type Props = {
  recentPosts: Post[];
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

const Index = ({ recentPosts }: Props) => {
  return (
    <>
      <Layout>
        <Box p={10}>
          <Container maxW={"5xl"} mt="10" mb="10">
            <SimpleGrid columns={{ base: 1 }} spacing={10}>
              {recentPosts.map((post) => (
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
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const recentPosts = getPagePosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]).pagePosts;

  return {
    props: { recentPosts },
  };
};
