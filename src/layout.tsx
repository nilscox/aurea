import { Link, Outlet } from 'react-router';

import { selectAppHeader } from './domain/app.slice';
import Icon from './icon.svg?react';
import { useAppSelector } from './store';

export function Layout() {
  return (
    <div className="h-screen col overflow-hidden">
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  const header = useAppSelector(selectAppHeader);

  return (
    <header className="h-16">
      <Link to="/" className="row items-center p-2 gap-2 h-full">
        <Icon className="h-full" />
        <h1 className="text-center text-4xl font-semibold text-slate-500">{header.title}</h1>
      </Link>
    </header>
  );
}

export function Main() {
  return (
    <main className="col flex-1 overflow-auto px-3 pb-3">
      <Outlet />
    </main>
  );
}
