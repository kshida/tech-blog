/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useColorModeValue, ListItem, UnorderedList } from '@chakra-ui/react'
import NextLink from 'next/link'
import { range } from '@/libs/range'
import { PER_PAGE } from '@/utils/constants'

interface Props {
  totalCount: number
}

export const Pagination: React.FC<Props> = ({ totalCount }) => {
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
          <NextLink href={`/posts/list/${number}`} passHref>
            <Link
              px={4}
              py={3}
              rounded={'full'}
              margin={'0 5px'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
              _focus={{ boxShadow: 'none' }}
            >
              {number}
            </Link>
          </NextLink>
        </ListItem>
      ))}
    </UnorderedList>
  )
}
