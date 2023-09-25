import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="text-2xl font-bold" >
        Next.js for Drupal NSL
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/products">
              Products
            </Link>
          </li>
          <li>
            <Link href="/notes">
              Notes
            </Link>
          </li>
          <li>
            <Link href="/test">
              App Router
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
