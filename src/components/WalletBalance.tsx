import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WalletItem {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  icon: string;
}

const wallets: WalletItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.5432, value: 23500, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', amount: 3.245, value: 7400, icon: 'Ξ' },
  { symbol: 'USDT', name: 'Tether', amount: 5000, value: 5000, icon: '₮' },
  { symbol: 'SOL', name: 'Solana', amount: 15.8, value: 1548, icon: '◎' },
];

export default function WalletBalance() {
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.value, 0);

  return (
    <Card className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Мои кошельки</h2>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить
        </Button>
      </div>

      <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
        <p className="text-sm opacity-90 mb-2">Общий баланс</p>
        <p className="text-4xl font-bold mb-4">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
            <Icon name="Download" size={16} className="mr-2" />
            Пополнить
          </Button>
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
            <Icon name="Upload" size={16} className="mr-2" />
            Вывести
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {wallets.map((wallet) => (
          <div
            key={wallet.symbol}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                {wallet.icon}
              </div>
              <div>
                <p className="font-semibold">{wallet.name}</p>
                <p className="text-sm text-muted-foreground">{wallet.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{wallet.amount} {wallet.symbol}</p>
              <p className="text-sm text-muted-foreground">
                ${wallet.value.toLocaleString('en-US')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
