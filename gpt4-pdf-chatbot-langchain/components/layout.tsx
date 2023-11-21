interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-2 bg-secondary shadow-sm shadow-gray-500">
        <div className="p-2 m-auto">
          <div className="flex justify-between items-center">
            <ul className="flex items-center space-x-6">
              <li>
                <button className="text-white font-semibold text-xl" disabled>
                  <img src="./stack.jpg" className="h-8" />
                </button>
              </li>
              <li>
                <button
                  className="text-white font-semibold text-xl pb-2"
                  disabled
                >
                  Semantic Search
                </button>
              </li>
            </ul>

            <ul className="flex items-center space-x-6">
              <li>
                <button className="text-white font-semibold text-base">
                  Request A Document
                </button>
              </li>
              <li>
                <button
                  className="text-white font-semibold text-base"
                  onClick={() => {
                    window.location.href = 'http://localhost:3000/';
                  }}
                >
                  Logout
                </button>
              </li>
              <li>
                <button className="text-white font-semibold text-lg w-8"></button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-300">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
