import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUser } from "../Functions/signupHandling.js";
import signUpImage from "../assets/signUp.jpg";

const validationSchema = Yup.object({
  username: Yup.string().min(3, "Too short").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(5, "Password too short").required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${signUpImage})` }} 
      ></div>

      <div className="relative z-20 min-h-screen flex items-center justify-center px-5">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { user, token } = await signupUser(values);
          
              // These two are technically already saved, but no harm repeating
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
          
              navigate("/tasks", { state: { user } }); // pass user to Tasks page
            } catch (error) {
              console.log(error);
              alert("Sign Up failed. Try Again!");
            } finally {
              setSubmitting(false);
            }
          }}
          
        >
          {({ isSubmitting }) => (
            <Form
              autoComplete="off"
              className="md:w-[500px] w-[350px] bg-white/10 backdrop-blur-lg p-12 rounded-xl border border-white/20 shadow-xl space-y-6"
            >
              <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white">
                  Username
                </label>
                <Field
                  placeholder="username"
                  type="text"
                  name="username"
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white/80"
                />
                <ErrorMessage name="username" component="div" className="text-white p-2 bg-red-600 text-sm" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="JhonDoe@gmail.com"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white/80"
                />
                <ErrorMessage name="email" component="div" className="text-white p-2 bg-red-600 text-sm" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <Field
                  placeholder="password"
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white/80"
                />
                <ErrorMessage name="password" component="div" className="text-white p-2 bg-red-600 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 text-white font-semibold py-2 px-4 rounded hover:bg-amber-700 transition hover:cursor-pointer"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
