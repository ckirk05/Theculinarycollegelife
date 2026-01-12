import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import LoginForm from '@/components/admin/LoginForm'

export const metadata = {
  title: 'Admin Login',
  description: 'Login to access the admin panel',
}

export default async function AdminLoginPage() {
  // Check if already logged in
  const session = await getSession()
  if (session && session.authenticated && session.expiresAt > Date.now()) {
    redirect('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-butter-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600">
              The Culinary College Life CMS
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Secure access to content management</p>
          </div>
        </div>
      </div>
    </div>
  )
}
