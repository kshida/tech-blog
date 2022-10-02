import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { NavLink } from './NavLink'

export const Footer: React.FC = () => {
  return (
    <Box
      px={6}
      bg={useColorModeValue('#9dd3a8', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'initial'}
        px={0}
        py={3}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={'center'}
      >
        <Stack direction={'row'} spacing={1} className='text-xs'>
          <NavLink link='/privacy-policy' isRichStyle={true}>
            プライバシーポリシー
          </NavLink>
          <NavLink link='/disclaimer' isRichStyle={true}>
            免責事項
          </NavLink>
        </Stack>
        <Text fontSize='xs'>{`©2022 kshida's blog`}</Text>
      </Container>
    </Box>
  )
}
