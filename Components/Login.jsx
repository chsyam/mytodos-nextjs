import { ListTodo } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center mb-8">
                    <ListTodo className="h-8 w-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                    Welcome back
                </h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Sign in
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={() => onNavigate('register')}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Sign up
                    </button>
                </p>
                <button
                    onClick={() => onNavigate('home')}
                    className="mt-8 text-center w-full text-sm text-gray-600 hover:text-gray-800"
                >
                    Back to home
                </button>
            </div>
        </div>
    );
}