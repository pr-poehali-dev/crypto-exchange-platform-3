import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'exchange', label: 'Обмен', icon: 'ArrowLeftRight' },
  { id: 'wallets', label: 'Кошельки', icon: 'Wallet' },
  { id: 'history', label: 'История', icon: 'Clock' },
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-xl">
              ₿
            </div>
            <span className="text-xl font-bold">CryptoEx</span>
          </div>

          <div className="flex gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                onClick={() => onSectionChange(item.id)}
                className="gap-2"
              >
                <Icon name={item.icon} size={18} />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
          </div>

          <Button size="sm" className="gap-2">
            <Icon name="User" size={16} />
            <span className="hidden sm:inline">Профиль</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
