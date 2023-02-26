import type { User } from "~/types";
import { Typography, Space, Avatar } from "antd";

type UserDetailProps = {
  user: User;
};

export function UserDetail(props: UserDetailProps) {
  const { name, avatar } = props.user;

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 16]}>
      <Avatar shape="square" size={128} src={avatar} />
      <Typography.Title level={1}>{name}</Typography.Title>
    </Space>
  );
}