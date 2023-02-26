import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout, Space, Button } from 'antd';
import { UserDetail } from "~/components/UserDetail";
import { UserRepos } from "~/components/UserRepos";
import { createGithubService } from "~/services/githubService";
import Styles from "~/styles/user/$username.css";
import type { User } from "~/types";

const { Header, Content } = Layout;


export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: Styles }];
}

export const meta: MetaFunction<typeof loader> = ({data, params}) => {
  return {
    title: `${data.username} - Github Search`,
  };
};

export const loader = async ({ params }: LoaderArgs) => {
  try {
    const { username } = params;

    const githubService = createGithubService({ username: username as string });

    const [userResponse, reposResponse] = await Promise.all([
      githubService.getUser(),
      githubService.getRepos()
    ]);

    const user: User = {
      username: userResponse.login,
      name: userResponse.name,
      avatar: userResponse.avatar_url,
      repos: reposResponse
    };

    return json(user);
  } catch (error) {
    console.log(error);
    return redirect(`/?error=User not found`);
  }
};

export default function User() {
  const user = useLoaderData<typeof loader>();

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header>
          <Button href="/" type="primary">Back</Button>
        </Header>
        <Content>
          <div className="container">
            <UserDetail user={user}/>
            <UserRepos repos={user.repos}/>
          </div>
        </Content>
      </Layout>
    </Space>
  );
}