// ================================
// BLOCO: Helpers (atalhos)
// ================================
const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

// ================================
// BLOCO: Header (efeito blur ao rolar)
// ================================
const header = $(".site-header");
const onScrollHeader = () => {
  if (window.scrollY > 20) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
window.addEventListener("scroll", onScrollHeader);
onScrollHeader();

// ================================
// BLOCO: Menu mobile
// ================================
const toggleBtn = $(".nav-toggle");
const navLinks = $("#navLinks");

toggleBtn?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  toggleBtn.setAttribute("aria-expanded", String(isOpen));
});

$$(".nav-link").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggleBtn?.setAttribute("aria-expanded", "false");
  });
});

// ================================
// BLOCO: Link ativo conforme seção visível
// ================================
const sections = ["home", "about", "skills", "projects", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navMap = new Map();
$$(".nav-link").forEach((a) => {
  const href = a.getAttribute("href") || "";
  if (href.startsWith("#")) navMap.set(href.slice(1), a);
});

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      $$(".nav-link").forEach((a) => a.classList.remove("active"));
      navMap.get(id)?.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
);

sections.forEach((sec) => activeObserver.observe(sec));

// ================================
// BLOCO: Reveal on scroll (animação de entrada)
// ================================
const revealEls = $$(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ================================
// BLOCO: Barras de skill animadas
// ================================
const bars = $$(".bar span[data-fill]");
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const span = e.target;
      const fill = span.getAttribute("data-fill") || "0";
      span.style.width = `${fill}%`;
    });
  },
  { threshold: 0.25 }
);
bars.forEach((b) => barObserver.observe(b));

// ================================
// BLOCO: Formulário de contato (mailto)
// ================================
const form = $("#contactForm");
form?.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  // EDITE AQUI: email que recebe as mensagens
  const to = "galvaoygor81@gmail.com";

  const subject = encodeURIComponent(`Contato do Portfólio - ${name}`);
  const body = encodeURIComponent(
    `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}\n`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});