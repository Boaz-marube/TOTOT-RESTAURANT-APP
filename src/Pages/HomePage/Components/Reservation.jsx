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
    <div className="p-8 dark:bg-slate-900">
      <section className="max-w-5xl p-4 mx-auto rounded shadow bg-amber-100 dark:bg-slate-600 dark:text-white">
        <h1 className="mb-4 text-4xl font-bold font-playfair">
          Reservation Form
        </h1>

        {successMessage && (
          <p className="mb-4 font-medium text-green-700">{successMessage}</p>
        )}

        <form onSubmit={handleReserve} className="p-2 space-y-0 border rounded">
          {/* Names */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full h-8 px-3 py-2 border"
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
                className="w-full h-8 px-3 py-2 border"
                required
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full h-8 px-3 py-2 border"
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
                className="w-full h-8 px-3 py-2 border"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block mb-1">Number of Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full dark:text-black h-10 px-3 py-2 border"
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
                className="w-full px-3 py-2 mt-3 border"
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
              className="w-full dark:text-black h-8 px-3 py-2 border h"
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
              className="w-full h-20 px-3 py-2 border "
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-3 py-2 text-white transition rounded shadow bg-gradient-to-r from-ethiopian-red to-ethiopian-dark hover:scale-105"
            >
              Reserve
            </button>
          </div>
        </form>

        {reservations.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Previous Reservations
            </h2>

            <div className="pr-2 overflow-y-auto max-h-44">
              <ul className="space-y-2 dark:text-black">
                {reservations.map((r, i) => (
                  <li key={i} className="p-3 bg-white border rounded">
                    <strong>
                      {r.firstName} {r.secondName}
                    </strong>{" "}
                    reserved for <strong>{r.guests}</strong> guests on{" "}
                    <strong>{r.date}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
