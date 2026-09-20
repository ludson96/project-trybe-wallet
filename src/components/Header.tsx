import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const Header: React.FC = () => {
  const email = useAppSelector((state) => state.user.email);
  const expenses = useAppSelector((state) => state.wallet.expenses);
  const navigate = useNavigate();

  const totalExpenses = expenses.reduce((acc, current) => {
    const rate = current.exchangeRates?.[current.currency]?.ask;
    const ask = rate ? Number(rate) : 1;
    const value = Number(current.value) || 0;
    return acc + value * ask;
  }, 0);

  const formattedTotal = totalExpenses.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <header className="border-b border-[rgba(255,255,255,0.075)] bg-[#1b1e24]/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#47c9e5]"></span>
          <h1 className="text-xl font-bold tracking-tight text-white m-0 uppercase text-sm">
            FinanTrack <span className="text-[#47c9e5]">/</span> Wallet
          </h1>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-6 text-xs tracking-wider">
          <div className="border-l border-[rgba(255,255,255,0.1)] pl-4">
            <span className="block text-[10px] uppercase font-bold text-[#6a707c]">Total Convertido</span>
            <div className="flex items-baseline gap-1 text-white font-mono font-bold text-sm">
              <span data-testid="total-field" className="text-[#47c9e5]">{formattedTotal}</span>
              <span data-testid="header-currency-field" className="text-[10px] text-[#9fa4af]">BRL</span>
            </div>
          </div>

          <div className="border-l border-[rgba(255,255,255,0.1)] pl-4 hidden md:block">
            <span className="block text-[10px] uppercase font-bold text-[#6a707c]">Usuário</span>
            <span data-testid="email-field" className="text-slate-300 font-medium">
              {email || 'convidado@carteira.com'}
            </span>
          </div>

          <div className="border-l border-[rgba(255,255,255,0.1)] pl-4">
            <button
              onClick={() => navigate('/')}
              className="text-xs uppercase font-bold tracking-widest text-[#7b818d] hover:text-white transition-colors cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
