import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './ProductList';
import SupplierList from './SupplierList';
// import ProductForm from './ProductForm';
// import SupplierForm from './SupplierForm';

function App() {
  return (
    <Router>
      <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
        <nav>
          <button>
            <Link to="/produtos">Produtos</Link>
          </button>
          <button>
            <Link to="/fornecedores">Fornecedores</Link>
          </button>
        </nav>

        <Routes>
          {/* Rota padrão, exibida quando o caminho for '/' */}
          <Route path="/" element={<div>Bem-vindo ao sistema!</div>} />
          <Route path="/produtos" element={<ProductList />} />
          <Route path="/fornecedores" element={<SupplierList />} />
          {/* <Route path="/produtos/form" element={<ProductForm />} />
          <Route path="/fornecedores/form" element={<SupplierForm />} /> */}

          {/* Rota de fallback para quando o caminho da paina não corresponde */}
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
