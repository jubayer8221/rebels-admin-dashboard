import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, clearError } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Select state from Redux
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
        return () => { dispatch(clearError()); };
    }, [isAuthenticated, navigate, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [e.target.type === 'email' ? 'email' : 'password']: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login(credentials));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/60 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-110 z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white shadow-xl shadow-blue-500/10 mb-6">
                        <ShieldCheck className="text-blue-600" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Rebels Inventory</h1>
                    <p className="text-gray-500 mt-2 font-medium">Secure Administrative Access</p>
                </div>

                <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 rounded-[2.5rem]">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Error Display */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
                            >
                                <AlertCircle size={18} /> {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={credentials.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-gray-800"
                                    placeholder="admin@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-gray-800"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight size={18} /></>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;