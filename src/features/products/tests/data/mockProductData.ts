import { mockCategories } from "../../../categories/tests/data/mockCategoryData";
import { Product } from "../../types/Product";

export const mockProductData : Product[] = [
    {
    id: "1",
    title: "Fantastic Concrete Sausages",
    price: 597,
    description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    productImages: [
    {
        id: "sugsegn",
        imageUrl: "https://picsum.photos/640/640?r=5668"
    },
    {
        id: "gnaueingauwe",
        imageUrl: "https://picsum.photos/640/640?r=9335"
    },
    {
        id: "t34th9gnuejge",
        imageUrl: "https://picsum.photos/640/640?r=3472"
    }
    ],
    category: mockCategories[0]
    },
    {
    id: "2",
    title: "Handcrafted Soft Computer",
    price: 1878,
    description: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    productImages: [
        {
            id: "w54t89htuij",
            imageUrl: "https://picsum.photos/640/640?r=7332"
        },
        {
            id: "w5yt98gjejg",
            imageUrl: "https://picsum.photos/640/640?r=9493"
        },
        {
            id: "q3thuifkjng",
            imageUrl: "https://picsum.photos/640/640?r=1246"
        }
    ],
    category: mockCategories[1]
    },
    {
    id: "3",
    title: "Handcrafted Frozen Keyboard",
    price: 48,
    description: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    productImages: [
        {
            id: "7hwt478h4etne",
            imageUrl: "https://picsum.photos/640/640?r=9921"
        },
        {
            id: "3498thundrjgd",
            imageUrl: "https://picsum.photos/640/640?r=5769"
        },
        {
            id: "q498tjurngkdjg",
            imageUrl: "https://picsum.photos/640/640?r=1370"
        }
    ],
    category: mockCategories[1]
    },
    {
    id: "4",
    title: "Oriental Cotton Hat",
    price: 951,
    description: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    productImages: [
        {
            id: "43tqh8h34ntgsg",
            imageUrl: "https://picsum.photos/640/640?r=6719"
        },
        {
            id: "q784thuhfidrngd",
            imageUrl: "https://picsum.photos/640/640?r=4678"
        },
        {
            id: "q3489thiufnfsgd",
            imageUrl: "https://picsum.photos/640/640?r=1442"
        }
    ],
    category: mockCategories[1]
    },
]