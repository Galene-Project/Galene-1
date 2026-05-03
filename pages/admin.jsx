import { useState, useEffect } from "react";

const T = {
  bg: "#FAFAF8", bg2: "#F4F1EC", bg3: "#EDE8E0", panel: "#FFFFFF",
  border: "#E0D8CC", border2: "#C8BFB0",
  gold: "#B8935A", goldDk: "#8A6A38", goldLt: "#D4B07A", goldXlt: "#F5EDD8",
  ink: "#1A1714", ink2: "#3A3530", ink3: "#6A6058", ink4: "#9A9088",
  ruby: "#8B3A3A", jade: "#3A6B4A",
};

const SENHA_ADMIN = "galene2025";

const CATS_VALIDAS = ["Vestidos","Moletinho","Lanzinha","Conjuntos","Blusas","Regatas","Cardigans","Calcas","Macacoes"];
const SIZES_PADRAO = ["P","M","G","GG"];
const SIZES_PLUS = ["P","M","G","GG","XGG"];
const SIZES_UNICO = ["Unico"];

const COR_HEX = {
  Preto: "#1A1A1A", Branco: "#F5F2EE", OffWhite: "#EEEADE",
  Vinho: "#6B2737", Marinho: "#1E3A5F", Nude: "#C4A882",
  Bege: "#C8B89A", Caramelo: "#B5743A", Rosa: "#E8A0A0",
  Vermelho: "#8B2020", Laranja: "#C97A3A", Amarelo: "#D4A82A",
  Azul: "#3A6B9E", Verde: "#4A6B3A", Cinza: "#8A8A8A",
  Grafite: "#484848", Marrom: "#6B4226", Jeans: "#3A5A7A",
  Colorido: "#B8935A", Lilas: "#9B7EC8", Coral: "#E07A5F",
  Musgo: "#5C6B3A", Terracota: "#C16A3A",
};
const TODAS_CORES = Object.keys(COR_HEX);

const PRODUTOS_DEFAULT = [
  { id: 1, nome: "Vestido Bella", cat: "Vestidos", sub: "Viscolaycra", preco: 40, destaque: true, tag: "Mais Vendido", cores: ["Preto","Branco","Vinho","Nude","Marinho"], tamanhos: SIZES_PADRAO, desc: "Vestido basico em viscolaycra com caimento elegante.", foto: "" },
  { id: 2, nome: "Conjunto Dallas", cat: "Conjuntos", sub: "Viscolaycra", preco: 75, destaque: true, tag: "Mais Vendido", cores: ["Preto","Nude","Marinho","Caramelo"], tamanhos: SIZES_PADRAO, desc: "Conjunto cropped + saia com caimento impecavel.", foto: "" },
  { id: 3, nome: "Macacao Kami", cat: "Macacoes", sub: "Viscolaycra", preco: 79, destaque: true, tag: "Destaque", cores: ["Preto","Nude","Caramelo","Marinho","Vinho"], tamanhos: SIZES_PADRAO, desc: "Macacao elegante para looks completos e sofisticados.", foto: "" },
  { id: 4, nome: "Vestido Eva", cat: "Vestidos", sub: "Viscolaycra", preco: 40, destaque: false, tag: null, cores: ["Preto","Caramelo","Verde","Azul"], tamanhos: SIZES_PADRAO, desc: "Corte reto com tecido leve e fluido.", foto: "" },
  { id: 5, nome: "Vestido Safira", cat: "Vestidos", sub: "Viscolaycra", preco: 60, destaque: true, tag: "Novo", cores: ["Marinho","Vinho","Preto","Grafite"], tamanhos: SIZES_PADRAO, desc: "Modelagem sofisticada para uso day to night.", foto: "" },
  { id: 6, nome: "Vestido Naomi", cat: "Vestidos", sub: "Viscolaycra", preco: 70, destaque: false, tag: null, cores: ["Preto","Nude","Rosa","Bege"], tamanhos: SIZES_PADRAO, desc: "Decote elegante com tecido de alta qualidade.", foto: "" },
  { id: 7, nome: "Vestido Mara", cat: "Vestidos", sub: "Viscolaycra", preco: 68, destaque: false, tag: null, cores: ["Vinho","Marrom","Terracota","Preto"], tamanhos: SIZES_PADRAO, desc: "Vestido midi com textura leve e caimento perfeito.", foto: "" },
  { id: 8, nome: "Vestido Ariel", cat: "Vestidos", sub: "Viscolaycra", preco: 70, destaque: true, tag: "Destaque", cores: ["Azul","Verde","Coral","Preto"], tamanhos: SIZES_PADRAO, desc: "Vestido vibrante com modelagem contemporanea.", foto: "" },
  { id: 9, nome: "Vestido Nina", cat: "Vestidos", sub: "Viscolaycra", preco: 85, destaque: true, tag: "Premium", cores: ["Preto","Marinho","Grafite","Vinho"], tamanhos: SIZES_PLUS, desc: "Linha premium com acabamento refinado.", foto: "" },
  { id: 10, nome: "Vestido Lola", cat: "Vestidos", sub: "Viscolaycra", preco: 70, destaque: false, tag: null, cores: ["Nude","Rosa","Caramelo","Branco"], tamanhos: SIZES_PADRAO, desc: "Vestido feminino com tecido macio e confortavel.", foto: "" },
  { id: 22, nome: "Vestido Monica Mol.", cat: "Moletinho", sub: "Moletinho", preco: 75, destaque: true, tag: "Novo", cores: ["Preto","Cinza","Bege","Marinho"], tamanhos: SIZES_PADRAO, desc: "Moletinho premium com caimento relaxado e elegante.", foto: "" },
  { id: 28, nome: "Conjunto Dani", cat: "Conjuntos", sub: "Viscolaycra", preco: 85, destaque: true, tag: "Premium", cores: ["Preto","Vinho","Grafite","Marinho"], tamanhos: SIZES_PADRAO, desc: "Conjunto sofisticado para ocasioes especiais.", foto: "" },
  { id: 33, nome: "Blusa Caja", cat: "Blusas", sub: "Viscolaycra", preco: 35, destaque: false, tag: null, cores: ["Preto","Branco","Nude","Cinza","Azul"], tamanhos: SIZES_PADRAO, desc: "Blusa versatil para compor looks variados.", foto: "" },
  { id: 37, nome: "Regata Ellen", cat: "Regatas", sub: "Viscolaycra", preco: 20, destaque: false, tag: null, cores: ["Preto","Branco","Nude","Cinza","Rosa","Azul"], tamanhos: SIZES_PADRAO, desc: "Regata basica em viscolaycra.", foto: "" },
  { id: 38, nome: "Cardigan Canelado", cat: "Cardigans", sub: "Canelado", preco: 39, destaque: false, tag: null, cores: ["Preto","Bege","Caramelo","Cinza"], tamanhos: SIZES_UNICO, desc: "Cardigan canelado com textura premium.", foto: "" },
  { id: 40, nome: "Calca Pantalona", cat: "Calcas", sub: "Viscolaycra", preco: 40, destaque: false, tag: null, cores: ["Preto","Marinho","Caramelo","Bege","Cinza"], tamanhos: SIZES_PADRAO, desc: "Pantalona fluida com cos elastico confortavel.", foto: "" },
];

const KEY = "galene_produtos_v1";

function loadProdutos() {
  if (typeof window === "undefined") return PRODUTOS_DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return PRODUTOS_DEFAULT;
}

function saveProdutos(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch(e) {}
}

function novoProduto() {
  return {
    id: Date.now(),
    nome: "", cat: "Vestidos", sub: "Viscolaycra",
    preco: "", destaque: false, tag: null,
    cores: [], tamanhos: SIZES_PADRAO,
    desc: "", foto: "",
  };
}

function ModalForm({ prod, onSave, onClose }) {
  const isNew = !prod;
  const [f, setF] = useState(isNew ? novoProduto() : { ...prod });
  const [erros, setErros] = useState({});

  function set(k, v) {
    setF(function(p) { return Object.assign({}, p, { [k]: v }); });
    setErros(function(p) { return Object.assign({}, p, { [k]: null }); });
  }

  function toggleCor(c) {
    set("cores", f.cores.includes(c) ? f.cores.filter(function(x) { return x !== c; }) : f.cores.concat([c]));
  }

  function toggleTam(t) {
    set("tamanhos", f.tamanhos.includes(t) ? f.tamanhos.filter(function(x) { return x !== t; }) : f.tamanhos.concat([t]));
  }

  function validar() {
    var e = {};
    if (!f.nome.trim()) e.nome = "Nome obrigatorio";
    if (!f.preco || isNaN(f.preco) || Number(f.preco) <= 0) e.preco = "Preco invalido";
    if (!f.cores.length) e.cores = "Selecione ao menos 1 cor";
    if (!f.tamanhos.length) e.tamanhos = "Selecione ao menos 1 tamanho";
    if (!f.desc.trim()) e.desc = "Descricao obrigatoria";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validar()) return;
    onSave(Object.assign({}, f, { preco: Number(f.preco) }));
  }

  var overlay = {
    position: "fixed", inset: 0, zIndex: 900,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
  };
  var box = {
    position: "relative", background: T.panel, width: "100%", maxWidth: 580,
    maxHeight: "92vh", overflowY: "auto", borderRadius: 16,
    boxShadow: "0 24px 80px rgba(26,23,20,0.22)",
  };

  return (
    <div style={overlay}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,23,20,0.55)" }} />
      <div style={box}>
        <div style={{ height: 3, background: "linear-gradient(90deg,#8A6A38,#B8935A,#D4B07A,#B8935A,#8A6A38)" }} />
        <div style={{ padding: "24px 28px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontFamily: "Georgia,serif", fontSize: 24, color: T.ink, fontWeight: 600 }}>
              {isNew ? "Novo Produto" : "Editar Produto"}
            </h2>
            <button onClick={onClose} style={{ background: "none", border: "1.5px solid " + T.border, borderRadius: 8, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: T.ink3 }}>x</button>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>Nome *</label>
            <input value={f.nome} onChange={function(e) { set("nome", e.target.value); }}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + (erros.nome ? T.ruby : T.border), borderRadius: 8, fontSize: 13, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box" }} />
            {erros.nome && <div style={{ fontSize: 10, color: T.ruby, marginTop: 3 }}>{erros.nome}</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>Categoria</label>
              <select value={f.cat} onChange={function(e) { set("cat", e.target.value); }}
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + T.border, borderRadius: 8, fontSize: 13, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box" }}>
                {CATS_VALIDAS.map(function(c) { return <option key={c}>{c}</option>; })}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>Sub-categoria</label>
              <input value={f.sub} onChange={function(e) { set("sub", e.target.value); }}
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + T.border, borderRadius: 8, fontSize: 13, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>Preco (R$) *</label>
              <input value={f.preco} onChange={function(e) { set("preco", e.target.value); }} type="number" min="0" step="0.01"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + (erros.preco ? T.ruby : T.border), borderRadius: 8, fontSize: 13, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box" }} />
              {erros.preco && <div style={{ fontSize: 10, color: T.ruby, marginTop: 3 }}>{erros.preco}</div>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>Tag</label>
              <select value={f.tag || ""} onChange={function(e) { set("tag", e.target.value || null); }}
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + T.border, borderRadius: 8, fontSize: 13, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box" }}>
                <option value="">Sem tag</option>
                <option>Mais Vendido</option>
                <option>Novo</option>
                <option>Destaque</option>
                <option>Premium</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>URL da Foto (opcional)</label>
            <input value={f.foto || ""} onChange={function(e) { set("foto", e.target.value); }} placeholder="https://i.imgur.com/exemplo.jpg"
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + T.border, borderRadius: 8, fontSize: 13, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>Descricao *</label>
            <textarea value={f.desc} onChange={function(e) { set("desc", e.target.value); }} rows={3}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid " + (erros.desc ? T.ruby : T.border), borderRadius: 8, fontSize: 13, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
            {erros.desc && <div style={{ fontSize: 10, color: T.ruby, marginTop: 3 }}>{erros.desc}</div>}
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div onClick={function() { set("destaque", !f.destaque); }}
                style={{ width: 40, height: 22, borderRadius: 11, background: f.destaque ? T.gold : T.bg2, border: "1.5px solid " + (f.destaque ? T.gold : T.border), position: "relative", transition: "all .2s", cursor: "pointer" }}>
                <div style={{ position: "absolute", top: 2, left: f.destaque ? 19 : 2, width: 16, height: 16, borderRadius: "50%", background: f.destaque ? "white" : T.ink4, transition: "left .2s" }} />
              </div>
              <span style={{ fontSize: 12, color: T.ink2, fontWeight: 600 }}>Exibir nos Destaques</span>
            </label>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 8 }}>Cores *</label>
            {erros.cores && <div style={{ fontSize: 10, color: T.ruby, marginBottom: 6 }}>{erros.cores}</div>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TODAS_CORES.map(function(c) {
                var sel = f.cores.includes(c);
                return (
                  <button key={c} onClick={function() { toggleCor(c); }}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px 5px 7px", border: "1.5px solid " + (sel ? T.gold : T.border), borderRadius: 20, background: sel ? T.goldXlt : T.panel, cursor: "pointer" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: COR_HEX[c], border: "1px solid rgba(0,0,0,0.1)" }} />
                    <span style={{ fontSize: 11, color: sel ? T.goldDk : T.ink3 }}>{c}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 8 }}>Tamanhos *</label>
            {erros.tamanhos && <div style={{ fontSize: 10, color: T.ruby, marginBottom: 6 }}>{erros.tamanhos}</div>}
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button onClick={function() { set("tamanhos", SIZES_PADRAO); }} style={{ padding: "4px 10px", border: "1px solid " + T.border, borderRadius: 6, background: T.bg2, cursor: "pointer", fontSize: 10, color: T.ink3 }}>P M G GG</button>
              <button onClick={function() { set("tamanhos", SIZES_PLUS); }} style={{ padding: "4px 10px", border: "1px solid " + T.border, borderRadius: 6, background: T.bg2, cursor: "pointer", fontSize: 10, color: T.ink3 }}>P M G GG XGG</button>
              <button onClick={function() { set("tamanhos", SIZES_UNICO); }} style={{ padding: "4px 10px", border: "1px solid " + T.border, borderRadius: 6, background: T.bg2, cursor: "pointer", fontSize: 10, color: T.ink3 }}>Unico</button>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["P","M","G","GG","XGG","Unico"].map(function(t) {
                var sel = f.tamanhos.includes(t);
                return (
                  <button key={t} onClick={function() { toggleTam(t); }}
                    style={{ width: 54, height: 44, background: sel ? T.gold : T.panel, border: "1.5px solid " + (sel ? T.gold : T.border), borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, color: sel ? "white" : T.ink2 }}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose}
              style={{ background: "none", border: "1.5px solid " + T.border, borderRadius: 10, padding: "12px 20px", cursor: "pointer", fontSize: 12, fontWeight: 700, color: T.ink3 }}>
              Cancelar
            </button>
            <button onClick={handleSave}
              style={{ flex: 1, background: T.gold, border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "white", letterSpacing: 1 }}>
              {isNew ? "Criar Produto" : "Salvar Alteracoes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  var [autenticado, setAutenticado] = useState(false);
  var [senhaInput, setSenhaInput] = useState("");
  var [senhaErro, setSenhaErro] = useState(false);
  var [produtos, setProdutos] = useState([]);
  var [modal, setModal] = useState(null);
  var [confirmDel, setConfirmDel] = useState(null);
  var [filtro, setFiltro] = useState("Todos");
  var [toast, setToast] = useState(null);

  useEffect(function() {
    if (autenticado) setProdutos(loadProdutos());
  }, [autenticado]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(function() { setToast(null); }, 3000);
  }

  function handleLogin() {
    if (senhaInput === SENHA_ADMIN) { setAutenticado(true); setSenhaErro(false); }
    else { setSenhaErro(true); }
  }

  function salvar(p) {
    var novo;
    if (modal === "novo") {
      novo = produtos.concat([p]);
      showToast("Produto criado!");
    } else {
      novo = produtos.map(function(x) { return x.id === p.id ? p : x; });
      showToast("Produto atualizado!");
    }
    setProdutos(novo);
    saveProdutos(novo);
    setModal(null);
  }

  function excluir(id) {
    var novo = produtos.filter(function(p) { return p.id !== id; });
    setProdutos(novo);
    saveProdutos(novo);
    setConfirmDel(null);
    showToast("Produto removido.");
  }

  function resetar() {
    setProdutos(PRODUTOS_DEFAULT);
    saveProdutos(PRODUTOS_DEFAULT);
    showToast("Catalogo restaurado!");
  }

  var cats = ["Todos"].concat(CATS_VALIDAS);
  var filtrados = filtro === "Todos" ? produtos : produtos.filter(function(p) { return p.cat === filtro; });

  if (!autenticado) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: T.panel, border: "1px solid " + T.border, borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 360, boxShadow: "0 16px 60px rgba(26,23,20,0.12)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 28, letterSpacing: 4, color: T.ink, fontWeight: 600 }}>GALENE</div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: T.ink4, textTransform: "uppercase", marginTop: 4 }}>Painel Admin</div>
          </div>
          <label style={{ display: "block", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 8 }}>Senha</label>
          <input
            type="password"
            value={senhaInput}
            onChange={function(e) { setSenhaInput(e.target.value); setSenhaErro(false); }}
            onKeyDown={function(e) { if (e.key === "Enter") handleLogin(); }}
            placeholder="Digite a senha"
            style={{ width: "100%", padding: "12px 14px", border: "1.5px solid " + (senhaErro ? T.ruby : T.border), borderRadius: 10, fontSize: 14, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box", marginBottom: 6 }}
          />
          {senhaErro && <div style={{ fontSize: 11, color: T.ruby, marginBottom: 10 }}>Senha incorreta</div>}
          <button onClick={handleLogin}
            style={{ width: "100%", height: 48, background: T.gold, border: "none", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "white", letterSpacing: 1, marginTop: 8 }}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "sans-serif", color: T.ink }}>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, background: T.panel, border: "1px solid " + T.border, borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(26,23,20,0.15)", fontSize: 12, color: T.ink2, maxWidth: 300 }}>
          <span style={{ color: T.jade, fontSize: 16 }}>+</span>{toast}
        </div>
      )}

      <header style={{ background: T.panel, borderBottom: "1px solid " + T.border, padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 400 }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 22, letterSpacing: 4, color: T.ink, fontWeight: 600 }}>GALENE <span style={{ fontSize: 12, letterSpacing: 2, color: T.ink4, fontFamily: "sans-serif" }}>Admin</span></div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/" style={{ background: "none", border: "1.5px solid " + T.border, borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: T.ink3, textDecoration: "none" }}>Ver Loja</a>
          <button onClick={function() { setModal("novo"); }}
            style={{ background: T.gold, border: "none", borderRadius: 10, padding: "8px 18px", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "white", letterSpacing: 1 }}>
            + Novo Produto
          </button>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, padding: "24px 24px 0" }}>
        {[
          ["Total", produtos.length, T.gold],
          ["Destaques", produtos.filter(function(p) { return p.destaque; }).length, T.jade],
          ["Categorias", new Set(produtos.map(function(p) { return p.cat; })).size, T.ink3],
          ["Com Foto", produtos.filter(function(p) { return p.foto; }).length, T.goldDk],
        ].map(function(item) {
          return (
            <div key={item[0]} style={{ background: T.panel, border: "1px solid " + T.border, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 34, color: item[2], fontWeight: 600, lineHeight: 1 }}>{item[1]}</div>
              <div style={{ fontSize: 11, color: T.ink3, marginTop: 4 }}>{item[0]}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 24px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
          {cats.map(function(c) {
            var count = c === "Todos" ? produtos.length : produtos.filter(function(p) { return p.cat === c; }).length;
            return (
              <button key={c} onClick={function() { setFiltro(c); }}
                style={{ padding: "6px 14px", border: "1.5px solid " + (filtro === c ? T.gold : T.border), borderRadius: 20, background: filtro === c ? T.goldXlt : T.panel, cursor: "pointer", fontSize: 11, fontWeight: filtro === c ? 700 : 400, color: filtro === c ? T.goldDk : T.ink3 }}>
                {c} ({count})
              </button>
            );
          })}
        </div>
        <button onClick={resetar}
          style={{ background: "none", border: "1.5px solid " + T.border, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: T.ruby }}>
          Restaurar Original
        </button>
      </div>

      <div style={{ padding: "0 24px 60px" }}>
        <div style={{ background: T.panel, border: "1px solid " + T.border, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px 90px", padding: "10px 18px", background: T.bg2, borderBottom: "1px solid " + T.border }}>
            {["Produto","Categoria","Preco","Destaque","Acoes"].map(function(h) {
              return <div key={h} style={{ fontSize: 9, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", fontWeight: 700 }}>{h}</div>;
            })}
          </div>

          {filtrados.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px", color: T.ink4, fontSize: 13 }}>Nenhum produto.</div>
          )}

          {filtrados.map(function(p, i) {
            return (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px 90px", padding: "14px 18px", borderBottom: "1px solid " + T.border, background: i % 2 === 0 ? T.panel : T.bg, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {p.foto
                    ? <img src={p.foto} alt={p.nome} style={{ width: 36, height: 40, objectFit: "cover", borderRadius: 6, border: "1px solid " + T.border, flexShrink: 0 }} />
                    : <div style={{ width: 36, height: 40, background: T.bg2, borderRadius: 6, border: "1px solid " + T.border, flexShrink: 0 }} />
                  }
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{p.nome}</div>
                    <div style={{ fontSize: 10, color: T.ink4 }}>{p.sub}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: T.ink2 }}>{p.cat}</div>
                <div style={{ fontSize: 15, color: T.gold, fontWeight: 600 }}>R$ {Number(p.preco).toFixed(2).replace(".",",")}</div>
                <div style={{ fontSize: 11, color: p.destaque ? T.jade : T.ink4, fontWeight: 700 }}>{p.destaque ? "Sim" : "-"}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={function() { setModal(p); }}
                    style={{ padding: "5px 10px", border: "1px solid " + T.border, borderRadius: 6, background: "none", cursor: "pointer", fontSize: 12, color: T.ink3, fontWeight: 700 }}>
                    Editar
                  </button>
                  <button onClick={function() { setConfirmDel(p); }}
                    style={{ padding: "5px 10px", border: "1px solid " + T.border, borderRadius: 6, background: "none", cursor: "pointer", fontSize: 12, color: T.ruby, fontWeight: 700 }}>
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <ModalForm
          prod={modal === "novo" ? null : modal}
          onSave={salvar}
          onClose={function() { setModal(null); }}
        />
      )}

      {confirmDel && (
        <div style={{ position: "fixed", inset: 0, zIndex: 950, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={function() { setConfirmDel(null); }} style={{ position: "absolute", inset: 0, background: "rgba(26,23,20,0.5)" }} />
          <div style={{ position: "relative", background: T.panel, borderRadius: 16, padding: "32px 28px", maxWidth: 360, width: "100%", textAlign: "center", boxShadow: "0 16px 60px rgba(26,23,20,0.2)" }}>
            <h3 style={{ fontFamily: "Georgia,serif", fontSize: 22, color: T.ink, margin: "0 0 8px" }}>Excluir produto?</h3>
            <p style={{ fontSize: 13, color: T.ink3, margin: "0 0 24px" }}>{confirmDel.nome} sera removido do catalogo.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={function() { setConfirmDel(null); }}
                style={{ flex: 1, padding: "12px", border: "1.5px solid " + T.border, borderRadius: 10, background: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: T.ink3 }}>
                Cancelar
              </button>
              <button onClick={function() { excluir(confirmDel.id); }}
                style={{ flex: 1, padding: "12px", border: "none", borderRadius: 10, background: T.ruby, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "white" }}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
