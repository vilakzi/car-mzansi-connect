
import { useState } from 'react';
import { Search, Calculator, Menu, Car, Bell, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { UserDropdown } from '@/components/UserDropdown';

interface NavigationProps {
  onSearchChange: (query: string) => void;
  onShowCalculator: () => void;
}

export const Navigation = ({ onSearchChange, onShowCalculator }: NavigationProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    tab: 'login' | 'signup';
  }>({ isOpen: false, tab: 'login' });
  
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, tab });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, tab: 'login' });
  };

  return (
    <>
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-orange rounded-lg shadow-orange-glow">
                <Car className="w-6 h-6 text-orange-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Car Mzansi</h1>
                <p className="text-xs text-orange font-semibold">RIDE HUB</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-foreground hover:text-orange">
                Browse Cars
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-orange">
                Dealerships
              </Button>
              <Button
                variant="ghost"
                onClick={onShowCalculator}
                className="text-foreground hover:text-orange"
              >
                Finance
              </Button>
            </div>

            {/* Search Bar */}
            {!isMobile && (
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search cars, brands, or dealerships..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 bg-background/50 border-border focus:bg-background focus:border-orange transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {!isMobile && user && (
                <Button variant="orange" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Car
                </Button>
              )}

              {/* Notifications - only show for logged in users */}
              {user && (
                <Button variant="ghost" size="icon" className="relative text-foreground hover:text-orange">
                  <Bell className="w-5 h-5" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-orange border-orange"
                  >
                    3
                  </Badge>
                </Button>
              )}

              {/* Authentication */}
              {user ? (
                <UserDropdown />
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => openAuthModal('login')}
                    className="text-foreground hover:text-orange"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="orange" 
                    size="sm"
                    onClick={() => openAuthModal('signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        defaultTab={authModal.tab}
      />
    </>
  );
};
