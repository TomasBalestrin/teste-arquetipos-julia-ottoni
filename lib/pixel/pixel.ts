declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackPageView(): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
}

export function trackClickCTA(): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
}
