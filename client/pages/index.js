import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser); 
 
  return <h1>Landing Page</h1>;
};
   
LandingPage.getInitialProps = async (context) => {
  const responce = await axios.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });
  return responce.data;
}

  export default LandingPage;