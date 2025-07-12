import img1 from "@/assets/dulet.jpg";
import img2 from "@/assets/doro-wat-be-enjera.jpg";
import img3 from "@/assets/shekla-tibs.webp";
import img4 from "@/assets/Finta-fento.jpg";
import img5 from "@/assets/gomen-kitfo.jpg";
import img6 from "@/assets/tegabino.jpg";
import img7 from "@/assets/chicken-stew.jpg";
import img8 from "@/assets/cheese-kitfo.jpg";
import img9 from "@/assets/injera-platter.webp";
import img10 from "@/assets/Vegetarian/fosolia.jpg";

import mainDish1 from "@/assets/main-dish1.png";
import mainDish2 from "@/assets/main-dish2.png";
import mainDish3 from "@/assets/main-dish3.png";
import mainDish4 from "@/assets/mainDish4.png";
import mainDish6 from "@/assets/dulet.jpg";
import mainDish7 from "@/assets/mainDish7.png";
import mainDish8 from "@/assets/mainDish8.png";
import mainDish9 from "@/assets/mainDish6.png";
import Gomen from "@/assets/Starters/Gomen.jpg";
import Salad from "@/assets/Starters/Salad.png";
import starter1 from "@/assets/Starters/starter1.jpg";
import starter2 from "@/assets/Starters/starter2.jpg";
import starter4 from "@/assets/Starters/starter4.jpg";
import starter5 from "@/assets/Starters/starter5.jpg";
import coffee from "@/assets/Drinks/Coffee.jpg";
import Beso from "@/assets/Drinks/Beso.jpg";
import Wine from "@/assets/Drinks/Wine.jpg";
import Tela from "@/assets/Drinks/Tela.jpg";
import tej from "@/assets/Drinks/tej.jpg";
import keneto from "@/assets/Drinks/Keneto.jpg";
import dessert1 from "@/assets/desserts/dessert1.jpg";
import dessert2 from "@/assets/desserts/dessert2.jpg";
import dessert3 from "@/assets/desserts/dessert3.jpg";
import dessert4 from "@/assets/desserts/dessert4.jpg";
import dessert5 from "@/assets/desserts/dessert5.jpg";
import dessert6 from "@/assets/desserts/dessert6.jpg";
export const Dishs = [
  {
    id: 1,
    name: "Dulet",
    description: "Chopped Fried Beef",
    catagory: "non-veg",
    price: " $15",
    images: img1,
    featured: true,
  },
  {
    id: 2,
    name: "Totot Kitfo",
    description: " Classic raw meet with spaicy",
    catagory: "chef-special",
    price: " $18",
    images: mainDish8,
    featured: true,
  },
  {
    id: 3,
    name: "Shekla Tibs",
    description: "Spicy lamb stew",
    catagory: "non-veg",
    price: "$16",
    images: img3,
    featured: true,
  },
  {
    id: 4,
    name: "Cheese Kitfo",
    description: "Classic kitfo with ayib(cheese)",
    catagory: "non-veg",
    price: "$15",
    images: img4,
  },
  {
    id: 5,
    name: "Finta Finto",
    description: " Spicy kitfo sauce with cheese",
    catagory: "chef-special",
    price: "$40",
    images: img5,
  },
  {
    id: 6,
    name: "Tegabino",
    description: "Fasting stew(vegetarian)",
    catagory: "veg",
    price: "$23",
    images: img6,
  },
  {
    id: 7,
    name: "Doro wat",
    description: "Spicy Chicken stew",
    catagory: "chef-special",
    price: "$23",
    images: img7,
  },
  {
    id: 8,
    name: "Gomen Kitfo",
    description: "Classic kitfo with cabbage",
    catagory: "non-veg",
    price: "$14",
    images: img8,
  },
  {
    id: 9,
    name: "Injera Platter",
    description: "Fresh Vegetarian variety platter",
    catagory: "veg",
    price: "$18",
    images: img9,
  },
  {
    id: 10,
    name: "Fosolia",
    description: "Fresh Vegetarian and fasting ",
    catagory: "veg",
    price: "$22",
    images: img10,
  },
];
export const drinks = [
  {
    id: 1,
    name: "Buna-Coffee",
    description:
      "Traditional Ethiopian coffee brewed with care and served with love",
    price: " $10",
    images: coffee,
  },
  {
    id: 2,
    name: "Beso Shake",
    description: "A creamy and delicious shake made with roasted barley.",
    price: " $15",
    images: Beso,
  },
  {
    id: 3,
    name: "Tela",
    description: "A traditional Ethiopian beer made from barley and maize.",
    price: " $8",
    images: Tela,
  },
  {
    id: 4,
    name: "Wine",
    description: "A selection of fine Ethiopian wines",
    price: " $10",
    images: Wine,
  },
  {
    id: 5,
    name: "Keneto",
    description: "A refreshing drink made from barley and spices.",
    price: " $14",
    images: keneto,
  },
  {
    id: 6,
    name: "Tej",
    description: "Traditional honey wine, sweet and aromatic.",
    price: " $12",
    images: tej,
  },
];
export const desserts = [
  {
    id: 1,
    name: "Ergo Feres",
    description:
      "Fresh Ethiopian-style yogurt topped with mixed berries and a dash of honey.",
    price: " $15",
    images: dessert1,
  },
  {
    id: 2,
    name: "Totot Dessert",
    description: "Classic Savory ground beef seasoned with Ethiopian spices",
    price: " $15",
    images: dessert2,
  },
  {
    id: 3,
    name: "Totot Cake",
    description:
      "Creamy pumpkin cheesecake with a hint of cardamom and honey drizzle.",
    price: " $5",
    images: dessert3,
  },
  {
    id: 4,
    name: "Buna Be Dabo",
    description:
      "Freshly brewed Ethiopian coffee paired with spongy teff flour bread and fruit jam.",
    price: " $12",
    images: dessert4,
  },
  {
    id: 5,
    name: "Ye Buna Tena",
    description:
      "Classic Ethiopian coffee paired with a light honey-soaked cake.",
    price: " $12",
    images: dessert5,
  },
  {
    id: 6,
    name: "Ye Misto Kurkur",
    description:
      "A selection of traditional Ethiopian cookies and honey-drenched fritters.",
    price: " $13",
    images: dessert6,
  },
];
export const features = [
  {
    image: mainDish2,
    title: "Communal Dining",
    description:
      "Ethiopian cuisine is meant to be shared. Our main dishes are served on a large platter with injera bread, encouraging connection and conversation as everyone eats together.",
  },
  {
    image: mainDish3,
    title: "Authentic Spice Blends",
    description:
      "Our dishes feature handcrafted spice blends like berbere and mitmita, created using traditional methods to deliver the authentic flavors of Ethiopia in every bite.",
  },
  {
    image: mainDish1,
    title: "Traditional Preparation",
    description:
      "Each dish is prepared following time-honored techniques passed down through generations, ensuring an authentic taste experience that respects Ethiopian culinary heritage.",
  },
];
export const mainDish = [
  {
    id: 1,
    name: "Kitfo",
    description:
      "Minced raw beef seasoned with mitmita (spice blend) and niter kibbeh (clarified butter), served with cottage cheese and greens.",
    price: "$19.95",
    images: mainDish8,
  },
  {
    id: 2,
    name: "Key Wat",
    description:
      "Tender beef cubes simmered in a rich and spicy berbere sauce with aromatics, creating a flavorful stew that pairs perfectly with injera.",
    price: "$17.00",
    images: mainDish7,
  },
  {
    id: 3,
    name: "Doro Wat",
    description:
      "Ethiopia's national dish - spicy chicken stew simmered with berbere spice blend, served with hard-boiled eggs and injera bread.",
    price: "$20.95",
    images: img6,
  },
  {
    id: 4,
    name: "Dulet",
    description:
      "A hearty dish of minced tripe, liver, and lean beef sautéed with herbs, spices, and clarified butter for authentic flavor.",
    price: "$24",
    images: mainDish6,
  },
  {
    id: 5,
    name: "Gored Gored",
    description:
      "Cubes of raw beef marinated in awaze sauce and niter kibbeh, a delicacy for those who appreciate authentic Ethiopian cuisine.",
    price: "$15",
    images: mainDish4,
  },
  {
    id: 6,
    name: "Tibs",
    description:
      "Sautéed beef or lamb cubes with onions, jalapeños, and rosemary, cooked to perfection in a traditional Ethiopian style.",
    price: "$16",
    images: mainDish9,
  },
];
export const starter = [
  {
    id: 1,
    name: "Gomen",
    description: "Savory well prepared salad with Ethiopian touch.",
    price: "$19.95",
    images: Gomen,
  },
  {
    id: 2,
    name: "Salad Kitfo",
    description:
      "Ground vegetables mixed with fresh cabbage and traditional spices.",
    price: "$18",
    images: Salad,
  },
  {
    id: 3,
    name: "Totot Salad",
    description: "Savory ground beef seasoned with Ethiopian spices.",
    price: "$15",
    images: starter1,
  },
  {
    id: 4,
    name: "Gomen Soup",
    description:
      "Well made bone soup mixed with fresh dhania and traditional spices.",
    price: "$18",
    images: starter2,
  },
  {
    id: 5,
    name: "Shelie",
    description: "Finely chilled oyster seasoned with herbs.",
    price: "$20",
    images: starter5,
  },
  {
    id: 6,
    name: "Finta",
    description:
      "A spicy blend of spaghetti, garam sauce topped with melted cheese",
    price: "$22",
    images: starter4,
  },
];
