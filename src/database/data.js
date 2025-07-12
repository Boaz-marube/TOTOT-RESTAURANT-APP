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
import img11 from "@/assets/Vegetarian/kik-alicha.jpg";
import mainDish1 from "@/assets/main-dish1.png";
import mainDish2 from "@/assets/main-dish2.png";
import mainDish3 from "@/assets/main-dish3.png";
import mainDish4 from "@/assets/mainDish4.png";
import mainDish6 from "@/assets/dulet.jpg";
import mainDish7 from "@/assets/mainDish7.png";
import mainDish8 from "@/assets/mainDish8.png";
import mainDish9 from "@/assets/mainDish6.png";

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
  {
    id: 11,
    name: "kik alicha",
    description: "Fasting food",
    catagory: "veg",
    price: "$12",
    images: img11,
  },
];
export const drinks = [
  {
    id: 1,
    name: "Totot Kitfo",
    description: "Classic kitfo with cabbage",
    catagory: "non-veg",
    price: " $15",
    images: img1,
    featured: true,
  },
];
export const desserts = [
  {
    id: 1,
    name: "Totot Kitfo",
    description: "Classic kitfo with cabbage",
    catagory: "non-veg",
    price: " $15",
    images: img1,
    featured: true,
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
