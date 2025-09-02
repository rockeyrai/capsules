'use client'; // Only if you're using App Router and want interactivity

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { path: "/", name: "Home" },
  { path: "/feature", name: "feature" },
  { path: "/feature1", name: "feature1" },
  { path: "/feature2", name: "feature2" },
  { path: "/feature3", name: "feature3" },
  { path: "/footer", name: "footer" },
  { path: "/hero", name: "hero" },
  { path: "/test", name: "test" },
];

export default function Navbar() {
  const pathname = usePathname(); // For highlighting active link

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <ul className="flex gap-4">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              href={route.path}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                pathname === route.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
