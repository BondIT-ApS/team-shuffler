import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";

const APP_URL = "https://team-shuffler.bondit.dk";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const RYBBIT_SITE_ID = "aea6e2b931db";

export const metadata: Metadata = {
  title: "Team Shuffler",
  description:
    "Randomly shuffle people into teams — perfect for workshops and retrospectives",
  metadataBase: new URL(APP_URL),
  alternates: {
    canonical: APP_URL,
  },
  openGraph: {
    title: "Team Shuffler",
    description:
      "Randomly shuffle people into teams — perfect for workshops and retrospectives",
    url: APP_URL,
    images: [
      {
        url: `${APP_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Team Shuffler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Shuffler",
    description:
      "Randomly shuffle people into teams — perfect for workshops and retrospectives",
    images: [`${APP_URL}/opengraph-image`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsentBanner />
        <Script
          src="https://stats1.bonde.ninja/api/script.js"
          data-site-id={RYBBIT_SITE_ID}
          strategy="afterInteractive"
        />
        <Script
          id="matomo"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
              _paq.push(["setCookieDomain", "*.team-shuffler.dev.bondit.dk"]);
              _paq.push(["setDomains", ["*.team-shuffler.dev.bondit.dk","*.team-shuffler.bondit.dk"]]);
              _paq.push(["enableCrossDomainLinking"]);
              _paq.push(["setDoNotTrack", true]);
              _paq.push(["trackPageView"]);
              _paq.push(["enableLinkTracking"]);
              (function() {
                var u="//stats2.bonde.ninja/";
                _paq.push(["setTrackerUrl", u+"matomo.php"]);
                _paq.push(["setSiteId", "2"]);
                var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
                g.async=true; g.src=u+"matomo.js"; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
        />
        {GA_ID && (
          <>
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    if (localStorage.getItem('cookie_consent') !== 'true') return;
                    var s = document.createElement('script');
                    s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
                    s.async = true;
                    document.head.appendChild(s);
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = gtag;
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                  })();
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
