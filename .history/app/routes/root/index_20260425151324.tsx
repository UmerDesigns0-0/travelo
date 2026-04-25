import { redirect } from "react-router";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) {
      return redirect("/sign-in");
    }
    // const existingUser = await getExistingUser(user.$id);
    // if (existingUser?.status !== "admin") {
    //   return redirect("/");
    // }
    // return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error fetching user data:", error);
    return redirect("/sign-in");
  }
}

const redirectButton = async () => {
  const user = await account.get();
  if (user.$id) {
    redirect("/trips");
  } else {
    redirect("/sign-in");
  }
}

const Home = () => {
  return (
    <main className="get-started">
      <section className="flex-center glassmorphism size-full px-6">
        <div className="get-started-card text-center">
          <h1 className="text-3xl font-bold">Welcome to Travelo</h1>
          <p className="text-slate-500 mt-4">
            Get started with Travelo and turn your dream trip into reality.
            Create personalized, AI-powered itineraries in seconds—simple, fun,
            and perfectly tailored to you.
          </p>
          <button className="mt-4 flex justify-center md:w-md w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-500/90 transition duration-300 cursor-pointer" onClick={() => redirect("/trips")}>
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
