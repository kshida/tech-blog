import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'
import { SiZenn } from 'react-icons/si'
import NavLink from 'components/nav-link'

type Props = {
  label: string,
  href: string,
  children: React.ReactNode
}

const SocialButton = ({
  children,
  label,
  href,
}: Props) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target={'_blank'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'GitHub'} href={'https://github.com/kshida'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'Twitter'} href={'https://twitter.com/kshida39'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Zenn'} href={'https://zenn.dev/kshida'}>
            <SiZenn />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={3}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Stack direction={'row'} spacing={1} className='text-xs'>
            <NavLink link='/privacy-policy' isRichStyle={true}>プライバシーポリシー</NavLink>
            <NavLink link='/disclaimer' isRichStyle={true}>免責事項</NavLink>
          </Stack>
          <Text fontSize='xs'>©2017-2022 プログラミングを知るはプログラミングを行うに如かず</Text>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
