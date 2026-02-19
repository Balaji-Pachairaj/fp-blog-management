import { useState } from "react";
import { Blog_App_Routes } from "./config";
import { useRouter } from "next/router";

// ── Icons ───────────────────────────────────────────────────────────

const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const BlogIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 4v6h6M8 13h8M8 17h5"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
    />
    <circle cx="9" cy="7" r="4" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
    />
  </svg>
);

const ServicesIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="3" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
    />
  </svg>
);

// ── Nav items config ────────────────────────────────────────────────

const NAV_ITEMS = [
  // { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  {
    id: "blogs",
    label: "Blogs",
    icon: BlogIcon,
    path: Blog_App_Routes.BLOGLIST,
  },
  // { id: "users",     label: "Users",     icon: UsersIcon },
  // { id: "services",  label: "Services",  icon: ServicesIcon },
  // { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
  // { id: "settings",  label: "Settings",  icon: SettingsIcon },
];

// ── NavItem ─────────────────────────────────────────────────────────

function NavItem({ item, isActive, isExpanded, onClick }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  const highlighted = isActive || hovered;

  return (
    <li>
      <button
        onClick={() => onClick(item.id, item?.path)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={!isExpanded ? item.label : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative cursor-pointer
          ${
            isActive
              ? "bg-pink-50 text-[#e8007a]"
              : hovered
                ? "bg-gray-100 text-gray-800"
                : "text-gray-500"
          }`}
      >
        {/* Active indicator bar */}
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#e8007a] rounded-r-full" />
        )}

        {/* Icon */}
        <span
          className={`flex-shrink-0 transition-colors duration-200 ${highlighted ? "text-[#e8007a]" : "text-gray-400"}`}
        >
          <Icon />
        </span>

        {/* Label — only when expanded */}
        {isExpanded && (
          <span
            className={`text-sm font-medium whitespace-nowrap transition-all duration-200 ${isActive ? "font-semibold" : ""}`}
          >
            {item.label}
          </span>
        )}

        {/* Tooltip when collapsed */}
        {!isExpanded && (
          <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50 shadow-lg">
            {item.label}
          </span>
        )}
      </button>
    </li>
  );
}

// ── BlogSideBar ─────────────────────────────────────────────────────

export default function BlogSideBar({ defaultActive = "blogs", onNavChange }) {
  const [activeId, setActiveId] = useState(defaultActive);
  // Matches the screenshot: collapsed (icon-only) sidebar
  const [isExpanded, setIsExpanded] = useState(false);
  const [toggleHovered, setToggleHovered] = useState(false);

  // Navigate Hook
  const router = useRouter();

  const handleNavClick = (id, path) => {
    setActiveId(id);
    if (onNavChange) onNavChange(id);
    if (path) router.push(path);
  };

  return (
    <aside
      className={`h-full bg-white border-r border-gray-200 flex flex-col py-4 transition-all duration-300 ease-in-out
        ${isExpanded ? "w-52" : "w-16"}`}
    >
      {/* Nav items */}
      <nav className="flex-1 px-2">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              isExpanded={isExpanded}
              onClick={handleNavClick}
            />
          ))}
        </ul>
      </nav>

      {/* Expand / Collapse toggle */}
      <div className="px-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => setIsExpanded((v) => !v)}
          onMouseEnter={() => setToggleHovered(true)}
          onMouseLeave={() => setToggleHovered(false)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200
            ${toggleHovered ? "bg-gray-100 text-gray-700" : "text-gray-400"}`}
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {/* Chevron icon rotates based on state */}
          <svg
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          {isExpanded && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

/*
── USAGE ────────────────────────────────────────────────────────────────

import BlogSideBar from "./BlogSideBar";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      <BlogSideBar
        defaultActive="blogs"
        onNavChange={(id) => navigate(`/admin/${id}`)}
      />
      <main className="flex-1 overflow-auto">
        ...
      </main>
    </div>
  );
}

── PROPS ────────────────────────────────────────────────────────────────

| Prop          | Type     | Default   | Description                            |
|---------------|----------|-----------|----------------------------------------|
| defaultActive | string   | "blogs"   | Nav item id active on first render     |
| onNavChange   | function | undefined | Called with item id on nav click       |

── NAV ITEM IDS ─────────────────────────────────────────────────────────
  "dashboard" | "blogs" | "users" | "services" | "analytics" | "settings"

*/
