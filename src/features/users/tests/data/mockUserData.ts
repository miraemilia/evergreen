import { User } from "../../types/User";

export const mockUserData : User[] = [
        {
        id: 1,
        email: "john@mail.com",
        name: "Jhon",
        role: "customer",
        avatar: "https://i.imgur.com/fpT4052.jpeg",
        creationAt: new Date("2023-09-28T21:17:43.000Z"),
        updatedAt: new Date("2023-09-28T21:17:43.000Z")
        },
        {
        id: 2,
        email: "maria@mail.com",
        name: "Maria",
        role: "customer",
        avatar: "https://i.imgur.com/uDpzwEk.jpeg",
        creationAt: new Date("2023-09-28T21:17:43.000Z"),
        updatedAt: new Date("2023-09-28T21:17:43.000Z")
        },
        {
        id: 3,
        email: "admin@mail.com",
        name: "Admin",
        role: "admin",
        avatar: "https://i.imgur.com/O1LUkwy.jpeg",
        creationAt: new Date("2023-09-28T21:17:43.000Z"),
        updatedAt: new Date("2023-09-28T21:17:43.000Z")
        },
]