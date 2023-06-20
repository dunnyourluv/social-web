import React from "react";
import { Link } from "react-router-dom";

export interface UserProps {
  name?: string;
  src?: string;
  alt?: string;
  description?: string;
  type?: "button" | "link";
  to?: string;
  icon?: JSX.Element
  disabledHover?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function User({ type, to, icon,disabledHover = false,...user }: UserProps) {
  let Comp = type === "button" ? "button" : Link;
  let props = type === "button" ? {} : { to: to };
  return (
    <div className={(type === 'button' ? "cursor-pointer " : " ") + (disabledHover ? " " : " duration-200 ease-in-out transition-all hover:bg-gray-light dark:hover:bg-dark-light rounded-md") + " flex items-center"} onClick={(e) => {
      if(type === 'button') {
        e.preventDefault();
        user.onClick && user.onClick(e)
      }
    }}>
      <div className="" >
        <div className={`w-12 h-12 rounded-full overflow-hidden ${icon ? "text-2xl" : ""} ${type === 'button' ? "" : ""} flex items-center justify-center`}>
        {icon ? icon : <img
          src={
            user.src
              ? user.src
              : "https://i.pinimg.com/564x/0f/e9/fe/0fe9fe7fcc455aaed25fb56f1974b5ba.jpg"
          }
          alt={user.alt ? user.alt : "girl"}
          className="object-cover w-12 h-12"
        />}
        </div>
      </div>
      <div className="pl-4 pr-1">
        <Comp to={props.to as string} className={(type === 'button' ? "cursor-pointer ": "") + " block text-xs font-semibold dark:text-gray-bold"}>
          {user.name ? user.name : "Lê Thế Dũng"}
        </Comp>
        <span className="text-xs text-gray-bold">
          {user.description
            ? user.description
            : "Your have 4 comments from friend"}
        </span>
      </div>
    </div>
  );
}

export default User;
