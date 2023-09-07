import * as formik from "formik";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { signupWithEmail } from "../../redux/slices/auth/action";
import { useAppDispatch } from "../../redux/store/hooks";

const SignUpComponent = () => {
  const dispatch = useAppDispatch();
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup
      .string()
      .email("Invalid email address")
      .required()
      .test("Validate Email", "Invalid email address", (value) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
      }),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const handleSubmit = async (formValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    dispatch(
      signupWithEmail({
        signUpInfo: formValues,
      })
    );
  };
  return (
    <>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>
            Chat Application
            <br /> SignUp Page
          </h2>
          <p>SignUp from here to access.</p>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" className="mt-3">
                      <Form.Control
                        className="btn btn-primary"
                        type="submit"
                        value="Sign Up"
                      />
                    </Form.Group>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpComponent;
