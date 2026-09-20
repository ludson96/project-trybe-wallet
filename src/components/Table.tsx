import React from 'react';
import { Edit3, Trash2, Receipt } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteExpense, editExpense } from '../redux/actions';

const TAG_COLORS: Record<string, string> = {
  Alimentação: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Lazer: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Trabalho: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Transporte: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  Saúde: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const Table: React.FC = () => {
  const expenses = useAppSelector((state) => state.wallet.expenses);
  const idToEdit = useAppSelector((state) => state.wallet.idToEdit);
  const dispatch = useAppDispatch();

  const handleEdit = (id: number) => {
    dispatch(editExpense(true, id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteExpense(id));
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <Receipt className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-200">Nenhuma despesa cadastrada</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
          Adicione um novo gasto no formulário acima para visualizar o câmbio e a conversão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <th className="py-3.5 px-4">Descrição</th>
              <th className="py-3.5 px-4">Categoria</th>
              <th className="py-3.5 px-4">Pagamento</th>
              <th className="py-3.5 px-4">Valor Original</th>
              <th className="py-3.5 px-4">Moeda</th>
              <th className="py-3.5 px-4">Câmbio Utilizado</th>
              <th className="py-3.5 px-4">Convertido (BRL)</th>
              <th className="py-3.5 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {expenses.map((item) => {
              const currentRate = item.exchangeRates?.[item.currency];
              const currencyName = currentRate?.name ? currentRate.name.split('/')[0] : item.currency;
              const ask = currentRate ? Number(currentRate.ask) : 1;
              const originalValue = Number(item.value) || 0;
              const convertedValue = originalValue * ask;
              const isCurrentlyEdited = idToEdit === item.id;

              return (
                <tr
                  key={item.id}
                  className={`transition-colors hover:bg-slate-800/40 ${
                    isCurrentlyEdited ? 'bg-amber-500/10' : ''
                  }`}
                >
                  {/* Descrição */}
                  <td className="py-4 px-4 font-medium text-slate-200">
                    {item.description}
                  </td>

                  {/* Categoria Badge */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        TAG_COLORS[item.tag] || 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {item.tag}
                    </span>
                  </td>

                  {/* Método */}
                  <td className="py-4 px-4 text-slate-300">
                    {item.method}
                  </td>

                  {/* Valor Original */}
                  <td className="py-4 px-4 font-mono font-medium text-slate-200">
                    {originalValue.toFixed(2)}
                  </td>

                  {/* Moeda */}
                  <td className="py-4 px-4 text-slate-400 text-xs">
                    <span className="font-semibold text-slate-300">{item.currency}</span>
                    <span className="block truncate max-w-[120px] text-[11px] text-slate-500">
                      {currencyName}
                    </span>
                  </td>

                  {/* Câmbio */}
                  <td className="py-4 px-4 font-mono text-xs text-slate-300">
                    R$ {ask.toFixed(2)}
                  </td>

                  {/* Convertido */}
                  <td className="py-4 px-4 font-mono font-semibold text-emerald-400">
                    R$ {convertedValue.toFixed(2)}
                  </td>

                  {/* Ações */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        id={String(item.id)}
                        data-testid="edit-btn"
                        onClick={() => handleEdit(item.id)}
                        title="Editar"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        id={String(item.id)}
                        data-testid="delete-btn"
                        onClick={() => handleDelete(item.id)}
                        title="Excluir"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
