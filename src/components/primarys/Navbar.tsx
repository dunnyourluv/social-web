import { Link } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import navbar from "../../data/navbar";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";

const NavbarContext = createContext<{}>({});

export interface NavItemProps {
    icon?: JSX.Element;
    src?: string;
    className?: string;
    children: JSX.Element;
    isActive?: boolean;
    to?: string;
    colorHover?: "primary" | "red" | "primary-bold";
    onClick?: () => void;
    openModel?: boolean;
}

const NavItem = (props: NavItemProps) => {
    const Comp = props.to ? Link : "li";
    let newProps: {
        onClick?: () => void;
        className?: string;
        to: string;
    } = {
        to: (props.to && props.to) || "",
    };

    let colorHover = "";
    if (props.colorHover == "red") colorHover = "hover:bg-red";
    if (props.colorHover == "primary-bold") colorHover = "hover:bg-blue-bold";
    return (
        <Comp
            {...newProps}
            className={
                "flex items-center justify-center p-1 mx-1 cursor-pointer " +
                ((props.className && props.className) || "")
            }
        >
            {props.icon && (
                <div
                    onClick={!props.to && props.onClick || undefined}
                    className={`p-2 flex items-center justify-center rounded-md transition duration-200 hover:text-white ${
                        (props.colorHover &&
                            props.colorHover != "primary" &&
                            colorHover) ||
                        "hover:bg-blue-light"
                    } ${
                        (props.isActive &&
                            "bg-blue-light text-white shadow-md shadow-blue-light brightness-110") ||
                        ""
                    } ${
                        (props.isActive &&
                            "relative after:bg-green-light after:w-3 after:h-3 after:absolute after:-top-1 after:-right-1 after:rounded-full after:border after:border-white") ||
                        ""
                    }`}
                >
                    {props.icon}
                </div>
            )}
            {props.src && (
                <div className="">
                    <img src={props.src} alt={props.src} />
                </div>
            )}
            {props.openModel && props.children}
        </Comp>
    );
};

const NavItemLast = (props: NavItemProps) => {
    const Comp = props.to ? Link : "li";
    const newProps = {
        onClick: props.onClick,
    }
    return (
        <Comp
            to={(props.to && props.to) || ""}
            className={`ml-auto cursor-pointer hover:bg-gray-light dark:hover:bg-dark-light h-full flex justify-center items-center px-2 ${
                (props.className && props.className) || ""
            }`}
        >
            <div className="" {...newProps}>
                {props.icon && (
                    <div className="flex items-center justify-center lg:hidden">
                        {props.icon}
                    </div>
                )}
                {props.src && (
                    <div className="hidden lg:block">
                        <img
                            src={props.src}
                            alt={props.src}
                            className="object-cover w-12 h-12 rounded-full"
                        />
                    </div>
                )}
            </div>
            {props.children}
        </Comp>
    );
};

function Navbar() {
    const lastNavItem = navbar[navbar.length - 1];
    const [indexOpenModel, setIndexOpenModel] = useState<number>(-1);
    const user = useAuth().getUser();
    return (
        <NavbarContext.Provider value={{}}>
            <div className="h-full bg-white dark:bg-dark-bold shadow-md flex relative md:static">
                <div className="lg:w-2/12">
                    <Logo />
                </div>
                <ul className="lg:w-10/12 flex items-center text-xl text-gray-bold dark:text-gray-bold w-full select-none">
                    <div className="flex lg:ml-0 md:ml-auto md:relative">
                        {navbar
                            .slice(0, navbar.length - 1)
                            .map((item, index) => (
                                <NavItem
                                    key={index}
                                    icon={<item.icon />}
                                    isActive={item.actived}
                                    colorHover={
                                        (index === 0 && "red") ||
                                        (index === navbar.length - 1 &&
                                            "primary-bold") ||
                                        "primary"
                                    }
                                    to={item.to}
                                    onClick={() => {
                                        setIndexOpenModel(
                                            indexOpenModel === index
                                                ? -1
                                                : index,
                                        );
                                    }}
                                    openModel={indexOpenModel === index}
                                >
                                    {(item.Model && <item.Model />) || <></>}
                                </NavItem>
                            ))}
                    </div>
                    {
                        <NavItemLast
                            icon={<lastNavItem.icon />}
                            src={(user && user.avatar) || ""}
                            className=""
                            onClick={() => setIndexOpenModel(indexOpenModel === -2 ? -1 : -2)}
                        >
                            {(lastNavItem.Model && indexOpenModel === -2 && <lastNavItem.Model />) || (
                                <></>
                            )}
                        </NavItemLast>
                    }
                </ul>
            </div>
        </NavbarContext.Provider>
    );
}

export default Navbar;
