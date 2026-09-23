import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteExpense, editExpense } from '../redux/actions';
import { Edit2, Trash2, ArrowDownRight, Layers } from 'lucide-react';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Alimentação: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-400' },
  Lazer: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-400' },
  Trabalho: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  Transporte: { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-400' },
  Saúde: { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-400' },
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
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-12 text-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#f3f4f6] text-[#9ca3af] flex items-center justify-center mx-auto mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-[#1f2937] mb-1">
          Nenhum lançamento no momento
        </h3>
        <p className="text-xs text-[#6b7280]">
          Adicione um novo gasto no formulário para visualizar os valores convertidos aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] text-[11px] uppercase tracking-wider text-[#6b7280] font-semibold">
              <th className="py-3 px-4">Descrição</th>
              <th className="py-3 px-4">Categoria</th>
              <th className="py-3 px-4">Forma de Pagamento</th>
              <th className="py-3 px-4">Valor Original</th>
              <th className="py-3 px-4">Moeda</th>
              <th className="py-3 px-4">Câmbio</th>
              <th className="py-3 px-4">Valor Convertido</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6] text-xs text-[#374151]">
            {expenses.map((item) => {
              const currentRate = item.exchangeRates?.[item.currency];
              const ask = currentRate ? Number(currentRate.ask) : 1;
              const originalValue = Number(item.value) || 0;
              const convertedValue = originalValue * ask;
              const isCurrentlyEdited = idToEdit === item.id;
              const tagStyle = CATEGORY_COLORS[item.tag] || {
                bg: 'bg-gray-50',
                text: 'text-gray-700',
                dot: 'bg-gray-400',
              };

              return (
                <tr
                  key={item.id}
                  className={`transition-colors hover:bg-[#f9fafb] ${
                    isCurrentlyEdited ? 'bg-[#fffbeb]' : ''
                  }`}
                >
                  {/* Descrição */}
                  <td className="py-3.5 px-4 font-medium text-[#111827]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-rose-50 text-[#ef4444] flex items-center justify-center">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      </div>
                      <span>{item.description}</span>
                    </div>
                  </td>

                  {/* Categoria */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${tagStyle.bg} ${tagStyle.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${tagStyle.dot}`} />
                      {item.tag}
                    </span>
                  </td>

                  {/* Método */}
                  <td className="py-3.5 px-4 text-[#4b5563]">
                    {item.method}
                  </td>

                  {/* Valor Original */}
                  <td className="py-3.5 px-4 font-semibold text-[#111827]">
                    {item.currency} {originalValue.toFixed(2)}
                  </td>

                  {/* Moeda */}
                  <td className="py-3.5 px-4 text-[#6b7280]">
                    <span className="font-semibold text-[#374151]">{item.currency}</span>
                  </td>

                  {/* Câmbio */}
                  <td className="py-3.5 px-4 text-[#6b7280]">
                    R$ {ask.toFixed(2)}
                  </td>

                  {/* Convertido */}
                  <td className="py-3.5 px-4 font-semibold text-[#ef4444]">
                    - R$ {convertedValue.toFixed(2)}
                  </td>

                  {/* Ações */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        id={String(item.id)}
                        data-testid="edit-btn"
                        onClick={() => handleEdit(item.id)}
                        title="Editar lançamento"
                        className="p-1.5 text-[#9ca3af] hover:text-[#f59e0b] hover:bg-[#fffbeb] rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        id={String(item.id)}
                        data-testid="delete-btn"
                        onClick={() => handleDelete(item.id)}
                        title="Excluir lançamento"
                        className="p-1.5 text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#fef2f2] rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
