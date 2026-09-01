const skeletonLoader = document.createElement("div");
skeletonLoader.className = "skeleton-loader";
skeletonLoader.setAttribute("role", "status");
skeletonLoader.setAttribute("aria-label", "Loading AdCool Products website");
skeletonLoader.innerHTML = `
  <div class="skeleton-shell">
    <div class="skeleton-nav">
      <span class="skeleton-mark">A</span>
      <span class="skeleton-line skeleton-nav-link"></span>
      <span class="skeleton-line skeleton-nav-link"></span>
      <span class="skeleton-line skeleton-nav-link skeleton-nav-link-last"></span>
      <span class="skeleton-pill"></span>
    </div>
    <div class="skeleton-hero">
      <span class="skeleton-kicker"></span>
      <span class="skeleton-title skeleton-title-wide"></span>
      <span class="skeleton-title skeleton-title-short"></span>
      <span class="skeleton-copy"></span>
      <span class="skeleton-copy skeleton-copy-short"></span>
      <span class="skeleton-button"></span>
    </div>
    <div class="skeleton-content">
      <span class="skeleton-section-title"></span>
      <span class="skeleton-section-copy"></span>
      <div class="skeleton-cards">
        <div class="skeleton-card"><span></span><i></i><i></i></div>
        <div class="skeleton-card"><span></span><i></i><i></i></div>
        <div class="skeleton-card skeleton-card-last"><span></span><i></i><i></i></div>
      </div>
    </div>
  </div>
`;
document.body.prepend(skeletonLoader);
document.documentElement.classList.add("page-loading");

const skeletonStartedAt = performance.now();
let skeletonHasFinished = false;
const finishSkeleton = () => {
  if (skeletonHasFinished) return;
  skeletonHasFinished = true;
  const elapsed = performance.now() - skeletonStartedAt;
  const delay = Math.max(0, 480 - elapsed);

  window.setTimeout(() => {
    document.documentElement.classList.remove("page-loading");
    skeletonLoader.classList.add("is-hidden");
    window.setTimeout(() => skeletonLoader.remove(), 420);
  }, delay);
};

if (document.readyState === "complete") {
  finishSkeleton();
} else {
  window.addEventListener("load", finishSkeleton, { once: true });
  window.setTimeout(finishSkeleton, 7000);
}

document
  .querySelector(".menu-btn")
  ?.addEventListener("click", () =>
    document.querySelector(".nav-links").classList.toggle("open"),
  );

const callButton = document.querySelector("[data-phone]");
if (callButton) {
  const updateCallTarget = () => {
    callButton.href = window.matchMedia("(max-width: 700px)").matches
      ? callButton.dataset.phone
      : "contact/index.html#contact-details";
  };
  updateCallTarget();
  window.addEventListener("resize", updateCallTarget);
}

document.querySelectorAll("form").forEach((form) => {
  const requiredTextFields = form.querySelectorAll(
    "input[required], textarea[required]",
  );

  const validateRequiredText = () => {
    requiredTextFields.forEach((field) => {
      field.setCustomValidity(
        field.value.trim() ? "" : "Please enter a valid value.",
      );
    });
  };

  requiredTextFields.forEach((field) =>
    field.addEventListener("input", validateRequiredText),
  );

  form.addEventListener("submit", (e) => {
    validateRequiredText();
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }

    e.preventDefault();
    const n = form.querySelector(".notice");
    if (n) {
      n.classList.add("show");
      n.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    form.reset();
  });
});
const whatsapp = document.createElement("a");
whatsapp.className = "whatsapp-float";
whatsapp.href =
  "https://wa.me/917988745047?text=Hello%20AdCool%20Products%2C%20I%20would%20like%20to%20enquire%20about%20your%20HVAC%20solutions.";
whatsapp.target = "_blank";
whatsapp.rel = "noopener";
whatsapp.setAttribute("aria-label", "Message AdCool Products on WhatsApp");
whatsapp.innerHTML = `
  <span class="whatsapp-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.47 0 .12 5.35.12 11.96c0 2.1.55 4.15 1.6 5.95L0 24l6.27-1.64a11.96 11.96 0 0 0 5.81 1.78h.01c6.61 0 11.96-5.35 11.96-11.96 0-3.2-1.25-6.2-3.53-8.7ZM12.08 21.8h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-3.72.97 1-3.63-.23-.37A9.84 9.84 0 1 1 12.08 21.8Zm5.39-7.37c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.15-.19.29-.73.94-.9 1.14-.16.19-.33.21-.62.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.03 2.75 1.17 2.94.14.19 1.99 3.02 4.82 4.24.67.29 1.2.46 1.61.59.67.21 1.28.18 1.76.11.54-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.11-.26-.18-.55-.33Z" />
    </svg>
  </span>
  <span>WhatsApp Us</span>`;
document.body.append(whatsapp);
