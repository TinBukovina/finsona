// src/6_shared/ui/DebugSWR.tsx

"use client";

// Uvozimo 'useSWR' da se komponenta automatski ažurira
import useSWR from "swr";

export function DebugSWR() {
  // "Pretplatimo" se na ključ '/api/wallets' da bismo dobili podatke uživo
  const { data: walletsData, isLoading, error } = useSWR("/api/wallets");

  // Ovdje možeš dodati bilo koji drugi SWR ključ iz svoje aplikacije koji želiš pratiti
  // const { data: drugiPodaci } = useSWR("/api/neki/drugi/endpoint");

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "350px",
        maxHeight: "400px",
        overflowY: "auto",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        color: "#00ff00",
        border: "2px solid #00ff00",
        borderRadius: "8px",
        padding: "15px",
        fontFamily: "monospace",
        fontSize: "12px",
        zIndex: 9999,
        whiteSpace: "pre-wrap",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          borderBottom: "1px solid #00ff00",
          paddingBottom: "5px",
        }}
      >
        SWR Live Debugger
      </h3>

      <h4>Key: "/api/wallets"</h4>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {walletsData ? (
        <pre>{JSON.stringify(walletsData, null, 2)}</pre>
      ) : (
        <p style={{ color: "orange" }}>No data in cache for this key.</p>
      )}
    </div>
  );
}
