// Preencha com os contatos oficiais do Lar de Maria.
// WhatsApp: código do país + DDD + número, apenas dígitos.
const contatosLarDeMaria = {
    whatsapp: "5581995652416"
};

const destinosContato = {
    "contato-whatsapp": contatosLarDeMaria.whatsapp
        ? `https://wa.me/${contatosLarDeMaria.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre o Lar de Maria.")}`
        : ""
};

for (const [id, destino] of Object.entries(destinosContato)) {
    const botao = document.getElementById(id);
    if (botao && destino) {
        botao.href = destino;
        botao.target = "_blank";
        botao.rel = "noopener noreferrer";
        botao.removeAttribute("aria-disabled");
    }
}
