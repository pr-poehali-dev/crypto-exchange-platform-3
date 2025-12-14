import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
}

export default function CryptoCard({ name, symbol, price, change24h, icon }: CryptoCardProps) {
  const isPositive = change24h >= 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{symbol}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
          <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={16} />
          <span>{isPositive ? '+' : ''}{change24h.toFixed(2)}%</span>
          <span className="text-muted-foreground ml-1">24ч</span>
        </div>
      </div>
    </Card>
  );
}
