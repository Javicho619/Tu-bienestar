// ====== CONFIGURA AQUÍ ======
const CONFIG = {
  whatsapp: "51920397066",     // <-- Cambia por el número real (51 + número)
  facebook: "https://web.facebook.com/nancy.orconrivera",
  tiktok: "https://tiktok.com/@nancymaritza3",
  catalogo: "#",               // link a PDF (Drive/Dropbox/etc.) o "#"
  ciudad: "Chupaca"
};
// ============================

document.getElementById("year").textContent = new Date().getFullYear();

// Links de redes
const fb = document.getElementById("linkFacebook");
const tk = document.getElementById("linkTiktok");
const cat = document.getElementById("linkCatalogo");
fb.href = CONFIG.facebook;
tk.href = CONFIG.tiktok;
cat.href = CONFIG.catalogo;

// Botón WhatsApp del hero
const cta = document.getElementById("ctaWhatsapp");
cta.href = makeWhatsAppLink(`Hola 👋 Estoy en ${CONFIG.ciudad} y quiero información sobre tus packs.`);

// Botones "Consultar precio"
document.querySelectorAll(".js-quote").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.dataset.pack || "un producto";
    const msg = `Hola 👋 Quiero consultar por: ${item}. ¿Me puedes pasar precio y cómo se usa?`;
    window.open(makeWhatsAppLink(msg), "_blank", "noreferrer");
  });
});

// Filtro de productos por categoría
const chips = document.querySelectorAll(".chip");
const products = document.querySelectorAll(".product");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    products.forEach((p) => {
      const cat = p.dataset.cat;
      const show = filter === "all" || filter === cat;
      p.style.display = show ? "" : "none";
    });
  });
});

// Formulario → WhatsApp
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const name = data.get("name");
  const goal = data.get("goal");
  const message = data.get("message");

  const msg =
`Hola 👋 Soy ${name}.
Mi objetivo: ${goal}.
Mensaje: ${message}`;

  hint.textContent = "Abriendo WhatsApp…";
  window.open(makeWhatsAppLink(msg), "_blank", "noreferrer");
  form.reset();
  setTimeout(() => (hint.textContent = ""), 1500);
});

function makeWhatsAppLink(text) {
  const base = `https://wa.me/${CONFIG.whatsapp}`;
  const q = encodeURIComponent(text);
  return `${base}?text=${q}`;
}
// Botón WhatsApp del perfil
const btnPerfil = document.getElementById("btnWhatsappPerfil");
if (btnPerfil) {
  btnPerfil.href = makeWhatsAppLink("Hola 👋 Vi tu página y quiero información sobre los packs.");
}
