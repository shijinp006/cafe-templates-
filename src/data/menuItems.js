export const ALL_MENU_ITEMS = [
  {
    id: "ember-signature",
    name: "Ember Signature",
    price: "AED 12",
    category: "burgers",
    description: "Aged cheddar, hand-pressed grass-fed beef, toasted brioche, crisp lettuce and vine tomato.",
    image: "/images/about-burger.jpg",
  },
  {
    id: "double-flame",
    name: "Double Flame Smothered",
    price: "AED 15",
    category: "burgers",
    description: "Double grass-fed beef patty, melted cheddar drip, smoked bacon, signature ember aioli.",
    image: "/images/menu/double-burger.jpg",
  },
  {
    id: "crispy-chicken",
    name: "Crispy Buttermilk Chicken",
    price: "AED 13",
    category: "burgers",
    description: "Golden buttermilk fried chicken, house spicy coleslaw, kosher dill pickles, toasted brioche.",
    image: "/images/menu/chicken-burger.jpg",
  },
  {
    id: "smoky-bacon-bbq",
    name: "Smoky Bacon BBQ Burger",
    price: "AED 14",
    category: "burgers",
    description: "Applewood bacon, sharp cheddar, crispy onion straws, hickory barbecue glaze.",
    image: "/images/menu/bacon-bbq-burger.jpg",
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    price: "AED 7",
    category: "sides",
    description: "Hand-cut fries, melted cheddar, crispy bacon, smoked chili aioli.",
    image: "/images/menu/loaded-fries.jpg",
  },
  {
    id: "onion-rings",
    name: "Beer-Battered Onion Rings",
    price: "AED 6",
    category: "sides",
    description: "Crispy beer-battered Vidalia onion rings served with house garlic aioli dipping sauce.",
    image: "/images/menu/onion-rings.jpg",
  },
  {
    id: "ember-salad",
    name: "Ember Salad",
    price: "AED 9",
    category: "sides",
    description: "Charred romaine, cherry tomato, shaved parmesan, citrus vinaigrette.",
    image: "/images/menu/ember-salad.jpg",
  },
  {
    id: "chili-tots",
    name: "Smoked Chili Cheese Tots",
    price: "AED 8",
    category: "sides",
    description: "Golden tater tots smothered in house ember chili, melted cheddar, and green onions.",
    image: "/images/menu/chili-tots.jpg",
  },
  {
    id: "charcoal-shake",
    name: "Charcoal Shake",
    price: "AED 6",
    category: "drinks",
    description: "Activated-charcoal vanilla shake, whipped cream, toasted marshmallow.",
    image: "/images/menu/charcoal-shake.jpg",
  },
  {
    id: "chocolate-heaven",
    name: "Decadent Chocolate Shake",
    price: "AED 7",
    category: "drinks",
    description: "Triple fudge chocolate milkshake topped with fresh whipped cream and cocoa drizzle.",
    image: "/images/menu/chocolate-shake.jpg",
  },
  {
    id: "sweet-tea",
    name: "Sweet Tea",
    price: "AED 4",
    category: "drinks",
    description: "House-brewed black tea, lightly sweetened, served over crushed ice.",
    image: "/images/menu/sweet-tea.jpg",
  },
  {
    id: "craft-ginger-beer",
    name: "Spicy Craft Ginger Beer",
    price: "AED 5",
    category: "drinks",
    description: "Artisanal spicy ginger beer brewed with fresh ginger root and fresh lime.",
    image: "/images/menu/ginger-beer.jpg",
  },
  {
    id: "molten-cookie",
    name: "Warm Molten Skillet Cookie",
    price: "AED 8",
    category: "desserts",
    description: "Cast-iron skillet chocolate chip cookie served warm with vanilla bean ice cream and fudge.",
    image: "/images/menu/molten-cookie.jpg",
  },
  {
    id: "marshmallow-slink",
    name: "S'mores Sundae Shake",
    price: "AED 7",
    category: "desserts",
    description: "Toasted marshmallow vanilla shake layered with graham cracker crumble and dark chocolate.",
    image: "/images/menu/smores-shake.jpg",
  },
];

export function getMenuItemById(id) {
  return ALL_MENU_ITEMS.find((item) => item.id === id);
}

export function priceToNumber(price) {
  return parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
}
