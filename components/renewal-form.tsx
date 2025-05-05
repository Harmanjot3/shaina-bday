"use client"

import { useState, type FormEvent } from "react"
import { Playfair_Display, Dancing_Script } from "next/font/google"
import config from "@/config"
import { Send } from "lucide-react"

const playfair = Playfair_Display({ subsets: ["latin"] })
const dancingScript = Dancing_Script({ subsets: ["latin"] })

export function RenewalForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // Using EmailJS for client-side email sending
      // You'll need to replace these with your actual EmailJS credentials
      const templateParams = {
        to_email: config.form.recipientEmail,
        from_name: name,
        from_email: email,
        message: message,
      }

      // This is where you'd normally call EmailJS
      // For demonstration, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

    
      await emailjs.send(
        'service_s7ylpzb',
        'template_1dmwd2h',
        templateParams,
        '5bp6FYYb6yPAJlFDT'
      );
      

      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg my-16 border border-pink-200">
      <h2 className={`${dancingScript.className} text-3xl md:text-4xl text-center text-pink-600 mb-6`}>
        Send a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={`${playfair.className} block text-sm font-medium text-gray-700 mb-1`}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={`${playfair.className} block text-sm font-medium text-gray-700 mb-1`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className={`${playfair.className} block text-sm font-medium text-gray-700 mb-1`}>
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all resize-none"
            placeholder="Your message..."
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all ${
              status === "loading" ? "bg-pink-400 cursor-wait" : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
            }`}
          >
            {status === "loading" ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>

        {status === "success" && (
          <div className="p-4 bg-green-100 border border-green-200 rounded-lg text-green-700 text-center">
            {config.form.successMessage}
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-100 border border-red-200 rounded-lg text-red-700 text-center">
            {config.form.errorMessage}
          </div>
        )}
      </form>
    </div>
  )
}
