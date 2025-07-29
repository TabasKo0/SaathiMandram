import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <main style={{ flex: 1 }}>{children}</main>
            <nav
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: '60px',
                    borderTop: '1px solid #eee',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: 'linear-gradient(to left, #a855f7, #facc15)',

                }}
            >
                <Link href="/home/jobs" style={{ textDecoration: 'none', color: '#ffffff', fontSize: '18px',textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)'}}>
                    Jobs
                </Link>
                <Link href="/home/profile" style={{ textDecoration: 'none', color: '#ffffff', fontSize: '18px',textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)' }}>
                    Profile
                </Link>
                <Link href="/home/support" style={{ textDecoration: 'none', color: '#ffffff', fontSize: '18px',textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)' }}>
                    Support
                </Link>
            </nav>
            <div style={{ height: '60px' }} /> {/* Spacer for nav bar */}
        </div>
    );
}