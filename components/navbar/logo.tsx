import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="flex items-center">
    <Image
      src="/logo_waleta.svg"
      alt="Waleta Career Logo"
      width={64}
      height={64}
      className="h-auto"
    />
  </Link>
);
