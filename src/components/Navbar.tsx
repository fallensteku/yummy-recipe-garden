
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Recipes', href: '/recipes' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="font-serif text-2xl font-semibold tracking-tight">
              Savory
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors duration-200 font-medium ${
                  location.pathname === link.href
                    ? 'text-spice-500'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {link.text}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button
              className="btn btn-icon btn-ghost hidden md:flex"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              className="btn btn-icon btn-ghost md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-4 text-base font-medium border-b border-sand-100 ${
                  location.pathname === link.href
                    ? 'text-spice-500'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {link.text}
              </Link>
            ))}
            <div className="px-3 py-4 flex items-center border-b border-sand-100">
              <Search className="w-5 h-5 mr-2" />
              <span className="text-foreground/80">Search recipes</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
