import React from "react";
import { Map } from "../atoms/map";

const Footer = () => {
  return (
    <footer className="text-white bg-amber-900">
      <div className="container px-6 py-12 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Restaurant Info Section */}
          <section className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg">
                <img src="/base/images/toto logo.png" alt="Totot logo" className="h-5 w-7" />
              </div>
              <h2 className="text-xl font-bold">Totot Restaurant</h2>
            </div>

            {/* Contact Information */}
            <address className="space-y-3 not-italic">
              <div className="flex items-start space-x-3">
                <i className="fa-solid fa-location-dot text-amber-300 mt-0.5 w-5 h-5"></i>
                <div>
                  <p className="leading-relaxed text-amber-100">123 Bole Road, Addis Ababa,</p>
                  <p className="text-amber-100">Ethiopia</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-phone text-amber-300 w-5 h-5"></i>
                <a href="tel:+251111234567" className="transition-colors text-amber-100 hover:text-white">
                  +251 11 123 4567
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-envelope text-amber-300 w-5 h-5"></i>
                <a href="mailto:info@tototrestaurant.com" className="transition-colors text-amber-100 hover:text-white">
                  info@tototrestaurant.com
                </a>
              </div>
            </address>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {[
                { href: "https://facebook.com", icon: "fa-facebook-f" },
                { href: "https://instagram.com", icon: "fa-instagram" },
                { href: "https://x.com", icon: "fa-x-twitter" },
                { href: "https://linkedin.com", icon: "fa-linkedin-in" },
                { href: "https://youtube.com", icon: "fa-youtube" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-amber-300 hover:text-white"
                >
                  <i className={`fa-brands ${item.icon} w-6 h-6`}></i>
                </a>
              ))}
            </div>
          </section>

          {/* Hours Section */}
          <section>
            <h3 className="mb-6 text-xl font-semibold text-amber-100">Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-amber-200">Mon-Thu:</span>
                <span className="font-medium text-white">11:00 AM - 9:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-200">Fri-Sat:</span>
                <span className="font-medium text-white">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-200">Sun:</span>
                <span className="font-medium text-white">12:00 PM - 8:00 PM</span>
              </div>
            </div>
          </section>

          {/* Quick Links Section */}
          <section>
            <h3 className="mb-6 text-xl font-semibold text-amber-100">Quick Links</h3>
            <nav>
              <ul className="space-y-3">
                {[
                  { href: "#hero-section", label: "Home" },
                  { href: "#signature-dish", label: "Menu" },
                  { href: "#story", label: "Our Story" },
                  { href: "#contact", label: "Contact Us" },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="flex items-center space-x-2 transition-colors text-amber-200 hover:text-white"
                    >
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {/* Find Us Section with Map */}
            <Map/>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-12 border-t border-amber-800">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-amber-200">&copy; 2025 Totot Restaurant. All rights reserved.</p>
            <nav>
              <ul className="flex space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="underline transition-colors text-amber-200 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
