import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'exchange';
  from: string;
  to: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  { id: '1', type: 'buy', from: 'USD', to: 'BTC', amount: '0.123', date: '2024-12-14 15:30', status: 'completed' },
  { id: '2', type: 'exchange', from: 'ETH', to: 'USDT', amount: '2.5', date: '2024-12-14 12:15', status: 'completed' },
  { id: '3', type: 'sell', from: 'BTC', to: 'USD', amount: '0.05', date: '2024-12-13 18:45', status: 'pending' },
  { id: '4', type: 'buy', from: 'USD', to: 'SOL', amount: '15', date: '2024-12-13 09:20', status: 'completed' },
  { id: '5', type: 'exchange', from: 'BTC', to: 'ETH', amount: '0.2', date: '2024-12-12 16:00', status: 'completed' },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'buy': return 'ArrowDownToLine';
    case 'sell': return 'ArrowUpFromLine';
    case 'exchange': return 'ArrowLeftRight';
    default: return 'Circle';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'buy': return 'Покупка';
    case 'sell': return 'Продажа';
    case 'exchange': return 'Обмен';
    default: return type;
  }
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'completed': return 'default';
    case 'pending': return 'secondary';
    case 'failed': return 'destructive';
    default: return 'outline';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': return 'Завершено';
    case 'pending': return 'В обработке';
    case 'failed': return 'Ошибка';
    default: return status;
  }
};

export default function TransactionHistory() {
  return (
    <Card className="p-8 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">История операций</h2>
        <Badge variant="outline" className="px-3 py-1">
          {transactions.length} операций
        </Badge>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name={getTypeIcon(tx.type)} size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold">{getTypeLabel(tx.type)}</p>
                <p className="text-sm text-muted-foreground">
                  {tx.amount} {tx.from} → {tx.to}
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <Badge variant={getStatusVariant(tx.status)}>
                {getStatusLabel(tx.status)}
              </Badge>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
