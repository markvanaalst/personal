import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

import { defaultMetadata } from '@/lib/metadata'

type SocialButtonsProps = {
  className?: string
}

export const SocialButtons = ({ className }: SocialButtonsProps) => {
  return (
    <>
      <SocialLink
        href={defaultMetadata.author.twitter}
        label="Twitter"
        className={className}
      >
        <FaTwitter className="fill-current" />
      </SocialLink>
      <SocialLink
        href={defaultMetadata.author.github}
        label="GitHub"
        className={className}
      >
        <FaGithub className="fill-current" />
      </SocialLink>
      <SocialLink
        href={defaultMetadata.author.linkedin}
        label="LinkedIn"
        className={className}
      >
        <FaLinkedinIn className="fill-current" />
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
