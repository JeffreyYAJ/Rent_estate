import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function FAQSection() {
	const faqs = [
		{
			question: "How can I book a property on RentHub?",
			answer:
				"Simply search for your desired destination, select your dates, and choose from our wide range of properties. You can book instantly through our secure payment system.",
		},
		{
			question: "Can I cancel my reservation?",
			answer:
				"Yes, cancellation policies vary depending on the property. You can check the specific cancellation terms before confirming your booking.",
		},
		{
			question: "Are there any service fees?",
			answer:
				"RentHub charges a small service fee to help us provide 24/7 customer support and maintain a safe platform for both guests and hosts.",
		},
		{
			question: "How do I contact the host?",
			answer:
				"After booking, you can message the host directly through our in-app chat to discuss any details or special requests.",
		},
	];

	// ✅ On utilise maintenant un tableau d'indices ouverts
	const [openIndexes, setOpenIndexes] = useState([]);

	const toggleFAQ = (index) => {
		setOpenIndexes((prev) => {
			// Si la question est déjà ouverte → on la referme
			if (prev.includes(index)) {
				return prev.filter((i) => i !== index);
			} else {
				// Sinon → on l’ajoute aux questions ouvertes
				return [...prev, index];
			}
		});
	};

	return (
		<section className="py-16 px-6 bg-white">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
					Frequently Asked Questions
				</h2>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
						>
							<button
								className="flex justify-between items-center w-full text-left p-5"
								onClick={() => toggleFAQ(index)}
							>
								<span className="text-gray-800 font-medium text-lg">
									{faq.question}
								</span>
								<FaChevronDown
									className={`text-gray-500 transition-transform duration-300 ${
										openIndexes.includes(index) ? "rotate-180" : ""
									}`}
								/>
							</button>

							{openIndexes.includes(index) && (
								<div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
									{faq.answer}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default FAQSection;
