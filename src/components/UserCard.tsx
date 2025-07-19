import { UserRound, UsersRound, MapPin, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserProps {
  avatar_url: string;
  name: string;
  login: string;
  followers: number;
  following: number;
  location: string;
  created_at: string;
  username: string;
}

export function UserCard({
  avatar_url,
  name,
  login,
  followers,
  following,
  location,
  created_at,
  username,
}: UserProps) {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-center">
          <Link href={`https://github.com/${username}`} target="_blank">
            <Image
              src={avatar_url}
              alt="User Avatar"
              width={170}
              height={170}
              quality={100}
              className="rounded-xl hover:scale-105 transition-all"
            />
          </Link>
        </div>

        <div className="mt-3 flex flex-col items-center justify-center">
          <h1 className="text-2xl">{name}</h1>
          <p className="text-white/20 flex flex-row">
            <UserRound size={20} /> @{login}
          </p>

          <div className="flex flex-row space-x-3">
            <span className="flex flex-row">
              <UsersRound size={20} />
              Followers: {followers} | Following {following}
            </span>
          </div>

          <span className="flex flex-row">
            <MapPin size={20} />
            Location: {location}
          </span>
          <span className="flex flex-row">
            <CalendarDays size={20} />
            Created:{" "}
            {created_at ? new Date(created_at).toLocaleDateString() : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
