"use client";
import { useEffect, RefObject } from "react";

const useTradingViewWidget = (
  containerRef: RefObject<HTMLDivElement | null>,
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600
) => {
  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // Clear any existing script to allow re-initialization
    const existingScript = containerElement.querySelector('script[src*="tradingview.com"]');
    if (existingScript) {
      containerElement.removeChild(existingScript);
    }

    // Create and configure the script
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    
    // Append script to the widget div
    containerElement.appendChild(script);

    // Cleanup function to remove script when component unmounts or dependencies change
    return () => {
      if (containerElement && script.parentNode) {
        containerElement.removeChild(script);
      }
    };
  }, [scriptUrl, config]);
};

export default useTradingViewWidget;
