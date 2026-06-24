import { useState } from 'react';
import styles from './Contact.module.css';
import { FiMapPin, FiPhone, FiMail, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  { q: 'How do I track my order?', a: 'You can track your order from the My Orders page after logging in. A tracking link is also sent to your email once the order is shipped.' },
  { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unused and in original packaging. Initiate a return from your order detail page.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days. Express shipping (2–3 days) is available at checkout for an additional fee.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be changed or cancelled within 1 hour of placing them. After that, please contact our support team directly.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries. International shipping times and fees vary by destination and are shown at checkout.' },
];

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className={styles.contactPage}>
      <div className="container py-4">

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h4 className={styles.pageTitle}>Contact Us</h4>
          <p className={styles.pageSubtitle}>Have questions? We'd love to hear from you.</p>
        </div>

        {/* Top Row — Company Info + Form */}
        <div className={styles.topRow}>

          {/* Company Info */}
          <div className={styles.infoCard}>
            <h6 className={styles.cardTitle}>Get in touch</h6>
            <p className={styles.infoDesc}>
              Our support team is available Monday to Friday, 9am – 6pm. We usually respond within 24 hours.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.infoIconWrap}>
                  <FiMapPin size={18} />
                </div>
                <div>
                  <div className={styles.infoLabel}>Address</div>
                  <div className={styles.infoValue}>123 Commerce Street, Lahore, Punjab, Pakistan</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconWrap}>
                  <FiPhone size={18} />
                </div>
                <div>
                  <div className={styles.infoLabel}>Phone</div>
                  <div className={styles.infoValue}>+92 300 1234567</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconWrap}>
                  <FiMail size={18} />
                </div>
                <div>
                  <div className={styles.infoLabel}>Email</div>
                  <div className={styles.infoValue}>support@ecommerce.com</div>
                </div>
              </div>
            </div>

            <div className={styles.hoursBox}>
              <div className={styles.hoursTitle}>Business Hours</div>
              <div className={styles.hoursRow}><span>Monday – Friday</span><span>9:00 AM – 6:00 PM</span></div>
              <div className={styles.hoursRow}><span>Saturday</span><span>10:00 AM – 3:00 PM</span></div>
              <div className={styles.hoursRow}><span>Sunday</span><span className={styles.closed}>Closed</span></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formCard}>
            <h6 className={styles.cardTitle}>Send us a message</h6>

            {submitted && (
              <div className="alert alert-success py-2 mb-3" style={{ fontSize: '14px' }}>
                ✅ Message sent! We'll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-sm"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control form-control-sm"
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Message</label>
                <textarea
                  name="message"
                  className="form-control form-control-sm"
                  placeholder="Write your message here..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={`btn btn-primary btn-sm w-100 ${styles.submitBtn}`}>
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <h6 className={styles.faqTitle}>Frequently Asked Questions</h6>
          <p className={styles.faqSubtitle}>Quick answers to common questions.</p>

          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem} onClick={() => toggleFaq(i)}>
                <div className={styles.faqQuestion}>
                  <span>{faq.q}</span>
                  {openFaq === i ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </div>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;