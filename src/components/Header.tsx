import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  useColorModeValue,
  Stack,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'
import { SiZenn } from 'react-icons/si'
import { NavLink } from '@/components/NavLink'
import { SocialButton } from '@/components/SocialButton'
import { Links } from '@/utils/links'

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('#9dd3a8', 'gray.900')} px={6}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Heading as='h1' size='lg' py={4} textAlign={'center'} wordBreak='keep-all'>
              {`kshida's blog`}
            </Heading>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.title} link={link.slug} isRichStyle={true}>
                  {link.title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
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
          </HStack>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            bg={'none'}
            _hover={{
              bg: useColorModeValue('#ceefe4', '#ceefe4'),
            }}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.title} link={link.slug} isRichStyle={true}>
                  {link.title}
                </NavLink>
              ))}
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
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}