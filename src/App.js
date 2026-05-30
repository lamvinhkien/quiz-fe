import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import QuizExam from "./Components/Exam/Quiz/QuizExam";
import Quiz from "./Components/Admin/Quiz/Quiz";
import Question from "./Components/Admin/Question/Question";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Auth/Login"
import NotFound from "./Components/Page/NotFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Components/Auth/Context';
import { useContext } from "react";

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <BrowserRouter>
        <div className="container px-2">
          <Header />
          <div className="App-content">
            <Routes>
              <Route path="/" element={<QuizExam />} />
              <Route path="/login" element={<Login />} />

              <Route path="/admin" element={user?.auth ? <Quiz /> : <Navigate to="/login" />} />
              <Route path="/admin/quiz/:id" element={user?.auth ? <Question /> : <Navigate to="/login" />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
