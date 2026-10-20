// Service worker do Lar de Maria. Mude a VERSAO sempre que publicar alterações.
const VERSAO = "v1";
const CACHE = `lar-de-maria-${VERSAO}`;
const ARQUIVOS = [
    "./", "index.html", "sobre.html", "acolhimento.html", "ajudar.html", "apadrinhar.html", "agendar.html",
    "estilo.css", "script.js", "contatos.js", "pwa.js", "manifest.json",
    "icone-192.png", "icone-512.png", "apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys()
            .then((nomes) => Promise.all(nomes.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
    const req = e.request;
    if (req.method !== "GET") return;
    const url = new URL(req.url);

    // Nunca intercepta chamadas dinâmicas do Firebase (login, banco de dados)
    if (/googleapis\.com$/.test(url.hostname) && !/fonts\./.test(url.hostname)) return;
    if (/firebaseapp\.com$|firebaseio\.com$/.test(url.hostname)) return;

    // Páginas: tenta a rede primeiro, cai para o cache se estiver offline
    if (req.mode === "navigate") {
        e.respondWith(
            fetch(req).then((r) => {
                const copia = r.clone();
                caches.open(CACHE).then((c) => c.put(req, copia));
                return r;
            }).catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
        );
        return;
    }

    // Demais arquivos (CSS, JS, fontes, SDK do Firebase): cache primeiro, atualiza em segundo plano
    e.respondWith(
        caches.match(req).then((emCache) => {
            const rede = fetch(req).then((r) => {
                if (r.ok || r.type === "opaque") {
                    const copia = r.clone();
                    caches.open(CACHE).then((c) => c.put(req, copia));
                }
                return r;
            }).catch(() => emCache);
            return emCache || rede;
        })
    );
});
