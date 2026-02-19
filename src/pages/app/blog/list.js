import BlogAppLayout from "@/blog_components/BlogAppLayout";
import BlogSideBar from "@/blog_components/BlogSideBar";
import BlogTopBar from "@/blog_components/BlogTopBar";
import { useState, useEffect, useCallback, useRef } from "react";

// ════════════════════════════════════════════════════════════════════
//  API LAYER  (replace BASE_URL with your backend)
// ════════════════════════════════════════════════════════════════════

const BASE_URL = process.env.REACT_APP_API_URL || "https://your-api.com/api";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
});

export const blogApi = {
  /** GET /blogs?search=&page=&limit= */
  fetchAll: async ({ search = "", page = 1, limit = 20 } = {}) => {
    const params = new URLSearchParams({ search, page, limit });
    const res = await fetch(`${BASE_URL}/blogs?${params}`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs (${res.status})`);
    return res.json(); // expects { blogs: [], total: number }
  },

  /** GET /blogs/:id */
  fetchById: async (id) => {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`Failed to fetch blog (${res.status})`);
    return res.json();
  },

  /** POST /blogs */
  create: async (data) => {
    const res = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to create blog (${res.status})`);
    return res.json();
  },

  /** PUT /blogs/:id */
  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update blog (${res.status})`);
    return res.json();
  },

  /** DELETE /blogs/:id */
  remove: async (id) => {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`Failed to delete blog (${res.status})`);
    return res.json();
  },

  /** POST /auth/logout */
  logout: async () => {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: authHeaders(),
    });
    localStorage.removeItem("token");
  },
};

// ════════════════════════════════════════════════════════════════════
//  MOCK DATA  (remove once real API is connected)
// ════════════════════════════════════════════════════════════════════

const MOCK_BLOGS = Array.from({ length: 11 }, (_, i) => ({
  id: String(i + 1).padStart(3, "0"),
  title: "New Blog created ....",
  createdBy: "Balaij Pachairaj",
  status: [
    "Draft",
    "Live",
    "De-listed",
    "Deleted",
    "Draft",
    "Draft",
    "Draft",
    "Draft",
    "Live",
    "De-listed",
    "Deleted",
  ][i],
  link: `https://shai.health/blog/${i + 1}`,
}));

// ════════════════════════════════════════════════════════════════════
//  ICONS
// ════════════════════════════════════════════════════════════════════

const SHAILogo = () => (
  <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#fdf0f7" />
    <rect x="16" y="8" width="4" height="20" rx="2" fill="#e8007a" />
    <rect x="8" y="16" width="20" height="4" rx="2" fill="#8b2fc9" />
  </svg>
);

const icons = {
  Plus: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
    </svg>
  ),
  Admin: () => (
    <svg
      className="w-9 h-9 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  Logout: () => (
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
  ),
  Search: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35"
      />
    </svg>
  ),
  Link: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  ),
  Edit: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
  Refresh: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  ),
  Dashboard: () => (
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
  ),
  Blog: () => (
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
  ),
  Users: () => (
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
  ),
  Services: () => (
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
  ),
  Analytics: () => (
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
  ),
  Settings: () => (
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
  ),
  Chevron: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
};

// ════════════════════════════════════════════════════════════════════
//  STATUS BADGE
// ════════════════════════════════════════════════════════════════════

const STATUS_STYLES = {
  Draft: "bg-gray-500 text-white",
  Live: "bg-green-500 text-white",
  "De-listed": "bg-orange-400 text-white",
  Deleted: "bg-red-500 text-white",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[status] || "bg-gray-200 text-gray-700"}`}
  >
    {status}
  </span>
);

// ════════════════════════════════════════════════════════════════════
//  BLOG LIST  (with API fetching + search + skeleton)
// ════════════════════════════════════════════════════════════════════

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100 animate-pulse">
      {[140, 220, 140, 90, 60, 40].map((w, i) => (
        <td key={i} className="px-5 py-4">
          <div
            className="h-3.5 bg-gray-200 rounded-full"
            style={{ width: w }}
          />
        </td>
      ))}
    </tr>
  );
}

function BlogList({ onEdit, onLinkClick }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);
  const debounceRef = useRef(null);

  // Debounce search input
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQ(val), 350);
  };

  // ── Load blogs ──────────────────────────────────────────────────
  const loadBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // ── SWAP THIS BLOCK for real API call ──────────────────────
      // const data = await blogApi.fetchAll({ search: debouncedQ });
      // setBlogs(data.blogs);
      // ──────────────────────────────────────────────────────────

      // Mock: filter locally and simulate network delay
      await new Promise((r) => setTimeout(r, 800));
      const q = debouncedQ.toLowerCase();
      const filtered = MOCK_BLOGS.filter(
        (b) =>
          !q ||
          b.id.includes(q) ||
          b.title.toLowerCase().includes(q) ||
          b.createdBy.toLowerCase().includes(q) ||
          b.status.toLowerCase().includes(q),
      );
      setBlogs(filtered);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [debouncedQ]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  return (
    <div className="flex-1 p-8 overflow-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Blog Lists</h1>

      {/* Search bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-72 focus-within:border-[#e8007a] focus-within:shadow-[0_0_0_3px_rgba(232,0,122,0.1)] transition-all">
          <span className="text-gray-400">
            <icons.Search />
          </span>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by Text or ID"
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>

        {/* Refresh button */}
        <button
          onClick={loadBlogs}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-all"
          title="Refresh"
        >
          <icons.Refresh /> Refresh
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <span>⚠ {error}</span>
          <button onClick={loadBlogs} className="ml-auto underline text-xs">
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#e8c99e] text-gray-800">
              {["ID", "Title", "Created by", "Status", "Link", "Edit"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left font-semibold tracking-wide text-xs uppercase"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : blogs.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center text-gray-400 text-sm"
                >
                  No blogs found{debouncedQ ? ` for "${debouncedQ}"` : ""}.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog.id + blog.status}
                  onMouseEnter={() => setHoveredRow(blog.id + blog.status)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-b border-gray-100 transition-colors duration-150 ${hoveredRow === blog.id + blog.status ? "bg-pink-50/40" : "bg-white"}`}
                >
                  <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">
                    {blog.id}
                  </td>
                  <td className="px-5 py-3.5 text-gray-800 font-medium">
                    {blog.title}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {blog.createdBy}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={blog.status} />
                  </td>

                  {/* Link */}
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => onLinkClick?.(blog)}
                      className="text-gray-400 hover:text-[#e8007a] transition-colors duration-150"
                      title={blog.link}
                    >
                      <icons.Link />
                    </button>
                  </td>

                  {/* Edit */}
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => onEdit?.(blog)}
                      className="text-gray-400 hover:text-[#e8007a] transition-colors duration-150"
                      title={`Edit blog ${blog.id}`}
                    >
                      <icons.Edit />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Row count */}
      {!loading && blogs.length > 0 && (
        <p className="mt-3 text-xs text-gray-400">
          Showing {blogs.length} {blogs.length === 1 ? "blog" : "blogs"}
          {debouncedQ ? ` matching "${debouncedQ}"` : ""}
        </p>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  BLOG DASHBOARD  (root component — combines everything)
// ════════════════════════════════════════════════════════════════════

export default function BlogDashboard() {
  const [activeNav, setActiveNav] = useState("blogs");

  // ── Top-level action handlers ──────────────────────────────────
  const handleNewBlog = () => {
    // navigate("/admin/blogs/new") or open a modal
    console.log("➕ New Blog");
  };

  const handleLogout = async () => {
    try {
      await blogApi.logout();
      // navigate("/login")
      console.log("👋 Logged out");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleNavChange = (id) => {
    setActiveNav(id);
    // navigate(`/admin/${id}`) if using a router
    console.log("🔀 Navigate to:", id);
  };

  const handleEdit = (blog) => {
    // navigate(`/admin/blogs/${blog.id}/edit`) or open edit modal
    console.log("✏️ Edit blog:", blog);
  };

  const handleLinkClick = (blog) => {
    window.open(blog.link, "_blank", "noopener,noreferrer");
  };

  return (
    <BlogAppLayout>
      {activeNav === "blogs" ? (
        <BlogList onEdit={handleEdit} onLinkClick={handleLinkClick} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          <div className="text-center">
            <p className="text-4xl mb-3">🚧</p>
            <p className="font-medium capitalize">
              {activeNav} section coming soon
            </p>
          </div>
        </div>
      )}
    </BlogAppLayout>
  );
}
