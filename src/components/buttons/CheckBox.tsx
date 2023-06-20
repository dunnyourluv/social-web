import { useState } from "react";
const CheckBox = (props: {
    className?: string;
    turnOn?: () => void;
    turnOff?: () => void;
    checked?: boolean;
    size?: "sm" | "md" | "lg";
}) => {
    const [checked, setChecked] = useState(props.checked);
    const size = props.size || "md";
    const sizeProps = {
        md: {
            width: "w-14",
            height: "h-8",
            beforeWidth: "before:w-6",
            beforeHeight: "before:h-6",
            beforeTranslate: "before:translate-x-6",
            beforeLeft: "before:left-1",
            beforeBottom: "before:bottom-1",
        },
        sm: {
            width: "w-16",
            height: "h-9",
            beforeWidth: "before:w-7",
            beforeHeight: "before:h-7",
            beforeTranslate: "before:translate-x-7",
            beforeLeft: "before:left-1",
            beforeBottom: "before:bottom-1",
        }
        ,
        lg: {
            width: "w-16",
            height: "h-9",
            beforeWidth: "before:w-7",
            beforeHeight: "before:h-7",
            beforeTranslate: "before:translate-x-7",
            beforeLeft: "before:left-1",
            beforeBottom: "before:bottom-1",
        }
    }

    const sizeProp = sizeProps[size];

    return (
        <>
            <label htmlFor="checkbox" className={`relative ${sizeProp.height} ${sizeProp.width} ${props.className && props.className || ""}`}>
                <input
                    type="checkbox"
                    className="hidden"
                    id="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        if (e.target.checked) {
                            props.turnOn && props.turnOn();
                        } else {
                            props.turnOff && props.turnOff();
                        }
                    }}
                />
                <div className={`absolute cursor-pointer bottom-0 left-0 right-0 top-0 rounded-full before:absolute ${sizeProp.beforeHeight} ${sizeProp.beforeWidth} before:rounded-full before:bg-blue-light transition-all duration-500 before:duration-500 before:transition-all ${sizeProp.beforeLeft} ${sizeProp.beforeBottom} ${checked && ` before:bg-white bg-blue-light ${sizeProp.beforeTranslate}` || "bg-gray-bold/30"}`}></div>
            </label>
        </>
    );
};

export default CheckBox;
