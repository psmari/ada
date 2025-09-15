import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-ada-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="text-2xl font-bold text-ada-dark">
              <span className="text-ada-red">A</span>.<span className="text-ada-red">D</span>.<span className="text-ada-red">A</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#sobre" className="text-ada-dark hover:text-ada-red transition-colors duration-300 font-medium">
              Sobre
            </a>
            <a href="#criadores" className="text-ada-dark hover:text-ada-red transition-colors duration-300 font-medium">
              Criadores
            </a>
            <a href="#contato" className="text-ada-dark hover:text-ada-red transition-colors duration-300 font-medium">
              Contato
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-ada-gray transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
