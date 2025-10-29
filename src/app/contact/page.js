export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 text-text-primary">
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg text-text-secondary">Feel free to get in touch with us for any inquiries or support!</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start">
        <div className="md:w-1/2 bg-secondary p-8 rounded-lg shadow-lg mb-8 md:mb-0 md:mr-8 animate-fade-in-left">
          <h3 className="text-2xl font-bold mb-4">Our Contact Information</h3>
          <p className="text-lg mb-2"><strong>Address:</strong> 123 Main Street, Colombo, Sri Lanka</p>
          <p className="text-lg mb-2"><strong>Phone:</strong> +94 71 123 4567</p>
          <p className="text-lg mb-2"><strong>Email:</strong> info@elitewheels.com</p>
          <p className="text-lg"><strong>Working Hours:</strong> Mon-Fri: 9:00 AM - 6:00 PM</p>
        </div>
        <div className="md:w-1/2 bg-secondary p-8 rounded-lg shadow-lg animate-fade-in-right">
          <h3 className="text-2xl font-bold mb-4">Send us a message</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-text-primary">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 bg-primary border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-text-primary">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-primary border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium text-text-primary">Message</label>
              <textarea id="message" name="message" rows="5" className="mt-1 block w-full px-3 py-2 bg-primary border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" required></textarea>
            </div>
            <button type="submit" className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}