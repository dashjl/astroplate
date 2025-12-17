import React, { useState } from 'react';

const QuizResultsForm = ({ rankedList }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/quiz-results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, rankedList }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setMessage('Your results have been sent!');
            } else {
                setSubmitStatus('error');
                setMessage('Failed to send results. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-5 p-5 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-center text-2xl font-bold text-gray-900 mb-4">Get Your Ranked Goals!</h3>
            <p className="text-center text-gray-700 mb-6">Enter your name and email to receive your personalized ranked goals and insights.</p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send My Results'}
                </button>
            </form>

            {submitStatus && (
                <div className={`mt-4 p-3 rounded-md text-center ${submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            {/* Display Ranked List after submission or if no form is needed (e.g., for testing) */}
            {submitStatus === 'success' && (
                <div className="mt-8">
                    <h4 className="text-center text-xl font-bold text-gray-900 mb-4">Your Ranked Goals:</h4>
                    <div className="max-w-md mx-auto space-y-4">
                        {rankedList.map((item, index) => (
                            <div key={index} className="p-5 bg-white border-gray-100 rounded-lg shadow-md">
                                <div className="flex items-start">
                                    <div className={`flex-shrink-0 text-3xl mr-4 text-blue-500`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h6 className="font-extrabold text-xl text-gray-800">{item.name}</h6>
                                        <p className="mt-1 text-gray-600 mb-0">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizResultsForm;