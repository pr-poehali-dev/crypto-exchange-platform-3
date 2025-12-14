import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CryptoCard from '@/components/CryptoCard';
import PriceChart from '@/components/PriceChart';
import ExchangeCalculator from '@/components/ExchangeCalculator';
import WalletBalance from '@/components/WalletBalance';
import TransactionHistory from '@/components/TransactionHistory';
import PriceAlert from '@/components/PriceAlert';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
}

const CRYPTO_API_URL = 'https://functions.poehali.dev/b72f8cce-0cde-4445-8fd6-ce7d4f3a31b5';

const btcPriceData = [42800, 42950, 43100, 42900, 43200, 43400, 43250, 43500, 43350, 43250];
const ethPriceData = [2250, 2270, 2290, 2260, 2280, 2300, 2275, 2285, 2295, 2280];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ symbol: string; name: string; change: number } | null>(null);
  const { toast } = useToast();

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(CRYPTO_API_URL);
      const result = await response.json();
      
      if (result.data) {
        const previousData = cryptoData;
        setCryptoData(result.data);
        setLoading(false);

        if (previousData.length > 0) {
          result.data.forEach((crypto: CryptoData) => {
            const prev = previousData.find(p => p.symbol === crypto.symbol);
            if (prev && Math.abs(crypto.change24h) >= 5 && Math.abs(prev.change24h) < 5) {
              setAlert({
                symbol: crypto.symbol,
                name: crypto.name,
                change: crypto.change24h
              });
              toast({
                title: `${crypto.name} (${crypto.symbol})`,
                description: `${crypto.change24h >= 0 ? 'Рост' : 'Падение'} ${Math.abs(crypto.change24h).toFixed(2)}%`,
                variant: crypto.change24h >= 0 ? 'default' : 'destructive',
              });
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch crypto data:', error);
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось обновить котировки',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-8">
            <section>
              <div className="mb-8 text-center animate-fade-in">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Торгуйте криптовалютой
                </h1>
                <p className="text-xl text-muted-foreground">
                  Покупайте, продавайте и обменивайте криптовалюту безопасно и быстро
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {cryptoData.map((crypto) => (
                  <CryptoCard key={crypto.symbol} {...crypto} />
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PriceChart data={btcPriceData} label="Bitcoin (BTC)" color="#0EA5E9" />
              <PriceChart data={ethPriceData} label="Ethereum (ETH)" color="#10B981" />
            </section>
          </div>
        );

      case 'exchange':
        return (
          <div className="max-w-2xl mx-auto">
            <ExchangeCalculator />
          </div>
        );

      case 'wallets':
        return (
          <div className="max-w-4xl mx-auto">
            <WalletBalance />
          </div>
        );

      case 'history':
        return (
          <div className="max-w-4xl mx-auto">
            <TransactionHistory />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {alert && (
        <PriceAlert
          symbol={alert.symbol}
          name={alert.name}
          change={alert.change}
          onClose={() => setAlert(null)}
        />
      )}

      <main className="container mx-auto px-4 py-8">
        {loading && activeSection === 'home' ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Загрузка котировок...</p>
          </div>
        ) : (
          renderSection()
        )}
      </main>

      <footer className="border-t mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 CryptoEx. Торгуйте ответственно. Криптовалюта — это высокорисковый актив.</p>
      </footer>
      
      <Toaster />
    </div>
  );
}