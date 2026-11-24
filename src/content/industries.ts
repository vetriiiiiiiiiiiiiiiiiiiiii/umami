import type { ImageKey } from "./images";

export const industries: { name: string; note: string; image: ImageKey; size: "lg" | "md" | "sm" }[] = [
  { name: "Functional foods", note: "Ingredients with a purpose, formulated to stay palatable and compliant.", image: "honey", size: "lg" },
  { name: "Nutraceuticals", note: "Classification, dosage formats and claims handled with care.", image: "capsules", size: "sm" },
  { name: "Beverages", note: "RTD, powdered and functional drinks — stability is everything.", image: "lemonade", size: "md" },
  { name: "Millets & grains", note: "Ancient grains in modern formats, from flours to extruded snacks.", image: "wheat", size: "md" },
  { name: "Bakery", note: "Doughs, shelf life and line efficiency at commercial scale.", image: "bread", size: "sm" },
  { name: "Dairy", note: "Milk-based products and the cold chains they depend on.", image: "milk", size: "md" },
  { name: "Plant-based foods", note: "Protein, texture and taste without the animal inputs.", image: "grainBowl", size: "lg" },
  { name: "Snacks", note: "Crunch, seasoning and packs that keep it fresh.", image: "chips", size: "sm" },
  { name: "Sauces & condiments", note: "Viscosity, acidity and preservation for ambient shelves.", image: "sauce", size: "md" },
  { name: "Frozen foods", note: "Formulations that survive freezing, transport and reheating.", image: "coldShelf", size: "sm" },
  { name: "Ready-to-eat", note: "Convenience formats with process and safety designed in.", image: "samosa", size: "md" },
  { name: "Sports nutrition", note: "Protein and performance products with substantiated claims.", image: "granola", size: "sm" },
  { name: "Infant & clinical nutrition", note: "Highly regulated categories that demand precision.", image: "labGlass", size: "md" },
  { name: "Pet food", note: "Nutrition, palatability and safety for a growing category.", image: "petfood", size: "sm" },
];
