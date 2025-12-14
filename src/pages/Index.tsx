import { useState } from 'react';
import Navigation from '@/components/Navigation';
import CryptoCard from '@/components/CryptoCard';
import PriceChart from '@/components/PriceChart';
import ExchangeCalculator from '@/components/ExchangeCalculator';
import WalletBalance from '@/components/WalletBalance';
import TransactionHistory from '@/components/TransactionHistory';

const cryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 43250.50, change24h: 2.45, icon: '₿' },
  { name: 'Ethereum', symbol: 'ETH', price: 2280.75, change24h: -1.23, icon: 'Ξ' },
  { name: 'Tether', symbol: 'USDT', price: 1.00, change24h: 0.01, icon: '₮' },
  { name: 'Binance Coin', symbol: 'BNB', price: 315.20, change24h: 3.78, icon: '🔶' },
  { name: 'Solana', symbol: 'SOL', price: 98.45, change24h: 5.32, icon: '◎' },
  { name: 'Cardano', symbol: 'ADA', price: 0.58, change24h: -2.15, icon: '🔷' },
];

const btcPriceData = [42800, 42950, 43100, 42900, 43200, 43400, 43250, 43500, 43350, 43250];
const ethPriceData = [2250, 2270, 2290, 2260, 2280, 2300, 2275, 2285, 2295, 2280];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

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
      
      <main className="container mx-auto px-4 py-8">
        {renderSection()}
      </main>

      <footer className="border-t mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 CryptoEx. Торгуйте ответственно. Криптовалюта — это высокорисковый актив.</p>
      </footer>
    </div>
  );
}
