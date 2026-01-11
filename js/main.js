/**
 * Configuração rápida:
 * - Troque CHECKOUT_URL pelo seu link (Hotmart/Monetizze/Checkout próprio/WhatsApp etc.)
 */
const CHECKOUT_URL = "#checkout";

function wireCTAs(){
  document.querySelectorAll("[data-cta]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      // Se você quiser abrir checkout externo:
      // window.open("https://seu-checkout-aqui.com", "_blank", "noopener,noreferrer");
      // return;

      const target = document.querySelector(CHECKOUT_URL);
      if (target){
        target.scrollIntoView({behavior:"smooth", block:"start"});
      }else{
        location.hash = CHECKOUT_URL;
      }
    });
  });
}

function setYear(){
  const y = new Date().getFullYear();
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = y;
}

document.addEventListener("DOMContentLoaded", () => {
  wireCTAs();
  setYear();
});

// Track GA4 clicks em CTAs
(function () {
  function trackCtaClicks() {
    const buttons = document.querySelectorAll("[data-cta-id]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Se GA não estiver carregado, não quebra nada
        if (typeof window.gtag !== "function") return;

        const ctaId = btn.getAttribute("data-cta-id") || "unknown";
        const ctaLabel = (btn.textContent || "").trim() || "unknown";
        const ctaSection = btn.getAttribute("data-cta-section") || "unknown";
        const href = btn.getAttribute("href") || "";

        window.gtag("event", "cta_click", {
          cta_id: ctaId,
          cta_label: ctaLabel,
          cta_section: ctaSection,
          link_url: href
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackCtaClicks);
  } else {
    trackCtaClicks();
  }
})();

