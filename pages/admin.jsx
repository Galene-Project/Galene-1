import React, { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'galene2024';

const PRODUTOS_DEFAULT = [
  {
    id: '1',
    nome: 'Anel Solitário Diamante',
    cat: 'Anéis',
    sub: 'Ouro 18k',
    preco: 4500.00,
    destaque: true,
    tag: 'Best Seller',
    cores: ['Ouro Amarelo', 'Ouro Branco'],
    tamanhos: ['6', '7', '8'],
    desc: 'Anel clássico com diamante central de 0.5ct, perfeito para noivas e ocasiões especiais. Feito em ouro 18k com acabamento impecável.',
    foto: 'https://picsum.photos/seed/galene1/400/400'
  },
  {
    id: '2',
    nome: 'Anel Trançado Ouro',
    cat: 'Anéis',
    sub: 'Ouro 18k',
    preco: 2800.00,
    destaque: false,
    tag: '',
    cores: ['Ouro Rosa'],
    tamanhos: ['5', '6', '7', '8', '9'],
    desc: 'Anel trançado elegante em ouro 18k, design moderno e versátil para uso diário ou eventos. Confortável e durável.',
    foto: 'https://picsum.photos/seed/galene2/400/400'
  },
  {
    id: '3',
    nome: 'Anel Signo Zodíaco',
    cat: 'Anéis',
    sub: 'Prata 925',
    preco: 850.00,
    destaque: true,
    tag: 'Novo',
    cores: ['Prata', 'Ródio Negro'],
    tamanhos: ['6', '7', '8'],
    desc: 'Anel personalizável com símbolo do seu signo do zodíaco em prata 925, banho de ródio para brilho eterno.',
    foto: 'https://picsum.photos/seed/galene3/400/400'
  },
  {
    id: '4',
    nome: 'Anel Minimalista',
    cat: 'Anéis',
    sub: 'Ouro Rosa',
    preco: 1200.00,
    destaque: false,
    tag: '',
    cores: ['Ouro Rosa'],
    tamanhos: ['5', '6', '7'],
    desc: 'Anel minimalista fino em ouro rosa 18k, ideal para empilhamento e looks casuais elegantes.',
    foto: 'https://picsum.photos/seed/galene4/400/400'
  },
  {
    id: '5',
    nome: 'Pulseira Corrente Fina',
    cat: 'Pulseiras',
    sub: 'Ouro 18k',
    preco: 1900.00,
    destaque: true,
    tag: 'Popular',
    cores: ['Ouro Amarelo'],
    tamanhos: ['P', 'M', 'G'],
    desc: 'Pulseira de corrente fina delicada em ouro 18k, perfeita para uso solitário ou com charms. Ajustável.',
    foto: 'https://picsum.photos/seed/galene5/400/400'
  },
  {
    id: '6',
    nome: 'Pulseira Pingente Coração',
    cat: 'Pulseiras',
    sub: 'Prata 925',
    preco: 650.00,
    destaque: false,
    tag: '',
    cores: ['Prata'],
    tamanhos: ['P', 'M'],
    desc: 'Pulseira romântica com pingente coração em prata 925, banho anti-alérgico para conforto diário.',
    foto: 'https://picsum.photos/seed/galene6/400/400'
  },
  {
    id: '7',
    nome: 'Pulseira Tennis',
    cat: 'Pulseiras',
    sub: 'Ouro 18k',
    preco: 5200.00,
    destaque: true,
    tag: 'Luxo',
    cores: ['Ouro Branco', 'Diamantes'],
    tamanhos: ['16cm', '18cm'],
    desc: 'Pulseira tennis cravejada de diamantes em ouro branco 18k, peça statement para ocasiões especiais.',
    foto: 'https://picsum.photos/seed/galene7/400/400'
  },
  {
    id: '8',
    nome: 'Pulseira Charm Personalizável',
    cat: 'Pulseiras',
    sub: 'Ouro Rosa',
    preco: 950.00,
    destaque: false,
    tag: 'Personalizável',
    cores: ['Ouro Rosa'],
    tamanhos: ['P', 'M', 'G'],
    desc: 'Pulseira com charms intercambiáveis em ouro rosa, crie seu estilo único com diversas opções.',
    foto: 'https://picsum.photos/seed/galene8/400/400'
  },
  {
    id: '9',
    nome: 'Colar Solitário',
    cat: 'Colares',
    sub: 'Ouro 18k',
    preco: 3800.00,
    destaque: true,
    tag: 'Clássico',
    cores: ['Ouro Amarelo'],
    tamanhos: ['40cm', '45cm'],
    desc: 'Colar com pingente solitário diamante em ouro 18k, atemporal e sofisticado para qualquer look.',
    foto: 'https://picsum.photos/seed/galene9/400/400'
  },
  {
    id: '10',
    nome: 'Colar Corrente Grossa',
    cat: 'Colares',
    sub: 'Prata 925',
    preco: 750.00,
    destaque: false,
    tag: '',
    cores: ['Prata', 'Oxidado'],
    tamanhos: ['45cm'],
    desc: 'Colar de corrente grossa em prata 925 com opção oxidada, estilo urbano e robusto.',
    foto: 'https://picsum.photos/seed/galene10/400/400'
  },
  {
    id: '11',
    nome: 'Colar com Pingente Estrela',
    cat: 'Colares',
    sub: 'Ouro Rosa',
    preco: 2200.00,
    destaque: true,
    tag: 'Romântico',
    cores: ['Ouro Rosa'],
    tamanhos: ['40cm', '50cm'],
    desc: 'Colar delicado com pingente estrela em ouro rosa 18k, símbolo de brilho e inspiração.',
    foto: 'https://picsum.photos/seed/galene11/400/400'
  },
  {
    id: '12',
    nome: 'Colar Choker',
    cat: 'Colares',
    sub: 'Ouro 18k',
    preco: 3100.00,
    destaque: false,
    tag: 'Moderno',
    cores: ['Ouro Branco'],
    tamanhos: ['35cm'],
    desc: 'Choker elegante em ouro branco 18k com detalhes cravejados, tendência fashion atual.',
    foto: 'https://picsum.photos/seed/galene12/400/400'
  },
  {
    id: '13',
    nome: 'Brincos Gota',
    cat: 'Brincos',
    sub: 'Ouro 18k',
    preco: 2600.00,
    destaque: true,
    tag: 'Elegante',
    cores: ['Ouro Amarelo', 'Diamantes'],
    tamanhos: ['Padrão'],
    desc: 'Brincos de gota alongados com diamantes em ouro 18k, alongam o rosto e adicionam glamour.',
    foto: 'https://picsum.photos/seed/galene13/400/400'
  },
  {
    id: '14',
    nome: 'Brincos Argolas Médias',
    cat: 'Brincos',
    sub: 'Prata 925',
    preco: 450.00,
    destaque: false,
    tag: '',
    cores: ['Prata'],
    tamanhos: ['Padrão'],
    desc: 'Argolas médias versáteis em prata 925, leves e perfeitas para o dia a dia.',
    foto: 'https://picsum.photos/seed/galene14/400/400'
  },
  {
    id: '15',
    nome: 'Brincos Pérola',
    cat: 'Brincos',
    sub: 'Ouro Rosa',
    preco: 1400.00,
    destaque: true,
    tag: 'Clássico',
    cores: ['Ouro Rosa', 'Pérola'],
    tamanhos: ['Padrão'],
    desc: 'Brincos com pérola natural em ouro rosa 18k, elegância clássica para eventos formais.',
    foto: 'https://picsum.photos/seed/galene15/400/400'
  },
  {
    id: '16',
    nome: 'Brincos Stud Diamante',
    cat: 'Brincos',
    sub: 'Ouro 18k',
    preco: 3600.00,
    destaque: true,
    tag: 'Luxo',
    cores: ['Ouro Branco'],
    tamanhos: ['Padrão'],
    desc: 'Brincos stud com diamantes em ouro branco 18k, discretos mas luxuosos, ideais para sempre.',
    foto: 'https://picsum.photos/seed/galene16/400/400'
  }
];

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    cat: '',
    sub: '',
    preco: 0,
    destaque: false,
    tag: '',
    coresStr: '',
    tamanhosStr: '',
    desc: '',
    foto: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [filterCat, setFilterCat] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let saved = localStorage.getItem('galeneProdutos');
      if (saved) {
        setProdutos(JSON.parse(saved));
      } else {
        setProdutos(PRODUTOS_DEFAULT);
        localStorage.setItem('galeneProdutos', JSON.stringify(PRODUTOS_DEFAULT));
      }
    }
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      const cats = Array.from(new Set(produtos.map(p => p.cat).filter(Boolean)));
      setCategories(cats);
    }
  }, [produtos]);

  useEffect(() => {
    if (typeof window !== 'undefined' && produtos.length > 0) {
      localStorage.setItem('galeneProdutos', JSON.stringify(produtos));
    }
  }, [produtos]);

  const showToast = (type, message) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword('');
    } else {
      showToast('error', 'Senha incorreta!');
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      nome: '',
      cat: '',
      sub: '',
      preco: 0,
      destaque: false,
      tag: '',
      coresStr: '',
      tamanhosStr: '',
      desc: '',
      foto: ''
    });
    setEditingId(null);
  };

  const editProduct = (prod) => {
    setFormData({
      ...prod,
      coresStr: prod.cores.join(', '),
      tamanhosStr: prod.tamanhos.join(', ')
    });
    setEditingId(prod.id);
  };

  const saveProduct = () => {
    const cores = formData.coresStr ? formData.coresStr.split(',').map(c => c.trim()).filter(Boolean) : [];
    const tamanhos = formData.tamanhosStr ? formData.tamanhosStr.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (!formData.nome || !formData.cat || !formData.sub || formData.preco <= 0 || !formData.desc || !formData.foto || cores.length === 0 || tamanhos.length === 0) {
      showToast('error', 'Todos os campos obrigatórios devem ser preenchidos corretamente (preço > 0, arrays não vazios).');
      return;
    }

    const newProd = {
      id: editingId || Date.now().toString(),
      nome: formData.nome,
      cat: formData.cat,
      sub: formData.sub,
      preco: parseFloat(formData.preco),
      destaque: !!formData.destaque,
      tag: formData.tag || '',
      cores,
      tamanhos,
      desc: formData.desc,
      foto: formData.foto
    };

    if (editingId) {
      setProdutos(produtos.map(p => p.id === editingId ? newProd : p));
      showToast('success', 'Produto atualizado com sucesso!');
    } else {
      setProdutos([...produtos, newProd]);
      showToast('success', 'Produto adicionado com sucesso!');
    }

    resetForm();
  };

  const deleteProduct = (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
      showToast('success', 'Produto excluído com sucesso!');
    }
  };

  const filteredProdutos = produtos.filter(p => !filterCat || p.cat === filterCat);

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#fafafa',
      minHeight: '100vh',
    },
    header: {
      color: '#B8935A',
      textAlign: 'center',
      fontSize: '2.5em',
      marginBottom: '40px',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
    section: {
      backgroundColor: 'white',
      marginBottom: '30px',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    h2: {
      color: '#B8935A',
      marginBottom: '20px',
      fontSize: '1.8em',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '15px',
    },
    input: {
      padding: '12px',
      border: '2px solid #e0e0e0',
      borderRadius: '6px',
      fontSize: '16px',
    },
    textarea: {
      padding: '12px',
      border: '2px solid #e0e0e0',
      borderRadius: '6px',
      fontSize: '16px',
      height: '100px',
      resize: 'vertical',
    },
    select: {
      padding: '12px',
      border: '2px solid #e0e0e0',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: 'white',
    },
    btnPrimary: {
      backgroundColor: '#B8935A',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    btnSecondary: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    btnSmall: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '5px',
    },
    btnDanger: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '15px 12px',
      backgroundColor: '#B8935A',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    td: {
      padding: '15px 12px',
      borderBottom: '1px solid #e0e0e0',
    },
    imgThumb: {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    toast: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 20px',
      borderRadius: '6px',
      color: 'white',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      minWidth: '300px',
    },
    authContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#fafafa',
    },
    authBox: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    authInput: {
      width: '300px',
      padding: '15px',
      fontSize: '18px',
      border: '2px solid #B8935A',
      borderRadius: '6px',
      marginBottom: '20px',
    },
    authBtn: {
      backgroundColor: '#B8935A',
      color: 'white',
      border: 'none',
      padding: '15px 40px',
      borderRadius: '6px',
      fontSize: '18px',
      cursor: 'pointer',
    },
  };

  if (!authenticated) {
    return (
      <div style={styles.authContainer}>
        <h1 style={{ ...styles.header, fontSize: '3em' }}>GALENE Admin</h1>
        <div style={styles.authBox}>
          <input
            type="password"
            style={styles.authInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha de administrador"
            onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
          />
          <br />
          <button style={styles.authBtn} onClick={handleAuth}>
            Acessar Painel
          </button>
        </div>
        {toast.show && (
          <div
            style={{
              ...styles.toast,
              backgroundColor: toast.type === 'success' ? '#4CAF50' : '#f44336',
            }}
          >
            {toast.message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Administração GALENE</h1>

      <div style={styles.section}>
        <h2 style={styles.h2}>
          {editingId ? 'Editar Produto' : 'Adicionar Novo Produto'}
        </h2>
        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Nome do Produto"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Categoria"
            value={formData.cat}
            onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Subcategoria"
            value={formData.sub}
            onChange={(e) => setFormData({ ...formData, sub: e.target.value })}
          />
          <input
            type="number"
            step="0.01"
            style={styles.input}
            placeholder="Preço (R$)"
            value={formData.preco}
            onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) || 0 })}
          />
          <input
            style={styles.input}
            placeholder="Tag (opcional)"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          />
          <label style={{ display: 'flex', alignItems: 'center', gridColumn: 'span 2' }}>
            Destaque:
            <input
              type="checkbox"
              checked={formData.destaque}
              onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
              style={{ marginLeft: '10px' }}
            />
          </label>
          <input
            style={styles.input}
            placeholder="Cores (ex: Ouro Amarelo, Ouro Branco)"
            value={formData.coresStr}
            onChange={(e) => setFormData({ ...formData, coresStr: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Tamanhos (ex: 6,7,8 ou P,M,G)"
            value={formData.tamanhosStr}
            onChange={(e) => setFormData({ ...formData, tamanhosStr: e.target.value })}
          />
          <textarea
            style={styles.textarea}
            placeholder="Descrição completa"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="URL da Foto"
            value={formData.foto}
            onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
          />
          {editingId ? (
            <>
              <button style={styles.btnPrimary} onClick={saveProduct}>
                Atualizar Produto
              </button>
              <button style={styles.btnSecondary} onClick={resetForm}>
                Cancelar
              </button>
            </>
          ) : (
            <button style={styles.btnPrimary} onClick={saveProduct}>
              Adicionar Produto
            </button>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={styles.h2}>Lista de Produtos ({filteredProdutos.length})</h2>
          <select style={styles.select} value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
            <option value="">Todas as Categorias</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Foto</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Categoria</th>
                <th style={styles.th}>Subcategoria</th>
                <th style={styles.th}>Preço</th>
                <th style={styles.th}>Destaque</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProdutos.map((prod) => (
                <tr key={prod.id}>
                  <td style={styles.td}>
                    <img src={prod.foto} style={styles.imgThumb} alt={prod.nome} />
                  </td>
                  <td style={styles.td}>{prod.nome}</td>
                  <td style={styles.td}>{prod.cat}</td>
                  <td style={styles.td}>{prod.sub}</td>
                  <td style={styles.td}>R$ {prod.preco.toFixed(2)}</td>
                  <td style={styles.td}>{prod.destaque ? 'Sim' : 'Não'}</td>
                  <td style={styles.td}>
                    <button style={styles.btnSmall} onClick={() => editProduct(prod)}>
                      Editar
                    </button>
                    <button
                      style={styles.btnDanger}
                      onClick={() => deleteProduct(prod.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast.show && (
        <div
          style={{
            ...styles.toast,
            backgroundColor: toast.type === 'success' ? '#4CAF50' : '#f44336',
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
