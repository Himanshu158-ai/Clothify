import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CartProduct = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  /* ── Fetch cart ── */
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/api/cart/', {
        withCredentials: true,
      });
      setCartItems(res.data.items || []);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to load cart');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ── Update quantity ── */
  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    setUpdatingId(productId);
    try {
      await axios.put(
        'http://localhost:3000/api/cart/',
        { productId, quantity: newQty },
        { withCredentials: true }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    } finally {
      setUpdatingId(null);
    }
  };

  /* ── Remove item ── */
  const handleRemove = async (productId) => {
    setUpdatingId(productId);
    try {
      const res = await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
        withCredentials: true,
      });
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
    } finally {
      setUpdatingId(null);
    }
  };

  /* ── Totals ── */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const total = subtotal;

  /* ════ LOADING ════ */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] font-sans text-[#1a1c1c] flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-px bg-[#A68A64] mx-auto mb-6 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#777777]">
              Loading your selections
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ════ EMPTY CART ════ */
  if (!loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] font-sans text-[#1a1c1c] flex flex-col">
        <NavBar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c4c7c7"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-10"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>

          <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight mb-4 text-[#1a1c1c]">
            Your Cart is Empty
          </h1>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#777777] mb-12">
            Your selections await
          </p>

          <Link
            to="/"
            className="group relative overflow-hidden bg-[#1a1c1c] px-12 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300"
          >
            <span className="absolute inset-x-0 bottom-0 h-0 bg-[#A68A64] transition-all duration-300 ease-out group-hover:h-full" />
            <span className="relative z-10">Explore Collection →</span>
          </Link>
        </div>
      </div>
    );
  }

  /* ════ MAIN CART ════ */
  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans text-[#1a1c1c]">
      <NavBar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-24">

        {/* Page Header */}
        <div className="flex items-baseline justify-between border-b border-[#eeeeee] pb-6 mb-5">
          <h1 className="font-sans text-4xl md:text-5xl font-normal tracking-tight">
            Your Cart
          </h1>
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#777777]">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

          {/* ════ LEFT — Cart Items ════ */}
          <div className="flex-1 min-w-0">
            {cartItems.map((item) => {
              const product = item.productId;
              const itemTotal = product.price * item.quantity;
              const isUpdating = updatingId === product._id;
              const atMax = item.quantity >= product.stock;

              return (
                <div
                  key={product._id}
                  className={`flex gap-6 md:gap-8 py-8 border-b border-[#eeeeee] transition-opacity duration-300 ${
                    isUpdating ? 'opacity-50 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/view-product/${product._id}`)}
                    className="shrink-0 w-24 sm:w-32 md:w-36 cursor-pointer group"
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden bg-[#eeeeee]">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1 min-w-0 justify-between py-1">
                    <div>
                      {/* Category + Remove */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <p className="text-[9px] uppercase tracking-[0.25em] text-[#777777]">
                          {product.category}
                        </p>
                        <button
                          onClick={() => handleRemove(product._id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-[#aaaaaa] hover:text-[#1a1c1c] transition-colors duration-200 shrink-0 mt-0.5"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => navigate(`/view-product/${product._id}`)}
                        className="font-serif text-lg md:text-xl font-normal text-[#1a1c1c] leading-snug mb-1 cursor-pointer hover:text-[#A68A64] transition-colors duration-200"
                      >
                        {product.name}
                      </h3>


                      {/* Low stock warning */}
                      {product.stock <= 3 && (
                        <p className="text-[9px] uppercase tracking-widest text-[#A68A64] mt-2">
                          Only {product.stock} left
                        </p>
                      )}
                    </div>

                    {/* Qty + Price row */}
                    <div className="flex items-center justify-between mt-6 gap-4">
                      {/* Qty Control */}
                      <div className="flex items-center border border-[#dddddd]">
                        <button
                          onClick={() =>
                            handleQuantityChange(product._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 flex items-center justify-center text-lg text-[#1a1c1c] hover:bg-[#f0f0f0] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm font-medium border-x border-[#dddddd]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(product._id, item.quantity + 1)
                          }
                          disabled={atMax}
                          className="w-9 h-9 flex items-center justify-center text-lg text-[#1a1c1c] hover:bg-[#f0f0f0] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-base md:text-lg font-medium text-[#1a1c1c]">
                          ₹{product.price * item.quantity}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[9px] text-[#777777] tracking-wider mt-0.5">
                            ₹{product.price} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue Shopping */}
            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#777777] hover:text-[#A68A64] transition-colors duration-200"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* ════ RIGHT — Order Summary ════ */}
          <aside className="lg:w-[340px] xl:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-24">

              {/* Summary Box */}
              <div className="border border-[#eeeeee] bg-white p-8">
                <h2 className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#1a1c1c] font-semibold mb-8">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider text-[#777777]">
                      Subtotal
                    </span>
                    <span className="text-sm text-[#1a1c1c]">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider text-[#777777]">
                      Shipping
                    </span>
                    <span className="text-xs text-[#A68A64] uppercase tracking-widest font-semibold">
                      Free
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#eeeeee] my-6" />

                {/* Total */}
                <div className="flex justify-between items-baseline mb-10">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1a1c1c]">
                    Total
                  </span>
                  <div className="text-right">
                    <p className="font-serif text-2xl font-normal text-[#1a1c1c]">
                      ₹{total.toLocaleString()}
                    </p>
                    <p className="text-[9px] text-[#777777] tracking-wider mt-0.5">
                      Incl. all taxes
                    </p>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => toast.info('Checkout coming soon')}
                  className="group relative w-full overflow-hidden bg-[#1a1c1c] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-colors duration-300 mb-4"
                >
                  <span className="absolute inset-x-0 bottom-0 h-0 bg-[#A68A64] transition-all duration-300 ease-out group-hover:h-full" />
                  <span className="relative z-10">Checkout →</span>
                </button>

                {/* Trust note */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A68A64"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#aaaaaa]">
                    Secure Checkout
                  </p>
                </div>
              </div>

              {/* Free Shipping note */}
              <div className="mt-4 border border-[#eeeeee] bg-[#f9f9f9] p-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#777777] mb-1">
                  Free Shipping
                </p>
                <p className="text-xs text-[#1a1c1c] leading-relaxed">
                  Complimentary delivery on every order.
                </p>
              </div>

            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#eeeeee] py-8 px-6 text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#aaaaaa]">
          © {new Date().getFullYear()} Clothify — All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

/* ──────────────────────────────────────────────
   NavBar — mirrors AllProduct.jsx exactly
────────────────────────────────────────────── */
const NavBar = () => (
  <nav className="sticky top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-[#eeeeee]">
    <Link
      to="/"
      className="text-xl tracking-widest uppercase font-bold text-[#1a1c1c]"
    >
      CLOTHIFY
    </Link>

    <div className="flex items-center space-x-6 text-[#1a1c1c]">
      <Link
        to="/"
        className="text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:text-[#A68A64] transition-colors"
      >
        Shop
      </Link>

      {/* Wishlist */}
      <Link to="/login" aria-label="Login" className="hover:text-[#A68A64] transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </Link>

      {/* Cart — gold accent (active page) */}
      <Link to="/cart" aria-label="Cart" className="text-[#A68A64]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </Link>
    </div>
  </nav>
);

export default CartProduct;