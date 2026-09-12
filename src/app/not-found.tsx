import Link from "next/link";

// Fallback for the rare case a request reaches the true root without ever
// resolving a locale segment (e.g. a malformed path the middleware rewrite
// didn't cover). The real, translated 404 lives at src/app/[locale]/not-found.tsx
// and is what visitors normally see.
export default function RootNotFound() {
  return (
    <html lang="it">
      <body style={{ background: "#14100b", color: "#f3ece0", display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "4rem", margin: 0, fontWeight: 700 }}>404</p>
          <p>
            <Link href="/" style={{ color: "#caa456" }}>Torna alla home</Link>
          </p>
        </div>
      </body>
    </html>
  );
}
