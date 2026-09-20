import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
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

  // Preenche o formulário se estiver no modo de edição
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Decorative top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        editor ? 'from-amber-500 to-yellow-400' : 'from-emerald-500 to-teal-400'
      }`} />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${
            editor ? 'bg-amber-500/15 text-amber-400' : 'bg-emerald-500/15 text-emerald-400'
          }`}>
            {editor ? <RotateCcw className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {editor ? 'Editar Despesa' : 'Novo Registro de Despesa'}
            </h2>
            <p className="text-xs text-slate-400">
              {editor 
                ? 'Atualize os dados e confirme para recalcular a conversão' 
                : 'Insira o gasto em qualquer moeda estrangeira suportada'}
            </p>
          </div>
        </div>

        {editor && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-all"
          >
            Cancelar Edição
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Valor */}
        <div className="lg:col-span-1">
          <label htmlFor="value" className="block text-xs font-semibold text-slate-300 mb-1.5">
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
            className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Descrição */}
        <div className="lg:col-span-2">
          <label htmlFor="description" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
            required
            placeholder="Ex: Jantar, Hotel, Uber..."
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Moeda */}
        <div className="lg:col-span-1">
          <label htmlFor="currency" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Moeda
          </label>
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={formData.currency}
            onChange={handleChange}
            className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          >
            {currencies.map((coin) => (
              <option key={coin} value={coin} className="bg-slate-900 text-slate-100">
                {coin}
              </option>
            ))}
          </select>
        </div>

        {/* Método de Pagamento */}
        <div className="lg:col-span-1">
          <label htmlFor="method" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Pagamento
          </label>
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={formData.method}
            onChange={handleChange}
            className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          >
            <option value="Dinheiro" className="bg-slate-900 text-slate-100">Dinheiro</option>
            <option value="Cartão de crédito" className="bg-slate-900 text-slate-100">Cartão de crédito</option>
            <option value="Cartão de débito" className="bg-slate-900 text-slate-100">Cartão de débito</option>
          </select>
        </div>

        {/* Categoria / Tag */}
        <div className="lg:col-span-1">
          <label htmlFor="tag" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Categoria
          </label>
          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            value={formData.tag}
            onChange={handleChange}
            className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          >
            <option value="Alimentação" className="bg-slate-900 text-slate-100">Alimentação</option>
            <option value="Lazer" className="bg-slate-900 text-slate-100">Lazer</option>
            <option value="Trabalho" className="bg-slate-900 text-slate-100">Trabalho</option>
            <option value="Transporte" className="bg-slate-900 text-slate-100">Transporte</option>
            <option value="Saúde" className="bg-slate-900 text-slate-100">Saúde</option>
          </select>
        </div>

        {/* Botão de Enviar */}
        <div className="col-span-full pt-2 flex justify-end">
          <button
            type="submit"
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md ${
              editor
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {editor ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Salvar Alterações
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
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
