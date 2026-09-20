import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteExpense, editExpense } from '../redux/actions';

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
      <div className="bg-[#22262e] border border-[rgba(255,255,255,0.075)] p-12 text-center">
        <h3 className="text-sm uppercase font-bold tracking-widest text-[#a0a5ad] mb-1">
          Nenhuma despesa lançada
        </h3>
        <p className="text-xs text-[#6a707c]">
          Preencha o formulário acima para registrar sua primeira transação com câmbio.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#22262e] border border-[rgba(255,255,255,0.075)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.1)] bg-[#1f232a] text-[11px] uppercase tracking-widest text-[#8b919d] font-bold">
              <th className="py-3 px-4">Descrição</th>
              <th className="py-3 px-4">Categoria</th>
              <th className="py-3 px-4">Pagamento</th>
              <th className="py-3 px-4">Valor Original</th>
              <th className="py-3 px-4">Moeda</th>
              <th className="py-3 px-4">Câmbio</th>
              <th className="py-3 px-4">Convertido (BRL)</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.05)] text-xs text-[#9fa4af]">
            {expenses.map((item) => {
              const currentRate = item.exchangeRates?.[item.currency];
              const ask = currentRate ? Number(currentRate.ask) : 1;
              const originalValue = Number(item.value) || 0;
              const convertedValue = originalValue * ask;
              const isCurrentlyEdited = idToEdit === item.id;

              return (
                <tr
                  key={item.id}
                  className={`transition-colors hover:bg-[#282d36] ${
                    isCurrentlyEdited ? 'bg-[#2d333e]' : ''
                  }`}
                >
                  {/* Descrição */}
                  <td className="py-3 px-4 font-semibold text-white">
                    {item.description}
                  </td>

                  {/* Categoria */}
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider text-[#a0a5ad] border border-[rgba(255,255,255,0.1)] rounded-sm">
                      {item.tag}
                    </span>
                  </td>

                  {/* Método */}
                  <td className="py-3 px-4 text-[#a0a5ad]">
                    {item.method}
                  </td>

                  {/* Valor Original */}
                  <td className="py-3 px-4 font-mono font-medium text-white">
                    {originalValue.toFixed(2)}
                  </td>

                  {/* Moeda */}
                  <td className="py-3 px-4 text-[#a0a5ad]">
                    <span className="font-bold text-white">{item.currency}</span>
                  </td>

                  {/* Câmbio */}
                  <td className="py-3 px-4 font-mono text-[#a0a5ad]">
                    R$ {ask.toFixed(2)}
                  </td>

                  {/* Convertido */}
                  <td className="py-3 px-4 font-mono font-bold text-[#47c9e5]">
                    R$ {convertedValue.toFixed(2)}
                  </td>

                  {/* Ações */}
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        id={String(item.id)}
                        data-testid="edit-btn"
                        onClick={() => handleEdit(item.id)}
                        className="text-[11px] uppercase font-bold tracking-wider text-[#9fa4af] hover:text-white px-2 py-1 border border-[rgba(255,255,255,0.1)] rounded-sm hover:border-[rgba(255,255,255,0.3)] transition-colors cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        id={String(item.id)}
                        data-testid="delete-btn"
                        onClick={() => handleDelete(item.id)}
                        className="text-[11px] uppercase font-bold tracking-wider text-[#e74c3c] hover:text-[#ff6b6b] px-2 py-1 border border-[#e74c3c]/30 rounded-sm hover:border-[#e74c3c]/60 transition-colors cursor-pointer"
                      >
                        Excluir
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
