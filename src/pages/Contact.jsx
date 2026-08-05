import Gallery from '../components/Gallery';
import styles from './Contact.module.css';

const contactImages = [
  { src: 'https://nec.edu.in/wp-content/uploads/2024/01/NEC-Campus-Map-e1704276796159-1024x542.png', alt: 'NEC Campus Map' },
  { src: 'https://img.jagranjosh.com/images/2023/January/312023/National-Engineering-College-NEC-Kovilpatti-Campus-View-2.jpg', alt: 'NEC Campus View' },
  { src: 'https://content3.jdmagicbox.com/comp/kovilpatti/p5/9999p4632.4632.090822183654.a6p5/catalogue/national-engineering-college-kovilpatti-ho-kovilpatti-colleges-23zwuj7.jpg', alt: 'NEC Entrance' },
  { src: 'https://scontent-maa5-1.xx.fbcdn.net/v/t39.30808-6/481062479_1067604305390884_1781148536631099881_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=6Tf14pvxD5EQ7kNvwGbs9F_&_nc_oc=AdkJYxsrOolkAew7fGS0G4bkOcQdBu0WIjwn9ySIwE6jERXU5fTO5HsmRLAM2W6UkLU&_nc_zt=23&_nc_ht=scontent-maa5-1.xx&_nc_gid=281vIJkJqfZccofnq9jsuA&oh=00_AfmfXq_4zoQwnEcmunOH7mpXOkgvkAtdE898XGgcQHT_vw&oe=6951F338', alt: 'NEC Building' }
];

export default function Contact() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <div className="glass-card">
          <h2 className={styles.heroTitle}>Contact Us</h2>
          <p className={styles.heroSubtitle}>We're here to help! Reach out for admissions, inquiries, or any assistance.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.grid}>
          <div className="glass-card">
            <h2 className="section-title">Contact Details</h2>
            
            <div className={styles.detailBlock}>
              <h3>College Address</h3>
              <p>National Engineering College (Autonomous)<br/>
              K.R. Nagar, Kovilpatti – 628 503<br/>
              Thoothukudi District, Tamil Nadu, India</p>
            </div>

            <div className={styles.detailBlock}>
              <h3>Phone Numbers</h3>
              <p><strong>Office:</strong> 04632 – 222 502<br/>
              <strong>Mobile:</strong> 93859 76674, 93859 76684</p>
            </div>

            <div className={styles.detailBlock}>
              <h3>Email</h3>
              <p><strong>Principal:</strong> <a href="mailto:principal@nec.edu.in">principal@nec.edu.in</a><br/>
              <strong>Help Desk:</strong> <a href="mailto:nechelpdesk@nec.edu.in">nechelpdesk@nec.edu.in</a></p>
            </div>

            <div className={styles.detailBlock}>
              <h3>Website & Fax</h3>
              <p><strong>Website:</strong> <a href="https://nec.edu.in" target="_blank" rel="noreferrer">www.nec.edu.in</a><br/>
              <strong>Fax:</strong> 04632 – 232749</p>
            </div>
          </div>

          <div className="glass-card">
            <h2 className="section-title">Location Map</h2>
            <div className={styles.mapWrap}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.292028289299!2d77.831199614795!3d9.146499993418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06a5e5e5e5e5e5%3A0x1234567890abcdef!2sNational%20Engineering%20College!5e0!3m2!1sen!2sin!4v1730000000000" 
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="NEC Location Map"
              ></iframe>
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <a href="https://maps.app.goo.gl/7LoyAxyXG8eDs6MS9" target="_blank" rel="noreferrer" className="btn-primary">
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <Gallery images={contactImages} title="Campus Location & Views" />
    </div>
  );
}
