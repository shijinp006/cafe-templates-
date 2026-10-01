// Ingredient options for the "Build Your Own" page.
// `id` also picks the illustration in components/BuildGraphics.jsx.
export const PRODUCTS = [
  {
    id: "burger",
    label: "Burger",
    title: "Custom Burger",
    blurb: "Stack it your way, bun to bun.",
    steps: [
      {
        id: "bun",
        title: "Choose your bun",
        mode: "single",
        options: [
          { id: "brioche", label: "Brioche", price: 5, color: "#F5B85C" },
          { id: "sesame", label: "Sesame", price: 4, color: "#F0A94A" },
          { id: "wheat", label: "Whole Wheat", price: 5, color: "#C8914F" },
          { id: "charcoal", label: "Charcoal", price: 6, color: "#3A3A3F" },
        ],
      },
      {
        id: "patty",
        title: "Pick your patty",
        mode: "single",
        options: [
          { id: "beef", label: "Flame-Grilled Beef", price: 12, color: "#5E3B27" },
          { id: "double", label: "Double Beef", price: 20, color: "#5E3B27", count: 2 },
          { id: "chicken", label: "Crispy Chicken", price: 10, color: "#D9A05B" },
          { id: "plant", label: "Plant-Based", price: 11, color: "#7A8F3E" },
        ],
      },
      {
        id: "cheese",
        title: "Add cheese",
        mode: "multi",
        options: [
          { id: "cheddar", label: "Aged Cheddar", price: 2, color: "#FFC83D" },
          { id: "swiss", label: "Swiss", price: 2.5, color: "#FFE9A8" },
          { id: "pepper", label: "Pepper Jack", price: 2.5, color: "#FFB84D" },
          { id: "vegan", label: "Vegan Cheese", price: 3, color: "#F4D6A0" },
        ],
      },
      {
        id: "veggies",
        title: "Fresh toppings",
        mode: "multi",
        options: [
          { id: "lettuce", label: "Lettuce", price: 1, color: "#8DB52F" },
          { id: "tomato", label: "Tomato", price: 1, color: "#D9482B" },
          { id: "onion", label: "Red Onion", price: 1, color: "#C97AA0" },
          { id: "pickles", label: "Pickles", price: 1, color: "#6E8B3D" },
          { id: "jalapeno", label: "Jalapeños", price: 1.5, color: "#4F7A28" },
          { id: "avocado", label: "Avocado", price: 3, color: "#A8C66C" },
        ],
      },
      {
        id: "sauces",
        title: "Sauces",
        mode: "multi",
        options: [
          { id: "ember", label: "Ember Sauce", price: 1, color: "#E76F51" },
          { id: "garlic", label: "Garlic Mayo", price: 1, color: "#FFF3E6" },
          { id: "bbq", label: "Smoky BBQ", price: 1, color: "#7A3B2A" },
          { id: "hot", label: "Hot Chili", price: 1, color: "#C0392B" },
        ],
      },
      {
        id: "extras",
        title: "Extras",
        mode: "multi",
        options: [
          { id: "bacon", label: "Crispy Bacon", price: 4, color: "#B5483A" },
          { id: "egg", label: "Fried Egg", price: 3, color: "#FFF8EC" },
          { id: "rings", label: "Onion Rings", price: 3, color: "#E0A25A" },
        ],
      },
    ],
    initial: {
      bun: "brioche",
      patty: "beef",
      cheese: ["cheddar"],
      veggies: ["lettuce", "tomato"],
      sauces: [],
      extras: [],
    },
  },
  {
    id: "pizza",
    label: "Pizza",
    title: "Custom Pizza",
    blurb: "Dough, sauce, cheese and every topping you love.",
    steps: [
      {
        id: "size",
        title: "Pick a size",
        mode: "single",
        options: [
          { id: "sz-s", label: "Small · 8\"", price: 25, color: "#E2A85F" },
          { id: "sz-m", label: "Medium · 12\"", price: 35, color: "#E2A85F" },
          { id: "sz-l", label: "Large · 16\"", price: 45, color: "#E2A85F" },
        ],
      },
      {
        id: "crust",
        title: "Choose your crust",
        mode: "single",
        options: [
          { id: "thin", label: "Thin & Crispy", price: 0, color: "#E8B26A" },
          { id: "thick", label: "Hand-Tossed", price: 3, color: "#D9953F" },
          { id: "stuffed", label: "Cheese-Stuffed", price: 6, color: "#E8B060" },
        ],
      },
      {
        id: "sauce",
        title: "Base sauce",
        mode: "single",
        options: [
          { id: "pz-tomato", label: "Tomato Basil", price: 0, color: "#D9482B" },
          { id: "pz-white", label: "Garlic White", price: 1, color: "#FFF3E6" },
          { id: "pz-bbq", label: "Smoky BBQ", price: 1, color: "#7A3B2A" },
        ],
      },
      {
        id: "cheese",
        title: "Cheese",
        mode: "multi",
        options: [
          { id: "mozzarella", label: "Mozzarella", price: 4, color: "#FFF1C9" },
          { id: "cheddar", label: "Cheddar", price: 3, color: "#FFC83D" },
          { id: "parmesan", label: "Parmesan", price: 3, color: "#F6E3A8" },
          { id: "vegan", label: "Vegan Cheese", price: 4, color: "#F4D6A0" },
        ],
      },
      {
        id: "toppings",
        title: "Toppings",
        mode: "multi",
        options: [
          { id: "pepperoni", label: "Pepperoni", price: 4, color: "#B8352A" },
          { id: "mushroom", label: "Mushrooms", price: 3, color: "#D9C2A0" },
          { id: "olives", label: "Black Olives", price: 3, color: "#2F2F35" },
          { id: "peppers", label: "Green Peppers", price: 3, color: "#4FA03A" },
          { id: "onion", label: "Red Onion", price: 2, color: "#C97AA0" },
          { id: "corn", label: "Sweet Corn", price: 2, color: "#F2C94C" },
          { id: "pineapple", label: "Pineapple", price: 3, color: "#F6D55C" },
          { id: "basil", label: "Fresh Basil", price: 2, color: "#3F8F3A" },
          { id: "jalapeno", label: "Jalapeños", price: 3, color: "#4F7A28" },
        ],
      },
    ],
    initial: {
      size: "sz-m",
      crust: "thick",
      sauce: "pz-tomato",
      cheese: ["mozzarella"],
      toppings: ["pepperoni"],
    },
  },
  {
    id: "salad",
    label: "Salad",
    title: "Custom Salad Bowl",
    blurb: "Fresh greens, protein, crunch and a dressing.",
    steps: [
      {
        id: "base",
        title: "Pick your greens",
        mode: "single",
        options: [
          { id: "romaine", label: "Romaine", price: 6, color: "#8DB52F" },
          { id: "spinach", label: "Baby Spinach", price: 6, color: "#3F7A2E" },
          { id: "mixed", label: "Mixed Leaves", price: 7, color: "#A8C66C" },
        ],
      },
      {
        id: "protein",
        title: "Add protein",
        mode: "single",
        options: [
          { id: "grilled", label: "Grilled Chicken", price: 10, color: "#D9A05B" },
          { id: "falafel", label: "Falafel", price: 8, color: "#A9792F" },
          { id: "tofu", label: "Crispy Tofu", price: 7, color: "#F2DFB4" },
          { id: "egg", label: "Boiled Egg", price: 4, color: "#FFF8EC" },
        ],
      },
      {
        id: "toppings",
        title: "Toppings",
        mode: "multi",
        options: [
          { id: "cucumber", label: "Cucumber", price: 1, color: "#9BCB6B" },
          { id: "tomato", label: "Cherry Tomato", price: 1.5, color: "#D9482B" },
          { id: "corn", label: "Sweet Corn", price: 1.5, color: "#F2C94C" },
          { id: "olives", label: "Black Olives", price: 2, color: "#2F2F35" },
          { id: "avocado", label: "Avocado", price: 3, color: "#A8C66C" },
          { id: "croutons", label: "Croutons", price: 1.5, color: "#E0A25A" },
        ],
      },
      {
        id: "dressing",
        title: "Dressing",
        mode: "single",
        options: [
          { id: "sd-caesar", label: "Caesar", price: 1, color: "#FFF3D6" },
          { id: "sd-vinai", label: "Balsamic", price: 1, color: "#8A4B2A" },
          { id: "sd-ranch", label: "Ranch", price: 1, color: "#FFFDF9" },
        ],
      },
    ],
    initial: {
      base: "romaine",
      protein: "grilled",
      toppings: ["cucumber", "tomato"],
      dressing: "sd-caesar",
    },
  },
];
