import { useState, useEffect } from 'react';

export default function Admin() {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    cat: '',
    cor: '',
    padrao: '',
    preco: 0,
    estoque: 0,
    destaque: false
  });

  const CATS = ['Camisetas', 'Calças', 'Vestidos', 'Casacos', 'Acessórios', 'Sapatos'];
  const CORES = ['Preto', 'Branco', 'Azul', 'Vermelho', 'Verde', 'Amarelo', 'Rosa'];
  const PADROES = ['Liso', 'Estampado', 'Listrado', 'Floral', 'Geométrico', 'Destaque'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('products');
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    }
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    if (typeof window !== 'undefined') {
      localStorage.setItem('products', JSON.stringify(newProducts));
    }
  };

  const handleAuth = () => {
    if (password === 'admin123') {
      setIsAuth(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setPassword('');
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.cat || !form.cor || !form.padrao || form.preco <= 0 || form.estoque < 0) {
      alert('Preencha todos os campos obrigatórios corretamente! Preço deve ser positivo e estoque não negativo.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let newProducts;
    if (editingId) {
      newProducts = products.map((p) =>
        p.id === editingId ? { ...form, id: editingId } : p
      );
    } else {
      const id = Date.now().toString();
      newProducts = [...products, { ...form, id }];
    }

    saveProducts(newProducts);
    setForm({ name: '', cat: '', cor: '', padrao: '', preco: 0, estoque: 0, destaque: false });
    setEditingId(null);
  };

  const editProduct = (product) => {
    setForm({ ...product });
    setEditingId(product.id);
  };

  const deleteProduct = (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      saveProducts(products.filter((p) => p.id !== id));
    }
  };

  const cancelEdit = () => {
    setForm({ name: '', cat: '', cor: '', padrao: '', preco: 0, estoque: 0, destaque: false });
    setEditingId(null);
  };

  if (!isAuth) {
    const authStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '20px',
      fontFamily: 'sans-serif',
    };

    const inputStyle = {
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      width: '300px',
      maxWidth: '90vw',
      marginBottom: '20px',
    };

    const buttonStyle = {
      padding: '12px 24px',
      backgroundColor: '#0070f3',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
    };

    return (
      <div style={authStyle}>
        <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Área Admin</h1>
        <input
          type="password"
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAuth} style={buttonStyle}>
          Entrar
        </button>
      </div>
    );
  }

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'sans-serif',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '40px',
    padding: '25px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
  };

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
  };

  const listContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
  };

  const productCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  };

  const productButtonsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    flex: 1,
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    flex: 1,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Gerenciar Produtos</h1>
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Sair
        </button>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          placeholder="Nome do Produto"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
          required
        />
        <select
          value={form.cat}
          onChange={(e) => setForm({ ...form, cat: e.target.value })}
          style={selectStyle}
          required
        >
          <option value="">Selecione Categoria</option>
          {CATS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={form.cor}
          onChange={(e) => setForm({ ...form, cor: e.target.value })}
          style={selectStyle}
          required
        >
          <option value="">Selecione Cor</option>
          {CORES.map((cor) => (
            <option key={cor} value={cor}>
              {cor}
            </option>
          ))}
        </select>
        <select
          value={form.padrao}
          onChange={(e) => setForm({ ...form, padrao: e.target.value })}
          style={selectStyle}
          required
        >
          <option value="">Selecione Padrão</option>
          {PADROES.map((padrao) => (
            <option key={padrao} value={padrao}>
              {padrao}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Preço (R$)"
          value={form.preco}
          onChange={(e) => setForm({ ...form, preco: parseFloat(e.target.value) || 0 })}
          style={inputStyle}
          min="0"
          step="0.01"
          required
        />
        <input
          type="number"
          placeholder="Estoque"
          value={form.estoque}
          onChange={(e) => setForm({ ...form, estoque: parseInt(e.target.value) || 0 })}
          style={inputStyle}
          min="0"
          required
        />
        <label style={checkboxStyle}>
          <input
            type="checkbox"
            checked={form.destaque}
            onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
          />
          Produto em Destaque
        </label>
        <div>
          <button type="submit" style={buttonStyle}>
            {editingId ? 'Atualizar Produto' : 'Adicionar Produto'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} style={cancelButtonStyle}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 style={{ marginBottom: '20px' }}>Lista de Produtos ({products.length})</h2>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            Nenhum produto cadastrado.
          </p>
        ) : (
          <div style={listContainerStyle}>
            {products.map((product) => (
              <div key={product.id} style={productCardStyle}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{product.name}</h3>
                <p><strong>Categoria:</strong> {product.cat}</p>
                <p><strong>Cor:</strong> {product.cor}</p>
                <p><strong>Padrão:</strong> {product.padrao}</p>
                <p><strong>Preço:</strong> R$ {product.preco.toFixed(2)}</p>
                <p><strong>Estoque:</strong> {product.estoque}</p>
                <p><strong>Destaque:</strong> {product.destaque ? 'Sim' : 'Não'}</p>
                <div style={productButtonsStyle}>
                  <button
                    onClick={() => editProduct(product)}
                    style={editButtonStyle}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={deleteButtonStyle}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
