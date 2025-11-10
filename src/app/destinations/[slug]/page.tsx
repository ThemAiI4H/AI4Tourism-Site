import DestinationClient from '@/components/DestinationClient';
import { destinations } from '@/data/destinations';

export async function generateStaticParams() {
  return [
    { slug: 'roma' },
    { slug: 'firenze' },
    { slug: 'venezia' },
    { slug: 'napoli' },
    { slug: 'milano' },
    { slug: 'pisa' }
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const destination = destinations[params.slug as keyof typeof destinations];

  if (!destination) {
    return {
      title: 'Destinazione non trovata | AI4Tourism',
      description: 'La destinazione richiesta non è disponibile.',
    };
  }

  const title = `${destination.name} - Guida Turistica | AI4Tourism`;
  const description = `${destination.description} Scopri attrazioni, attività e consigli di viaggio per visitare ${destination.name}, ${destination.region}.`;

  return {
    title,
    description,
    keywords: [
      destination.name,
      destination.region,
      'Italia',
      'turismo',
      'viaggio',
      'attrazioni',
      'guida turistica',
      'vacanze',
      'destinazioni'
    ],
    authors: [{ name: 'AI4Tourism' }],
    creator: 'AI4Tourism',
    publisher: 'AI4Tourism',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      url: `https://ai4tourism.com/destinations/${params.slug}`,
      siteName: 'AI4Tourism',
      images: [
        {
          url: destination.image,
          width: 1200,
          height: 800,
          alt: `Scopri ${destination.name} - Guida turistica completa`,
        },
      ],
      locale: 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [destination.image],
      creator: '@ai4tourism',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://ai4tourism.com/destinations/${params.slug}`,
    },
  };
}

export default function DestinationPage() {
  return <DestinationClient />;
}
