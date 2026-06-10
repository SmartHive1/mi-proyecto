import Navbar from './Navbar.jsx'

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[#1A120B] overflow-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
