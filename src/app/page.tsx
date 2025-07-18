"use client";

import { useState } from "react";
import Image from "next/image";

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
    <div className="flex flex-col space-y-2 justify-center items-center min-h-screen bg-gradient-to-tl from-black to-zinc-800 font-[Ubuntu] text-white">
      <h1 className="text-4xl text-white mb-5">Github API</h1>
      <form method="GET" className="space-x-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="peer bg-transparent border-1 border-zinc-700/80 focus:border-white text-white rounded-xl p-3 w-80 focus:outline-none"
        />
        <button
          className="bg-white p-3 w-20 rounded-xl text-black cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-col space-y-1">
        {data?.avatar_url && (
          <div className="flex items-center justify-center">
            <Image
              src={data.avatar_url}
              alt="User Avatar"
              width={100}
              height={100}
              quality={100}
              className="rounded"
            />
          </div>
        )}

        <h1>Name: {data?.name}</h1>
        <p>Login: {data?.login}</p>
        <span>Followers: {data?.followers}</span>
        <span>Following: {data?.following}</span>
        <span>Local: {data?.location}</span>
        <span>
          Created:{" "}
          {data?.created_at
            ? new Date(data.created_at).toLocaleDateString()
            : ""}
        </span>
      </div>
    </div>
  );
}
