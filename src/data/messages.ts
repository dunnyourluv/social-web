export interface Attachment {}

export interface Message {
    messageID: string;
    senderID: string;
    receiverID: string;
    message: string;
    timestamp: number;
    attachment: Attachment[];
}

const messages: Message[] = [
    {
        messageID: "mid." + Math.random(),
        message: "Hello there!",
        attachment:[],
        senderID: "1",
        receiverID: "2",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "Hello there! How are you",
        attachment:[],
        senderID: "1",
        receiverID: "2",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "Hello I'm fine thank you!",
        attachment:[],
        senderID: "1",
        receiverID: "3",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "How are you today?",
        attachment:[],
        senderID: "3",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "I want to know something about you",
        attachment:[],
        senderID: "3",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "Do you mind?",
        attachment:[],
        senderID: "3",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "You are welcome! Let's talk about it!",
        attachment:[],
        senderID: "1",
        receiverID: "3",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "What is your name?",
        attachment:[],
        senderID: "3",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "My name is Dung",
        attachment:[],
        senderID: "1",
        receiverID: "3",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "Where are your from?",
        attachment:[],
        senderID: "3",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "I'm from VietNam",
        attachment:[],
        senderID: "1",
        receiverID: "3",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "What is your job?",
        attachment:[],
        senderID: "3",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "I'm a student",   
        attachment:[],
        senderID: "1",
        receiverID: "3",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "What is your major?",
        attachment:[],
        senderID: "3",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "I'm studying Computer Science",
        attachment:[],
        senderID: "1",
        receiverID: "3",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "What is your hobby?",
        attachment:[],
        senderID: "3",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "I love you ❤️",
        attachment:[],
        senderID: "2",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "Do you love me?",
        attachment:[],
        senderID: "2",
        receiverID: "1",
        timestamp: Date.now()
    },
    {
        messageID: "mid." + Math.random(),
        message: "Will you marry me?🥹",
        attachment:[],
        senderID: "2",
        receiverID: "1",
        timestamp: Date.now()
    },
    
];

export {messages}