import { createContext, useContext, useEffect, useState } from "react";
import ComposeCard from "../../components/card/ComposeCard";
import PostCard from "../../components/card/PostCard";
import FriendSuggest from "../../components/card/FriendSuggest";
import WeatherCard from "../../components/card/WeatherCard";
import LastActiveCard from "../../components/card/LastActiveCard";
import usePost from "../../hooks/usePost";
import { PostData } from "../../data/posts";
import useAuth from "../../hooks/useAuth";

const FeedContext = createContext({});

function FeedLeftContent() {
    return (
        <div className="hidden md:w-3/12 md:block md:mr-3">
            <FriendSuggest />
            <LastActiveCard />
        </div>
    );
}

function FeedRightContent() {
    return (
        <div className="hidden md:w-3/12 md:block md:ml-3">
            <WeatherCard />
            <FriendSuggest />
        </div>
    );
}

function FeedMainContent() {
    const { getAllPosts } = usePost();
    const { getUser } = useAuth();
    const [posts, setPosts] = useState<PostData[]>([]);
    useEffect(() => {
        setPosts(getAllPosts());
    }, [])
    return (
        <div className="md:w-6/12">
            <ComposeCard onPublish={(content) => {
                const user = getUser();
                const post: PostData = {
                    authorId: user?.id || "",
                    comments: [],
                    createdAt: new Date(),
                    id: Math.random().toString(36).substr(2, 9),
                    likes: [],
                    content: content,
                }  
                setPosts([post, ...posts]);
            }} />
            <ul>
                {posts.map((post, index) => {
                    return (
                        <li className="my-4" key={index}>
                            <PostCard post={post} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function Feed() {
    useEffect(() => {
        document.title = "Solve4X | Feed";
    }, []);
    return (
        <div className={"mt-3 p-3 flex"}>
            <FeedLeftContent />
            <FeedMainContent />
            <FeedRightContent />
        </div>
    );
}

export default Feed;
