/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

type Props = {
  link: string
  isRichStyle: boolean
  isTargetBlank?: boolean
  children: React.ReactNode
}

const NavLink = ({ link, isRichStyle, isTargetBlank = false, children }: Props) => {
  return (
    <NextLink href={link} passHref>
      {isRichStyle ? (
        <Link
          isExternal={isTargetBlank}
          px={2}
          py={1}
          rounded={'md'}
          _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('#ceefe4', '#ceefe4'),
          }}
        >
          {children}
        </Link>
      ) : (
        <Link isExternal={isTargetBlank} textColor={'#331cbf'} textDecoration={'underline'}>
          {children}
        </Link>
      )}
    </NextLink>
  )
}

export default NavLink
