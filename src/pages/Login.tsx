import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { actionEmail } from '../redux/actions';

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
    <div className="min-h-screen bg-[#1b1e24] flex items-center justify-center p-6 sm:p-12">
      {/* Paradigm Shift Container */}
      <div className="w-full max-w-5xl bg-[#22262e] border border-[rgba(255,255,255,0.075)] rounded-sm grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
        
        {/* Left Editorial / Intro Section */}
        <section className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.075)] flex flex-col justify-between bg-[#1f232a]">
          <div>
            <div className="inline-block border-b-2 border-[#47c9e5] pb-2 mb-6">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#47c9e5]">
                Financial Portfolio
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              FinanTrack
            </h1>
            
            <p className="text-[#9fa4af] text-sm leading-relaxed mb-6 font-light">
              Uma ferramenta simplificada para acompanhamento e conversão inteligente de despesas multimoedas com cotação ao vivo.
            </p>

            <ul className="space-y-3 text-xs tracking-wider uppercase text-[#7b818d] font-semibold border-t border-[rgba(255,255,255,0.05)] pt-6">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#47c9e5] rounded-full"></span>
                API de Câmbio em Tempo Real
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#47c9e5] rounded-full"></span>
                Controle de Gastos & Conversão
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#47c9e5] rounded-full"></span>
                Persistência Local Automática
              </li>
            </ul>
          </div>

          <div className="pt-8 mt-8 border-t border-[rgba(255,255,255,0.05)] text-[11px] text-[#6a707c] tracking-widest uppercase">
            React &bull; TypeScript &bull; Redux &bull; Tailwind
          </div>
        </section>

        {/* Right Form Section */}
        <section className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <header className="mb-8">
            <h2 className="text-xl font-bold text-white tracking-wide uppercase text-sm mb-1">
              Acesso à Carteira
            </h2>
            <p className="text-xs text-[#7b818d]">
              Insira suas credenciais para gerenciar seus registros financeiros.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-xs uppercase font-semibold tracking-widest text-[#a0a5ad]"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                data-testid="email-input"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm placeholder-[#555a64]"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block text-xs uppercase font-semibold tracking-widest text-[#a0a5ad]"
                >
                  Senha
                </label>
                <span className="text-[11px] text-[#6a707c]">Mínimo de 6 caracteres</span>
              </div>
              <input
                type="password"
                id="password"
                data-testid="password-input"
                placeholder="••••••"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm placeholder-[#555a64]"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-3.5 px-6 rounded-sm text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-150 ${
                  isFormValid
                    ? 'bg-[#47c9e5] hover:bg-[#5ed0ea] text-[#1b1e24] cursor-pointer'
                    : 'bg-[rgba(255,255,255,0.05)] text-[#555a64] border border-[rgba(255,255,255,0.05)] cursor-not-allowed'
                }`}
              >
                Entrar
              </button>
            </div>
          </form>
        </section>

      </div>
    </div>
  );
};

export default Login;
