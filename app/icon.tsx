import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #2563eb, #4338ca)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          color: 'white',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: '65%', height: '65%' }}
        >
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v6" />
          <path d="M12 8c-2.5 0-5 2-5 6" />
          <path d="M12 8c2.5 0 5 2 5 6" />
          <path d="M7 14c-1.5 0-3 1.5-3 3 0 2.5 3.5 3.5 8 3.5s8-1 8-3.5c0-1.5-1.5-3-3-3l-5 2z" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
