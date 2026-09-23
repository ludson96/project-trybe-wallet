import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { useAppSelector } from '../redux/store';
import { TrendingDown, CreditCard, DollarSign, Globe2 } from 'lucide-react';

const Wallet: React.FC = () => {
  const expenses = useAppSelector((state) => state.wallet.expenses);

  const totalBRL = expenses.reduce((acc, current) => {
    const rate = current.exchangeRates?.[current.currency]?.ask;
    const ask = rate ? Number(rate) : 1;
    return acc + (Number(current.value) || 0) * ask;
  }, 0);

  const highestExpense = expenses.reduce((max, current) => {
    const rate = current.exchangeRates?.[current.currency]?.ask;
    const ask = rate ? Number(rate) : 1;
    const converted = (Number(current.value) || 0) * ask;
    return converted > max ? converted : max;
  }, 0);

  const distinctCurrencies = new Set(expenses.map((e) => e.currency)).size;

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col pb-16">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* KPI Widget Cards (Organizze style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Despesas */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-[#6b7280]">
                Despesas em BRL
              </span>
              <div className="text-2xl font-bold text-[#ef4444] mt-1">
                R$ {totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-[#9ca3af] mt-0.5 block">
                Total convertido
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#ef4444] flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Lançamentos */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-[#6b7280]">
                Total de Lançamentos
              </span>
              <div className="text-2xl font-bold text-[#111827] mt-1">
                {expenses.length}
              </div>
              <span className="text-[11px] text-[#9ca3af] mt-0.5 block">
                {expenses.length === 1 ? '1 registro' : `${expenses.length} registros`}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10b981] flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Maior Despesa */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-[#6b7280]">
                Maior Gasto
              </span>
              <div className="text-2xl font-bold text-[#111827] mt-1">
                R$ {highestExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-[#9ca3af] mt-0.5 block">
                Individual
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#f59e0b] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Moedas Utilizadas */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-[#6b7280]">
                Moedas Estrangeiras
              </span>
              <div className="text-2xl font-bold text-[#111827] mt-1">
                {distinctCurrencies}
              </div>
              <span className="text-[11px] text-[#9ca3af] mt-0.5 block">
                {distinctCurrencies <= 1 ? 'moeda ativa' : 'moedas ativas'}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3b82f6] flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Section: Formulário de Lançamento */}
        <section>
          <WalletForm />
        </section>

        {/* Section: Tabela de Lançamentos */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-[#1f2937]">
              Extrato de Transações
            </h2>
            <span className="text-xs text-[#9ca3af]">
              Cotações ao vivo via AwesomeAPI
            </span>
          </div>
          <Table />
        </section>

      </main>
    </div>
  );
};

export default Wallet;
