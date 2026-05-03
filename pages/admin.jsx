import { useState, useEffect } from "react";
const T = {
bg: "#FAFAF8", bg2: "#F4F1EC", bg3: "#EDE8E0", panel: "#FFFFFF",
border: "#E0D8CC", gold: "#B8935A", goldDk: "#8A6A38", goldLt: "#D4B07A",
goldXlt: "#F5EDD8", ink: "#1A1714", ink2: "#3A3530", ink3: "#6A6058",
ink4: "#9A9088", ruby: "#8B3A3A", jade: "#3A6B4A",
};
const SENHA = "galene2025";
const KEY = "galene_produtos_v1";
const CATS = ["Vestidos","Moletinho","Lanzinha","Conjuntos","Blusas","Regatas","Cardigans","C
const CORES = {
Preto:"#1A1A1A", Branco:"#F5F2EE", OffWhite:"#EEEADE", Vinho:"#6B2737",
Marinho:"#1E3A5F", Nude:"#C4A882", Bege:"#C8B89A", Caramelo:"#B5743A",
Rosa:"#E8A0A0", Vermelho:"#8B2020", Laranja:"#C97A3A", Amarelo:"#D4A82A",
Azul:"#3A6B9E", Verde:"#4A6B3A", Cinza:"#8A8A8A", Grafite:"#484848",
Marrom:"#6B4226", Jeans:"#3A5A7A", Colorido:"#B8935A", Lilas:"#9B7EC8",
Coral:"#E07A5F", Musgo:"#5C6B3A", Terracota:"#C16A3A",
};
const SP = ["P","M","G","GG"];
const SX = ["P","M","G","GG","XGG"];
const SU = ["Unico"];
const PADROES = [
{ id:1, nome:"Vestido Bella", cat:"Vestidos", sub:"Viscolaycra", preco:40, destaqu
{ id:4, nome:"Vestido Eva", cat:"Vestidos", sub:"Viscolaycra", preco:40, destaqu
{ id:5, nome:"Vestido Safira", cat:"Vestidos", sub:"Viscolaycra", preco:60, destaqu
{ id:6, nome:"Vestido Naomi", cat:"Vestidos", sub:"Viscolaycra", preco:70, destaqu
{ id:7, nome:"Vestido Mara", cat:"Vestidos", sub:"Viscolaycra", preco:68, destaqu
{ id:8, nome:"Vestido Ariel", cat:"Vestidos", sub:"Viscolaycra", preco:70, destaqu
{ id:9, nome:"Vestido Nina", cat:"Vestidos", sub:"Viscolaycra", preco:85, destaqu
{ id:10, nome:"Vestido Lola", cat:"Vestidos", sub:"Viscolaycra", preco:70, destaqu
{ id:11, nome:"Vestido Lorena ML", cat:"Vestidos", sub:"Viscolaycra", preco:70, destaqu
{ id:12, nome:"Vestido Laila", cat:"Vestidos", sub:"Viscolaycra", preco:70, destaqu
{ id:13, nome:"Vestido Kenya", cat:"Vestidos", sub:"Viscolaycra", preco:65, destaqu
{ id:14, nome:"Vestido Marina", cat:"Vestidos", sub:"Viscolaycra", preco:65, destaqu
{ id:15, nome:"Vestido Pandora", cat:"Vestidos", sub:"Viscolaycra", preco:65, destaqu
{ id:16, nome:"Vestido Italia", cat:"Vestidos", sub:"Viscolaycra", preco:60, destaqu
{ id:17, nome:"Vestido Allegra", cat:"Vestidos", sub:"Viscolaycra", preco:65, destaqu
{ id:18, nome:"Vestido Brisa", cat:"Vestidos", sub:"Viscolaycra", preco:40, destaqu
{ id:19, nome:"Vestido Luana", cat:"Vestidos", sub:"Viscolaycra", preco:40, destaqu
{ id:20, nome:"Vestido Elisa", cat:"Vestidos", sub:"Viscolaycra", preco:60, destaqu
{ id:21, nome:"Vestido Aurora", cat:"Vestidos", sub:"Viscolaycra", preco:40, destaqu
{ id:22, nome:"Vestido Monica Mol.", cat:"Moletinho", sub:"Moletinho", preco:75, destaqu
{ id:23, nome:"Vestido Pandora Mol.", cat:"Moletinho", sub:"Moletinho", preco:85, destaqu
{ id:24, nome:"Vestido Italia Mol.", cat:"Moletinho", sub:"Moletinho", preco:75, destaqu
{ id:25, nome:"Vestido Italia Lanz.", cat:"Lanzinha", sub:"Lanzinha", preco:60, destaqu
{ id:26, nome:"Vestido Monica Lanz.", cat:"Lanzinha", sub:"Lanzinha", preco:60, destaqu
{ id:27, nome:"Vestido Monica L2", cat:"Lanzinha", sub:"Lanzinha", preco:60, destaque
{ id:2, nome:"Conjunto Dallas", cat:"Conjuntos", sub:"Viscolaycra", preco:75, destaque
{ id:28, nome:"Conjunto Dani", cat:"Conjuntos", sub:"Viscolaycra", preco:85, destaque
{ id:29, nome:"Conjunto Tiffany", cat:"Conjuntos", sub:"Viscolaycra", preco:50, destaque
{ id:30, nome:"Conj. Tiffany Mol.", cat:"Conjuntos", sub:"Moletinho", preco:98, destaque
{ id:31, nome:"Conj. Chantal Calca", cat:"Conjuntos", sub:"Viscolaycra", preco:80, destaque
{ id:32, nome:"Conjunto Chantal", cat:"Conjuntos", sub:"Viscolaycra", preco:80, destaque
{ id:33, nome:"Blusa Caja", cat:"Blusas", sub:"Viscolaycra", preco:35, destaque
{ id:34, nome:"Blusa Bagda", cat:"Blusas", sub:"Viscolaycra", preco:39, destaque
{ id:35, nome:"Blusa Julia", cat:"Blusas", sub:"Viscolaycra", preco:45, destaque
{ id:36, nome:"Blusa Yasmin", cat:"Blusas", sub:"Viscolaycra", preco:30, destaque
{ id:37, nome:"Regata Ellen", cat:"Regatas", sub:"Viscolaycra", preco:20, destaque
{ id:38, nome:"Cardigan Canelado", cat:"Cardigans", sub:"Canelado", preco:39, destaque
{ id:39, nome:"Cardigan Luxor", cat:"Cardigans", sub:"Viscolycra", preco:39, destaque
{ id:40, nome:"Calca Pantalona", cat:"Calcas", sub:"Viscolaycra", preco:40, destaque
{ id:3, nome:"Macacao Kami", cat:"Macacoes", sub:"Viscolaycra", preco:79, destaque
];
function load() {
if (typeof window === "undefined") return PADROES;
try {
var raw = localStorage.getItem(KEY);
if (raw) return JSON.parse(raw);
} catch(e) {}
return PADROES;
}
function save(list) {
try { localStorage.setItem(KEY, JSON.stringify(list)); } catch(e) {}
}
function novoProd() {
return { id: Date.now(), nome:"", cat:"Vestidos", sub:"Viscolaycra", preco:"", destaque:fal
}
function ModalForm(props) {
var prod = props.prod;
var onSave = props.onSave;
var onClose = props.onClose;
var isNew = !prod;
var init = isNew ? novoProd() : Object.assign({}, prod);
var s = useState(init);
var f = s[0];
var setF = s[1];
var es = useState({});
var erros = es[0];
var setErros = es[1];
function set(k, v) {
setF(function(p) { var n = Object.assign({}, p); n[k] = v; return n; });
setErros(function(p) { var n = Object.assign({}, p); n[k] = null; return n; });
}
function toggleCor(c) {
var arr = f.cores.slice();
var idx = arr.indexOf(c);
if (idx >= 0) arr.splice(idx, 1);
else arr.push(c);
set("cores", arr);
}
function toggleTam(t) {
var arr = f.tamanhos.slice();
var idx = arr.indexOf(t);
if (idx >= 0) arr.splice(idx, 1);
else arr.push(t);
set("tamanhos", arr);
}
function validar() {
var e = {};
if (!f.nome.trim()) e.nome = "Nome obrigatorio";
if (!f.preco || isNaN(Number(f.preco)) || Number(f.preco) <= 0) e.preco = "Preco invalido
if (!f.cores.length) e.cores = "Selecione ao menos 1 cor";
if (!f.tamanhos.length) e.tamanhos = "Selecione ao menos 1 tamanho";
if (!f.desc.trim()) e.desc = "Descricao obrigatoria";
setErros(e);
return Object.keys(e).length === 0;
}
function handleSave() {
if (!validar()) return;
var out = Object.assign({}, f, { preco: Number(f.preco) });
onSave(out);
}
var inp = { width:"100%", padding:"10px 12px", border:"1.5px solid "+T.border, borderRadius
var inpErr = Object.assign({}, inp, { border:"1.5px solid "+T.ruby });
var lbl = { display:"block", fontSize:10, letterSpacing:2, color:T.ink4, textTransform:"upp
return (
<div style={{ position:"fixed", inset:0, zIndex:900, display:"flex", alignItems:"center",
<div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(26,23,20
<div style={{ position:"relative", background:T.panel, width:"100%", maxWidth:580, maxH
<div style={{ height:3, background:"linear-gradient(90deg,#8A6A38,#B8935A,#D4B07A,#B8
<div style={{ padding:"24px 28px 32px" }}>
<div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
<h2 style={{ margin:0, fontFamily:"Georgia,serif", fontSize:24, color:T.ink, font
{isNew ? "Novo Produto" : "Editar Produto"}
</h2>
</div>
<button onClick={onClose} style={{ background:"none", border:"1.5px solid "+T.bor
<div style={{ marginBottom:14 }}>
<label style={lbl}>Nome *</label>
<input value={f.nome} onChange={function(e){set("nome",e.target.value);}} style={
{erros.nome && <div style={{ fontSize:10, color:T.ruby, marginTop:3 }}>{erros.nom
</div>
<div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:1
<div>
<label style={lbl}>Categoria</label>
<select value={f.cat} onChange={function(e){set("cat",e.target.value);}} style=
{CATS.map(function(c){ return <option key={c} value={c}>{c}</option>; })}
</select>
</div>
<div>
</div>
</div>
<label style={lbl}>Sub-categoria</label>
<input value={f.sub} onChange={function(e){set("sub",e.target.value);}} style={
<div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:1
<div>
<label style={lbl}>Preco R$ *</label>
<input value={f.preco} onChange={function(e){set("preco",e.target.value);}} typ
{erros.preco && <div style={{ fontSize:10, color:T.ruby, marginTop:3 }}>{erros.
</div>
<div>
<label style={lbl}>Tag</label>
<select value={f.tag || ""} onChange={function(e){set("tag",e.target.value||nul
<option value="">Sem tag</option>
<option value="Mais Vendido">Mais Vendido</option>
<option value="Novo">Novo</option>
<option value="Destaque">Destaque</option>
<option value="Premium">Premium</option>
</select>
</div>
</div>
<div style={{ marginBottom:14 }}>
<label style={lbl}>URL da Foto (opcional)</label>
<input value={f.foto||""} onChange={function(e){set("foto",e.target.value);}} sty
</div>
<div style={{ marginBottom:14 }}>
<label style={lbl}>Descricao *</label>
<textarea value={f.desc} onChange={function(e){set("desc",e.target.value);}} rows
{erros.desc && <div style={{ fontSize:10, color:T.ruby, marginTop:3 }}>{erros.des
</div>
<div style={{ marginBottom:16 }}>
<label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
<div onClick={function(){set("destaque",!f.destaque);}}
style={{ width:40, height:22, borderRadius:11, background:f.destaque?T.gold:T
<div style={{ position:"absolute", top:2, left:f.destaque?19:2, width:16, hei
</div>
<span style={{ fontSize:12, color:T.ink2, fontWeight:600, fontFamily:"sans-seri
</label>
</div>
<div style={{ marginBottom:16 }}>
<label style={lbl}>Cores disponiveis *</label>
{erros.cores && <div style={{ fontSize:10, color:T.ruby, marginBottom:6 }}>{erros
<div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
{Object.keys(CORES).map(function(c){
var sel = f.cores.indexOf(c) >= 0;
return (
<button key={c} onClick={function(){toggleCor(c);}}
style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 10px 5p
<div style={{ width:10, height:10, borderRadius:"50%", background:CORES[c
<span style={{ fontSize:11, color:sel?T.goldDk:T.ink3, fontFamily:"sans-s
</button>
);
})}
</div>
</div>
}}>{er
<div style={{ marginBottom:22 }}>
<label style={lbl}>Tamanhos *</label>
{erros.tamanhos && <div style={{ fontSize:10, color:T.ruby, marginBottom:6 <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
{[["P M G GG",SP],["P M G GG XGG",SX],["Unico",SU]].map(function(item){
return (
<button key={item[0]} onClick={function(){set("tamanhos",item[1].slice());}
style={{ padding:"4px 10px", border:"1px solid "+T.border, borderRadius:6
{item[0]}
</button>
);
})}
</div>
<div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
{["P","M","G","GG","XGG","Unico"].map(function(t){
var sel = f.tamanhos.indexOf(t) >= 0;
return (
<button key={t} onClick={function(){toggleTam(t);}}
style={{ width:54, height:44, background:sel?T.gold:T.panel, border:"1.5p
{t}
</button>
);
})}
</div>
</div>
<div style={{ display:"flex", gap:10 }}>
<button onClick={onClose}
style={{ background:"none", border:"1.5px solid "+T.border, borderRadius:10, pa
Cancelar
</button>
<button onClick={handleSave}
style={{ flex:1, background:T.gold, border:"none", borderRadius:10, padding:"12
{isNew ? "Criar Produto" : "Salvar Alteracoes"}
</button>
</div>
</div>
</div>
</div>
);
}
export default function AdminPage() {
var a = useState(false); var autenticado = a[0]; var setAuth = a[1];
var si = useState(""); var senhaInput = si[0]; var setSenha = si[1];
var se = useState(false); var senhaErro = se[0]; var setErro = se[1];
var p = useState([]); var produtos = p[0]; var setProdutos = p[1];
var m = useState(null); var modal = m[0]; var setModal = m[1];
var cd = useState(null); var confirmDel = cd[0]; var setConfirmDel = cd[1];
var fi = useState("Todos"); var filtro = fi[0]; var setFiltro = fi[1];
var to = useState(null); var toast = to[0]; var setToast = to[1];
useEffect(function(){
if (autenticado) setProdutos(load());
}, [autenticado]);
function showToast(msg) {
setToast(msg);
setTimeout(function(){ setToast(null); }, 3000);
}
function login() {
if (senhaInput === SENHA) { setAuth(true); setErro(false); }
else setErro(true);
}
function salvar(prod) {
var novo;
if (modal === "novo") {
novo = produtos.concat([prod]);
showToast("Produto criado com sucesso!");
} else {
novo = produtos.map(function(x){ return x.id === prod.id ? prod : x; });
showToast("Produto atualizado!");
}
setProdutos(novo);
save(novo);
setModal(null);
}
function excluir(id) {
var novo = produtos.filter(function(x){ return x.id !== id; });
setProdutos(novo);
save(novo);
setConfirmDel(null);
showToast("Produto removido.");
}
function restaurar() {
if (!window.confirm("Restaurar o catalogo original? Todas as alteracoes serao perdidas.")
setProdutos(PADROES);
save(PADROES);
showToast("Catalogo restaurado!");
}
var catsFiltro = ["Todos"].concat(CATS);
var filtrados = filtro === "Todos" ? produtos : produtos.filter(function(x){ return x.cat =
var tagCor = { "Mais Vendido":T.gold, "Novo":T.jade, "Destaque":"#5A7A8B", "Premium":T.ruby
if (!autenticado) {
return (
<div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center",
<div style={{ background:T.panel, border:"1px solid "+T.border, borderRadius:20, padd
<div style={{ textAlign:"center", marginBottom:30 }}>
<div style={{ width:56, height:56, background:T.goldXlt, border:"2px solid "+T.go
<div style={{ fontFamily:"Georgia,serif", fontSize:26, letterSpacing:4, color:T.i
<div style={{ fontSize:10, letterSpacing:3, color:T.ink4, textTransform:"uppercas
</div>
<input
type="password"
value={senhaInput}
onChange={function(e){ setSenha(e.target.value); setErro(false); }}
onKeyDown={function(e){ if(e.key==="Enter") login(); }}
placeholder="Digite a senha"
style={{ width:"100%", padding:"12px 14px", border:"1.5px solid "+(senhaErro?T.ru
<label style={{ display:"block", fontSize:10, letterSpacing:2, color:T.ink4, textTr
/>
{senhaErro && <div style={{ fontSize:11, color:T.ruby, marginBottom:8 }}>Senha inco
<button onClick={login}
style={{ width:"100%", height:48, background:T.gold, border:"none", borderRadius:
Entrar
</button>
</div>
</div>
);
}
return (
<div style={{ minHeight:"100vh", background:T.bg, fontFamily:"sans-serif", color:T.ink }}
{toast && (
<div style={{ position:"fixed", top:20, right:20, zIndex:9999, background:T.panel, bo
<span style={{ color:T.jade, fontWeight:700 }}>OK</span> {toast}
</div>
)}
<header style={{ background:T.panel, borderBottom:"1px solid "+T.border, padding:"14px
<div>
<div style={{ fontFamily:"Georgia,serif", fontSize:22, letterSpacing:4, color:T.ink
<div style={{ fontSize:9, letterSpacing:3, color:T.ink4, textTransform:"uppercase"
</div>
<div style={{ display:"flex", gap:10 }}>
<a href="/" style={{ background:"none", border:"1.5px solid "+T.border, borderRadiu
Ver Loja
</a>
<button onClick={function(){ setModal("novo"); }}
style={{ background:T.gold, border:"none", borderRadius:10, padding:"8px 18px", c
+ Novo Produto
</button>
</div>
</header>
<div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
{[
["Total", produtos.length, T.gold],
["Destaques", produtos.filter(function(x){return x.destaque;}).length, T.jade],
["Categorias", (function(){ var s = {}; produtos.forEach(function(x){s[x.cat]=1;});
["Com Foto", produtos.filter(function(x){return x.foto;}).length, T.goldDk],
].map(function(item){
return (
<div key={item[0]} style={{ background:T.panel, border:"1px solid "+T.border, bor
<div style={{ fontFamily:"Georgia,serif", fontSize:32, color:item[2], fontWeigh
<div style={{ fontSize:11, color:T.ink3, marginTop:4 }}>{item[0]}</div>
</div>
);
})}
</div>
<div style={{ display:"flex", alignItems:"center", gap:10, padding:"20px 24px", flexWra
<div style={{ display:"flex", gap:6, flexWrap:"wrap", flex:1 }}>
{catsFiltro.map(function(c){
var count = c === "Todos" ? produtos.length : produtos.filter(function(x){return
return (
<button key={c} onClick={function(){ setFiltro(c); }}
style={{ padding:"6px 14px", border:"1.5px solid "+(filtro===c?T.gold:T.borde
{c} ({count})
</button>
);
})}
</div>
<button onClick={restaurar}
style={{ background:"none", border:"1.5px solid "+T.border, borderRadius:8, padding
Restaurar Original
</button>
</div>
<div style={{ padding:"0 24px 60px" }}>
<div style={{ background:T.panel, border:"1px solid "+T.border, borderRadius:14, over
<div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 80px 110px", padding
{["Produto","Categoria","Preco","Destaque","Acoes"].map(function(h){
return <div key={h} style={{ fontSize:9, letterSpacing:2, color:T.ink4, textTra
})}
</div>
{filtrados.length === 0 && (
<div style={{ textAlign:"center", padding:"48px", color:T.ink4, fontSize:13 }}>Ne
)}
{filtrados.map(function(prod, i){
return (
<div key={prod.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 80
<div style={{ display:"flex", alignItems:"center", gap:10 }}>
{prod.foto
? <img src={prod.foto} alt={prod.nome} style={{ width:36, height:40, obje
: <div style={{ width:36, height:40, background:T.bg2, borderRadius:6, bo
}
<div>
<div style={{ fontSize:13, fontWeight:700, color:T.ink, fontFamily:"Georg
<div style={{ fontSize:10, color:T.ink4 }}>{prod.sub}</div>
{prod.tag && (
<span style={{ fontSize:8, background:tagCor[prod.tag]||T.gold, color:"
{prod.tag}
</span>
)}
</div>
</div>
<div style={{ fontSize:12, color:T.ink2 }}>{prod.cat}</div>
<div style={{ fontSize:15, color:T.gold, fontWeight:600, fontFamily:"Georgia,
R$ {Number(prod.preco).toFixed(2).replace(".",",")}
</div>
<div style={{ fontSize:11, color:prod.destaque?T.jade:T.ink4, fontWeight:700
{prod.destaque ? "Sim" : "-"}
</div>
<div style={{ display:"flex", gap:6 }}>
<button onClick={function(){ setModal(prod); }}
style={{ padding:"5px 10px", border:"1px solid "+T.border, borderRadius:6
Editar
</button>
<button onClick={function(){ setConfirmDel(prod); }}
style={{ padding:"5px 10px", border:"1px solid "+T.ruby, borderRadius:6,
Del
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
onClose={function(){ setModal(null); }}
/>
)}
{confirmDel && (
<div style={{ position:"fixed", inset:0, zIndex:950, display:"flex", alignItems:"cent
<div onClick={function(){ setConfirmDel(null); }} style={{ position:"absolute", ins
<div style={{ position:"relative", background:T.panel, borderRadius:16, padding:"32
<div style={{ fontSize:28, marginBottom:10 }}>!</div>
<h3 style={{ fontFamily:"Georgia,serif", fontSize:20, color:T.ink, margin:"0 0 8p
<p style={{ fontSize:13, color:T.ink3, margin:"0 0 22px" }}>
<strong>{confirmDel.nome}</strong> sera removido permanentemente.
</p>
<div style={{ display:"flex", gap:10 }}>
<button onClick={function(){ setConfirmDel(null); }}
style={{ flex:1, padding:"12px", border:"1.5px solid "+T.border, borderRadius
Cancelar
</button>
<button onClick={function(){ excluir(confirmDel.id); }}
style={{ flex:1, padding:"12px", border:"none", borderRadius:10, background:T
Excluir
</button>
</div>
</div>
</div>
)}
</div>
);
}
