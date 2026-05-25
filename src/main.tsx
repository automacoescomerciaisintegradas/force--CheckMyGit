import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RepoLayout } from '@/pages/RepoLayout'
import { RepoCodePage } from '@/pages/RepoCodePage'
import { RepoFileViewer } from '@/pages/RepoFileViewer'
import { RepoIssuesPage } from '@/pages/RepoIssuesPage'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/:username",
    element: <ProfilePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/:username/:repo",
    element: <RepoLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <RepoCodePage /> },
      { path: "tree/:branch/*", element: <RepoCodePage /> },
      { path: "blob/:branch/*", element: <RepoFileViewer /> },
      { path: "issues", element: <RepoIssuesPage /> },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)