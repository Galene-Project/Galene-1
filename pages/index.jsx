import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const RingSVG = ({ className = 'w-24 h-24', color = '#d4af37' }) => (
  <svg className={className} viewBox="0 0 120 120" style={{ color }} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="60" cy="60" rx="45" ry="15" />
    <ellipse cx="60" cy="60" rx="30" ry="10" transform="rotate(90 60 60)" />
    <polygon points="55,45 60,40 65,45 62,52 58,52" />
  </svg>
);

const NecklaceSVG = ({ className = 'w-24 h-24', color = '#d4af37' }) => (
  <svg className={className} viewBox="0 0 120 120" style={{ color }} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 60 Q60 20 100 60" />
    <path d="M20 60 Q30 70 20 80 Q30 90 20 100" strokeWidth="2" />
    <path d="M100 60 Q90 70 100 80 Q90 90 100 100" strokeWidth="2" />
    <circle cx="60" cy="65" r="8" fill="currentColor" />
  </svg>
);

const EarringsSVG = ({ className = 'w-24 h-24', color = '#d4af37' }) => (
  <svg className={className} viewBox="0 0 120 120" style={{ color }} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 30 Q50 50 40 70 Q50 80 40 90" />
    <path d="M80 30 Q70 50 80 70 Q70 80 80 90" />
  </svg>
);

const BraceletSVG = ({ className = 'w-24 h-24', color = '#d4af37' }) => (
  <svg className={className} viewBox="0 0 120 120" style={{ color }} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="60" cy="60" r="40" />
    <path d="M20 60 L100 60" strokeDasharray="5,5" />
  </svg>
);

export default function GaleneStore() {
  'use client';

  const supabase = createClientComponentClient();

  const T = {
    bg: '#f8f9fa',
    ink: '#212529',
    gold: '#d4af37',
    accent: '#ffffff',
  };

  const productSVGs = {
    1: RingSVG,
    2: NecklaceSVG,
    3: EarringsSVG,
    4: BraceletSVG,
  };

  const fallbackProducts = [
    {
      id: 1,
      name: 'Anel Clássico',
      price: 299.90,
      description: 'Elegante anel de ouro 18k com design atemporal.',
      svg: RingSVG,
    },
    {
      id: 2,
      name: 'Colar Delicado',
      price: 499.90,
      description: 'Colar fino com pingente de diamante brilhante.',
      svg: NecklaceSVG,
    },
    {
      id: 3,
      name: 'Brincos de Argola',
      price: 399.90,
      description: 'Argolas douradas modernas e versáteis.',
      svg: EarringsSVG,
    },
    {
      id: 4,
      name: 'Pulseira Tennis',
      price: 599.90,
      description: 'Pulseira com diamantes em linha tennis clássica.',
      svg: BraceletSVG,
    },
  ];

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQty, setSelectedQty] = useState(1);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolder: '',
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, description')
          .order('id', { ascending: true });

        if (error || !data?.length) {
          console.warn('Using fallback products:', error?.message);
          setProducts(fallbackProducts);
        } else {
          const enriched = data.map((p) => ({
            ...p,
            price: parseFloat(p.price),
            svg: productSVGs[p.id] || RingSVG,
          }));
          setProducts(enriched);
        }
      } catch (err) {
        console.warn('Supabase error, using fallback:', err);
        setProducts(fallbackProducts);
      }
    }
    loadProducts();
  }, []);

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const addToCart = (product, options = {}, qty = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (p) => p.id === product.id && p.options?.size === options?.size
      );
      if (existingIdx > -1) {
        const newCart = [...prev];
        newCart[existingIdx] = {
          ...newCart[existingIdx],
          qty: newCart[existingIdx].qty + qty,
        };
        return newCart;
      }
      return [...prev, { ...product, options, qty }];
    });
  };

  const updateCartQty = (id, options, newQty) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (p) => p.id === id && p.options?.size === options?.size
      );
      if (idx === -1) return prev;
      const newCart = [...prev];
      if (newQty <= 0) {
        newCart.splice(idx, 1);
      } else {
        newCart[idx] = { ...newCart[idx], qty: newQty };
      }
      return newCart;
    });
  };

  const CartList = ({ showControls = true, onUpdateQty }) => (
    <>
      {cart.length === 0 ? (
        <p
          className="text-center py-8 text-gray-500"
          style={{ color: T.ink + '80' }}
        >
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          {cart.map((item) => {
            const key = `${item.id}-${item.options?.size || 'default'}`;
            return (
              <div
                key={key}
                className="flex items-center gap-4 p-4 mb-4 rounded-lg border"
                style={{
                  borderColor: T.gold,
                  backgroundColor: T.accent,
                }}
              >
                <item.svg className="w-16 h-16 flex-shrink-0" style={{ color: T.gold }} />
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-semibold truncate"
                    style={{ color: T.ink }}
                  >
                    {item.name}
                  </h4>
                  {item.options?.size && (
                    <p
                      className="text-sm opacity-75"
                      style={{ color: T.ink }}
                    >
                      Tamanho: {item.options.size}
                    </p>
                  )}
                  <p
                    className="text-sm opacity-75"
                    style={{ color: T.ink }}
                  >
                    R$ {(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
                {showControls && onUpdateQty && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onUpdateQty(item.id, item.options, item.qty - 1)
                      }
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-mono font-bold">
                      {item.qty}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQty(item.id, item.options, item.qty + 1)
                      }
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <div
            className="text-2xl font-bold mt-6 text-right"
            style={{ color: T.ink }}
          >
            Total: R$ {getTotal().toFixed(2)}
          </div>
        </>
      )}
    </>
  );

  const nextCheckoutStep = async () => {
    if (checkoutStep < 2) {
      setCheckoutStep((c) => c + 1);
    } else {
      try {
        const order = {
          items: cart.map((item) => ({
            ...item,
            subtotal: item.price * item.qty,
          })),
          total: getTotal(),
          shipping: shippingInfo,
          payment: paymentInfo,
        };
        const { error } = await supabase.from('orders').insert([order]);
        if (error) throw error;
        alert('Pedido realizado com sucesso!');
      } catch (error) {
        console.error('Erro no Supabase:', error);
        alert('Pedido simulado com sucesso! (Supabase opcional)');
      }
      setCart([]);
      setShowCheckout(false);
      setCheckoutStep(0);
    }
  };

  const prevCheckoutStep = () => {
    setCheckoutStep((c) => Math.max(0, c - 1));
  };

  return (
    <div
      className="min-h-screen p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: T.bg, color: T.ink }}
    >
      <header
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        style={{ color: T.ink }}
      >
        Galene Store
      </header>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer p-6 rounded-xl border hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-[1.02]"
                style={{
                  backgroundColor: T.accent,
                  borderColor: T.gold,
                }}
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedSize('M');
                  setSelectedQty(1);
                  setShowProductModal(true);
                }}
              >
                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center p-4">
                  <product.svg style={{ color: T.gold }} />
                </div>
                <h3
                  className="font-bold text-xl mb-3 text-center leading-tight"
                  style={{ color: T.ink }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-2xl font-bold text-center mb-6"
                  style={{ color: T.gold }}
                >
                  R$ {product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </main>

        <aside className="lg:w-80 w-full lg:sticky lg:top-24 self-start lg:block hidden h-fit">
          <div
            className="p-6 rounded-2xl shadow-xl"
            style={{ backgroundColor: T.accent }}
          >
            <h2
              className="text-2xl font-bold mb-6 flex items-center gap-2"
              style={{ color: T.ink }}
            >
              Carrinho ({cart.length})
            </h2>
            <CartList showControls={true} onUpdateQty={updateCartQty} />
            {cart.length > 0 && (
              <button
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold transition-all"
                onClick={() => setShowCheckout(true)}
              >
                Ir para Checkout
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* Mobile Cart Button */}
      {cart.length > 0 && (
        <button
          className="fixed bottom-6 right-6 lg:hidden w-20 h-20 rounded-full shadow-2xl flex items-center justify-center text-2xl font-bold shadow-lg backdrop-blur-sm z-30"
          style={{ backgroundColor: T.gold, color: T.bg }}
          onClick={() => setShowCartModal(true)}
        >
          🛒<span className="text-xs ml-1">{cart.length}</span>
        </button>
      )}

      {/* Product Selection Modal */}
      {showProductModal && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowProductModal(false)}
        >
          <div
            className="max-w-md w-full max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl"
            style={{ backgroundColor: T.bg }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 text-2xl"
              style={{ color: T.ink }}
              onClick={() => setShowProductModal(false)}
            >
              ×
            </button>
            <div className="w-48 h-48 mx-auto mb-8 flex items-center justify-center p-6">
              <selectedProduct.svg style={{ color: T.gold }} />
            </div>
            <h2
              className="text-3xl font-bold mb-4 text-center"
              style={{ color: T.ink }}
            >
              {selectedProduct.name}
            </h2>
            <p
              className="mb-8 text-center text-lg leading-relaxed"
              style={{ color: T.ink }}
            >
              {selectedProduct.description}
            </p>
            <div className="mb-8">
              <label
                className="block mb-4 font-semibold"
                style={{ color: T.ink }}
              >
                Tamanho:
              </label>
              <select
                className="w-full p-4 border-2 rounded-xl text-lg"
                style={{ borderColor: T.gold, backgroundColor: T.accent }}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option>P</option>
                <option>M</option>
                <option>G</option>
              </select>
            </div>
            <div className="flex gap-4 mb-8">
              <label
                className="flex-1"
                style={{ color: T.ink }}
              >
                Quantidade:
              </label>
              <input
                type="number"
                min="1"
                className="flex-1 p-4 border-2 rounded-xl text-center text-2xl font-mono"
                style={{ borderColor: T.gold, backgroundColor: T.accent }}
                value={selectedQty}
                onChange={(e) => setSelectedQty(Math.max(1, +e.target.value))}
              />
            </div>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl text-xl font-bold transition-all shadow-lg"
              onClick={() => {
                addToCart(selectedProduct, { size: selectedSize }, selectedQty);
                setShowProductModal(false);
              }}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      )}

      {/* Mobile Cart Modal */}
      {showCartModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex"
          onClick={() => setShowCartModal(false)}
        >
          <div
            className="bg-white w-full h-full p-6 sm:p-8 overflow-y-auto rounded-t-3xl sm:rounded-none sm:w-96"
            style={{ backgroundColor: T.bg }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 pb-6 border-b-2" style={{ borderColor: T.gold }}>
              <h2
                className="text-3xl font-bold"
                style={{ color: T.ink }}
              >
                Carrinho
              </h2>
              <button
                className="text-3xl"
                style={{ color: T.ink }}
                onClick={() => setShowCartModal(false)}
              >
                ×
              </button>
            </div>
            <CartList showControls={true} onUpdateQty={updateCartQty} />
            {cart.length > 0 && (
              <button
                className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold transition-all shadow-lg"
                onClick={() => {
                  setShowCartModal(false);
                  setShowCheckout(true);
                }}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center p-4"
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
            style={{ backgroundColor: T.bg }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-8 border-b-2 flex justify-between items-center"
              style={{ borderColor: T.gold }}
            >
              <h2
                className="text-3xl font-bold"
                style={{ color: T.ink }}
              >
                Checkout - Etapa {checkoutStep + 1} de 3
              </h2>
              <button
                className="text-3xl hover:scale-110 transition"
                style={{ color: T.ink }}
                onClick={() => setShowCheckout(false)}
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              {checkoutStep === 0 && (
                <div>
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{ color: T.ink }}
                  >
                    Revisar Carrinho
                  </h3>
                  <CartList showControls={false} />
                </div>
              )}
              {checkoutStep === 1 && (
                <div>
                  <h3
                    className="text-2xl font-bold mb-8"
                    style={{ color: T.ink }}
                  >
                    Informações de Envio
                  </h3>
                  <div className="space-y-4">
                    <input
                      placeholder="Nome completo"
                      className="w-full p-4 border-2 rounded-xl text-lg"
                      style={{ borderColor: T.gold, backgroundColor: T.accent }}
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                    />
                    <input
                      placeholder="Endereço"
                      className="w-full p-4 border-2 rounded-xl text-lg"
                      style={{ borderColor: T.gold, backgroundColor: T.accent }}
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="Cidade"
                        className="p-4 border-2 rounded-xl text-lg"
                        style={{ borderColor: T.gold, backgroundColor: T.accent }}
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                      />
                      <input
                        placeholder="Estado (UF)"
                        className="p-4 border-2 rounded-xl text-lg"
                        style={{ borderColor: T.gold, backgroundColor: T.accent }}
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="CEP"
                        className="p-4 border-2 rounded-xl text-lg"
                        style={{ borderColor: T.gold, backgroundColor: T.accent }}
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo((prev) => ({
                            ...prev,
                            zipCode: e.target.value,
                          }))
                        }
                      />
                      <input
                        placeholder="Telefone"
                        className="p-4 border-2 rounded-xl text-lg"
                        style={{ borderColor: T.gold, backgroundColor: T.accent }}
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              {checkoutStep === 2 && (
                <div>
                  <h3
                    className="text-2xl font-bold mb-8"
                    style={{ color: T.ink }}
                  >
                    Dados do Pagamento
                  </h3>
                  <div className="space-y-4">
                    <input
                      placeholder="Número do cartão (**** **** **** ****)"
                      className="w-full p-4 border-2 rounded-xl text-lg"
                      style={{ borderColor: T.gold, backgroundColor: T.accent }}
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo((prev) => ({
                          ...prev,
                          cardNumber: e.target.value,
                        }))
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="Validade (MM/AA)"
                        className="p-4 border-2 rounded-xl text-lg"
                        style={{ borderColor: T.gold, backgroundColor: T.accent }}
                        value={paymentInfo.expiry}
                        onChange={(e) =>
                          setPaymentInfo((prev) => ({
                            ...prev,
                            expiry: e.target.value,
                          }))
                        }
                      />
                      <input
                        placeholder="CVV"
                        className="p-4 border-2 rounded-xl text-lg"
                        style={{ borderColor: T.gold, backgroundColor: T.accent }}
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo((prev) => ({
                            ...prev,
                            cvv: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <input
                      placeholder="Nome no cartão"
                      className="w-full p-4 border-2 rounded-xl text-lg"
                      style={{ borderColor: T.gold, backgroundColor: T.accent }}
                      value={paymentInfo.cardHolder}
                      onChange={(e) =>
                        setPaymentInfo((prev) => ({
                          ...prev,
                          cardHolder: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <div
              className="p-8 border-t-2 flex gap-4"
              style={{ borderColor: T.gold }}
            >
              {checkoutStep > 0 && (
                <button
                  className="flex-1 bg-gray-300 hover:bg-gray-400 py-4 rounded-xl font-semibold transition"
                  onClick={prevCheckoutStep}
                >
                  Anterior
                </button>
              )}
              <button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg"
                onClick={nextCheckoutStep}
              >
                {checkoutStep < 2 ? 'Próximo' : 'Finalizar Pedido'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
