import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");


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
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔥 IMPORTANT: loading guard
  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
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
              Select Size
            </p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="border border-[#ddd] px-4 py-2 text-sm hover:border-black transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition">
            Add to Cart <span className="ml-1">→</span>
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