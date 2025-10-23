import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Product, CartItem } from './types';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Načítať košík z localStorage pri štarte
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Uložiť košík do localStorage pri zmene
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, variant?: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id && item.variant === variant
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1, variant }];
      }
    });

    // Zobraziť notifikáciu
    setNotification(`${product.name} bol pridaný do košíka`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header
          onSearch={setSearchQuery}
          cartItemsCount={totalCartItems}
          onCartClick={() => setIsCartOpen(true)}
        />

        {/* Notification */}
        {notification && (
          <div
            className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {notification}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchQuery={searchQuery}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/produkt/:id"
              element={<ProductDetail onAddToCart={handleAddToCart} />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
        />

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">O nás</h3>
                <p className="text-gray-600 text-sm">
                  Špecializujeme sa na kvalitné zdravotnícke oblečenie pre sestričky a zdravotný personál. Pohodlie a štýl pre vašu prácu.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Rýchle odkazy</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/" className="text-gray-600 hover:text-primary-600">
                      Všetky produkty
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-gray-600 hover:text-primary-600">
                      Akcie
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-gray-600 hover:text-primary-600">
                      Novinky
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Kategórie</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/" className="text-gray-600 hover:text-primary-600">
                      Blúzky
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-gray-600 hover:text-primary-600">
                      Nohavice
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-gray-600 hover:text-primary-600">
                      Plášte
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-gray-600 hover:text-primary-600">
                      Obuv
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Kontakt</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +421 900 123 456
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@sestrickovo.sk
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2024 Sestrickovo. Všetky práva vyhradené.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;