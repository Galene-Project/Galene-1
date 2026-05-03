import React, { useState, useEffect } from 'react';

const createProduct = (id, nome, cat, sub = '') => ({
  id,
  nome,
  cat,
  sub,
  preco: 89.90 + Math.floor(id / 5) * 5,
  destaque: id % 5 === 0,
  tag: id % 7 === 0 ? 'Destaque' : '',
  cores: ['Preto', 'Branco', 'Azul', id % 3 === 0 ? 'Vermelho' : 'Rosa'],
  tamanhos: ['P', 'M', 'G', 'GG'],
  desc: `${nome} é uma peça elegante e confortável da coleção Galene. Ideal para o dia a dia.`,
  foto: `https://via.placeholder.com/250x350/6c5ce7/ffffff?text=${nome.replace(/\s+/g, '+')}`
});

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const defaultFormData = {
    id: '',
    nome: '',
    cat: '',
    sub: '',
    preco: '',
    destaque: false,
    tag: '',
    cores: [],
    tamanhos: [],
    desc: '',
    foto: ''
  };
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    let stored = localStorage.getItem('galeneProducts');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      const initialProducts = [];
      let currentId = 1;

      // Blusas
      ['Caja', 'Bagda', 'Julia', 'Yasmin'].forEach(nome => {
        initialProducts.push(createProduct(currentId++, nome, 'Blusas'));
      });

      // Regatas
      ['Ellen'].forEach(nome => {
        initialProducts.push(createProduct(currentId++, nome, 'Regatas'));
      });

      // Cardigans
      ['Canelado', 'Luxor'].forEach(nome => {
        initialProducts.push(createProduct(currentId++, nome, 'Cardigans'));
      });

      // Conjuntos
      ['Dallas', 'Dani', 'Tiffany', 'Tiffany Moletinho', 'Chantal Calça', 'Chantal'].forEach(nome => {
        initialProducts.push(createProduct(currentId++, nome, 'Conjuntos'));
      });

      // Macacões
      ['Kami'].forEach(nome => {
        initialProducts.push(createProduct(currentId++, nome, 'Macacões'));
      });

      // Calças
      ['Pantalona'].forEach(nome => {
        initialProducts.push(createProduct(currentId++, nome, 'Calças'));
      });

      // Vestidos Viscolaycra (33 to total 48)
      ['Bella', 'Eva', 'Safira', 'Naomi', 'Mara', 'Ariel', 'Nina', 'Atenas', 'Brisa', 'Luana', 'Treviso', 'Lisa', 'Rio', 'Giane', 'Paty', 'Star', 'Elisa', 'Caja', 'Listrado', 'Modena', 'Tami', 'Camila', 'Azaleia', 'Ellen', 'Pamela', 'Mia', 'Saara', 'Rafa', 'Clara', 'Rubi', 'Milano', 'Kim', 'Nicole'].forEach(nome => {
        initialProducts.push(createProduct(currentId++, nome, 'Vestidos', 'Viscolaycra'));
      });

      setProducts(initialProducts);
      localStorage.setItem('galeneProducts', JSON.stringify(initialProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('galeneProducts', JSON.stringify(products));
    }
  }, [products]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername === 'admin' && loginPassword === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciais inválidas!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginUsername('');
    setLoginPassword('');
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingProduct(null);
    setFormData(defaultFormData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (['cores', 'tamanhos'].includes(name)) {
      const arr = value.split(',').map(s => s.trim()).filter(s => s);
      setFormData(prev => ({ ...prev, [name]: arr }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...formData, id: newId, preco: parseFloat(formData.preco) || 0 };
    setProducts([...products, newProduct]);
    setShowForm(false);
    setFormData(defaultFormData);
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = { ...formData, id: editingProduct.id, preco: parseFloat(formData.preco) || 0 };
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setShowForm(false);
    setFormData(defaultFormData);
  };

  const deleteProduct = (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setShowForm(true);
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100vw',
      backgroundColor: '#fff'
    },
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      padding: '20px'
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '300px'
    },
    input: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      boxSizing: 'border-box'
    },
    btn: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '10px'
    },
    logoutBtn: {
      padding: '10px 20px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '20px'
    },
    form: {
      display: 'grid',
      gap: '15px',
      marginBottom: '30px',
      padding: '25px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      gridTemplateColumns: '1fr 1fr'
    },
    formFull: {
      gridColumn: '1 / -1'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 'bold'
    },
    tableContainer: {
      overflowX: 'auto',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '1200px'
    },
    th: {
      backgroundColor: '#f8f9fa',
      padding: '15px 12px',
      textAlign: 'left',
      borderBottom: '2px solid #dee2e6',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      fontWeight: 'bold',
      whiteSpace: 'nowrap'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #dee2e6',
      verticalAlign: 'top'
    },
    img: {
      width: '60px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: '4px',
      border: '1px solid #eee'
    },
    editBtn: {
      padding: '6px 12px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '14px',
      marginRight: '5px'
    },
    delBtn: {
      padding: '6px 12px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '14px'
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.loginContainer}>
          <h1 style={{ marginBottom: '30px', color: '#333' }}>Admin Login - Galene</h1>
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <input
              type="text"
              placeholder="Usuário (admin)"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Senha (1234)"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.btn}>Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  const coresValue = Array.isArray(formData.cores) ? formData.cores.join(', ') : '';
  const tamanhosValue = Array.isArray(formData.tamanhos) ? formData.tamanhos.join(', ') : '';

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Admin - Gerenciar Produtos Galene ({products.length} produtos)</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
      <button onClick={toggleForm} style={styles.btn}>
        {showForm ? 'Cancelar' : 'Adicionar Novo Produto'}
      </button>
      {showForm && (
        <form
          onSubmit={editingProduct ? updateProduct : addProduct}
          style={styles.form}
        >
          <input
            name="nome"
            placeholder="Nome do Produto"
            value={formData.nome}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            name="cat"
            placeholder="Categoria"
            value={formData.cat}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            name="sub"
            placeholder="Subcategoria"
            value={formData.sub}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            name="preco"
            type="number"
            step="0.01"
            placeholder="Preço (R$)"
            value={formData.preco}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <div style={styles.label}>
            <label>Destaque:</label>
            <input
              name="destaque"
              type="checkbox"
              checked={formData.destaque}
              onChange={handleInputChange}
            />
          </div>
          <input
            name="tag"
            placeholder="Tag (ex: Novo)"
            value={formData.tag}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            name="cores"
            placeholder="Cores (separadas por vírgula)"
            value={coresValue}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            name="tamanhos"
            placeholder="Tamanhos (P,M,G,GG)"
            value={tamanhosValue}
            onChange={handleInputChange}
            style={styles.input}
          />
          <textarea
            name="desc"
            placeholder="Descrição"
            value={formData.desc}
            onChange={handleInputChange}
            style={{ ...styles.input, minHeight: '80px', gridColumn: '1 / -1' }}
          />
          <input
            name="foto"
            placeholder="URL da Foto"
            value={formData.foto}
            onChange={handleInputChange}
            style={{ ...styles.input, gridColumn: '1 / -1' }}
          />
          <button type="submit" style={{ ...styles.btn, gridColumn: '1 / -1' }}>
            {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
          </button>
        </form>
      )}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Foto</th>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Categoria</th>
              <th style={styles.th}>Sub</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Destaque</th>
              <th style={styles.th}>Tag</th>
              <th style={styles.th}>Cores</th>
              <th style={styles.th}>Tamanhos</th>
              <th style={styles.th}>Descrição</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={styles.td}>{p.id}</td>
                <td style={styles.td}>
                  <img src={p.foto} alt={p.nome} style={styles.img} />
                </td>
                <td style={styles.td}>{p.nome}</td>
                <td style={styles.td}>{p.cat}</td>
                <td style={styles.td}>{p.sub}</td>
                <td style={styles.td}>R$ {parseFloat(p.preco).toFixed(2)}</td>
                <td style={styles.td}>{p.destaque ? 'Sim' : 'Não'}</td>
                <td style={styles.td}>{p.tag}</td>
                <td style={styles.td}>{p.cores.join(', ')}</td>
                <td style={styles.td}>{p.tamanhos.join(', ')}</td>
                <td style={styles.td}>{p.desc.substring(0, 50)}...</td>
                <td style={styles.td}>
                  <button
                    onClick={() => editProduct(p)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    style={styles.delBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
