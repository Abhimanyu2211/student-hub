export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          <strong>Student Hub</strong> — Full-Stack Academic Management Platform &copy; {new Date().getFullYear()}
        </p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--ink-faint)' }}>
          Roll No: 24ESKCS013 &bull; React + Express + TypeScript Foundation (Phase 3)
        </p>
      </div>
    </footer>
  );
}
