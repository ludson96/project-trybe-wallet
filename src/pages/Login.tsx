import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { actionEmail } from '../redux/actions';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    dispatch(actionEmail(email));
    navigate('/carteira');
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#10b981] flex items-center justify-center text-white font-bold text-xl shadow-sm">
            F
          </div>
          <span className="text-2xl font-bold text-[#1f2937] tracking-tight">
            Finan<span className="text-[#10b981]">Track</span>
          </span>
        </div>
        <h2 className="text-xl font-semibold text-[#374151]">
          Acesse sua conta
        </h2>
        <p className="mt-1 text-xs text-[#6b7280]">
          Gerencie seus gastos e conversões de moedas em um só lugar
        </p>
      </div>

      {/* Login Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-[#e5e7eb] rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* E-mail field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-semibold text-[#374151] mb-1.5"
              >
                E-mail
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9ca3af]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  data-testid="email-input"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="password" 
                  className="block text-xs font-semibold text-[#374151]"
                >
                  Senha
                </label>
                <span className="text-[11px] text-[#9ca3af]">Mínimo de 6 dígitos</span>
              </div>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9ca3af]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  id="password"
                  data-testid="password-input"
                  placeholder="••••••••"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-150 shadow-sm ${
                  isFormValid
                    ? 'bg-[#10b981] hover:bg-[#059669] text-white cursor-pointer active:scale-[0.99]'
                    : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'
                }`}
              >
                <span>Entrar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-[#9ca3af]">
          FinanTrack &bull; Sistema de Gestão Financeira Pessoal
        </p>
      </div>
    </div>
  );
};

export default Login;
