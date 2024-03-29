import { useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  })

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest()

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container-md ">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group mt-3 mb-3">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mt-3 mb-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        {errors}
        <button className="btn btn-primary mt-3 mb-3">Sign Up</button>
      </form>
    </div>
  );
};
