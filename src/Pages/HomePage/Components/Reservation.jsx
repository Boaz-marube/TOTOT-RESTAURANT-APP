import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reservation() {
  // States
  const [date, setDate] = useState(new Date());
  const [guests, setGuests] = useState("");
  const [customGuests, setCustomGuests] = useState("");
  const [textCount, setTextCount] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phoneNumber: "",
    textBox: "",
  });

  // Load existing reservations on mount
  useEffect(() => {
    const saved = localStorage.getItem("reservations");
    if (saved) {
      setReservations(JSON.parse(saved));
    }
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "textBox") setTextCount(value.length);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleReserve = (e) => {
    e.preventDefault();

    // Simple validations
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newReservation = {
      ...formData,
      guests: guests === "Other" ? customGuests : guests,
      date: date.toLocaleDateString(),
    };

    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));

    setSuccessMessage("Thank you for your reservation!");
    setFormData({
      firstName: "",
      secondName: "",
      email: "",
      phoneNumber: "",
      textBox: "",
    });
    setGuests("");
    setCustomGuests("");
    setTextCount(0);
  };

  return (
    <section className="max-w-5xl mx-auto p-8 bg-amber-100 rounded shadow dark:bg-slate-600 ">
      <h1 className="text-4xl font-bold mb-6 font-playfair">Reservation Form</h1>

      {successMessage && (
        <p className="mb-4 text-green-700 font-medium">{successMessage}</p>
      )}

      <form onSubmit={handleReserve} className="border p-6 space-y-6">
        {/* Names */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full border px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Second Name</label>
            <input
              type="text"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full border px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full border px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+254 123456789"
              className="w-full border px-3 py-2"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block mb-1">Number of Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border px-3 py-2"
            required
          >
            <option value="">Select an option</option>
            <option value="1">One Person</option>
            <option value="2">Two People</option>
            <option value="4">Four People</option>
            <option value="Other">Other</option>
          </select>

          {guests === "Other" && (
            <input
              type="number"
              min="1"
              max="1000"
              placeholder="Enter number of guests"
              value={customGuests}
              onChange={(e) => setCustomGuests(e.target.value)}
              className="mt-3 w-full border px-3 py-2"
              required
            />
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1">Pick a Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            className="w-full border px-3 py-2"
            dateFormat="MM/dd/yyyy"
            minDate={new Date()}
            required
          />
        </div>

        {/* Note */}
        <div>
          <label className="block mb-1">
            Reservation Note{" "}
            <span className="text-sm text-gray-500 ">
              ({textCount}/500 characters)
            </span>
          </label>
          <textarea
            name="textBox"
            value={formData.textBox}
            onChange={handleChange}
            maxLength={500}
            placeholder="eg. Dietary restrictions, preferred seating..."
            className="w-full border px-3 py-2 h-28 "
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-ethiopian-red to-ethiopian-dark text-white rounded shadow hover:scale-105 transition"
          >
            Reserve
          </button>
        </div>
      </form>

      {/* Reservation List */}
      {reservations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Previous Reservations</h2>
          <ul className="space-y-2">
            {reservations.map((r, i) => (
              <li key={i} className="p-3 bg-white border rounded">
                <strong>{r.firstName} {r.secondName}</strong> reserved for{" "}
                <strong>{r.guests}</strong> guests on <strong>{r.date}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
