import { useRef } from "react";
import type { LinksFunction, ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useSearchParams } from "@remix-run/react";
import { Input, Alert, Typography } from "antd";
import { createGithubService } from "~/services/githubService";
import Styles from "~/styles/index.css";

const { Search } = Input;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: Styles }];
}

export const action = async ({ request }: ActionArgs) => {
  try {
    const form = await request.formData();
    const username = form.get("username") as string;
  
    const githubService = createGithubService({ username });
    const user = await githubService.getUser();

    if (user) {
      return redirect(`/user/${username}`);
    }

  } catch(e: any) {
    return redirect(`/?error=${e.message}`);
  }
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const formRef = useRef<HTMLFormElement>(null);

  const onSearch = () => {
    const formIsValid = formRef.current?.checkValidity();

    if (formIsValid) {
      formRef.current?.submit();
    }
  };

  return (
    <Form method="post" className="form" ref={formRef}>
      <Typography.Title level={4}>Search Github User</Typography.Title>
      <Search
        placeholder="hugo-cardoso"
        enterButton="Search"
        name="username"
        size="large"
        onSearch={onSearch}
        autoComplete="off"
        spellCheck={false}
        required
      />
      {
        error && <Alert message={error} type="error" />
      }
    </Form>
  );
}
