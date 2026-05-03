import React, { useState, useEffect } from 'react';

const PRODUTOS_DEFAULT = [
  {
    id: 1,
    nome: 'Camiseta Básica Azul',
    cat: 'Roupas',
    sub: 'Camisetas',
    preco: 29.90,
    destaque: true,
    tag: 'verão',
    cores: ['azul', 'branco'],
    tamanhos: ['P', 'M', 'G', 'GG'],
    desc: 'Camiseta 100% algodão, confortável para o dia a dia. Perfeita para uso casual.',
    foto: 'https://via.placeholder.com/300x400/87CEEB/FFFFFF?text=Camiseta+Azul'
  },
  {
    id: 2,
    nome: 'Calça Jeans Skinny',
    cat: 'Roupas',
    sub: 'Calças',
    preco: 89.90,
    destaque: false,
    tag: 'casual',
    cores: ['azul', 'preto'],
    tamanhos: ['36', '38', '40', '42'],
    desc: 'Calça jeans skinny de alta qualidade, perfeita para looks modernos e confortáveis.',
    foto: 'https://via.placeholder.com/300x400/00008B/FFFFFF?text=Cal%C3%A7a+Jeans'
  },
  {
    id: 3,
    nome: 'Tênis Running Branco',
    cat: 'Calçados',
    sub: 'Tênis',
    preco: 199.90,
    destaque: true,
    tag: 'esporte',
    cores: ['branco', 'cinza'],
    tamanhos: ['39', '40', '41', '42'],
    desc: 'Tênis para corrida com amortecimento superior e design ergonômico.',
    foto: 'https://via.placeholder.com/300x400/F5F5F5/000000?text=T%C3%AAnis+Branco'
  },
  {
    id: 4,
    nome: 'Vestido Floral Verão',
    cat: 'Roupas',
    sub: 'Vestidos',
    preco: 69.90,
    destaque: true,
    tag: 'verão',
    cores: ['floral', 'verde'],
    tamanhos: ['P', 'M', 'G'],
    desc: 'Vestido leve e fresco, ideal para o verão. Estilo romântico e elegante.',
    foto: 'https://via.placeholder.com/300x400/90EE90/000000?text=Vestido+Floral'
  },
  {
    id: 5,
    nome: 'Boné Snapback Preto',
    cat: 'Acessórios',
    sub: 'Bonés',
    preco: 39.90,
    destaque: false,
    tag: 'street',
    cores: ['preto', 'vermelho'],
    tamanhos: ['U'],
    desc: 'Boné snapback estilo streetwear, ajustável e durável.',
    foto: 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Bon%C3%A9+Preto'
  }
];

// Componente principal do painel administrativo GALENE
function App() {
  const [produtos, setProdutos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    cat: '',
    sub: '',
    preco: 0,
    destaque: false,
    tag: '',
    cores: '',
    tamanhos: '',
    desc: '',
    foto: ''
  });

  // Carrega produtos do localStorage ou usa padrão
  useEffect(() => {
    const saved = localStorage.getItem('galene_produtos');
    if (saved) {
      setProdutos(JSON.parse(saved));
    } else {
      setProdutos(PRODUTOS_DEFAULT);
    }
  }, []);

  // Salva no localStorage sempre que produtos mudam
  useEffect(() => {
    localStorage.setItem('galene_produtos', JSON.stringify(produtos));
  }, [produtos]);

  // Função para abrir modal de adição ou edição
  const abrirModal = (produto = null) => {
    if (produto) {
      setFormData({
        ...produto,
        cores: produto.cores.join(','),
        tamanhos: produto.tamanhos.join(',')
      });
      setEditandoId(produto.id);
    } else {
      setFormData({
        id: '',
        nome: '',
        cat: '',
        sub: '',
        preco: 0,
        destaque: false,
        tag: '',
        cores: '',
        tamanhos: '',
        desc: '',
        foto: ''
      });
      setEditandoId(null);
    }
    setModalAberto(true);
  };

  // Fecha o modal
  const fecharModal = () => {
    setModalAberto(false);
    setEditandoId(null);
  };

  // Manipula mudanças nos inputs do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Salva o produto (add ou edit)
  const salvarProduto = (e) => {
    e.preventDefault();
    const novoProduto = {
      id: editandoId || (produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1),
      nome: formData.nome,
      cat: formData.cat,
      sub: formData.sub,
      preco: parseFloat(formData.preco),
      destaque: formData.destaque,
      tag: formData.tag,
      cores: formData.cores.split(',').map(c => c.trim()).filter(Boolean),
      tamanhos: formData.tamanhos.split(',').map(t => t.trim()).filter(Boolean),
      desc: formData.desc,
      foto: formData.foto
    };

    if (editandoId) {
      // Editar
      setProdutos(produtos.map(p => p.id === editandoId ? novoProduto : p));
    } else {
      // Adicionar
      setProdutos([...produtos, novoProduto]);
    }
    fecharModal();
  };

  // Deleta um produto
  const deletarProduto = (id) => {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    verticalAlign: 'top'
  };

  const headerStyle = {
    ...cellStyle,
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Painel Administrativo GALENE</h1>
      <button
        onClick={() => abrirModal()}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        + Adicionar Produto
      </button>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={headerStyle}>ID</th>
              <th style={headerStyle}>Nome</th>
              <th style={headerStyle}>Categoria</th>
              <th style={headerStyle}>Subcategoria</th>
              <th style={headerStyle}>Preço</th>
              <th style={headerStyle}>Destaque</th>
              <th style={headerStyle}>Tag</th>
              <th style={headerStyle}>Cores</th>
              <th style={headerStyle}>Tamanhos</th>
              <th style={headerStyle}>Descrição</th>
              <th style={headerStyle}>Foto</th>
              <th style={headerStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} style={{ backgroundColor: produto.destaque ? '#e8f5e8' : 'white' }}>
                <td style={cellStyle}>{produto.id}</td>
                <td style={cellStyle}>{produto.nome}</td>
                <td style={cellStyle}>{produto.cat}</td>
                <td style={cellStyle}>{produto.sub}</td>
                <td style={cellStyle}>R$ {produto.preco.toFixed(2)}</td>
                <td style={cellStyle}>{produto.destaque ? 'Sim' : 'Não'}</td>
                <td style={cellStyle}>{produto.tag}</td>
                <td style={cellStyle}>{produto.cores.join(', ')}</td>
                <td style={cellStyle}>{produto.tamanhos.join(', ')}</td>
                <td style={cellStyle}>{produto.desc.length > 50 ? `${produto.desc.substring(0, 50)}...` : produto.desc}</td>
                <td style={cellStyle}>
                  <img
                    src={produto.foto}
                    alt={produto.nome}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </td>
                <td style={cellStyle}>
                  <button
                    onClick={() => abrirModal(produto)}
                    style={{
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '5px',
                      fontSize: '14px'
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarProduto(produto.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para adicionar/editar produto */}
      {modalAberto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <h2 style={{ marginBottom: '20px', color: '#333' }}>
              {editandoId ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </h2>
            <form onSubmit={salvarProduto}>
              {editandoId && (
                <div style={{ marginBottom: '15px' }}>
                  <label>ID: </label>
                  <input
                    name="id"
                    value={formData.id}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              )}
              <div style={{ marginBottom: '15px' }}>
                <label>Nome: *</label>
                <input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Categoria: *</label>
                  <input
                    name="cat"
                    value={formData.cat}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Subcategoria: *</label>
                  <input
                    name="sub"
                    value={formData.sub}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Preço (R$): *</label>
                <input
                  name="preco"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>
                  <input
                    name="destaque"
                    type="checkbox"
                    checked={formData.destaque}
                    onChange={handleChange}
                  />{' '}
                  Produto em Destaque
                </label>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Tag:</label>
                <input
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Cores (vírgula separadas):</label>
                  <input
                    name="cores"
                    value={formData.cores}
                    onChange={handleChange}
                    placeholder="ex: azul, branco, preto"
                    style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Tamanhos (vírgula separadas):</label>
                  <input
                    name="tamanhos"
                    value={formData.tamanhos}
                    onChange={handleChange}
                    placeholder="ex: P, M, G"
                    style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Descrição:</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows="4"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label>Foto (URL):</label>
                <input
                  name="foto"
                  value={formData.foto}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginRight: '10px'
                  }}
                >
                  Salvar Produto
                </button>
                <button
                  type="button"
                  onClick={fecharModal}
                  style={{
                    backgroundColor: '#757575',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
