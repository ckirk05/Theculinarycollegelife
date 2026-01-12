import Link from 'next/link'
import BlogUploadForm from '@/components/admin/BlogUploadForm'

export default function BlogUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-butter-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">
                Upload Blog Post
              </h1>
              <p className="text-sm text-gray-600">
                Share a new lifestyle story
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogUploadForm />
      </main>
    </div>
  )
}
