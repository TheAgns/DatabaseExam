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
        <Link href="./myAccount">
            <div className={styles.logo}>
                <p>
                    My Account <span className={styles.logo_span}></span>
                </p>
            </div>
        </Link>
        <Link href="/orders">
            <div className={styles.logo}>
                <p>
                    Orders <span className={styles.logo_span}></span>
                </p>
            </div>
        </Link>
        <Link href="/cart">
            <div className="checkout">
                <><span><p>CART  🛒</p></span></>
            </div>
        </Link>
        </nav>
    </div>
 );
}