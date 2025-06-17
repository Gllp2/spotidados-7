import React from 'react';

const LogIn = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* Placeholder for future image */}
            <div style={{ width: 120, height: 120, background: '#eee', borderRadius: '50%', marginBottom: 32 }} />
            <button style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: 6, border: 'none', background: '#1db954', color: '#fff', cursor: 'pointer' }}>
                Log In
            </button>
        </div>
    );
};

export default LogIn;

