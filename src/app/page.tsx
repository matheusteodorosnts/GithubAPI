"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserRound, UsersRound, MapPin, CalendarDays } from "lucide-react";

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
          className="bg-white p-3 w-20 rounded-xl text-black cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>

      {data && (
        <div className="relative">
          {data?.avatar_url && (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-center">
                <Link href={`https://github.com/${username}`} target="_blank">
                  <Image
                    src={data.avatar_url}
                    alt="User Avatar"
                    width={170}
                    height={170}
                    quality={100}
                    className="rounded-xl hover:scale-105 transition-all"
                  />
                </Link>
              </div>

              <div className="mt-3 flex flex-col items-center justify-center">
                <h1 className="text-2xl">{data?.name}</h1>
                <p className="text-white/20 flex flex-row">
                  <UserRound size={20} /> @{data?.login}
                </p>

                <div className="flex flex-row space-x-3">
                  <span className="flex flex-row">
                    <UsersRound size={20} />
                    Followers: {data?.followers} | Following {data.following}
                  </span>
                </div>

                <span className="flex flex-row">
                  <MapPin size={20} />
                  Location: {data?.location}
                </span>
                <span className="flex flex-row">
                  <CalendarDays size={20} />
                  Created:{" "}
                  {data?.created_at
                    ? new Date(data.created_at).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
