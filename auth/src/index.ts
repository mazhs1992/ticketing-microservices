import express from "express";
import { json } from "body-parser";
import { currentUserRouter, } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signinUserRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinUserRouter);
app.use(signupRouter);


//MIDDLEWARE
app.use(errorHandler);

app.get('/api/users', (req, res) => {
  res.send('Hi from users service!');
})


app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!Yeah");
});
