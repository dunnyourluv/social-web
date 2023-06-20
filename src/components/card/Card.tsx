import { MoreOutlined } from "@ant-design/icons";
import Box from "../primarys/Box";

export function CardItem({children, icon}: {children: JSX.Element; icon?: JSX.Element}) {
    return <li className="flex justify-between items-center mb-2 py-1 border-b border-b-gray-bold/30">
    {children}
    {icon && <div className="text-xl w-1/6 cursor-pointer transition dark:text-gray-bold dark:hover:text-blue-light hover:text-blue-light flex items-center justify-center h-full
    ">
        {icon}
    </div>}
</li>
}

function Card({ children, title }: { children: JSX.Element; title?: string }) {
  return (
    <Box>
      <>
        <div className="text-sm flex dark:text-gray-bold items-center p-2 border-b border-black-light/30 mb-2">
          {title}
          <MoreOutlined  className="ml-auto text-xl cursor-pointer" />
        </div>
        <ul className="p-2 flex flex-col justify-center items-center">
          {children}
        </ul>
      </>
    </Box>
  );
}

export default Card;
