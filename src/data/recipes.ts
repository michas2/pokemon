export interface Ingredients {
    [key: string]: number;
  }
  
  export interface Recipes {
    [key: string]: Ingredients;
  }
  
  export interface Book {
    [key: string]: Recipes;
  }
  
  export const book: Book = {
    "Curry": {
      "Fancy Apple Curry": {
        "Fancy Apple": 7
      },
      "Grilled Tail Curry": {
        "Slowpoke Tail": 8,
        "Fiery Herb": 25
      },
      "Solar Power Tomato Curry": {
        "Snoozy Tomato": 10,
        "Fiery Herb": 5
      },
      "Dream Eater Butter Curry": {
        "Soft Potato": 18,
        "Snoozy Tomato": 15,
        "Soothing Cacao": 12,
        "Moomoo Milk": 10
      },
      "Spicy Leek Curry": {
        "Large Leek": 14,
        "Warming Ginger": 10,
        "Fiery Herb": 8
      },
      "Spore Mushroom Curry": {
        "Tasty Mushroom": 14,
        "Soft Potato": 9
      },
      "Egg Bomb Curry": {
        "Honey": 12,
        "Fancy Apple": 11,
        "Fancy Egg": 8,
        "Soft Potato": 4
      },
      "Hearty Cheeseburger Curry": {
        "Moomoo Milk": 8,
        "Bean Sausage": 8
      },
      "Soft Potato Chowder": {
        "Moomoo Milk": 10,
        "Soft Potato": 8,
        "Tasty Mushroom": 4
      },
      "Simple Chowder": {
        "Moomoo Milk": 7
      },
      "Beanburger Curry": {
        "Bean Sausage": 7
      },
      "Mild Honey Curry": {
        "Honey": 7
      },
      "Ninja Curry": {
        "Greengrass Soybeans": 24,
        "Bean Sausage": 9,
        "Large Leek": 12,
        "Tasty Mushroom": 5
      },
      "Drought Katsu Curry": {
        "Bean Sausage": 10,
        "Pure Oil": 5
      },
      "Melty Omelette Curry": {
        "Fancy Egg": 10,
        "Snoozy Tomato": 6
      },
      "Bulk Up Bean Curry": {
        "Greengrass Soybeans": 12,
        "Bean Sausage": 6,
        "Fiery Herb": 4,
        "Fancy Egg": 4
      },
      "Limber Corn Stew": {
        "Greengrass Corn": 14,
        "Moomoo Milk": 8,
        "Soft Potato": 8
      },
      "Inferno Corn Keema Curry": {
        "Fiery Herb": 27,
        "Bean Sausage": 24,
        "Greengrass Corn": 14,
        "Warming Ginger": 12
      },
      "Dizzy Punch Spicy Curry": {
        "Rousing Coffee": 11,
        "Fiery Herb": 11,
        "Honey": 11
      },
      "Hidden Power Perk-Up Stew": {
        "Greengrass Soybeans": 28,
        "Snoozy Tomato": 25,
        "Tasty Mushroom": 23,
        "Rousing Coffee": 16
      },
      "Cut Sukiyaki Curry": {
        "Large Leek": 27,
        "Bean Sausage": 26,
        "Honey": 26,
        "Fancy Egg": 22
      },
      "Role Play Pumpkaboo Stew": {
        "Plump Pumpkin": 10,
        "Bean Sausage": 16,
        "Soft Potato": 18,
        "Tasty Mushroom": 25
      },
      "Overgrow Avocado Gratin": {
        "Glossy Avocado": 22,
        "Soft Potato": 20,
        "Moomoo Milk": 41,
        "Pure Oil": 32,
      }
    },
      
    "Salads": {
      "Slowpoke Tail Pepper Salad": {
        "Slowpoke Tail": 10,
        "Fiery Herb": 10,
        "Pure Oil": 15
      },
      "Spore Mushroom Salad": {
        "Tasty Mushroom": 17,
        "Snoozy Tomato": 8,
        "Pure Oil": 8
      },
      "Snow Cloak Caesar Salad": {
        "Moomoo Milk": 10,
        "Bean Sausage": 6
      },
      "Gluttony Potato Salad": {
        "Soft Potato": 14,
        "Fancy Egg": 9,
        "Bean Sausage": 7,
        "Fancy Apple": 6
      },
      "Water Veil Tofu Salad": {
        "Greengrass Soybeans": 15,
        "Snoozy Tomato": 9
      },
      "Superpower Extreme Salad": {
        "Bean Sausage": 9,
        "Warming Ginger": 6,
        "Fancy Egg": 5,
        "Soft Potato": 3
      },
      "Bean Ham Salad": {
        "Bean Sausage": 8
      },
      "Snoozy Tomato Salad": {
        "Snoozy Tomato": 8
      },
      "Moomoo Caprese Salad": {
        "Moomoo Milk": 12,
        "Snoozy Tomato": 6,
        "Pure Oil": 5
      },
      "Contrary Chocolate Meat Salad": {
        "Soothing Cacao": 14,
        "Bean Sausage": 9
      },
      "Overheat Ginger Salad": {
        "Fiery Herb": 17,
        "Warming Ginger": 10,
        "Snoozy Tomato": 8
      },
      "Fancy Apple Salad": {
        "Fancy Apple": 8
      },
      "Immunity Leek Salad": {
        "Large Leek": 10,
        "Warming Ginger": 5
      },
      "Dazzling Apple Cheese Salad": {
        "Fancy Apple": 15,
        "Moomoo Milk": 5,
        "Pure Oil": 3
      },
      "Ninja Salad": {
        "Large Leek": 15,
        "Greengrass Soybeans": 19,
        "Tasty Mushroom": 12,
        "Warming Ginger": 11
      },
      "Heat Wave Tofu Salad": {
        "Greengrass Soybeans": 10,
        "Fiery Herb": 6
      },
      "Greengrass Salad": {
        "Pure Oil": 22,
        "Greengrass Corn": 17,
        "Snoozy Tomato": 14,
        "Soft Potato": 9
      },
      "Calm Mind Fruit Salad": {
        "Fancy Apple": 21,
        "Honey": 16,
        "Greengrass Corn": 12
      },
      "Fury Attack Corn Salad": {
        "Greengrass Corn": 9,
        "Pure Oil": 8
      },
      "Cross Chop Salad": {
        "Fancy Egg": 20,
        "Bean Sausage": 15,
        "Greengrass Corn": 11,
        "Snoozy Tomato": 10
      },
      "Defiant Coffee-Dressed Salad": {
        "Rousing Coffee": 28,
        "Bean Sausage": 28,
        "Pure Oil": 22,
        "Soft Potato": 22
      },
      "Petal Blizzard Layered Salad": {
        "Fancy Egg": 25,
        "Pure Oil": 17,
        "Soft Potato": 15,
        "Bean Sausage": 12
      },
      "Apple Acid Yogurt-Dressed Salad": {
        "Fancy Egg": 35,
        "Fancy Apple": 28,
        "Snoozy Tomato": 23,
        "Moomoo Milk": 18
      },
      "Luscious Avocado Salad": {
        "Glossy Avocado": 14,
        "Greengrass Soybeans": 18,
        "Pure Oil": 10
      },
      "Bulldoze Guacamole and Chips": {
        "Glossy Avocado": 28,
        "Greengrass Corn": 25,
        "Fiery Herb": 30,
        "Greengrass Soybeans": 22
      }
    },
          
    "Desserts": {
      "Fluffy Sweet Potatoes": {
        "Soft Potato": 9,
        "Moomoo Milk": 5
      },
      "Steadfast Ginger Cookies": {
        "Honey": 14,
        "Warming Ginger": 12,
        "Soothing Cacao": 5,
        "Fancy Egg": 4
      },
      "Fancy Apple Juice": {
        "Fancy Apple": 8
      },
      "Craft Soda Pop": {
        "Honey": 9
      },
      "Ember Ginger Tea": {
        "Warming Ginger": 9,
        "Fancy Apple": 7
      },
      "Jigglypuff's Fruity Flan": {
        "Honey": 20,
        "Fancy Egg": 15,
        "Moomoo Milk": 10,
        "Fancy Apple": 10
      },
      "Lovely Kiss Smoothie": {
        "Fancy Apple": 11,
        "Moomoo Milk": 9,
        "Honey": 7,
        "Soothing Cacao": 8
      },
      "Lucky Chant Apple Pie": {
        "Fancy Apple": 12,
        "Moomoo Milk": 4
      },
      "Neroli's Restorative Tea": {
        "Warming Ginger": 11,
        "Fancy Apple": 15,
        "Tasty Mushroom": 9
      },
      "Sweet Scent Chocolate Cake": {
        "Honey": 9,
        "Soothing Cacao": 8,
        "Moomoo Milk": 7
      },
      "Warm Moomoo Milk": {
        "Moomoo Milk": 7
      },
      "Cloud Nine Soy Cake": {
        "Fancy Egg": 8,
        "Greengrass Soybeans": 7
      },
      "Hustle Protein Smoothie": {
        "Greengrass Soybeans": 15,
        "Soothing Cacao": 8
      },
      "Stalwart Vegetable Juice": {
        "Snoozy Tomato": 9,
        "Fancy Apple": 7
      },
      "Big Malasada": {
        "Pure Oil": 10,
        "Moomoo Milk": 7,
        "Honey": 6
      },
      "Huge Power Soy Donuts": {
        "Pure Oil": 12,
        "Greengrass Soybeans": 16,
        "Soothing Cacao": 7
      },
      "Explosion Popcorn": {
        "Greengrass Corn": 15,
        "Pure Oil": 14,
        "Moomoo Milk": 7
      },
      "Teatime Corn Scones": {
        "Fancy Apple": 20,
        "Warming Ginger": 20,
        "Greengrass Corn": 18,
        "Moomoo Milk": 9
      },
      "Petal Dance Chocolate Tart": {
        "Fancy Apple": 11,
        "Soothing Cacao": 11
      },
      "Flower Gift Macarons": {
        "Soothing Cacao": 25,
        "Fancy Egg": 25,
        "Honey": 17,
        "Moomoo Milk": 10
      },
      "Early Bird Coffee Jelly": {
        "Rousing Coffee": 16,
        "Moomoo Milk": 14,
        "Honey": 12
      },
      "Zing Zap Spiced Cola": {
        "Fancy Apple": 35,
        "Warming Ginger": 20,
        "Large Leek": 20,
        "Rousing Coffee": 12
      },
      "Clodsire Eclair": {
        "Soothing Cacao": 30,
        "Moomoo Milk": 26,
        "Rousing Coffee": 24,
        "Honey": 22
      },
      "Mold Breaker Corn Tiramisu": {
        "Rousing Coffee": 14,
        "Greengrass Corn": 14,
        "Moomoo Milk": 12
      },
      "Scary Face Pancakes": {
        "Plump Pumpkin": 18,
        "Fancy Egg": 24,
        "Honey": 32,
        "Snoozy Tomato": 29
      },
      "Leaf Tornado Smoothie": {
        "Glossy Avocado": 18,
        "Snoozy Tomato": 16,
        "Moomoo Milk": 14
      }
    }
  }
  export default book;
