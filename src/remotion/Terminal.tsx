import React from 'react'

interface TerminalProps {
  children: React.ReactNode
}

export const Terminal: React.FC<TerminalProps> = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0d0d0d',
        borderRadius: 12,
        border: '1px solid #333',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          height: 40,
          background: 'linear-gradient(180deg, #3d3d3d 0%, #2d2d2d 100%)',
          borderBottom: '1px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
        }}
      >
        {/* Traffic light buttons */}
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#ff5f57',
            boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)',
          }}
        />
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#ffbd2e',
            boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)',
          }}
        />
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#28ca42',
            boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)',
          }}
        />
        {/* Terminal title */}
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            color: '#999',
            fontSize: 13,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 500,
            marginRight: 54,
          }}
        >
          Terminal
        </div>
      </div>
      {/* Terminal Body */}
      <div
        style={{
          flex: 1,
          padding: '32px 40px',
          fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
          fontSize: 28,
          lineHeight: 1.5,
          boxSizing: 'border-box',
          background: '#0d0d0d',
          overflow: 'hidden',
          borderBottomLeftRadius: 11,
          borderBottomRightRadius: 11,
        }}
      >
        {children}
      </div>
    </div>
  )
}
