import { Blog_App_Full_API, Blog_App_Routes } from "@/blog_components/config";
import { setToken } from "@/blog_components/config/utils";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const EyeOpenIcon = () => (
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
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeClosedIcon = () => (
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
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.53 6.53A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.423 5.276M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
    />
  </svg>
);

const SHAILogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#fdf0f7" />
    <rect x="16" y="8" width="4" height="20" rx="2" fill="#e8007a" />
    <rect x="8" y="16" width="20" height="4" rx="2" fill="#8b2fc9" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 17L17 7M7 7h10v10"
    />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="white"
      strokeWidth="4"
    />
    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

// ── Validation helpers ──────────────────────────────────────────────
const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

const validate = ({ email, password }) => {
  const errors = {};
  if (!email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
};

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  children,
}) => {
  const hasError = touched && error;
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-all focus:outline-none pr-11
            ${
              hasError
                ? "border-[#e8007a] focus:border-[#e8007a] focus:shadow-[0_0_0_3px_rgba(232,0,122,0.12)]"
                : "border-gray-200 focus:border-[#e8007a] focus:shadow-[0_0_0_3px_rgba(232,0,122,0.12)]"
            }`}
        />
        {children}
      </div>
      {hasError && <p className="mt-1.5 text-xs text-[#e8007a]">{error}</p>}
    </div>
  );
};

// ── Main Login Component ────────────────────────────────────────────
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const errors = validate(form);
  const isFormValid = Object.keys(errors).length === 0;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSuccess(false);
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields to show errors
    setTouched({ email: true, password: true });
    if (!isFormValid) return;

    setIsLoading(true);
    setSuccess(false);

    const { email, password } = form;

    try {
      const response = await axios.get(Blog_App_Full_API.LOGIN, {
        params: {
          email: email,
          password: password,
        },
      });

      setToken(response?.data?.token);
      setSuccess(true);
      router.push(Blog_App_Routes.BLOGLIST);
    } catch (err) {
      console.log("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-sm w-full max-w-xl px-12 py-14 animate-[slideUp_0.5s_cubic-bezier(.22,.68,0,1.2)_both]">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            This login is for admin users
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              placeholder="Email Address"
            />

            {/* Password */}
            <InputField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              placeholder="Password"
            >
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            </InputField>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e8007a] hover:bg-[#c5006a] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  <span>Logging in…</span>
                </>
              ) : (
                <span>Log in</span>
              )}
            </button>

            {/* Success */}
            {success && (
              <div className="mt-5 text-center text-sm text-emerald-600 font-medium bg-emerald-50 border border-emerald-200 rounded-lg py-2.5">
                ✓ Login successful! Redirecting…
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Tailwind keyframe for card slide-up */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
