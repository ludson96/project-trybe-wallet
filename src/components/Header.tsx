import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { LogOut, User, DollarSign, WalletCards } from 'lucide-react';

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
    <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Active Section */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <WalletCards className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-[#1f2937] tracking-tight">
              Finan<span className="text-[#10b981]">Track</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <span className="px-3 py-1.5 text-xs font-semibold text-[#10b981] bg-[#ecfdf5] rounded-md">
              Visão Geral
            </span>
            <span className="px-3 py-1.5 text-xs font-medium text-[#6b7280] hover:text-[#111827] rounded-md cursor-default">
              Lançamentos
            </span>
            <span className="px-3 py-1.5 text-xs font-medium text-[#6b7280] hover:text-[#111827] rounded-md cursor-default">
              Cotações
            </span>
          </nav>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Quick Total Pill */}
          <div className="flex items-center gap-2 bg-[#f9fafb] border border-[#e5e7eb] px-3 py-1.5 rounded-lg">
            <div className="w-6 h-6 rounded-md bg-[#ecfdf5] text-[#10b981] flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-[#9ca3af] leading-tight">
                Total Geral
              </span>
              <div className="flex items-baseline gap-1">
                <span data-testid="total-field" className="text-sm font-bold text-[#111827]">
                  {formattedTotal}
                </span>
                <span data-testid="header-currency-field" className="text-[10px] font-semibold text-[#6b7280]">
                  BRL
                </span>
              </div>
            </div>
          </div>

          {/* User profile dropdown lookalike */}
          <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-[#e5e7eb]">
            <div className="hidden sm:flex flex-col text-right">
              <span data-testid="email-field" className="text-xs font-medium text-[#374151] max-w-[160px] truncate">
                {email || 'ludson.pereira26@gmail.com'}
              </span>
              <span className="text-[10px] text-[#10b981] font-semibold">Conta Ativa</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#f3f4f6] border border-[#e5e7eb] flex items-center justify-center text-[#6b7280]">
              <User className="w-4 h-4" />
            </div>

            <button
              onClick={() => navigate('/')}
              title="Sair"
              className="p-1.5 text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#fef2f2] rounded-lg transition-colors cursor-pointer"
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
