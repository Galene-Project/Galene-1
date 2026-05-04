import { useState, useEffect } from "react";

const T = {
  bg: "#FAFAF8", bg2: "#F4F1EC", bg3: "#EDE8E0", panel: "#FFFFFF",
  border: "#E0D8CC", gold: "#B8935A", goldDk: "#8A6A38", goldLt: "#D4B07A",
  goldXlt: "#F5EDD8", ink: "#1A1714", ink2: "#3A3530", ink3: "#6A6058",
  ink4: "#9A9088", ruby: "#8B3A3A", jade: "#3A6B4A",
};

const SENHA = "galene2025";
const KEY = "galene_produtos_v1";

const CATS = ["Vestidos","Moletinho","Lanzinha","Conjuntos","Blusas","Regatas","Cardigans","Calcas","Macacoes"];

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
  { id:1,  nome:"Vestido Bella",        cat:"Vestidos",  sub:"Viscolaycra", preco:40, destaque:true,  tag:"Mais Vendido", cores:["Preto","Branco","Vinho","Nude","Marinho"],     tamanhos:SP, desc:"Vestido basico em viscolaycra com caimento elegante.", foto:"" },
  { id:4,  nome:"Vestido Eva",          cat:"Vestidos",  sub:"Viscolaycra", preco:40, destaque:false, tag:null,           cores:["Preto","Caramelo","Verde","Azul"],             tamanhos:SP, desc:"Corte reto com tecido leve e fluido.", foto:"" },
  { id:5,  nome:"Vestido Safira",       cat:"Vestidos",  sub:"Viscolaycra", preco:60, destaque:true,  tag:"Novo",         cores:["Marinho","Vinho","Preto","Grafite"],           tamanhos:SP, desc:"Modelagem sofisticada para uso day to night.", foto:"" },
  { id:6,  nome:"Vestido Naomi",        cat:"Vestidos",  sub:"Viscolaycra", preco:70, destaque:false, tag:null,           cores:["Preto","Nude","Rosa","Bege"],                  tamanhos:SP, desc:"Decote elegante com tecido de alta qualidade.", foto:"" },
  { id:7,  nome:"Vestido Mara",         cat:"Vestidos",  sub:"Viscolaycra", preco:68, destaque:false, tag:null,           cores:["Vinho","Marrom","Terracota","Preto"],          tamanhos:SP, desc:"Vestido midi com textura leve e caimento perfeito.", foto:"" },
  { id:8,  nome:"Vestido Ariel",        cat:"Vestidos",  sub:"Viscolaycra", preco:70, destaque:true,  tag:"Destaque",     cores:["Azul","Verde","Coral","Preto"],                tamanhos:SP, desc:"Vestido vibrante com modelagem contemporanea.", foto:"" },
  { id:9,  nome:"Vestido Nina",         cat:"Vestidos",  sub:"Viscolaycra", preco:85, destaque:true,  tag:"Premium",      cores:["Preto","Marinho","Grafite","Vinho"],           tamanhos:SX, desc:"Linha premium com acabamento refinado.", foto:"" },
  { id:10, nome:"Vestido Lola",         cat:"Vestidos",  sub:"Viscolaycra", preco:70, destaque:false, tag:null,           cores:["Nude","Rosa","Caramelo","Branco"],             tamanhos:SP, desc:"Vestido feminino com tecido macio e confortavel.", foto:"" },
  { id:11, nome:"Vestido Lorena ML",    cat:"Vestidos",  sub:"Viscolaycra", preco:70, destaque:false, tag:null,           cores:["Preto","Bege","Cinza","Marinho"],              tamanhos:SP, desc:"Manga longa com tecido de alto desempenho.", foto:"" },
  { id:12, nome:"Vestido Laila",        cat:"Vestidos",  sub:"Viscolaycra", preco:70, destaque:false, tag:null,           cores:["Verde","Musgo","Preto","Nude"],                tamanhos:SP, desc:"Inspiracao natural com corte anatomico.", foto:"" },
  { id:13, nome:"Vestido Kenya",        cat:"Vestidos",  sub:"Viscolaycra", preco:65, destaque:false, tag:null,           cores:["Colorido","Coral","Laranja","Amarelo"],        tamanhos:SP, desc:"Estilo livre com cores vibrantes.", foto:"" },
  { id:14, nome:"Vestido Marina",       cat:"Vestidos",  sub:"Viscolaycra", preco:65, destaque:false, tag:null,           cores:["Azul","Marinho","Jeans","Cinza"],              tamanhos:SP, desc:"Estilo nautico com corte moderno.", foto:"" },
  { id:15, nome:"Vestido Pandora",      cat:"Vestidos",  sub:"Viscolaycra", preco:65, destaque:false, tag:null,           cores:["Preto","Vinho","Lilas","Cinza"],               tamanhos:SP, desc:"Tecido elastico de alta recuperacao.", foto:"" },
  { id:16, nome:"Vestido Italia",       cat:"Vestidos",  sub:"Viscolaycra", preco:60, destaque:false, tag:null,           cores:["Bege","Nude","OffWhite","Rosa"],               tamanhos:SP, desc:"Inspirado na moda mediterranea.", foto:"" },
  { id:17, nome:"Vestido Allegra",      cat:"Vestidos",  sub:"Viscolaycra", preco:65, destaque:false, tag:null,           cores:["Preto","Coral","Verde","Amarelo"],             tamanhos:SP, desc:"Vestido alegre com cores marcantes.", foto:"" },
  { id:18, nome:"Vestido Brisa",        cat:"Vestidos",  sub:"Viscolaycra", preco:40, destaque:false, tag:null,           cores:["OffWhite","Azul","Rosa","Verde"],              tamanhos:SP, desc:"Leve como uma brisa, conforto o dia todo.", foto:"" },
  { id:19, nome:"Vestido Luana",        cat:"Vestidos",  sub:"Viscolaycra", preco:40, destaque:false, tag:null,           cores:["Preto","Bege","Caramelo"],                    tamanhos:SP, desc:"Basico essencial para o dia a dia.", foto:"" },
  { id:20, nome:"Vestido Elisa",        cat:"Vestidos",  sub:"Viscolaycra", preco:60, destaque:false, tag:null,           cores:["Rosa","Nude","Vinho","Lilas"],                 tamanhos:SP, desc:"Feminino e elegante para qualquer ocasiao.", foto:"" },
  { id:21, nome:"Vestido Aurora",       cat:"Vestidos",  sub:"Viscolaycra", preco:40, destaque:false, tag:null,           cores:["Laranja","Coral","Amarelo","Vermelho"],        tamanhos:SP, desc:"Cores do amanhecer em tecido premium.", foto:"" },
  { id:22, nome:"Vestido Monica Mol.",  cat:"Moletinho", sub:"Moletinho",   preco:75, destaque:true,  tag:"Novo",         cores:["Preto","Cinza","Bege","Marinho"],              tamanhos:SP, desc:"Moletinho premium com caimento relaxado e elegante.", foto:"" },
  { id:23, nome:"Vestido Pandora Mol.", cat:"Moletinho", sub:"Moletinho",   preco:85, destaque:false, tag:null,           cores:["Preto","Grafite","Cinza","Musgo"],             tamanhos:SP, desc:"Macio e confortavel, perfeito para o dia a dia.", foto:"" },
  { id:24, nome:"Vestido Italia Mol.",  cat:"Moletinho", sub:"Moletinho",   preco:75, destaque:false, tag:null,           cores:["Bege","Caramelo","OffWhite","Marrom"],         tamanhos:SP, desc:"Estilo italiano em tecido moletinho premium.", foto:"" },
  { id:25, nome:"Vestido Italia Lanz.", cat:"Lanzinha",  sub:"Lanzinha",    preco:60, destaque:false, tag:null,           cores:["Bege","Nude","OffWhite","Cinza"],              tamanhos:SP, desc:"Lanzinha de alta qualidade com caimento suave.", foto:"" },
  { id:26, nome:"Vestido Monica Lanz.", cat:"Lanzinha",  sub:"Lanzinha",    preco:60, destaque:false, tag:null,           cores:["Preto","Marinho","Grafite"],                  tamanhos:SP, desc:"Modelagem moderna em lanzinha premium.", foto:"" },
  { id:27, nome:"Vestido Monica L2",   cat:"Lanzinha",  sub:"Lanzinha",    preco:60, destaque:false, tag:null,           cores:["Rosa","Lilas","Coral","Nude"],                tamanhos:SP, desc:"Cores pastel delicadas em tecido lanzinha.", foto:"" },
  { id:2,  nome:"Conjunto Dallas",     cat:"Conjuntos", sub:"Viscolaycra", preco:75, destaque:true,  tag:"Mais Vendido", cores:["Preto","Nude","Marinho","Caramelo"],           tamanhos:SP, desc:"Conjunto cropped + saia com caimento impecavel.", foto:"" },
  { id:28, nome:"Conjunto Dani",       cat:"Conjuntos", sub:"Viscolaycra", preco:85, destaque:true,  tag:"Premium",      cores:["Preto","Vinho","Grafite","Marinho"],           tamanhos:SP, desc:"Conjunto sofisticado para ocasioes especiais.", foto:"" },
  { id:29, nome:"Conjunto Tiffany",    cat:"Conjuntos", sub:"Viscolaycra", preco:50, destaque:false, tag:null,           cores:["Nude","Rosa","Bege","OffWhite"],               tamanhos:SP, desc:"Delicado e feminino, ideal para o dia a dia.", foto:"" },
  { id:30, nome:"Conj. Tiffany Mol.",  cat:"Conjuntos", sub:"Moletinho",   preco:98, destaque:false, tag:"Premium",      cores:["Cinza","Bege","Preto","Marinho"],              tamanhos:SP, desc:"Conjunto moletinho premium para o casual chic.", foto:"" },
  { id:31, nome:"Conj. Chantal Calca", cat:"Conjuntos", sub:"Viscolaycra", preco:80, destaque:false, tag:null,           cores:["Preto","Marinho","Grafite","Vinho"],           tamanhos:SP, desc:"Calca + blusa com tecido de alta qualidade.", foto:"" },
  { id:32, nome:"Conjunto Chantal",    cat:"Conjuntos", sub:"Viscolaycra", preco:80, destaque:false, tag:null,           cores:["Nude","Bege","Caramelo","Rosa"],               tamanhos:SP, desc:"Elegancia cotidiana em viscolaycra premium.", foto:"" },
  { id:33, nome:"Blusa Caja",          cat:"Blusas",    sub:"Viscolaycra", preco:35, destaque:false, tag:null,           cores:["Preto","Branco","Nude","Cinza","Azul"],        tamanhos:SP, desc:"Blusa versatil para compor looks variados.", foto:"" },
  { id:34, nome:"Blusa Bagda",         cat:"Blusas",    sub:"Viscolaycra", preco:39, destaque:false, tag:null,           cores:["Preto","Marinho","Verde","Vinho"],             tamanhos:SP, desc:"Modelagem solta com tecido leve.", foto:"" },
  { id:35, nome:"Blusa Julia",         cat:"Blusas",    sub:"Viscolaycra", preco:45, destaque:true,  tag:"Novo",         cores:["Branco","OffWhite","Nude","Rosa"],             tamanhos:SP, desc:"Blusa premium com detalhes delicados.", foto:"" },
  { id:36, nome:"Blusa Yasmin",        cat:"Blusas",    sub:"Viscolaycra", preco:30, destaque:false, tag:null,           cores:["Colorido","Coral","Azul","Verde","Amarelo"],   tamanhos:SP, desc:"Estampas vibrantes para looks descontraidos.", foto:"" },
  { id:37, nome:"Regata Ellen",        cat:"Regatas",   sub:"Viscolaycra", preco:20, destaque:false, tag:null,           cores:["Preto","Branco","Nude","Cinza","Rosa","Azul"], tamanhos:SP, desc:"Regata basica em viscolaycra, essencial no guarda-roupa.", foto:"" },
  { id:38, nome:"Cardigan Canelado",   cat:"Cardigans", sub:"Canelado",    preco:39, destaque:false, tag:null,           cores:["Preto","Bege","Caramelo","Cinza","OffWhite"],  tamanhos:SU, desc:"Cardigan canelado com textura premium.", foto:"" },
  { id:39, nome:"Cardigan Luxor",      cat:"Cardigans", sub:"Viscolycra",  preco:39, destaque:false, tag:null,           cores:["Preto","Marinho","Vinho","Grafite","Nude"],    tamanhos:SU, desc:"Tecido macio e encorpado, ideal para camadas.", foto:"" },
  { id:40, nome:"Calca Pantalona",     cat:"Calcas",    sub:"Viscolaycra", preco:40, destaque:false, tag:null,           cores:["Preto","Marinho","Caramelo","Bege","Cinza"],   tamanhos:SP, desc:"Pantalona fluida com cos elastico confortavel.", foto:"" },
  { id:3,  nome:"Macacao Kami",        cat:"Macacoes",  sub:"Viscolaycra", preco:79, destaque:true,  tag:"Destaque",     cores:["Preto","Nude","Caramelo","Marinho","Vinho"],   tamanhos:SP, desc:"Macacao elegante para looks completos e sofisticados.", foto:"" },
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
  return { id: Date.now(), nome:"", cat:"Vestidos", sub:"Viscolaycra", preco:"", destaque:false, tag:null, cores:[], tamanhos:SP.slice(), desc:"", foto:"" };
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
    if (!f.preco || isNaN(Number(f.preco)) || Number(f.preco) <= 0) e.preco = "Preco invalido";
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

  var inp = { width:"100%", padding:"10px 12px", border:"1.5px solid "+T.border, borderRadius:8, fontSize:13, color:T.ink, background:T.panel, outline:"none", boxSizing:"border-box", fontFamily:"sans-serif" };
  var inpErr = Object.assign({}, inp, { border:"1.5px solid "+T.ruby });
  var lbl = { display:"block", fontSize:10, letterSpacing:2, color:T.ink4, textTransform:"uppercase", marginBottom:6, fontFamily:"sans-serif" };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:900, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(26,23,20,0.55)" }} />
      <div style={{ position:"relative", background:T.panel, width:"100%", maxWidth:580, maxHeight:"92vh", overflowY:"auto", borderRadius:16, boxShadow:"0 24px 80px rgba(26,23,20,0.22)" }}>
        <div style={{ height:3, background:"linear-gradient(90deg,#8A6A38,#B8935A,#D4B07A,#B8935A,#8A6A38)" }} />
        <div style={{ padding:"24px 28px 32px" }}>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
            <h2 style={{ margin:0, fontFamily:"Georgia,serif", fontSize:24, color:T.ink, fontWeight:600 }}>
              {isNew ? "Novo Produto" : "Editar Produto"}
            </h2>
            <button onClick={onClose} style={{ background:"none", border:"1.5px solid "+T.border, borderRadius:8, width:36, height:36, cursor:"pointer", fontSize:16, color:T.ink3 }}>X</button>
          </div>

          <div style={{ marginBottom:14 }}>
            <label style={lbl}>Nome *</label>
            <input value={f.nome} onChange={function(e){set("nome",e.target.value);}} style={erros.nome ? inpErr : inp} placeholder="Ex: Vestido Bella" />
            {erros.nome && <div style={{ fontSize:10, color:T.ruby, marginTop:3 }}>{erros.nome}</div>}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
            <div>
              <label style={lbl}>Categoria</label>
              <select value={f.cat} onChange={function(e){set("cat",e.target.value);}} style={inp}>
                {CATS.map(function(c){ return <option key={c} value={c}>{c}</option>; })}
              </select>
            </div>
            <div>
              <label style={lbl}>Sub-categoria</label>
              <input value={f.sub} onChange={function(e){set("sub",e.target.value);}} style={inp} placeholder="Ex: Viscolaycra" />
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
            <div>
              <label style={lbl}>Preco R$ *</label>
              <input value={f.preco} onChange={function(e){set("preco",e.target.value);}} type="number" min="0" step="0.01" style={erros.preco ? inpErr : inp} placeholder="0.00" />
              {erros.preco && <div style={{ fontSize:10, color:T.ruby, marginTop:3 }}>{erros.preco}</div>}
            </div>
            <div>
              <label style={lbl}>Tag</label>
              <select value={f.tag || ""} onChange={function(e){set("tag",e.target.value||null);}} style={inp}>
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
            <input value={f.foto||""} onChange={function(e){set("foto",e.target.value);}} style={inp} placeholder="https://i.imgur.com/exemplo.jpg" />
          </div>

          <div style={{ marginBottom:14 }}>
            <label style={lbl}>Descricao *</label>
            <textarea value={f.desc} onChange={function(e){set("desc",e.target.value);}} rows={3} style={Object.assign({}, erros.desc ? inpErr : inp, { resize:"vertical" })} />
            {erros.desc && <div style={{ fontSize:10, color:T.ruby, marginTop:3 }}>{erros.desc}</div>}
          </div>

          <div style={{ marginBottom:16 }}>
            <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
              <div onClick={function(){set("destaque",!f.destaque);}}
                style={{ width:40, height:22, borderRadius:11, background:f.destaque?T.gold:T.bg2, border:"1.5px solid "+(f.destaque?T.gold:T.border), position:"relative", transition:"all .2s", cursor:"pointer", flexShrink:0 }}>
                <div style={{ position:"absolute", top:2, left:f.destaque?19:2, width:16, height:16, borderRadius:"50%", background:f.destaque?"white":T.ink4, transition:"left .2s" }} />
              </div>
              <span style={{ fontSize:12, color:T.ink2, fontWeight:600, fontFamily:"sans-serif" }}>Exibir nos Destaques</span>
            </label>
          </div>

          <div style={{ marginBottom:16 }}>
            <label style={lbl}>Cores disponiveis *</label>
            {erros.cores && <div style={{ fontSize:10, color:T.ruby, marginBottom:6 }}>{erros.cores}</div>}
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {Object.keys(CORES).map(function(c){
                var sel = f.cores.indexOf(c) >= 0;
                return (
                  <button key={c} onClick={function(){toggleCor(c);}}
                    style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 10px 5px 7px", border:"1.5px solid "+(sel?T.gold:T.border), borderRadius:20, background:sel?T.goldXlt:T.panel, cursor:"pointer" }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:CORES[c], border:"1px solid rgba(0,0,0,0.1)", flexShrink:0 }} />
                    <span style={{ fontSize:11, color:sel?T.goldDk:T.ink3, fontFamily:"sans-serif" }}>{c}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom:22 }}>
            <label style={lbl}>Tamanhos *</label>
            {erros.tamanhos && <div style={{ fontSize:10, color:T.ruby, marginBottom:6 }}>{erros.tamanhos}</div>}
            <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
              {[["P M G GG",SP],["P M G GG XGG",SX],["Unico",SU]].map(function(item){
                return (
                  <button key={item[0]} onClick={function(){set("tamanhos",item[1].slice());}}
                    style={{ padding:"4px 10px", border:"1px solid "+T.border, borderRadius:6, background:T.bg2, cursor:"pointer", fontSize:10, color:T.ink3, fontFamily:"sans-serif" }}>
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
                    style={{ width:54, height:44, background:sel?T.gold:T.panel, border:"1.5px solid "+(sel?T.gold:T.border), borderRadius:10, cursor:"pointer", fontSize:12, fontWeight:700, color:sel?"white":T.ink2, fontFamily:"sans-serif" }}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onClose}
              style={{ background:"none", border:"1.5px solid "+T.border, borderRadius:10, padding:"12px 20px", cursor:"pointer", fontSize:12, fontWeight:700, color:T.ink3, fontFamily:"sans-serif" }}>
              Cancelar
            </button>
            <button onClick={handleSave}
              style={{ flex:1, background:T.gold, border:"none", borderRadius:10, padding:"12px", cursor:"pointer", fontSize:13, fontWeight:700, color:"white", letterSpacing:1, fontFamily:"sans-serif" }}>
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
    if (!window.confirm("Restaurar o catalogo original? Todas as alteracoes serao perdidas.")) return;
    setProdutos(PADROES);
    save(PADROES);
    showToast("Catalogo restaurado!");
  }

  var catsFiltro = ["Todos"].concat(CATS);
  var filtrados = filtro === "Todos" ? produtos : produtos.filter(function(x){ return x.cat === filtro; });

  var tagCor = { "Mais Vendido":T.gold, "Novo":T.jade, "Destaque":"#5A7A8B", "Premium":T.ruby };

  if (!autenticado) {
    return (
      <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"sans-serif" }}>
        <div style={{ background:T.panel, border:"1px solid "+T.border, borderRadius:20, padding:"40px 36px", width:"100%", maxWidth:360, boxShadow:"0 16px 60px rgba(26,23,20,0.12)" }}>
          <div style={{ textAlign:"center", marginBottom:30 }}>
            <div style={{ width:56, height:56, background:T.goldXlt, border:"2px solid "+T.gold, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", fontSize:24 }}>G</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:26, letterSpacing:4, color:T.ink, fontWeight:600 }}>GALENE</div>
            <div style={{ fontSize:10, letterSpacing:3, color:T.ink4, textTransform:"uppercase", marginTop:4 }}>Painel Administrativo</div>
          </div>
          <label style={{ display:"block", fontSize:10, letterSpacing:2, color:T.ink4, textTransform:"uppercase", marginBottom:8 }}>Senha</label>
          <input
            type="password"
            value={senhaInput}
            onChange={function(e){ setSenha(e.target.value); setErro(false); }}
            onKeyDown={function(e){ if(e.key==="Enter") login(); }}
            placeholder="Digite a senha"
            style={{ width:"100%", padding:"12px 14px", border:"1.5px solid "+(senhaErro?T.ruby:T.border), borderRadius:10, fontSize:14, color:T.ink, background:T.panel, outline:"none", boxSizing:"border-box", marginBottom:6, fontFamily:"sans-serif" }}
          />
          {senhaErro && <div style={{ fontSize:11, color:T.ruby, marginBottom:8 }}>Senha incorreta. Tente novamente.</div>}
          <button onClick={login}
            style={{ width:"100%", height:48, background:T.gold, border:"none", borderRadius:12, cursor:"pointer", fontSize:13, fontWeight:700, color:"white", letterSpacing:1, marginTop:8, fontFamily:"sans-serif" }}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"sans-serif", color:T.ink }}>

      {toast && (
        <div style={{ position:"fixed", top:20, right:20, zIndex:9999, background:T.panel, border:"1px solid "+T.border, borderRadius:10, padding:"12px 18px", display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 20px rgba(26,23,20,0.15)", fontSize:12, color:T.ink2, maxWidth:300 }}>
          <span style={{ color:T.jade, fontWeight:700 }}>OK</span> {toast}
        </div>
      )}

      <header style={{ background:T.panel, borderBottom:"1px solid "+T.border, padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:400, boxShadow:"0 2px 8px rgba(26,23,20,0.06)" }}>
        <div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:22, letterSpacing:4, color:T.ink, fontWeight:600 }}>GALENE</div>
          <div style={{ fontSize:9, letterSpacing:3, color:T.ink4, textTransform:"uppercase" }}>Painel Admin</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <a href="/" style={{ background:"none", border:"1.5px solid "+T.border, borderRadius:8, padding:"8px 14px", cursor:"pointer", fontSize:11, fontWeight:700, color:T.ink3, textDecoration:"none" }}>
            Ver Loja
          </a>
          <button onClick={function(){ setModal("novo"); }}
            style={{ background:T.gold, border:"none", borderRadius:10, padding:"8px 18px", cursor:"pointer", fontSize:12, fontWeight:700, color:"white", letterSpacing:1 }}>
            + Novo Produto
          </button>
        </div>
      </header>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14, padding:"24px 24px 0" }}>
        {[
          ["Total", produtos.length, T.gold],
          ["Destaques", produtos.filter(function(x){return x.destaque;}).length, T.jade],
          ["Categorias", (function(){ var s = {}; produtos.forEach(function(x){s[x.cat]=1;}); return Object.keys(s).length; })(), T.ink3],
          ["Com Foto", produtos.filter(function(x){return x.foto;}).length, T.goldDk],
        ].map(function(item){
          return (
            <div key={item[0]} style={{ background:T.panel, border:"1px solid "+T.border, borderRadius:12, padding:"16px 20px" }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:32, color:item[2], fontWeight:600, lineHeight:1 }}>{item[1]}</div>
              <div style={{ fontSize:11, color:T.ink3, marginTop:4 }}>{item[0]}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"20px 24px", flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", flex:1 }}>
          {catsFiltro.map(function(c){
            var count = c === "Todos" ? produtos.length : produtos.filter(function(x){return x.cat===c;}).length;
            return (
              <button key={c} onClick={function(){ setFiltro(c); }}
                style={{ padding:"6px 14px", border:"1.5px solid "+(filtro===c?T.gold:T.border), borderRadius:20, background:filtro===c?T.goldXlt:T.panel, cursor:"pointer", fontSize:11, fontWeight:filtro===c?700:400, color:filtro===c?T.goldDk:T.ink3 }}>
                {c} ({count})
              </button>
            );
          })}
        </div>
        <button onClick={restaurar}
          style={{ background:"none", border:"1.5px solid "+T.border, borderRadius:8, padding:"7px 14px", cursor:"pointer", fontSize:11, fontWeight:700, color:T.ruby }}>
          Restaurar Original
        </button>
      </div>

      <div style={{ padding:"0 24px 60px" }}>
        <div style={{ background:T.panel, border:"1px solid "+T.border, borderRadius:14, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 80px 110px", padding:"10px 18px", background:T.bg2, borderBottom:"1px solid "+T.border }}>
            {["Produto","Categoria","Preco","Destaque","Acoes"].map(function(h){
              return <div key={h} style={{ fontSize:9, letterSpacing:2, color:T.ink4, textTransform:"uppercase", fontWeight:700 }}>{h}</div>;
            })}
          </div>

          {filtrados.length === 0 && (
            <div style={{ textAlign:"center", padding:"48px", color:T.ink4, fontSize:13 }}>Nenhum produto nesta categoria.</div>
          )}

          {filtrados.map(function(prod, i){
            return (
              <div key={prod.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 80px 110px", padding:"13px 18px", borderBottom:"1px solid "+T.border, background:i%2===0?T.panel:T.bg, alignItems:"center" }}>

                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  {prod.foto
                    ? <img src={prod.foto} alt={prod.nome} style={{ width:36, height:40, objectFit:"cover", borderRadius:6, border:"1px solid "+T.border, flexShrink:0 }} onError={function(e){e.target.style.display="none";}} />
                    : <div style={{ width:36, height:40, background:T.bg2, borderRadius:6, border:"1px solid "+T.border, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:T.ink4 }}>G</div>
                  }
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:T.ink, fontFamily:"Georgia,serif" }}>{prod.nome}</div>
                    <div style={{ fontSize:10, color:T.ink4 }}>{prod.sub}</div>
                    {prod.tag && (
                      <span style={{ fontSize:8, background:tagCor[prod.tag]||T.gold, color:"white", padding:"2px 6px", borderRadius:10, letterSpacing:1, fontWeight:700, display:"inline-block", marginTop:2 }}>
                        {prod.tag}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ fontSize:12, color:T.ink2 }}>{prod.cat}</div>
                <div style={{ fontSize:15, color:T.gold, fontWeight:600, fontFamily:"Georgia,serif" }}>
                  R$ {Number(prod.preco).toFixed(2).replace(".",",")}
                </div>
                <div style={{ fontSize:11, color:prod.destaque?T.jade:T.ink4, fontWeight:700 }}>
                  {prod.destaque ? "Sim" : "-"}
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={function(){ setModal(prod); }}
                    style={{ padding:"5px 10px", border:"1px solid "+T.border, borderRadius:6, background:"none", cursor:"pointer", fontSize:11, color:T.ink3, fontWeight:700 }}>
                    Editar
                  </button>
                  <button onClick={function(){ setConfirmDel(prod); }}
                    style={{ padding:"5px 10px", border:"1px solid "+T.ruby, borderRadius:6, background:"none", cursor:"pointer", fontSize:11, color:T.ruby, fontWeight:700 }}>
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
        <div style={{ position:"fixed", inset:0, zIndex:950, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={function(){ setConfirmDel(null); }} style={{ position:"absolute", inset:0, background:"rgba(26,23,20,0.5)" }} />
          <div style={{ position:"relative", background:T.panel, borderRadius:16, padding:"32px 28px", maxWidth:360, width:"100%", textAlign:"center", boxShadow:"0 16px 60px rgba(26,23,20,0.2)" }}>
            <div style={{ fontSize:28, marginBottom:10 }}>!</div>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:20, color:T.ink, margin:"0 0 8px" }}>Excluir produto?</h3>
            <p style={{ fontSize:13, color:T.ink3, margin:"0 0 22px" }}>
              <strong>{confirmDel.nome}</strong> sera removido permanentemente.
            </p>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={function(){ setConfirmDel(null); }}
                style={{ flex:1, padding:"12px", border:"1.5px solid "+T.border, borderRadius:10, background:"none", cursor:"pointer", fontSize:12, fontWeight:700, color:T.ink3 }}>
                Cancelar
              </button>
              <button onClick={function(){ excluir(confirmDel.id); }}
                style={{ flex:1, padding:"12px", border:"none", borderRadius:10, background:T.ruby, cursor:"pointer", fontSize:12, fontWeight:700, color:"white" }}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
