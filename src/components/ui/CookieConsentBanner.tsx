"use client";

import { useEffect, useState } from "react";
import { legoTheme } from "@/styles/themes/lego";

const CONSENT_KEY = "cookie_consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "true");
    setVisible(false);
    // Reload so the GA snippet picks up the new consent state
    window.location.reload();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "false");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(480px, calc(100vw - 2rem))",
        backgroundColor: legoTheme.colors.white,
        border: `${legoTheme.borderWidth} solid ${legoTheme.colors.border}`,
        borderRadius: legoTheme.borderRadius,
        boxShadow: legoTheme.shadow,
        padding: "1rem 1.25rem",
        fontFamily: legoTheme.fontFamily,
      }}
    >
      <p
        style={{
          margin: "0 0 0.75rem",
          fontSize: "0.875rem",
          fontWeight: 700,
          color: legoTheme.colors.black,
          lineHeight: 1.5,
        }}
      >
        🍪 We use cookies to improve your experience. Analytics help us understand how Team
        Shuffler is used.
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={accept}
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            backgroundColor: legoTheme.colors.yellow,
            color: legoTheme.colors.black,
            border: `${legoTheme.borderWidth} solid ${legoTheme.colors.border}`,
            borderRadius: legoTheme.borderRadius,
            fontFamily: legoTheme.fontFamily,
            fontWeight: 800,
            fontSize: "0.875rem",
            cursor: "pointer",
            boxShadow: legoTheme.shadow,
          }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            backgroundColor: legoTheme.colors.gray,
            color: legoTheme.colors.black,
            border: `${legoTheme.borderWidth} solid ${legoTheme.colors.border}`,
            borderRadius: legoTheme.borderRadius,
            fontFamily: legoTheme.fontFamily,
            fontWeight: 800,
            fontSize: "0.875rem",
            cursor: "pointer",
            boxShadow: legoTheme.shadow,
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
