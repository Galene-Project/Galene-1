'use client';
import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kylqszyuwnzzuhaegdhj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bHFzenl1d256enVoYWVnZGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDI0ODYsImV4cCI6MjA5MzQ3ODQ4Nn0.jFXnRx_fvJvaasqLx7oEx8DsE2tL9b8zMzkkKPCWbVk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const fallbackProducts = [
  {
    id: 1,
    name: 'Smartphone X',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop',
    category: 'Eletrônicos',
    description: 'Smartphone topo de linha com câmera incrível.'
  },
  {
    id: 2,
    name: 'Camiseta Básica',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
    category: 'Roupas',
    description: 'Camiseta confortável para o dia a dia.'
  },
  {
    id: 3,
    name: 'Notebook Pro',
    price: 2999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=400&fit=crop',
    category: 'Eletrônicos',
    description: 'Notebook poderoso para trabalho e jogos.'
  },
  {
    id: 4,
    name: 'Calça Jeans',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
    category: 'Roupas',
    description: 'Jeans clássico e durável.'
  },
  {
    id: 5,
    name: 'Fone de Ouvido',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop',
    category: 'Eletrônicos',
    description: 'Fone sem fio com cancelamento de ruído.'
  },
  {
    id: 6,
    name: 'Vestido Floral',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1487222474749-6d22f09e2def?w=300&h=400&fit=crop',
    category: 'Roupas',
    description: 'Vestido leve e elegante para o verão.'
  },
  {
    id: 7,
    name: 'Sofá Moderno',
    price: 1599.99,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76bbb17e?w=300&h=400&fit=crop',
    category: 'Casa',
    description: 'Sofá confortável para a sala.'
  },
  {
    id: 8,
    name: 'Tênis Esportivo',
    price: 249.90,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop',
    category: 'Esportes',
    description: 'Tênis para corrida e academia.'
  },
  {
    id: 9,
    name: 'Tablet Air',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=300&h=400&fit=crop',
    category: 'Eletrônicos',
    description: 'Tablet leve e versátil.'
  },
  {
    id: 10,
    name: 'Jaqueta de Couro',
    price: 399.90,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
    category: 'Roupas',
    description: 'Jaqueta estilosa para o inverno.'
  },
  {
    id: 11,
    name: 'Mesa de Jantar',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=400&fit=crop',
    category: 'Casa',
    description: 'Mesa elegante para 6 pessoas.'
  },
  {
    id: 12,
    name: 'Bola de Futebol',
    price: 79.90,
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c3b?w=300&h=400&fit=crop',
    category: 'Esportes',
    description: 'Bola oficial para jogos.'
  }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '', address: '' });
  const [filters, setFilters] = useState({ category: '', priceMax: 1000 });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const availableCategories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Todos', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = products.filter(p =>
    (!filters.category || p.category === filters.category) &&
    p.price <= filters.priceMax
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id');
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    console.log('Dados do pedido:', { ...checkoutForm, items: cart, total });
    alert(`Pedido de ${checkoutForm.name} realizado com sucesso! Total: R$${total.toFixed(2)}`);
    setCart([]);
    setCheckoutForm({ name: '', email: '', address: '' });
    setShowCheckout(false);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Minha Loja</h1>
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          🛒 Carrinho
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Sidebar Filtros */}
        <aside className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-lg shrink-0">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtros</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Categoria</label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value === 'Todos' ? '' : e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat === 'Todos' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Preço Máximo</label>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-sm text-gray-600">R$ 0 - R$ {filters.priceMax.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">Carregando produtos...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-3">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
            </div>
          )}
        </main>
      </div>

      {/* Modal Produto */}
      {showModal && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedProduct.name}</h2>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <p className="text-3xl font-bold text-blue-600 mb-6">
              R$ {selectedProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <button
              onClick={() => {
                addToCart(selectedProduct);
                setShowModal(false);
              }}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors font-bold mb-3"
            >
              Adicionar ao Carrinho
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal Carrinho */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Carrinho de Compras</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Seu carrinho está vazio.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                      <span className="font-bold text-lg text-blue-600 ml-4">
                        R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <>
                <div className="border-t pt-4 mb-6">
                  <p className="text-2xl font-bold text-gray-800">
                    Total: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors font-bold mb-3"
                >
                  Finalizar Compra
                </button>
              </>
            )}
            <button
              onClick={() => setShowCart(false)}
              className="w-full bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      )}

      {/* Modal Checkout */}
      {showCheckout && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Finalizar Compra</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Nome Completo</label>
                <input
                  type="text"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Endereço</label>
                <textarea
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  required
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="pt-4 border-t">
                <p className="text-xl font-bold text-blue-600">
                  Total: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors font-bold"
              >
                Confirmar Pedido
              </button>
            </form>
            <button
              onClick={() => setShowCheckout(false)}
              className="w-full mt-3 bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
