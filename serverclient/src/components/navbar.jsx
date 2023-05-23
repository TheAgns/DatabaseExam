import Link from 'next/link';
import styles from '../styles/components/Navbar.module.css';
export default function Navbar() {
 return (
    <div>
        <nav className={styles.navbar}>
        <Link href="/">
            <div className={styles.logo}>
                <p>
                    NunaMarket <span className={styles.logo_span}></span>
                </p>
            </div>
        </Link>
        <Link href="/">
            <div className={styles.logo}>
                <p>
                    Users <span className={styles.logo_span}></span>
                </p>
            </div>
        </Link>
        <Link href="/cart">
            <div className="checkout">
                <span>🛒</span>
                <p>$0.00</p>
            </div>
        </Link>
        </nav>
    </div>
 );
}