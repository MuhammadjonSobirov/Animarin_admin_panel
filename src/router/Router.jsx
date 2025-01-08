import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/main-layout"
import HomePage from "../pages/home"
import Post from "../pages/post"
import Edit from "../pages/edit"
import LoginPage from "../pages/login"
import useStore from "../zustand/store"

const Router = () => {
  const { login } = useStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={login ? <MainLayout /> : <LoginPage />} >
          <Route index element={<HomePage />} />
          <Route path="post" element={<Post />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router