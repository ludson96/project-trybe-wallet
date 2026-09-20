import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { useAppSelector } from '../redux/store';

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
    <div className="min-h-screen bg-[#1b1e24] flex flex-col pb-20">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-10 space-y-10">
        
        {/* Paradigm Shift Metric Section (Solid Clean Grid) */}
        <section className="bg-[#22262e] border border-[rgba(255,255,255,0.075)] p-6 sm:p-8">
          <div className="border-b border-[rgba(255,255,255,0.075)] pb-4 mb-6">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#47c9e5]">
              Resumo Geral
            </span>
            <h2 className="text-xl font-bold text-white tracking-wide mt-1 uppercase text-sm">
              Visão Consolidada da Carteira
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="border-l-2 border-[#47c9e5] pl-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#6a707c]">
                Despesas Totais
              </span>
              <div className="text-2xl font-bold text-white font-mono mt-1">
                R$ {totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-[#47c9e5] uppercase tracking-wider block mt-0.5">
                Convertido em BRL
              </span>
            </div>

            {/* Metric 2 */}
            <div className="border-l-2 border-[rgba(255,255,255,0.15)] pl-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#6a707c]">
                Registros
              </span>
              <div className="text-2xl font-bold text-white font-mono mt-1">
                {expenses.length}
              </div>
              <span className="text-[11px] text-[#6a707c] uppercase tracking-wider block mt-0.5">
                Transações salvas
              </span>
            </div>

            {/* Metric 3 */}
            <div className="border-l-2 border-[rgba(255,255,255,0.15)] pl-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#6a707c]">
                Maior Despesa
              </span>
              <div className="text-2xl font-bold text-white font-mono mt-1">
                R$ {highestExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-[#6a707c] uppercase tracking-wider block mt-0.5">
                Maior lançamento individual
              </span>
            </div>

            {/* Metric 4 */}
            <div className="border-l-2 border-[rgba(255,255,255,0.15)] pl-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#6a707c]">
                Câmbios Ativos
              </span>
              <div className="text-2xl font-bold text-white font-mono mt-1">
                {distinctCurrencies}
              </div>
              <span className="text-[11px] text-[#6a707c] uppercase tracking-wider block mt-0.5">
                Moedas estrangeiras
              </span>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section>
          <WalletForm />
        </section>

        {/* Transactions Table Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.075)] pb-3">
            <h2 className="text-sm uppercase font-bold tracking-widest text-white m-0">
              Extrato de Gastos & Câmbio
            </h2>
            <span className="text-xs text-[#6a707c]">
              Taxas em tempo real via AwesomeAPI
            </span>
          </div>
          <Table />
        </section>

      </main>
    </div>
  );
};

export default Wallet;
