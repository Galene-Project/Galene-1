import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const initialFormData = {
    nome: '',
    cat: '',
    sub: 'Casual',
    preco: '',
    desconto: '',
    destaque: false,
    tag: '',
    cores: '',
    tamanhos: '',
    desc: '',
    foto: ''
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const saveProducts = (prods) => {
    localStorage.setItem('galeneProducts', JSON.stringify(prods));
    setProducts(prods);
  };

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('galeneProducts');
    if (!savedProducts) {
      const productNames = [
        'Vestido Bella', 'Vestido Eva', 'Vestido Safira', 'Vestido Naomi', 'Vestido Mara',
        'Vestido Ariel', 'Vestido Nina', 'Vestido Lola', 'Conjunto Dallas', 'Conjunto Dani',
        'Macacão Kami', 'Blusa Caja', 'Regata Ellen', 'Cardigan Canelado', 'Calça Pantalona',
        'Vestido Atenas', 'Vestido Brisa', 'Vestido Luana', 'Vestido Treviso', 'Vestido Lisa'
      ];
      const initialProducts = productNames.map((nome, i) => {
        const id = i + 1;
        let cat = 'Vestidos';
        if (nome.includes('Conjunto')) cat = 'Conjuntos';
        else if (nome.includes('Macacão')) cat = 'Macacões';
        else if (nome.includes('Blusa')) cat = 'Blusas';
        else if (nome.includes('Regata')) cat = 'Regatas';
        else if (nome.includes('Cardigan')) cat = 'Cardigans';
        else if (nome.includes('Calça')) cat = 'Calças';
        const fotoText = nome.replace(/ /g, '+');
        return {
          id,
          nome,
          cat,
          sub: 'Casual',
          preco: 150 + (id * 2.5),
          desconto: id % 5 === 0 ? 20 : 0,
          destaque: id % 2 === 0,
          tag: id % 3 === 0 ? 'Novo' : '',
          cores: ['Preto', 'Branco', id > 10 ? 'Azul' : 'Vermelho'],
          tamanhos: ['P', 'M', 'G', 'GG'],
          desc: `Descrição do ${nome}. Produto de alta qualidade.`,
          foto: `https://via.placeholder.com/300x400/FF69B4/FFFFFF?text=${fotoText}`
        };
      });
      localStorage.setItem('galeneProducts', JSON.stringify(initialProducts));
      setProducts(initialProducts);
    } else {
      setProducts(JSON.parse(savedProducts));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Credenciais inválidas! Use: admin / 1234');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prodData = {
      nome: formData.nome,
      cat: formData.cat,
      sub: formData.sub,
      preco: parseFloat(formData.preco) || 0,
      desconto: parseInt(formData.desconto) || 0,
      destaque: formData.destaque === true,
      tag: formData.tag,
      cores: formData.cores ? formData.cores.split(',').map(c => c.trim()).filter(Boolean) : [],
      tamanhos: formData.tamanhos ? formData.tamanhos.split(',').map(t => t.trim()).filter(Boolean) : [],
      desc: formData.desc,
      foto: formData.foto
    };

    let updatedProducts;
    if (editingProduct) {
      prodData.id = editingProduct.id;
      updatedProducts = products.map(p => p.id === editingProduct.id ? prodData : p);
    } else {
      prodData.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      updatedProducts = [...products, prodData];
    }
    saveProducts(updatedProducts);
    setFormData(initialFormData);
    setEditingProduct(null);
  };

  const editProduct = (prod) => {
    setEditingProduct(prod);
    setFormData({
      nome: prod.nome,
      cat: prod.cat,
      sub: prod.sub,
      preco: prod.preco,
      desconto: prod.desconto,
      destaque: prod.destaque,
      tag: prod.tag,
      cores: prod.cores.join(', '),
      tamanhos: prod.tamanhos.join(', '),
      desc: prod.desc,
      foto: prod.foto
    });
  };

  const deleteProduct = (id) => {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      const updated = products.filter(p => p.id !== id);
      saveProducts(updated);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <h2>Login Admin</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            style={{ padding: '10px', fontSize: '16px' }}
            required
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            style={{ padding: '10px', fontSize: '16px' }}
            required
          />
          <button type="submit" style={{ padding: '10px', fontSize: '16px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Admin - Produtos GALENE</h1>
        <button
          onClick={() => setIsAuthenticated(false)}
          style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Sair
        </button>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>{editingProduct ? `Editar ${editingProduct.nome}` : 'Adicionar Novo Produto'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          <input name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Nome" style={{ padding: '8px' }} required />
          <input name="cat" value={formData.cat} onChange={handleInputChange} placeholder="Categoria" style={{ padding: '8px' }} required />
          <input name="sub" value={formData.sub} onChange={handleInputChange} placeholder="Subcategoria" style={{ padding: '8px' }} />
          <input name="preco" type="number" step="0.01" value={formData.preco} onChange={handleInputChange} placeholder="Preço" style={{ padding: '8px' }} />
          <input name="desconto" type="number" value={formData.desconto} onChange={handleInputChange} placeholder="Desconto %" style={{ padding: '8px' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input name="destaque" type="checkbox" checked={formData.destaque} onChange={handleInputChange} />
            Destaque
          </label>
          <input name="tag" value={formData.tag} onChange={handleInputChange} placeholder="Tag" style={{ padding: '8px' }} />
          <input name="cores" value={formData.cores} onChange={handleInputChange} placeholder="Cores (Preto, Branco)" style={{ padding: '8px' }} />
          <input name="tamanhos" value={formData.tamanhos} onChange={handleInputChange} placeholder="Tamanhos (P, M, G)" style={{ padding: '8px' }} />
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            placeholder="Descrição"
            style={{ padding: '8px', gridColumn: '1 / -1', minHeight: '60px' }}
          />
          <input name="foto" value={formData.foto} onChange={handleInputChange} placeholder="URL da foto" style={{ padding: '8px', gridColumn: '1 / -1' }} />
          <button
            type="submit"
            style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', gridColumn: '1 / -1' }}
          >
            {editingProduct ? 'Atualizar' : 'Adicionar Produto'}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setFormData(initialFormData);
              }}
              style={{ padding: '10px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', gridColumn: '1 / -1' }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <h2>Lista de Produtos ({products.length})</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Nome</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Cat</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Preço</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Desconto</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Destaque</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Foto</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{prod.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{prod.nome}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{prod.cat}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>R$ {prod.preco.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{prod.desconto}%</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{prod.destaque ? 'Sim' : 'Não'}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                <img src={prod.foto} alt={prod.nome} style={{ width: '60px', height: 'auto', borderRadius: '4px' }} />
              </td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                <button
                  onClick={() => editProduct(prod)}
                  style={{ margin: '2px', padding: '6px 12px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProduct(prod.id)}
                  style={{ margin: '2px', padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
