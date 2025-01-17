import { SiHappycow } from "react-icons/si";
import { GiWomanElfFace, GiTurtle, GiDinosaurRex } from "react-icons/gi";
import { LuDog, LuCat } from "react-icons/lu";
import { FaEarlybirds, FaRegSmile } from "react-icons/fa";
import { PiRabbit } from "react-icons/pi";
import { IoFish } from "react-icons/io5";

//getting specific react icon in a specific size
const getIcon = (IconComponent, size) => <IconComponent size={size} />;

export const avatars = [
  {
    url: "FaRegSmile",
    label: "Smiley",
    icon: (size) => getIcon(FaRegSmile, size),
  },
  {
    url: "SiHappycow",
    label: "Happy Cow",
    icon: (size) => getIcon(SiHappycow, size),
  },
  {
    url: "GiWomanElfFace",
    label: "Elf Face",
    icon: (size) => getIcon(GiWomanElfFace, size),
  },
  { url: "GiTurtle", label: "Turtle", icon: (size) => getIcon(GiTurtle, size) },
  { url: "LuDog", label: "Dog", icon: (size) => getIcon(LuDog, size) },
  { url: "LuCat", label: "Cat", icon: (size) => getIcon(LuCat, size) },
  {
    url: "GiDinosaurRex",
    label: "Dinosaur",
    icon: (size) => getIcon(GiDinosaurRex, size),
  },
  {
    url: "FaEarlybirds",
    label: "Bird",
    icon: (size) => getIcon(FaEarlybirds, size),
  },
  {
    url: "PiRabbit",
    label: "Rabbit",
    icon: (size) => getIcon(PiRabbit, size),
  },
  {
    url: "IoFish",
    label: "Fish",
    icon: (size) => getIcon(IoFish, size),
  },
];
