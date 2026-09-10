export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://giovannivenditto.dev",
  email: process.env.NEXT_PUBLIC_EMAIL || "vendittogiovanni97@hotmail.it",
  contactEmail: process.env.CONTACT_EMAIL || "vendittogiovanni97@hotmail.it",
  authorName: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto",
  github: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "vendittogiovanni97",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME || "giovannivenditto",
  twitter: process.env.NEXT_PUBLIC_TWITTER_USERNAME || "giovannivenditto",
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL || "https://cal.com/giovannivenditto/15min",
} as const;
