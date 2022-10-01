import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const Container: React.FC<Props> = ({ children }) => {
  return <div className='container mx-auto px-5'>{children}</div>
}
