import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logInImage from "../assets/logIn.jpg";
import { loginUser } from "../services/loginHandling.services";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'

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
      <Navbar/>

    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${logInImage})` }}
      ></div>

      <div className="relative z-20 min-h-screen mt-10 flex items-center justify-center px-4">
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
              className="md:w-[500px] w-[350px] bg-white/20 backdrop-blur-sm p-12 rounded-xl border border-white/20 shadow-xl space-y-6"
            >
              <h2 className="text-2xl font-bold text-center text-white">
                Log In
              </h2>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white"
                >
                  Username
                </label>
                <Field
                  placeholder="username"
                  type="text"
                  name="username"
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white/80"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-900 p-2  text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <Field
                  placeholder="password"
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white/80"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-900 p-2 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition hover:cursor-pointer"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default LogIn;
