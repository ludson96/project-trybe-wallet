import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  fetchCurrencies,
  fetchSaveExpense,
  updateExpense,
  editExpense,
} from '../redux/actions';
import { Expense } from '../types/wallet';

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
    <div className="bg-[#22262e] border border-[rgba(255,255,255,0.075)] p-6 sm:p-8">
      <header className="flex items-center justify-between border-b border-[rgba(255,255,255,0.075)] pb-4 mb-6">
        <div>
          <h2 className="text-base uppercase font-bold tracking-widest text-white m-0">
            {editor ? 'Editar Despesa' : 'Novo Registro'}
          </h2>
          <p className="text-xs text-[#6a707c] mt-0.5">
            {editor ? 'Modifique os valores e confirme a atualização' : 'Cadastre uma despesa com câmbio internacional'}
          </p>
        </div>

        {editor && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-xs uppercase font-bold tracking-wider text-[#9fa4af] hover:text-white px-3 py-1.5 border border-[rgba(255,255,255,0.15)] rounded-sm"
          >
            Cancelar
          </button>
        )}
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Valor */}
        <div className="lg:col-span-1 space-y-1">
          <label htmlFor="value" className="block text-xs uppercase font-semibold tracking-wider text-[#a0a5ad]">
            Valor
          </label>
          <input
            type="number"
            step="any"
            id="value"
            name="value"
            data-testid="value-input"
            required
            placeholder="0.00"
            value={formData.value}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm"
          />
        </div>

        {/* Descrição */}
        <div className="lg:col-span-2 space-y-1">
          <label htmlFor="description" className="block text-xs uppercase font-semibold tracking-wider text-[#a0a5ad]">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
            required
            placeholder="Ex: Hospedagem, Refeição..."
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm"
          />
        </div>

        {/* Moeda */}
        <div className="lg:col-span-1 space-y-1">
          <label htmlFor="currency" className="block text-xs uppercase font-semibold tracking-wider text-[#a0a5ad]">
            Moeda
          </label>
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm"
          >
            {currencies.map((coin) => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </select>
        </div>

        {/* Método */}
        <div className="lg:col-span-1 space-y-1">
          <label htmlFor="method" className="block text-xs uppercase font-semibold tracking-wider text-[#a0a5ad]">
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
        <div className="lg:col-span-1 space-y-1">
          <label htmlFor="tag" className="block text-xs uppercase font-semibold tracking-wider text-[#a0a5ad]">
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

        {/* Submit button */}
        <div className="col-span-full pt-3 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-sm text-xs uppercase font-bold tracking-widest bg-[#47c9e5] hover:bg-[#5ed0ea] text-[#1b1e24] transition-colors cursor-pointer"
          >
            {editor ? 'Salvar Edição' : 'Adicionar Despesa'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WalletForm;
