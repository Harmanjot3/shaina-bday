// Edit this file to customize the content of your birthday page

export default {
  // Your name (will appear in the footer)
  yourName: "Duduuu/Gulupuchuu",

  // First message (will appear in the first message box)
  firstMessage:
    "On your special day, I want to celebrate everything about you. Your creativity, your passion for design, and your beautiful heart make every day brighter. I'm so grateful to have you in my life and to watch you grow in your amazing talents. You inspire me every day with your artistic vision and attention to detail. Happy birthday to the most wonderful girlfriend in the world!",

  // Second message (will appear in the second message box)
  secondMessage:
    "You see beauty in everything around you. Your eye for design is incredible, and I love watching your face light up when you talk about your creative projects. The way you find inspiration in the smallest details makes me appreciate the world in new ways. Your dedication to your craft and your endless creativity are just two of the countless reasons why I love you so much.",

  // Photos to display in the carousel
  // To replace these with your own photos:
  // 1. Add your images to the /public/images folder
  // 2. Update the paths below to point to your images
  photos: [
    {
      src: "/placeholder.svg?height=800&width=1200",
      caption: "Our first date at the beach",
    },
    {
      src: "/placeholder.svg?height=800&width=1200",
      caption: "That amazing concert we went to",
    },
    {
      src: "/placeholder.svg?height=800&width=1200",
      caption: "Hiking adventure",
    },
    {
      src: "/placeholder.svg?height=800&width=1200",
      caption: "Coffee shop where we first met",
    },
    {
      src: "/placeholder.svg?height=800&width=1200",
      caption: "Weekend getaway",
    },
  ],

  // Videos to display in the carousel
  // To replace these with your own videos:
  // 1. Add your videos to the /public/videos folder
  // 2. Update the paths below to point to your videos
  videos: [
    {
      src: "/placeholder.mp4",
      poster: "/placeholder.svg?height=800&width=1200",
      caption: "Our road trip memories",
    },
    {
      src: "/placeholder.mp4",
      poster: "/placeholder.svg?height=800&width=1200",
      caption: "Dancing in the rain",
    },
  ],

  // Form settings
  form: {
    recipientEmail: "harmanjotsingh555@gmail.com",
    successMessage: "Meri pyaari gulupuchuu , everything for youu......",
    errorMessage: "Arre bc , ee ka hoagaya.",
  },

  // Subscription plans
  subscriptionPlans: [
    {
      name: "Silver",
      price: "1 fototeta",
      features: ["Basic access", "Thoda chutiya", "Emotional support"],
      recommended: false,
      color: "bg-gradient-to-br from-gray-100 to-gray-300",
    },
    {
      name: "Gold",
      price: "2 fototeta",
      features: ["Gaand faad access", "Thik thaak", "Full emotional support"],
      recommended: false,
      color: "bg-gradient-to-br from-amber-100 to-amber-300",
    },
    {
      name: "Platinum",
      price: "3 fototeta",
      features: ["Gaand phad 24x7 access", "Isharo pe nachega", "Life time validity"],
      recommended: true,
      color: "bg-gradient-to-br from-slate-100 to-slate-300",
    },
  ],

  // Audio settings
  audio: {
    src: "/birthday_song.mp3",
    title: "Happy Birthday Piano",
  },
}
