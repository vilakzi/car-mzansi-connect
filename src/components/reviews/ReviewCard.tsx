
import { Star, ThumbsUp, Flag, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ReviewCardProps {
  review: {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title: string;
    content: string;
    createdAt: string;
    verified: boolean;
    helpful: number;
    carModel: string;
    dealership: string;
  };
  onHelpful: (reviewId: string) => void;
  onReport: (reviewId: string) => void;
}

export const ReviewCard = ({ review, onHelpful, onReport }: ReviewCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-orange text-orange' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const userInitials = review.userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="bg-card border-border shadow-elegant">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.userAvatar} alt={review.userName} />
              <AvatarFallback className="bg-orange text-orange-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-foreground">{review.userName}</h4>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReport(review.id)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h5 className="font-medium text-foreground mb-2">{review.title}</h5>
          <p className="text-muted-foreground leading-relaxed">{review.content}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{review.carModel}</span>
            <span>•</span>
            <span>{review.dealership}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onHelpful(review.id)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            Helpful ({review.helpful})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
