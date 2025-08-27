import React from 'react';
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Shield, FileText, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 mt-8">
      
      <div className="max mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-pink-500" />
              <h3 className="text-3xl font-bold">AafnoGhar</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Find your perfect home with our comprehensive rental platform. 
              Connecting tenants and landlords across the region.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Browse Properties
                </a>
              </li>
              <li>
                <a href="/list-property" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Add space
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-pink-500 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Support</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-pink-500" />
                <a href="/help" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-pink-500" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-pink-500 transition-colors">
                  +977 9869648888
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-pink-500" />
                <a href="mailto:support@renteasy.com" className="text-gray-600 hover:text-pink-500 transition-colors">
                  support@aafnoghar.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-pink-500" />
                <span className="text-gray-600">
                  Gitanagar, Bharatpur-22, Chitwan
                </span>
              </li>
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Stay Updated</h4>
            <p className="text-gray-600 text-sm">
              Subscribe to get the latest property listings and rental tips.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition-colors font-medium">
                Subscribe
              </button>
            </div>

            {/* Legal Links */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-pink-500" />
                <a href="/privacy" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Privacy Policy
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-pink-500" />
                <a href="/terms" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              © 2025 AafnoGhar. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/accessibility" className="text-gray-500 hover:text-pink-500 transition-colors">
                Accessibility
              </a>
              <a href="/cookies" className="text-gray-500 hover:text-pink-500 transition-colors">
                Cookie Settings
              </a>
              <a href="/sitemap" className="text-gray-500 hover:text-pink-500 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;