import request from "supertest";
import { app } from "../../app";

it("clears the cookies after sign out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const responce = await request(app).post("/api/users/signout").expect(200);
  expect(responce.get("Set-Cookie")).toBeUndefined;
});


