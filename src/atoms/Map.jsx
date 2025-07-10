import React from 'react'

export const Map = () => {
  return (
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
 )
}
