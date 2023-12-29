import { User } from "../../types/User";
import { UserRole } from "../../types/UserRole";

export const mockUserData : User[] = [
        {
        id: "1",
        email: "john@mail.com",
        name: "Jhon",
        role: UserRole.Customer,
        avatar: "https://i.imgur.com/fpT4052.jpeg"
        },
        {
        id: "2",
        email: "maria@mail.com",
        name: "Maria",
        role: UserRole.Customer,
        avatar: "https://i.imgur.com/uDpzwEk.jpeg"
        },
        {
        id: "3",
        email: "admin@mail.com",
        name: "Admin",
        role: UserRole.Admin,
        avatar: "https://i.imgur.com/O1LUkwy.jpeg"
        },
]