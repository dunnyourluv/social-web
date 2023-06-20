import { EyeOutlined } from "@ant-design/icons";
import Card, { CardItem } from "./Card";
import User from "../Users/User";

function LastActiveItem({ children }: { children: JSX.Element }) {
  return <CardItem icon={<EyeOutlined />}>{children}</CardItem>;
}

function LastActiveCard() {
  return (
    <Card title="Last actives">
      <ul className="flex flex-col w-full">
        <LastActiveItem>
          <User disabledHover name="Phan Văn Nam" src="https://i.pinimg.com/564x/ef/25/c8/ef25c8ea69a8b0ab474b74c4f550a8a7.jpg" description="3 hours ago" />
        </LastActiveItem>
        <LastActiveItem>
          <User disabledHover name="Cao Thị Thu Hương" src="https://i.pinimg.com/236x/d7/80/e4/d780e4eb48c1560dbe016cb887b1dc24.jpg" description="15 hours ago" />
        </LastActiveItem>
        <LastActiveItem>
          <User disabledHover name="Lê Thị Thuỳ Dương" src="https://i.pinimg.com/236x/46/db/ca/46dbca25e3d2d60ba4790215a87ad600.jpg" description="3 minutes ago" />
        </LastActiveItem>
        <LastActiveItem>
          <User disabledHover name="Hồ Ngọc Uyên Nha" src="https://i.pinimg.com/236x/bc/ce/59/bcce596dc9df8a3efdf5358bdd9bf85f.jpg" description="3 seconds ago" />
        </LastActiveItem>
      </ul>
    </Card>
  );
}

export default LastActiveCard;
