import { destinations } from '@/data/destinations';

interface SchemaMarkupProps {
  type: 'organization' | 'place' | 'event' | 'website';
  data?: any;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const getSchemaData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'AI4Tourism',
          url: 'https://ai4tourism.com',
          logo: 'https://ai4tourism.com/logo.png',
          description: 'Piattaforma turistica italiana con mappe interattive e guide dettagliate per scoprire le meraviglie d\'Italia.',
          foundingDate: '2024',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+39-123-456-7890',
            contactType: 'customer service',
            availableLanguage: 'Italian'
          },
          sameAs: [
            'https://www.facebook.com/ai4tourism',
            'https://www.instagram.com/ai4tourism',
            'https://twitter.com/ai4tourism'
          ]
        };

      case 'place':
        if (!data) return null;
        const destination = destinations[data.slug as keyof typeof destinations];
        if (!destination) return null;

        return {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: destination.name,
          description: destination.description,
          address: {
            '@type': 'PostalAddress',
            addressRegion: destination.region,
            addressCountry: 'IT'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.lat || 42.5,
            longitude: data.lng || 12.5
          },
          image: destination.image,
          url: `https://ai4tourism.com/destinations/${data.slug}`,
          touristType: 'Cultural tourism',
          containsPlace: destination.highlights?.map((highlight: any) => ({
            '@type': 'Place',
            name: highlight.name,
            description: highlight.description
          }))
        };

      case 'event':
        if (!data) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'Festival',
          name: data.title,
          description: data.description,
          startDate: data.date,
          location: {
            '@type': 'Place',
            name: data.location,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IT'
            }
          },
          image: data.image,
          organizer: {
            '@type': 'Organization',
            name: 'AI4Tourism'
          }
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'AI4Tourism',
          url: 'https://ai4tourism.com',
          description: 'Scopri l\'Italia con mappe interattive e guide turistiche dettagliate.',
          inLanguage: 'it-IT',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://ai4tourism.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: 'AI4Tourism'
          }
        };

      default:
        return null;
    }
  };

  const schemaData = getSchemaData();
  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  );
}
