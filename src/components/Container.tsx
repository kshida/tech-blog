import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const Container: React.FC<Props> = ({ children }) => {
  return <div className='container mx-auto sm:px-5 my-10'>{children}</div>
}
