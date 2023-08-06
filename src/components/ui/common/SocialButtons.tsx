import { FaEnvelope, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

type SocialButtonsProps = {
  className?: string
}

export const SocialButtons = ({ className }: SocialButtonsProps) => {
  return (
    <>
      <SocialLink
        href="https://www.twitter.com/markvanaalst"
        label="Twitter"
        className={className}
      >
        <FaTwitter className="fill-current" />
      </SocialLink>
      <SocialLink
        href="https://www.github.com/markvanaalst"
        label="GitHub"
        className={className}
      >
        <FaGithub className="fill-current" />
      </SocialLink>
      <SocialLink
        href="https://www.linkedin.com/in/markvanaalst"
        label="LinkedIn"
        className={className}
      >
        <FaLinkedinIn className="fill-current" />
      </SocialLink>
      <SocialLink
        href="mailto:markvanaalst@gmail.com"
        label="Email"
        className={className}
      >
        <FaEnvelope className="fill-current" />
      </SocialLink>
    </>
  )
}

const SocialLink: React.FC<{
  href: string
  className?: string
  label?: string
  children: any
}> = ({ children, className, label, href }) => {
  if (className != null && className != undefined) {
    return (
      <a
        rel="noopener noreferrer"
        aria-label={label}
        href={href}
        className={className}
      >
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}
