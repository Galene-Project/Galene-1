'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

// --- THEME ---
const T = {
  ink: '#1a1a1a',
  gold: '#d4af37',
  ruby: '#c41e3a',
  jade: '#00a86b',
  bg1: '#f9f7f4',
  bg2: '#ede9e4',
  bg3: '#e0dbd2',
  border: '#d4cfc6',
  text: '#1a1a1a',
  textLight: '#666',
  success: '#4caf50',
  error: '#f44336',
};

const fmt = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);

const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

// --- COLOR MAP ---
const COR_HEX = {
  Preto: '#000000',
  Branco: '#FFFFFF',
  OffWhite: '#F5F5F0',
  Vinho: '#722F37',
  Marinho: '#001F3F',
  Nude: '#E8B4A8',
  Bege: '#D4C5B9',
  Caramelo: '#C4A57B',
  Rosa: '#FFB6C1',
  Vermelho: '#FF0000',
  Laranja: '#FF8C00',
  Amarelo: '#FFD700',
  Azul: '#0000FF',
  Verde: '#008000',
  Cinza: '#808080',
  Grafite: '#2F4F4F',
  Marrom: '#8B4513',
  Jeans: '#1E90FF',
  Colorido: '#FF69B4',
  Lilas: '#C8A2C8',
  Coral: '#FF7F50',
  Musgo: '#6B8E23',
  Terracota: '#E2725B',
};

// --- SIZE ARRAYS ---
const SIZES_PADRAO = ['P', 'M', 'G', 'GG'];
const SIZES_PLUS = ['P', 'M', 'G', 'GG', 'XGG'];
const SIZES_UNICO = ['Único'];

// --- CATEGORIES ---
const CATS = [
  { id: 'destaques', label: 'Destaques', icon: '⭐' },
  { id: 'vestidos', label: 'Vestidos', icon: '👗' },
  { id: 'moletinho', label: 'Moletinho', icon: '🧥' },
  { id: 'lanzinha', label: 'Lanzinha', icon: '👕' },
  { id: 'conjuntos', label: 'Conjuntos', icon: '👔' },
  { id: 'blusas', label: 'Blusas', icon: '👚' },
  { id: 'regatas', label: 'Regatas', icon: '🎽' },
  { id: 'cardigans', label: 'Cardigans', icon: '🧶' },
  { id: 'calcas', label: 'Calças', icon: '👖' },
  { id: 'macacoes', label: 'Macacões', icon: '🩱' },
];

// --- SVG SILHOUETTES ---
const Sil = ({ cat }) => {
  const silhuetas = {
    vestidos: <svg viewBox="0 0 100 200" style={{ width: '60px', height: '100px', opacity: 0.3 }}><path d="M50 20 L40 50 L30 80 L25 150 L75 150 L70 80 L60 50 Z" fill={T.ink} /></svg>,
    moletinho: <svg viewBox="0 0 100 200" style={{ width: '60px', height: '100px', opacity: 0.3 }}><rect x="20" y="30" width="60" height="80" rx="5" fill={T.ink} /></svg>,
    blusas: <svg viewBox="0 0 100 200" style={{ width: '60px', height: '100px', opacity: 0.3 }}><path d="M30 40 L30 100 L70 100 L70 40 M40 40 L40 60 M60 40 L60 60" stroke={T.ink} strokeWidth="2" fill="none" /></svg>,
  };
  return silhuetas[cat] || <div style={{ width: '60px', height: '100px', opacity: 0.3, background: T.border }} />;
};

// --- MODAL PRODUTO ---
const ModalProd = ({ prod, onClose, onAdd }) => {
  const [cor, setCor] = useState(prod.cores?.[0] || '');
  const [tam, setTam] = useState('');
  const [qtd, setQtd] = useState(1);
  const [selecionados, setSelecionados] = useState([]);

  const tamanhos = prod.tamanhos || SIZES_PADRAO;

  const handleAdd = () => {
    if (!cor || !tam) {
      alert('Selecione cor e tamanho');
      return;
    }
    const key = `${prod.id}-${cor}-${tam}`;
    const existe = selecionados.find((s) => s.key === key);
    if (existe) {
      setSelecionados(selecionados.map((s) => (s.key === key ? { ...s, qtd: s.qtd + qtd } : s)));
    } else {
      setSelecionados([...selecionados, { key, prodId: prod.id, nome: prod.nome, cor, tam, qtd, preco: prod.preco }]);
    }
    setQtd(1);
  };

  const handleRemove = (key) => {
    setSelecionados(selecionados.filter((s) => s.key !== key));
  };

  const handleConfirm = () => {
    if (selecionados.length === 0) {
      alert('Adicione pelo menos um item');
      return;
    }
    onAdd(selecionados);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', maxWidth: '500px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>{prod.cat} - {prod.sub}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{prod.nome}</h3>
        <p style={{ margin: '0 0 20px 0', color: T.textLight, fontSize: '14px' }}>{prod.desc}</p>
        <p style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: T.ruby }}>{fmt(prod.preco)}</p>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Cor: {cor}</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {prod.cores?.map((c) => (
              <button
                key={c}
                onClick={() => setCor(c)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: COR_HEX[c] || '#ccc',
                  border: cor === c ? `3px solid ${T.ink}` : '2px solid #ddd',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                title={c}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Tamanho: {tam}</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tamanhos.map((t) => (
              <button
                key={t}
                onClick={() => setTam(t)}
                style={{
                  padding: '8px 16px',
                  border: tam === t ? `2px solid ${T.ink}` : '1px solid #ddd',
                  background: tam === t ? T.bg2 : 'white',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Quantidade</label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button onClick={() => setQtd(Math.max(1, qtd - 1))} style={{ padding: '8px 12px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '4px' }}>−</button>
            <input type="number" value={qtd} onChange={(e) => setQtd(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }} />
            <button onClick={() => setQtd(qtd + 1)} style={{ padding: '8px 12px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '4px' }}>+</button>
          </div>
        </div>

        <div style={{ marginBottom: '20px', maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
          {selecionados.length === 0 ? (
            <p style={{ margin: 0, color: T.textLight, fontSize: '14px' }}>Nenhum item selecionado</p>
          ) : (
            selecionados.map((s) => (
              <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>
                <span>{s.cor} / {s.tam} x{s.qtd}</span>
                <button onClick={() => handleRemove(s.key)} style={{ background: 'none', border: 'none', color: T.error, cursor: 'pointer', fontSize: '16px' }}>✕</button>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>Cancelar</button>
          <button onClick={handleAdd} style={{ flex: 1, padding: '12px', border: 'none', background: T.gold, cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>Adicionar</button>
          <button onClick={handleConfirm} style={{ flex: 1, padding: '12px', border: 'none', background: T.jade, color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

// --- CARD DESTAQUE ---
const CardDest = ({ prod, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'white',
      borderRadius: '8px',
      padding: '16px',
      cursor: 'pointer',
      border: `1px solid ${T.border}`,
      transition: 'all 0.3s',
      textAlign: 'center',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
  >
    <Sil cat={prod.cat} />
    <h3 style={{ margin: '12px 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>{prod.nome}</h3>
    <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: T.textLight }}>{prod.cat} - {prod.sub}</p>
    <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: T.ruby, fontWeight: 'bold' }}>{fmt(prod.preco)}</p>
    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
      {prod.cores?.slice(0, 5).map((c) => (
        <div key={c} style={{ width: '20px', height: '20px', borderRadius: '50%', background: COR_HEX[c] || '#ccc', border: '1px solid #ddd' }} />
      ))}
    </div>
    <button style={{ width: '100%', padding: '8px', background: T.gold, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Selecionar</button>
  </div>
);

// --- CARD NORMAL ---
const Card = ({ prod, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'white',
      borderRadius: '8px',
      padding: '12px',
      cursor: 'pointer',
      border: `1px solid ${T.border}`,
      transition: 'all 0.3s',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)')}
    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
  >
    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>{prod.nome}</h4>
    <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: T.textLight }}>{prod.cat}</p>
    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: T.ruby, fontWeight: 'bold' }}>{fmt(prod.preco)}</p>
    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', marginBottom: '8px' }}>
      {prod.cores?.slice(0, 4).map((c) => (
        <div key={c} style={{ width: '16px', height: '16px', borderRadius: '50%', background: COR_HEX[c] || '#ccc', border: '1px solid #ddd' }} />
      ))}
    </div>
    <button style={{ width: '100%', padding: '6px', background: T.gold, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Selecionar</button>
  </div>
);

// --- CARRINHO ---
const Carrinho = ({ cart, onRemove, onFinish, onBack }) => {
  const [step, setStep] = useState(1);
  const [dados, setDados] = useState({ razaoSocial: '', cnpj: '', email: '', telefone: '', endereco: '', cidade: '' });
  const [pagamento, setPagamento] = useState('pix');
  const [sucesso, setSucesso] = useState(false);

  const totalPecas = cart.reduce((sum, item) => sum + item.qtd, 0);
  const totalValor = cart.reduce((sum, item) => sum + item.preco * item.qtd, 0);

  if (sucesso) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', background: T.bg1, minHeight: '100vh' }}>
        <h2 style={{ color: T.success, marginBottom: '20px' }}>✓ Pedido Confirmado!</h2>
        <p style={{ marginBottom: '20px', color: T.textLight }}>Você receberá um contato em breve.</p>
        <button onClick={() => { setSucesso(false); setStep(1); onBack(); }} style={{ padding: '12px 24px', background: T.jade, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Voltar ao Catálogo</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', background: T.bg1, minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '12px' }}>
          <div style={{ textAlign: 'center', opacity: step >= 1 ? 1 : 0.5 }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: step >= 1 ? T.jade : T.border, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 'bold' }}>1</div>
            <span>Itens</span>
          </div>
          <div style={{ textAlign: 'center', opacity: step >= 2 ? 1 : 0.5 }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: step >= 2 ? T.jade : T.border, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 'bold' }}>2</div>
            <span>Dados</span>
          </div>
          <div style={{ textAlign: 'center', opacity: step >= 3 ? 1 : 0.5 }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: step >= 3 ? T.jade : T.border, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 'bold' }}>3</div>
            <span>Pagamento</span>
          </div>
        </div>

        {step === 1 && (
          <div>
            <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Meu Pedido</h2>
            {cart.length === 0 ? (
              <p style={{ color: T.textLight }}>Nenhum item no carrinho</p>
            ) : (
              <>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ background: 'white', padding: '12px', marginBottom: '10px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                    <div>
                      <strong>{item.nome}</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: T.textLight }}>{item.cor} / {item.tam} x{item.qtd}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{fmt(item.preco * item.qtd)}</p>
                      <button onClick={() => onRemove(idx)} style={{ background: 'none', border: 'none', color: T.error, cursor: 'pointer', fontSize: '12px' }}>Remover</button>
                    </div>
                  </div>
                ))}
                <div style={{ background: T.bg2, padding: '16px', borderRadius: '4px', marginTop: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span>Total de peças:</span>
                    <strong>{totalPecas}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', color: T.ruby }}>
                    <span>Total:</span>
                    <span>{fmt(totalValor)}</span>
                  </div>
                  {totalPecas < 6 && <p style={{ margin: '12px 0 0 0', color: T.error, fontSize: '12px' }}>⚠ Mínimo de 6 peças</p>}
                </div>
                <button onClick={() => totalPecas >= 6 && setStep(2)} disabled={totalPecas < 6} style={{ width: '100%', padding: '12px', background: totalPecas >= 6 ? T.jade : T.border, color: totalPecas >= 6 ? 'white' : T.textLight, border: 'none', borderRadius: '4px', cursor: totalPecas >= 6 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>Continuar</button>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Dados da Compra</h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Razão Social *</label>
              <input type="text" value={dados.razaoSocial} onChange={(e) => setDados({ ...dados, razaoSocial: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>CNPJ/CPF *</label>
              <input type="text" value={dados.cnpj} onChange={(e) => setDados({ ...dados, cnpj: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>E-mail *</label>
              <input type="email" value={dados.email} onChange={(e) => setDados({ ...dados, email: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Telefone/WhatsApp *</label>
              <input type="tel" value={dados.telefone} onChange={(e) => setDados({ ...dados, telefone: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Endereço</label>
              <input type="text" value={dados.endereco} onChange={(e) => setDados({ ...dados, endereco: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Cidade/Estado</label>
              <input type="text" value={dados.cidade} onChange={(e) => setDados({ ...dados, cidade: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Voltar</button>
              <button onClick={() => dados.razaoSocial && dados.cnpj && dados.email && dados.telefone ? setStep(3) : alert('Preencha os campos obrigatórios')} style={{ flex: 1, padding: '12px', background: T.jade, color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Continuar</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Pagamento</h2>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', cursor: 'pointer', fontSize: '14px' }}>
                <input type="radio" name="pagamento" value="pix" checked={pagamento === 'pix'} onChange={(e) => setPagamento(e.target.value)} style={{ marginRight: '8px' }} />
                PIX
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                <input type="radio" name="pagamento" value="cartao" checked={pagamento === 'cartao'} onChange={(e) => setPagamento(e.target.value)} style={{ marginRight: '8px' }} />
                Cartão de Crédito
              </label>
            </div>

            {pagamento === 'pix' && (
              <div style={{ background: T.bg2, padding: '16px', borderRadius: '4px', marginBottom: '20px' }}>
                <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 'bold' }}>Chave PIX: galene@email.com</p>
                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: T.textLight }}>Total: {fmt(totalValor)}</p>
                <p style={{ margin: 0, fontSize: '11px', color: T.textLight }}>Após confirmar, você receberá instruções de pagamento.</p>
              </div>
            )}

            {pagamento === 'cartao' && (
              <div style={{ marginBottom: '20px' }}>
                <input type="text" placeholder="Número do Cartão" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
                <input type="text" placeholder="Nome do Titular" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" placeholder="MM/AA" style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
                  <input type="text" placeholder="CVV" style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Voltar</button>
              <button onClick={() => { setSucesso(true); onFinish({ ...dados, pagamento, itens: cart, total: totalValor }); }} style={{ flex: 1, padding: '12px', background: T.ruby, color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Confirmar Pedido</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SIDEBAR ---
const Sidebar = ({ cat, setCat, mobile, onClose }) => (
  <div style={{
    position: mobile ? 'fixed' : 'sticky',
    top: mobile ? 0 : '80px',
    left: 0,
    width: mobile ? '100%' : '200px',
    height: mobile ? '100vh' : 'auto',
    background: mobile ? 'white' : T.bg2,
    padding: mobile ? '20px' : '20px 0',
    zIndex: mobile ? 999 : 'auto',
    overflowY: mobile ? 'auto' : 'visible',
  }}>
    {mobile && <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>}
    <h3 style={{ margin: mobile ? '30px 0 20px 0' : '0 0 20px 0', fontSize: '14px', fontWeight: 'bold', paddingLeft: mobile ? 0 : '20px' }}>CATEGORIAS</h3>
    {CATS.map((c) => (
      <button
        key={c.id}
        onClick={() => { setCat(c.id); if (mobile) onClose(); }}
        style={{
          display: 'block',
          width: '100%',
          padding: '12px 20px',
          border: 'none',
          background: cat === c.id ? T.gold : 'transparent',
          color: cat === c.id ? 'white' : T.ink,
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '13px',
          fontWeight: cat === c.id ? 'bold' : 'normal',
          transition: 'all 0.2s',
        }}
      >
        {c.icon} {c.label}
      </button>
    ))}
    <div style={{ padding: '20px', marginTop: '20px', background: T.bg1, borderRadius: '4px', margin: mobile ? '20px' : '20px' }}>
      <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>CONDIÇÕES</p>
      <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: T.textLight }}>✓ Mínimo 6 peças</p>
      <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: T.textLight }}>✓ PIX e Cartão</p>
      <p style={{ margin: 0, fontSize: '11px', color: T.textLight }}>✓ Frete à combinar</p>
    </div>
  </div>
);

// --- APP PRINCIPAL ---
export default function GaleneStore() {
  // ===== NOVO: Estados para Supabase =====
  const [produtos, setProdutos] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [erroProdutos, setErroProdutos] = useState(null);
  // ===== FIM NOVO =====

  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(null);
  const [view, setView] = useState('catalogo');
  const [cat, setCat] = useState('destaques');
  const [toast, setToast] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;

  // ===== NOVO: Buscar produtos do Supabase =====
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoadingProdutos(true);
        const { data, error } = await supabase
          .from('produtos')
          .select('*');
        
        if (error) throw error;
        setProdutos(data || []);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setErroProdutos(err.message);
      } finally {
        setLoadingProdutos(false);
      }
    };

    fetchProdutos();
  }, []);
  // ===== FIM NOVO =====

  // Mostrar carregamento
  if (loadingProdutos) {
    return <div style={{ padding: '20px', textAlign: 'center', background: T.bg1, minHeight: '100vh' }}>Carregando produtos...</div>;
  }

  // Mostrar erro
  if (erroProdutos) {
    return <div style={{ padding: '20px', color: T.error, background: T.bg1, minHeight: '100vh' }}>Erro: {erroProdutos}</div>;
  }

  // Mostrar se vazio
  if (produtos.length === 0) {
    return <div style={{ padding: '20px', background: T.bg1, minHeight: '100vh' }}>Nenhum produto encontrado</div>;
  }

  const handleAddCart = (items) => {
    setCart([...cart, ...items]);
    setToast('✓ Adicionado ao carrinho');
    setTimeout(() => setToast(null), 2000);
  };

  const handleRemoveCart = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  const handleFinishCart = (pedido) => {
    console.log('Pedido:', pedido);
    setCart([]);
    setView('catalogo');
  };

  const filtrados = cat === 'destaques' ? produtos.filter((p) => p.destaque) : produtos.filter((p) => p.cat?.toLowerCase() === cat);

  return (
    <div style={{ background: T.bg1, minHeight: '100vh' }}>
      {/* HEADER */}
      <div style={{ background: 'white', borderBottom: `1px solid ${T.border}`, padding: '12px 20px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: T.ink }}>GALENE</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {!isMobile && <button onClick={() => setView('catalogo')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: view === 'catalogo' ? T.ink : T.textLight }}>CATÁLOGO</button>}
            <button onClick={() => setView('carrinho')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: view === 'carrinho' ? T.ruby : T.textLight }}>
              PEDIDO {cart.length > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: T.ruby, color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>{cart.length}</span>}
            </button>
            {isMobile && <button onClick={() => setDrawer(!drawer)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>☰</button>}
          </div>
        </div>
      </div>

      {view === 'catalogo' ? (
        <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto' }}>
          {!isMobile && <Sidebar cat={cat} setCat={setCat} mobile={false} onClose={() => {}} />}
          {isMobile && drawer && <Sidebar cat={cat} setCat={setCat} mobile={true} onClose={() => setDrawer(false)} />}

          <div style={{ flex: 1, padding: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', textTransform: 'capitalize' }}>{CATS.find((c) => c.id === cat)?.label || 'Produtos'}</h2>

            {filtrados.length === 0 ? (
              <p style={{ color: T.textLight }}>Nenhum produto nesta categoria</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : cat === 'destaques' ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
                gap: '16px',
              }}>
                {filtrados.map((prod) => (
                  cat === 'destaques' ? (
                    <CardDest key={prod.id} prod={prod} onClick={() => setModal(prod)} />
                  ) : (
                    <Card key={prod.id} prod={prod} onClick={() => setModal(prod)} />
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Carrinho cart={cart} onRemove={handleRemoveCart} onFinish={handleFinishCart} onBack={() => setView('catalogo')} />
      )}

      {modal && <ModalProd prod={modal} onClose={() => setModal(null)} onAdd={handleAddCart} />}

      {toast && <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: T.success, color: 'white', padding: '12px 20px', borderRadius: '4px', zIndex: 1001 }}>{toast}</div>}
    </div>
  );
}
