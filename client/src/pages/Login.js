import { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import colors from "../utils/colors";
import { LOGIN_USER } from "../utils/graphql";

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: ""
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } = {} }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          icon="user"
          iconPosition="left"
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          icon="key"
          iconPosition="left"
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />
        <Button type="submit" color={colors.primary}>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
