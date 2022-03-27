import NextLink from 'next/link'
import {
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

type Props = {
  link: string,
  isRichStyle: boolean,
  isTargetBlank?: boolean,
  children: React.ReactNode
}

const NavLink = ({ link, isRichStyle, isTargetBlank = false, children }: Props) => {
  return (
    <NextLink href={link} passHref>
      {isRichStyle ?
        <Link
          isExternal={isTargetBlank}
          px={2}
          py={1}
          rounded={'md'}
          _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
        >
          {children}
        </Link> : 
        <Link
          isExternal={isTargetBlank}
          textColor={'#331cbf'}
          textDecoration={'underline'}>
          {children}
        </Link>
    }
    </NextLink>
  )
}

export default NavLink
