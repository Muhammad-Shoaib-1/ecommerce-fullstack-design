import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiChevronUp } from 'react-icons/fi';

function Footer() {
  return (
    <footer className={styles.footer}>

      {/* Main Content */}
      <div className={styles.footerTop}>

        {/* Col 1 — Brand */}
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>B</span>
            </div>
            <span className={styles.logoText}>Brand</span>
          </div>
          <p className={styles.brandDesc}>
            Best information about the company goes here but now lorem ipsum is
          </p>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialIcon}><FaFacebook /></a>
            <a href="#" className={styles.socialIcon}><FaTwitter /></a>
            <a href="#" className={styles.socialIcon}><FaLinkedin /></a>
            <a href="#" className={styles.socialIcon}><FaInstagram /></a>
            <a href="#" className={styles.socialIcon}><FaYoutube /></a>
          </div>
        </div>

        {/* Col 2 — About */}
        <div className={styles.linkCol}>
          <h6 className={styles.colTitle}>About</h6>
          {['About Us', 'Find store', 'Categories', 'Blogs'].map((link) => (
            <Link key={link} to="#" className={styles.colLink}>{link}</Link>
          ))}
        </div>

        {/* Col 3 — Partnership */}
        <div className={styles.linkCol}>
          <h6 className={styles.colTitle}>Partnership</h6>
          {['About Us', 'Find store', 'Categories', 'Blogs'].map((link) => (
            <Link key={link} to="#" className={styles.colLink}>{link}</Link>
          ))}
        </div>

        {/* Col 4 — Information */}
        <div className={styles.linkCol}>
          <h6 className={styles.colTitle}>Information</h6>
          {[
            { label: 'Help Center',  to: '#'        },
            { label: 'Money Refund', to: '#'        },
            { label: 'Shipping',     to: '#'        },
            { label: 'Contact us',   to: '/contact' },
          ].map(({ label, to }) => (
            <Link key={label} to={to} className={styles.colLink}>{label}</Link>
          ))}
        </div>

        {/* Col 5 — For users */}
        <div className={styles.linkCol}>
          <h6 className={styles.colTitle}>For users</h6>
          {['Login', 'Register', 'Settings', 'My Orders'].map((link) => (
            <Link key={link} to="#" className={styles.colLink}>{link}</Link>
          ))}
        </div>

        {/* Col 6 — Get app */}
        <div className={styles.appCol}>
          <h6 className={styles.colTitle}>Get app</h6>
          <a href="#" className={styles.appBtn}>
            <img src="/images/backgroun.png" alt="App Store" className={styles.appBtnImg} />
          </a>
          <a href="#" className={styles.appBtn}>
            <img src="/images/backgroun.png" alt="Google Play" className={styles.appBtnImg} />
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <span className={styles.copyright}>© 2023 Ecommerce.</span>
        <div className={styles.langSelector}>
          <img src="/images/us-flag.png" alt="US" className={styles.flagIcon} />
          <span>English</span>
          <FiChevronUp size={16} />
        </div>
      </div>

    </footer>
  );
}

export default Footer;