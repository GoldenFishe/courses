import { Fragment } from "react";
import { Outlet, Link } from "@remix-run/react";

function Layout() {
  return (
    <Fragment>
      <header className="bg-blue-700 px-8">
        <nav>
          <ul className="flex flex-row items-center gap-4 text-cyan-50 h-16">
            <li>
              <Link to="/">Главная</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-8 container mx-auto">
        <Outlet />
      </main>
    </Fragment>
  );
}

export default Layout;
