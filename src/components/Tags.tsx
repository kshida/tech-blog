import {
  HStack,
  Tag,
  // eslint-disable-next-line import/named
  SpaceProps,
} from '@chakra-ui/react'

interface Props {
  tags: string[]
  marginTop?: SpaceProps['marginTop']
}

export const Tags: React.FC<Props> = ({ tags, marginTop }) => {
  if (!tags) {
    return null
  }
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant='solid' bg={'#E0A6AF'} color={'#333333'} key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}
