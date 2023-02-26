import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import antdReset from "antd/dist/reset.css";
import globalStyle from "~/styles/global.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Github Search",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => ([
  {
    rel: "stylesheet",
    href: antdReset,
    as: "style"
  },
  {
    rel: "stylesheet",
    href: globalStyle,
    as: "style"
  }
]);

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
