import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Crypto {
  symbol: string;
  name: string;
  rate: number;
  icon: string;
}

const cryptos: Crypto[] = [
  { symbol: 'BTC', name: 'Bitcoin', rate: 43250, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', rate: 2280, icon: 'Ξ' },
  { symbol: 'USDT', name: 'Tether', rate: 1, icon: '₮' },
  { symbol: 'BNB', name: 'Binance Coin', rate: 315, icon: '🔶' },
  { symbol: 'SOL', name: 'Solana', rate: 98, icon: '◎' },
];

export default function ExchangeCalculator() {
  const [fromAmount, setFromAmount] = useState<string>('1');
  const [fromCrypto, setFromCrypto] = useState<string>('BTC');
  const [toCrypto, setToCrypto] = useState<string>('ETH');

  const calculateExchange = () => {
    const amount = parseFloat(fromAmount) || 0;
    const fromRate = cryptos.find(c => c.symbol === fromCrypto)?.rate || 1;
    const toRate = cryptos.find(c => c.symbol === toCrypto)?.rate || 1;
    return ((amount * fromRate) / toRate).toFixed(6);
  };

  const swapCurrencies = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
  };

  return (
    <Card className="p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Обмен криптовалюты</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Отдаёте</label>
          <div className="flex gap-3">
            <Input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="text-lg"
              placeholder="0.00"
            />
            <Select value={fromCrypto} onValueChange={setFromCrypto}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cryptos.map((crypto) => (
                  <SelectItem key={crypto.symbol} value={crypto.symbol}>
                    <span className="flex items-center gap-2">
                      <span>{crypto.icon}</span>
                      <span>{crypto.symbol}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={swapCurrencies}
            className="rounded-full hover:bg-primary/10 transition-all"
          >
            <Icon name="ArrowDownUp" size={20} />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Получаете</label>
          <div className="flex gap-3">
            <Input
              type="text"
              value={calculateExchange()}
              readOnly
              className="text-lg bg-muted"
            />
            <Select value={toCrypto} onValueChange={setToCrypto}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cryptos.map((crypto) => (
                  <SelectItem key={crypto.symbol} value={crypto.symbol}>
                    <span className="flex items-center gap-2">
                      <span>{crypto.icon}</span>
                      <span>{crypto.symbol}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full text-lg py-6" size="lg">
          Обменять
          <Icon name="ArrowRight" size={20} className="ml-2" />
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Курс: 1 {fromCrypto} = {calculateExchange()} {toCrypto}
        </p>
      </div>
    </Card>
  );
}
