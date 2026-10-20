// Registra o service worker e oferece o botão "Instalar app".
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch((e) => console.error("SW:", e));
    });
}

const jaInstalado = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
let eventoInstalacao = null;

function criarBotao(texto, aoClicar) {
    if (jaInstalado || document.getElementById("btn-instalar")) return;
    const b = document.createElement("button");
    b.id = "btn-instalar";
    b.type = "button";
    b.textContent = texto;
    b.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(16px + env(safe-area-inset-bottom,0px));" +
        "z-index:50;background:#274D3D;color:#fff;border:0;border-radius:24px;padding:12px 22px;" +
        "font:700 14px 'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer";
    b.onclick = () => aoClicar(b);
    document.body.appendChild(b);
}

// Android / Chrome / Edge
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventoInstalacao = e;
    criarBotao("📲 Instalar app", async (b) => {
        eventoInstalacao.prompt();
        await eventoInstalacao.userChoice;
        eventoInstalacao = null;
        b.remove();
    });
});
window.addEventListener("appinstalled", () => document.getElementById("btn-instalar")?.remove());

// iPhone / iPad (Safari não tem prompt automático)
const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
if (ios && !jaInstalado) {
    window.addEventListener("load", () => criarBotao("📲 Instalar app", (b) => {
        alert("Para instalar: toque em Compartilhar (□↑) e depois em “Adicionar à Tela de Início”.");
    }));
}
