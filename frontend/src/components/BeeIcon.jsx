function BeeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.5 2 7.5 3.5 7 5.5C6 5.2 5 5.5 4.5 6.5C4 7.5 4.5 8.7 5.5 9.2C5.2 10 5.2 10.8 5.5 11.5L3 14l2 1-2 2 3-1c.8 1.2 2 2.1 3.5 2.5L9 21h1.5l.5-2h2l.5 2H15l-.5-2.5c1.5-.4 2.7-1.3 3.5-2.5l3 1-2-2 2-1-2.5-2.5c.3-.7.3-1.5 0-2.3 1-.5 1.5-1.7 1-2.7C19 4.5 18 4.2 17 4.5 16.5 3.5 14.5 2 12 2z" />
      <ellipse cx="10" cy="11" rx="1.2" ry="1.5" fill="#1A120B" />
      <ellipse cx="14" cy="11" rx="1.2" ry="1.5" fill="#1A120B" />
      <path d="M9 13.5c.8.8 2 1.2 3 1.2s2.2-.4 3-1.2" stroke="#1A120B" strokeWidth="0.8" fill="none" />
      <path d="M8 7.5C8 7.5 9 6 12 6s4 1.5 4 1.5" stroke="#1A120B" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

export default BeeIcon
