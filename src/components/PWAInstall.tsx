
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('PWA install prompt available');
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install banner after a short delay
      setTimeout(() => {
        setShowInstallBanner(true);
      }, 5000);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      toast({
        title: "App Installed!",
        description: "Car Mzansi Connect has been added to your home screen.",
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        toast({
          title: "Installing App...",
          description: "Car Mzansi Connect is being added to your home screen.",
        });
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    } catch (error) {
      console.error('Error during app installation:', error);
      toast({
        variant: "destructive",
        title: "Installation Failed",
        description: "There was an error installing the app. Please try again.",
      });
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || !showInstallBanner || !deferredPrompt) {
    return null;
  }

  // Check if user dismissed this session
  if (sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-gradient-orange rounded">
              <Download className="w-4 h-4 text-orange-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Install App</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={handleDismiss}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Install Car Mzansi Connect for a better experience with offline access and faster loading.
        </p>
        
        <div className="flex space-x-2">
          <Button 
            variant="orange" 
            size="sm" 
            onClick={handleInstallClick}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Install
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDismiss}
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
};
