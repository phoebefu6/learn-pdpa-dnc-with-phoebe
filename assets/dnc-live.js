/* dnc-live.js - the in-browser DNC compliance checker for learn-pdpa-dnc-with-phoebe.
 *
 * Implements the verified decision logic from Singapore PDPA Part 9 (Do Not Call provisions):
 * is the message a "specified message"? if so, is there consent OR a valid <=21-day register
 * check? is the number listed? is sender ID present (s.44)? is the calling line concealed (s.45)?
 *
 * EDUCATIONAL, NOT LEGAL ADVICE. A teaching model of the rules - always verify against the PDPC
 * Advisory Guidelines on the DNC Provisions and get proper advice for real campaigns.
 *
 * Usage:  <div class="dncbox" data-caption="Pick a scenario, watch the ruling"></div>
 * No dependencies.
 */
(function () {
  "use strict";

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* the fields the checker reasons over */
  var FIELDS = [
    { key: "purpose", label: "Message purpose", opts: [
        ["marketing", "Marketing / promotional (advertise goods, services, an offer)"],
        ["transactional", "Transactional / service only (receipt, delivery, recall, warranty)"],
        ["research", "Market research or survey only"],
        ["b2b", "Sent to an organisation for its business purposes (B2B)"],
        ["emergency", "Emergency - threat to life, health or safety"],
        ["ongoing", "Ongoing relationship, message on-topic (e.g. rewards to a current cardholder)"]
      ] },
    { key: "channel", label: "Channel", opts: [
        ["voice", "Voice call"],
        ["sms", "Text message (SMS / MMS)"],
        ["fax", "Fax"]
      ] },
    { key: "consent", label: "Consent on file", opts: [
        ["none", "No clear-and-unambiguous consent"],
        ["consent", "Clear + unambiguous consent (written, positive action)"]
      ] },
    { key: "register", label: "DNC register check", opts: [
        ["clear", "Checked within 21 days - number NOT listed"],
        ["listed", "Checked - number IS listed on the register"],
        ["none", "Not checked (or check older than 21 days)"]
      ] },
    { key: "senderid", label: "Sender identity + contact info (s.44)", opts: [
        ["yes", "Included, clear and accurate"],
        ["no", "Missing or unclear"]
      ] },
    { key: "cli", label: "Calling line identity (voice / fax, s.45)", opts: [
        ["shown", "Shown - not concealed"],
        ["concealed", "Concealed or withheld"]
      ] }
  ];

  /* the verified rule engine -> { ok, rule, verdict, why } */
  function rule(v) {
    var isSpecified = v.purpose === "marketing";
    if (!isSpecified) {
      var reasons = {
        transactional: "Sole purpose is transactional / service (Eighth Schedule (d)).",
        research: "Sole purpose is market research or survey (Eighth Schedule (f)).",
        b2b: "Sent to an organisation for its own business purposes - B2B (Eighth Schedule (g)).",
        emergency: "Necessary to respond to an emergency (Eighth Schedule (c)).",
        ongoing: "Within an ongoing relationship and on-topic (Eighth Schedule (e)) - applies to voice, text AND fax."
      };
      return { ok: true, rule: "Out of scope", verdict: "Not a specified message",
        why: (reasons[v.purpose] || "") + " The DNC duties in Part 9 do not apply. (Other PDPA obligations still can.)" };
    }
    /* it IS a specified marketing message - need a lawful basis to send */
    if (v.consent !== "consent") {
      if (v.register === "none")
        return { ok: false, rule: "s.43", verdict: "Not compliant",
          why: "No consent and no valid register check. You must hold a confirmation (obtained within 21 days) that the number is not listed before sending. Fix: check the DNC Registry, or obtain clear consent." };
      if (v.register === "listed")
        return { ok: false, rule: "s.43", verdict: "Not compliant",
          why: "The number is ON the register and you have no consent. Do not send. Fix: remove this number, or obtain clear-and-unambiguous consent (consent lets you message even a listed number)." };
    }
    /* consent, or a clear check, is in place - now the identity duties (apply to EVERY specified message) */
    if (v.senderid !== "yes")
      return { ok: false, rule: "s.44", verdict: "Not compliant",
        why: "Lawful basis is fine, but every specified message must clearly identify the sender and how to contact them (valid ~30 days). Fix: add sender identity + contact info." };
    if ((v.channel === "voice" || v.channel === "fax") && v.cli === "concealed")
      return { ok: false, rule: "s.45", verdict: "Not compliant",
        why: "A voice call or fax with a specified message must not conceal the calling line identity. Fix: unmask the sending number." };
    var basis = v.consent === "consent" ? "clear consent on file" : "a valid <=21-day 'not listed' register check";
    return { ok: true, rule: "s.43 + s.44" + (v.channel === "voice" || v.channel === "fax" ? " + s.45" : ""),
      verdict: "Compliant", why: "Specified message with " + basis + ", sender identified, and calling line shown. Good to send." };
  }

  function wire(box) {
    var caption = box.getAttribute("data-caption") || "";
    box.innerHTML = "";
    var bar = document.createElement("div"); bar.className = "dnc-bar";
    bar.innerHTML = '<span class="dnc-dot"></span><span class="dnc-title">DNC compliance checker</span>' +
      '<span class="dnc-tag">Singapore PDPA Part 9</span>';
    box.appendChild(bar);

    var presetRow = document.createElement("div"); presetRow.className = "dnc-presets";
    var PRESETS = [
      ["SMS promo, opted-in customer", { purpose: "marketing", channel: "sms", consent: "consent", register: "none", senderid: "yes", cli: "shown" }],
      ["Cold call, no check", { purpose: "marketing", channel: "voice", consent: "none", register: "none", senderid: "yes", cli: "shown" }],
      ["Promo to a LISTED number, no consent", { purpose: "marketing", channel: "sms", consent: "none", register: "listed", senderid: "yes", cli: "shown" }],
      ["Delivery receipt SMS", { purpose: "transactional", channel: "sms", consent: "none", register: "none", senderid: "yes", cli: "shown" }],
      ["Rewards offer to a current cardholder", { purpose: "ongoing", channel: "voice", consent: "none", register: "none", senderid: "yes", cli: "shown" }],
      ["Checked-clear SMS, no sender ID", { purpose: "marketing", channel: "sms", consent: "none", register: "clear", senderid: "no", cli: "shown" }]
    ];
    var state = {};
    FIELDS.forEach(function (f) { state[f.key] = f.opts[0][0]; });

    var selects = {};
    var grid = document.createElement("div"); grid.className = "dnc-grid";
    FIELDS.forEach(function (f) {
      var wrap = document.createElement("label"); wrap.className = "dnc-field";
      wrap.innerHTML = '<span class="dnc-flabel">' + esc(f.label) + "</span>";
      var sel = document.createElement("select"); sel.className = "dnc-select";
      f.opts.forEach(function (o) {
        var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1]; sel.appendChild(op);
      });
      sel.addEventListener("change", function () { state[f.key] = sel.value; render(); });
      selects[f.key] = sel;
      wrap.appendChild(sel); grid.appendChild(wrap);
    });

    PRESETS.forEach(function (p) {
      var b = document.createElement("button"); b.type = "button"; b.className = "dnc-preset"; b.textContent = p[0];
      b.addEventListener("click", function () {
        Object.keys(p[1]).forEach(function (k) { state[k] = p[1][k]; if (selects[k]) selects[k].value = p[1][k]; });
        render();
      });
      presetRow.appendChild(b);
    });
    box.appendChild(presetRow);
    box.appendChild(grid);

    var out = document.createElement("div"); out.className = "dnc-out"; box.appendChild(out);
    var note = document.createElement("div"); note.className = "dnc-note";
    note.textContent = "Educational model of the rules - not legal advice. Verify against the PDPC Advisory Guidelines.";
    box.appendChild(note);
    if (caption) { var c = document.createElement("div"); c.className = "dnc-cap"; c.textContent = caption; box.appendChild(c); }

    function render() {
      /* hide the CLI field unless channel is voice/fax (it only matters there) */
      var cliField = selects.cli.closest(".dnc-field");
      if (cliField) cliField.style.display = (state.channel === "voice" || state.channel === "fax") ? "" : "none";
      var r = rule(state);
      out.innerHTML =
        '<div class="dnc-verdict ' + (r.ok ? "dnc-ok" : "dnc-bad") + '">' +
        '<span class="dnc-badge">' + (r.ok ? "✓" : "✗") + "</span>" +
        '<div><b>' + esc(r.verdict) + '</b> <span class="dnc-rule">' + esc(r.rule) + "</span>" +
        '<p>' + esc(r.why) + "</p></div></div>";
    }
    render();
  }

  function init() {
    Array.prototype.slice.call(document.querySelectorAll(".dncbox")).forEach(wire);
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); }
  else { init(); }
})();
