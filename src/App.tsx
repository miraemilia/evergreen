import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { useEffect } from "react"

import { ErrorPage } from "./app/pages/ErrorPage"
import { Home } from "./app/pages/Home"
import { Header } from "./shared/components/Header"
import { Footer } from "./shared/components/Footer"
import { ProductsPage } from "./features/products/pages/ProductsPage"
import { SingleProductPage } from "./features/products/pages/SingleProductPage"
import { Login } from "./features/credentials/pages/Login"
import { useAppDispatch } from "./app/hooks"
import { fetchAllCategories } from "./features/categories/reducers/categoriesReducer"
import { Profile } from "./features/credentials/pages/Profile"
import { Register } from "./features/users/pages/Register"
import { Cart } from "./features/cart/pages/Cart"
import { AdminProducts } from "./features/products/pages/AdminProducts"

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
          path: "admin/products",
          element: <AdminProducts />,
        }
      ]
    }
  ])

  return <RouterProvider router={router} />

}

export default App