import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    cat: '',
    sub: '',
    preco: '',
    desconto: 0,
    destaque: false,
    tag: '',
    cores: '',
    tamanhos: '',
    desc: '',
    foto: ''
  });
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ search: '', catFilter: '', subFilter: '' });
  const [toasts, setToasts] = useState([]);
  const [uniqueCats, setUniqueCats] = useState([]);

  const theme = {
    primary: '#B8935A',
    primaryDark: '#8E6F42',
    bg: '#f8f9fa',
    text: '#333',
    border: '#ddd',
    white: '#fff',
    success: '#28a745',
    danger: '#dc3545',
    shadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const PRODUCTS_KEY = 'galeneProducts';
  const AUTH_KEY = 'galeneAdmin';

  // Initial products generator
  const generateInitialProducts = () => {
    const productGroups = [
      { cat: 'Blusas', sub: '', nomes: ['Caja', 'Bagda', 'Julia', 'Yasmin'] },
      { cat: 'Regatas', sub: '', nomes: ['Ellen'] },
      { cat: 'Cardigans', sub: '', nomes: ['Canelado', 'Luxor'] },
      { cat: 'Conjuntos', sub: '', nomes: ['Dallas', 'Dani', 'Tiffany', 'Tiffany Moletinho', 'Chantal Calça', 'Chantal'] },
      { cat: 'Macacões', sub: '', nomes: ['Kami'] },
      { cat: 'Calças', sub: '', nomes: ['Pantalona'] },
      { cat: 'Vestidos', sub: 'Viscolaycra', nomes: ['Bella', 'Eva', 'Safira', 'Naomi', 'Mara', 'Ariel', 'Nina', 'Atenas', 'Brisa', 'Luana', 'Treviso', 'Lisa', 'Rio', 'Giane', 'Paty', 'Star', 'Elisa', 'Caja', 'Listrado', 'Modena', 'Tami', 'Camila', 'Azaleia', 'Ellen', 'Pamela', 'Mia', 'Saara', 'Rafa', 'Clara', 'Rubi', 'Milano', 'Kim', 'Nicole', 'Paris', 'Milena', 'Aurora', 'Lorena Manga Longa', 'Laila', 'Kenya', 'Marina', 'Pandora', 'Lorena Manga Curta', 'Itália', 'Allegra', 'Lola'] },
      { cat: 'Vestidos', sub: 'Lanzinha', nomes: ['Itália Lanzinha', 'Mônica Lanzinha Manga Longa', 'Monica Lanzinha'] },
      { cat: 'Vestidos', sub: 'Moletinho', nomes: ['Mônica Moletinho', 'Pandora Moletinho', 'Italia Moletinho'] }
    ];

    const initial = [];
    let idCounter = 1;
    productGroups.forEach(group => {
      const basePreco = group.cat === 'Vestidos' ? 149.90 : group.cat === 'Conjuntos' ? 179.90 : group.cat === 'Blusas' || group.cat === 'Regatas' ? 89.90 : 129.90;
      group.nomes.forEach(nome => {
        const preco = (basePreco + (Math.floor(Math.random() * 401) - 200) / 100).toFixed(2);
        const desconto = Math.floor(Math.random() * 5) * 5; // 0,5,10,15,20
        const destaque = Math.random() > 0.8;
        const tag = desconto > 10 ? 'Promo' : Math.random() > 0.7 ? 'Novo' : '';
        const cores = ['Preto', 'Bege', 'Branco', 'Azul', 'Caramelo'].sort(() => Math.random() - 0.5).slice(0, 4);
        const tamanhos = ['PP', 'P', 'M', 'G', 'GG'];
        const desc = `${group.cat} ${nome} - peça confortável e estilosa, perfeita para o dia a dia ou ocasiões especiais. Qualidade GALENE.`;
        const fotoText = nome.replace(/\s+/g, '+');
        const foto = `https://placehold.co/400x500/b8935a/ffffff?text=${fotoText}&font=roboto`;
        initial.push({
          id: idCounter++,
          nome,
          cat: group.cat,
          sub: group.sub,
          preco: parseFloat(preco),
          desconto,
          destaque,
          tag,
          cores,
          tamanhos,
          desc,
          foto
        });
      });
    });
    return initial;
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth) setLoggedIn(true);

    const savedProducts = localStorage.getItem(PRODUCTS_KEY);
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const initial = generateInitialProducts();
      setProducts(initial);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    setUniqueCats([...new Set(products.map(p => p.cat))].sort());
  }, [products]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => setToasts([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = (msg, type = 'success') => {
    setToasts(prev => [...prev.slice(-4), { msg, type }]);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = e.target.user.value;
    const pass = e.target.pass.value;
    if (user === 'admin' && pass === 'galene2024') {
      setLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      addToast('Login realizado com sucesso!');
    } else {
      addToast('Credenciais inválidas!', 'error');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
    addToast('Logout realizado.');
  };

  const openAdd = () => {
    setFormData({
      id: '', nome: '', cat: '', sub: '', preco: '', desconto: 0, destaque: false, tag: '',
      cores: 'Preto, Bege, Branco', tamanhos: 'P, M, G, GG', desc: '', foto: ''
    });
    setShowModal(true);
  };

  const openEdit = (product) => {
    setFormData({
      ...product,
      cores: product.cores.join(', '),
      tamanhos: product.tamanhos.join(', ')
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Confirma exclusão do produto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      addToast('Produto excluído!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processed = {
      ...formData,
      preco: parseFloat(formData.preco) || 0,
      desconto: parseFloat(formData.desconto) || 0,
      destaque: !!formData.destaque,
      cores: formData.cores.split(',').map(c => c.trim()).filter(Boolean),
      tamanhos: formData.tamanhos.split(',').map(t => t.trim()).filter(Boolean)
    };

    const err = validateForm(processed);
    if (err) {
      addToast(err, 'error');
      return;
    }

    if (processed.id) {
      setProducts(prev => prev.map(p => p.id === processed.id ? processed : p));
      addToast('Produto atualizado com sucesso!');
    } else {
      const newProduct = { ...processed, id: Date.now().toString() };
      setProducts(prev => [...prev, newProduct]);
      addToast('Produto adicionado com sucesso!');
    }
    setShowModal(false);
    setFormData({ id: '', nome: '', cat: '', sub: '', preco: '', desconto: 0, destaque: false, tag: '', cores: '', tamanhos: '', desc: '', foto: '' });
  };

  const validateForm = (data) => {
    if (!data.nome.trim()) return 'Nome é obrigatório.';
    if (!data.cat.trim()) return 'Categoria é obrigatória.';
    if (data.preco <= 0 || isNaN(data.preco)) return 'Preço deve ser maior que 0.';
    if (data.desconto < 0 || isNaN(data.desconto)) return 'Desconto inválido.';
    if (data.cores.length === 0) return 'Informe pelo menos uma cor.';
    if (data.tamanhos.length === 0) return 'Informe pelo menos um tamanho.';
    return null;
  };

  const filteredProducts = products.filter(p =>
    p.nome.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.catFilter === '' || p.cat === filters.catFilter) &&
    (filters.subFilter === '' || p.sub.toLowerCase().includes(filters.subFilter.toLowerCase()))
  );

  const toastStyle = (type) => ({
    backgroundColor: type === 'error' ? theme.danger : theme.success,
    color: theme.white,
    padding: '12px 20px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: theme.shadow,
    maxWidth: '400px'
  });

  const btnStyle = (bg = theme.primary, color = theme.white) => ({
    backgroundColor: bg,
    color,
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '5px',
    boxShadow: theme.shadow
  });

  const inputStyle = {
    padding: '10px',
    border: `1px solid ${theme.border}`,
    borderRadius: '5px',
    margin: '5px 0',
    width: '100%',
    boxSizing: 'border-box'
  };

  const pageStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: theme.bg,
    minHeight: '100vh'
  };

  if (!loggedIn) {
    return (
      <div style={pageStyle}>
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', backgroundColor: theme.white, borderRadius: '10px', boxShadow: theme.shadow }}>
          <h2 style={{ color: theme.primary, textAlign: 'center' }}>Admin GALENE</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Usuário:</label>
              <input name="user" type="text" style={inputStyle} required />
            </div>
            <div>
              <label>Senha:</label>
              <input name="pass" type="password" style={inputStyle} required />
            </div>
            <button type="submit" style={btnStyle()}>Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Toasts */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        {toasts.map((toast, i) => (
          <div key={i} style={toastStyle(toast.type)}>
            {toast.msg}
          </div>
        ))}
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: `2px solid ${theme.primary}` }}>
        <h1 style={{ color: theme.primary, margin: 0, fontSize: '28px' }}>Admin GALENE - Catálogo Completo</h1>
        <button onClick={handleLogout} style={btnStyle(theme.danger, theme.white)}>Logout</button>
      </header>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          placeholder="Buscar por nome..."
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })}
          style={{ ...inputStyle, width: '250px', padding: '12px' }}
        />
        <select
          value={filters.catFilter}
          onChange={e => setFilters({ ...filters, catFilter: e.target.value })}
          style={{ ...inputStyle, width: '200px', padding: '12px' }}
        >
          <option value="">Todas Categorias</option>
          {uniqueCats.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          placeholder="Filtro subcategoria..."
          value={filters.subFilter}
          onChange={e => setFilters({ ...filters, subFilter: e.target.value })}
          style={{ ...inputStyle, width: '200px', padding: '12px' }}
        />
        <button onClick={openAdd} style={btnStyle()}>+ Adicionar Produto</button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: theme.white, boxShadow: theme.shadow, borderRadius: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: theme.primary, color: theme.white }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Nome</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Cat / Sub</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Preço</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Desconto</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Destaque</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Foto</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: '15px' }}>{product.nome}</td>
                <td style={{ padding: '15px' }}>
                  {product.cat}<br/>
                  <small>{product.sub}</small>
                </td>
                <td style={{ padding: '15px' }}>R$ {product.preco.toFixed(2)}</td>
                <td style={{ padding: '15px' }}>{product.desconto > 0 ? `${product.desconto}%` : '-'}</td>
                <td style={{ padding: '15px' }}>{product.destaque ? 'Sim' : 'Não'}</td>
                <td style={{ padding: '15px' }}>
                  <img src={product.foto} alt={product.nome} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button onClick={() => openEdit(product)} style={btnStyle(theme.primaryDark)}>Editar</button>
                  <button onClick={() => handleDelete(product.id)} style={btnStyle(theme.danger, theme.white)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ textAlign: 'center', marginTop: '20px', color: theme.text }}>
        Total: {filteredProducts.length} / {products.length} produtos
      </p>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: theme.white,
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: theme.shadow,
            width: '90%'
          }}>
            <h2 style={{ color: theme.primary, marginTop: 0 }}>
              {formData.id ? 'Editar' : 'Adicionar'} Produto
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label>Nome:</label>
                  <input value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} style={inputStyle} required />
                </div>
                <div>
                  <label>Categoria:</label>
                  <input value={formData.cat} onChange={e => setFormData({ ...formData, cat: e.target.value })} style={inputStyle} required />
                </div>
                <div>
                  <label>Subcategoria:</label>
                  <input value={formData.sub} onChange={e => setFormData({ ...formData, sub: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label>Preço (R$):</label>
                  <input type="number" step="0.01" value={formData.preco} onChange={e => setFormData({ ...formData, preco: e.target.value })} style={inputStyle} required />
                </div>
                <div>
                  <label>Desconto (%):</label>
                  <input type="number" min="0" step="1" value={formData.desconto} onChange={e => setFormData({ ...formData, desconto: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label>Destaque:</label>
                  <input type="checkbox" checked={formData.destaque} onChange={e => setFormData({ ...formData, destaque: e.target.checked })} style={{ marginTop: '10px' }} />
                </div>
                <div>
                  <label>Tag:</label>
                  <input value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div>
                <label>Cores (separadas por vírgula):</label>
                <input value={formData.cores} onChange={e => setFormData({ ...formData, cores: e.target.value })} style={{ ...inputStyle, height: '50px' }} placeholder="Preto, Bege, Branco" required />
              </div>
              <div>
                <label>Tamanhos (separados por vírgula):</label>
                <input value={formData.tamanhos} onChange={e => setFormData({ ...formData, tamanhos: e.target.value })} style={{ ...inputStyle, height: '50px' }} placeholder="P, M, G, GG" required />
              </div>
              <div>
                <label>Descrição:</label>
                <textarea value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} style={{ ...inputStyle, height: '80px' }} />
              </div>
              <div>
                <label>Foto URL:</label>
                <input value={formData.foto} onChange={e => setFormData({ ...formData, foto: e.target.value })} style={inputStyle} placeholder="https://..." />
              </div>
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={btnStyle(theme.text, theme.primaryDark, '#f0f0f0')}>Cancelar</button>
                <button type="submit" style={btnStyle()}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
