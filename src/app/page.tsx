import Head from 'next/head';
import Header from './components/layout/Header'; // Import the Header component
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Join Our Freelancer Network</title>
        <meta name="description" content="Join our network of freelancers, learn in-demand skills, and get priority access to high-paying gigs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6">Join Our Network of Top Freelancers</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Learn [Specific Skill] for Free, Boost Your Career, and Get Priority Access to Exclusive Gigs.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300">
            Join Now – It’s Free!
          </button>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-12 text-blue-900">Why Join Our Network?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Access Exclusive Gigs", description: "Be the first to know about high-paying opportunities." },
              { title: "Learn [Specific Skill]", description: "Master a skill that’s in demand and boost your earning potential." },
              { title: "Build Your Portfolio", description: "Work on exciting projects and grow your freelance career." },
              { title: "Network with Top Professionals", description: "Connect with like-minded freelancers and clients." },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Learning Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Learn [Specific Skill] for Free</h2>
            <p className="text-gray-700 mb-8">
              We’ll teach you [specific skill] through our free, easy-to-follow resources. Whether you’re a beginner or looking to level up, this skill will make you a top choice for clients.
            </p>
            <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition duration-300">
              Start Learning Now
            </button>
          </div>
          <div className="md:w-1/2 p-6">
            <img src="/learning.png" alt="Learning" className="rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* Priority Access Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Get First Dibs on High-Paying Gigs</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            When you join our network and learn [specific skill], you’ll be at the top of our list when new gigs come in. No more competing with hundreds of freelancers – you’ll get priority access.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300">
            Join the Network
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-12 text-blue-900">What Our Freelancers Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Web Developer", quote: "This network changed my career!" },
              { name: "Jane Smith", role: "Graphic Designer", quote: "I got my first gig within a week!" },
              { name: "Alex Johnson", role: "Content Writer", quote: "The learning resources are amazing!" },
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-blue-900">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-12 text-blue-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "Sign Up for Free", description: "Create your free account in minutes." },
              { step: "Learn [Specific Skill]", description: "Access our free resources and tutorials." },
              { step: "Get Priority Access", description: "Be first in line for exclusive gigs." },
              { step: "Start Earning", description: "Work on projects and grow your income." },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{item.step}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Your Freelance Career to the Next Level?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our network today, learn [specific skill], and get priority access to high-paying gigs.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300">
            Sign Up Now – It’s Free!
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}