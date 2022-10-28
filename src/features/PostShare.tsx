import { Box } from '@chakra-ui/react'
import {
  FacebookShareButton,
  FacebookIcon,
  HatenaShareButton,
  HatenaIcon,
  LineShareButton,
  LineIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import { BASE_URL } from '@/utils/constants'

interface Props {
  title: string
  slug: string
  size?: number
  isRound?: boolean
}

export const PostShare: React.FC<Props> = ({ title, slug, size = 40, isRound = true }) => {
  return (
    <>
      <Box _hover={{ opacity: 0.5 }}>
        <FacebookShareButton url={`${BASE_URL}/posts/${slug}`} quote={title}>
          <FacebookIcon size={size} round={isRound} />
        </FacebookShareButton>
      </Box>
      <Box _hover={{ opacity: 0.5 }}>
        <TwitterShareButton url={`${BASE_URL}/posts/${slug}`} title={title}>
          <TwitterIcon size={size} round={isRound} />
        </TwitterShareButton>
      </Box>
      <Box _hover={{ opacity: 0.5 }}>
        <HatenaShareButton url={`${BASE_URL}/posts/${slug}`} title={title}>
          <HatenaIcon size={size} round={isRound} />
        </HatenaShareButton>
      </Box>
      <Box _hover={{ opacity: 0.5 }}>
        <LineShareButton url={`${BASE_URL}/posts/${slug}`} title={title}>
          <LineIcon size={size} round={isRound} />
        </LineShareButton>
      </Box>
      <Box _hover={{ opacity: 0.5 }}>
        <LinkedinShareButton url={`${BASE_URL}/posts/${slug}`} title={title}>
          <LinkedinIcon size={size} round={isRound} />
        </LinkedinShareButton>
      </Box>
    </>
  )
}
