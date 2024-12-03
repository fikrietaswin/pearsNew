const Footer = () => {
  return (
    <footer className="glass-effect mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent-primary">PEARS</h3>
            <p className="text-gray-400">
              The world's premier pushbike ranking system.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/riders" className="hover:text-accent-primary">Riders</a></li>
              <li><a href="/events" className="hover:text-accent-primary">Events</a></li>
              <li><a href="/news" className="hover:text-accent-primary">News</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-200">Follow Us</h3>
            <div className="flex flex-wrap gap-4 text-gray-400">
              <a href="#" className="hover:text-accent-primary">Twitter</a>
              <a href="#" className="hover:text-accent-primary">Facebook</a>
              <a href="#" className="hover:text-accent-primary">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-dark-100 text-center text-gray-400">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} PEARS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;