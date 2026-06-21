'use client'

export default function WhatsAppFab() {
  return (
    <a
      className="sy-wa-fab"
      href="https://wa.me/16474870919?text=Hi%20Settly%2C%20I%20just%20arrived%20and%20need%20help%20settling%20in."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Connect on WhatsApp"
    >
      <span className="sy-wa-fab__ico">
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
          <path fill="currentColor" d="M16 3.2A12.7 12.7 0 0 0 4.9 22.3L3.2 28.8l6.7-1.7A12.7 12.7 0 1 0 16 3.2Zm0 23.1c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.9 1 1-3.8-.3-.4a10.5 10.5 0 1 1 8.9 4.9Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-2.5-1.6 9.5 9.5 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5a.6.6 0 0 0 0-.6c0-.2-.7-1.7-1-2.3s-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6 6 0 0 0 1.3 3.2 13.7 13.7 0 0 0 5.2 4.6c.7.3 1.3.5 1.7.6a4.2 4.2 0 0 0 1.9.1c.6-.1 1.9-.8 2.1-1.5s.3-1.4.2-1.5-.3-.2-.6-.4Z"/>
        </svg>
      </span>
      <span className="sy-wa-fab__txt">Connect on WhatsApp</span>
    </a>
  )
}
