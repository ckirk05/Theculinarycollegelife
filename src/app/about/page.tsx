import Image from 'next/image'

export const metadata = {
  title: 'About Me',
  description: 'Learn more about the creator behind The Culinary College Life',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          About Me
        </h1>
        <p className="text-xl text-gray-600">
          Welcome to my kitchen and my story
        </p>
      </header>

      <div className="prose prose-lg max-w-none">
        {/* Hero Image Placeholder */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8 bg-butter-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">👩‍🍳</div>
            <p className="text-gray-600">Your photo here</p>
          </div>
        </div>

        <h2 className="font-display text-3xl font-bold mb-4 text-gray-900">
          Hi, I'm [Your Name]!
        </h2>

        <p className="text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. I'm a college student with a passion
          for cooking, sharing delicious recipes, and making the most of life in the kitchen.
          This blog is my creative outlet where I share everything I've learned about cooking
          on a budget, meal prepping, and creating food that actually tastes amazing.
        </p>

        <h3 className="font-display text-2xl font-bold mb-4 text-gray-900">
          My Culinary Journey
        </h3>

        <p className="text-gray-700 mb-6">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. I started cooking in my dorm room with nothing but a
          microwave and determination. Fast forward to today, and I've learned that you don't
          need a fancy kitchen or expensive ingredients to make incredible food. My journey
          has been full of kitchen disasters, happy accidents, and most importantly, delicious
          discoveries that I can't wait to share with you.
        </p>

        <h3 className="font-display text-2xl font-bold mb-4 text-gray-900">
          What You'll Find Here
        </h3>

        <p className="text-gray-700 mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. On this blog, you'll discover:
        </p>

        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li className="mb-2">Easy, budget-friendly recipes perfect for college students and busy professionals</li>
          <li className="mb-2">Meal prep tips and tricks to save time and money</li>
          <li className="mb-2">Kitchen hacks that actually work</li>
          <li className="mb-2">Lifestyle content about navigating college life while staying healthy and well-fed</li>
          <li className="mb-2">Honest reviews of kitchen gadgets and ingredients</li>
        </ul>

        <h3 className="font-display text-2xl font-bold mb-4 text-gray-900">
          My Cooking Philosophy
        </h3>

        <p className="text-gray-700 mb-6">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. I believe that cooking should be fun, accessible, and
          stress-free. You don't need to be a professional chef or have years of experience
          to create meals you're proud of. My recipes focus on simple techniques, affordable
          ingredients, and most importantly - flavor! Every recipe I share has been tested
          multiple times in my own kitchen, and I only post what I'd actually make again.
        </p>

        <h3 className="font-display text-2xl font-bold mb-4 text-gray-900">
          Beyond the Kitchen
        </h3>

        <p className="text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. When I'm not cooking or blogging,
          you can find me exploring local farmers markets, trying new restaurants, studying
          for my degree in [Your Major], hanging out with friends, or planning my next
          culinary adventure. I love connecting with fellow food lovers, so don't hesitate
          to reach out!
        </p>

        <h3 className="font-display text-2xl font-bold mb-4 text-gray-900">
          Let's Connect!
        </h3>

        <p className="text-gray-700 mb-6">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. I'd love to
          hear from you! Whether you've tried one of my recipes, have questions, or just
          want to chat about food, feel free to reach out. Your feedback and suggestions
          help make this blog better, and I genuinely appreciate every message I receive.
        </p>

        <div className="bg-butter-50 rounded-xl p-6 mb-8">
          <p className="text-gray-700 italic">
            "Cooking is like love. It should be entered into with abandon or not at all."
            - Harriet Van Horne
          </p>
        </div>

        <p className="text-gray-700">
          Thank you for being here and being part of The Culinary College Life community.
          I can't wait to share more recipes, tips, and stories with you. Happy cooking!
        </p>

        <p className="text-gray-700 mt-6 font-semibold">
          With love from my kitchen to yours,<br />
          [Your Name]
        </p>
      </div>
    </div>
  )
}
