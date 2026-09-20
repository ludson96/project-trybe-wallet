import React from 'react';
import { Wallet, DollarSign, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const Header: React.FC = () => {
  const email = useAppSelector((state) => state.user.email);
  const expenses = useAppSelector((state) => state.wallet.expenses);
  const navigate = useNavigate();

  // Calcular total convertido em BRL
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

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/20">
            <Wallet className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">
              Finan<span className="text-emerald-400">Track</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live FX
            </span>
          </div>
        </div>

        {/* User Info & Total Balance */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Total Badge */}
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl">
            <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Total Convertido
              </div>
              <div className="flex items-baseline gap-1">
                <span 
                  data-testid="total-field" 
                  className="text-base font-bold text-emerald-400 font-mono"
                >
                  {formattedTotal}
                </span>
                <span 
                  data-testid="header-currency-field" 
                  className="text-xs font-medium text-slate-400"
                >
                  BRL
                </span>
              </div>
            </div>
          </div>

          {/* User Email & Logout */}
          <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-800">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-medium text-slate-300 max-w-[180px] truncate" data-testid="email-field">
                {email || 'usuario@exemplo.com'}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Online</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <button
              onClick={handleLogout}
              title="Sair"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
