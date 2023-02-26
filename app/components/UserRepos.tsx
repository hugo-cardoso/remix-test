import { List, Typography } from "antd";
import type { UserRepo } from "~/types";

type UserReposProps = {
  repos: UserRepo[];
};

export function UserRepos(props: UserReposProps) {
  return (
    <>
      <Typography.Title level={5}>Repositories ({props.repos.length})</Typography.Title>
      <List bordered>
        {
          props.repos.map((repo) => (
            <List.Item key={repo.id}>{repo.name}</List.Item>
          ))
        }
      </List>
    </>
  );
}