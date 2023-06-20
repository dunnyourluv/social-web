export interface CommentInfo {
    id: string;
    authorId: string;
    content: string;
    createdAt: Date;
    likes: string[];
}

export interface PostData {
    id: string;
    authorId: string;
    content?: string;
    createdAt: Date;
    likes: string[];
    comments: CommentInfo[];
    images?: string[];
}

export const posts: PostData[] = [
    {
        id: "1",
        authorId: "1",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
        images: [
            "https://picsum.photos/id/4/5000/3333",
            "https://picsum.photos/id/5/5000/3333",
            "https://picsum.photos/id/6/5000/3333",
            "https://picsum.photos/id/7/5000/3333"
        ],
        createdAt: new Date(),
        likes: ["2", "3"],
        comments: [
            {
                id: "1",
                authorId: "2",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
                createdAt: new Date(),
                likes: ["2", "3"],
            },
            {
                id: "2",
                authorId: "3",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
                createdAt: new Date(),
                likes: [],
            },
        ],
    },
    {
        id: "7",
        authorId: "1",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
        images: [
            "https://picsum.photos/id/8/5000/3333",
            "https://picsum.photos/id/9/5000/3333",
            "https://picsum.photos/id/10/5000/3333",
            "https://picsum.photos/id/11/5000/3333",
            "https://picsum.photos/id/12/5000/3333"
        ],
        createdAt: new Date(),
        likes: ["2", "3"],
        comments: [
            {
                id: "1",
                authorId: "2",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
                createdAt: new Date(),
                likes: ["2", "3"],
            },
            {
                id: "2",
                authorId: "3",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
                createdAt: new Date(),
                likes: [],
            },
        ],
    },
    {
        id: "2",
        authorId: "2",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
        createdAt: new Date(),
        likes: ["1", "3"],
        comments: [
            {
                id: "1",
                authorId: "1",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
                createdAt: new Date(),
                likes: ["2", "3"],
            },
        ],
    },
    {
        id: "3",
        authorId: "3",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
        createdAt: new Date(),
        likes: ["1", "2"],
        comments: [
            {
                id: "1",
                authorId: "1",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
                createdAt: new Date(),
                likes: ["2", "3"],
            },
        ],
    },
    {
        id: "4",
        authorId: "4",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
        images: ["https://picsum.photos/id/13/5000/3333"],
        createdAt: new Date(),
        likes: ["1", "2", "3"],
        comments: [
            {
                id: "1",
                authorId: "1",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc vi",
                createdAt: new Date(),
                likes: ["2", "3"],
            },
        ],
    },
];
