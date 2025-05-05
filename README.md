# Birthday Tribute Page

A beautiful, responsive birthday tribute page with 3D effects, animations, and customizable content.

## How to Customize

### Step 1: Edit the content

Open the `config.ts` file to customize the text, photos, videos, and new features:

- `yourName`: Change this to your name
- `firstMessage`: Edit the first message that appears
- `secondMessage`: Edit the second message that appears
- `photos`: Add or remove photos from the carousel
- `videos`: Add or remove videos from the video player
- `form`: Configure the contact form settings
- `subscriptionPlans`: Edit the subscription plan details
- `audio`: Change the audio file settings

### Step 2: Replace Photos

1. Add your own photos to the `/public/images` folder
2. Update the `photos` array in `config.ts` to point to your new images:

\`\`\`ts
photos: [
  { 
    src: "/images/your-photo-1.jpg", 
    caption: "Your custom caption" 
  },
  // Add more photos...
]
\`\`\`

### Step 3: Replace Videos

1. Add your own videos to the `/public/videos` folder
2. Update the `videos` array in `config.ts` to point to your new videos:

\`\`\`ts
videos: [
  { 
    src: "/videos/your-video-1.mp4", 
    poster: "/images/video-thumbnail-1.jpg", // Optional thumbnail
    caption: "Your video caption" 
  },
  // Add more videos...
]
\`\`\`

### Step 4: Replace Audio

1. Replace the audio file at `/public/birthday_song.mp3` with your own audio file
2. Make sure to keep the same filename or update the path in `config.ts`:

\`\`\`ts
audio: {
  src: "/your-audio-file.mp3",
  title: "Your Audio Title",
}
\`\`\`

### Step 5: Configure the Contact Form

To make the contact form work with EmailJS:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service and template
3. Get your service ID, template ID, and user ID
4. Open `components/renewal-form.tsx` and uncomment the EmailJS code
5. Replace the placeholder values with your actual EmailJS credentials:

\`\`\`ts
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  templateParams,
  'YOUR_PUBLIC_KEY'
);
\`\`\`

6. Add the EmailJS script to `app/layout.tsx`:

\`\`\`tsx
<head>
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
  <script type="text/javascript">
    {`(function() {
      emailjs.init('YOUR_PUBLIC_KEY');
    })();`}
  </script>
</head>
\`\`\`

## Deployment

You can easily deploy this site to Vercel, Netlify, or any other static hosting provider:

### Deploy to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository on Vercel
3. Let Vercel automatically detect and deploy your Next.js app

### Deploy to Netlify

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository on Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `out`

### Build Locally

If you prefer to deploy the built files manually:

1. Run `npm run build`
2. The static files will be generated in the `out` directory
3. Upload the contents of the `out` directory to any web hosting service

## Customization Tips

- To change colors: Edit the color values in `tailwind.config.ts`
- To change fonts: Replace the font imports in `app/page.tsx` with your preferred Google Fonts
- To change animations: Modify the GSAP animations in `app/page.tsx`
- To adjust side decorations: Edit the settings in `components/side-decorations.tsx`

Enjoy your beautiful birthday tribute page!
