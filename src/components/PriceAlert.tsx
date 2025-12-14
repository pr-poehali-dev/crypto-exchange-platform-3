import { useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface PriceAlertProps {
  symbol: string;
  name: string;
  change: number;
  onClose: () => void;
}

export default function PriceAlert({ symbol, name, change, onClose }: PriceAlertProps) {
  const isPositive = change >= 0;
  const isSignificant = Math.abs(change) >= 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isSignificant) return null;

  return (
    <div className={`fixed top-20 right-4 z-50 animate-slide-up ${
      isPositive ? 'bg-success' : 'bg-destructive'
    } text-white rounded-lg shadow-xl p-4 max-w-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={20} />
          </div>
          <div>
            <p className="font-semibold">{name} ({symbol})</p>
            <p className="text-sm opacity-90">
              {isPositive ? 'Рост' : 'Падение'} {Math.abs(change).toFixed(2)}%
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
}
