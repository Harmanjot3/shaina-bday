"use client"

import { useState } from "react"
import { Playfair_Display, Dancing_Script } from "next/font/google"
import { Check } from "lucide-react"
import config from "@/config"

const playfair = Playfair_Display({ subsets: ["latin"] })
const dancingScript = Dancing_Script({ subsets: ["latin"] })

export function SubscriptionPlans() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <div className="my-16">
      <h2 className={`${dancingScript.className} text-3xl md:text-4xl text-center text-pink-600 mb-8`}>
        Subscription Plans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {config.subscriptionPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
              hoveredPlan === index ? "transform scale-105" : ""
            } ${plan.recommended ? "border-2 border-pink-400" : "border border-pink-200"}`}
            onMouseEnter={() => setHoveredPlan(index)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {/* Plan header */}
            <div className={`${plan.color} p-6 text-center`}>
              <h3 className={`${dancingScript.className} text-2xl font-bold text-gray-800`}>{plan.name}</h3>
              <div className={`${playfair.className} text-3xl font-bold mt-2 text-gray-900`}>{plan.price}</div>

              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  RECOMMENDED
                </div>
              )}
            </div>

            {/* Plan features */}
            <div className="bg-white p-6">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check size={18} className="text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className={`${playfair.className} text-gray-700`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full mt-6 py-2 rounded-lg transition-colors ${
                  plan.recommended
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
