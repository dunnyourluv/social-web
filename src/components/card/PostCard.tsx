import {
    CloseOutlined,
    CommentOutlined,
    DeleteOutlined,
    EditOutlined,
    HeartOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import User from "../Users/User";
import Box from "../primarys/Box";
import useToggle from "../../hooks/useToggle";
import useUser from "../../hooks/useUser";
import { CommentInfo, PostData } from "../../data/posts";
import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { UserInfo } from "../../data/users";
import useAuth from "../../hooks/useAuth";

const PostCardContext = createContext<{
    post?: PostData;
    setOnComment: React.Dispatch<React.SetStateAction<boolean>>;
    user?: UserInfo;
}>({
    setOnComment: () => {},
});

export interface PostCardProps {
    post: PostData;
}

export interface PostImgsProps {
    imgs: {
        src: string;
        alt: string;
    }[];
}

function Icon({
    children,
    size = "md",
    onClick,
    effect,
}: {
    children: JSX.Element;
    size?: "sm" | "md" | "lg" | "xl";
    onClick?: (toggle: boolean, toggleItem: () => void) => void;
    effect?: boolean;
}) {
    const { toggle, toggleItem } = useToggle();

    let typeClass = "";
    if (size === "sm") {
        typeClass = "w-6 h-6";
    }

    if (size === "md") {
        typeClass = "w-8 h-8";
    }

    if (size === "lg") {
        typeClass = "w-10 h-10";
    }

    if (size === "xl") {
        typeClass = "w-12 h-12";
    }

    return (
        <div
            className={`${typeClass} bg-blue-light cursor-pointer mx-1 flex items-center justify-center rounded-full transition ${
                onClick && !toggle && effect
                    ? "bg-white dark:bg-dark-light dark:border-0 text-red border"
                    : "text-white"
            } ${toggle && effect ? "bg-red text-white" : ""}`}
            onClick={(e) => {
                onClick && onClick(toggle, toggleItem);
            }}
        >
            {children}
        </div>
    );
}

function PostImgs({ imgs }: PostImgsProps) {
    return (
        <div className="">
            <div
                className={`${
                    imgs.length > 1
                        ? "grid grid-flow-row grid-cols-2 gap-1"
                        : ""
                } `}
            >
                {imgs.map((img, index) => {
                    return (
                        <img
                            key={index}
                            src={img.src}
                            className={`object-cover mx-auto rounded-xl ${
                                imgs.length > 2 ? "h-80" : "h-80"
                            }`}
                            alt={img.alt}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function Comment(comment: CommentInfo) {
    const { getUserById } = useUser();
    const user = getUserById(comment.authorId);
    if (!user) return <></>;
    return (
        <li className="flex mb-4">
            <div className="w-1/5">
                <img
                    src={user?.avatar}
                    className="mx-auto object-cover w-12 h-12 rounded-full"
                    alt={user?.name}
                />
            </div>
            <div className="w-4/5 pl-3 pb-2 border-b border-b-black-light/20">
                <Link to={"/profile/" + user.id} className="font-bold dark:text-gray-bold">
                    {user?.name}
                </Link>
                <p className="dark:text-gray-bold">{comment.content}</p>
            </div>
        </li>
    );
}

function PostComment(props: { active?: boolean }) {
    const { post, setOnComment } = useContext(PostCardContext);
    const { getUser } = useAuth();
    const user = getUser();
    if (!props.active || !post) return <></>;
    return (
        <div className="absolute w-full h-full z-[1] bg-white dark:bg-dark-bold dark:text-gray-bold top-0 left-0 p-2 scroll-auto">
            <div className="relative h-full">
                <div className="flex items-center pb-2 px-1 mb-4 border-b border-black-light/20">
                    <h3 className="text-sm font-bold">
                        Comments({post.comments.length})
                    </h3>
                    <div
                        className="ml-auto w-6 h-6 rounded-full transition ease-in-out duration-200 hover:bg-gray-bold/30 cursor-pointer flex items-center justify-center"
                        onClick={() => {
                            setOnComment(false);
                        }}
                    >
                        <CloseOutlined />
                    </div>
                </div>
                <ul className="mb-10">
                    {post.comments.map((comment, index) => {
                        return <Comment key={index} {...comment} />;
                    })}
                </ul>
                <div className="absolute flex bottom-0 h-10 w-full py-1">
                    <div className="w-2/12">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={(user && user.avatar) || ""}
                            alt={user?.name}
                        />
                    </div>
                    <input
                        type="text"
                        className="w-10/12 border-none outline-none h-full rounded-md px-1 dark:bg-dark-light dark:text-gray-bold"
                        placeholder="Write a comment..."
                    />
                </div>
            </div>
        </div>
    );
}

const MoreModel = (props: { canEdit?: boolean }) => {
    return (
        <div className="text-sm flex flex-wrap bg-white dark:bg-dark-bold dark:text-gray-bold shadow-sm border rounded-md border-gray-bold/30 w-44">
            <button className="p-2 w-full h-11 flex justify-start items-center transition hover:bg-gray-bold/30">
                <DeleteOutlined className="text-lg" />
                <span>Delete post</span>
            </button>
            {props.canEdit && (
                <button className="p-2 w-full h-11 flex justify-start items-center transition hover:bg-gray-bold/30">
                    <EditOutlined className="text-lg" />
                    <span>Edit post</span>
                </button>
            )}
        </div>
    );
};

function PostCard({ post }: PostCardProps) {
    const [likes, setLikes] = useState(post.likes.length || 0);
    const [onComment, setOnComment] = useState(false);
    const [moreModel, setMoreModel] = useState(false);
    const { getUserById } = useUser();
    const user = getUserById(post.authorId);
    const authUser = useAuth().getUser();
    return (
        <PostCardContext.Provider value={{ post: post, setOnComment, user }}>
            <Box>
                <div className="p-2 flex flex-wrap relative">
                    <PostComment active={onComment} />
                    <div className="w-11/12">
                        {user && (
                            <User
                                name={user.name}
                                to={"/profile/" + user.id}
                                src={user.avatar}
                                description={post.createdAt.toDateString()}
                                disabledHover
                            />
                        )}
                    </div>
                    <div className="w-1/12 flex items-center relative justify-center dark:text-gray-bold text-xl cursor-pointer">
                        <MoreOutlined
                            onClick={() => {
                                setMoreModel(!moreModel);
                            }}
                        />
                        <div className="absolute right-0 top-10 z-[3]">
                            {moreModel && (
                                <MoreModel
                                    canEdit={user?.id === authUser?.id}
                                />
                            )}
                        </div>
                    </div>
                    <div className="text-sm my-4 w-full dark:text-gray-bold">{post.content}</div>
                    <div className="w-full mb-6 relative">
                        {post.images?.length && post.images.length > 4 ? (
                            <PostImgs
                                imgs={post.images?.slice(0, 4).map((img) => ({
                                    src: img,
                                    alt: post.content || "",
                                }))}
                            />
                        ) : (
                            <PostImgs
                                imgs={
                                    post.images?.map((img) => ({
                                        src: img,
                                        alt: post.content || "",
                                    })) || []
                                }
                            />
                        )}

                        <div
                            className={`${
                                post.images?.length ? "absolute" : "justify-end"
                            } flex right-3 bottom-0 items-center`}
                        >
                            <Icon
                                size="lg"
                                onClick={() => {
                                    setOnComment(true);
                                }}
                            >
                                <CommentOutlined />
                            </Icon>
                            <Icon
                                size="xl"
                                effect
                                onClick={(toggle, toggleItem) => {
                                    toggleItem();
                                    if (!toggle) {
                                        setLikes(likes + 1);
                                    } else {
                                        setLikes(likes - 1);
                                    }
                                }}
                            >
                                <HeartOutlined />
                            </Icon>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="mx-1 flex justify-center items-center text-gray-bold">
                            <CommentOutlined />
                            <span className="pl-2">{post.comments.length}</span>
                        </div>
                        <div className="mx-1 flex justify-center items-center text-gray-bold">
                            <HeartOutlined />
                            <span className="pl-2">{likes}</span>
                        </div>
                    </div>
                </div>
            </Box>
        </PostCardContext.Provider>
    );
}

export default PostCard;
