import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (context) => {
  // console.log(Object.keys(context));
  // console.log("context");

  const client = buildClient(context.ctx);
  let responce;
  try {
    const responce = await client.get("/api/users/currentuser");
    let pageProps = {};
    if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(context.ctx);
    }

    return {
      pageProps,
      ...responce.data,
    };
  } catch (err) {
    return {};
  }
};

export default AppComponent;
