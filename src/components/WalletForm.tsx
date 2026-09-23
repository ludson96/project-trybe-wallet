import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  fetchCurrencies,
  fetchSaveExpense,
  updateExpense,
  editExpense,
} from '../redux/actions';
import { Expense } from '../types/wallet';
import { Plus, Check, X, Tag, CreditCard, DollarSign, AlignLeft } from 'lucide-react';

const DEFAULT_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const WalletForm: React.FC = () => {
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const dispatch = useAppDispatch();

  const currencies = useAppSelector((state) => state.wallet.currencies);
  const editor = useAppSelector((state) => state.wallet.editor);
  const idToEdit = useAppSelector((state) => state.wallet.idToEdit);
  const expenses = useAppSelector((state) => state.wallet.expenses);

  useEffect(() => {
    dispatch(fetchCurrencies() as any);
  }, [dispatch]);

  useEffect(() => {
    if (editor && idToEdit !== null) {
      const expenseToEdit = expenses.find((item) => item.id === idToEdit);
      if (expenseToEdit) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
          value: expenseToEdit.value,
          description: expenseToEdit.description,
          currency: expenseToEdit.currency,
          method: expenseToEdit.method,
          tag: expenseToEdit.tag,
        });
      }
    }
  }, [editor, idToEdit, expenses]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.value || Number(formData.value) <= 0) return;

    if (editor && idToEdit !== null) {
      const currentExpense = expenses.find((item) => item.id === idToEdit);
      if (currentExpense) {
        const updatedItem: Expense = {
          ...currentExpense,
          ...formData,
        };
        dispatch(updateExpense(updatedItem));
      }
    } else {
      const nextId = expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 0;
      dispatch(
        fetchSaveExpense({
          id: nextId,
          ...formData,
        }) as any
      );
    }

    setFormData(DEFAULT_STATE);
  };

  const handleCancelEdit = () => {
    dispatch(editExpense(false, null));
    setFormData(DEFAULT_STATE);
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#f3f4f6]">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${editor ? 'bg-[#f59e0b]' : 'bg-[#10b981]'}`} />
          <h2 className="text-sm font-bold text-[#1f2937]">
            {editor ? 'Editar Lançamento' : 'Novo Lançamento com Câmbio'}
          </h2>
        </div>

        {editor && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#6b7280] hover:text-[#111827] px-2.5 py-1 rounded-md border border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Cancelar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Valor */}
        <div className="lg:col-span-1">
          <label htmlFor="value" className="flex items-center gap-1 text-xs font-semibold text-[#4b5563] mb-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#9ca3af]" />
            Valor
          </label>
          <input
            type="number"
            step="any"
            id="value"
            name="value"
            data-testid="value-input"
            required
            placeholder="0,00"
            value={formData.value}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm font-medium"
          />
        </div>

        {/* Descrição */}
        <div className="lg:col-span-2">
          <label htmlFor="description" className="flex items-center gap-1 text-xs font-semibold text-[#4b5563] mb-1.5">
            <AlignLeft className="w-3.5 h-3.5 text-[#9ca3af]" />
            Descrição
          </label>
          <input
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
            required
            placeholder="Ex: Almoço de negócios, Hospedagem..."
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm"
          />
        </div>

        {/* Moeda */}
        <div className="lg:col-span-1">
          <label htmlFor="currency" className="block text-xs font-semibold text-[#4b5563] mb-1.5">
            Moeda
          </label>
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm font-medium"
          >
            {currencies.map((coin) => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </select>
        </div>

        {/* Pagamento */}
        <div className="lg:col-span-1">
          <label htmlFor="method" className="flex items-center gap-1 text-xs font-semibold text-[#4b5563] mb-1.5">
            <CreditCard className="w-3.5 h-3.5 text-[#9ca3af]" />
            Pagamento
          </label>
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={formData.method}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>

        {/* Categoria */}
        <div className="lg:col-span-1">
          <label htmlFor="tag" className="flex items-center gap-1 text-xs font-semibold text-[#4b5563] mb-1.5">
            <Tag className="w-3.5 h-3.5 text-[#9ca3af]" />
            Categoria
          </label>
          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            value={formData.tag}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>

        {/* Submit */}
        <div className="col-span-full pt-2 flex justify-end">
          <button
            type="submit"
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm cursor-pointer ${
              editor
                ? 'bg-[#f59e0b] hover:bg-[#d97706]'
                : 'bg-[#10b981] hover:bg-[#059669]'
            }`}
          >
            {editor ? (
              <>
                <Check className="w-4 h-4" />
                Salvar Alterações
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Adicionar Despesa
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WalletForm;
