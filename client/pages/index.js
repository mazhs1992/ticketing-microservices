import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log("currentUser");
  console.log(currentUser);
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  let responce;
  console.log("Landing");
  try {
    const responce = await client.get("/api/users/currentuser");

    return responce.data;
  } catch (err) {
    return {};
  }
  return {};
};

export default LandingPage;
