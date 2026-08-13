// Configurações de integração do painel administrativo.
// Preencha cada campo conforme as integrações forem sendo provisionadas
// (ver ROADMAP.md — Fase 4 WhatsApp, Fase 5 planilha).

const CONFIG = {
  googleSheets: {
    sheetId: "AQUI",
    apiKey: "AQUI",
    ranges: {
      estoque: "Estoque!A3:P2000",
      pedidos: "Pedidos!A3:L2000",
      catalogo: "Catalogo!A3:J200",
    },
    refreshIntervalMs: 30000,
  },

  evolutionApi: {
    baseUrl: "AQUI",
    instanceName: "galene",
    apiKey: "AQUI",
    webhookUrl: "AQUI",
  },

  n8n: {
    baseUrl: "AQUI",
    webhookPath: "/webhook/whatsapp",
  },

  store: {
    name: "Galene",
    agentName: "Gabi",
    whatsapp: "AQUI",
    instagram: "@galene",
    minOrder: 6,
    payment: ["PIX", "Cartão de Crédito"],
  },
};

export default CONFIG;
