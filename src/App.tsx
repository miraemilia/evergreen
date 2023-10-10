import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { useEffect } from "react"

import { ErrorPage } from "./app/pages/ErrorPage"
import { Header } from "./shared/components/Header"
import { Footer } from "./shared/components/Footer"
import { useAppDispatch } from "./app/hooks"
import { fetchAllCategories } from "./features/categories/reducers/categoriesReducer"
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles"
import { siteTheme } from "./app/styles/theme"
import { Home } from "./app/pages/Home"
import { ProductsPage } from "./features/products/pages/ProductsPage"
import { SingleProductPage } from "./features/products/pages/SingleProductPage"
import { Cart } from "./features/cart/pages/Cart"
import { Login } from "./features/credentials/pages/Login"
import { Profile } from "./features/credentials/pages/Profile"
import { Register } from "./features/users/pages/Register"
import { AdminProducts } from "./features/products/pages/AdminProducts"
import { Admin } from "./shared/pages/Admin"
import { AdminNewProduct } from "./features/products/pages/AdminNewProduct"
import { AdminUsersPage } from "./features/users/pages/AdminUsersPage"

const App = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllCategories())
  }, [])

  const Layout = () => {
    return (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "products/:productId",
          element: <SingleProductPage />,
        },
        {
          path: "products/category/:categoryId",
          element: <ProductsPage />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "admin",
          element: <Admin />,
        },
        {
          path: "admin/products",
          element: <AdminProducts />,
        },
        {
          path: "admin/newproduct",
          element: <AdminNewProduct />,
        },
        {
          path: "admin/users",
          element: <AdminUsersPage />,
        }
      ]
    }
  ])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={siteTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  )

}

export default App