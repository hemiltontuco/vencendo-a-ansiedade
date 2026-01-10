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
