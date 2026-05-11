import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../app/features/auth/state/auth.slice';

const NavBar = ({dynamicLinks}) => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const path = dynamicLinks[0].path;
    const name = dynamicLinks[0].name;


    const logout = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });

            console.log(res.data.success);
            if (res.data.success) {
                dispatch(setUser(null));
                toast.success(res.data.message, { position: "top-right" });
                navigate("/");
            }
        } catch (error) {
            toast.error("Logout failed", { position: "top-right" });
        }
    }
    return (

        <nav className="sticky top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-[#eeeeee]">
            <Link
                to="/"
                className="text-xl tracking-widest uppercase font-bold text-[#1a1c1c]"
            >
                CLOTHIFY
            </Link>

            <div className="flex items-center space-x-6 text-[#1a1c1c]">
                <Link
                    to={path}
                    className="text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:text-[#A68A64] transition-colors"
                >
                    {name}
                </Link>

                {/* user */}
                {user ? (
                    <button onClick={logout} aria-label="Logout" className="hover:text-[#A68A64] transition-colors cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>
                ) : (
                    <Link to="/login" aria-label="Login" className="hover:text-[#A68A64] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </Link>
                )}

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
    )
}

export default NavBar