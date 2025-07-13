import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logInImage from "../assets/BackgroundImage.jpg";
import TodoIcon from "../assets/TodoIcon.png"
import { loginUser } from "../services/loginHandling.services";


const validationSchema = Yup.object({
  username: Yup.string().min(3, "Too short").required("Username is required"),
  password: Yup.string()
    .min(5, "Password cannot be less than 5 characters")
    .required("Password is required"),
});

const LogIn = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
          
    <div className="relative min-h-screen flex items-center justify-center">
   
      <div
        
        className="absolute inset-0 bg-cover bg-center z-0 "
        style={{ backgroundImage: `url(${logInImage})` }}
      ></div>
       
      <div className="absolute inset-0 bg-black opacity-50 z-13 "></div>

      <div className="relative m-auto z-20 min-h-screen flex items-center justify-center text-center ">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const user = await loginUser(values);
              navigate("/welcome", { state: { user } });
            } catch (error) {
              alert(error.message || "Login failed!");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form
              autoComplete="off"
              className="md:w-[400px] w-[350px] text-sm p-5 rounded-xl border border-white/20 shadow-xl rounded-2xl space-y-6 "
            >

              <img src={TodoIcon} alt="TodoIcon" className="w-10 h-10 m-auto" />
              <h2 className="text-2xl text-center text-white">
                Log In
              </h2>
              <h3 className="text-white">Do not have an account? <Link to="/signup" className="hover:border-b">Sign up</Link></h3>

              <div  className="text-left">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white ml-12"
                >
                  Username
                </label>
                <Field
                  placeholder="username"
                  type="text"
                  name="username"
                  id="username"
                  className="mt-1 block w-3/4 m-auto border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none bg-white/80 "
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-white text-sm ml-12"
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white ml-12"
                >
                  Password
                </label>
                <Field
                  placeholder="password"
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-3/4 m-auto border border-gray-300 rounded-2xl px-3 py-2  focus:outline-none bg-white/80"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-white text-sm ml-12"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-3/4 m-auto mt-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded-2xl hover:bg-gray-600 transition hover:cursor-pointer"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default LogIn;
