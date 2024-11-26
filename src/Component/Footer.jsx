import React from "react";
import {
  Facebook,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-black w-full py-12 text-white">  
    <footer className="container mx-auto px-4 max-w-screen-xl">  
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-6 lg:space-y-0">  
        <div className="flex-1">  
          <h2 className="text-2xl font-bold uppercase border-b-2 border-red-600 pb-3">  
            Follow Us  
          </h2>  
          <ul className="space-y-4">  
            {[  
              { name: 'GitHub', href: 'https://github.com/Ayukgiress' },  
              { name: 'Discord', href: '#' }  
            ].map((link) => (  
              <li key={link.name}>  
                <a  
                  href={link.href}  
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-lg"  
                >  
                  {link.name}  
                </a>  
              </li>  
            ))}  
          </ul>  
        </div>  
  
        {/* Contact Section */}  
        <div className="flex-1">  
          <h2 className="text-2xl font-bold uppercase border-b-2 border-red-600 pb-3">  
            Contact  
          </h2>  
          <ul className="space-y-4">  
            <li className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">  
              Cameroon, Yaounde  
            </li>  
            <li className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">  
              676184440  
            </li>  
          </ul>  
        </div>  
  
        <div className="flex flex-col lg:flex-1 items-end justify-between space-y-6">  
          <span className="text-gray-400 text-sm lg:text-base text-right">  
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
                className="text-gray-400 hover:text-white transition-transform duration-300 transform hover:scale-110"  
                aria-label={label}  
              >  
                <Icon className="w-7 h-7 lg:w-9 lg:h-9" />  
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
