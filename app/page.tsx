import { SignInButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Yoga AI</h1>
      <SignInButton />
    </div>
  );
};

export default Home;
