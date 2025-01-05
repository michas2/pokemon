import type { Recipes } from "../data/recipes";

const order: string[] =  [
  "Large Leek",
  "Tasty Mushroom",
  "Fancy Egg",
  "Soft Potato",
  "Fancy Apple",
  "Fiery Herb",
  "Bean Sausage",
  "Moomoo Milk",
  "Honey",
  "Pure Oil",
  "Warming Ginger",
  "Snoozy Tomato",
  "Soothing Cacao",
  "Slowpoke Tail",
  "Greengrass Soybeans",
  "Greengrass Corn",
  "Rousing Coffee"
];

export function getAllIngredients(recipes: Recipes): string[] {
  const ingredients = new Set<string>();
  
    Object.values(recipes).forEach(recipe => {
      Object.keys(recipe).forEach(ingredient => {
        ingredients.add(ingredient);
      });
    });
  
  return Array.from(ingredients).sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);

    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });
}

export function getTotalIngredients(recipe: Record<string, number>): number {
  return Object.values(recipe).reduce((sum, amount) => sum + amount, 0);
}