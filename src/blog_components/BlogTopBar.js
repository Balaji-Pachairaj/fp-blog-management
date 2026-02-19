import { useState } from "react";

// ── Icons ───────────────────────────────────────────────────────────

const SHAILogo = () => (
  <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#fdf0f7" />
    <rect x="16" y="8" width="4" height="20" rx="2" fill="#e8007a" />
    <rect x="8" y="16" width="20" height="4" rx="2" fill="#8b2fc9" />
  </svg>
);

const PlusIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
  </svg>
);

const AdminIcon = () => (
  <svg
    className="w-9 h-9 text-gray-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
    />
  </svg>
);

// ── BlogTopBar ──────────────────────────────────────────────────────

export default function BlogTopBar({
  adminName = "Admin User Name",
  onNewBlog,
  onLogout,
}) {
  const [newBlogHovered, setNewBlogHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);
  const [adminHovered, setAdminHovered] = useState(false);

  // ── Handlers (override via props) ──
  const handleNewBlog = () => {
    if (onNewBlog) return onNewBlog();
    console.log("New Blog clicked");
  };

  const handleLogout = () => {
    if (onLogout) return onLogout();
    console.log("Logout clicked");
  };

  const handleAdminClick = () => {
    console.log("Admin profile clicked");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 font-sans">
      {/* ── Left: Logo + Title ── */}
      <div className="flex items-center gap-2">
        <SHAILogo />
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          SHAI Blogs
        </span>
      </div>

      {/* ── Right: New Blog + Admin ── */}
      <div className="flex items-center gap-5">
        {/* New Blog Button */}
        <button
          onClick={handleNewBlog}
          onMouseEnter={() => setNewBlogHovered(true)}
          onMouseLeave={() => setNewBlogHovered(false)}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold border-2 border-[#e8007a] transition-all duration-200 active:scale-95
            ${
              newBlogHovered
                ? "bg-[#e8007a] text-white shadow-md shadow-pink-200"
                : "bg-pink-50 text-[#e8007a]"
            }`}
        >
          <PlusIcon />
          New Blog
        </button>

        {/* Admin Section */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <button
            onClick={handleAdminClick}
            onMouseEnter={() => setAdminHovered(true)}
            onMouseLeave={() => setAdminHovered(false)}
            className={`rounded-full border-2 transition-all duration-200
              ${adminHovered ? "border-[#e8007a] shadow-sm" : "border-gray-200"}`}
            title="Admin profile"
          >
            <AdminIcon />
          </button>

          {/* Name + Logout */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-800">
              {adminName}
            </span>
            <button
              onClick={handleLogout}
              onMouseEnter={() => setLogoutHovered(true)}
              onMouseLeave={() => setLogoutHovered(false)}
              className={`flex items-center gap-1 text-xs font-medium transition-all duration-150 w-fit
                ${logoutHovered ? "text-red-600 underline" : "text-[#e8007a]"}`}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/*
── USAGE ────────────────────────────────────────────────────────────────

import BlogTopBar from "./BlogTopBar";

function App() {
  return (
    <BlogTopBar
      adminName="Admin User Name"
      onNewBlog={() => navigate("/blog/new")}
      onLogout={() => {
        clearSession();
        navigate("/login");
      }}
    />
  );
}

── PROPS ────────────────────────────────────────────────────────────────

| Prop        | Type     | Default           | Description                  |
|-------------|----------|-------------------|------------------------------|
| adminName   | string   | "Admin User Name" | Displayed admin name         |
| onNewBlog   | function | console.log       | Fired on "+ New Blog" click  |
| onLogout    | function | console.log       | Fired on "Logout" click      |

*/
