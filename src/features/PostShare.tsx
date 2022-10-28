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
      <FacebookShareButton url={`${BASE_URL}/posts/${slug}`} quote={title}>
        <FacebookIcon size={size} round={isRound} />
      </FacebookShareButton>
      <TwitterShareButton url={`${BASE_URL}/posts/${slug}`} title={title}>
        <TwitterIcon size={size} round={isRound} />
      </TwitterShareButton>
      <HatenaShareButton url={`${BASE_URL}/posts/${slug}`} title={title}>
        <HatenaIcon size={size} round={isRound} />
      </HatenaShareButton>
      <LineShareButton url={`${BASE_URL}/posts/${slug}`} title={title}>
        <LineIcon size={size} round={isRound} />
      </LineShareButton>
      <LinkedinShareButton url={`${BASE_URL}/posts/${slug}`} title={title}>
        <LinkedinIcon size={size} round={isRound} />
      </LinkedinShareButton>
    </>
  )
}
