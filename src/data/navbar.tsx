import {
    BellOutlined,
    BulbOutlined,
    HeartOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuOutlined,
    MessageOutlined,
    SearchOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";
import React, { Fragment, useContext } from "react";
import useUser from "../hooks/useUser";
import User from "../components/Users/User";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import CheckBox from "../components/buttons/CheckBox";
import { GlobalContext } from "../context/GlobalContext";

export interface NavbarItem {
    id: string;
    icon: React.FC<any>;
    actived?: boolean;
    Model?: React.FC<any>;
    to?: string;
}

const Model = (props: {
    children: JSX.Element | string;
    className?: string;
}) => {
    return (
        <div
            className={
                "md:w-96 md:left-1/2 md:-translate-x-1/2 absolute top-16 bg-white dark:bg-dark-bold left-0 right-0 mx-2 rounded-md shadow text-sm " +
                ((props.className && props.className) || "")
            }
        >
            {props.children}
        </div>
    );
};

const Footer = (props: { children: JSX.Element | string }) => {
    return (
        <div className="py-3 bg-gray-light dark:bg-dark-light text-center uppercase text-xs font-bold">
            <p>{props.children}</p>
        </div>
    );
};

const Line = () => <div className="w-full h-px bg-gray-light dark:bg-dark-light"></div>;

const Header = (props: { children: JSX.Element | string }) => {
    return (
        <>
            <div className="px-2">
                <h1 className="uppercase text-xs py-2">{props.children}</h1>
            </div>
            <Line />
        </>
    );
};

const Label = (props: {
    children: JSX.Element | string;
    description?: string;
    icon: JSX.Element;
    to?: string;
    onClick?: () => void;
}) => {
    const Comp = props.to ? Link : "div";
    const newProps = {
        to: (props.to && props.to) || "",
        onClick: props.onClick,
    };
    return (
        <Comp {...newProps} className="flex items-center text-xs my-2">
            <div className="w-2/12 flex items-center justify-center text-xl">
                {props.icon}
            </div>
            <div className="w/10/12">
                <h1 className="font-semibold text-black-bold dark:text-gray-bold my-1">
                    {props.children}
                </h1>
                <p className="dark:text-gray-bold">{props.description}</p>
            </div>
        </Comp>
    );
};
const navbars: NavbarItem[] = [
    {
        id: "1",
        icon: HeartOutlined,
        Model: () => {
            const { getAllUsers } = useUser();
            const users = getAllUsers();
            return (
                <Model>
                    <>
                        <Header>friend request</Header>
                        <div className="px-2">
                            {users.map((user) => {
                                return (
                                    <Fragment key={user.id}>
                                        <div
                                            className="my-1 py-1 flex"
                                            key={user.id}
                                        >
                                            <User
                                                name={user.name}
                                                src={user.avatar}
                                                disabledHover
                                            />
                                            <div className="ml-auto mr-1 flex justify-center items-center text-xl">
                                                <UserAddOutlined className="p-2 bg-gray-light dark:bg-dark-light mr-1 rounded-lg transition duration-200 hover:text-blue-light hover:bg-gray-bold/20" />
                                                <UserDeleteOutlined className="p-2 bg-gray-light dark:bg-dark-light ml-1 rounded-lg transition duration-200 hover:text-blue-light hover:bg-gray-bold/20" />
                                            </div>
                                        </div>
                                        <Line />
                                    </Fragment>
                                );
                            })}
                        </div>
                        <Footer>view all</Footer>
                    </>
                </Model>
            );
        },
    },
    {
        id: "2",
        icon: BellOutlined,
        Model: () => {
            const { getAllUsers } = useUser();
            const users = getAllUsers();
            return (
                <Model>
                    <>
                        <Header>notification</Header>
                        <ul className="px-2">
                            {users.map((user, index) => {
                                return (
                                    <Fragment key={user.id}>
                                        <div className="my-1 py-1 flex">
                                            <User
                                                disabledHover
                                                name={user.name}
                                                src={user.avatar}
                                                description={user.username}
                                            />
                                            <div className="ml-auto flex justify-center items-center text-lg mr-1 px-2">
                                                {(index % 2 == 0 && (
                                                    <HeartOutlined />
                                                )) || <MessageOutlined />}
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </ul>
                        <Footer>view all</Footer>
                    </>
                </Model>
            );
        },
    },
    {
        id: "3",
        icon: MessageOutlined,
        actived: true,
        to: "/messages",
    },
    {
        id: "4",
        icon: MenuFoldOutlined,
    },
    {
        id: "5",
        icon: SearchOutlined,
        Model: () => {
            return (
                <Model>
                    <>
                        <Header>Search</Header>
                        <div className="my-2 px-1">
                            <div className="h-8 flex">
                                <input
                                    className="h-full pl-2 flex-1 border border-gray-light rounded-l-md outline-none transition duration-200 focus:border-blue-light dark:bg-dark-light dark:border-dark-bold"
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="search"
                                />
                                <button className="h-full text-xl p-2 flex justify-center items-center text-white rounded-r-md bg-blue-light transition duration-200 hover:brightness-110">
                                    <SearchOutlined />
                                </button>
                            </div>
                        </div>
                    </>
                </Model>
            );
        },
    },
    {
        id: "6",
        icon: MenuOutlined,
        Model: () => {
            const { getUser, logout } = useAuth();
            const { useTheme } = useContext(GlobalContext);
            const [theme, setTheme] = useTheme();
            const user = getUser();
            if (!user) return <></>;
            const turnOnDarkMode = () => {
                localStorage.setItem("theme", "dark");
                setTheme("dark");
            };

            const turnOffDarkMode = () => {
                localStorage.removeItem("theme");
                setTheme(null);
            };
            return (
                <Model className="md:left-auto md:w-80 md:right-0 md:translate-x-0">
                    <>
                        <div className="p-2 flex items-center">
                            <p className="font-bold text-black-bold dark:text-gray-bold">
                                Dark Mode
                            </p>
                            <CheckBox
                                className="ml-auto"
                                turnOn={turnOnDarkMode}
                                turnOff={turnOffDarkMode}
                                checked={theme == "dark"}
                            />
                        </div>
                        <Line />
                        <ul className="p-2">
                            <User
                                name={user.name}
                                disabledHover
                                src={user.avatar}
                                description={user.username}
                                to={"/profile/" + user.id}
                            />
                        </ul>
                        <Line />
                        <ul>
                            <Label
                                icon={<SettingOutlined />}
                                description="Access widget settings"
                            >
                                Settings
                            </Label>
                            <Label
                                icon={<BulbOutlined />}
                                description="Contact or support"
                            >
                                Help
                            </Label>
                            <Label
                                icon={<LogoutOutlined />}
                                description="Log out from your account"
                                onClick={() => {
                                    logout();
                                    window.location.href = "/";
                                }}
                            >
                                Logout
                            </Label>
                        </ul>
                    </>
                </Model>
            );
        },
    },
];

export default navbars;
