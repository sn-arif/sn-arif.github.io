const PROFILE_CONFIG = {
  ownerName: "Arif",
  brandName: "Md Arif Islam",
  whatsappNumber: "8801568293044",
  email: "sn.arif.personal@gmail.com",
  demoCompany: "Premier Local Services"
};

const INDUSTRY_DATA = {
  plumbing: {
    tag: "Plumbing & HVAC",
    title: "Stop losing emergency calls and chasing paper job sheets",
    desc: "When a pipe bursts, homeowners call the first trustworthy business on Google. And once your technician finishes the repair, they shouldn't wait until evening to send the bill.",
    before: "Missed calls on the road, texting job addresses over WhatsApp, and forgetting to bill for small parts.",
    after: "A 24/7 online booking website plus a 1-tap technician app for job locations and instant customer invoices."
  },
  cleaning: {
    tag: "Commercial Cleaning",
    title: "Keep every crew on schedule and send recurring bills on time",
    desc: "Managing multiple office or home cleaning crews across a city gets messy fast. Give each team clear daily checklists and access notes right on their phone.",
    before: "Staff calling the office for gate codes, lost paper checklists, and manual end-of-month invoicing.",
    after: "Crews see building access notes on their phone and clients get billed automatically."
  },
  roofing: {
    tag: "Roofing & Renovation",
    title: "Turn local searches into solid estimate requests",
    desc: "Homeowners spending $5,000+ check your website before calling. A clean, trustworthy site plus organized quote follow-up wins jobs over competitors.",
    before: "Outdated or missing website, slow quote follow-ups, and scattered project photos.",
    after: "A clear project showcase website plus organized quote and milestone tracking in one place."
  },
  rental: {
    tag: "Real Estate & Car Rental",
    title: "Faster booking requests without double-bookings",
    desc: "In fast-moving markets like Dubai, the US, and the UK, clients expect quick answers on WhatsApp and clear booking confirmations without back-and-forth.",
    before: "Slow manual replies, spreadsheet conflicts, and lost inquiries after business hours.",
    after: "Clear online availability and instant WhatsApp or email booking alerts straight to your team."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-config="brandName"]').forEach(el => {
    el.textContent = PROFILE_CONFIG.brandName;
  });
  document.querySelectorAll('[data-config="demoCompany"]').forEach(el => {
    el.textContent = PROFILE_CONFIG.demoCompany;
  });
  document.querySelectorAll('[data-config="emailText"]').forEach(el => {
    el.textContent = PROFILE_CONFIG.email;
  });

  const waUrl = `https://wa.me/${PROFILE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hi Arif, I saw your site and would like a quick sample for my business."
  )}`;
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    el.href = waUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  const mailUrl = `mailto:${PROFILE_CONFIG.email}?subject=${encodeURIComponent(
    "Quick sample for my business"
  )}`;
  document.querySelectorAll("[data-email-link]").forEach(el => {
    el.href = mailUrl;
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile Menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // Subtle Scroll Reveal
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.05, rootMargin: "60px 0px" }
  );
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

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
      invBadge.textContent = "Sent & Paid";
      invBadge.classList.add("paid");
      invoiceStatus.textContent = `Invoice ($${total.toFixed(2)}) sent to Sarah Jenkins by SMS and email.`;
      invoiceStatus.classList.add("sent");
      sendInvoiceBtn.disabled = false;
    }, 400);
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
      <p><strong>New Callback Request</strong></p>
      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p class="status-note sent">Added to today's schedule and sent to your phone.</p>
    `;
  });

  // Time & Money Saved Calculator
  const staffRange = document.getElementById("staffRange");
  const jobsRange = document.getElementById("jobsRange");
  const staffVal = document.getElementById("staffVal");
  const jobsVal = document.getElementById("jobsVal");
  const weeklyHours = document.getElementById("weeklyHours");
  const monthlyHours = document.getElementById("monthlyHours");
  const monthlyValue = document.getElementById("monthlyValue");

  function updateCalculator() {
    const staff = parseInt(staffRange.value, 10);
    const jobs = parseInt(jobsRange.value, 10);
    staffVal.textContent = `${staff} ${staff === 1 ? "person" : "staff"}`;
    jobsVal.textContent = `${jobs} jobs`;

    const wkHrs = +(jobs * 0.33 + staff * 0.7).toFixed(1);
    const moHrs = Math.round(wkHrs * 4);
    const moVal = moHrs * 35;

    weeklyHours.textContent = `~${wkHrs} hrs/wk`;
    monthlyHours.textContent = `~${moHrs} hrs/mo`;
    monthlyValue.textContent = `~$${moVal.toLocaleString()}/mo`;
  }

  staffRange.addEventListener("input", updateCalculator);
  jobsRange.addEventListener("input", updateCalculator);
  updateCalculator();

  // Day in the Life Comparison
  const DAY_DATA = {
    before: [
      { time: "8:00 AM", title: "Morning Dispatch", text: "Texting 4 different staff members addresses, gate codes, and customer phone numbers one by one on WhatsApp." },
      { time: "1:30 PM", title: "On the Road", text: "You miss 2 calls while driving or on a job. Those callers don't leave a voicemail—they call your competitor." },
      { time: "5:00 PM", title: "End of Shift", text: "Staff drop off crumpled paper job notes or forget to mention the extra parts they used on site." },
      { time: "9:30 PM", title: "Late-Night Admin", text: "Instead of resting with family, you're sitting at a laptop typing out invoices and chasing payments." }
    ],
    after: [
      { time: "8:00 AM", title: "Morning Dispatch", text: "Your crew opens one simple app on their phone and sees all today's addresses, gate codes, and notes." },
      { time: "1:30 PM", title: "On the Road", text: "Even when you can't pick up, your website captures quote requests and texts you the customer's details." },
      { time: "5:00 PM", title: "End of Shift", text: "Technicians tap 'Complete Job' on site—the customer gets an itemized invoice by SMS and email right away." },
      { time: "9:30 PM", title: "Evening Off", text: "Every job and payment is already logged. Your evening is actually yours." }
    ]
  };

  const dayBtns = document.querySelectorAll(".day-btn");
  const dayGrid = document.getElementById("dayGrid");
  dayBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      dayBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.day;
      const cls = mode === "before" ? "is-before" : "is-after";
      dayGrid.innerHTML = DAY_DATA[mode]
        .map(item => `
          <div class="day-card ${cls}">
            <span class="day-time">${item.time}</span>
            <h4>${item.title}</h4>
            <p>${item.text}</p>
          </div>
        `)
        .join("");
    });
  });
});
