import { useState, useEffect } from "react"; 
import logo from "@/assets/toto-logo.png";
import { Link } from "react-router-dom";
import { Phone, Locate, Mail } from "lucide-react";
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [displayTime, setDisplayTime] = useState("");

  const formatTime = (hours, minutes) => {
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;
  };

  const checkOpenStatus = (day, hour) => {
    if (day >= "Mon" && day <= "Thu") {
      return hour >= 11 && hour < 21; // 11AM-9PM
    } else if (day === "Fri" || day === "Sat") {
      return hour >= 11 && hour < 22; // 11AM-10PM
    } else if (day === "Sun") {
      return hour >= 12 && hour < 20; // 12PM-8PM
    }
    return false;
  };

  const updateTime = () => {
    const now = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();

    setCurrentDay(day);
    setDisplayTime(formatTime(hours, minutes));
    setIsOpen(checkOpenStatus(day, hours));
  };

  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);
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
                <img src={logo} alt="Totot logo" className="h-5 w-7" />
              </div>
              <h2 className="text-xl font-bold font-playfair">
                Totot Restaurant
              </h2>
            </div>

            {/* Contact Information */}
            <address className="space-y-3 not-italic">
              <div className="flex items-start space-x-3">
                <Locate className="w-5 h-5 fa-solid fa-envelope text-amber-300" />
                <div>
                  <p className="leading-relaxed text-amber-100">
                    123 Bole Road, Addis Ababa,
                  </p>
                  <p className="text-amber-100">Ethiopia</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 fa-solid fa-envelope text-amber-300" />
                <a
                  href="tel:+251111234567"
                  className="transition-colors text-amber-100 hover:text-white"
                >
                  +251 11 123 4567
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 fa-solid fa-envelope text-amber-300" />
                <a
                  href="mailto:info@tototrestaurant.com"
                  className="transition-colors text-amber-100 hover:text-white"
                >
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
          <section>
            <h3 className="mb-6 text-xl font-semibold text-amber-100 font-playfair">
              Hours
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">
                  {isOpen ? (
                    <span className="text-green-400">We're Open!</span>
                  ) : (
                    <span className="text-red-400">Currently Closed</span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-200">Mon-Thu:</span>
                <span className="font-medium text-white">
                  11:00 AM - 9:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-200">Fri-Sat:</span>
                <span className="font-medium text-white">
                  11:00 AM - 10:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-200">Sun:</span>
                <span className="font-medium text-white">
                  12:00 PM - 8:00 PM
                </span>
              </div>
            </div>
          </section>

          {/* Quick Links Section */}
          <section>
            <h3 className="mb-6 text-xl font-semibold text-amber-100 font-playfair">
              Quick Links
            </h3>
            <nav>
              <ul className="space-y-3">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#signature-dish", label: "Menu" },
                  { href: "#reservation", label: "Reservation" },
                  { href: "#contact", label: "Contact Us" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      to={{ pathname: "/", hash: link.href }}
                      className="flex items-center space-x-2 transition-colors text-amber-200 hover:text-white"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {/* Find Us Section with Map */}
          <section id="location" className="py-6 rounded-lg bg-slate-100 dark:bg-black">
                <div className="px-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Find Us Here
                </h2>
                <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.7584772662335!2d38.8061996!3d9.0071273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8599dd6be6a5%3A0x6f01def6f8644ea2!2zVG90b3QgVHJhZGl0aW9uYWwgZm9vZCBIYWxsIHwgR2VyamkgfCDhibbhibbhibUgfCDhjIjhiK3hjII!5e1!3m2!1sen!2ske!4v1751077256676!5m2!1sen!2ske"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Restaurant Location Map"
                    ></iframe>
                </div>
                </div>
            </section>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-12 border-t border-amber-800">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-amber-200">
              &copy; 2025 Totot Restaurant. All rights reserved.
            </p>
            <nav>
              <ul className="flex space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="underline transition-colors text-amber-200 hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
