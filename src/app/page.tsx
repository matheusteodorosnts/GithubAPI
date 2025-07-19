"use client";

import { UserCard } from "@/components/UserCard";
import { useState } from "react";

interface UserProps {
  avatar_url: string;
  name: string;
  login: string;
  followers: number;
  following: number;
  location: string;
  created_at: string;
}

export default function Home() {
  const [username, setUserName] = useState("");
  const [data, setData] = useState<UserProps | null>(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();

    if (username.trim()) {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_SECRET_KEY_GITHUB}`,
        },
      });

      const userData: UserProps = await response.json();
      setData(userData);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center min-h-screen bg-gradient-to-tl from-black to-zinc-800 font-[Ubuntu] text-white">
      <form method="GET" className="relative mr-[400px] space-x-2">
        <h1 className="text-4xl text-white mb-5 text-center">Github API</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="peer bg-transparent border-1 border-zinc-700/80 focus:border-white text-white rounded-xl p-3 w-80 focus:outline-none"
        />
        <button
          className="bg-white p-3 w-20 rounded-xl text-black cursor-pointer 
             hover:shadow-[0_0_7px_0_rgba(255,255,255,0.8)] 
             transition-all duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>

      {data && (
        <div className="relative">
          <UserCard
            avatar_url={data.avatar_url}
            name={data.name}
            login={data.login}
            followers={data.followers}
            following={data.following}
            location={data.location}
            created_at={data.created_at}
            username={`${username}`}
          />
        </div>
      )}
    </div>
  );
}
