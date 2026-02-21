import React from 'react'

export interface FooterProps {
  compact?: boolean
}

export const Footer: React.FC<FooterProps> = ({ compact = false }) => {
  return (
    <footer className="bg-footer text-white">
      <div className={`footer-inner ${compact ? 'py-8' : 'py-12'}`}>
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="max-w-sm">
            <h3 className="text-xl font-semibold">INFNOVA Academy</h3>
            <p className="text-sm text-gray-200 mt-3">Practical online courses designed for modern teams.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="mt-3 space-y-2">
                <li><a className="hover:underline">Courses</a></li>
                <li><a className="hover:underline">About</a></li>
                <li><a className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Support</h4>
              <ul className="mt-3 space-y-2">
                <li><a className="hover:underline">Help Center</a></li>
                <li><a className="hover:underline">Privacy</a></li>
                <li><a className="hover:underline">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-400">© {new Date().getFullYear()} INFNOVA Technologies. All rights reserved.</div>
      </div>
    </footer>
  )
}
