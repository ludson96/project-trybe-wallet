# 💳 FinanTrack | Carteira de Câmbio & Controle de Gastos

Uma aplicação moderna de gerenciamento financeiro pessoal com suporte a **múltiplas moedas** e **cotações em tempo real** consumidas via AwesomeAPI. O projeto foi completamente modernizado para um padrão sênior de portfólio.

---

## 🚀 Tecnologias e Ferramentas

- **React 18** (Functional Components + Hooks)
- **TypeScript** (Tipagem estrita ponta a ponta)
- **Tailwind CSS** (Design responsivo, dark mode elegante com efeitos glassmorphism)
- **Redux Toolkit & React-Redux** (Gerenciamento de estado global)
- **Axios** (Cliente HTTP assíncrono para consumo de API)
- **Vite** (Build tool e dev server de alta performance)
- **Vitest & React Testing Library** (Suíte moderna de testes unitários e de integração)
- **Lucide React** (Ícones modernos)

---

## ✨ Funcionalidades

- **Autenticação Simples**: Validação reativa de e-mail e senha com feedback visual.
- **Dashboard Financeiro**:
  - Cards de métricas rápidas (*Total Convertido*, *Quantidade de Transações*, *Maior Despesa*, *Moedas Estrangeiras Utilizadas*).
- **CRUD Completo de Despesas**:
  - Adição, visualização, edição em linha e exclusão de gastos.
- **Conversão de Câmbio em Tempo Real**:
  - Cotações atualizadas dinamicamente via Axios direto da AwesomeAPI.
  - Cálculo automático e exibição simultânea do valor na moeda original e em BRL.
- **Persistência Local**:
  - Dados salvos em `localStorage` para manter suas despesas salvas mesmo após atualizar a página.
- **Identidade Visual Personalizada**:
  - Favicon SVG customizado em formato de carteira com moeda dourada e tipografia moderna (*Plus Jakarta Sans*).

---

## 🛠️ Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:Ludson96/finantrack-wallet.git
   cd finantrack-wallet
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:5173`

4. **Execute os testes automatizados com Vitest:**
   ```bash
   npm test
   # Ou para modo watch iterativo:
   npm run test:watch
   ```

5. **Gere a build de produção:**
   ```bash
   npm run build
   ```

---

## 🧪 Testes Automatizados

A aplicação conta com testes configurados no **Vitest**:
- `Login.test.tsx`: Validação do formulário de autenticação e estados do botão de submit.
- `Wallet.test.tsx`: Teste de integração do Dashboard, garantindo renderização de métricas e consumo da API mockada.
- `WalletReducer.test.ts`: Testes unitários do fluxo de estado do Redux (criação, edição e exclusão).

---

Feito com 💚 para enriquecer o portfólio frontend.
