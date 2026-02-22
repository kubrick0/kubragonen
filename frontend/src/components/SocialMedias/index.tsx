import React from 'react';
import { SocialMediaProps } from '../../types/social-media';

interface SocialMediasProps {
  socialMedias: SocialMediaProps[];
}

export const SocialMedias: React.FC<SocialMediasProps> = ({ socialMedias }) => {
  return (
    <div className="mt-4 flex items-center gap-4 flex-wrap justify-center">
      {socialMedias.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-lg  transition-all duration-200 no-underline cursor-pointer hover:bg-gray-200 hover:-translate-y-0.5"
        >
          <img
            src={social.icon}
            alt={social.label}
            className="w-8 h-8 object-contain"
          />
        </a>
      ))}
    </div>
  );
};
