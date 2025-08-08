"use client"

const footerLinks = [
  { label: "Pro", href: "#" },
  { label: "Enterprise", href: "#" },
  { label: "Store", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" }
]

export function Footer() {
  const handleLinkClick = (label: string) => {
    console.log("Footer link clicked:", label)
  }

  return (
    <footer className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center space-x-6">
        {footerLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleLinkClick(link.label)}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>
    </footer>
  )
}
