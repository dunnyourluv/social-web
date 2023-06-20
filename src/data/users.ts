export interface UserInfo {
    id: string;
    name: string;
    username: string
    password: string;
    avatar: string;
    background?: string;
    role?: string;
}

export interface UserFullInfo {
    id: string
    studentAt?: string;
    livesIn?: string;
    maritalTo?: string;
    follower?: number;
}

export const users: UserInfo[] = [
    {
        id: "1",
        name: "John Doe",
        username: "johndoe",
        password: "123456",
        avatar: "https://i.pravatar.cc/300?img=1",
        background: "https://picsum.photos/id/0/5000/3333",
        role: "admin"
    },
    {
        id: "2",
        name: "Jane Doe",
        username: "janedoe",
        password: "123456",
        avatar: "https://i.pravatar.cc/300?img=2",
        background: "https://picsum.photos/id/1/5000/3333",
    },
    {
        id: "3",
        name: "John Smith",
        password: "123456",
        avatar: "https://i.pravatar.cc/300?img=3",
        background: "https://picsum.photos/id/2/5000/3333",
        username: "johnsmith"
    },
    {
        id: "4",
        name: "Jane Smith",
        password: "123456",
        avatar: "https://i.pravatar.cc/300?img=4",
        background: "https://picsum.photos/id/3/5000/3333",
        username: "janesmith"
    }
]

