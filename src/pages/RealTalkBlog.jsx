import { motion } from "framer-motion";

const slackImg = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80";
const teamPhoto = "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80";
const dashboardBefore = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80";
const dashboardAfter = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80";

export default function RealTalkBlog() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">We Almost Lost Our First Client. Here's How We Saved It in 3 Days.</h1>

      {/* Slack Message */}
      <motion.img
        src={slackImg}
        alt="Slack message screenshot"
        className="rounded-xl shadow-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Animated Typing-like Text */}
      <motion.p
        className="text-lg italic text-gray-700 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        "We had 72 hours. Zero sleep. Full panic."
      </motion.p>

      {/* Team Photo */}
      <div className="mb-6">
        <img
          src={teamPhoto}
          alt="Team working late"
          className="rounded-xl shadow-md"
        />
        <p className="text-sm text-center text-gray-500 mt-2">
          This was us. 2 AM. 3 coffees down.
        </p>
      </div>

      {/* Before/After Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <img src={dashboardBefore} alt="Before dashboard" className="rounded-md" />
          <p className="text-sm text-center mt-2 text-red-500">Before: Chaos.</p>
        </div>
        <div>
          <img src={dashboardAfter} alt="After dashboard" className="rounded-md" />
          <p className="text-sm text-center mt-2 text-green-600">After: Clarity.</p>
        </div>
      </div>

      {/* Punchline */}
      <motion.div
        className="text-xl text-center font-semibold mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        Delivered. On time. Just barely.
      </motion.div>
    </div>
  );
}