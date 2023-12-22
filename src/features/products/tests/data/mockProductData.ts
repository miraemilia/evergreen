import { mockCategories } from "../../../categories/tests/data/mockCategoryData";
import { Product } from "../../types/Product";

export const mockProductData : Product[] = [
    {
    id: "1",
    title: "ZZ Plant",
    latinName: "Zamioculcas zamiifolia",
    price: 24.99,
    description: "Drought-tolerant tropical houseplant with glossy, dark green foliage, ideal for beginners.",
    category: mockCategories[0],
    productImages: [
      {
        id: "20d13d2d-7a32-42e5-9eb8-7b5899974d76",
        imageUrl: "https://source.unsplash.com/a-potted-plant-sitting-on-top-of-a-table-0KG5ca7_RCo"
      }
    ],
    productDetails: {
      size: "Large",
      watering: "Medium",
      light: "Medium",
      difficulty: "High",
      hanging: true,
      nonToxic: false,
      airPurifying: false
    },
    inventory: 4
    },
    {
    id: "2",
    title: "Alocasia",
    latinName: "Alocasia spp.",
    price: 31.99,
    description: "Dramatic tropical houseplant with large, arrow-shaped leaves, adds a touch of drama to your home.",
    category: mockCategories[1],
    productImages: [
      {
        id: "453afde8-5ac9-4ec9-8b46-189d39a22ffe",
        imageUrl: "https://source.unsplash.com/potted-green-snake-plant-on-white-chair-GY6ViMxtmDE"
      }
    ],
    productDetails: {
      size: "Medium",
      watering: "Medium",
      light: "High",
      difficulty: "Low",
      hanging: false,
      nonToxic: false,
      airPurifying: false
    },
    inventory: 22
    },
    {
    id: "3",
    title: "Calathea",
    latinName: "Calathea spp.",
    price: 17.99,
    description: "Colorful and patterned tropical houseplant, perfect for adding vibrancy to your indoor space.",
    category: mockCategories[1],
    productImages: [
      {
        id: "30844ca5-5d8b-4b0f-a150-c75ac83d0d83",
        imageUrl: "https://source.unsplash.com/green-leaves-in-white-background-86DQhpMi2_8"
      }
    ],
    productDetails: {
      size: "Medium",
      watering: "Medium",
      light: "High",
      difficulty: "Low",
      hanging: false,
      nonToxic: false,
      airPurifying: false
    },
    inventory: 12
    },
    {
    id: "4",
    title: "Rubber Plant",
    latinName: "Ficus elastica",
    price: 26.99,
    description: "Sturdy and upright tropical houseplant with glossy, burgundy-hued leaves.",
    category: mockCategories[1],
    productImages: [
      {
        id: "4a424592-01c6-4e4a-a02f-772aa12418e5",
        imageUrl: "https://source.unsplash.com/potted-green-plant-beside-wall-DpphPG9ENsI"
      }
    ],
    productDetails: {
      size: "Medium",
      watering: "Medium",
      light: "Medium",
      difficulty: "Medium",
      hanging: true,
      nonToxic: true,
      airPurifying: true
    },
    "inventory": 11
    },
]