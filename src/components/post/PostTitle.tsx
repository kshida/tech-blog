import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const PostTitle: React.FC<Props> = ({ children }) => {
  return (
    <h1 className='text-5xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left'>
      {children}
    </h1>
  )
}