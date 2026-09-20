import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { useAppSelector } from '../redux/store';
import { ArrowUpRight, TrendingUp, Layers, WalletCards } from 'lucide-react';

const Wallet: React.FC = () => {
  const expenses = useAppSelector((state) => state.wallet.expenses);

  // Totais e métricas do dashboard
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
    <div className="min-h-screen bg-slate-950 flex flex-col pb-16">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total BRL */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Despesas Totais</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              R$ {totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              Convertido em tempo real
            </div>
          </div>

          {/* Card 2: Qtd Despesas */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Registros</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              {expenses.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {expenses.length === 1 ? '1 transação lançada' : `${expenses.length} transações lançadas`}
            </div>
          </div>

          {/* Card 3: Maior Gasto */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Maior Despesa</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <WalletCards className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              R$ {highestExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-amber-400/80 mt-1">
              Maior impacto individual
            </div>
          </div>

          {/* Card 4: Moedas Utilizadas */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Câmbios Ativos</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              {distinctCurrencies}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {distinctCurrencies <= 1 ? 'moeda estrangeira' : 'moedas estrangeiras diferentes'}
            </div>
          </div>
        </div>

        {/* Section: Formulário */}
        <section>
          <WalletForm />
        </section>

        {/* Section: Tabela de Gastos */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 tracking-tight">
              Histórico de Conversões & Despesas
            </h2>
            <span className="text-xs text-slate-400">
              Cotações fornecidas por AwesomeAPI
            </span>
          </div>
          <Table />
        </section>
      </main>
    </div>
  );
};

export default Wallet;
