import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#e0e3eb] bg-white py-10 px-4 lg:px-8 text-sm text-[#6a6d78]" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <svg className="h-5 w-7 text-black shrink-0" fill="currentColor" viewBox="0 0 36 28">
            <path d="M14 22H7V6h7v16zm15-16h-7v10h7V6zm-7 16h7V18h-7v4zM0 2h36v2H0V2z" />
          </svg>
          <span className="text-xs">
            © 2025 TradingView, Inc. All markets and financial data are provided for educational purposes.
          </span>
        </div>
        <div className="flex items-center space-x-6 text-xs font-medium">
          <a
            href="#terms"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#2962ff] transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#privacy"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#2962ff] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#security"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#2962ff] transition-colors"
          >
            Security
          </a>
          <a
            href="#status"
            onClick={e => { e.preventDefault(); }}
            className="hover:text-[#2962ff] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#089981]" />
            <span>Status</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
