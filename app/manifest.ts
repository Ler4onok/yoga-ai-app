import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YoflowAI - Intelligent Yoga Sequence Generator',
    short_name: 'YoflowAI',
    description: 'Build your perfect yoga practice in seconds. AI-generated, personalized yoga flows.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4f46e5', // indigo-600
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
