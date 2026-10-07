export type SuperCategory = {
  name: string;
  shortName: string;
  href: string;
  image: string;
  active?: boolean;
};

export const superCategories: SuperCategory[] = [
  {
    name: "Photography",
    shortName: "Photography",
    href: "https://sharepal.in/bangalore/photography-on-rent",
    image:
      "https://images.sharepal.in/super-categories/Category+Card+Image.webp",
  },
  {
    name: "Gaming Gadgets",
    shortName: "Gaming",
    href: "/bangalore/gaming-gadgets-on-rent",
    image:
      "https://images.sharepal.in/super-categories/Category+Card+Image+(4).webp",
    active: true,
  },
  {
    name: "Outdoor Gear",
    shortName: "Outdoor",
    href: "https://sharepal.in/bangalore/outdoor-gears-on-rent",
    image:
      "https://images.sharepal.in/super-categories/Category+Card+Image+(3).webp",
  },
  {
    name: "Entertainment",
    shortName: "Entertainment",
    href: "https://sharepal.in/bangalore/entertainment-on-rent",
    image:
      "https://images.sharepal.in/super-categories/Category+Card+Image+(5).webp",
  },
];

export type SubCategory = {
  name: string;
  image: string;
  href: string;
  /** matches product name keywords for client side filtering */
  filter?: string[];
};

export const subCategories: SubCategory[] = [
  { name: "All", image: "", href: "https://sharepal.in/bangalore/gaming-gadgets-on-rent" },
  {
    name: "GTA VI",
    image: "https://images.sharepal.in/category-icons/gta-vi.webp",
    href: "https://sharepal.in/bangalore/gaming-gadgets-on-rent/gta-vi-on-rent",
    filter: ["gta"],
  },
  {
    name: "PS5 Console",
    image:
      "https://images.sharepal.in/sub-category-card/ps5-console-on-rent-sharepal.webp",
    href: "https://sharepal.in/bangalore/gaming-gadgets-on-rent/ps5-console-on-rent",
    filter: ["ps5", "playstation"],
  },
  {
    name: "Xbox Console",
    image:
      "https://images.sharepal.in/sub-category-card/xbox-console-on-rent-sharepal.webp",
    href: "https://sharepal.in/bangalore/gaming-gadgets-on-rent/xbox-console-on-rent",
    filter: ["xbox"],
  },
  {
    name: "VR",
    image:
      "https://images.sharepal.in/sub-category-card/vr-on-rent-sharepal.webp",
    href: "https://sharepal.in/bangalore/gaming-gadgets-on-rent/vr-on-rent",
    filter: ["vr", "oculus", "meta quest"],
  },
  {
    name: "Racing Wheel",
    image:
      "https://images.sharepal.in/categories/gaming-consoles/gaming-accessories/logitech-G29-driving-force-racing-wheel/logitech-g29-racing-wheel-on-rent-sharepal-1.webp",
    href: "https://sharepal.in/bangalore/gaming-gadgets-on-rent/gaming-controllers-on-rent",
    filter: ["racing", "wheel", "controller"],
  },
  {
    name: "Big Screen Gaming",
    image:
      "https://images.sharepal.in/categories/gaming-consoles/big-screen-gaming/products/ps5-with-2-controllers-with-projector-on-rent+.webp",
    href: "https://sharepal.in/bangalore/gaming-gadgets-on-rent/big-screen-gaming",
    filter: ["projector", "big screen"],
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How can I rent from SharePal?",
    answer:
      "Renting from SharePal is quick and easy. You can browse the products, select your dates and add them to cart and checkout. You can choose to pay online or upon delivery.",
  },
  {
    question:
      "If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?",
    answer:
      "No, partial extension is not possible, all the products that are rented in that particular order have to be extended.",
  },
  {
    question: "When does the rental start?",
    answer:
      "The rental starts from the following day of the delivery day and ends a day prior to the return date. So for example, if you select the delivery date as 5th June and return date as 8th June. The rental is charged for 2 days.",
  },
  {
    question: "What will be the condition of the products at the time of delivery?",
    answer:
      "At SharePal.in, we make sure that the products you receive are in great condition upon delivery. We thoroughly inspect and clean each item before sending it your way. If you ever face any issues, our friendly customer support team is here to help. Your satisfaction matters to us the most!",
  },
  {
    question: "Why is verification required?",
    answer:
      "Profile verification is a crucial step at SharePal.in to ensure the safety and security of our platform and users. It helps us confirm the identity of our users, prevent fraud, and maintain a secure environment for everyone involved.",
  },
  {
    question: "How is the rental calculated?",
    answer:
      "We want the rentals to be affordable & attractive to both short-term and long-term users. Hence, the rental is calculated in a way that the effective per-day rental reduces as you rent longer. For example, 1-day rental cost of GoPro 12 camera is Rs 1299, whereas 7-days cost is Rs 2799 which means the effective per-day rent is Rs 400 only.",
  },
  {
    question: "What is the minimum rental period?",
    answer: "You can get started with a rental period of just 2 days.",
  },
];

export type Review = {
  initials: string;
  name: string;
  city: string;
  category: string;
  quote: string;
  stars: number;
};

export const reviews: Review[] = [
  {
    initials: "SB",
    name: "Satyaki",
    city: "Kolkata",
    category: "Trekking Gear",
    stars: 5,
    quote:
      "I would recommend SharePal for anybody looking to rent trekking gears, on time delivery, condition of products delivered were very good, super transparent deposit return policy.",
  },
  {
    initials: "AS",
    name: "Afrana",
    city: "Bangalore",
    category: "Gaming Console",
    stars: 5,
    quote:
      "Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented trekking gear and PS4. Thanks Sharepal! Cheers to you guys!",
  },
  {
    initials: "KK",
    name: "Kanthikiran",
    city: "Bangalore",
    category: "Riding Gear",
    stars: 5,
    quote:
      "It's an amazing service, starting from the quality of the gear provided to the pickup and drop at doorstep facility. The staff is extremely helpful and supportive. The jacket was freshly washed and the shoes provided were brand new. The refund for the deposit was also processed immediately. We had no clue that this kind of service existed in India, SharePal.",
  },
  {
    initials: "AA",
    name: "Amal",
    city: "Bangalore",
    category: "Gaming Console",
    stars: 5,
    quote:
      "I am a regular customer and order ps4. It's very affordable and booking an order is super easy and user friendly website and polite staff.",
  },
  {
    initials: "PS",
    name: "Pankaj",
    city: "Mumbai",
    category: "Action Cameras",
    stars: 5,
    quote:
      "The experience with share pal is awesome . The camera , service provide by them is good. Overall I am Happy by renting camera gear from share pal. Next time I will rent the gears from share pal only. Must recommend to everyone",
  },
  {
    initials: "JS",
    name: "Jayaraman",
    city: "Mumbai",
    category: "Riding Gear",
    stars: 5,
    quote:
      "Great company amazing products at affordable prices and great service I would recommend share pal to everybody they really go out of the way for the best service I surely know I will be their forever customer.",
  },
  {
    initials: "MM",
    name: "Manish",
    city: "Mumbai",
    category: "Gaming console",
    stars: 5,
    quote:
      "I like the way sharepal work and really enjoyed the ps4 will order again. Thanks sharepal",
  },
  {
    initials: "RS",
    name: "Rakesh",
    city: "Mumbai",
    category: "Trekking Gear",
    stars: 3,
    quote:
      "Ordered 2 pair of shoes & 3 trekking poles. Shoes were in mint condition, very well cleaned and sanitized and so does the trekking poles. Delivery and pick-up was smooth. Refund was done within the time frame. If you have UPI it will be transferred immediately. I overall had a very good experience with Sharepal. Have recommended to my family and friends as well. Thank you Sharepal.",
  },
  {
    initials: "SJ",
    name: "Shruti",
    city: "Mumbai",
    category: "Winter Wear",
    stars: 5,
    quote:
      "Right from the time I saw their website, till i got my refund the entire experience with SharePal was brilliant. The product listing, prices, delivery, communication, return. Everything was spot on. Product quality was brilliant. The way the team solves your issues is so rare to find in today's times.. I dont think I am gonna look at any other place for my travel needs.",
  },
  {
    initials: "AK",
    name: "Amit",
    city: "Delhi",
    category: "Riding Gear",
    stars: 5,
    quote:
      "Awesome experience. Please be the way you are. Received excellent clothes and shoes in washed and clean state. They looked like new ones. Received hasslefree refund.",
  },
];

export const stats = [
  { value: "250Cr+", label: "Saved Together" },
  { value: "4.5M Kg", label: "CO₂e Emissions Saved" },
  { value: "100K+", label: "Products in Circulation" },
];

export type FooterColumn = { title: string; links: { label: string; href: string }[] };

/** Category link columns — the live site renders these with a broken
 *  `/undefined/` prefix, we fix it with the actual city slug. */
export const footerColumns: FooterColumn[] = [
  {
    title: "Action Cameras",
    links: [
      ["Action Cameras", "photography-on-rent/action-cameras-on-rent"],
      ["Pocket Cameras", "photography-on-rent/pocket-cameras-on-rent"],
      ["GoPro Cameras", "photography-on-rent/gopro-cameras-on-rent"],
      ["DJI Cameras", "photography-on-rent/dji-cameras-on-rent"],
      ["DJI Drones", "photography-on-rent/dji-drones-on-rent"],
      ["360 Cameras", "photography-on-rent/360-cameras-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
  {
    title: "Cameras",
    links: [
      ["DSLR Cameras", "photography-on-rent/dslr-cameras-on-rent"],
      ["Cameras", "photography-on-rent/all-cameras-on-rent"],
      ["iPhones", "photography-on-rent/iphones-on-rent"],
      ["DSLR Gimbal Combos", "photography-on-rent/dslr-gimbal-on-rent"],
      ["Wildlife Photography", "photography-on-rent/wildlife-photography-cameras-on-rent"],
      ["Tripod and camera accessories", "photography-on-rent/tripod-and-camera-accessories-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
  {
    title: "Trekking Gear",
    links: [
      ["Trekking Gear", "outdoor-gears-on-rent/trekking-gear-on-rent"],
      ["Trekking Jackets", "outdoor-gears-on-rent/trekking-jackets-on-rent"],
      ["Trek/Snow Pants", "outdoor-gears-on-rent/trek-snow-pants-on-rent"],
      ["Trekking Shoes", "outdoor-gears-on-rent/trekking-shoes-on-rent"],
      ["Trek Accessories", "outdoor-gears-on-rent/trek-accessories-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
  {
    title: "Riding Gear",
    links: [
      ["Riding Gear", "outdoor-gears-on-rent/riding-gear-on-rent"],
      ["Riding Luggage", "outdoor-gears-on-rent/riding-luggage-on-rent"],
      ["Riding Jackets", "outdoor-gears-on-rent/riding-jackets-on-rent"],
      ["Riding Essentials", "outdoor-gears-on-rent/riding-essentials-on-rent"],
      ["Riding Boots", "outdoor-gears-on-rent/riding-boots-on-rent"],
      ["Binoculars", "outdoor-gears-on-rent/binoculars-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
  {
    title: "Creator Gear",
    links: [
      ["Wireless & Collar Mics", "photography-on-rent/wireless-and-collar-mics-on-rent"],
      ["Professional Cameras", "photography-on-rent/professional-cameras-on-rent"],
      ["Mirrorless Cameras", "photography-on-rent/mirrorless-cameras-on-rent"],
      ["UNLMTD Vlogging", "photography-on-rent/unlmtd-vlogging-on-rent"],
      ["Mobile Gimbals", "photography-on-rent/mobile-gimbals-on-rent"],
      ["Vlogging", "photography-on-rent/vlogging-cameras-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
  {
    title: "Gaming Console",
    links: [
      ["PS5 Console", "gaming-gadgets-on-rent/ps5-console-on-rent"],
      ["VR", "gaming-gadgets-on-rent/vr-on-rent"],
      ["Racing Wheel", "gaming-gadgets-on-rent/gaming-controllers-on-rent"],
      ["Big Screen Gaming", "gaming-gadgets-on-rent/big-screen-gaming"],
      ["Xbox Console", "gaming-gadgets-on-rent/xbox-console-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
  {
    title: "Winter Wear",
    links: [
      ["Snow Boots", "outdoor-gears-on-rent/snow-boots-on-rent"],
      ["Winter Jackets", "outdoor-gears-on-rent/winter-jackets-on-rent"],
      ["Backpacks", "outdoor-gears-on-rent/backpacks-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
  {
    title: "Camping Gear",
    links: [
      ["Camping Gear", "outdoor-gears-on-rent/camping-gear-on-rent"],
      ["Camping Stools & Tables", "outdoor-gears-on-rent/camping-stools-and-tables-on-rent"],
      ["Camping Tents", "outdoor-gears-on-rent/camping-tents-on-rent"],
      ["Sleeping Bags & Mats", "outdoor-gears-on-rent/sleeping-bags-and-mats-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
  {
    title: "Audio Visual Equipment",
    links: [
      ["Projectors", "entertainment-on-rent/projectors-on-rent"],
      ["VR", "entertainment-on-rent/vr-on-rent"],
      ["Mics", "entertainment-on-rent/mics-on-rent"],
      ["Speakers", "entertainment-on-rent/speakers-on-rent"],
    ].map(([label, href]) => ({ label: label!, href: `/bangalore/${href}` })),
  },
];

export type FooterGroup = { title: string; links: { label: string; href: string; badge?: string }[] };

export const footerGroups: FooterGroup[] = [
  {
    title: "Sharepal",
    links: [
      { label: "About", href: "https://sharepal.in/about-us" },
      { label: "Why SharePal", href: "https://sharepal.in/why-sharepal" },
      { label: "Sitemap", href: "https://sharepal.in/sitemap" },
      { label: "CarePal", href: "https://sharepal.in/carepal" },
    ],
  },
  {
    title: "Become a Pal",
    links: [
      { label: "Sharepal for Creators", href: "https://sharepal.in/sharepal-for-creators" },
      { label: "Careers", href: "https://sharepal.in/life-at-sharepal?active=careers" },
      { label: "Sharepal for Brands", href: "https://sharepal.in/sharepal-for-brands" },
      { label: "Asset Funding Program", href: "https://assets.sharepal.in", badge: "New" },
      { label: "Rent Your Gear", href: "https://earnwithus.sharepal.in/", badge: "New" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "How it works?", href: "https://sharepal.in/how-sharepal-works" },
      { label: "FAQs", href: "https://sharepal.in/faq" },
      { label: "Verification", href: "https://sharepal.in/complete-verification" },
      { label: "Cancellation Policy", href: "https://sharepal.in/cancellation-policy" },
      { label: "Life at Sharepal", href: "https://sharepal.in/life-at-sharepal" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Terms & Condition", href: "https://sharepal.in/terms-and-conditions" },
      { label: "Shipping policy", href: "https://sharepal.in/shipping-policy" },
      { label: "Damage Policy", href: "https://sharepal.in/damage-policy" },
      { label: "Terms of Use", href: "https://sharepal.in/terms-of-use" },
      { label: "Privacy Policy", href: "https://sharepal.in/privacy-policy" },
    ],
  },
  {
    title: "Need Help",
    links: [
      { label: "Contact Us", href: "https://sharepal.in/support" },
      { label: "care@sharepal.in", href: "mailto:care@sharepal.in" },
    ],
  },
];
