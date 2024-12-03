import React from "react";
import {
  Facebook,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-black w-full py-12 text-white 3xl:mt-40">
      <footer className="container mx-auto px-4 max-w-screen-2xl 3xl:max-w-screen-3xl">
        <div className="flex flex-col lg:flex-row items-start justify-between space-y-5 lg:space-y-0 2xl:gap-20">
          <div className="flex 2xl:gap-80 3xl:gap-80 mr-80">
            <div className="flex-1">
              <h2 className="text-2xl font-bold uppercase border-b-2 border-red-600 pb-3 3xl:text-5xl">
                Follow Us
              </h2>
              <ul className="space-y-4 3xl:text-4xl">
                {[
                  { name: 'GitHub', href: 'https://github.com/Ayukgiress' },
                  { name: 'Discord', href: '#' }
                ].map((link) => (
                  <li className="3xl:text-5xl" key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-lg 3xl:text-4xl"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold uppercase border-b-2 border-red-600 pb-3 3xl:text-5xl">
                Contact
              </h2>
              <ul className="space-y-4">
                <li className="text-gray-300 hover:text-white transition-colors duration-300 text-lg 3xl:text-4xl">
                  Cameroon, Yaounde
                </li>
                <li className="text-gray-300 hover:text-white transition-colors duration-300 text-lg 3xl:text-4xl">
                  676184440
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-1 items-end justify-between space-y-6">
            <span className="text-gray-400 text-sm lg:text-base text-right 3xl:text-5xl">
              © 2024{" "}
              <a
                href="/"
                className="hover:text-red-600 transition-colors duration-300"
              >
                Active<span className="text-red-800">Pulse</span>™
              </a>
              . All Rights Reserved.
            </span>

            <div className="flex space-x-8">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/ayuk-giress-077734294', label: 'LinkedIn' },
                { Icon: Twitter, href: 'https://x.com/AyukGiress', label: 'Twitter' },
                { Icon: Github, href: 'https://github.com/Ayukgiress', label: 'GitHub' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-white 3xl:text-4xl transition-transform duration-300 transform hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-7 h-7 lg:w-9 lg:h-9 3xl:w-12 3xl:h-12" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;