import { Formik, Form } from "formik";
import * as Yup from "yup";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";
import { useEffect, useRef, useState } from "react";
import { signIn, getSession } from "next-auth/react"

const loginSchema = Yup.object().shape({
  email: Yup.string().email(" *Invalid email").required(" *Required"),
  password: Yup.string()
    .min(8, "Passwords must be at least 8 characters")
    .required(" *Required")
});

const handleLogin = (email, password) => {
  console.log(email, password)
  signIn('keystone',
    {
      email,
      password,
      // The page where you want to redirect to after a 
      // successful login
      redirect: true
    }
  )
}


export default function Login({ providers, loginError }) {
  const stripeRef = useRef();
  const [userErrors, setUserErrors] = useState(null);

  useEffect( () => {
    async function testSession () {
      const session = await getSession()        
      if (session) {
        console.log('session login', session)
        
        //router.push('/')
      }   
    } 
    testSession()
  }, [])


  return (
    <>
      <PublicHeader />
      <main className="max-w-lg mt-20 mx-auto min-h-screen md:mx-auto">
        <div>
          <h1 className="text-5xl text-center mb-10">Log into Logly</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values, setSubmitting);
              handleLogin(values.email, values.password)
            }}
            
          >
            {({ values, errors, touched, handleChange, submitForm }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault()
                  submitForm()
                } }
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="email"
                  >
                    Email
                    {errors.email && touched.email ? (
                      <span className="text-red-600">{errors.email}</span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={values.email}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="password"
                  >
                    Password
                    {errors.password && touched.password ? (
                      <span className="text-red-600">{errors.password}</span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    value={values.password}
                  />

                </div>
                <button
                  type="submit"
                  className={`bg-[#002FA7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                Log in
                </button>
                {userErrors && <p className="text-red-600">{userErrors}</p>}
              </Form>
            )}
          </Formik>

          <p className="text-center text-gray-500 text-xs">
            ©2022 Logly, LLC. All rights reserved.
          </p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

// export async function getServerSideProps({ params }) {
  
// }
