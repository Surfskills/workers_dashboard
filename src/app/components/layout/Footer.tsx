'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: "github", href: "https://github.com/fredosege", label: "GitHub" },
    { icon: "linkedin", href: "https://linkedin.com/in/fredosege", label: "LinkedIn" },
    { icon: "twitter", href: "https://twitter.com/fredosege", label: "Twitter" },
    { icon: "mail", href: "mailto:contact@fredosege.com", label: "Email" }
  ];

  const footerLinks = [
    {
      title: "Remote-CTIO",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Get Recommended", href: "/recomendations" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookies Policy", href: "/cookies" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Ecommerce", href: "/services/ecommerce" },
        { label: "Custom Web Apps", href: "/services/custom" },
        { label: "CICD Pipeline", href: "/services/cicd" },
        { label: "Tech Consultation", href: "/services/consultation" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Remote-CTO Logo"
                width={32}
                height={32}
                className="dark:invert"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Remote-CTIO
              </span>
            </Link>
            <p className="text-sm">
              Empowering businesses with cutting-edge technology solutions and expert consultation.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  aria-label={social.label}
                >
                  <Image
                    src={`/icons/${social.icon}.svg`}
                    alt={social.label}
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm">
              &copy; {currentYear} Fred Osege. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <button
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;