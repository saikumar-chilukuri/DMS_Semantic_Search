interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="h-16 border-b border-b-slate-200 py-4">
          <ul className="flex items-center space-x-4">
            <li>
              <nav className="ml-4 pl-6">
                <a
                  href="http://localhost:3001/"
                  className="hover:text-slate-600 cursor-pointer"
                >
                  Home
                </a>
              </nav>
            </li>
            <li className="ml-4 pl-6 hover:text-slate-600 cursor-pointer">
              <button onClick={() => alert('Upload Documents!!!')}>
                Ask for Document
              </button>
            </li>
            <li className="ml-4 pl-6 hover:text-slate-600 cursor-pointer">
              <button onClick={() => alert('Logout!')}>Logout</button>
            </li>
          </ul>
        </div>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
