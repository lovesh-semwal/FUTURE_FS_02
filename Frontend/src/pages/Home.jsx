import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto! flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold">ClientTrack</h1>

          <Link
            to="/login"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:bg-slate-800"
          >
            Admin Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="mx-auto! max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Client Lead Management System
          </p>

          <h2 className="text-5xl font-bold leading-tight">
            Turn website inquiries into valuable clients.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            ClientTrack helps businesses collect, manage, track, and convert
            leads from their website in one simple dashboard.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/contact"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Contact Form
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
            >
              Admin Login
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">Lead Management</h3>
            <p className="mt-3 text-slate-400">
              Store and manage customer inquiries from your website.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">Track Progress</h3>
            <p className="mt-3 text-slate-400">
              Track leads from new to contacted and finally converted.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">Simple Analytics</h3>
            <p className="mt-3 text-slate-400">
              View lead statistics and understand your current pipeline.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;