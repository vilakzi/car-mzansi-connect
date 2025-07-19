
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface WishlistButtonProps {
  carId: string;
  isInWishlist?: boolean;
  variant?: 'default' | 'icon';
  size?: 'sm' | 'default' | 'lg';
}

export const WishlistButton = ({ 
  carId, 
  isInWishlist = false, 
  variant = 'default',
  size = 'default'
}: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleToggleWishlist = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save cars to your wishlist.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    
    toast({
      title: newWishlistState ? "Added to wishlist" : "Removed from wishlist",
      description: newWishlistState 
        ? "This car has been saved to your wishlist." 
        : "This car has been removed from your wishlist.",
    });
    
    setIsLoading(false);
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleWishlist}
        disabled={isLoading}
        className={`transition-colors ${
          isWishlisted 
            ? 'text-red-500 hover:text-red-600' 
            : 'text-muted-foreground hover:text-red-500'
        }`}
      >
        <Heart 
          className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} 
        />
      </Button>
    );
  }

  return (
    <Button
      variant={isWishlisted ? "destructive" : "orange-outline"}
      size={size}
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className="transition-all"
    >
      <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </Button>
  );
};
