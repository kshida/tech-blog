/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

interface Props {
  link: string
  isRichStyle: boolean
  isTargetBlank?: boolean
  children: React.ReactNode
}

export const NavLink: React.FC<Props> = ({
  link,
  isRichStyle,
  isTargetBlank = false,
  children,
}) => {
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
          _focus={{ boxShadow: 'none' }}
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
