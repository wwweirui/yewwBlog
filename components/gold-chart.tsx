"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function GoldChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (widgetRef.current) return; // prevent double creation in StrictMode

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (containerRef.current && window.TradingView) {
        widgetRef.current = new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol: "OANDA:XAUUSD",
          interval: "D",
          theme: "dark",
          style: "1",
          width: "100%",
          height: 500,
          locale: "zh_CN",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: false,
          save_image: false,
          allow_symbol_change: true,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch {
          // ignore cleanup errors
        }
        widgetRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="tv-chart-container"
      ref={containerRef}
      className="w-full overflow-hidden rounded-lg border bg-card"
      style={{ height: 500 }}
    />
  );
}
