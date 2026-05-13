import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();


  const handleAddToCart = async() => {
      try{
        const res = await axios.post("http://localhost:3000/api/cart/",{
          productId:id,
          quantity:quantity,
        },{withCredentials:true});
        
        toast.success(res.data.message);
      }
      catch(error){
        toast.error(error.response?.data?.message || "Failed to add to cart");
        if(error.response.status === 401){
          navigate("/login");
        }
      }
      
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/product/${id}`,
          { withCredentials: true }
        );

        const data = res.data.product;
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load product details");
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔥 IMPORTANT: loading guard
   if (!product) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] font-sans text-[#1a1c1c] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-px bg-[#A68A64] mx-auto mb-6 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#777777]">
              Loading product details
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c]">
      <div className="max-w-[1300px] mx-auto px-6 py-10 grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-[3/4] bg-[#eeeeee] overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="flex gap-3">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-28 cursor-pointer border ${
                  selectedImage === img ? "border-black" : "border-[#ddd]"
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col md:sticky md:top-24">

          <p className="text-xs uppercase tracking-[0.2em] text-[#777] mb-2">
            {product.category}
          </p>

          <h1 className="text-3xl md:text-4xl font-serif mb-4">
            {product.name}
          </h1>

          <p className="text-xl mb-6">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="text-sm text-[#444] leading-relaxed mb-8 whitespace-pre-line">
            {product.description}
          </p>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest mb-3">
              Quantity
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 border border-[#ddd] flex items-center justify-center hover:border-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="text-lg w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                className="w-10 h-10 border border-[#ddd] flex items-center justify-center hover:border-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"} <span className="ml-1">→</span>
          </button>

          <p className="text-xs text-[#777] mt-4">
            {product.stock > 0 ? "In stock - (Only "+product.stock+" left)" : "Out of stock"}
          </p>

          <div className="mt-10 pt-6 border-t border-[#eee]">
            <p className="text-xs uppercase tracking-widest text-[#777]">
              Seller
            </p>
            <p className="text-sm font-medium">
              {product.userId.name}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;