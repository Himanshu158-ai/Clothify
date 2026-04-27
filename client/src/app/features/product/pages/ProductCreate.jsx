import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (formData.images.length + files.length > 4) {
            alert("You can only upload a maximum of 4 images.");
            return;
        }

        const newImages = [...formData.images, ...files].slice(0, 4);
        setFormData((prev) => ({ ...prev, images: newImages }));

        const newPreviews = newImages.map(file => URL.createObjectURL(file));
        setImagePreviews(newPreviews);
    };

    const removeImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData((prev) => ({ ...prev, images: newImages }));

        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
        if (currentSlide >= newPreviews.length && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        
        formData.images.forEach(image => {
            data.append('images', image);
        });

        try {
            const res = await axios.post("http://localhost:3000/api/product", data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res);
            if(res.status == 201){
                navigate("/");
            }
        } catch (error) {
            console.log(error)
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === imagePreviews.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? imagePreviews.length - 1 : prev - 1));
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* Form Section */}
            <div className="flex w-full flex-col justify-start py-12 px-6 lg:w-[60%] lg:px-16 xl:px-24 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="mx-auto w-full max-w-lg my-auto">
                    {/* Header */}
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-light tracking-widest text-neutral-900">
                            CLOTHIFY
                        </h1>
                        <p className="mt-2 text-sm text-neutral-500 uppercase tracking-widest">
                            Publish Product
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full border-b border-neutral-300 bg-transparent py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none sm:text-sm transition-colors duration-300"
                                        placeholder="Enter product name"
                                    />
                                </div>
                            </div>

                            {/* Description Field */}
                            <div>
                                <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows="2"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="block w-full border-b border-neutral-300 bg-transparent py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none sm:text-sm transition-colors duration-300 resize-none"
                                        placeholder="Detail the product..."
                                    />
                                </div>
                            </div>

                            {/* Category Field */}
                            <div>
                                <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="category"
                                        name="category"
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="block w-full border-b border-neutral-300 bg-transparent py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none sm:text-sm transition-colors duration-300"
                                        placeholder="Enter category"
                                    />
                                </div>
                            </div>

                            {/* Price and Stock Fields Row */}
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <label htmlFor="price" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                                        Price (USD)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="block w-full border-b border-neutral-300 bg-transparent py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none sm:text-sm transition-colors duration-300"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="stock" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                                        Stock
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="stock"
                                            name="stock"
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            className="block w-full border-b border-neutral-300 bg-transparent py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none sm:text-sm transition-colors duration-300"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload Box */}
                            <div className="pt-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
                                    Product Images (Max 4)
                                </label>
                                <div className="relative border border-neutral-300 py-3 px-4 text-center cursor-pointer hover:border-neutral-900 transition-colors duration-300">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <span className="text-sm text-neutral-600 font-semibold uppercase tracking-widest">
                                        {formData.images.length > 0 ? `${formData.images.length}/4 Uploaded - Click to add more` : '+ Upload Images'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center overflow-hidden bg-neutral-900 px-3 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                            >
                                <span className="absolute inset-x-0 bottom-0 h-0 bg-[#A68A64] transition-all duration-300 ease-out group-hover:h-full"></span>
                                <span className="relative z-10 transition-colors duration-300">Publish Product</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image Slider Section */}
            <div className="hidden lg:flex lg:w-[40%] relative bg-[#f8f8f8] overflow-hidden h-full items-center justify-center">
                {imagePreviews.length > 0 ? (
                    <>
                        <div
                            className="flex h-full w-full transition-transform duration-500 ease-out items-center"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="w-full h-full flex-shrink-0 relative group flex items-center justify-center p-16">
                                    <img
                                        className="max-h-full max-w-full object-contain drop-shadow-2xl"
                                        src={preview}
                                        alt={`Product preview ${index + 1}`}
                                    />
                                    <div className="absolute top-6 right-6">
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="bg-white/80 text-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors border border-transparent hover:border-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Slider Controls */}
                        {imagePreviews.length > 1 && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 px-5 py-3 shadow-sm border border-neutral-200 rounded-full">
                                <button type="button" onClick={prevSlide} className="text-neutral-900 hover:text-[#A68A64] transition-colors p-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                                <div className="text-xs font-semibold uppercase tracking-widest text-neutral-800">
                                    {currentSlide + 1} / {imagePreviews.length}
                                </div>
                                <button type="button" onClick={nextSlide} className="text-neutral-900 hover:text-[#A68A64] transition-colors p-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 p-8 text-center border-l border-neutral-200">
                        <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        <p className="uppercase tracking-widest text-sm font-medium">Image Preview Gallery</p>
                        <p className="text-xs mt-2 opacity-75">Upload product images to preview them here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCreate;