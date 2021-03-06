import NextLink from 'next/link'
import {
  Link,
  useColorModeValue,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { PER_PAGE } from 'lib/constants'

type Props = {
  totalCount: number
}

const range = (start: number, end: number) => 
  [...Array(end - start + 1)].map((_, i) => start + i)

const Pagination = ({ totalCount }: Props) => {
  return (
    <UnorderedList
      listStyleType={'none'}
      display={'inline-flex'}
      width={'100vw'}
      margin={'20px auto'}
      justifyContent={'center'}
    >
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <ListItem key={index}>
          <NextLink href={`/page/${number}`} passHref>
            <Link
              px={4}
              py={3}
              rounded={'full'}
              margin={'0 5px'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
            >
              {number}
            </Link>
          </NextLink>
        </ListItem>
      ))}
    </UnorderedList>
  )
}

export default Pagination
