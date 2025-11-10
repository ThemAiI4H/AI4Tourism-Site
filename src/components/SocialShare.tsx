'use client';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from 'react-share';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  size?: number;
  className?: string;
}

export default function SocialShare({
  url,
  title,
  description = '',
  hashtags = ['Italia', 'Turismo', 'Viaggi'],
  size = 32,
  className = ''
}: SocialShareProps) {
  const shareButtons = [
    {
      Button: FacebookShareButton,
      Icon: FacebookIcon,
      label: 'Condividi su Facebook',
      color: '#1877F2'
    },
    {
      Button: TwitterShareButton,
      Icon: TwitterIcon,
      label: 'Condividi su Twitter',
      color: '#1DA1F2'
    },
    {
      Button: WhatsappShareButton,
      Icon: WhatsappIcon,
      label: 'Condividi su WhatsApp',
      color: '#25D366'
    },
    {
      Button: TelegramShareButton,
      Icon: TelegramIcon,
      label: 'Condividi su Telegram',
      color: '#0088CC'
    },
    {
      Button: EmailShareButton,
      Icon: EmailIcon,
      label: 'Condividi via Email',
      color: '#EA4335'
    }
  ];

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <span className="text-sm text-gray-600 mr-2 self-center">Condividi:</span>
      {shareButtons.map(({ Button, Icon, label, color }) => {
        // Alcuni button non supportano description/hashtags
        const isSimpleButton = Button === WhatsappShareButton || Button === TelegramShareButton || Button === EmailShareButton;

        return (
          <Button
            key={label}
            url={url}
            title={title}
            {...(!isSimpleButton && {
              description,
              hashtags
            })}
            className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label={label}
          >
            <Icon size={size} round bgStyle={{ fill: color }} />
          </Button>
        );
      })}
    </div>
  );
}

// Componente per condivisione semplificata (solo icone)
export function SocialShareSimple({
  url,
  title,
  size = 24,
  className = ''
}: Omit<SocialShareProps, 'description' | 'hashtags'>) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <FacebookShareButton url={url} title={title} aria-label="Condividi su Facebook">
        <FacebookIcon size={size} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title} aria-label="Condividi su Twitter">
        <TwitterIcon size={size} round />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title} aria-label="Condividi su WhatsApp">
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>
    </div>
  );
}
