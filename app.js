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

    if (form.hasAttribute("action")) return;

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
whatsapp.innerHTML = "<span>◔</span> WhatsApp Us";
document.body.append(whatsapp);
