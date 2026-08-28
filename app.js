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

document.querySelectorAll("form").forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = form.querySelector(".notice");
    if (n) {
      n.classList.add("show");
      n.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    form.reset();
  }),
);
const whatsapp = document.createElement("a");
whatsapp.className = "whatsapp-float";
whatsapp.href =
  "https://wa.me/917988745047?text=Hello%20AdCool%20Products%2C%20I%20would%20like%20to%20enquire%20about%20your%20HVAC%20solutions.";
whatsapp.target = "_blank";
whatsapp.rel = "noopener";
whatsapp.setAttribute("aria-label", "Message AdCool Products on WhatsApp");
whatsapp.innerHTML = "<span>◔</span> WhatsApp Us";
document.body.append(whatsapp);
