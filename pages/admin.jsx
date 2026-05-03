import React, { useState, useEffect } from 'react';

const PRODUTOS_DEFAULT = [
  {
    id: 1,
    nome: "Vestido Bella",
    cat: "Vestidos",
    sub: "Casual",
    preco: 40,
    destaque: true,
    tag: "Novo",
    cores: ["#B8935A", "#F5F5F5", "#8B7355"],
    tamanhos: ["P", "M", "G", "GG"],
    desc: "Vestido Bella em viscolaycra de alta qualidade, modelo fluido com decote redondo e mangas curtas. Ideal para o dia a dia, confortável e elegante.",
    foto: "/produtos/vestido-bella.jpg"
  },
  {
    id: 2,
    nome: "Conjunto Dallas",
    cat: "Conjuntos",
    sub: "Elegante",
    preco: 75,
    destaque: false,
    tag: "Best Seller",
    cores: ["#B8935A", "#FFFFFF", "#D2B48C"],
    tamanhos: ["P", "M", "G", "GG"],
    desc: "Conjunto Dallas composto por blusa e saia em viscolaycra premium. Design moderno e versátil para ocasiões especiais.",
    foto: "/produtos/conjunto-dallas.jpg"
  },
  {
    id: 3,
    nome: "Macacao Kami",
    cat: "Macacões",
    sub: "Fitness",
    preco: 79,
    destaque: true,
    tag: "Promo",
    cores: ["#B8935A", "#000000", "#F0F0F0"],
    tamanhos: ["P", "M", "G"],
    desc: "Macacão Kami em viscolaycra elástica, perfeito para treinos ou looks casuais. Cintura marcada e alças reguláveis.",
    foto: "/produtos/macacao-kami.jpg"
  },
  {
    id: 4,
    nome: "Vestido Eva",
    cat: "Vestidos",
    sub: "Casual",
    preco: 40,
    destaque: false,
    tag: "",
    cores: ["#B8935A", "#8B4513", "#FFFFFF"],
    tamanhos: ["P", "M", "G", "GG"],
    desc: "Vestido Eva rodado em viscolaycra suave, com estampa floral discreta. Ótimo para verão e passeios.",
    foto: "/produtos/vestido-eva.jpg"
  },
  {
    id: 5,
    nome: "Vestido Safira",
    cat: "Vestidos",
    sub: "Elegante",
    preco: 60,
    destaque: true,
    tag: "Novo",
    cores: ["#B8935A", "#F5F5F0", "#D2B48C"],
    tamanhos: ["M", "G", "GG"],
    desc: "Vestido Safira longo em viscolaycra sedosa, decote em V e fenda lateral. Perfeito para eventos noturnos.",
    foto: "/produtos/vestido-safira.jpg"
  },
  {
    id: 6,
    nome: "Vestido Naomi",
    cat: "Vestidos",
    sub: "Casual",
    preco: 70,
    destaque: false,
    tag: "Best Seller",
    cores: ["#B8935A", "#FFFFFF"],
    tamanhos: ["P", "M", "G"],
    desc: "Vestido Naomi midi com mangas bufantes em viscolaycra confortável. Estilo boho chic para o dia a dia.",
    foto: "/produtos/vestido-naomi.jpg"
  },
  {
    id: 7,
    nome: "Vestido Mara",
    cat: "Vestidos",
    sub: "Elegante",
    preco: 68,
    destaque: true,
    tag: "",
    cores: ["#8B7355", "#B8935A", "#000000"],
    tamanhos: ["P", "M", "G", "GG"],
    desc: "Vestido Mara justo com transparência nas mangas, feito em viscolaycra premium. Ideal para festas.",
    foto: "/produtos/vestido-mara.jpg"
  },
  {
    id: 8,
    nome: "Vestido Ariel",
    cat: "Vestidos",
    sub: "Casual",
    preco: 70,
    destaque: false,
    tag: "Promo",
    cores: ["#F0F0F0", "#B8935A"],
    tamanhos: ["M", "G"],
    desc: "Vestido Ariel chemise em viscolaycra leve, com bolsos laterais. Conforto máximo para uso diário.",
    foto: "/produtos/vestido-ariel.jpg"
  },
  {
    id: 9,
    nome: "Vestido Nina",
    cat: "Vestidos",
    sub: "Elegante",
    preco: 85,
    destaque: true,
    tag: "Novo",
    cores: ["#B8935A", "#D2B48C", "#8B4513"],
    tamanhos: ["P", "M", "G", "GG"],
    desc: "Vestido Nina sereia em viscolaycra moldável, com brilho sutil. Destaque em qualquer ocasião.",
    foto: "/produtos/vestido-nina.jpg"
  },
  {
    id: 10,
    nome: "Vestido Lola",
    cat: "Vestidos",
    sub: "Casual",
    preco: 70,
    destaque: false,
    tag: "",
    cores: ["#FFFFFF", "#B8935A", "#F5F5F5"],
    tamanhos: ["P", "G", "GG"],
    desc: "Vestido Lola trapézio em viscolaycra macia, decote quadrado. Versátil para diversas ocasiões.",
    foto: "/produtos/vestido-lola.jpg"
  },
  {
    id: 22,
    nome: "Vestido Monica Mol",
    cat: "Vestidos",
    sub: "Elegante",
    preco: 75,
    destaque: true,
    tag: "Best Seller",
    cores: ["#B8935A", "#000000"],
    tamanhos: ["M", "G"],
    desc: "Vestido Monica Mol molinho em viscolaycra, modelo envelope com cinto. Elegância casual.",
    foto: "/produtos/vestido-monica-mol.jpg"
  },
  {
    id: 28,
    nome: "Conjunto Dani",
    cat: "Conjuntos",
    sub: "Fitness",
    preco: 85,
    destaque: false,
    tag: "Promo",
    cores: ["#8B7355", "#B8935A", "#F0F0F0"],
    tamanhos: ["P", "M", "G", "GG"],
    desc: "Conjunto Dani top e legging em viscolaycra elástica, alta performance para academia.",
    foto: "/produtos/conjunto-dani.jpg"
  },
  {
    id: 33,
    nome: "Blusa Caja",
    cat: "Blusas",
    sub: "Casual",
    preco: 35,
    destaque: true,
    tag: "Novo",
    cores: ["#B8935A", "#FFFFFF"],
    tamanhos: ["P", "M", "G"],
    desc: "Blusa Caja básica em viscolaycra, gola redonda e mangas curtas. Essencial no guarda-roupa.",
    foto: "/produtos/blusa-caja.jpg"
  },
  {
    id: 37,
    nome: "Regata Ellen",
    cat: "Regatas",
    sub: "Fitness",
    preco: 20,
    destaque: false,
    tag: "",
    cores: ["#000000", "#B8935A"],
    tamanhos: ["P", "M", "G", "GG"],
    desc: "Regata Ellen em viscolaycra respirável, alças largas para suporte. Ideal para esportes.",
    foto: "/produtos/regata-ellen.jpg"
  },
  {
    id: 38,
    nome: "Cardigan Canelado",
    cat: "Cardigans",
    sub: "Casual",
    preco: 39,
    destaque: true,
    tag: "Best Seller",
    cores: ["#D2B48C", "#B8935A", "#8B7355"],
    tamanhos: ["M", "G"],
    desc: "Cardigan Canelado em viscolaycra texturizada, abertura frontal. Camada perfeita para dias frios.",
    foto: "/produtos/cardigan-canelado.jpg"
  },
  {
    id: 40,
    nome: "Calca Pantalona",
    cat: "Calças",
    sub: "Elegante",
    preco: 40,
    destaque: false,
    tag: "Promo",
    cores: ["#F5F5F0", "#B8935A"],
    tamanhos: ["P", "M", "G", "GG"],
    desc: "Calça Pantalona fluida em viscolaycra, cintura alta e modelagem ampla. Estilo sofisticado.",
    foto: "/produtos/calca-pantalona.jpg"
  }
];

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    cat: '',
    sub: '',
    preco: 0,
    destaque: false,
    tag: '',
    cores: [],
    tamanhos: [],
    desc: '',
    foto: ''
  });
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [toast, setToast] = useState({ msg: '', type: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 4000);
  };

  const validate = (data) => {
    const errs = [];
    if (!data.nome?.trim()) errs.push('Nome é obrigatório');
    if (!data.cat?.trim()) errs.push('Categoria é obrigatória');
    if (data.preco <= 0 || isNaN(data.preco)) errs.push('Preço inválido');
    if (!data.cores?.length) errs.push('Cores obrigatórias');
    if (!data.tamanhos?.length) errs.push('Tamanhos obrigatórios');
    if (!data.desc?.trim()) errs.push('Descrição obrigatória');
    if (!data.foto?.trim()) errs.push('Foto obrigatória');
    return errs;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'destaque') {
      setFormData((prev) => ({ ...prev, destaque: checked }));
      return;
    }
    let newValue = value;
    if (['cores', 'tamanhos'].includes(name)) {
      newValue = value.split(',').map((c) => c.trim()).filter(Boolean);
    } else if (name === 'preco') {
      newValue = parseFloat(value) || 0;
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (errors.length > 0) {
      showToast('Erros: ' + errors.join('; '), 'error');
      return;
    }
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct ? formData : p)));
      showToast('Produto atualizado!');
    } else {
      const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const newProduct = { ...formData, id: newId };
      setProducts((prev) => [...prev, newProduct]);
      showToast('Produto adicionado!');
    }
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      id: '',
      nome: '',
      cat: '',
      sub: '',
      preco: 0,
      destaque: false,
      tag: '',
      cores: [],
      tamanhos: [],
      desc: '',
      foto: ''
    });
  };

  const deleteProduct = (id) => {
    const product = products.find((p) => p.id === id);
    if (confirm(`Deletar ${product.nome}?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Produto deletado!');
    }
  };

  const handleLogin = () => {
    if (username === 'admin' && password === 'galene123') {
      setIsAuthenticated(true);
      localStorage.setItem('galeneAdmin', 'true');
      showToast('Login bem-sucedido!');
    } else {
      showToast('Credenciais inválidas!', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('galeneAdmin');
  };

  useEffect(() => {
    const savedProducts = localStorage.getItem('galeneProducts');
    const savedAuth = localStorage.getItem('galeneAdmin');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setProducts(parsed);
      } catch (e) {
        localStorage.setItem('galeneProducts', JSON.stringify(PRODUTOS_DEFAULT));
        setProducts(PRODUTOS_DEFAULT);
      }
    } else {
      localStorage.setItem('galeneProducts', JSON.stringify(PRODUTOS_DEFAULT));
      setProducts(PRODUTOS_DEFAULT);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('galeneProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const cats = ['Todos', ...Array.from(new Set(products.map((p) => p.cat))).sort()];
    setCategories(cats);
    const filtered = products.filter(
      (p) =>
        (filterCat === '' || p.cat === filterCat) &&
        p.nome.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, filterCat, search]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B8935A] to-slate-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-[#B8935A] text-center">Admin GALENE</h1>
          <input
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[#B8935A] text-white p-3 rounded font-bold hover:bg-[#9a7a47] transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="bg-white shadow-sm p-6 rounded-lg mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-bold text-[#B8935A]">Painel Admin - GALENE</h1>
          <div className="flex flex-wrap gap-3 items-center">
            <input
              className="p-2 border rounded px-4 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat === 'Todos' ? '' : cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingProduct(null);
                setFormData({
                  id: '',
                  nome: '',
                  cat: '',
                  sub: '',
                  preco: 0,
                  destaque: false,
                  tag: '',
                  cores: [],
                  tamanhos: [],
                  desc: '',
                  foto: ''
                });
              }}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              + Adicionar Produto
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#B8935A] text-white uppercase text-sm leading-normal">
              <th className="py-4 px-6 text-left">Foto</th>
              <th className="py-4 px-6 text-left">Nome</th>
              <th className="py-4 px-6 text-left">Categoria</th>
              <th className="py-4 px-6 text-left">Preço</th>
              <th className="py-4 px-6 text-left">Tamanhos</th>
              <th className="py-4 px-6 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-4 px-6">
                  <img
                    src={p.foto}
                    alt={p.nome}
                    className="w-16 h-16 object-cover rounded-lg shadow"
                  />
                </td>
                <td className="py-4 px-6 font-medium">{p.nome}</td>
                <td className="py-4 px-6">{p.cat}</td>
                <td className="py-4 px-6">R$ {p.preco.toFixed(2)}</td>
                <td className="py-4 px-6">{p.tamanhos.join(', ')}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => {
                      setEditingProduct(p.id);
                      setFormData(p);
                      setShowForm(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm mr-2 hover:bg-blue-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="py-12 text-center text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {toast.msg && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-xl z-50 text-white ${
            toast.type === 'success'
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        >
          {toast.msg}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-[#B8935A]">
              {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editingProduct && (
                  <input
                    name="id"
                    value={formData.id}
                    readOnly
                    className="p-3 border rounded-lg bg-gray-100 col-span-2"
                  />
                )}
                <input
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do produto"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
                  required
                />
                <input
                  name="preco"
                  type="number"
                  step="0.01"
                  value={formData.preco}
                  onChange={handleInputChange}
                  placeholder="Preço"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
                />
                <input
                  name="cat"
                  value={formData.cat}
                  onChange={handleInputChange}
                  placeholder="Categoria"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
                />
                <input
                  name="sub"
                  value={formData.sub}
                  onChange={handleInputChange}
                  placeholder="Subcategoria"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
                />
                <input
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  placeholder="Tag (ex: Novo, Promo)"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A]"
                />
                <input
                  name="foto"
                  value={formData.foto}
                  onChange={handleInputChange}
                  placeholder="URL da foto"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A] col-span-2"
                />
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder="Descrição completa"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A] col-span-2 h-32 resize-vertical"
                  required
                />
                <input
                  name="cores"
                  value={formData.cores.join(', ')}
                  onChange={handleInputChange}
                  placeholder="Cores (ex: #B8935A, #FFFFFF, #000000)"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A] col-span-2"
                />
                <input
                  name="tamanhos"
                  value={formData.tamanhos.join(', ')}
                  onChange={handleInputChange}
                  placeholder="Tamanhos (ex: P, M, G, GG)"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8935A] col-span-2"
                />
                <div className="md:col-span-2 flex items-center p-3 border rounded-lg bg-gray-50">
                  <input
                    type="checkbox"
                    name="destaque"
                    checked={formData.destaque || false}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-[#B8935A]"
                  />
                  <label className="font-medium">Destaque</label>
                </div>
              </div>
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-[#B8935A] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#9a7a47] transition-colors"
                >
                  Salvar Produto
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-colors"
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
};

export default AdminPage;
