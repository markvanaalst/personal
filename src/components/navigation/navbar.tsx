import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import { ThemeToggle } from '../theme/theme-toggle';
import { Logo } from '../common/logo';

const Navbar = () => {
  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flew-row items-center h-full gap-4">
          <Logo className="h-12" />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button>Get Started</Button> */}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
