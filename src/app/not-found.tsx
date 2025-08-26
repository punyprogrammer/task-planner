import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-3xl flex items-center justify-center">
            <Home className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Task Planner
        </Link>
      </div>
    </div>
  );
}
