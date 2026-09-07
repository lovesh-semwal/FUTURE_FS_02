import { Link } from "react-router-dom";

function Navbar({ admin, onLogout }) {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto! flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-slate-900"
        >
          ClientTrack
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {admin?.name}
            </p>

            <p className="text-xs text-slate-500">
              {admin?.email}
            </p>
          </div>

          <Link
            to="/contact"
            target="_blank"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Contact Form
          </Link>

          <button
            onClick={onLogout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;