import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';

const bannerImages = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
];

const AllProduct = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [mockProducts, setMockProducts] = useState([])
  const { handelAllProducts } = useProduct()
  const navigate = useNavigate();
  // Banner Auto-Swipe Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); // Swipe every 4 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await handelAllProducts();
        if (res && res.products) {
          setMockProducts(res.products);
        }
      } catch (error) {
        // Error handled in useProduct hook
      }
    }
    getProducts();
  }, [])

  const handleProductClick = (product) => {
    console.log(product);
    navigate(`/view-product/${product._id}`)
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans text-[#1a1c1c]">
      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-[#eeeeee]">
        {/* Left Side: Brand */}
        <Link to="/" className="text-xl tracking-widest uppercase font-bold text-[#1a1c1c]">
          CLOTHIFY
        </Link>

        {/* Right Side: Links & Icons */}
        <div className="flex items-center space-x-6 text-[#1a1c1c]">
          <Link to="/product-create" className="text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:text-[#A68A64] transition-colors">
            Add Product
          </Link>

          {/* Like Icon */}
          <button aria-label="Wishlist" className="hover:text-[#A68A64] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          {/* Cart Icon */}
          <button aria-label="Cart" className="hover:text-[#A68A64] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-[#eeeeee]">
        {bannerImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <img
              src={img}
              alt={`Editorial Campaign ${index + 1}`}
              className="w-full h-full object-cover object-top"
            />
            {/* Subtle Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
          </div>
        ))}

        {/* Banner Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end items-center pb-20 text-white px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-3">NEW ARRIVALS</h1>
          <p className="text-sm md:text-base tracking-[0.2em] uppercase mb-8 font-light">Elevate Your Everyday</p>
          <button className="group relative overflow-hidden bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:text-white">
            <span className="absolute inset-x-0 bottom-0 h-0 bg-[#A68A64] transition-all duration-300 ease-out group-hover:h-full"></span>
            <span className="relative z-10 transition-colors duration-300">Shop Collection</span>
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`h-[2px] transition-all duration-300 ${index === currentBannerIndex ? 'w-12 bg-white' : 'w-6 bg-white/40'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 md:mb-10 border-b border-[#eeeeee] pb-4">
          <h2 className="text-2xl md:text-4xl font-serif tracking-tight">Featured Products <span>→</span></h2>
          <div className="text-xs uppercase tracking-[0.15em] text-[#777777] mt-4 md:mt-0">
            {mockProducts.length} Products
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
          {mockProducts.map((product) => (
            <div onClick={() => handleProductClick(product)} key={product._id} className="group cursor-pointer flex flex-col">
              {/* Product Image Container */}
              <div className="relative w-full aspect-[3/4] bg-[#eeeeee] overflow-hidden mb-5">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Secondary Image on Hover (using second image if available, else first) */}
                {product.images[1] && (
                  <img
                    src={product.images[1]}
                    alt={`${product.name} alternate view`}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {product.stock <= 2 && (
                    <span className="bg-[#f9f9f9] text-[#1a1c1c] text-[9px] font-bold uppercase tracking-widest px-2 py-1 shadow-sm">
                      Low Stock
                    </span>
                  )}
                  {product.category === 'test' && (
                    <span className="bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 shadow-sm">
                      New
                    </span>
                  )}
                </div>

                {/* Quick Add Button */}
                <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm text-black text-xs uppercase tracking-widest font-bold text-center py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                  Quick Add
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow px-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-sm font-medium text-[#1a1c1c] leading-tight">{product.name}</h3>
                  <span className="text-sm text-[#1a1c1c]">₹{product.price.toLocaleString()}</span>
                </div>

                <p className="text-xs text-[#777777] mb-4 uppercase tracking-wider">{product.category}</p>

                {/* Seller Info */}
                <div className="mt-auto pt-3 border-t border-[#eeeeee]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#1a1c1c] flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                      {product?.userId?.name?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-[10px] text-[#474747] uppercase tracking-wider truncate">
                      By <span className="font-bold text-[#1a1c1c]">{product?.userId?.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProduct;