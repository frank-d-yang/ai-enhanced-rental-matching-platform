export default function Header({
                                   user,
                                   visibleNavItems,
                                   activePage,
                                   setActivePage,
                                   handleLogout,
                               }) {
    return (
        <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div>
                    <div className="text-xl font-bold">AI Rental Platform</div>
                    <div className="text-sm text-slate-500">Frontend MVP Mock</div>
                </div>

                <nav className="hidden gap-2 rounded-2xl bg-slate-100 p-1 md:flex">
                    {visibleNavItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActivePage(item.key)}
                            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                activePage === item.key
                                    ? "bg-white text-slate-900 shadow"
                                    : "text-slate-600"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {user ? (
                    <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">
              Welcome, {user.username} ({user.role})
            </span>
                        <button
                            onClick={handleLogout}
                            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setActivePage("register")}
                            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Register
                        </button>
                        <button
                            onClick={() => setActivePage("login")}
                            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}