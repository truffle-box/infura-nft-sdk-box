import { ReactNode } from 'react'

const Anchor = ({ link, name, children }: {
  link: string,
  name: string,
  children: ReactNode
}) => {
  return (
    <div className={'text-blueDark text-decoration-none tracking-wider '}>
      <a
        href={link}
        rel="noopener noreferrer"
        target="_blank"
        title={`Link to ${name}`}
      >
        {children}
      </a>
    </div>
  )
}

export default Anchor
