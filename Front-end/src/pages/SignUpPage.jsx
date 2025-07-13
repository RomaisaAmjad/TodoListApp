import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUser } from "../services/signupHandling.services.js";
import signUpImage from "../assets/BackgroundImage.jpg";
import TodoIcon from "../assets/TodoIcon.png"


const validationSchema = Yup.object({
  username: Yup.string().min(3, "Too short").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password too short")
    .required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
    <div className="relative  min-h-screen  justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${signUpImage})` }}
      ></div>
          <div className="absolute inset-0 bg-black opacity-50 z-13 "></div>

      <div className="relative m-auto z-20 min-h-screen flex items-center text-center justify-center">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { user, token } = await signupUser(values);
              console.log("Form submitted values:", values);
              navigate("/welcome", { state: { user } });
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
              className="md:w-[400px] w-[350px] text-sm p-5 rounded-xl border border-white/20 shadow-xl rounded-2xl space-y-6"
            >
               <img src={TodoIcon} alt="TodoIcon" className="w-10 h-10 m-auto" />
              <h2 className="text-2xl text-white">
                Sign Up
              </h2>
              <h3 className="text-white">Already have an account? <Link to="/login" className="hover:border-b" >Log in</Link></h3>

              <div className="text-left">
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
                  className="mt-1 block w-3/4 m-auto border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none bg-white/80"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-white text-sm ml-12"
                />
              </div>

              <div className="text-left" >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white ml-12"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="JhonDoe@gmail.com"
                  className="mt-1 block w-3/4 m-auto border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none bg-white/80"
                />
                <ErrorMessage
                  name="email"
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
                  className="mt-1 block w-3/4 m-auto border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none bg-white/80"
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
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
