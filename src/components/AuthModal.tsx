import React, { useState } from 'react';
import { X, CheckCircle2, Lock, Mail, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#e0e3eb] shadow-2xl rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 text-center space-y-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-1 text-[#6a6d78] hover:text-[#131722] rounded-lg hover:bg-[#f0f3f6] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#e7f0fe] text-[#2962ff] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#131722]">Join TradingView</h2>
            <p className="text-xs text-[#6a6d78] mt-1">
              Unlock unlimited interactive charts, real-time alerts, and customized watchlists.
            </p>
          </div>

          {submitted ? (
            <div className="py-6 space-y-2 text-center text-[#089981] animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 mx-auto" />
              <div className="font-bold text-sm">Welcome aboard!</div>
              <div className="text-xs text-[#6a6d78]">Your free demo account is activated.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6a6d78] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e0e3eb] text-sm text-[#131722] outline-hidden focus:border-[#2962ff] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full gradient-pill text-white font-semibold py-2.5 rounded-xl text-sm shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-[#6a6d78]">
                By signing up, you agree to TradingView Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
