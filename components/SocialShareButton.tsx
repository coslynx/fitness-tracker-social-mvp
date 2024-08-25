import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface SocialShareButtonProps {
  url: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <FaFacebook size={20} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <FaTwitter size={20} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <FaLinkedin size={20} />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-700"
      >
        <FaWhatsapp size={20} />
      </a>
      <button
        onClick={handleCopy}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        {isCopied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
};

export default SocialShareButton;