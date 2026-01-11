export const metadata = {
  title: 'Gallery',
  description: 'Browse our collection of food photography and culinary moments',
}

export default function GalleryPage() {
  // Placeholder for gallery images
  const placeholderImages = [
    { id: 1, title: 'Breakfast Spread', category: 'breakfast' },
    { id: 2, title: 'Fresh Ingredients', category: 'ingredients' },
    { id: 3, title: 'Baking Day', category: 'desserts' },
    { id: 4, title: 'Dinner Table', category: 'dinner' },
    { id: 5, title: 'Smoothie Bowl', category: 'drinks' },
    { id: 6, title: 'Meal Prep', category: 'lunch' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Gallery
        </h1>
        <p className="text-xl text-gray-600">
          A visual journey through delicious food and culinary adventures
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square bg-butter-100 rounded-xl overflow-hidden hover:shadow-butter transition-shadow cursor-pointer group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-lg font-semibold text-gray-700">{image.title}</p>
                <p className="text-sm text-gray-500 capitalize">{image.category}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-butter-400 opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500">
          More photos coming soon! Follow along for updates.
        </p>
      </div>
    </div>
  )
}
