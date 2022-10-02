import {
  HStack,
  Tag,
  // eslint-disable-next-line import/named
  SpaceProps,
} from '@chakra-ui/react'

interface BlogTags {
  tags: Array<string>
  marginTop?: SpaceProps['marginTop']
}

export const BlogTags: React.FC<BlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant='solid' bg={'#E0A6AF'} color={'#333333'} key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}
