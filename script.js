// ==========================================
// 1. UPDATE YOUR CONTACT DETAILS HERE
// ==========================================
const PROFILE_CONFIG = {
  ownerName: "Arif",
  brandName: "Arif",
  whatsappNumber: "8801568293044", // Country code + number, no '+' or spaces
  email: "sn.arif.personal@gmail.com",
  demoCompany: "Premier Local Services"
};

const INDUSTRY_DATA = {
  plumbing: {
    tag: "Plumbing & HVAC",
    title: "Stop Losing Emergency Calls & Chasing Paper Job Sheets",
    desc: "When a pipe bursts, homeowners call the first trustworthy business on Google. And once your technician finishes the repair, they shouldn't wait until evening to send the bill.",
    before: "Missed calls on the road, texting job addresses over WhatsApp, and forgetting to bill extras.",
    after: "24/7 Google booking page + 1-tap technician app for job locations & instant customer invoices."
  },
  cleaning: {
    tag: "Commercial Cleaning",
    title: "Keep Every Crew on Schedule & Automate Recurring Billing",
    desc: "Managing multiple office or home cleaning crews across a city gets messy fast. Give each team clear daily checklists and locations right on their phone.",
    before: "Staff calling the office for gate codes, lost checklists, and manual end-of-month invoicing.",
    after: "Crews see exact building access notes on their phone & clients get billed automatically."
  },
  roofing: {
    tag: "Roofing & Renovation",
    title: "Turn Local Searches Into High-Ticket Estimates & Projects",
    desc: "Homeowners spending $5,000+ check your website before calling. A clean, trustworthy site + organized quote follow-up wins jobs over competitors.",
    before: "Outdated or missing website, slow quote follow-ups, and scattered project photos.",
    after: "High-trust project showcase website + organized quote & milestone tracking in one place."
  },
  rental: {
    tag: "Real Estate & Car Rental",
    title: "Instant Booking Requests & Zero Double-Bookings",
    desc: "In fast-moving markets like Dubai, USA & UK, clients expect instant answers on WhatsApp and clean booking confirmations without back-and-forth.",
    before: "Slow manual replies, Excel sheet conflicts, and lost leads after business hours.",
    after: "24/7 online availability & instant WhatsApp/Email booking alerts straight to your team."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Apply config values
  document.querySelectorAll('[data-config="brandName"]').forEach(el => {
    el.textContent = PROFILE_CONFIG.brandName;
  });
  document.querySelectorAll('[data-config="ownerName"]').forEach(el => {
    el.textContent = PROFILE_CONFIG.ownerName;
  });
  document.querySelectorAll('[data-config="demoCompany"]').forEach(el => {
    el.textContent = PROFILE_CONFIG.demoCompany;
  });
  document.querySelectorAll('[data-config="emailText"]').forEach(el => {
    el.textContent = PROFILE_CONFIG.email;
  });

  const waUrl = `https://wa.me/${PROFILE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hi Arif! I saw your portfolio and would like a quick 2-minute preview for my business."
  )}`;
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    el.href = waUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  const mailUrl = `mailto:${PROFILE_CONFIG.email}?subject=${encodeURIComponent(
    "Quick Preview Request for My Business"
  )}`;
  document.querySelectorAll("[data-email-link]").forEach(el => {
    el.href = mailUrl;
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Scroll Progress Bar
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = `${pct}%`;
  });

  // Mobile Menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // Scroll Reveal Observer
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.01, rootMargin: "80px 0px" }
  );
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Animated Counters
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.target.dataset.done) return;
        entry.target.dataset.done = "1";
        const target = parseInt(entry.target.dataset.target, 10);
        const suffix = entry.target.dataset.suffix || "";
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 24));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = `${current}${suffix}`;
        }, 35);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach(c => counterObserver.observe(c));

  // Industry Selector
  const indPills = document.querySelectorAll(".ind-pill");
  indPills.forEach(pill => {
    pill.addEventListener("click", () => {
      indPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const data = INDUSTRY_DATA[pill.dataset.industry];
      document.getElementById("indTag").textContent = data.tag;
      document.getElementById("indTitle").textContent = data.title;
      document.getElementById("indDesc").textContent = data.desc;
      document.getElementById("indBefore").textContent = data.before;
      document.getElementById("indAfter").textContent = data.after;
    });
  });

  // Demo Tabs
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".demo-panel");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });

  // Instant Invoice Interactive Preview
  const laborInput = document.getElementById("laborAmount");
  const partsInput = document.getElementById("partsAmount");
  const includeTax = document.getElementById("includeTax");
  const invLabor = document.getElementById("invLabor");
  const invParts = document.getElementById("invParts");
  const invSubtotal = document.getElementById("invSubtotal");
  const invTax = document.getElementById("invTax");
  const taxRow = document.getElementById("taxRow");
  const invoiceTotal = document.getElementById("invoiceTotal");
  const invoiceStatus = document.getElementById("invoiceStatus");
  const invBadge = document.getElementById("invBadge");
  const sendInvoiceBtn = document.getElementById("sendInvoiceBtn");

  function updateInvoiceTotals() {
    const labor = Math.max(0, parseFloat(laborInput.value) || 0);
    const parts = Math.max(0, parseFloat(partsInput.value) || 0);
    const subtotal = labor + parts;
    const tax = includeTax.checked ? subtotal * 0.08 : 0;
    const total = subtotal + tax;

    invLabor.textContent = `$${labor.toFixed(2)}`;
    invParts.textContent = `$${parts.toFixed(2)}`;
    invSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    invTax.textContent = `$${tax.toFixed(2)}`;
    taxRow.style.display = includeTax.checked ? "flex" : "none";
    invoiceTotal.textContent = `$${total.toFixed(2)}`;
    return total;
  }

  laborInput.addEventListener("input", updateInvoiceTotals);
  partsInput.addEventListener("input", updateInvoiceTotals);
  includeTax.addEventListener("change", updateInvoiceTotals);

  sendInvoiceBtn.addEventListener("click", () => {
    const total = updateInvoiceTotals();
    invBadge.textContent = "Sending...";
    invBadge.classList.remove("paid");
    sendInvoiceBtn.disabled = true;

    setTimeout(() => {
      invBadge.textContent = "Sent & Paid ✓";
      invBadge.classList.add("paid");
      invoiceStatus.textContent = `✓ Instant Invoice ($${total.toFixed(2)}) delivered to Sarah Jenkins via SMS & Email with 1-tap Card/Apple Pay link!`;
      invoiceStatus.classList.add("sent");
      sendInvoiceBtn.disabled = false;
    }, 450);
  });

  // Customer Booking Interactive Preview
  const bookingForm = document.getElementById("demoBookingForm");
  const bookingOutput = document.getElementById("bookingOutput");
  bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("custName").value.trim();
    const service = document.getElementById("custService").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    bookingOutput.innerHTML = `
      <p><strong>New Google Lead Captured!</strong></p>
      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p class="status-note sent">✓ Added to today's schedule &amp; owner notified instantly.</p>
    `;
  });
});
