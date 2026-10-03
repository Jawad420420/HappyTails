import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ShieldCheck, PawPrint } from 'lucide-react'; 

const Footer = () => {
  return (
    <footer className="bg-[#171d2b] text-slate-300 pt-12 pb-8 border-t border-slate-800/60 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
        
        {/* Left Column: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {/* Paw Icon */}
            <PawPrint className="w-7 h-7 text-[#84cc16]" />
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Happy<span className="text-slate-200">Tails</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Connecting loving homes with pets in need. Adopt, foster or volunteer to make a difference today.
          </p>
        </div>

        {/* Right Column: Contact & Support */}
        <div className="space-y-4 md:justify-self-end">
          <h4 className="text-white font-bold text-base mb-3">Contact & Support</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#eab308]" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#eab308]" />
              <a href="mailto:support@happytails.org" className="hover:underline">
                support@happytails.org
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#eab308]" />
              <span>+880 1XXX-XXXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#84cc16]" />
              <span>Verified Shelter Network</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Links Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© 2026 HappyTails. All rights reserved.</p>
        <div className="flex items-center space-x-6">
          <Link to="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition">
            Terms of Service
          </Link>
          <Link to="/help" className="hover:text-white transition">
            Help Center
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;