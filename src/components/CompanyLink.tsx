export function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="company-link" href={href} target="_blank" rel="noreferrer noopener">
      {label} <span aria-hidden="true">↗</span>
    </a>
  )
}

export function CompanyLink({ href }: { href: string }) {
  return <ExternalLink href={href} label="Company website" />
}
