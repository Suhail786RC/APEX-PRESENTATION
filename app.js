/* Apex CCG — all diagrams, data and presentation controls run locally. */
"use strict";

(() => {
  const DESIGN = Object.freeze({ width: 1600, height: 900 });
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const slides = $$(".slide");
  const total = slides.length;
  const pad = (value) => String(value).padStart(2, "0");
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  let activeIndex = 0;
  let notificationTimeout;
  let selectedStatus = "all";
  let filterBeforePrint = "all";
  let hudPinned = false;
  let hudTimeout;
  let motionInitialised = false;
  const GRAPHIC_PERIOD_MS = 3000;
  let graphicLoops = [];
  let printing = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function svgText(x, y, lines, options = {}) {
    const { size = 23, color = "#183342", weight = 500, anchor = "middle", lineHeight = 27 } = options;
    const values = Array.isArray(lines) ? lines : [lines];
    const startY = y - ((values.length - 1) * lineHeight) / 2;
    return `<text x="${x}" y="${startY}" text-anchor="${anchor}" dominant-baseline="middle" fill="${color}" font-size="${size}" font-weight="${weight}">${values.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${escapeHTML(line)}</tspan>`).join("")}</text>`;
  }

  function sequence(path) {
    return `<path class="sequence-flow" d="${path}" fill="none" stroke="#bad0d4" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#sequence-arrow)"/>`;
  }

  function message(path, x, y) {
    return `<path class="message-flow" d="${path}" fill="none" stroke="#8aa5ae" stroke-width="1.8" stroke-dasharray="7 5" stroke-linejoin="round" marker-end="url(#message-arrow)"/><circle cx="${x}" cy="${y}" r="3.2" fill="#102e3a" stroke="#8aa5ae" stroke-width="1.5"/>`;
  }

  function userIcon(x, y) {
    return `<g transform="translate(${x} ${y}) scale(.7)" fill="none" stroke="#bad0d4" stroke-width="1.6"><circle cx="6" cy="4" r="2.5"/><path d="M1 15v-4a5 5 0 0 1 10 0v4M4 15v-4m4 4v-4"/></g>`;
  }

  function serviceIcon(x, y) {
    return `<g transform="translate(${x} ${y}) scale(.7)" fill="none" stroke="#b8f37c" stroke-width="1.6"><path d="m6 0 2 0 .6 2 1.4.8 2-.4 1 1.7-1.3 1.6V7l1.3 1.6-1 1.7-2-.4-1.4.8-.6 2H6l-.6-2L4 9.9l-2 .4L1 8.6 2.3 7V5.7L1 4.1l1-1.7 2 .4L5.4 2Z"/><circle cx="7" cy="6.4" r="2.2"/></g>`;
  }

  function task(x, y, width, lines, options = {}) {
    const height = 70;
    const { type = "none", automated = false, subprocess = false } = options;
    const fill = automated ? "#173e37" : "#102e3a";
    const stroke = automated ? "#aee978" : "#bad0d4";
    let markup = `<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
    if (type === "user") markup += userIcon(x + 9, y + 5);
    if (type === "service") markup += serviceIcon(x + 9, y + 5);
    markup += svgText(x + width / 2, y + (subprocess ? 28 : type === "none" ? 35 : 41), lines, { size: subprocess ? 20 : 22, lineHeight: subprocess ? 23 : 25, weight: 500 });
    if (subprocess) markup += `<rect x="${x + width / 2 - 6}" y="${y + 53}" width="12" height="12" fill="#102e3a" stroke="${stroke}" stroke-width="1.4"/><path d="M${x + width / 2} ${y + 55}v8m-4-4h8" stroke="${stroke}" stroke-width="1.3"/>`;
    return `${markup}</g>`;
  }

  function messageEvent(x, y, intermediate = false) {
    const radius = intermediate ? 18 : 16;
    return `<g><circle cx="${x}" cy="${y}" r="${radius}" fill="#102e3a" stroke="#bad0d4" stroke-width="1.9"/>${intermediate ? `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="#bad0d4" stroke-width="1.3"/>` : ""}<rect x="${x - 8}" y="${y - 5}" width="16" height="10" rx=".5" fill="#102e3a" stroke="#bad0d4" stroke-width="1.2"/><path d="m${x - 8} ${y - 5} 8 6 8-6" fill="none" stroke="#bad0d4" stroke-width="1.2"/></g>`;
  }

  function makeBPMN(proposed = false) {
    const prefix = proposed ? "future" : "current";
    const title = proposed ? "Proposed supplier certification and compliance lifecycle" : "Current supplier certification and compliance lifecycle";
    const registerLines = proposed ? ["Store supplier", "& evidence"] : ["Register", "supplier"];
    const checkLines = proposed ? ["Verify linked", "evidence"] : ["Check evidence", "& versions"];
    const requestLines = proposed ? ["Return case", "for correction"] : ["Request", "corrections"];
    const updateLines = proposed ? ["Record status", "& audit history"] : ["Update tracker", "& calendar"];
    const reportLines = proposed ? ["Monitor renewals", "& reporting"] : ["Compile client", "report"];
    const loopX = proposed ? 314 : 519;

    let markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 510" role="img" aria-labelledby="${prefix}-title ${prefix}-description">
      <title id="${prefix}-title">${title}</title><desc id="${prefix}-description">${proposed ? "Central evidence storage, a human evidence check and approval, recorded status and audit history, and a recurring renewal and reporting subprocess. Corrections return through evidence storage to preserve revisions." : "Supplier submission, manual registration and evidence checking, a correction loop, approval, spreadsheet and calendar updates, and client reporting."} Solid arrows show sequence flow within Apex. Dashed arrows show messages between participants. A diamond marked X is an exclusive decision.</desc>
      <rect x="250" y="10" width="760" height="46" fill="#0b2430" stroke="#42606b" stroke-width="1.7"/>
      ${svgText(630, 33, "Supplier", { size: 22, weight: 600 })}
      <rect x="1185" y="10" width="245" height="46" fill="#0b2430" stroke="#42606b" stroke-width="1.7"/>
      ${svgText(1307, 33, "Client team", { size: 22, weight: 600 })}
      <rect x="0" y="148" width="1440" height="320" fill="#102e3a" stroke="#42606b" stroke-width="1.7"/>
      <rect x="0" y="148" width="170" height="320" fill="#0b2430"/>
      <path d="M45 148v320M170 148v320M45 310h1395" fill="none" stroke="#42606b" stroke-width="1.5"/>
      <text x="23" y="308" text-anchor="middle" fill="#bad0d4" font-size="18" font-weight="700" letter-spacing="1" transform="rotate(-90 23 308)">APEX CCG</text>
      ${svgText(107, 228, ["Intake &", "validation"], { size: 20, color: "#b2c5c9", weight: 600, lineHeight: 25 })}
      ${svgText(107, 389, ["Decision &", "follow-up"], { size: 20, color: "#b2c5c9", weight: 600, lineHeight: 25 })}
      ${message("M280 56H198V214", 280, 56)}
      ${message("M830 200V56", 830, 200)}
      ${message("M980 56H1080V230H1018", 980, 56)}
      ${message("M1280 355V56", 1280, 355)}
      ${svgText(208, 107, "Evidence", { size: 18, color: "#b2c5c9", anchor: "start" })}
      ${svgText(842, 112, "Correction", { size: 18, color: "#b2c5c9", anchor: "start" })}
      ${svgText(1091, 107, "Revision", { size: 18, color: "#b2c5c9", anchor: "start" })}
      ${svgText(1292, 112, "Report", { size: 18, color: "#b2c5c9", anchor: "start" })}
      ${sequence("M214 230H235")}
      ${sequence("M393 230H435")}
      ${sequence("M603 230H629")}
      ${sequence("M681 230H740")}
      ${sequence("M920 230H982")}
      ${sequence(`M1000 212V169H${loopX}V200`)}
      ${sequence("M655 256V390H740")}
      ${sequence("M920 390H968")}
      ${sequence("M1150 390H1190")}
      ${sequence("M1364 390H1393")}
      ${messageEvent(198, 230)}
      ${task(235, 200, 158, registerLines, proposed ? { type: "service", automated: true } : {})}
      ${task(435, 200, 168, checkLines, proposed ? { type: "user" } : {})}
      <path d="m655 204 26 26-26 26-26-26Z" fill="#102e3a" stroke="#bad0d4" stroke-width="2"/><path d="m648 223 14 14m0-14-14 14" stroke="#bad0d4" stroke-width="2"/>
      ${svgText(655, 187, "Valid?", { size: 20, weight: 600 })}
      ${svgText(707, 213, "No", { size: 18, color: "#b2c5c9" })}
      ${svgText(675, 302, "Yes", { size: 18, color: "#b8f37c", anchor: "start", weight: 600 })}
      ${task(740, 200, 180, requestLines, proposed ? { type: "user" } : {})}
      ${messageEvent(1000, 230, true)}
      ${svgText(1000, 280, ["Revised", "evidence"], { size: 18, lineHeight: 22, color: "#b2c5c9" })}
      ${task(740, 355, 180, ["Approve", "certification"], proposed ? { type: "user" } : {})}
      ${task(968, 355, 182, updateLines, proposed ? { type: "service", automated: true } : {})}
      ${task(1190, 355, 174, reportLines, proposed ? { automated: true, subprocess: true } : {})}
      <circle cx="1408" cy="390" r="14" fill="#102e3a" stroke="#bad0d4" stroke-width="4.5"/>
      ${svgText(1403, 433, "Recorded", { size: 16, color: "#b2c5c9", anchor: "end" })}
      <g transform="translate(10 495)"><circle cx="7" cy="0" r="6" fill="#102e3a" stroke="#bad0d4" stroke-width="1.5"/><circle cx="29" cy="0" r="6" fill="#102e3a" stroke="#bad0d4" stroke-width="3"/>${svgText(45, 0, "Start / end", { size: 18, color: "#b2c5c9", anchor: "start" })}<rect x="210" y="-9" width="25" height="18" rx="4" fill="#102e3a" stroke="#bad0d4" stroke-width="1.5"/>${svgText(248, 0, "Activity", { size: 18, color: "#b2c5c9", anchor: "start" })}<path d="m420-10 10 10-10 10-10-10Z" fill="#102e3a" stroke="#bad0d4" stroke-width="1.5"/><path d="m416-4 8 8m0-8-8 8" stroke="#bad0d4" stroke-width="1.2"/>${svgText(441, 0, "Exclusive decision", { size: 18, color: "#b2c5c9", anchor: "start" })}<path d="M695 0h42" stroke="#8aa5ae" stroke-width="1.6" stroke-dasharray="5 3" marker-end="url(#message-arrow)"/>${svgText(750, 0, "Message flow", { size: 18, color: "#b2c5c9", anchor: "start" })}${proposed ? `<rect x="1000" y="-9" width="20" height="18" rx="2" fill="#173e37" stroke="#aee978"/><path d="M1010-5v10m-5-5h10" stroke="#aee978"/>${svgText(1034, 0, "Collapsed subprocess", { size: 18, color: "#b2c5c9", anchor: "start" })}` : svgText(1000, 0, "Evidence includes audit and lab files", { size: 18, color: "#b2c5c9", anchor: "start" })}</g>
    </svg>`;
    const darkDiagram = $(proposed ? "#to-be-bpmn" : "#as-is-bpmn").closest(".slide").classList.contains("theme-dark");
    const colours = darkDiagram ? {
      "#102e3a":"#102630", "#0b2430":"#10232d", "#42606b":"#49606a",
      "#bad0d4":"#b2c4cc", "#8aa5ae":"#8fa5af", "#b2c5c9":"#b0c1c8",
      "#b8f37c":"#97c5b6", "#173e37":"#173a3d", "#aee978":"#97c5b6", "#183342":"#edf1f3"
    } : {
      "#102e3a":"#fbfcfa", "#0b2430":"#edf1ef", "#42606b":"#b7c4c8",
      "#bad0d4":"#3c5663", "#8aa5ae":"#6c858f", "#b2c5c9":"#596f7b",
      "#b8f37c":"#317a72", "#173e37":"#e7f0eb", "#aee978":"#317a72", "#183342":"#17333f"
    };
    markup = markup.replace(/#[0-9a-fA-F]{6}/g, (hex) => colours[hex] || hex);
    const lineColour = darkDiagram ? "#b2c4cc" : "#3c5663";
    const messageColour = darkDiagram ? "#8fa5af" : "#6c858f";
    const markers = `<defs><marker id="${prefix}-sequence" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" fill="${lineColour}"/></marker><marker id="${prefix}-message" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="8" markerHeight="8" orient="auto"><path d="m1 1 10 5-10 5" fill="none" stroke="${messageColour}" stroke-width="1.5"/></marker></defs>`;
    return markup.replace(/(<svg[^>]*>)/, `$1${markers}`).replaceAll("url(#sequence-arrow)", `url(#${prefix}-sequence)`).replaceAll("url(#message-arrow)", `url(#${prefix}-message)`);
  }

  function renderGantt() {
    // These are the Task 2 BASELINE dates, not inferred actual completion dates.
    const tasks = [
      { label: "Plan & governance", owner: "Suhail", start: "2026-09-17", end: "2026-09-24", milestone: "M1" },
      { label: "As-is & stakeholders", owner: "Safwaan, with Suhail", start: "2026-09-24", end: "2026-10-01", milestone: "M2" },
      { label: "Gaps & requirements", owner: "Safwaan", start: "2026-10-02", end: "2026-10-15", milestone: "M3" },
      { label: "Criteria & options", owner: "Suhail and Safwaan", start: "2026-10-16", end: "2026-10-22", milestone: "M4" },
      { label: "Mini-RFC & feedback", owner: "Suhail", start: "2026-10-23", end: "2026-10-29", milestone: "M5" },
      { label: "Draft report", owner: "Project team", start: "2026-10-29", end: "2026-11-05" },
      { label: "QA & supervisor review", owner: "Abdullah, Suhail and supervisor", start: "2026-11-05", end: "2026-11-12", milestone: "M6" }
    ];
    const dates = ["2026-09-17", "2026-09-24", "2026-10-01", "2026-10-08", "2026-10-15", "2026-10-22", "2026-10-29", "2026-11-05", "2026-11-12"];
    const labels = ["17 Sep", "24 Sep", "01 Oct", "08 Oct", "15 Oct", "22 Oct", "29 Oct", "05 Nov", "12 Nov"];
    const utc = (date) => Date.parse(`${date}T00:00:00Z`);
    const start = utc(dates[0]);
    const end = utc(dates[dates.length - 1]);
    const x = (date) => 337 + ((utc(date) - start) / (end - start)) * 1073;
    let markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 402" role="img" aria-labelledby="gantt-title gantt-desc"><title id="gantt-title">Project baseline Gantt chart</title><desc id="gantt-desc">Seven work phases from 17 September to 12 November 2026. Six diamonds mark planned approval, validation, requirements, option selection, Mini-RFC and final-pack checkpoints. The chart displays the planned baseline.</desc>`;
    markup += svgText(0, 23, "WORK PACKAGE / LEAD", { size: 15, color: "#5e707b", weight: 700, anchor: "start" });
    dates.forEach((date, index) => {
      const position = x(date);
      markup += `<path d="M${position} 48V400" stroke="#dbe4e8" stroke-width="1"/>`;
      markup += svgText(position, 23, labels[index], { size: 20, weight: 600, anchor: index === dates.length - 1 ? "end" : index === 0 ? "start" : "middle" });
    });
    tasks.forEach((item, index) => {
      const y = 78 + index * 49;
      const left = x(item.start);
      const right = x(item.end);
      markup += `<path d="M0 ${y + 26}H1438" stroke="#edf1f3" stroke-width="1"/>`;
      markup += svgText(0, y - 7, item.label, { size: 23, weight: 600, anchor: "start" });
      markup += svgText(0, y + 15, item.owner, { size: 15, color: "#5e707b", weight: 400, anchor: "start" });
      markup += `<rect class="gantt-bar" style="--bar-order:${index}" x="${left}" y="${y - 11}" width="${right - left}" height="22" rx="3" fill="${index === 3 || index === 4 ? "#577e79" : "#244f5a"}"/>`;
      if (item.milestone) {
        markup += `<path d="m${right} ${y - 9} 9 9-9 9-9-9Z" fill="#9bab8d" stroke="#fff" stroke-width="1.2"/>`;
        markup += svgText(right - 18, y - 1, item.milestone, { size: 14, color: "#fff", weight: 700, anchor: "end" });
      }
    });
    $("#gantt-chart").innerHTML = `${markup}</svg>`;
  }

  const DEMO_DATE = "2026-10-29";
  const STATUS = Object.freeze([
    { key: "current", label: "Approved current", short: "Current", color: "#9bc4b5", ink: "#347746", action: "Monitor renewal" },
    { key: "review", label: "Under review", short: "In review", color: "#8fa9bc", ink: "#436e91", action: "Review evidence" },
    { key: "missing", label: "Evidence missing", short: "Missing", color: "#d3bc96", ink: "#946c21", action: "Request revision" },
    { key: "due", label: "Expiring soon", short: "Due soon", color: "#b88d65", ink: "#a4652e", action: "Issue reminder" },
    { key: "expired", label: "Expired", short: "Expired", color: "#bd8a88", ink: "#b34b49", action: "Escalate case" }
  ]);
  // Every case below is deliberately SYNTHETIC. No real supplier names or records.
  const DEMO_CASES = Object.freeze([
    { id: "SUP-001", status: "current", expires: "2027-04-27" },
    { id: "SUP-002", status: "current", expires: "2027-03-18" },
    { id: "SUP-003", status: "current", expires: "2027-02-11" },
    { id: "SUP-004", status: "current", expires: "2027-01-21" },
    { id: "SUP-005", status: "current", expires: "2026-12-10" },
    { id: "SUP-006", status: "review", expires: null },
    { id: "SUP-007", status: "review", expires: null },
    { id: "SUP-008", status: "review", expires: null },
    { id: "SUP-009", status: "missing", expires: null },
    { id: "SUP-010", status: "missing", expires: null },
    { id: "SUP-011", status: "due", expires: "2026-11-12" },
    { id: "SUP-012", status: "expired", expires: "2026-10-20" }
  ]);
  const statusInfo = (key) => STATUS.find((item) => item.key === key);
  const casesFor = (key) => DEMO_CASES.filter((item) => item.status === key);
  const daysToExpiry = (item) => item.expires === null ? null : Math.round((Date.parse(`${item.expires}T00:00:00Z`) - Date.parse(`${DEMO_DATE}T00:00:00Z`)) / 86400000);

  function validateDemoData() {
    const ids = new Set(DEMO_CASES.map((item) => item.id));
    if (ids.size !== DEMO_CASES.length || DEMO_CASES.length !== 12) throw new Error("The demonstration dataset must contain twelve unique synthetic cases.");
    DEMO_CASES.forEach((item) => {
      if (!statusInfo(item.status)) throw new Error(`Unknown status in ${item.id}.`);
      const days = daysToExpiry(item);
      if (item.status === "current" && !(days > 30)) throw new Error(`Current-case expiry is invalid in ${item.id}.`);
      if (item.status === "due" && !(days >= 0 && days <= 30)) throw new Error(`Due-soon expiry is invalid in ${item.id}.`);
      if (item.status === "expired" && !(days < 0)) throw new Error(`Expired-case date is invalid in ${item.id}.`);
      if (["review", "missing"].includes(item.status) && item.expires !== null) throw new Error(`Unapproved case ${item.id} cannot carry an approved expiry date.`);
    });
  }

  function renderDonut() {
    const radius = 97;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" role="img" aria-labelledby="donut-title donut-desc"><title id="donut-title">Certification status of twelve synthetic cases</title><desc id="donut-desc">Five approved current, three under review, two with evidence missing, one expiring soon, one expired. These counts are illustrative and not Apex measurements.</desc><circle cx="130" cy="130" r="97" fill="none" stroke="#29454b" stroke-width="29"/>`;
    STATUS.forEach((item) => {
      const count = casesFor(item.key).length;
      const length = (count / DEMO_CASES.length) * circumference;
      const opacity = selectedStatus === "all" || selectedStatus === item.key ? 1 : 0.19;
      svg += `<circle cx="130" cy="130" r="${radius}" fill="none" stroke="${item.color}" stroke-width="29" stroke-dasharray="${Math.max(0, length - 3)} ${circumference - Math.max(0, length - 3)}" stroke-dashoffset="${-offset}" transform="rotate(-90 130 130)" opacity="${opacity}"><title>${count} ${escapeHTML(item.label.toLowerCase())}</title></circle>`;
      offset += length;
    });
    const count = selectedStatus === "all" ? DEMO_CASES.length : casesFor(selectedStatus).length;
    const label = selectedStatus === "all" ? "sample cases" : statusInfo(selectedStatus).short;
    svg += svgText(130, 123, count, { size: 72, color: "#f0f6e9", weight: 600 });
    svg += svgText(130, 163, label, { size: 20, color: "#b9c9c6", weight: 400 });
    $("#status-donut").innerHTML = `${svg}</svg>`;
  }

  function makeQueueRow(id, label, action, color) {
    return `<div class="queue-row"><span class="queue-id">${escapeHTML(id)}</span><span class="queue-status" style="color:${color}">${escapeHTML(label)}</span><span class="queue-action">${escapeHTML(action)}</span></div>`;
  }

  function expiryLabel(item) {
    const days = daysToExpiry(item);
    if (item.status === "due") return `Due in ${days} days`;
    if (item.status === "expired") return `Expired ${Math.abs(days)} days ago`;
    return statusInfo(item.status).label;
  }

  function renderQueue() {
    const actionable = DEMO_CASES.filter((item) => item.status !== "current");
    const renewalExceptions = casesFor("due").length + casesFor("expired").length;
    $("#renewal-count").textContent = renewalExceptions;
    $("#correction-count").textContent = casesFor("missing").length;
    if (selectedStatus === "all") {
      const expired = casesFor("expired")[0];
      const due = casesFor("due")[0];
      const missing = casesFor("missing");
      $("#queue-title").textContent = "Priority work queue";
      $("#queue-count").textContent = `${actionable.length} actionable cases`;
      $("#queue-table").innerHTML = [
        makeQueueRow(expired.id, expiryLabel(expired), statusInfo("expired").action, statusInfo("expired").ink),
        makeQueueRow(due.id, expiryLabel(due), statusInfo("due").action, statusInfo("due").ink),
        makeQueueRow(missing.map((item) => item.id.replace("SUP-", "")).join(" / "), `${missing.length} missing evidence`, statusInfo("missing").action, statusInfo("missing").ink)
      ].join("");
      $("#queue-summary").textContent = `Also ${casesFor("review").length} cases under review. ${casesFor("current").length} approved current cases require routine monitoring.`;
    } else {
      const info = statusInfo(selectedStatus);
      const records = casesFor(selectedStatus);
      const shown = records.slice(0, 3);
      $("#queue-title").textContent = info.label;
      $("#queue-count").textContent = `${records.length} ${records.length === 1 ? "sample case" : "sample cases"}`;
      $("#queue-table").innerHTML = shown.map((item) => makeQueueRow(item.id, expiryLabel(item), info.action, info.ink)).join("");
      $("#queue-summary").textContent = records.length > shown.length ? `Showing ${shown.length} of ${records.length} synthetic cases. All ${records.length} have current approved certification.` : "Illustrative work queue. Actions follow the proposed process controls.";
    }
  }

  function setStatus(key) {
    selectedStatus = STATUS.some((item) => item.key === key) ? key : "all";
    $$(".legend-button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.status === selectedStatus)));
    renderDonut();
    renderQueue();
  }

  function initialiseDashboard() {
    validateDemoData();
    $("#status-legend").innerHTML = STATUS.map((item) => `<button type="button" class="legend-button" data-status="${item.key}" aria-pressed="false" aria-label="Filter ${escapeHTML(item.label.toLowerCase())}: ${casesFor(item.key).length} synthetic cases"><span class="legend-dot" style="--swatch:${item.color}" aria-hidden="true"></span><span>${escapeHTML(item.label)}</span><strong>${casesFor(item.key).length}</strong></button>`).join("");
    $$(".legend-button").forEach((button) => button.addEventListener("click", () => setStatus(selectedStatus === button.dataset.status ? "all" : button.dataset.status)));
    $("#reset-filter").addEventListener("click", () => setStatus("all"));
    setStatus("all");
  }

  function notify(messageText) {
    const notification = $("#notification");
    window.clearTimeout(notificationTimeout);
    notification.textContent = messageText;
    notification.hidden = false;
    notificationTimeout = window.setTimeout(() => { notification.hidden = true; }, 4400);
  }

  function fitStage() {
    const viewport = $("#viewport");
    const width = Math.max(1, viewport.clientWidth);
    const height = Math.max(1, viewport.clientHeight);
    // Uniform scale keeps typography and geometry undistorted. The design canvas
    // grows on the spare axis, so every window shape is filled edge to edge.
    const scale = Math.min(width / DESIGN.width, height / DESIGN.height);
    const canvasWidth = width / scale;
    const canvasHeight = height / scale;
    const root = document.documentElement.style;
    root.setProperty("--stage-scale", String(scale));
    root.setProperty("--canvas-width", `${canvasWidth}px`);
    root.setProperty("--canvas-height", `${canvasHeight}px`);
    root.setProperty("--extra-height", `${Math.max(0, canvasHeight - DESIGN.height)}px`);
  }

  function revealControls(pin = false) {
    if (pin) hudPinned = !hudPinned;
    document.body.classList.remove("controls-suppressed");
    document.body.classList.add("controls-visible");
    window.clearTimeout(hudTimeout);
    if (!hudPinned) hudTimeout = window.setTimeout(() => {
      if (!$(".presentation-toolbar").contains(document.activeElement)) document.body.classList.remove("controls-visible");
    }, 3000);
    $(".presentation-toolbar").dataset.pinned = String(hudPinned);
  }

  function toggleControls() {
    if (hudPinned) {
      hudPinned = false;
      window.clearTimeout(hudTimeout);
      if ($(".presentation-toolbar").contains(document.activeElement)) document.activeElement.blur();
      document.body.classList.remove("controls-visible");
      document.body.classList.add("controls-suppressed");
    } else revealControls(true);
  }

  function animateSlide(slide) {
    stopGraphicLoops();
    slide.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    if (reducedMotion.matches) return;
    const selectors = slide.classList.contains("cover")
      ? ".cover-copy > *, .cover-system, .team-strip"
      : ".slide-heading > *, .stakeholder-register, .swot-grid, .objective-list, .traceability-target, .gantt-figure, .milestone-grid, .bpmn-figure, .gap-grid, .control-row, .requirements-grid, .acceptance-strip, .dashboard-layout, .dashboard-meaning, .option-intros, .comparison-table, .recommendation-strip, .closing-layout, .scope-statement";
    $$(selectors, slide).forEach((element, index) => {
      element.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }], {
        duration: 620, delay: Math.min(index * 65, 390), easing: "cubic-bezier(.2,.7,.3,1)", fill: "backwards"
      });
    });
    startGraphicLoops(slide);
  }

  function stopGraphicLoops() {
    graphicLoops.forEach((animation) => animation.cancel());
    graphicLoops = [];
    $$(".motion-overlay", $("#stage")).forEach((element) => element.remove());
  }

  function startGraphicLoops(slide) {
    stopGraphicLoops();
    if (reducedMotion.matches || printing) return;
    const dark = slide.classList.contains("theme-dark");
    const accent = dark ? "#a8d2c4" : "#467d74";
    // Every cycle lasts exactly three seconds. The underlying arrows and bars
    // remain fully visible, so motion never hides process or schedule information.
    $$(".sequence-flow, .message-flow, .architecture-flow", slide).forEach((path, index) => {
      const length = path.getTotalLength();
      const overlay = path.cloneNode(false);
      overlay.removeAttribute("id");
      overlay.setAttribute("class", "motion-overlay flow-overlay");
      overlay.setAttribute("aria-hidden", "true");
      overlay.setAttribute("data-motion-period", String(GRAPHIC_PERIOD_MS));
      overlay.setAttribute("stroke", accent);
      overlay.setAttribute("stroke-width", "2.6");
      overlay.removeAttribute("marker-end");
      overlay.removeAttribute("marker-start");
      overlay.setAttribute("opacity", "0");
      path.insertAdjacentElement("afterend", overlay);
      const messageFlow = path.classList.contains("message-flow");
      const keyframes = messageFlow ? [
        { offset: 0, strokeDasharray: "7 5", strokeDashoffset: 0, opacity: 0 },
        { offset: .05, strokeDasharray: "7 5", strokeDashoffset: 0, opacity: .92 },
        { offset: .32, strokeDasharray: "7 5", strokeDashoffset: -24, opacity: .92 },
        { offset: .55, strokeDasharray: "7 5", strokeDashoffset: -36, opacity: 0 },
        { offset: 1, strokeDasharray: "7 5", strokeDashoffset: -36, opacity: 0 }
      ] : [
        { offset: 0, strokeDasharray: `${length} ${length}`, strokeDashoffset: length, opacity: 0 },
        { offset: .05, strokeDasharray: `${length} ${length}`, strokeDashoffset: length, opacity: .92 },
        { offset: .32, strokeDasharray: `${length} ${length}`, strokeDashoffset: 0, opacity: .92 },
        { offset: .55, strokeDasharray: `${length} ${length}`, strokeDashoffset: 0, opacity: 0 },
        { offset: 1, strokeDasharray: `${length} ${length}`, strokeDashoffset: 0, opacity: 0 }
      ];
      overlay.setAttribute("data-flow-kind", messageFlow ? "message" : "sequence");
      graphicLoops.push(overlay.animate(keyframes, { duration: GRAPHIC_PERIOD_MS, iterations: Infinity, delay: Math.min(index * 25, 250), easing: "linear" }));
    });
    $$(".gantt-bar", slide).forEach((bar, index) => {
      const overlay = bar.cloneNode(false);
      overlay.removeAttribute("id");
      overlay.setAttribute("class", "motion-overlay gantt-overlay");
      overlay.setAttribute("aria-hidden", "true");
      overlay.setAttribute("data-motion-period", String(GRAPHIC_PERIOD_MS));
      overlay.setAttribute("y", String(Number(bar.getAttribute("y")) + Number(bar.getAttribute("height")) - 3));
      overlay.setAttribute("height", "2");
      overlay.setAttribute("rx", "0");
      overlay.setAttribute("fill", accent);
      overlay.setAttribute("opacity", "0");
      overlay.style.transformBox = "fill-box";
      overlay.style.transformOrigin = "left center";
      bar.insertAdjacentElement("afterend", overlay);
      graphicLoops.push(overlay.animate([
        { offset: 0, transform: "scaleX(0)", opacity: 0 },
        { offset: .05, transform: "scaleX(0)", opacity: .9 },
        { offset: .34, transform: "scaleX(1)", opacity: .9 },
        { offset: .58, transform: "scaleX(1)", opacity: 0 },
        { offset: 1, transform: "scaleX(1)", opacity: 0 }
      ], { duration: GRAPHIC_PERIOD_MS, iterations: Infinity, delay: index * 40, easing: "linear" }));
    });
    syncGraphicPlayback();
  }

  function syncGraphicPlayback() {
    const paused = document.hidden || !$("#blackout").hidden || Boolean($("dialog[open]"));
    graphicLoops.forEach((animation) => { if (paused) animation.pause(); else animation.play(); });
  }

  function bindPresentationChrome() {
    document.addEventListener("pointermove", (event) => { if (event.clientY > window.innerHeight - 90) revealControls(); }, { passive: true });
    document.addEventListener("focusin", (event) => { if (event.target.closest(".presentation-toolbar")) revealControls(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Tab") revealControls(); });
    document.addEventListener("touchstart", () => revealControls(), { passive: true });
    revealControls();
  }

  function indexFromHash() {
    const match = /^#(?:slide-)?(\d{1,2})$/.exec(window.location.hash);
    if (!match) return 0;
    return Math.min(total - 1, Math.max(0, Number(match[1]) - 1));
  }

  function goTo(index, updateURL = true) {
    const nextIndex = Math.min(total - 1, Math.max(0, index));
    const changed = nextIndex !== activeIndex || !motionInitialised;
    const focusWasInsideSlide = slides[activeIndex]?.contains(document.activeElement);
    activeIndex = nextIndex;
    slides.forEach((slide, itemIndex) => {
      const isActive = itemIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.hidden = !isActive;
      slide.inert = !isActive;
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.setAttribute("aria-label", `Slide ${itemIndex + 1} of ${total}`);
      slide.setAttribute("aria-roledescription", "slide");
    });
    $("#slide-counter").textContent = `${pad(activeIndex + 1)} / ${pad(total)}`;
    $("#previous").disabled = activeIndex === 0;
    $("#next").disabled = activeIndex === total - 1;
    $("#progress-bar").style.width = `${((activeIndex + 1) / total) * 100}%`;
    $$(".slide-dot, .overview-item").forEach((button) => {
      if (Number(button.dataset.slideIndex) === activeIndex) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    document.body.dataset.activeTheme = slides[activeIndex].classList.contains("theme-dark") ? "dark" : "light";
    document.title = `${pad(activeIndex + 1)} / ${pad(total)} · ${slides[activeIndex].dataset.title} · Apex CCG`;
    if (updateURL) {
      const hash = `#slide-${activeIndex + 1}`;
      try { window.history.replaceState(null, "", hash); }
      catch { if (window.location.hash !== hash) window.location.hash = hash; }
    }
    if (changed) { animateSlide(slides[activeIndex]); motionInitialised = true; }
    if (focusWasInsideSlide) {
      $("#stage").setAttribute("tabindex", "-1");
      $("#stage").focus({ preventScroll: true });
    }
  }

  function openDialog(dialog) {
    if ($$("dialog[open]").length) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    syncGraphicPlayback();
    if (dialog.id === "overview-dialog") $(".overview-item[aria-current='step']", dialog)?.focus();
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    syncGraphicPlayback();
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else notify("Use your browser’s fullscreen shortcut to maximise the presentation.");
    } catch {
      notify("Fullscreen is unavailable in this viewer. Use your browser’s fullscreen shortcut.");
    }
  }

  function toggleBlackout(force) {
    const panel = $("#blackout");
    panel.hidden = typeof force === "boolean" ? !force : !panel.hidden;
    syncGraphicPlayback();
  }

  function buildNavigation() {
    $("#slide-dots").innerHTML = slides.map((slide, index) => `<button type="button" class="slide-dot" data-slide-index="${index}" aria-label="Go to slide ${index + 1}: ${escapeHTML(slide.dataset.title)}" title="${index + 1}. ${escapeHTML(slide.dataset.title)}"></button>`).join("");
    $("#overview-grid").innerHTML = slides.map((slide, index) => `<button type="button" class="overview-item" data-slide-index="${index}"><span class="overview-number">${pad(index + 1)}</span><span>${escapeHTML(slide.dataset.title)}</span></button>`).join("");
    $$(".slide-dot, .overview-item").forEach((button) => button.addEventListener("click", () => {
      goTo(Number(button.dataset.slideIndex));
      if ($("#overview-dialog").open) closeDialog($("#overview-dialog"));
    }));
    $("#previous").addEventListener("click", () => goTo(activeIndex - 1));
    $("#next").addEventListener("click", () => goTo(activeIndex + 1));
    $("#overview-button").addEventListener("click", () => openDialog($("#overview-dialog")));
    $("#help-button").addEventListener("click", () => openDialog($("#help-dialog")));
    $("#fullscreen-button").addEventListener("click", toggleFullscreen);
    $("#print-button").addEventListener("click", () => window.print());
    $("#blackout").addEventListener("click", () => toggleBlackout(false));
    $$('[data-close-dialog]').forEach((button) => button.addEventListener("click", () => closeDialog(button.closest("dialog"))));
    $$("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(dialog);
    }));
  }

  function bindKeyboard() {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
      const element = event.target;
      if (element instanceof Element && element.closest("input,textarea,select,[contenteditable='true']")) return;
      if (!$("#blackout").hidden) {
        if (event.key.toLowerCase() === "b" || event.key === "Escape") toggleBlackout(false);
        event.preventDefault();
        return;
      }
      if ($$("dialog[open]").length) return;
      if (element instanceof Element && element.closest("button,a") && [" ", "Enter"].includes(event.key)) return;
      const key = event.key.toLowerCase();
      const commands = {
        "arrowright": () => goTo(activeIndex + 1), "arrowdown": () => goTo(activeIndex + 1), "pagedown": () => goTo(activeIndex + 1), " ": () => goTo(activeIndex + 1),
        "arrowleft": () => goTo(activeIndex - 1), "arrowup": () => goTo(activeIndex - 1), "pageup": () => goTo(activeIndex - 1), "backspace": () => goTo(activeIndex - 1),
        "home": () => goTo(0), "end": () => goTo(total - 1), "f": toggleFullscreen, "b": () => toggleBlackout(),
        "o": () => openDialog($("#overview-dialog")), "h": toggleControls, "p": () => window.print(), "?": () => openDialog($("#help-dialog"))
      };
      if (commands[key]) { event.preventDefault(); commands[key](); }
      else if (/^[0-9]$/.test(key)) { event.preventDefault(); goTo(key === "0" ? total - 1 : Number(key) - 1); }
    });
  }

  function bindTouch() {
    let origin = null;
    const viewport = $("#viewport");
    viewport.addEventListener("touchstart", (event) => {
      if (event.touches.length !== 1 || event.target.closest("button,a") || $$("dialog[open]").length) { origin = null; return; }
      origin = { x: event.touches[0].clientX, y: event.touches[0].clientY, time: Date.now() };
    }, { passive: true });
    viewport.addEventListener("touchend", (event) => {
      if (!origin || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - origin.x;
      const dy = event.changedTouches[0].clientY - origin.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.6 && Date.now() - origin.time < 1200) goTo(activeIndex + (dx < 0 ? 1 : -1));
      origin = null;
    }, { passive: true });
    viewport.addEventListener("touchcancel", () => { origin = null; }, { passive: true });
  }

  function start() {
    if (total !== 10) throw new Error("The presentation must contain exactly ten slides.");
    renderGantt();
    $("#as-is-bpmn").innerHTML = makeBPMN(false);
    $("#to-be-bpmn").innerHTML = makeBPMN(true);
    initialiseDashboard();
    buildNavigation();
    bindKeyboard();
    bindTouch();
    bindPresentationChrome();
    fitStage();
    goTo(indexFromHash());
    if (typeof ResizeObserver === "function") new ResizeObserver(fitStage).observe($("#viewport"));
    window.addEventListener("resize", fitStage, { passive: true });
    document.fonts.ready.then(fitStage);
    document.addEventListener("visibilitychange", syncGraphicPlayback);
    $$("dialog").forEach((dialog) => dialog.addEventListener("close", syncGraphicPlayback));
    reducedMotion.addEventListener("change", () => {
      stopGraphicLoops();
      if (!reducedMotion.matches) startGraphicLoops(slides[activeIndex]);
    });
    window.addEventListener("hashchange", () => goTo(indexFromHash(), false));
    document.addEventListener("fullscreenchange", () => {
      const isFullscreen = Boolean(document.fullscreenElement);
      document.body.classList.toggle("is-fullscreen", isFullscreen);
      $("#fullscreen-button").setAttribute("aria-label", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
      fitStage();
    });
    window.addEventListener("beforeprint", () => {
      printing = true;
      stopGraphicLoops();
      $("#stage").getAnimations({ subtree: true }).forEach((animation) => animation.finish());
      filterBeforePrint = selectedStatus;
      setStatus("all");
    });
    window.addEventListener("afterprint", () => {
      printing = false;
      startGraphicLoops(slides[activeIndex]);
      setStatus(filterBeforePrint);
      fitStage();
    });
  }

  start();
})();
