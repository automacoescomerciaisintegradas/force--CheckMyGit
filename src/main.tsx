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
import { RepositoryPage } from '@/pages/RepositoryPage'
import { GlobalIssuesPage } from '@/pages/GlobalIssuesPage'
import { GlobalPullRequestsPage } from '@/pages/GlobalPullRequestsPage'
import { FileBrowser } from '@/components/git/FileBrowser'
import { CodeViewer } from '@/components/git/CodeViewer'
import { IssueList } from '@/components/git/IssueList'
import { IssueDetailPage } from '@/pages/IssueDetailPage'
import { PullRequestList } from '@/components/git/PullRequestList'
import { PullRequestDetailPage } from '@/pages/PullRequestDetailPage'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/issues",
    element: <GlobalIssuesPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/pulls",
    element: <GlobalPullRequestsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/:username",
    element: <ProfilePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/:username/:reponame",
    element: <RepositoryPage />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <FileBrowser repoId="" /> },
      { path: "tree/:branch/*", element: <FileBrowser repoId="" /> },
      { path: "blob/:branch/*", element: <CodeViewer repoId="" /> },
      { path: "issues", element: <IssueList /> },
      { path: "issues/:number", element: <IssueDetailPage repoId="" /> },
      { path: "pulls", element: <PullRequestList /> },
      { path: "pulls/:number", element: <PullRequestDetailPage repoId="" /> },
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