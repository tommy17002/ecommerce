import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import { CounterPage } from "./pages/CounterPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";

const HomePage = () => <h1>Home Page</h1>;
const UsersPage = () => <h1>Users Page</h1>;
const TransactionsPage = () => <h1>Transactions Page</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "products",
            element: <ProductDetailPage />,
          },
          {
            path: "transactions",
            element: <TransactionsPage />,
          },
          {
            path: "counter",
            element: <CounterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
