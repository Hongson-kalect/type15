import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToId = (id: string, offset: number = 24) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function scrollTo(
  target: string,
  scrollContainer: string = "html",
  offset: number = 0
) {
  const container = document.querySelector(scrollContainer) as HTMLElement;
  const element = document.querySelector(target) as HTMLElement;

  console.log("container", container);
  console.log("element", element);

  if (!container || !element) return;
  container.scrollTo({
    top: element.offsetTop - container.offsetTop - offset,
    behavior: "smooth",
  });
}

export function relativeDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else if (weeks < 4) {
    return `${weeks}w ago`;
  } else if (months < 12) {
    return `${months}m ago`;
  } else {
    return `${years}y ago`;
  }
}

// Example usage
const date = new Date();
date.setDate(date.getDate() - 400);
console.log(relativeDate(date));
