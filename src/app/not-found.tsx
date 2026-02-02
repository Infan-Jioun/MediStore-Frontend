import React from 'react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-6">
           
                <h1 className="text-9xl font-black text-red-500">
                    404
                </h1>
  
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}