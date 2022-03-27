import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { Links } from 'lib/links'
import NavLink from 'components/nav-link'

const Header = () => {
  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}>
        <Heading as="h1" size='lg' py={4} textAlign={'center'} wordBreak='keep-all'>
          プログラミングを知るは プログラミングを行うに如かず
        </Heading>
      </Box>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={2}
          spacing={4}
          justify={'center'}
          align={'center'}>
          <Stack direction={'row'} spacing={6}>
            {Links.map((link) => (
              <NavLink key={link.title} link={link.slug} isRichStyle={true}>{link.title}</NavLink>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Header
