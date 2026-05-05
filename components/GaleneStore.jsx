import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const GaleneStore = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  return null; // Placeholder - implement the component UI here
};

export default GaleneStore;
useEffect(() => {
  const fetchProdutos = async () => {
    setCarregando(true);
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) {
      setErro(error.message);
    } else {
      setProdutos(data);
    }
    setCarregando(false);
  };
  fetchProdutos();
}, []);

// --- THEME --------------------------------------------------------------------
const T = {
  bg: "#FAFAF8", bg2: "#F4F1EC", bg3: "#EDE8E0", panel: "#FFFFFF",
  border: "#E0D8CC", border2: "#C8BFB0",
  gold: "#B8935A", goldDk: "#8A6A38", goldLt: "#D4B07A", goldXlt: "#F5EDD8",
  ink: "#1A1714", ink2: "#3A3530", ink3: "#6A6058", ink4: "#9A9088",
  ruby: "#8B3A3A", jade: "#3A6B4A",
};

// --- HELPERS ------------------------------------------------------------------
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

// --- COLOR MAP ----------------------------------------------------------------
const COR_HEX = {
  Preto: "#1A1A1A", Branco: "#F5F2EE", "OffWhite": "#EEEADE",
  Vinho: "#6B2737", Marinho: "#1E3A5F", Nude: "#C4A882",
  Bege: "#C8B89A", Caramelo: "#B5743A", Rosa: "#E8A0A0",
  Vermelho: "#8B2020", Laranja: "#C97A3A", Amarelo: "#D4A82A",
  Azul: "#3A6B9E", Verde: "#4A6B3A", Cinza: "#8A8A8A",
  Grafite: "#484848", Marrom: "#6B4226", Jeans: "#3A5A7A",
  Colorido: "#B8935A", Lilas: "#9B7EC8", Coral: "#E07A5F",
  Musgo: "#5C6B3A", Terracota: "#C16A3A",
};

const SIZES_PADRAO = ["P", "M", "G", "GG"];
const SIZES_PLUS = ["P", "M", "G", "GG", "XGG"];
const SIZES_UNICO = ["Unico"];

// --- CATALOG ------------------------------------------------------------------
const PRODUTOS = [
  // VESTIDOS VISCOLAYCRA
  { id: 1,  nome: "Vestido Bella",       cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: true,  tag: "Mais Vendido", cores: ["Preto","Branco","Vinho","Nude","Marinho"],        tamanhos: SIZES_PADRAO, desc: "Vestido basico em viscolaycra com caimento elegante." },
  { id: 4,  nome: "Vestido Eva",         cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["Preto","Caramelo","Verde","Azul"],                  tamanhos: SIZES_PADRAO, desc: "Corte reto com tecido leve e fluido." },
  { id: 5,  nome: "Vestido Safira",      cat: "Vestidos",  sub: "Viscolaycra", preco: 60, destaque: false,  tag: "Novo",         cores: ["Marinho","Vinho","Preto","Grafite"],                tamanhos: SIZES_PADRAO, desc: "Modelagem sofisticada para uso day to night." },
  { id: 6,  nome: "Vestido Naomi",       cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: null,           cores: ["Preto","Nude","Rosa","Bege"],                       tamanhos: SIZES_PADRAO, desc: "Decote elegante com tecido de alta qualidade." },
  { id: 7,  nome: "Vestido Mara",        cat: "Vestidos",  sub: "Viscolaycra", preco: 68, destaque: false, tag: null,           cores: ["Vinho","Marrom","Terracota","Preto"],               tamanhos: SIZES_PADRAO, desc: "Vestido midi com textura leve e caimento perfeito." },
  { id: 8,  nome: "Vestido Ariel",       cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false,  tag: "Destaque",     cores: ["Azul","Verde","Coral","Preto"],                     tamanhos: SIZES_PADRAO, desc: "Vestido vibrante com modelagem contemporanea." },
  { id: 9,  nome: "Vestido Nina",        cat: "Vestidos",  sub: "Viscolaycra", preco: 85, destaque: false,  tag: "Premium",      cores: ["Preto","Marinho","Grafite","Vinho"],                tamanhos: SIZES_PLUS,   desc: "Linha premium com acabamento refinado." },
  { id: 10, nome: "Vestido Lola",        cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: null,           cores: ["Nude","Rosa","Caramelo","Branco"],                  tamanhos: SIZES_PADRAO, desc: "Vestido feminino com tecido macio e confortavel." },
  { id: 11, nome: "Vestido Lorena ML",   cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: null,           cores: ["Preto","Bege","Cinza","Marinho"],                   tamanhos: SIZES_PADRAO, desc: "Manga longa com tecido de alto desempenho." },
  { id: 12, nome: "Vestido Laila",       cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: null,           cores: ["Verde","Musgo","Preto","Nude"],                     tamanhos: SIZES_PADRAO, desc: "Inspiracao natural com corte anatomico." },
  { id: 13, nome: "Vestido Kenya",       cat: "Vestidos",  sub: "Viscolaycra", preco: 65, destaque: false, tag: null,           cores: ["Colorido","Coral","Laranja","Amarelo"],             tamanhos: SIZES_PADRAO, desc: "Estilo livre com cores vibrantes." },
  { id: 14, nome: "Vestido Marina",      cat: "Vestidos",  sub: "Viscolaycra", preco: 65, destaque: false, tag: null,           cores: ["Azul","Marinho","Jeans","Cinza"],                   tamanhos: SIZES_PADRAO, desc: "Estilo nautico com corte moderno." },
  { id: 15, nome: "Vestido Pandora",     cat: "Vestidos",  sub: "Viscolaycra", preco: 65, destaque: false, tag: null,           cores: ["Preto","Vinho","Lilas","Cinza"],                    tamanhos: SIZES_PADRAO, desc: "Tecido elastico de alta recuperacao." },
  { id: 16, nome: "Vestido Italia",      cat: "Vestidos",  sub: "Viscolaycra", preco: 60, destaque: false, tag: null,           cores: ["Bege","Nude","OffWhite","Rosa"],                   tamanhos: SIZES_PADRAO, desc: "Inspirado na moda mediterranea." },
  { id: 17, nome: "Vestido Allegra",     cat: "Vestidos",  sub: "Viscolaycra", preco: 65, destaque: false, tag: null,           cores: ["Preto","Coral","Verde","Amarelo"],                  tamanhos: SIZES_PADRAO, desc: "Vestido alegre com cores marcantes." },
  { id: 18, nome: "Vestido Brisa",       cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["OffWhite","Azul","Rosa","Verde"],                  tamanhos: SIZES_PADRAO, desc: "Leve como uma brisa, conforto o dia todo." },
  { id: 19, nome: "Vestido Luana",       cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["Preto","Bege","Caramelo"],                          tamanhos: SIZES_PADRAO, desc: "Basico essencial para o dia a dia." },
  { id: 20, nome: "Vestido Elisa",       cat: "Vestidos",  sub: "Viscolaycra", preco: 60, destaque: false, tag: null,           cores: ["Rosa","Nude","Vinho","Lilas"],                      tamanhos: SIZES_PADRAO, desc: "Feminino e elegante para qualquer ocasiao." },
  { id: 21, nome: "Vestido Aurora",      cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["Laranja","Coral","Amarelo","Vermelho"],             tamanhos: SIZES_PADRAO, desc: "Cores do amanhecer em tecido premium." },
  // MOLETINHO
  { id: 22, nome: "Vestido Monica Mol.", cat: "Moletinho", sub: "Moletinho",   preco: 75, destaque: false,  tag: "Novo",         cores: ["Preto","Cinza","Bege","Marinho"],                   tamanhos: SIZES_PADRAO, desc: "Moletinho premium com caimento relaxado e elegante." },
  { id: 23, nome: "Vestido Pandora Mol.",cat: "Moletinho", sub: "Moletinho",   preco: 85, destaque: false, tag: null,           cores: ["Preto","Grafite","Cinza","Musgo"],                  tamanhos: SIZES_PADRAO, desc: "Macio e confortavel, perfeito para o dia a dia." },
  { id: 24, nome: "Vestido Italia Mol.", cat: "Moletinho", sub: "Moletinho",   preco: 75, destaque: false, tag: null,           cores: ["Bege","Caramelo","OffWhite","Marrom"],             tamanhos: SIZES_PADRAO, desc: "Estilo italiano em tecido moletinho premium." },
  // LANZINHA
  { id: 25, nome: "Vestido Italia Lanz.",cat: "Lanzinha",  sub: "Lanzinha",    preco: 60, destaque: false, tag: null,           cores: ["Bege","Nude","OffWhite","Cinza"],                  tamanhos: SIZES_PADRAO, desc: "Lanzinha de alta qualidade com caimento suave." },
  { id: 26, nome: "Vestido Monica Lanz.",cat: "Lanzinha",  sub: "Lanzinha",    preco: 60, destaque: false, tag: null,           cores: ["Preto","Marinho","Grafite"],                        tamanhos: SIZES_PADRAO, desc: "Modelagem moderna em lanzinha premium." },
  { id: 27, nome: "Vestido Monica Lanz.",cat: "Lanzinha",  sub: "Lanzinha",    preco: 60, destaque: false, tag: null,           cores: ["Rosa","Lilas","Coral","Nude"],                      tamanhos: SIZES_PADRAO, desc: "Cores pastel delicadas em tecido lanzinha." },
  // CONJUNTOS
  { id: 2,  nome: "Conjunto Dallas",    cat: "Conjuntos", sub: "Viscolaycra", preco: 75, destaque: true,  tag: "Mais Vendido", cores: ["Preto","Nude","Marinho","Caramelo"],                tamanhos: SIZES_PADRAO, desc: "Conjunto cropped + saia com caimento impecavel." },
  { id: 28, nome: "Conjunto Dani",      cat: "Conjuntos", sub: "Viscolaycra", preco: 85, destaque: false,  tag: "Premium",      cores: ["Preto","Vinho","Grafite","Marinho"],                tamanhos: SIZES_PADRAO, desc: "Conjunto sofisticado para ocasioes especiais." },
  { id: 29, nome: "Conjunto Tiffany",   cat: "Conjuntos", sub: "Viscolaycra", preco: 50, destaque: false, tag: null,           cores: ["Nude","Rosa","Bege","OffWhite"],                   tamanhos: SIZES_PADRAO, desc: "Delicado e feminino, ideal para o dia a dia." },
  { id: 30, nome: "Conj. Tiffany Mol.", cat: "Conjuntos", sub: "Moletinho",   preco: 98, destaque: false, tag: "Premium",      cores: ["Cinza","Bege","Preto","Marinho"],                   tamanhos: SIZES_PADRAO, desc: "Conjunto moletinho premium para o casual chic." },
  { id: 31, nome: "Conj. Chantal Calca",cat: "Conjuntos", sub: "Viscolaycra", preco: 80, destaque: false, tag: null,           cores: ["Preto","Marinho","Grafite","Vinho"],                tamanhos: SIZES_PADRAO, desc: "Calca + blusa com tecido de alta qualidade." },
  { id: 32, nome: "Conjunto Chantal",   cat: "Conjuntos", sub: "Viscolaycra", preco: 80, destaque: false, tag: null,           cores: ["Nude","Bege","Caramelo","Rosa"],                    tamanhos: SIZES_PADRAO, desc: "Elegancia cotidiana em viscolaycra premium." },
  // BLUSAS
  { id: 33, nome: "Blusa Caja",         cat: "Blusas",    sub: "Viscolaycra", preco: 35, destaque: false, tag: null,           cores: ["Preto","Branco","Nude","Cinza","Azul"],             tamanhos: SIZES_PADRAO, desc: "Blusa versatil para compor looks variados." },
  { id: 34, nome: "Blusa Bagda",        cat: "Blusas",    sub: "Viscolaycra", preco: 39, destaque: false, tag: null,           cores: ["Preto","Marinho","Verde","Vinho"],                  tamanhos: SIZES_PADRAO, desc: "Modelagem solta com tecido leve." },
  { id: 35, nome: "Blusa Julia",        cat: "Blusas",    sub: "Viscolaycra", preco: 45, destaque: false,  tag: "Novo",         cores: ["Branco","OffWhite","Nude","Rosa"],                 tamanhos: SIZES_PADRAO, desc: "Blusa premium com detalhes delicados." },
  { id: 36, nome: "Blusa Yasmin",       cat: "Blusas",    sub: "Viscolaycra", preco: 30, destaque: false, tag: null,           cores: ["Colorido","Coral","Azul","Verde","Amarelo"],        tamanhos: SIZES_PADRAO, desc: "Estampas vibrantes para looks descontraidos." },
  // REGATAS
  { id: 37, nome: "Regata Ellen",       cat: "Regatas",   sub: "Viscolaycra", preco: 20, destaque: false, tag: null,           cores: ["Preto","Branco","Nude","Cinza","Rosa","Azul"],      tamanhos: SIZES_PADRAO, desc: "Regata basica em viscolaycra, essencial no guarda-roupa." },
  // CARDIGANS
  { id: 38, nome: "Cardigan Canelado",  cat: "Cardigans", sub: "Canelado",    preco: 39, destaque: false, tag: null,           cores: ["Preto","Bege","Caramelo","Cinza","OffWhite"],      tamanhos: SIZES_UNICO,  desc: "Cardigan canelado com textura premium." },
  { id: 39, nome: "Cardigan Luxor",     cat: "Cardigans", sub: "Viscolycra",  preco: 39, destaque: false, tag: null,           cores: ["Preto","Marinho","Vinho","Grafite","Nude"],         tamanhos: SIZES_UNICO,  desc: "Tecido macio e encorpado, ideal para camadas." },
  // CALCAS
  { id: 40, nome: "Calca Pantalona",    cat: "Calcas",    sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["Preto","Marinho","Caramelo","Bege","Cinza"],        tamanhos: SIZES_PADRAO, desc: "Pantalona fluida com cos elastico confortavel." },
  // MACACOES
  { id: 3,  nome: "Macacao Kami",       cat: "Macacoes",  sub: "Viscolaycra", preco: 79, destaque: true,  tag: "Destaque",     cores: ["Preto","Nude","Caramelo","Marinho","Vinho"],        tamanhos: SIZES_PADRAO, desc: "Macacao elegante para looks completos e sofisticados." },
];

const CATS = [
  { id: "destaques", label: "Destaques",  icon: "*" },
  { id: "Vestidos",  label: "Vestidos",   icon: "+" },
  { id: "Moletinho", label: "Moletinho",  icon: "+" },
  { id: "Lanzinha",  label: "Lanzinha",   icon: "+" },
  { id: "Conjuntos", label: "Conjuntos",  icon: "+" },
  { id: "Blusas",    label: "Blusas",     icon: ">" },
  { id: "Regatas",   label: "Regatas",    icon: "v" },
  { id: "Cardigans", label: "Cardigans",  icon: "o" },
  { id: "Calcas",    label: "Calcas",     icon: "=" },
  { id: "Macacoes",  label: "Macacoes",   icon: "o" },
];

// --- SVG SILHOUETTES ----------------------------------------------------------
const Sil = ({ cat, cor = "#B8935A", sz = 160 }) => {
  const light = ["#F5F2EE","#EEEADE","#C4A882","#C8B89A","#D4A82A","#E8A0A0"].includes(cor);
  const p = { fill: cor, stroke: light ? "#C0A880" : "none", strokeWidth: 0.5 };
  const accent = "rgba(184,147,90,0.3)";

  if (["Blusas","Regatas","Cardigans"].includes(cat)) return (
    <svg width={sz} height={sz} viewBox="0 0 200 185" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}>
      <path d="M36 59C68 47 90 64 100 64C110 64 132 47 164 59L174 97L152 92L152 158L48 158L48 92L26 97Z" {...p} />
      <ellipse cx="100" cy="34" rx="19" ry="22" fill="none" stroke={light ? "#B0906A" : accent} strokeWidth="1.5" />
    </svg>
  );
  if (cat === "Conjuntos") return (
    <svg width={sz} height={sz} viewBox="0 0 200 245" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}>
      <path d="M79 55C63 62 48 75 45 95L48 122L152 122L155 95C152 75 137 62 121 55C112 65 88 65 79 55Z" {...p} />
      <path d="M79 55C68 48 43 45 34 60L41 97C54 93 58 82 67 76Z" {...p} opacity=".7" />
      <path d="M121 55C132 48 157 45 166 60L159 97C146 93 142 82 133 76Z" {...p} opacity=".7" />
      <path d="M64 129L57 235L91 235L101 173L111 235L143 235L136 129Z" {...p} opacity=".92" />
      <ellipse cx="100" cy="30" rx="17" ry="19" fill="none" stroke={light ? "#B0906A" : accent} strokeWidth="1.5" />
    </svg>
  );
  if (cat === "Macacoes") return (
    <svg width={sz} height={sz} viewBox="0 0 200 255" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}>
      <path d="M79 55C61 62 44 78 41 100L44 134C58 130 66 120 74 111L77 142L66 250L91 250L101 185L111 250L134 250L123 142L126 111C134 120 142 130 156 134L159 100C156 78 139 62 121 55C112 65 88 65 79 55Z" {...p} />
      <path d="M79 55C67 48 42 44 33 60L39 100C52 96 57 84 66 77Z" {...p} opacity=".7" />
      <path d="M121 55C133 48 158 44 167 60L161 100C148 96 143 84 134 77Z" {...p} opacity=".7" />
      <ellipse cx="100" cy="30" rx="17" ry="19" fill="none" stroke={light ? "#B0906A" : accent} strokeWidth="1.5" />
    </svg>
  );
  if (cat === "Calcas") return (
    <svg width={sz} height={sz} viewBox="0 0 200 248" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}>
      <rect x="43" y="20" width="114" height="21" rx="3" {...p} />
      <path d="M50 41L150 41L158 128L126 128L113 248L87 248L74 128L42 128Z" {...p} />
    </svg>
  );
  return (
    <svg width={sz} height={sz} viewBox="0 0 200 250" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}>
      <path d="M77 61C60 68 43 83 39 108L43 140C61 135 69 127 77 117L81 150L70 235L130 235L119 150L123 117C131 127 139 135 157 140L161 108C157 83 140 68 123 61C114 71 86 71 77 61Z" {...p} />
      <path d="M77 61C65 54 40 51 31 67L37 104C53 100 59 87 68 80Z" {...p} opacity=".7" />
      <path d="M123 61C135 54 160 51 169 67L163 104C147 100 141 87 132 80Z" {...p} opacity=".7" />
      <ellipse cx="100" cy="33" rx="19" ry="22" fill="none" stroke={light ? "#B0906A" : accent} strokeWidth="1.5" />
    </svg>
  );
};

// --- MODAL PRODUTO ------------------------------------------------------------
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
    setSel((p) => p.map((s) => s.key === key ? { ...s, qtd: Math.max(1, s.qtd + d) } : s));
  const remS = (key) => setSel((p) => p.filter((s) => s.key !== key));

  const totPcs = sel.reduce((a, s) => a + s.qtd, 0);
  const totVal = sel.reduce((a, s) => a + s.qtd * prod.preco, 0);

  const handleAdd = () => {
    if (!sel.length) return;
    onAdd(prod, sel);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: mob ? 0 : 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,23,20,0.55)", backdropFilter: "blur(3px)" }} />
      <div style={{ position: "relative", background: T.panel, width: "100%", maxWidth: 540, maxHeight: mob ? "100dvh" : "90vh", overflowY: "auto", borderRadius: mob ? "18px 18px 0 0" : 18, boxShadow: "0 24px 80px rgba(26,23,20,0.22)", marginTop: mob ? "auto" : 0 }}>
        <div style={{ height: 3, background: `linear-gradient(90deg,${T.goldDk},${T.gold},${T.goldLt},${T.gold},${T.goldDk})` }} />
        <div style={{ padding: mob ? "20px 18px 32px" : "28px 30px 36px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2.5, color: T.ink4, textTransform: "uppercase", marginBottom: 4 }}>
                {prod.cat} - {prod.sub}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 22 : 28, color: T.ink, fontWeight: 600 }}>
                {prod.nome}
              </h2>
            </div>
            <button onClick={onClose} aria-label="Fechar" style={{ background: "none", border: `1.5px solid ${T.border}`, borderRadius: 8, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.ink3, fontSize: 18, flexShrink: 0 }}>&#x2715;</button>
          </div>

          {/* Preview + preco */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 110, height: 120, background: `linear-gradient(135deg,${T.bg2},${T.bg3})`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sil cat={prod.cat} cor={COR_HEX[cor] || T.gold} sz={92} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, color: T.gold, fontWeight: 600, lineHeight: 1 }}>
                {fmt(prod.preco)}
              </div>
              <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.ink4, margin: "4px 0 10px", letterSpacing: 1 }}>
                por peca - atacado
              </div>
              <p style={{ margin: 0, fontFamily: "'Lato',sans-serif", fontSize: 11.5, color: T.ink3, lineHeight: 1.6 }}>
                {prod.desc}
              </p>
            </div>
          </div>

          {/* Cores */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 10 }}>
              Cor: <span style={{ color: T.gold }}>{cor}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {prod.cores.map((c) => (
                <button key={c} onClick={() => setCor(c)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px 5px 7px", border: `1.5px solid ${cor === c ? T.gold : T.border}`, borderRadius: 20, background: cor === c ? T.goldXlt : T.panel, cursor: "pointer", transition: "all .15s" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: COR_HEX[c] || T.gold, border: "1px solid rgba(0,0,0,0.1)" }} />
                  <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: cor === c ? T.goldDk : T.ink3 }}>{c}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tamanhos */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 10 }}>
              Tamanho {tam && <span style={{ color: T.jade }}>{tam}</span>}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {prod.tamanhos.map((t) => (
                <button key={t} onClick={() => setTam(t)} style={{ width: 54, height: 48, background: tam === t ? `linear-gradient(135deg,${T.goldDk},${T.gold})` : T.panel, border: `1.5px solid ${tam === t ? T.gold : T.border}`, borderRadius: 10, cursor: "pointer", fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, color: tam === t ? "white" : T.ink2, transition: "all .15s" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Adicionar combinacao */}
          <button onClick={addSel} disabled={!tam} style={{ width: "100%", height: 44, background: !tam ? T.bg2 : `linear-gradient(135deg,${T.ink2},${T.ink})`, border: "none", borderRadius: 10, cursor: !tam ? "not-allowed" : "pointer", fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, color: !tam ? T.ink4 : "white", letterSpacing: 1, transition: "all .15s", marginBottom: 14 }}>
            {tam ? `+ Adicionar ${cor} / ${tam}` : "Selecione um tamanho"}
          </button>

          {/* Lista de selecoes */}
          {sel.length > 0 && (
            <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, marginBottom: 14, overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2, color: T.ink4, textTransform: "uppercase" }}>
                Selecionados
              </div>
              {sel.map((s) => (
                <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: COR_HEX[s.cor] || T.gold, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11.5, color: T.ink2, flex: 1 }}>{s.cor} / {s.tam}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => updQ(s.key, -1)} style={{ width: 26, height: 26, background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 6, cursor: "pointer", fontSize: 14, color: T.ink2, display: "flex", alignItems: "center", justifyContent: "center" }}>&#x2212;</button>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: T.ink, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{s.qtd}</span>
                    <button onClick={() => updQ(s.key, 1)} style={{ width: 26, height: 26, background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 6, cursor: "pointer", fontSize: 14, color: T.ink2, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: T.gold, minWidth: 60, textAlign: "right" }}>{fmt(s.qtd * prod.preco)}</span>
                  <button onClick={() => remS(s.key)} aria-label="Remover" style={{ background: "none", border: "none", cursor: "pointer", color: T.ink4, fontSize: 16, padding: 2 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px" }}>
                <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3 }}>{totPcs} peca{totPcs !== 1 ? "s" : ""}</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: T.gold, fontWeight: 600 }}>{fmt(totVal)}</span>
              </div>
            </div>
          )}

          {/* Botao principal */}
          <button onClick={handleAdd} disabled={!sel.length} style={{ width: "100%", height: 52, background: sel.length ? `linear-gradient(135deg,${T.goldDk},${T.gold})` : T.bg2, border: "none", borderRadius: 12, cursor: sel.length ? "pointer" : "not-allowed", fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700, color: sel.length ? "white" : T.ink4, letterSpacing: 1, transition: "all .2s" }}>
            {sel.length ? `Adicionar ao Pedido - ${fmt(totVal)}` : "Selecione cor e tamanho"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CARD DESTAQUE ------------------------------------------------------------
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
      style={{ background: T.panel, border: `1.5px solid ${hov ? T.gold : T.border}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", position: "relative", display: "flex", flexDirection: "column", transition: "border-color .2s, box-shadow .2s", boxShadow: hov ? `0 8px 32px rgba(184,147,90,0.18)` : `0 2px 12px rgba(26,23,20,0.06)` }}
    >
      {prod.tag && (
        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 10, background: prod.tag === "Mais Vendido" ? T.gold : prod.tag === "Premium" ? T.ruby : T.jade, color: "white", fontFamily: "'Lato',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase" }}>
          {prod.tag}
        </div>
      )}
      <div style={{ height: mob ? 240 : 300, background: `linear-gradient(160deg,${T.bg2},${T.bg3})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 70% 30%, ${T.goldXlt}40 0%, transparent 60%)` }} />
        <Sil cat={prod.cat} cor={COR_HEX[prod.cores[ci]] || T.gold} sz={mob ? 190 : 240} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to top, ${T.panel}CC, transparent)` }} />
        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
          {prod.cores.map((c, i) => (
            <div key={c} onClick={(e) => { e.stopPropagation(); setCi(i); }} title={c} style={{ width: 12, height: 12, borderRadius: "50%", background: COR_HEX[c] || T.gold, border: `2px solid ${i === ci ? T.gold : "transparent"}`, cursor: "pointer", transition: "border-color .15s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, letterSpacing: 2.5, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>
          {prod.cat} - {prod.sub}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 20 : 24, color: T.ink, marginBottom: 8, fontWeight: 600 }}>
          {prod.nome}
        </div>
        <p style={{ margin: "0 0 16px", fontFamily: "'Lato',sans-serif", fontSize: 11.5, color: T.ink3, lineHeight: 1.6, flex: 1 }}>
          {prod.desc}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 24 : 28, color: T.gold, fontWeight: 600 }}>
              {fmt(prod.preco)}
            </div>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, color: T.ink4 }}>por peca</div>
          </div>
          <button style={{ background: `linear-gradient(135deg,${T.goldDk},${T.gold})`, border: "none", borderRadius: 10, padding: "10px 18px", color: "white", fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
            Selecionar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CARD NORMAL --------------------------------------------------------------
const Card = ({ prod, onClick }) => {
  const [hov, setHov] = useState(false);
  const [ci, setCi] = useState(0);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: T.panel, border: `1px solid ${hov ? T.gold : T.border}`, borderRadius: 12, overflow: "hidden", cursor: "pointer", position: "relative", transition: "all .2s", boxShadow: hov ? `0 6px 24px rgba(184,147,90,0.15)` : `0 1px 8px rgba(26,23,20,0.05)` }}
    >
      {prod.tag && (
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10, background: prod.tag === "Mais Vendido" ? T.gold : prod.tag === "Premium" ? T.ruby : T.jade, color: "white", fontFamily: "'Lato',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 1, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase" }}>
          {prod.tag}
        </div>
      )}
      <div style={{ height: 190, background: `linear-gradient(160deg,${T.bg2},${T.bg3})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <Sil cat={prod.cat} cor={COR_HEX[prod.cores[ci]] || T.gold} sz={155} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 50, background: `linear-gradient(to top, ${T.panel}CC, transparent)` }} />
        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 5 }}>
          {prod.cores.slice(0, 5).map((c, i) => (
            <div key={c} onClick={(e) => { e.stopPropagation(); setCi(i); }} title={c} style={{ width: 8, height: 8, borderRadius: "50%", background: COR_HEX[c] || T.gold, border: `1.5px solid ${i === ci ? T.gold : "transparent"}`, cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "13px 15px 17px" }}>
        <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 4 }}>
          {prod.sub}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: T.ink, marginBottom: 10, fontWeight: 600 }}>
          {prod.nome}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, color: T.gold, fontWeight: 600 }}>
            {fmt(prod.preco)}
          </div>
          <div style={{ background: hov ? `linear-gradient(135deg,${T.goldDk},${T.gold})` : "transparent", border: `1.5px solid ${hov ? T.gold : T.border}`, borderRadius: 8, padding: "6px 12px", fontFamily: "'Lato',sans-serif", fontSize: 10, fontWeight: 700, color: hov ? "white" : T.ink4, transition: "all .2s", letterSpacing: 0.5 }}>
            Ver
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CARRINHO -----------------------------------------------------------------
const Carrinho = ({ cart, onRemove, onFinish, onBack }) => {
  const [step, setStep] = useState(1);
  const [met, setMet] = useState(null);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ razao: "", cnpj: "", email: "", tel: "", end: "", cidade: "" });
  const [formErros, setFormErros] = useState({});
  const w = useWindowWidth();
  const mob = w < 768;

  const totPcs = cart.reduce((s, i) => s + i.sel.reduce((a, x) => a + x.qtd, 0), 0);
  const totVal = cart.reduce((s, i) => s + i.sel.reduce((a, x) => a + x.qtd * i.preco, 0), 0);
  const ok6 = totPcs >= 6;

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
      <div style={{ width: 72, height: 72, background: `linear-gradient(135deg,${T.goldDk},${T.gold})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: T.gold, margin: "0 0 12px" }}>Pedido Enviado!</h2>
      <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: T.ink3, maxWidth: 380, margin: "0 auto 32px", lineHeight: 1.7 }}>
        Recebemos seu pedido. Nossa equipe entrara em contato em breve pelo e-mail informado para confirmar os detalhes.
      </p>
      <button onClick={onFinish} style={{ background: `linear-gradient(135deg,${T.goldDk},${T.gold})`, border: "none", borderRadius: 12, padding: "14px 36px", color: "white", fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
        Continuar Comprando
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: mob ? "20px 14px 100px" : "36px 32px 60px" }}>
      {/* Cabecalho */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <button onClick={onBack} style={{ background: "none", border: `1.5px solid ${T.border}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3, fontWeight: 700 }}>
          Voltar
        </button>
        <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 24 : 32, color: T.ink, fontWeight: 600 }}>
          Meu Pedido
        </h1>
        <div style={{ marginLeft: "auto", fontFamily: "'Lato',sans-serif", fontSize: 11, color: ok6 ? T.jade : T.ruby, fontWeight: 700 }}>
          {totPcs} pc {ok6 ? "- minimo atingido" : `- faltam ${6 - totPcs}`}
        </div>
      </div>

      {!ok6 && totPcs > 0 && (
        <div style={{ background: "#FFF8E6", border: "1px solid #E8C96A", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#8A6A00" }}>
          ? Adicione mais {6 - totPcs} peca{6 - totPcs > 1 ? "s" : ""} para finalizar ? pedido minimo de 6 pecas.
        </div>
      )}

      {/* Steps */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
        {["Itens", "Dados", "Pagamento"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${step > i ? T.gold : T.border}`, background: step > i ? T.goldXlt : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, color: step > i ? T.gold : T.ink4 }}>{i + 1}</span>
              </div>
              <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 600, color: step === i + 1 ? T.ink : T.ink4, whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {i < 2 && <div style={{ width: mob ? 20 : 40, height: 2, background: step > i + 1 ? T.jade : T.border, margin: "0 8px" }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 300px", gap: 24 }}>
        <div>
          {/* STEP 1 - Itens */}
          {step === 1 && (
            <>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px", color: T.ink4, fontFamily: "'Lato',sans-serif", fontSize: 13 }}>
                  Seu carrinho esta vazio.
                </div>
              ) : (
                <>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
                      <div style={{ display: "flex", gap: 14, padding: "14px 16px" }}>
                        <div style={{ width: 54, height: 62, background: `linear-gradient(135deg,${T.bg2},${T.bg3})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Sil cat={item.cat} cor={COR_HEX[item.sel[0]?.cor] || T.gold} sz={48} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: T.ink, fontWeight: 600 }}>{item.nome}</div>
                          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.ink4, marginTop: 2 }}>{item.cat} - {fmt(item.preco)}/pc</div>
                        </div>
                        <button onClick={() => onRemove(idx)} aria-label="Remover item" style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: T.ruby, fontSize: 12, fontWeight: 700 }}>
                                          </button>
                      </div>
                      <div style={{ borderTop: `1px solid ${T.border}`, padding: "10px 16px", background: T.bg }}>
                        {item.sel.map((s) => (
                          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: COR_HEX[s.cor] || T.gold }} />
                            <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3, flex: 1 }}>{s.cor} / {s.tam} - {s.qtd}</span>
                            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: T.gold }}>{fmt(s.qtd * item.preco)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => ok6 && setStep(2)} disabled={!ok6} style={{ width: "100%", height: 50, marginTop: 8, background: ok6 ? `linear-gradient(135deg,${T.goldDk},${T.gold})` : T.bg2, border: "none", borderRadius: 12, cursor: ok6 ? "pointer" : "not-allowed", fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700, color: ok6 ? "white" : T.ink4, letterSpacing: 1 }}>
                    {ok6 ? "Continuar" : `Minimo 6 pecas (faltam ${6 - totPcs})`}
                  </button>
                </>
              )}
            </>
          )}

          {/* STEP 2 - Dados */}
          {step === 2 && (
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
              {[
                ["razao", "Razao Social *", "2"],
                ["cnpj", "CNPJ / CPF *", "1"],
                ["email", "E-mail *", "1"],
                ["tel", "Telefone / WhatsApp *", "1"],
                ["end", "Endereco", "2"],
                ["cidade", "Cidade / Estado", "2"],
              ].map(([f, label, c]) => (
                <div key={f} style={{ gridColumn: `span ${mob ? "1" : c}` }}>
                  <label style={{ display: "block", fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 1.5, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                  <input
                    value={form[f] || ""}
                    onChange={(e) => { setForm((p) => ({ ...p, [f]: e.target.value })); setFormErros((p) => ({ ...p, [f]: false })); }}
                    style={{ width: "100%", background: T.panel, border: `1.5px solid ${formErros[f] ? T.ruby : T.border}`, borderRadius: 8, padding: "11px 14px", fontFamily: "'Lato',sans-serif", fontSize: 13, color: T.ink, outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => (e.target.style.borderColor = T.gold)}
                    onBlur={(e) => (e.target.style.borderColor = formErros[f] ? T.ruby : T.border)}
                  />
                  {formErros[f] && <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.ruby, marginTop: 4 }}>Campo obrigatorio</div>}
                </div>
              ))}
              <div style={{ gridColumn: `span ${mob ? "1" : "2"}`, display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setStep(1)} style={{ background: "none", border: `1.5px solid ${T.border}`, borderRadius: 10, padding: "12px 20px", cursor: "pointer", fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, color: T.ink3 }}>
                  Voltar
                </button>
                <button onClick={irParaPagamento} style={{ flex: 1, background: `linear-gradient(135deg,${T.goldDk},${T.gold})`, border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700, color: "white", letterSpacing: 1 }}>
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 - Pagamento */}
          {step === 3 && !met && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 16 }}>
                {[
                  ["pix", "PIX", "PIX", "Pagamento a vista via chave PIX", T.jade, "#EAF5EE"],
                  ["cartao", "CC", "Cartao de Credito", "Pague na maquininha no ato da entrega", T.gold, T.goldXlt],
                ].map(([v, ic, lb, sub, co, bg]) => (
                  <div key={v} onClick={() => setMet(v)} style={{ background: bg, border: `1.5px solid ${T.border}`, borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "all .2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = co; e.currentTarget.style.boxShadow = `0 4px 16px ${co}30`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{ic}</div>
                    <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 14, fontWeight: 700, color: T.ink2, marginBottom: 4 }}>{lb}</div>
                    <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} style={{ background: "none", border: `1.5px solid ${T.border}`, borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontFamily: "'Lato',sans-serif", fontSize: 12, color: T.ink3, fontWeight: 700 }}>
                Voltar
              </button>
            </div>
          )}

          {step === 3 && met && (
            <div>
              <button onClick={() => setMet(null)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Lato',sans-serif", fontSize: 12, color: T.ink3, marginBottom: 16, fontWeight: 700 }}>
                Escolher outra forma
              </button>

              {met === "pix" && (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ background: "#EAF5EE", border: "1px solid #B8D8C4", borderRadius: 16, padding: "28px 24px", marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3, marginBottom: 8, letterSpacing: 1 }}>TOTAL A PAGAR</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: T.ink2, marginBottom: 4 }}>{totPcs} pecas</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, color: T.jade, fontWeight: 600 }}>{fmt(totVal)}</div>
                    <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.jade, marginTop: 8, letterSpacing: 1.5 }}>VIA PIX - NOSSA EQUIPE ENVIARA A CHAVE</div>
                  </div>
                  <button onClick={() => setOk(true)} style={{ width: "100%", background: `linear-gradient(135deg,${T.jade},#4A8B5A)`, border: "none", borderRadius: 12, padding: "16px", color: "white", fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
                    Confirmar Pedido via PIX
                  </button>
                </div>
              )}

              {met === "cartao" && (
                <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12 }}>
                  {[["Numero do Cartao", "2"], ["Nome no Cartao", "2"], ["Validade", "1"], ["CVV", "1"]].map(([l, c]) => (
                    <div key={l} style={{ gridColumn: `span ${mob ? "1" : c}` }}>
                      <label style={{ display: "block", fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 1.5, color: T.ink4, textTransform: "uppercase", marginBottom: 6 }}>{l}</label>
                      <input style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${T.border}`, borderRadius: 8, fontFamily: "'Lato',sans-serif", fontSize: 13, color: T.ink, background: T.panel, outline: "none", boxSizing: "border-box" }}
                        onFocus={(e) => (e.target.style.borderColor = T.gold)}
                        onBlur={(e) => (e.target.style.borderColor = T.border)} />
                    </div>
                  ))}
                  <div style={{ gridColumn: `span ${mob ? "1" : "2"}` }}>
                    <button onClick={() => setOk(true)} style={{ width: "100%", background: `linear-gradient(135deg,${T.goldDk},${T.gold})`, border: "none", borderRadius: 12, padding: "16px", color: "white", fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
                      Confirmar Pedido ? {fmt(totVal)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Resumo */}
        {(!mob || step === 1) && (
          <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", height: "fit-content", position: mob ? "static" : "sticky", top: 130 }}>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2.5, color: T.ink4, textTransform: "uppercase", marginBottom: 16 }}>Resumo</div>
            {cart.map((item, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: T.ink, fontWeight: 600, marginBottom: 4 }}>{item.nome}</div>
                {item.sel.map((s) => (
                  <div key={s.key} style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.ink4 }}>{s.cor} / {s.tam} - {s.qtd}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, color: T.ink3 }}>{fmt(s.qtd * item.preco)}</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12, marginTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3 }}>{totPcs} pecas</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: T.ink3 }}>{fmt(totVal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: T.ink, fontWeight: 600 }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: T.gold, fontWeight: 600 }}>{fmt(totVal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SIDEBAR ------------------------------------------------------------------
const Sidebar = ({ cat, setCat, mobile, onClose }) => {
  const counts = { destaques: PRODUTOS.filter((p) => p.destaque).length };
  CATS.forEach((c) => { if (c.id !== "destaques") counts[c.id] = PRODUTOS.filter((p) => p.cat === c.id).length; });

  return (
    <div style={{ width: mobile ? 260 : 200, background: T.panel, borderRight: `1px solid ${T.border}`, height: "100%", overflowY: "auto" }}>
      {mobile && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 16px 12px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: T.gold, fontWeight: 600 }}>Categorias</span>
          <button onClick={onClose} aria-label="Fechar menu" style={{ background: "none", border: "none", fontSize: 20, color: T.ink3, cursor: "pointer" }}>&#x2715;</button>
        </div>
      )}
      <div style={{ padding: "16px 0 28px" }}>
        <div style={{ padding: "0 16px 8px", fontFamily: "'Lato',sans-serif", fontSize: 9, letterSpacing: 2, color: T.ink4, textTransform: "uppercase" }}>
          Categorias
        </div>
        {CATS.map((c) => {
          const ativa = cat === c.id;
          return (
            <button key={c.id} onClick={() => { setCat(c.id); if (mobile && onClose) onClose(); }}
              style={{ width: "100%", textAlign: "left", background: ativa ? T.goldXlt : "transparent", border: "none", padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, borderLeft: `3px solid ${ativa ? T.gold : "transparent"}`, transition: "all .15s" }}
              onMouseEnter={(e) => { if (!ativa) e.currentTarget.style.background = T.bg2; }}
              onMouseLeave={(e) => { if (!ativa) e.currentTarget.style.background = "transparent"; }}>
              <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{c.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: ativa ? 700 : 500, color: ativa ? T.goldDk : T.ink2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {c.label}
                </div>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, color: T.ink4, marginTop: 1 }}>
                  {counts[c.id] || 0} produtos
                </div>
              </div>
              {ativa && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.gold, flexShrink: 0 }} />}
            </button>
          );
        })}

        {/* Condicoes */}
        <div style={{ margin: "20px 12px 0", padding: "14px", background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 10 }}>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9, letterSpacing: 2, color: T.ink4, textTransform: "uppercase", marginBottom: 10 }}>
            Condicoes
          </div>
          {[["Pedido min.", "6 pecas"], ["Pagamento", "PIX ou Cartao"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink2, fontWeight: 600 }}>{k}</span>
              <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: T.ink3 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ------------------------------------------------------------
export default function GaleneStore() {
  const w = useWindowWidth();
  const mob = w < 900;
  const [cat, setCat] = useState("destaques");
  const [modal, setModal] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("loja");
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState(null);

  const totPcs = cart.reduce((s, i) => s + i.sel.reduce((a, x) => a + x.qtd, 0), 0);
  const prods = cat === "destaques" ? PRODUTOS.filter((p) => p.destaque) : PRODUTOS.filter((p) => p.cat === cat);

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
    setToast(`${n} peca${n > 1 ? "s" : ""} de "${prod.nome}" adicionada${n > 1 ? "s" : ""}!`);
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleFinish = useCallback(() => {
    setCart([]);
    setView("loja");
    setCat("destaques");
  }, []);

  return (
    <div style={{ fontFamily: "'Lato',sans-serif", background: T.bg, minHeight: "100vh", color: T.ink }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        body{margin:0;padding:0}
        input{font-size:16px!important;-webkit-appearance:none}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:${T.gold}55;border-radius:4px}
        ::-webkit-scrollbar-track{background:${T.bg2}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}
        @keyframes toastIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp .38s ease}
        .slide{animation:slideLeft .22s ease}
        .toast{animation:toastIn .25s ease}
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="toast" style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(26,23,20,0.15)", fontFamily: "'Lato',sans-serif", fontSize: 12, color: T.ink2, maxWidth: 320 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{color:T.jade}}><polyline points="20 6 9 17 4 12"/></svg>{toast}
        </div>
      )}

      {/* Drawer mobile */}
      {mob && drawer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 600 }}>
          <div onClick={() => setDrawer(false)} style={{ position: "absolute", inset: 0, background: "rgba(26,23,20,0.4)" }} />
          <div className="slide" style={{ position: "absolute", top: 0, left: 0, bottom: 0 }}>
            <Sidebar cat={cat} setCat={setCat} mobile={true} onClose={() => setDrawer(false)} />
          </div>
        </div>
      )}

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 400, background: T.panel, borderBottom: `1px solid ${T.border}`, boxShadow: "0 2px 12px rgba(26,23,20,0.06)" }}>
        <div style={{ background: `linear-gradient(135deg,${T.goldDk},${T.gold},${T.goldDk})`, padding: "7px 16px", textAlign: "center", fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2.5, color: "white", fontWeight: 700 }}>
          * ATACADO * PIX E CARTAO * PEDIDO MINIMO 6 PECAS *
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: mob ? "12px 14px" : "14px 24px" }}>
          {mob && (
            <button onClick={() => setDrawer(true)} aria-label="Menu" style={{ background: "none", border: `1.5px solid ${T.border}`, borderRadius: 8, padding: "8px 10px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 3 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: i === 1 ? 14 : 18, height: 2, background: T.gold, borderRadius: 2 }} />
              ))}
            </button>
          )}

          {/* Logo */}
          <div onClick={() => { setView("loja"); setCat("destaques"); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <svg width={mob ? 30 : 38} height={mob ? 30 : 38} viewBox="0 0 80 80" fill="none">
              <polygon points="40,4 74,22 74,58 40,76 6,58 6,22" stroke={T.gold} strokeWidth="2" fill="none" />
              <polygon points="40,12 66,27 66,53 40,68 14,53 14,27" stroke={T.gold} strokeWidth="1" fill={T.goldXlt} />
              <circle cx="40" cy="40" r="6" fill={T.gold} />
              {[0, 60, 120, 180, 240, 300].map((a, i) => {
                const r = 16, rad = (a * Math.PI) / 180;
                return <circle key={i} cx={40 + r * Math.cos(rad)} cy={40 + r * Math.sin(rad)} r="2" fill={T.gold} opacity="0.6" />;
              })}
            </svg>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 20 : 26, letterSpacing: 4, color: T.ink, fontWeight: 600, lineHeight: 1 }}>GALENE</div>
              {!mob && <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 8.5, letterSpacing: 3, color: T.ink4, textTransform: "uppercase" }}>Moda Feminina Atacado</div>}
            </div>
          </div>

          {/* Nav direita */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!mob && (
              <button onClick={() => { setView("loja"); setCat("destaques"); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, color: view === "loja" ? T.gold : T.ink3, letterSpacing: 1.5, padding: "8px 12px" }}>
                CATALOGO
              </button>
            )}
            <button onClick={() => setView("carrinho")} style={{ background: view === "carrinho" ? T.goldXlt : "none", border: `1.5px solid ${view === "carrinho" ? T.gold : T.border}`, borderRadius: 10, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, color: view === "carrinho" ? T.goldDk : T.ink2, transition: "all .15s", position: "relative" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {!mob && "Pedido"}
              {totPcs > 0 && (
                <span style={{ background: T.gold, color: "white", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, position: mob ? "absolute" : "static", top: mob ? -4 : "auto", right: mob ? -4 : "auto" }}>
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
            <div style={{ position: "sticky", top: 112, height: "calc(100vh - 112px)", overflowY: "auto", flexShrink: 0 }}>
              <Sidebar cat={cat} setCat={setCat} mobile={false} />
            </div>
          )}

          {/* Main */}
          <main style={{ flex: 1, padding: mob ? "14px 12px 100px" : "28px 32px 60px", minWidth: 0 }}>
            {/* Hero banner - Destaques */}
            {cat === "destaques" && (
              <div style={{ background: `linear-gradient(135deg,${T.bg2},${T.bg3})`, borderRadius: 16, padding: mob ? "24px 20px" : "28px 36px", marginBottom: 28, position: "relative", overflow: "hidden", borderTop: `3px solid ${T.gold}` }}>
                <div style={{ position: "absolute", right: mob ? 16 : 40, top: "50%", transform: "translateY(-50%)", opacity: 0.08, fontSize: mob ? 80 : 120, fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, color: T.goldDk, userSelect: "none", lineHeight: 1 }}>G</div>
                <div style={{ position: "relative" }}>
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, letterSpacing: 4, color: T.gold, textTransform: "uppercase", marginBottom: 8 }}>
                    Colecao Atual
                  </div>
                  <h1 style={{ margin: "0 0 8px", fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? 28 : 38, color: T.ink, fontWeight: 600 }}>
                    Destaques Galene
                  </h1>
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink3, letterSpacing: 0.5 }}>
                    Pecas selecionadas - Atacado feminino
                  </div>
                </div>
              </div>
<main>
  <h2 className="titulo-categoria" style={{borderBottom: `1px solid ${T.border}`}}>
    Vitrine da GaleneStore
  </h2>

  {/* Seção de Destaques */}
  <section className="destaques">
    {carregando ? (
      <div className="loading">Carregando destaques...</div>
    ) : (
      <div className="grid grid-cols-4 gap-4">
        {produtos.slice(0, 4).map((produto) => (
          <div key={produto.id} className="produto-destaque">
            <img src={produto.imagem} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco}</p>
          </div>
        ))}
      </div>
    )}
  </section>

  {/* Catálogo Normal */}
  <section className="catalogo">
    {carregando ? (
      <div className="loading">Carregando catálogo...</div>
    ) : (
      <div className="grid grid-cols-4 gap-4">
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} className="produto-card">
            <img src={produto.imagem} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco}</p>
          </div>
        ))}
      </div>
    )}
  </section>
</main>
          </main>
        </div>
      )}
                  <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: T.ink4 }}>
                    {prods.length} produtos
                  </span>
                </div>
            
      {/* Modal */}
      {modal && <ModalProd prod={modal} onClose={() => setModal(null)} onAdd={addToCart} />}

      {/* Nav mobile bottom */}
      {mob && view !== "carrinho" && (
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.panel, borderTop: `1px solid ${T.border}`, display: "flex", padding: "8px 0 12px", zIndex: 300, boxShadow: "0 -4px 16px rgba(26,23,20,0.08)" }}>
          {[
            ["menu", "=", "Menu", () => setDrawer(true)],
            ["loja", "+", "Catalogo", () => { setView("loja"); setCat("destaques"); }],
            ["carrinho", "o", "Pedido", () => setView("carrinho")],
          ].map(([v, icon, label, action]) => (
            <button key={v} onClick={action} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 0", position: "relative" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 9.5, fontWeight: view === v && v !== "menu" ? 700 : 400, color: view === v && v !== "menu" ? T.gold : T.ink3 }}>
                {label}
              </span>
              {v === "carrinho" && totPcs > 0 && (
                <span style={{ position: "absolute", top: 0, right: "22%", background: T.gold, color: "white", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900 }}>{totPcs}</span>
              )}
              {view === v && v !== "menu" && <div style={{ width: 16, height: 2, background: T.gold, borderRadius: 2 }} />}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
