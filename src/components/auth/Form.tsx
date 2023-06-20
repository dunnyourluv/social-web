import React, { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../primarys/Logo";

function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={name} className="text-sm font-bold text-black-bold dark:text-gray-bold mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border dark:bg-dark-light dark:text-gray-bold border-gray-bold/30 rounded-md px-2 py-2 text-sm focus:outline-none focus:border-blue-light"
      />
      {error && <p className="text-xs text-red">{error}</p>}
    </div>
  );
}

function FormButton({
  children,
  onClick,
}: {
  children: JSX.Element;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-light text-white font-bold text-sm py-2 rounded-md mt-2"
    >
      {children}
    </button>
  );
}

function Form({ type }: { type: "signin" | "signup" }) {
    const [info, setInfo] = useState({
        username: "johndoe",
        password: "123456",
        confirmPassword: "",
        name: "",
        image: ""
    })

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        image: "",
    })

    const {getUser, login} = useAuth()
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(type === "signin") {
            const {username, password} = info
            if(!username) {
                setErrors({...errors, username: "Username is required"})
                return
            }
            if(!password) {
                setErrors({...errors, password: "Password is required"})
                return
            }
            setErrors({...errors, username: "", password: ""})
            const loginResponse = login(username, password)
            if(loginResponse.error) {
                setErrors({...errors, password: loginResponse.error})
            }else {
                redirect("/");
            }
        }
    }

    if(getUser()) return <Navigate to="/" />



  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen md:max-w-[600px] md:h-auto md:py-6 md:px-3">
      <div className="w-full px-3">
        <div className="mb-4">
            <Logo full />
        </div>
        <h1 className="text-2xl text-center text-gray-bold mb-4">{type === 'signin' ? "Sign In" : "Sign Up"}</h1>
        <form className="flex flex-col" action="">
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={info.username}
            onChange={(e) => {
                setInfo({...info, username: e.target.value})
            }}
            error={errors.username}
            placeholder="Enter your username"
            required={true}
          />
          {type === "signup" && <FormInput
            label="Name"
            type="text"
            name="name"
            value={info.name}
            onChange={(e) => {
                setInfo({...info, name: e.target.value})
            }}
            error={errors.name}
            placeholder="Enter your username"
            required={true}
          />}
          {type === "signup" && <FormInput
            label="Image"
            type="text"
            name="image"
            value={info.image}
            onChange={(e) => {
                setInfo({...info, image: e.target.value})
            }}
            error={errors.image}
            placeholder="Enter your image"
            required={true}
          />}
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={info.password}
            onChange={(e) => {
                setInfo({...info, password: e.target.value})
            }}
            error={errors.password}
            placeholder="Enter your password"
            required={true}
          />
          {type === "signup" && (
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              value={info.confirmPassword}
              onChange={(e) => {
                type === "signup" && setInfo({...info, confirmPassword: e.target.value})
              }}
            />
          )}
            <FormButton onClick={handleClick}><>{type === 'signin' ? "Sign In" : "Sign Up"}</></FormButton>
        </form>
        {type ==='signin' && <Link to={"/sign-up"} className="text-center text-xs text-gray-bold block mt-4 transition hover:text-blue-light">Don't have an account? Sign Up</Link>}
      </div>
    </div>
  );
}

export default Form;
