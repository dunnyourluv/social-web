import { UserAddOutlined } from "@ant-design/icons";
import User from "../Users/User";
import Card, { CardItem } from "./Card";

function FriendSuggestItem({children}: {children: JSX.Element}) {
    return <CardItem icon={<UserAddOutlined />}>
        {children}
    </CardItem>
}

function FriendSuggest() {
  return (
    <Card title="Friend Suggets">
      <ul className="flex flex-col w-full">
        <FriendSuggestItem>
        <User disabledHover src="https://i.pinimg.com/236x/e1/9d/f3/e19df3e9c81d07ef2392792a86350d6d.jpg" description="Duyên" name="Nguyễn Mỹ Duyên" />
        </FriendSuggestItem>
        <FriendSuggestItem>
        <User disabledHover src="https://i.pinimg.com/236x/56/1d/6c/561d6cef63179118185318003cb716ff.jpg" description="tuandeptrai" name="Phạm Quang Tuấn" />
        </FriendSuggestItem>
        <FriendSuggestItem>
        <User disabledHover src="https://i.pinimg.com/236x/19/a8/e5/19a8e5fd548e6bf116b0b1d6f4026f7a.jpg" description="bichcutee" name="Phan Ngọc Bích"/>
        </FriendSuggestItem>
        <FriendSuggestItem>
        <User disabledHover src="https://i.pinimg.com/236x/3d/67/0f/3d670f633e20bdf9b2b576e8bc4d0ade.jpg" name="Nguyễn Tuyết Mong"  description="mongmanhdevo" />
        </FriendSuggestItem>
      </ul>
    </Card>
  );
}

export default FriendSuggest;
