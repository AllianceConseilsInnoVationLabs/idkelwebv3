import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMillier(montant: number) {
  return montant.toLocaleString("fr-FR", {
    style: "currency",
    currency: "XOF",
  })
}

export function formatTel(tel: string) {
  tel = tel.replace("+225", "");
  return tel.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "+225 $1 $2 $3 $4 $5")
}

export function getInitials(name: string) {
  var matches = name.match(/\b(\w)/g); // ['J','S','O','N']
  var acronym = matches && matches.length > 1 ? matches[0] + matches[1] : matches ? matches[0] : ""; // JSON

  return acronym.toUpperCase();
}

