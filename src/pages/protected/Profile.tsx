import { Navigate, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { createContext, useContext, useEffect } from "react";
import { UserInfo } from "../../data/users";
import {
    BellOutlined,
    CameraOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    HeartOutlined,
    MoreOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import Box from "../../components/primarys/Box";
import Albums from "../../components/layouts/Albums";
import User from "../../components/Users/User";
import usePost from "../../hooks/usePost";
import PostCard from "../../components/card/PostCard";

const ProfileContext = createContext<{
    user?: UserInfo;
}>({});

function UserAvatar({ className, url }: { className: string; url?: string }) {
    return (
        <>
            <div
                className={
                    "flex items-center justify-center flex-col" +
                    " " +
                    className
                }
            >
                <div className="relative">
                    {url ? (
                        <img
                            src={url}
                            alt={url}
                            className="rounded-full w-28 h-28 object-cover"
                        />
                    ) : (
                        <div className="bg-gray-300 rounded-full w-28 h-28"></div>
                    )}
                    <div className="absolute right-3 cursor-pointer -bottom-1 text-3xl flex items-center justify-center rounded-full text-white bg-blue-light transition hover:brightness-110">
                        <PlusCircleOutlined />
                    </div>
                </div>
            </div>
        </>
    );
}

function MenuHeader({ children }: { children: JSX.Element | string }) {
    return (
        <Box>
            <div className="flex dark:text-gray-bold items-center p-2">
                <div className="">{children}</div>
                <MoreOutlined className="ml-auto text-xl dark:text-gray-bold text-gray-bold cursor-pointer" />
            </div>
        </Box>
    );
}

function ProfileTop() {
    const { user } = useContext(ProfileContext);
    return (
        <>
            <div className="relative">
                <UserAvatar
                    className="absolute -bottom-14 z-10 left-1/2 transform -translate-x-1/2"
                    url={user?.avatar}
                />
                <div className="group/overlay">
                    <img
                        src={user?.background}
                        alt={user?.username}
                        className="min-h-[180px] w-full object-cover block max-h-64 mx-auto rounded-md"
                    />
                    <div className="cursor-pointer select-none absolute group-hover/overlay:border flex transition group-hover/overlay:bg-white/20 p-1 py-2 pr-3 rounded-md items-center justify-center top-3 left-3 text-white group-hover/overlay:text-xl text-2xl z-[1]">
                        <CameraOutlined />
                        <p className="text-xs font-semibold opacity-0 transition group-hover/overlay:opacity-100 pl-2">
                            Edit cover image
                        </p>
                    </div>
                    <div className="group-hover/overlay:opacity-100 opacity-0 transition w-full h-full absolute bg-black-bold/20 top-0 left-0"></div>
                </div>
            </div>
            <div className="mt-14 text-center mb-4">
                <p className="font-bold text-xl dark:text-white">{user?.name}</p>
                <p className="text-gray-bold text-sm">@{user?.username}</p>
            </div>
        </>
    );
}
 
export function InfoItem(props: {
    label?: string;
    title?: string;
    icon?: JSX.Element;
}) {
    return (
        <li className="flex items-center px-3 py-2">
            <div className="">
                <h3 className="font-bold text-sm dark:text-gray-bold">{props.title}</h3>
                <p className="text-sm text-gray-bold">{props.label}</p>
            </div>
            <div className="ml-auto text-gray-bold text-lg">{props.icon}</div>
        </li>
    );
}

function Line() {
    return <li className="h-px w-full bg-gray-light dark:bg-dark-light"></li>;
}

export function ProfileInfo() {
    return (
        <>
            <MenuHeader>
                <h1 className="font-semibold">Basic Info</h1>
            </MenuHeader>
            <Box>
                <ul>
                    <InfoItem
                        title="Studied at"
                        label="Vietnam Korea University"
                        icon={<EnvironmentOutlined />}
                    />
                    <Line />
                    <InfoItem
                        title="Married to"
                        label="John Doe"
                        icon={<HeartOutlined />}
                    />
                    <Line />
                    <InfoItem
                        title="Lives in"
                        label="HaTinh, Vietnam"
                        icon={<GlobalOutlined />}
                    />
                    <Line />
                    <InfoItem
                        title="Followers"
                        label="258 followers"
                        icon={<BellOutlined />}
                    />
                </ul>
            </Box>
        </>
    );
}

function ProfilePhotos() {
    return (
        <>
            <MenuHeader>
                <h1 className="font-semibold">Photos</h1>
            </MenuHeader>
            <div className="mb-4">
                <Albums
                    images={[
                        "https://picsum.photos/seed/1/300/300",
                        "https://picsum.photos/seed/2/300/300",
                        "https://picsum.photos/seed/3/300/300",
                        "https://picsum.photos/seed/4/300/300",
                        "https://picsum.photos/seed/5/300/300",
                        "https://picsum.photos/seed/6/300/300",
                        "https://picsum.photos/seed/7/300/300",
                        "https://picsum.photos/seed/8/300/300",
                        "https://picsum.photos/seed/9/300/300",
                        "https://picsum.photos/seed/10/300/300",
                    ]}
                />
            </div>
        </>
    );
}

function ProfileFriend() {
    return (
        <>
            <MenuHeader>
                <h1 className="font-semibold">Friends</h1>
            </MenuHeader>
            <Box>
                <ul>
                    <li className="px-1 py-2">
                        <User disabledHover description="30 mutual friends" />
                    </li>
                    <Line />
                    <li className="px-1 py-2">
                        <User disabledHover description="30 mutual friends" />
                    </li>
                    <Line />
                    <li className="px-1 py-2">
                        <User disabledHover description="30 mutual friends" />
                    </li>
                    <Line />
                    <li className="px-1 py-2">
                        <User disabledHover description="30 mutual friends" />
                    </li>
                </ul>
            </Box>
        </>
    );
}

function ProfilePosts(props: { className?: string }) {
    const { getAllPosts } = usePost();
    const { getUserById } = useUser();
    return (
        <div className={`` + " " + (props.className ? props.className : "")}>
            <MenuHeader>
                <h1 className="font-semibold">Posts</h1>
            </MenuHeader>
            {getAllPosts().map((post) => {
                const user = getUserById(post.authorId);
                return (
                    <div className="flex" key={post.id}>
                        <div className="hidden h-auto mr-2 w-1/12 md:flex flex-col items-center">
                            <img
                                src={user?.avatar}
                                className="w-12 h-12 mx-auto rounded-full relative z-[1]"
                                alt={user?.name}
                            />
                            <div className="h-full my-2 w-px bg-gray-bold/30"></div>
                        </div>
                        <div className="md:w-11/12 w-full">
                            <PostCard post={post} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function Profile() {
    const { id } = useParams();
    const { getUserById } = useUser();
    if (!id) return <div className="text-center">No user found</div>;
    const user = getUserById(id);

    if(!user) return <Navigate to="/404" />

    useEffect(() => {
        document.title = "Solve4X | " + user?.name;
    }, []);

    return (
        <ProfileContext.Provider value={{ user }}>
            <div className="flex flex-wrap p-3">
                <div className="w-full">
                    <ProfileTop />
                </div>
                <div className="w-full md:w-4/12">
                    <div className="w-full">
                        <ProfileInfo />
                    </div>
                    <div className="w-full">
                        <ProfilePhotos />
                    </div>
                    <div className="w-full">
                        <ProfileFriend />
                    </div>
                </div>
                <div className="w-full md:w-8/12">
                    <div className="md:ml-4">
                        <ProfilePosts />
                    </div>
                </div>
            </div>
        </ProfileContext.Provider>
    );
}

export default Profile;
