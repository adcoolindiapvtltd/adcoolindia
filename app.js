const pageCache = new Map();
let activeNavigation;
const ANALYTICS_MEASUREMENT_ID = "";
const CONSENT_NOTICE_KEY = "adc-cookie-notice-dismissed-v1";
const ANALYTICS_CONSENT_KEY = ANALYTICS_MEASUREMENT_ID
  ? `adc-analytics-consent:${ANALYTICS_MEASUREMENT_ID}`
  : "";
const WHATSAPP_URL =
  "https://wa.me/919953195901?text=Hello%20AdCool%20India%20Private%20Limited%2C%20I%20would%20like%20to%20enquire%20about%20Panel%20AC%2C%20Chillers%20or%20AMC.";

const normalizePath = (path) =>
  path.replace(/\/index\.html$/i, "").replace(/\/$/, "") || "/";

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.error("Unable to read the saved cookie preference.", error);
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.error("Unable to save the cookie preference.", error);
  }
}

function ensureNavigationStatus() {
  if (document.querySelector(".navigation-status")) return;
  const status = document.createElement("div");
  status.className = "navigation-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.textContent = "Loading page";
  document.body.append(status);
}

function ensureMobileCta() {
  let bar = document.querySelector(".mobile-bar");
  if (!bar) {
    bar = document.createElement("nav");
    bar.className = "mobile-bar";
    bar.setAttribute("aria-label", "Quick contact");

    const call = document.createElement("a");
    call.className = "mobile-bar-call";
    call.href = "tel:+919953195901";
    call.textContent = "Call";
    bar.append(call);

    const whatsapp = document.createElement("a");
    whatsapp.className = "mobile-bar-whatsapp";
    whatsapp.href = WHATSAPP_URL;
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener";
    whatsapp.textContent = "WhatsApp";
    bar.append(whatsapp);

    const quote = document.createElement("a");
    quote.className = "btn";
    quote.textContent = "Get a Quote";
    bar.append(quote);
    document.body.append(bar);
  }

  const quoteLink = document.querySelector(".nav > .btn");
  const mobileQuoteLink = bar.querySelector(".btn");
  if (quoteLink && mobileQuoteLink) {
    mobileQuoteLink.href = quoteLink.href;
  }
}

function loadAnalytics() {
  if (
    !ANALYTICS_MEASUREMENT_ID ||
    readStorage(ANALYTICS_CONSENT_KEY) !== "accepted" ||
    window.gtag
  ) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", ANALYTICS_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS_MEASUREMENT_ID)}`;
  script.onerror = () => {
    console.error("Google Analytics failed to load.");
  };
  document.head.append(script);
  trackPageView();
}

function trackPageView() {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      page_title: document.title,
    });
  }
}

function showCookieBanner() {
  let banner = document.querySelector(".cookie-banner");
  if (!banner) {
    banner = document.createElement("section");
    banner.className = "cookie-banner";
    banner.setAttribute("aria-label", "Cookie and analytics preferences");

    const message = document.createElement("p");
    message.className = "cookie-banner-message";
    if (ANALYTICS_MEASUREMENT_ID) {
      message.textContent =
        "We use essential storage for site preferences. Optional Google Analytics is loaded only if you allow it.";
      banner.append(message);

      const accept = document.createElement("button");
      accept.className = "btn";
      accept.type = "button";
      accept.dataset.analyticsConsent = "accepted";
      accept.textContent = "Allow analytics";
      banner.append(accept);

      const reject = document.createElement("button");
      reject.className = "cookie-reject";
      reject.type = "button";
      reject.dataset.analyticsConsent = "rejected";
      reject.textContent = "Reject analytics";
      banner.append(reject);
    } else {
      message.textContent =
        "Optional analytics are not configured. No analytics tracking is active; we will ask for your consent before enabling it.";
      banner.append(message);

      const dismiss = document.createElement("button");
      dismiss.className = "btn";
      dismiss.type = "button";
      dismiss.dataset.cookieDismiss = "true";
      dismiss.textContent = "Got it";
      banner.append(dismiss);
    }

    const privacyLink = document.createElement("a");
    privacyLink.href = new URL("/privacy-policy", window.location.origin).href;
    privacyLink.textContent = "Privacy policy";
    banner.append(privacyLink);
    document.body.append(banner);
  }
  banner.hidden = false;
}

function initializeCookieBanner() {
  if (ANALYTICS_MEASUREMENT_ID) {
    if (readStorage(ANALYTICS_CONSENT_KEY) === "accepted") {
      loadAnalytics();
      return;
    }
    if (readStorage(ANALYTICS_CONSENT_KEY) === "rejected") return;
  } else if (readStorage(CONSENT_NOTICE_KEY) === "dismissed") {
    return;
  }
  showCookieBanner();
}

function updateFormErrorState(field) {
  const form = field.closest("form");
  if (!form) return;
  const invalid = !field.validity.valid;
  if (form.classList.contains("was-validated")) {
    field.setAttribute("aria-invalid", String(invalid));
  }

  const summary = form.querySelector(".form-error-summary");
  if (summary && form.classList.contains("was-validated")) {
    const hasErrors = [...form.elements].some(
      (control) =>
        control instanceof HTMLInputElement ||
        control instanceof HTMLTextAreaElement ||
        control instanceof HTMLSelectElement
          ? control.willValidate && !control.validity.valid
          : false,
    );
    summary.hidden = !hasErrors;
  }
}

function closeMenus() {
  document.querySelectorAll(".nav-links.open").forEach((navLinks) => {
    navLinks.classList.remove("open");
    const menuButton = navLinks.parentElement?.querySelector(".menu-btn");
    menuButton?.setAttribute("aria-expanded", "false");
  });
}

function updateCallButton() {
  const callButton = document.querySelector("[data-phone]");
  if (!callButton) return;

  callButton.href = window.matchMedia("(max-width: 700px)").matches
    ? callButton.dataset.phone
    : callButton.dataset.desktopHref;
}

function updateCurrentPage() {
  const main = document.querySelector("main");
  if (main) {
    main.id = "main-content";
    let skipLink = document.querySelector(".skip-link");
    if (!skipLink) {
      skipLink = document.createElement("a");
      skipLink.className = "skip-link";
      skipLink.textContent = "Skip to main content";
      document.body.prepend(skipLink);
    }
    skipLink.href = "#main-content";
  }

  const navLinks = document.querySelector(".nav-links");
  const menuButton = document.querySelector(".menu-btn");
  if (navLinks && menuButton) {
    navLinks.id ||= "primary-navigation";
    menuButton.setAttribute("aria-controls", navLinks.id);
    menuButton.setAttribute(
      "aria-expanded",
      String(navLinks.classList.contains("open")),
    );

    const currentPath = normalizePath(window.location.pathname);
    navLinks.querySelectorAll("a[href]").forEach((link) => {
      link.removeAttribute("aria-current");
      const url = new URL(link.href, window.location.href);
      if (!url.hash && normalizePath(url.pathname) === currentPath) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  const callButton = document.querySelector("[data-phone]");
  if (callButton && !callButton.dataset.desktopHref) {
    callButton.dataset.desktopHref = callButton.getAttribute("href");
  }
  updateCallButton();
}

function cachePage(url, html) {
  pageCache.set(url.href, html);
  if (pageCache.size > 6) {
    pageCache.delete(pageCache.keys().next().value);
  }
}

async function fetchPage(url, signal, redirectDepth = 0) {
  if (redirectDepth > 4) {
    throw new Error("Too many page redirects.");
  }

  let html = pageCache.get(url.href);
  let responseUrl = url;
  if (!html) {
    const response = await fetch(url.href, {
      signal,
      headers: { Accept: "text/html" },
    });
    if (!response.ok) {
      throw new Error(`Page request failed with status ${response.status}.`);
    }
    html = await response.text();
    responseUrl = new URL(response.url || url.href);
    cachePage(url, html);
  }

  const page = new DOMParser().parseFromString(html, "text/html");
  if (!page.querySelector("main")) {
    const refresh = page.querySelector('meta[http-equiv="refresh" i]');
    const target = refresh?.content.match(
      /(?:^|;)\s*url\s*=\s*['"]?([^'";]+)['"]?/i,
    )?.[1];
    if (target) {
      return fetchPage(new URL(target.trim(), responseUrl), signal, redirectDepth + 1);
    }
    throw new Error("The requested page does not contain main content.");
  }

  if (!page.querySelector("header") || !page.querySelector("footer")) {
    throw new Error("The requested page is missing shared site navigation.");
  }
  return { page, url: responseUrl };
}

function updateHead(page) {
  document.title = page.title;
  document.documentElement.lang =
    page.documentElement.lang || document.documentElement.lang;

  const headElements = [
    ['meta[name="description"]', "content"],
    ['meta[property="og:type"]', "content"],
    ['meta[property="og:title"]', "content"],
    ['meta[property="og:description"]', "content"],
    ['meta[property="og:url"]', "content"],
    ['meta[property="og:image"]', "content"],
    ['meta[property="og:image:alt"]', "content"],
    ['meta[property="og:image:width"]', "content"],
    ['meta[property="og:image:height"]', "content"],
    ['meta[name="twitter:card"]', "content"],
    ['meta[name="twitter:title"]', "content"],
    ['meta[name="twitter:description"]', "content"],
    ['meta[name="twitter:image"]', "content"],
    ['link[rel="canonical"]', "href"],
  ];

  headElements.forEach(([selector, attribute]) => {
    const nextElement = page.head.querySelector(selector);
    const currentElement = document.head.querySelector(selector);
    if (nextElement) {
      if (currentElement) {
        currentElement.setAttribute(attribute, nextElement.getAttribute(attribute));
      } else {
        document.head.append(document.importNode(nextElement, true));
      }
    } else {
      currentElement?.remove();
    }
  });

  document
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((script) => script.remove());
  page.head
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((script) => {
      document.head.append(document.importNode(script, true));
    });
}

function updatePage(page, url, scrollY) {
  updateHead(page);
  ["header", "main", "footer"].forEach((selector) => {
    const nextElement = page.querySelector(selector);
    document.querySelector(selector).replaceWith(
      document.importNode(nextElement, true),
    );
  });
  updateCurrentPage();
  ensureMobileCta();
  trackPageView();

  const heading = document.querySelector("main h1");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }

  window.requestAnimationFrame(() => {
    if (url.hash) {
      const target = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      );
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, scrollY);
  });
}

async function navigate(url, { push = true, scrollY = 0 } = {}) {
  activeNavigation?.abort();
  const controller = new AbortController();
  activeNavigation = controller;
  const currentMain = document.querySelector("main");
  currentMain?.setAttribute("aria-busy", "true");
  document.body.classList.add("is-navigating");
  ensureNavigationStatus();
  const navigationStatus = document.querySelector(".navigation-status");
  if (navigationStatus) navigationStatus.textContent = "Loading page";

  try {
    const { page, url: destination } = await fetchPage(url, controller.signal);
    if (push) {
      history.replaceState(
        { ...(history.state || {}), scrollY: window.scrollY },
        "",
      );
      history.pushState({ scrollY: 0 }, "", destination.href);
    }
    updatePage(page, destination, scrollY);
  } catch (error) {
    if (error.name === "AbortError") return;
    console.error("Client-side navigation failed; loading the page normally.", error);
    if (push) {
      window.location.assign(url.href);
    } else {
      window.location.reload();
    }
  } finally {
    currentMain?.removeAttribute("aria-busy");
    if (activeNavigation === controller) {
      activeNavigation = undefined;
      document.body.classList.remove("is-navigating");
      if (navigationStatus) navigationStatus.textContent = "";
    }
  }
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

updateCurrentPage();
ensureMobileCta();
initializeCookieBanner();
if (ANALYTICS_MEASUREMENT_ID && readStorage(ANALYTICS_CONSENT_KEY) === "accepted") {
  loadAnalytics();
}
window.addEventListener("resize", updateCallButton);
window.addEventListener("popstate", (event) => {
  void navigate(new URL(window.location.href), {
    push: false,
    scrollY: event.state?.scrollY || 0,
  });
});

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const menuButton = target.closest(".menu-btn");
  if (menuButton) {
    const navLinks = menuButton.parentElement.querySelector(".nav-links");
    if (navLinks) {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    }
    return;
  }

  const link = target.closest("a[href]");
  if (!link) return;
  if (link.closest(".nav-links")) closeMenus();
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.target && link.target !== "_self" ||
    link.hasAttribute("download") ||
    link.relList.contains("external")
  ) {
    return;
  }

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return;

  if (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  ) {
    if (url.hash) return;
    event.preventDefault();
    return;
  }

  event.preventDefault();
  void navigate(url);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenus();
});

document.addEventListener("input", (event) => {
  const field = event.target;
  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement ||
    field instanceof HTMLSelectElement
  ) {
    if (field.required) {
      field.setCustomValidity(
        field.value.trim() ? "" : "Please enter a valid value.",
      );
    }
    updateFormErrorState(field);
  }
});

document.addEventListener(
  "invalid",
  (event) => {
    const field = event.target;
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement ||
      field instanceof HTMLSelectElement
    ) {
      const form = field.closest(".form");
      if (!form) return;
      form.classList.add("was-validated");
      field.setAttribute("aria-invalid", "true");
      const summary = form.querySelector(".form-error-summary");
      if (summary) summary.hidden = false;
    }
  },
  true,
);

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.dataset.submitting === "true") {
    event.preventDefault();
    return;
  }

  form.querySelectorAll(
    "input[required], textarea[required], select[required]",
  ).forEach((field) => {
    field.setCustomValidity(
      field.value.trim() ? "" : "Please enter a valid value.",
    );
  });

  if (!form.checkValidity()) {
    event.preventDefault();
    form.classList.add("was-validated");
    form.querySelectorAll(
      "input[required], textarea[required], select[required]",
    ).forEach((field) => {
      field.setAttribute("aria-invalid", String(!field.checkValidity()));
    });
    const summary = form.querySelector(".form-error-summary");
    if (summary) summary.hidden = false;
    form.reportValidity();
    return;
  }

  form.dataset.submitting = "true";
  form.setAttribute("aria-busy", "true");
  const status = form.querySelector(".form-status");
  if (status) {
    status.hidden = false;
    status.textContent = "Sending your enquiry…";
  }
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.setAttribute("aria-disabled", "true");
    submitButton.textContent = "Sending…";
  }
});

if (!document.querySelector(".whatsapp-float")) {
  const whatsapp = document.createElement("a");
  whatsapp.className = "whatsapp-float";
  whatsapp.href = WHATSAPP_URL;
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener";
  whatsapp.setAttribute(
    "aria-label",
    "Message AdCool India Private Limited on WhatsApp",
  );
  whatsapp.innerHTML = `
    <span class="whatsapp-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.47 0 .12 5.35.12 11.96c0 2.1.55 4.15 1.6 5.95L0 24l6.27-1.64a11.96 11.96 0 0 0 5.81 1.78h.01c6.61 0 11.96-5.35 11.96-11.96 0-3.2-1.25-6.2-3.53-8.7ZM12.08 21.8h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-3.72.97 1-3.63-.23-.37A9.84 9.84 0 1 1 12.08 21.8Zm5.39-7.37c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.15-.19.29-.73.94-.9 1.14-.16.19-.33.21-.62.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.03 2.75 1.17 2.94.14.19 1.99 3.02 4.82 4.24.67.29 1.2.46 1.61.59.67.21 1.28.18 1.76.11.54-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.11-.26-.18-.55-.33Z" />
      </svg>
    </span>
    <span>WhatsApp Us</span>`;
  document.body.append(whatsapp);
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const consentButton = target.closest("[data-analytics-consent]");
  if (consentButton && ANALYTICS_MEASUREMENT_ID) {
    const preference = consentButton.dataset.analyticsConsent;
    writeStorage(ANALYTICS_CONSENT_KEY, preference);
    document.querySelector(".cookie-banner")?.remove();
    if (preference === "accepted") loadAnalytics();
    return;
  }

  if (target.closest("[data-cookie-dismiss]")) {
    writeStorage(CONSENT_NOTICE_KEY, "dismissed");
    document.querySelector(".cookie-banner")?.remove();
    return;
  }

  if (target.closest("[data-cookie-settings]")) {
    event.preventDefault();
    showCookieBanner();
  }
});
