import { contact, profile, visibleContactLinks } from "../data/portfolio"

export function Contact() {
  const links = visibleContactLinks()

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <p className="eyebrow">Contact</p>
        <h2>{contact.heading}</h2>
        <ul className="contact-links">
          {links.map((link) => (
            <li key={link.label}>
              <a className="button button-primary" href={link.href} rel="noreferrer noopener">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-meta">
          {profile.name}
          <span aria-hidden="true"> · </span>
          {profile.location}
        </p>
      </div>
    </section>
  )
}
