import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kylqszyuwnzzuhaegdhj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bHFzenl1d256enVoYWVnZGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDI0ODYsImV4cCI6MjA5MzQ3ODQ4Nn0.jFXnRx_fvJvaasqLx7oEx8DsE2tL9b8zMzkkKPCWbVk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({ category: '' });
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({ nome: '', email: '', endereco: '', cidade: '', cep: '', telefone: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cartao: '', validade: '', cvv: '' });

  const theme = {
    primary: '#4F46E5',
    secondary: '#10B981',
    danger: '#EF4444',
    light: '#F9FAFB',
    dark: '#1F2937',
    gray: '#6B7280',
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const getTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0), 
    [cart]
  );

  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.categoria).filter(Boolean))];
  }, [products]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from('produtos').select('*');
    if (filters.category) {
      query = query.eq('categoria', filters.category);
    }
    query = query.order('destaque', { ascending: false }).order('criado_em', { ascending: false });
    const { data, error } = await query;
    if (error) {
      console.error('Erro ao buscar produtos:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters.category]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((p) => p.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const applyFilter = (cat) => {
    setFilters({ category: cat });
  };

  const startCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep(1);
  };

  const nextStep = () => {
    setCheckoutStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCheckoutStep((prev) => prev - 1);
  };

  const completeCheckout = () => {
    alert('Compra realizada com sucesso!');
    setCart([]);
    setCheckoutStep(0);
    setShippingInfo({ nome: '', email: '', endereco: '', cidade: '', cep: '', telefone: '' });
    setPaymentInfo({ cartao: '', validade: '', cvv: '' });
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif',
  };

  const logoStyle = {
    margin: 0,
    color: theme.dark,
    fontSize: '1.5em',
  };

  const cartButtonStyle = {
    position: 'relative',
    background: 'none',
    border: 'none',
    fontSize: '1.8em',
    cursor: 'pointer',
    padding: '10px',
  };

  const badgeStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.danger,
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8em',
    fontWeight: 'bold',
  };

  const sidebarStyle = {
    position: 'fixed',
    top: '60px',
    left: 0,
    width: isMobile ? '80vw' : '250px',
    height: 'calc(100vh - 60px)',
    backgroundColor: theme.light,
    padding: '20px',
    overflowY: 'auto',
    zIndex: 999,
    transform: isMobile && !showFilters ? 'translateX(-100%)' : 'translateX(0)',
    transition: 'transform 0.3s ease',
    borderRight: `1px solid ${theme.gray}`,
    fontFamily: 'Arial, sans-serif',
  };

  const mainStyle = {
    marginLeft: isMobile ? 0 : '270px',
    marginTop: '60px',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    minHeight: 'calc(100vh - 60px)',
    width: 'calc(100vw - 40px)',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  };

  const getFilterBtnStyle = (active) => ({
    display: 'block',
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    backgroundColor: active ? theme.primary : 'transparent',
    color: active ? 'white' : theme.dark,
    border: `1px solid ${active ? 'transparent' : theme.gray}`,
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1em',
  });

  const closeBtnStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: theme.gray,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  const cartDrawerStyle = {
    position: 'fixed',
    top: '60px',
    right: showCartDrawer ? '0' : (isMobile ? '-100vw' : '-400px'),
    width: isMobile ? '100vw' : '400px',
    height: 'calc(100vh - 60px)',
    backgroundColor: 'white',
    boxShadow: isMobile ? '0 0 20px rgba(0,0,0,0.3)' : '-4px 0 12px rgba(0,0,0,0.15)',
    zIndex: 1001,
    transition: 'right 0.3s ease',
    overflowY: 'auto',
    fontFamily: 'Arial, sans-serif',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const destaqueBadge = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#FCD34D',
    color: theme.dark,
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.8em',
    fontWeight: 'bold',
  };

  const imageContainer = {
    position: 'relative',
    height: '200px',
  };

  const cardContentStyle = {
    padding: '16px',
  };

  const titleStyle = {
    margin: '0 0 8px 0',
    fontSize: '1.2em',
    color: theme.dark,
  };

  const textStyle = {
    margin: '0 0 12px 0',
    color: theme.gray,
    fontSize: '0.9em',
  };

  const priceStyle = {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: theme.primary,
  };

  const oldPriceStyle = {
    fontSize: '1.1em',
    color: theme.gray,
    textDecoration: 'line-through',
  };

  const primaryBtnStyle = {
    flex: 1,
    padding: '10px',
    backgroundColor: theme.primary,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  };

  const secondaryBtnStyle = {
    flex: 1,
    padding: '10px',
    backgroundColor: 'transparent',
    color: theme.primary,
    border: `1px solid ${theme.primary}`,
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  };

  const ProductCard = ({ product, onOpenModal, onAddToCart }) => {
    const oldPrice = product.preco_antigo;
    return (
      <div style={cardStyle}>
        <div style={imageContainer}>
          <img src={product.foto_url} alt={product.nome} style={imageStyle} />
          {product.destaque && <div style={destaqueBadge}>Destaque</div>}
        </div>
        <div style={cardContentStyle}>
          <h3 style={titleStyle}>{product.nome}</h3>
          <p style={textStyle}>{product.categoria} - {product.material}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
            <span style={priceStyle}>
              {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            {oldPrice && (
              <span style={oldPriceStyle}>
                {oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => onOpenModal(product)} style={secondaryBtnStyle}>
              Ver Detalhes
            </button>
            <button onClick={() => onAddToCart(product)} style={primaryBtnStyle}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const cartItemStyle = {
    display: 'flex',
    gap: '12px',
    padding: '16px 0',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
  };

  const smallImageStyle = {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const removeBtnStyle = {
    backgroundColor: theme.danger,
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
  };

  const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
    <div style={cartItemStyle}>
      <img src={item.foto_url} alt={item.nome} style={smallImageStyle} />
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1em' }}>{item.nome}</h4>
        <p style={{ margin: 0, color: theme.gray }}>
          {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          style={{ background: theme.primary, color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }}
        >
          +
        </button>
        <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          style={{ background: theme.gray, color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }}
        >
          -
        </button>
      </div>
      <button onClick={() => onRemove(item.id)} style={removeBtnStyle}>
        Remover
      </button>
    </div>
  );

  const buyBtnStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: theme.primary,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1em',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    width: '90vw',
    maxWidth: '500px',
    maxHeight: '90vh',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
  };

  const modalImageStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  };

  const closeModalStyle = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '2em',
    cursor: 'pointer',
    color: theme.gray,
  };

  const ProductModal = ({ product, onClose, onAddToCart }) => (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeModalStyle} onClick={onClose}>×</button>
        <img src={product.foto_url} alt={product.nome} style={modalImageStyle} />
        <div style={{ padding: '24px' }}>
          <h2 style={{ ...titleStyle, fontSize: '1.8em', marginBottom: '12px' }}>{product.nome}</h2>
          <p style={{ ...textStyle, fontSize: '1.1em', marginBottom: '20px' }}>
            {product.categoria} - {product.material}
          </p>
          <div style={{ ...priceStyle, fontSize: '2em', marginBottom: '20px' }}>
            {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <button 
            onClick={() => {
              onAddToCart(product);
              onClose();
            }} 
            style={{ ...primaryBtnStyle, width: '100%', padding: '16px', fontSize: '1.2em' }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );

  const checkoutOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    zIndex: 1002,
    overflowY: 'auto',
    fontFamily: 'Arial, sans-serif',
  };

  const checkoutHeaderStyle = {
    position: 'sticky',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: 'white',
    borderBottom: '1px solid #eee',
    zIndex: 10,
  };

  const stepLabelStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: theme.dark,
  };

  const formInputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1em',
    boxSizing: 'border-box',
  };

  const checkoutBtnStyle = (primary = true) => ({
    width: '48%',
    padding: '14px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1em',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '20px',
    backgroundColor: primary ? theme.primary : theme.gray,
    color: 'white',
  });

  const CheckoutSteps = () => (
    <div style={checkoutOverlayStyle}>
      <div style={checkoutHeaderStyle}>
        <button onClick={() => setCheckoutStep(0)} style={{ background: 'none', border: 'none', fontSize: '1.5em', cursor: 'pointer' }}>
          ←
        </button>
        <div style={stepLabelStyle}>Passo {checkoutStep} de 3</div>
        <div />
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        {checkoutStep === 1 && (
          <>
            <h2 style={{ color: theme.dark, marginBottom: '20px' }}>Revisão do Carrinho</h2>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
            ))}
            <div style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'right', margin: '20px 0', color: theme.primary }}>
              Total: {getTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <button onClick={nextStep} style={buyBtnStyle}>Próximo: Entrega</button>
          </>
        )}
        {checkoutStep === 2 && (
          <>
            <h2 style={{ color: theme.dark, marginBottom: '20px' }}>Informações de Entrega</h2>
            <input
              placeholder="Nome Completo"
              value={shippingInfo.nome}
              onChange={(e) => setShippingInfo({ ...shippingInfo, nome: e.target.value })}
              style={formInputStyle}
            />
            <input
              placeholder="Email"
              value={shippingInfo.email}
              onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
              style={formInputStyle}
            />
            <input
              placeholder="Endereço"
              value={shippingInfo.endereco}
              onChange={(e) => setShippingInfo({ ...shippingInfo, endereco: e.target.value })}
              style={formInputStyle}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                placeholder="Cidade"
                value={shippingInfo.cidade}
                onChange={(e) => setShippingInfo({ ...shippingInfo, cidade: e.target.value })}
                style={{ ...formInputStyle, flex: 1 }}
              />
              <input
                placeholder="CEP"
                value={shippingInfo.cep}
                onChange={(e) => setShippingInfo({ ...shippingInfo, cep: e.target.value })}
                style={{ ...formInputStyle, flex: 1 }}
              />
            </div>
            <input
              placeholder="Telefone"
              value={shippingInfo.telefone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, telefone: e.target.value })}
              style={formInputStyle}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={prevStep} style={checkoutBtnStyle(false)}>Voltar</button>
              <button onClick={nextStep} style={checkoutBtnStyle(true)}>Próximo: Pagamento</button>
            </div>
          </>
        )}
        {checkoutStep === 3 && (
          <>
            <h2 style={{ color: theme.dark, marginBottom: '20px' }}>Pagamento</h2>
            <input
              placeholder="Número do Cartão"
              value={paymentInfo.cartao}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cartao: e.target.value })}
              style={formInputStyle}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                placeholder="Validade (MM/AA)"
                value={paymentInfo.validade}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, validade: e.target.value })}
                style={{ ...formInputStyle, flex: 1 }}
              />
              <input
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                style={{ ...formInputStyle, flex: 1 }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={prevStep} style={checkoutBtnStyle(false)}>Voltar</button>
              <button onClick={completeCheckout} style={checkoutBtnStyle(true)}>Concluir Compra</button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const backdropStyle = {
    position: 'fixed',
    top: '60px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 998,
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 style={logoStyle}>Loja Supabase</h1>
          {isMobile && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{ background: 'none', border: 'none', fontSize: '1.5em', cursor: 'pointer', color: theme.dark }}
            >
              ☰
            </button>
          )}
        </div>
        <button onClick={() => setShowCartDrawer(true)} style={cartButtonStyle}>
          🛒
          {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
        </button>
      </header>

      <aside style={sidebarStyle}>
        <h3 style={{ marginBottom: '20px', color: theme.dark }}>Filtros</h3>
        <div>
          <button
            onClick={() => applyFilter('')}
            style={getFilterBtnStyle(filters.category === '')}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => applyFilter(cat)}
              style={getFilterBtnStyle(filters.category === cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {isMobile && (
          <button onClick={() => setShowFilters(false)} style={closeBtnStyle}>
            Fechar
          </button>
        )}
      </aside>

      <main style={mainStyle}>
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: theme.gray }}>
            Carregando produtos...
          </div>
        ) : products.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: theme.gray }}>
            Nenhum produto encontrado.
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={openModal}
              onAddToCart={addToCart}
            />
          ))
        )}
      </main>

      {showCartDrawer && <div style={cartDrawerStyle}>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <h2 style={{ margin: 0, color: theme.dark }}>Carrinho ({cartCount})</h2>
          <button onClick={() => setShowCartDrawer(false)} style={{ background: 'none', border: 'none', fontSize: '1.8em', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ padding: '20px' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: theme.gray, margin: '40px 0' }}>Carrinho vazio</p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
          {cart.length > 0 && (
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
              <div style={{ fontSize: '1.4em', fontWeight: 'bold', textAlign: 'right', marginBottom: '20px', color: theme.primary }}>
                Total: {getTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <button onClick={startCheckout} style={buyBtnStyle} disabled={cart.length === 0}>
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>}

      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onAddToCart={addToCart}
        />
      )}

      {checkoutStep > 0 && <CheckoutSteps />}

      {isMobile && showFilters && <div style={backdropStyle} onClick={() => setShowFilters(false)} />}
    </>
  );
}
