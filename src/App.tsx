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
        <footer className="bg-gradient-to-br from-gray-50 to-white border-t mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-5 gap-8 mb-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold gradient-text mb-4">Zdravotnícky Šatník</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Profesionálne zdravotnícke oblečenie s dôrazom na kvalitu, komfort a štýl.
                  Certifikované materiály, expresné doručenie a spokojní zákazníci po celom Slovensku.
                </p>
                <div className="flex gap-4 mt-4">
                  {/* Social Media Icons */}
                  <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Informácie</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/o-nas" className="text-gray-600 hover:text-primary-600 transition-colors">
                      O nás
                    </a>
                  </li>
                  <li>
                    <a href="/rozmery" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Tabuľka rozmerov
                    </a>
                  </li>
                  <li>
                    <a href="/nakupovanie" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Ako nakupovať
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Zákaznícka podpora</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/vop" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Obchodné podmienky
                    </a>
                  </li>
                  <li>
                    <a href="/reklamacie" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Reklamácie
                    </a>
                  </li>
                  <li>
                    <a href="/vratenie-vymena" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Vrátenie a výmena
                    </a>
                  </li>
                  <li>
                    <a href="/doprava" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Doprava a platba
                    </a>
                  </li>
                  <li>
                    <a href="/gdpr" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Ochrana údajov (GDPR)
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Kontakt</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+421 900 123 456</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@zdravotnicke-oblecenie.sk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Bratislava, Slovensko</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <div className="max-w-md mx-auto text-center">
                <h3 className="font-bold text-gray-900 mb-2">Prihláste sa k odberu noviniek</h3>
                <p className="text-sm text-gray-600 mb-4">Získajte 10% zľavu na prvý nákup</p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Váš email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors font-medium"
                  >
                    Prihlásiť
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
              <p>&copy; 2024 Zdravotnícky Šatník. Všetky práva vyhradené.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <img src="https://via.placeholder.com/40x25/f3f4f6/9ca3af?text=VISA" alt="Visa" className="h-6" />
                <img src="https://via.placeholder.com/40x25/f3f4f6/9ca3af?text=MC" alt="Mastercard" className="h-6" />
                <img src="https://via.placeholder.com/60x25/f3f4f6/9ca3af?text=PayPal" alt="PayPal" className="h-6" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;