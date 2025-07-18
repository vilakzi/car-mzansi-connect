
import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const OfflineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      console.log('App is now online');
      setIsOnline(true);
      setShowOfflineMessage(false);
      toast({
        title: "Back Online!",
        description: "Your connection has been restored.",
      });
    };

    const handleOffline = () => {
      console.log('App is now offline');
      setIsOnline(false);
      setShowOfflineMessage(true);
      toast({
        variant: "destructive",
        title: "No Internet Connection",
        description: "You're now browsing in offline mode. Some features may be limited.",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <div className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
      <div className="bg-destructive/90 text-destructive-foreground rounded-lg shadow-lg p-3 backdrop-blur-sm border border-destructive">
        <div className="flex items-center space-x-2">
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">You're offline</span>
        </div>
        <p className="text-xs mt-1 opacity-90">
          Some features may not work until you reconnect.
        </p>
      </div>
    </div>
  );
};
