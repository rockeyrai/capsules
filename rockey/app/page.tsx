'use client'
import { useRouter } from "next/navigation";

 const page = () => {
    const router = useRouter();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to my Sub-Project!</h1>
      <div>
        <p>Hero</p>
        <button onClick={() => router.push("/hero")}> Hero Landing Page</button>

      </div>
      <div><p>Feature</p>
        <button onClick={() => router.push("/feature")}> background change on hover</button>
      </div>
    </div>
  );
};

export default page;