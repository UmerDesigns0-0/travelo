import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import { useState, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("MM DD, YYYY");
};

export const calculateTrendPercentage = (
  countOfThisMonth: number,
  countOfLastMonth: number
): TrendResult => {
  if (countOfLastMonth === 0) {
    return countOfThisMonth === 0
      ? { trend: "no change", percentage: 0 }
      : { trend: "increment", percentage: 100 };
  }

  const change = countOfThisMonth - countOfLastMonth;
  const percentage = Math.abs((change / countOfLastMonth) * 100);

  if (change > 0) {
    return { trend: "increment", percentage };
  } else if (change < 0) {
    return { trend: "decrement", percentage };
  } else {
    return { trend: "no change", percentage: 0 };
  }
};

export function useScreen() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

export function parseMarkdownToJson(text: string): any | null {
  try {
    // 1️⃣ Try direct JSON first (Gemini often returns pure JSON)
    return JSON.parse(text);
  } catch { }

  // 2️⃣ Try markdown fenced JSON
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);

  if (match?.[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      console.error("Failed to parse fenced JSON:", e);
    }
  }

  console.warn("No valid JSON found.");
  return null;
}


export function parseTripData(tripData: any): Trip | null {
  if (!tripData) return null;

  // If the stored value is a JSON string (e.g. from the DB field `tripDetails`), parse it
  if (typeof tripData === "string") {
    try {
      return JSON.parse(tripData) as Trip;
    } catch (e) {
      console.error("parseTripData: failed to parse JSON string", e);
      return null;
    }
  }

  // If it's already an object, return it as a Trip
  return tripData as Trip;
}

export function getFirstWord(text: string): string | null {
  const words = text.split(" ");
  return words.length > 0 ? words[0] : null;
}


// export function parseTripData(jsonString: any): Trip | null {
//   try {
//     const data: Trip = JSON.parse(jsonString);
//     return data;
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//     return null;
//   }
// }

// export function parseMarkdownToJson(markdown: string): any | null {
//   // const regex = /```(?:json)?\s*([\s\S]*?)\s*```/;
//   const regex = /```json\n([\s\S]+?)\n```/;
//   const match = markdown.match(regex);
//   if (match && match[1]) {
//     try {
//       return JSON.parse(match[1]);
//     } catch (error) {
//       console.error("Error parsing JSON from markdown:", error);
//       return null;
//     }
//   }
//   console.warn("No JSON code block found in markdown.");
//   return null;
// }

export function formatYAxisValue(value: number) {
  const absValue = Math.abs(value);

  if (absValue >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "")}T`;
  }

  if (absValue >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  }

  if (absValue >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }

  if (absValue >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return value.toString();
}

export const pluralize = (count: number, word: string) => {
  const plural = count === 1 ? word : `${word}s`
  return `${plural}`;
}

export const toPercentage = (numerator: number, denominator: number) => `${((numerator / denominator) * 100).toFixed(0)}%`;

export function useOnlineChecker() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}