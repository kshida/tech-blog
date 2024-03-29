/* eslint-disable @next/next/no-img-element */
import cn from 'classnames'
import Link from 'next/link'

interface Props {
  title: string
  src: string
  slug?: string
}

export const CoverImage: React.FC<Props> = ({ title, src, slug }) => {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'hover:shadow-lg transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className='sm:mx-0'>
      {slug ? (
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
