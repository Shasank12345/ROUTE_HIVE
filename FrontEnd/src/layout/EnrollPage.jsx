import React, { useState } from 'react';

export default function EnrollPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        school: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, address, role, school } = formData;

        if (!name || !email || !phone || !address || !role || !school) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/enroll/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.status === 201) {
                alert("Thank you! Your Enrollment has been submitted.");
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    role: '',
                    school: '',
                });
            } else if (response.status === 409) {
                alert(result.message || 'You are already enrolled.');
            } else {
                alert(result.message || 'Failed to submit form.');
            }
        } catch (error) {
            console.error("ERROR SUBMITTING FORM:", error);
            alert("Something went wrong while submitting, please try again.");
        }
    };

    return (
        <div className="relative top-[45px] min-h-screen bg-gray-100 pt-8">
            <section className="bg-gradient-to-r from-yellow-100 to-purple-100 py-10">
                <div className="max-w-6xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800">ENROLL NOW</h2>
                    <p className="text-2xl font-semibold text-gray-700 mt-4">Join our platform and manage your transport needs.</p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-12 px-4 flex justify-center">
                <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            { id: 'name', name: 'name', label: 'Full Name', placeholder: 'Enter your full name' },
                            { id: 'email', name: "email", label: 'Email Address', placeholder: 'Enter your email', type: 'email' },
                            { id: 'phone', name: "phone", label: 'Phone Number', placeholder: 'Enter your 10-digit phone number', type: 'tel' },
                            { id: 'address', name: "address", label: 'Pickup Address', placeholder: 'Enter your pickup address' },
                            { id: 'role', name: "role", label: 'Role', placeholder: 'e.g., Student or Faculty' },
                            { id: 'school', name: "school", label: 'School / Branch', placeholder: 'Enter your school or branch' },
                        ].map(({ id, label, placeholder, type = 'text' }) => (
                            <div key={id}>
                                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    id={id}
                                    name={id}
                                    value={formData[id]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
