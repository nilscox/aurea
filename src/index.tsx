/* @refresh reload */
import '@fontsource-variable/inter';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';
import * as Tone from 'tone';
import z from 'zod';

import { createAppStore } from './domain/store';
import './index.css';
import { Layout } from './layout';
import { messages } from './locales/en';
import { Home } from './pages/home';
import { NewSession } from './pages/new-session';
import { Session } from './pages/session';

export async function dynamicActivate(locale: 'en' | 'fr') {
  const { messages } = await import(`./locales/${locale}.ts`);
  const locales = await import('zod/locales');

  i18n.load(locale, messages);
  i18n.activate(locale);

  z.config(locales[locale]());
}

i18n.load('en', messages);
i18n.activate('en');

dynamicActivate('fr');

document.body.addEventListener('keydown', async () => {
  await Tone.start();
  await Tone.loaded();
});

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/session/new',
        element: <NewSession />,
      },
      {
        path: '/session',
        element: <Session />,
      },
    ],
  },
]);

const store = createAppStore();
const root = createRoot(document.getElementById('root')!);

root.render(
  <Suspense fallback={<>Loading...</>}>
    <I18nProvider i18n={i18n}>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </I18nProvider>
  </Suspense>,
);
