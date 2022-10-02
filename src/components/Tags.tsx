import {
  HStack,
  Tag,
  // eslint-disable-next-line import/named
  SpaceProps,
} from '@chakra-ui/react'

interface Props {
  tags: Array<string>
  marginTop?: SpaceProps['marginTop']
}

export const Tags: React.FC<Props> = (props) => {
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
