import type { Recipes } from "../data/recipes";

const order = [
  "Large Leek", "Tasty Mushroom", "Fancy Egg", "Soft Potato", "Fancy Apple",
  "Fiery Herb", "Bean Sausage", "Moomoo Milk", "Honey", "Pure Oil",
  "Warming Ginger", "Snoozy Tomato", "Soothing Cacao", "Slowpoke Tail",
  "Greengrass Soybeans", "Greengrass Corn", "Rousing Coffee",
  "Plump Pumpkin", "Glossy Avocado"
];

export function getAllIngredients(recipes: Recipes): string[] {
  const all = new Set(Object.values(recipes).flatMap(Object.keys));
  return [...all].sort((a, b) =>
    (order.indexOf(a) === -1 ? Infinity : order.indexOf(a)) -
    (order.indexOf(b) === -1 ? Infinity : order.indexOf(b))
  );
}

export function getTotalIngredients(recipe: Record<string, number>): number {
  return Object.values(recipe).reduce((sum, n) => sum + n, 0);
}
