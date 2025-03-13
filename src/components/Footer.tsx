
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-sand-100 border-t border-sand-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="font-serif text-2xl font-semibold">
              Savory
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Discover simple, delicious recipes that bring joy to your table. Our curated collection focuses on quality ingredients and straightforward techniques.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Recipes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/recipes?category=breakfast" className="text-muted-foreground hover:text-foreground transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=main-course" className="text-muted-foreground hover:text-foreground transition-colors">
                  Main Course
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=dessert" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dessert
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-sand-200 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Savory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
