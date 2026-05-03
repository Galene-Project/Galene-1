import { useState, useEffect, useCallback } from "react";
// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
bg: "#FAFAF8", bg2: "#F4F1EC", bg3: "#EDE8E0", panel: "#FFFFFF",
border: "#E0D8CC", border2: "#C8BFB0",
gold: "#B8935A", goldDk: "#8A6A38", goldLt: "#D4B07A", goldXlt: "#F5EDD8",
ink: "#1A1714", ink2: "#3A3530", ink3: "#6A6058", ink4: "#9A9088",
ruby: "#8B3A3A", jade: "#3A6B4A",
};
// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (v) => "R$ " + Number(v).toFixed(2).replace(".", ",");
const useWindowWidth = () => {
const [w, setW] = useState(
typeof window !== "undefined" ? window.innerWidth : 1400
);
useEffect(() => {
const fn = () => setW(window.innerWidth);
window.addEventListener("resize", fn);
return () => window.removeEventListener("resize", fn);
}, []);
return w;
};
// ─── COLOR MAP ────────────────────────────────────────────────────────────────
const COR_HEX = {
Preto: "#1A1A1A", Branco: "#F5F2EE", "Off White": "#EEEADE",
Vinho: "#6B2737", Marinho: "#1E3A5F", Nude: "#C4A882",
Bege: "#C8B89A", Caramelo: "#B5743A", Rosa: "#E8A0A0",
Vermelho: "#8B2020", Laranja: "#C97A3A", Amarelo: "#D4A82A",
Azul: "#3A6B9E", Verde: "#4A6B3A", Cinza: "#8A8A8A",
Grafite: "#484848", Marrom: "#6B4226", Jeans: "#3A5A7A",
Colorido: "#B8935A", Lilás: "#9B7EC8", Coral: "#E07A5F",
Musgo: "#5C6B3A", Terracota: "#C16A3A",
};
const SIZES_PADRAO = ["P", "M", "G", "GG"];
const SIZES_PLUS = ["P", "M", "G", "GG", "XGG"];
const SIZES_UNICO = ["Único"];
// ─── CATALOG ──────────────────────────────────────────────────────────────────
const PRODUTOS = [
// VESTIDOS VISCOLAYCRA
{ id: 1, nome: "Vestido Bella", cat: "Vestidos", sub: "Viscolaycra", preco: 40, des
{ id: 4, nome: "Vestido Eva", cat: "Vestidos", sub: "Viscolaycra", preco: 40, des
{ id: 5, nome: "Vestido Safira", cat: "Vestidos", sub: "Viscolaycra", preco: 60, des
{ id: 6, nome: "Vestido Naomi", cat: "Vestidos", sub: "Viscolaycra", preco: 70, des
{ id: 7, nome: "Vestido Mara", cat: "Vestidos", sub: "Viscolaycra", preco: 68, des
{ id: 8, nome: "Vestido Ariel", cat: "Vestidos", sub: "Viscolaycra", preco: 70, des
{ id: 9, nome: "Vestido Nina", cat: "Vestidos", sub: "Viscolaycra", preco: 85, des
{ id: 10, nome: "Vestido Lola", cat: "Vestidos", sub: "Viscolaycra", preco: 70, des
{ id: 11, nome: "Vestido Lorena ML", cat: "Vestidos", sub: "Viscolaycra", preco: 70, des
{ id: 12, nome: "Vestido Laila", cat: "Vestidos", sub: "Viscolaycra", preco: 70, des
{ id: 13, nome: "Vestido Kenya", cat: "Vestidos", sub: "Viscolaycra", preco: 65, des
{ id: 14, nome: "Vestido Marina", cat: "Vestidos", sub: "Viscolaycra", preco: 65, des
{ id: 15, nome: "Vestido Pandora", { id: 16, nome: "Vestido Itália", cat: "Vestidos", sub: "Viscolaycra", preco: 65, des
cat: "Vestidos", sub: "Viscolaycra", preco: 60, des
{ id: 17, nome: "Vestido Allegra", cat: "Vestidos", sub: "Viscolaycra", preco: 65, des
{ id: 18, nome: "Vestido Brisa", cat: "Vestidos", sub: "Viscolaycra", preco: 40, des
{ id: 19, nome: "Vestido Luana", cat: "Vestidos", sub: "Viscolaycra", preco: 40, des
{ id: 20, nome: "Vestido Elisa", cat: "Vestidos", sub: "Viscolaycra", preco: 60, des
{ id: 21, nome: "Vestido Aurora", // MOLETINHO
cat: "Vestidos", sub: "Viscolaycra", preco: 40, des
{ id: 22, nome: "Vestido Mônica Mol.", cat: "Moletinho", sub: "Moletinho", preco: 75, des
{ id: 23, nome: "Vestido Pandora Mol.",cat: "Moletinho", sub: "Moletinho", { id: 24, nome: "Vestido Itália Mol.", cat: "Moletinho", sub: "Moletinho", // LANZINHA
preco: 85, des
preco: 75, des
{ id: 25, nome: "Vestido Itália Lanz.",cat: "Lanzinha", sub: "Lanzinha", preco: 60, des
{ id: 26, nome: "Vestido Mônica Lanz.",cat: "Lanzinha", sub: "Lanzinha", preco: 60, des
{ id: 27, nome: "Vestido Monica Lanz.",cat: "Lanzinha", sub: "Lanzinha", preco: 60, des
// CONJUNTOS
{ id: 2, nome: "Conjunto Dallas", cat: "Conjuntos", sub: "Viscolaycra", preco: 75, dest
{ id: 28, nome: "Conjunto Dani", cat: "Conjuntos", sub: "Viscolaycra", preco: 85, dest
{ id: 29, nome: "Conjunto Tiffany", cat: "Conjuntos", sub: "Viscolaycra", preco: 50, dest
{ id: 30, nome: "Conj. Tiffany Mol.", cat: "Conjuntos", sub: "Moletinho", preco: 98, dest
{ id: 31, nome: "Conj. Chantal Calça",cat: "Conjuntos", sub: "Viscolaycra", preco: 80, dest
{ id: 32, nome: "Conjunto Chantal", // BLUSAS
cat: "Conjuntos", sub: "Viscolaycra", preco: 80, dest
{ id: 33, nome: "Blusa Caja", cat: "Blusas", sub: "Viscolaycra", preco: 35, dest
{ id: 34, nome: "Blusa Bagda", cat: "Blusas", sub: "Viscolaycra", preco: 39, dest
{ id: 35, nome: "Blusa Julia", cat: "Blusas", sub: "Viscolaycra", preco: 45, dest
{ id: 36, nome: "Blusa Yasmin", // REGATAS
cat: "Blusas", sub: "Viscolaycra", preco: 30, dest
{ id: 37, nome: "Regata Ellen", // CARDIGANS
cat: "Regatas", sub: "Viscolaycra", preco: 20, dest
{ id: 38, nome: "Cardigan Canelado", cat: "Cardigans", sub: "Canelado", preco: 39, dest
{ id: 39, nome: "Cardigan Luxor", // CALÇAS
cat: "Cardigans", sub: "Viscolycra", preco: 39, dest
{ id: 40, nome: "Calça Pantalona", cat: "Calças", sub: "Viscolaycra", preco: 40, dest
// MACACÕES
{ id: 3, nome: "Macacão Kami", cat: "Macacões", sub: "Viscolaycra", preco: 79, dest
];
const CATS = [
{ id: "destaques", label: "Destaques", icon: "★" },
{ id: "Vestidos", label: "Vestidos", icon: "◆" },
{ id: "Moletinho", label: "Moletinho", icon: "◈" },
{ id: "Lanzinha", label: "Lanzinha", icon: "◇" },
{ id: "Conjuntos", label: "Conjuntos", icon: "▣" },
{ id: "Blusas", label: "Blusas", icon: "▷" },
{ id: "Regatas", label: "Regatas", icon: "▽" },
{ id: "Cardigans", label: "Cardigans", icon: "◉" },
{ id: "Calças", label: "Calças", icon: "▤" },
{ id: "Macacões", label: "Macacões", icon: "◐" },
];
// ─── SVG SILHOUETTES ──────────────────────────────────────────────────────────
const Sil = ({ cat, cor = "#B8935A", sz = 160 }) => {
const light = ["#F5F2EE","#EEEADE","#C4A882","#C8B89A","#D4A82A","#E8A0A0"].includes(cor);
const p = { fill: cor, stroke: light ? "#C0A880" : "none", strokeWidth: 0.5 };
const accent = "rgba(184,147,90,0.3)";
if (["Blusas","Regatas","Cardigans"].includes(cat)) return (
<svg width={sz} height={sz} viewBox="0 0 200 185" style={{ filter: "drop-shadow(0 4px 12p
<path d="M36 59C68 47 90 64 100 64C110 64 132 47 164 59L174 97L152 92L152 158L48 <ellipse cx="100" cy="34" rx="19" ry="22" fill="none" stroke={light ? "#B0906A" : accen
</svg>
158L48
);
65 88
if (cat === "Conjuntos") return (
<svg width={sz} height={sz} viewBox="0 0 200 245" style={{ filter: "drop-shadow(0 4px 12p
<path d="M79 55C63 62 48 75 45 95L48 122L152 122L155 95C152 75 137 62 121 55C112 <path d="M79 55C68 48 43 45 34 60L41 97C54 93 58 82 67 76Z" {...p} opacity=".7" />
<path d="M121 55C132 48 157 45 166 60L159 97C146 93 142 82 133 76Z" {...p} opacity=".7"
<path d="M64 129L57 235L91 235L101 173L111 235L143 235L136 129Z" {...p} opacity=".92" /
<ellipse cx="100" cy="30" rx="17" ry="19" fill="none" stroke={light ? "#B0906A" : accen
</svg>
);
if (cat === "Macacões") return (
<svg width={sz} height={sz} viewBox="0 0 200 255" style={{ filter: "drop-shadow(0 4px 12p
<path d="M79 55C61 62 44 78 41 100L44 134C58 130 66 120 74 111L77 142L66 250L91 250L101
<path d="M79 55C67 48 42 44 33 60L39 100C52 96 57 84 66 77Z" {...p} opacity=".7" />
<path d="M121 55C133 48 158 44 167 60L161 100C148 96 143 84 134 77Z" {...p} opacity=".7
<ellipse cx="100" cy="30" rx="17" ry="19" fill="none" stroke={light ? "#B0906A" : accen
</svg>
);
if (cat === "Calças") return (
<svg width={sz} height={sz} viewBox="0 0 200 248" style={{ filter: "drop-shadow(0 4px 12p
<rect x="43" y="20" width="114" height="21" rx="3" {...p} />
<path d="M50 41L150 41L158 128L126 128L113 248L87 248L74 128L42 128Z" {...p} />
</svg>
235L11
);
return (
<svg width={sz} height={sz} viewBox="0 0 200 250" style={{ filter: "drop-shadow(0 4px 12p
<path d="M77 61C60 68 43 83 39 108L43 140C61 135 69 127 77 117L81 150L70 235L130 <path d="M77 61C65 54 40 51 31 67L37 104C53 100 59 87 68 80Z" {...p} opacity=".7" />
<path d="M123 61C135 54 160 51 169 67L163 104C147 100 141 87 132 80Z" {...p} opacity=".
<ellipse cx="100" cy="33" rx="19" ry="22" fill="none" stroke={light ? "#B0906A" : accen
</svg>
);
};
// ─── MODAL PRODUTO ────────────────────────────────────────────────────────────
const ModalProd = ({ prod, onClose, onAdd }) => {
const [sel, setSel] = useState([]);
const [cor, setCor] = useState(prod.cores[0]);
const [tam, setTam] = useState(null);
const w = useWindowWidth();
const mob = w < 640;
// Prevent body scroll when modal is open
useEffect(() => {
document.body.style.overflow = "hidden";
return () => { document.body.style.overflow = ""; };
}, []);
const addSel = useCallback(() => {
if (!tam) return;
const key = `${cor}__${tam}`;
setSel((prev) => {
const ex = prev.find((s) => s.key === key);
if (ex) return prev.map((s) => s.key === key ? { ...s, qtd: s.qtd + 1 } : s);
return [...prev, { key, cor, tam, qtd: 1 }];
});
}, [cor, tam]);
const updQ = (key, d) =>
setSel((p) => p.map((s) => s.key === key ? { ...s, qtd: Math.max(1, s.qtd + d) } : const remS = (key) => setSel((p) => p.filter((s) => s.key !== key));
s));
const totPcs = sel.reduce((a, s) => a + s.qtd, 0);
const totVal = sel.reduce((a, s) => a + s.qtd * prod.preco, 0);
const handleAdd = () => {
if (!sel.length) return;
onAdd(prod, sel);
onClose();
};
return (
<div style={{ position: "fixed", inset: 0, zIndex: 900, display: "flex", alignItems: "cen
<div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,23
<div style={{ position: "relative", background: T.panel, width: "100%", maxWidth: 540,
<div style={{ height: 3, background: `linear-gradient(90deg,${T.goldDk},${T.gold},${T
<div style={{ padding: mob ? "20px 18px 32px" : "28px 30px 36px" }}>
{/* Header */}
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-s
<div>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2.5
{prod.cat} · {prod.sub}
</div>
<h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize: mob
{prod.nome}
</h2>
</div>
<button onClick={onClose} aria-label="Fechar" style={{ background: "none", </div>
border
{/* Preview + preço */}
<div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
<div style={{ width: 110, height: 120, background: `linear-gradient(135deg,${T.bg
<Sil cat={prod.cat} cor={COR_HEX[cor] || T.gold} sz={92} />
</div>
<div style={{ flex: 1 }}>
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, color: T.
{fmt(prod.preco)}
</div>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.ink4, mar
por peça · atacado
</div>
<p style={{ margin: 0, fontFamily: "'Lato',sans-serif", fontSize: 11.5, color:
{prod.desc}
</p>
</div>
</div>
{/* Cores */}
<div style={{ marginBottom: 18 }}>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2, co
Cor — <span style={{ color: T.gold }}>{cor}</span>
</div>
<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
{prod.cores.map((c) => (
<button key={c} onClick={() => setCor(c)} style={{ display: "flex", alignItem
<div style={{ width: 12, height: 12, borderRadius: "50%", background: COR_H
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: cor ==
</button>
))}
</div>
</div>
{/* Tamanhos */}
<div style={{ marginBottom: 18 }}>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2, co
Tamanho {tam && <span style={{ color: T.jade }}>— {tam} ✓</span>}
</div>
<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
{prod.tamanhos.map((t) => (
<button key={t} onClick={() => setTam(t)} style={{ width: 54, height: 48, bac
{t}
</button>
))}
</div>
</div>
{/* Adicionar combinação */}
<button onClick={addSel} disabled={!tam} style={{ width: "100%", height: 44, {tam ? `＋ Adicionar ${cor} / ${tam}` : "Selecione um tamanho"}
</button>
backgr
{/* Lista de seleções */}
{sel.length > 0 && (
<div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12
<div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, font
Selecionados
</div>
{sel.map((s) => (
<div key={s.key} style={{ display: "flex", alignItems: "center", gap: 10, pad
<div style={{ width: 10, height: 10, borderRadius: "50%", background: COR_H
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11.5, color: T.in
<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
<button onClick={() => updQ(s.key, -1)} style={{ width: 26, height: 26, b
<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: <button onClick={() => updQ(s.key, 1)} style={{ width: 26, height: </div>
<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, colo
<button onClick={() => remS(s.key)} aria-label="Remover" style={{ backgroun
</div>
16, co
26, ba
))}
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "ce
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3 }
<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color:
</div>
</div>
)}
{/* Botão principal */}
<button onClick={handleAdd} disabled={!sel.length} style={{ width: "100%", height:
{sel.length ? `Adicionar ao Pedido · ${fmt(totVal)}` : "Selecione cor e tamanho"}
</button>
</div>
</div>
</div>
);
};
// ─── CARD DESTAQUE ────────────────────────────────────────────────────────────
const CardDest = ({ prod, onClick }) => {
const [hov, setHov] = useState(false);
const [ci, setCi] = useState(0);
const w = useWindowWidth();
const mob = w < 640;
return (
<div
onClick={onClick}
onMouseEnter={() => setHov(true)}
onMouseLeave={() => setHov(false)}
style={{ background: T.panel, border: `1.5px solid ${hov ? T.gold : T.border}`, borderR
>
{prod.tag && (
<div style={{ position: "absolute", top: 14, left: 14, zIndex: 10, background: {prod.tag}
</div>
prod.t
)}
<div style={{ height: mob ? 240 : 300, background: `linear-gradient(160deg,${T.bg2},${T
<div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circl
<Sil cat={prod.cat} cor={COR_HEX[prod.cores[ci]] || T.gold} sz={mob ? 190 : 240} />
<div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, backgro
<div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", j
{prod.cores.map((c, i) => (
<div key={c} onClick={(e) => { e.stopPropagation(); setCi(i); }} title={c} style=
))}
</div>
</div>
<div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "colu
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, letterSpacing: 2.5, col
{prod.cat} · {prod.sub}
</div>
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 20 : 24, colo
{prod.nome}
</div>
<p style={{ margin: "0 0 16px", fontFamily: "'Lato',sans-serif", fontSize: 11.5, colo
{prod.desc}
</p>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"
<div>
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 24 {fmt(prod.preco)}
</div>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, color: T.ink4 }}>po
</div>
<button style={{ background: `linear-gradient(135deg,${T.goldDk},${T.gold})`, borde
Selecionar
</button>
</div>
</div>
</div>
: 28,
);
};
// ─── CARD NORMAL ──────────────────────────────────────────────────────────────
const Card = ({ prod, onClick }) => {
const [hov, setHov] = useState(false);
const [ci, setCi] = useState(0);
return (
<div
onClick={onClick}
onMouseEnter={() => setHov(true)}
onMouseLeave={() => setHov(false)}
style={{ background: T.panel, border: `1px solid ${hov ? T.gold : T.border}`, borderRad
>
{prod.tag && (
<div style={{ position: "absolute", top: 10, left: 10, zIndex: 10, background: {prod.tag}
</div>
prod.t
)}
<div style={{ height: 190, background: `linear-gradient(160deg,${T.bg2},${T.bg3})`, dis
<Sil cat={prod.cat} cor={COR_HEX[prod.cores[ci]] || T.gold} sz={155} />
<div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 50, backgro
<div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", j
{prod.cores.slice(0, 5).map((c, i) => (
<div key={c} onClick={(e) => { e.stopPropagation(); setCi(i); }} title={c} style=
))}
</div>
</div>
<div style={{ padding: "13px 15px 17px" }}>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9, letterSpacing: 2, color:
{prod.sub}
</div>
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: T.ink, m
{prod.nome}
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, color: {fmt(prod.preco)}
</div>
<div style={{ background: hov ? `linear-gradient(135deg,${T.goldDk},${T.gold})` : "
Ver
</div>
</div>
</div>
</div>
T.gold
);
};
// ─── CARRINHO ─────────────────────────────────────────────────────────────────
const Carrinho = ({ cart, onRemove, onFinish, onBack }) => {
const [step, setStep] = useState(1);
const [met, setMet] = useState(null);
const [ok, setOk] = useState(false);
const [form, setForm] = useState({ razao: "", cnpj: "", email: "", tel: "", end: "", const [formErros, setFormErros] = useState({});
const w = useWindowWidth();
const mob = w < 768;
cidade
const totPcs = cart.reduce((s, i) => s + i.sel.reduce((a, x) => a + x.qtd, 0), 0);
const totVal = cart.reduce((s, i) => s + i.sel.reduce((a, x) => a + x.qtd * i.preco, const ok6 = totPcs >= 6;
0), 0)
const validarForm = () => {
const erros = {};
if (!form.razao.trim()) erros.razao = true;
if (!form.cnpj.trim()) erros.cnpj = true;
if (!form.email.trim() || !form.email.includes("@")) erros.email = true;
if (!form.tel.trim()) erros.tel = true;
setFormErros(erros);
return Object.keys(erros).length === 0;
};
const irParaPagamento = () => {
if (validarForm()) setStep(3);
};
if (ok) return (
<div style={{ textAlign: "center", padding: "80px 24px" }}>
<div style={{ width: 72, height: 72, background: `linear-gradient(135deg,${T.goldDk},${
<h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: T.gold, mar
<p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: T.ink3, maxWidth: 380
Recebemos seu pedido. Nossa equipe entrará em contato em breve pelo e-mail informado
</p>
<button onClick={onFinish} style={{ background: `linear-gradient(135deg,${T.goldDk},${T
Continuar Comprando
</button>
</div>
);
return (
<div style={{ maxWidth: 980, margin: "0 auto", padding: mob ? "20px 14px 100px" : "36px 3
{/* Cabeçalho */}
<div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
<button onClick={onBack} style={{ background: "none", border: `1.5px solid ${T.border
← Voltar
</button>
<h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 24
Meu Pedido
</h1>
<div style={{ marginLeft: "auto", fontFamily: "'Lato',sans-serif", fontSize: 11, colo
{totPcs} pç {ok6 ? "✓ mínimo atingido" : `— faltam ${6 - totPcs}`}
</div>
</div>
{!ok6 && totPcs > 0 && (
<div style={{ background: "#FFF8E6", border: "1px solid #E8C96A", borderRadius: 10, p
⚠ Adicione mais {6 - totPcs} peça{6 - totPcs > 1 ? "s" : ""} para finalizar — pedid
</div>
)}
{/* Steps */}
<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, overflow
{["Itens", "Dados", "Pagamento"].map((s, i) => (
<div key={s} style={{ display: "flex", alignItems: "center" }}>
<div style={{ display: "flex", alignItems: "center", gap: 7 }}>
<div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700
</div>
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 600,
</div>
{i < 2 && <div style={{ width: mob ? 20 : 40, height: 2, background: step > i + 1
</div>
))}
</div>
<div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 300px", gap: 24
<div>
{/* STEP 1 — Itens */}
{step === 1 && (
<>
{cart.length === 0 ? (
<div style={{ textAlign: "center", padding: "60px", color: T.ink4, fontFamily
Seu carrinho está vazio.
</div>
) : (
<>
{cart.map((item, idx) => (
<div key={idx} style={{ background: T.panel, border: `1px solid ${T.borde
<div style={{ display: "flex", gap: 14, padding: "14px 16px" }}>
<div style={{ width: 54, height: 62, background: `linear-gradient(135
<Sil cat={item.cat} cor={COR_HEX[item.sel[0]?.cor] || T.gold} sz={4
</div>
<div style={{ flex: 1 }}>
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 1
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color:
</div>
<button onClick={() => onRemove(idx)} aria-label="Remover item" style
✕
</button>
</div>
<div style={{ borderTop: `1px solid ${T.border}`, padding: "10px {item.sel.map((s) => (
<div key={s.key} style={{ display: "flex", alignItems: "center", ga
<div style={{ width: 8, height: 8, borderRadius: "50%", backgroun
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, col
<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize
</div>
16px",
))}
</div>
</div>
))}
<button onClick={() => ok6 && setStep(2)} disabled={!ok6} style={{ width: "
{ok6 ? "Continuar → Dados" : `Mínimo 6 peças (faltam ${6 - totPcs})`}
</button>
</>
)}
</>
)}
{/* STEP 2 — Dados */}
{step === 2 && (
<div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap:
{[
["razao", "Razão Social *", "2"],
["cnpj", "CNPJ / CPF *", "1"],
["email", "E-mail *", "1"],
["tel", "Telefone / WhatsApp *", "1"],
["end", "Endereço", "2"],
["cidade", "Cidade / Estado", "2"],
].map(([f, label, c]) => (
<div key={f} style={{ gridColumn: `span ${mob ? "1" : c}` }}>
<label style={{ display: "block", fontFamily: "'Lato',sans-serif", fontSize
<input
value={form[f] || ""}
onChange={(e) => { setForm((p) => ({ ...p, [f]: e.target.value })); setFo
style={{ width: "100%", background: T.panel, border: `1.5px solid ${formE
onFocus={(e) => (e.target.style.borderColor = T.gold)}
onBlur={(e) => (e.target.style.borderColor = formErros[f] ? T.ruby : T.bo
/>
</div>
{formErros[f] && <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 1
))}
<div style={{ gridColumn: `span ${mob ? "1" : "2"}`, display: "flex", gap: 10,
<button onClick={() => setStep(1)} style={{ background: "none", border: `1.5p
← Voltar
</button>
<button onClick={irParaPagamento} style={{ flex: 1, background: `linear-gradi
Continuar → Pagamento
</button>
</div>
</div>
)}
{/* STEP 3 — Pagamento */}
{step === 3 && !met && (
<div>
{[
<div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", ga
["pix", " ", "PIX", "Pagamento à vista via chave PIX", T.jade, "#EAF5EE"],
["cartao", " ", "Cartão de Crédito", "Pague na maquininha no ato da ].map(([v, ic, lb, sub, co, bg]) => (
entreg
<div key={v} onClick={() => setMet(v)} style={{ background: bg, border: `1.
onMouseEnter={(e) => { e.currentTarget.style.borderColor = co; e.currentT
onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.cu
<div style={{ fontSize: 32, marginBottom: 10 }}>{ic}</div>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 14, fontWeight:
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink
</div>
))}
</div>
<button onClick={() => setStep(2)} style={{ background: "none", border: `1.5px
← Voltar
</button>
</div>
)}
{step === 3 && met && (
<div>
<button onClick={() => setMet(null)} style={{ background: "none", border: "none
← Escolher outra forma
</button>
{met === "pix" && (
<div style={{ textAlign: "center", padding: "24px 0" }}>
<div style={{ background: "#EAF5EE", border: "1px solid #B8D8C4", borderRad
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, col
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, col
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.jad
</div>
<button onClick={() => setOk(true)} style={{ width: "100%", background: `li
Confirmar Pedido via PIX
</button>
</div>
)}
{met === "cartao" && (
<div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
{[["Número do Cartão", "2"], ["Nome no Cartão", "2"], ["Validade", "1"], ["
<div key={l} style={{ gridColumn: `span ${mob ? "1" : c}` }}>
<label style={{ display: "block", fontFamily: "'Lato',sans-serif", font
<input style={{ width: "100%", padding: "11px 14px", border: `1.5px sol
onFocus={(e) => (e.target.style.borderColor = T.gold)}
onBlur={(e) => (e.target.style.borderColor = T.border)} />
</div>
))}
<div style={{ gridColumn: `span ${mob ? "1" : "2"}` }}>
<button onClick={() => setOk(true)} style={{ width: "100%", background: `
Confirmar Pedido · {fmt(totVal)}
</button>
</div>
</div>
)}
</div>
)}
</div>
{/* Resumo */}
{(!mob || step === 1) && (
<div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 1
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2.5,
{cart.map((item, idx) => (
<div key={idx} style={{ marginBottom: 12 }}>
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color:
{item.sel.map((s) => (
<div key={s.key} style={{ display: "flex", justifyContent: "space-between",
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.in
<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, co
</div>
))}
</div>
))}
<div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12, marginTop: 8 }}
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3 }
<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color:
color:
color:
</div>
<div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10,
<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, </div>
</div>
</div>
)}
</div>
</div>
);
};
// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar = ({ cat, setCat, mobile, onClose }) => {
const counts = { destaques: PRODUTOS.filter((p) => p.destaque).length };
CATS.forEach((c) => { if (c.id !== "destaques") counts[c.id] = PRODUTOS.filter((p) => p.cat
return (
<div style={{ width: mobile ? 260 : 200, background: T.panel, borderRight: `1px solid ${T
{mobile && (
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: T.gol
<button onClick={onClose} aria-label="Fechar menu" style={{ background: "none", bor
</div>
)}
<div style={{ padding: "16px 0 28px" }}>
<div style={{ padding: "0 16px 8px", fontFamily: "'Lato',sans-serif", fontSize: 9, le
Categorias
</div>
{CATS.map((c) => {
const ativa = cat === c.id;
return (
<button key={c.id} onClick={() => { setCat(c.id); if (mobile && onClose) onClose(
style={{ width: "100%", textAlign: "left", background: ativa ? T.goldXlt : "tra
onMouseEnter={(e) => { if (!ativa) e.currentTarget.style.background = T.bg2; }}
onMouseLeave={(e) => { if (!ativa) e.currentTarget.style.background = "transpar
<span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{c.icon}</span>
<div style={{ flex: 1, minWidth: 0 }}>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: ativ
{c.label}
</div>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, color: T.ink4,
{counts[c.id] || 0} produtos
</div>
</div>
{ativa && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T
</button>
);
})}
{/* Condições */}
<div style={{ margin: "20px 12px 0", padding: "14px", background: T.bg2, border: `1px
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9, letterSpacing: 2, color
Condições
</div>
{[["Pedido mín.", "6 peças"], ["Pagamento", "PIX ou Cartão"]].map(([k, v]) => (
<div key={k} style={{ display: "flex", justifyContent: "space-between", marginBot
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink2, fo
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.ink3 }}>
</div>
))}
</div>
</div>
</div>
);
};
// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
// ─── STORAGE (produtos do admin) ─────────────────────────────────────────────
const STORAGE_KEY = "galene_produtos_v1";
function getProdutos() {
if (typeof window === "undefined") return PRODUTOS;
try {
const raw = localStorage.getItem(STORAGE_KEY);
if (raw) return JSON.parse(raw);
} catch {}
return PRODUTOS;
}
export default function GaleneStore() {
const w = useWindowWidth();
const mob = w < 900;
const [cat, setCat] = useState("destaques");
const [modal, setModal] = useState(null);
const [cart, setCart] = useState([]);
const [view, setView] = useState("loja");
const [drawer, setDrawer] = useState(false);
const [toast, setToast] = useState(null);
const [catalogoProdutos, setCatalogoProdutos] = useState(PRODUTOS);
useEffect(() => {
setCatalogoProdutos(getProdutos());
const onStorage = () => setCatalogoProdutos(getProdutos());
window.addEventListener("storage", onStorage);
return () => window.removeEventListener("storage", onStorage);
}, []);
const totPcs = cart.reduce((s, i) => s + i.sel.reduce((a, x) => a + x.qtd, 0), 0);
const prods = cat === "destaques" ? catalogoProdutos.filter((p) => p.destaque) : catalogoPr
const addToCart = useCallback((prod, sel) => {
setCart((prev) => {
const idx = prev.findIndex((i) => i.id === prod.id);
if (idx >= 0) {
const up = [...prev];
const mg = [...up[idx].sel];
sel.forEach((s) => {
const mi = mg.findIndex((m) => m.key === s.key);
if (mi >= 0) mg[mi] = { ...mg[mi], qtd: mg[mi].qtd + s.qtd };
else mg.push(s);
});
up[idx] = { ...up[idx], sel: mg };
return up;
}
return [...prev, { ...prod, sel }];
});
const n = sel.reduce((a, s) => a + s.qtd, 0);
setToast(`${n} peça${n > 1 ? "s" : ""} de "${prod.nome}" adicionada${n > 1 ? "s" : setTimeout(() => setToast(null), 3500);
}, []);
""}!`)
const handleFinish = useCallback(() => {
setCart([]);
setView("loja");
setCat("destaques");
}, []);
return (
<div style={{ fontFamily: "'Lato',sans-serif", background: T.bg, minHeight: "100vh", colo
{/* Google Fonts */}
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300
<style>{`
*,*::before,*::after{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0;padding:0}
input{font-size:16px!important;-webkit-appearance:none}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-thumb{background:${T.gold}55;border-radius:4px}
::-webkit-scrollbar-track{background:${T.bg2}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:tr
@keyframes slideLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}
@keyframes toastIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:
.fade{animation:fadeUp .38s ease}
.slide{animation:slideLeft .22s ease}
.toast{animation:toastIn .25s ease}
`}</style>
{/* Toast */}
{toast && (
<div className="toast" style={{ position: "fixed", top: 20, right: 20, zIndex: <span style={{ color: T.jade, fontSize: 16 }}>✓</span>{toast}
</div>
9999,
)}
{/* Drawer mobile */}
{mob && drawer && (
<div style={{ position: "fixed", inset: 0, zIndex: 600 }}>
<div onClick={() => setDrawer(false)} style={{ position: "absolute", inset: 0, back
<div className="slide" style={{ position: "absolute", top: 0, left: 0, bottom: 0 }}
<Sidebar cat={cat} setCat={setCat} mobile={true} onClose={() => setDrawer(false)}
</div>
</div>
)}
{/* HEADER */}
<header style={{ position: "sticky", top: 0, zIndex: 400, background: T.panel, borderBo
<div style={{ background: `linear-gradient(135deg,${T.goldDk},${T.gold},${T.goldDk})`
✦ ATACADO · PIX E CARTÃO · PEDIDO MÍNIMO 6 PEÇAS ✦
</div>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
{mob && (
<button onClick={() => setDrawer(true)} aria-label="Menu" style={{ background: "n
{[0, 1, 2].map((i) => (
<div key={i} style={{ width: i === 1 ? 14 : 18, height: 2, background: ))}
</button>
T.gold
)}
{/* Logo */}
<div onClick={() => { setView("loja"); setCat("destaques"); }} style={{ cursor: "po
<svg width={mob ? 30 : 38} height={mob ? 30 : 38} viewBox="0 0 80 80" fill="none"
<polygon points="40,4 74,22 74,58 40,76 6,58 6,22" stroke={T.gold} strokeWidth=
<polygon points="40,12 66,27 66,53 40,68 14,53 14,27" stroke={T.gold} strokeWid
<circle cx="40" cy="40" r="6" fill={T.gold} />
{[0, 60, 120, 180, 240, 300].map((a, i) => {
const r = 16, rad = (a * Math.PI) / 180;
return <circle key={i} cx={40 + r * Math.cos(rad)} cy={40 + r * Math.sin(rad)
})}
</svg>
<div>
<div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 20 : 26
{!mob && <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 8.5, letterSp
</div>
</div>
{/* Nav direita */}
<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
{!mob && (
<button onClick={() => { setView("loja"); setCat("destaques"); }} style={{ back
CATÁLOGO
</button>
)}
<button onClick={() => setView("carrinho")} style={{ background: view === "carrin
<span style={{ fontSize: 18 }}> </span>
{!mob && "Pedido"}
{totPcs > 0 && (
<span style={{ background: T.gold, color: "white", borderRadius: "50%", width
{totPcs}
</span>
)}
</button>
</div>
</div>
</header>
{/* BODY */}
{view === "carrinho" ? (
<Carrinho
cart={cart}
onRemove={(idx) => setCart((p) => p.filter((_, i) => i !== idx))}
onFinish={handleFinish}
onBack={() => setView("loja")}
/>
) : (
<div style={{ display: "flex", minHeight: "calc(100vh - 112px)" }}>
{/* Sidebar desktop */}
{!mob && (
<div style={{ position: "sticky", top: 112, height: "calc(100vh - 112px)", <Sidebar cat={cat} setCat={setCat} mobile={false} />
</div>
overfl
)}
minWid
{/* Main */}
<main style={{ flex: 1, padding: mob ? "14px 12px 100px" : "28px 32px 60px", {/* Hero banner — Destaques */}
{cat === "destaques" && (
<div style={{ background: `linear-gradient(135deg,${T.bg2},${T.bg3})`, borderRa
<div style={{ position: "absolute", right: mob ? 16 : 40, top: "50%", transfo
<div style={{ position: "relative" }}>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, letterSpacing
Coleção Atual
</div>
<h1 style={{ margin: "0 0 8px", fontFamily: "'Cormorant Garamond',serif", f
Destaques Galene
</h1>
<div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3,
Peças selecionadas · Atacado feminino
</div>
</div>
</div>
)}
{/* Título categoria */}
{cat !== "destaques" && (
<div style={{ marginBottom: 22, paddingBottom: 16, borderBottom: `1px solid ${T
<div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
<h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize:
{cat}
</h2>
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: {prods.length} produtos
</span>
</div>
</div>
T.ink4
)}
{/* Grid destaques */}
{cat === "destaques" && (
<div className="fade" style={{ display: "grid", gridTemplateColumns: mob ? "1fr
{prods.map((p) => <CardDest key={p.id} prod={p} onClick={() => setModal(p)} /
</div>
)}
? "1fr
{/* Grid normal */}
{cat !== "destaques" && (
<div className="fade" style={{ display: "grid", gridTemplateColumns: mob {prods.length === 0
? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", c
: prods.map((p) => <Card key={p.id} prod={p} onClick={() => setModal(p)} />
}
</div>
)}
</main>
</div>
)}
{/* Modal */}
{modal && <ModalProd prod={modal} onClose={() => setModal(null)} onAdd={addToCart} />}
{/* Nav mobile bottom */}
{mob && view !== "carrinho" && (
<nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.panel, b
{[
["menu", "☰", "Menu", () => setDrawer(true)],
["loja", "◈", "Catálogo", () => { setView("loja"); setCat("destaques"); }],
["carrinho", " ", "Pedido", () => setView("carrinho")],
].map(([v, icon, label, action]) => (
<button key={v} onClick={action} style={{ flex: 1, background: "none", border: "n
<span style={{ fontSize: 20 }}>{icon}</span>
<span style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, fontWeight: view
{label}
</span>
{v === "carrinho" && totPcs > 0 && (
<span style={{ position: "absolute", top: 0, right: "22%", background: T.gold
)}
</button>
{view === v && v !== "menu" && <div style={{ width: 16, height: 2, background:
))}
</nav>
)}
</div>
);
}
