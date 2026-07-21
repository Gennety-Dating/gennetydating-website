export interface Metric {
  label: string;
  color: "magenta" | "gold" | "sky";
}

export const metrics: Metric[] = [
  { label: "1,000+ Dates arranged", color: "magenta" },
  { label: "74% Success Rate", color: "gold" },
  { label: "92% Want a 2nd Date", color: "sky" },
];

export interface Testimonial {
  name: string;
  school: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ali",
    school: "USC",
    quote: "gennety makes it super easy to meet ppl i actually wanna see irl",
  },
  {
    name: "Leo",
    school: "Cal",
    quote: "I literally don't need to do anything and just wait for the AI match.",
  },
  {
    name: "Mars",
    school: "Cal",
    quote: "Because it's tied to your school, the quality feels guaranteed, and it just feels safer.",
  },
  {
    name: "Sophia",
    school: "Cal",
    quote: "I had been matched a few weeks ago, and I'm in an exclusive relationship with my date now!",
  },
  {
    name: "Justin",
    school: "UCSD",
    quote: "way more efficient than juggling 10 chats on other apps.",
  },
  {
    name: "Maya",
    school: "UCLA",
    quote: "Our first date was literally just getting hotdogs and walking around, and it was the best date I've had in years.",
  },
  {
    name: "Lucas",
    school: "Stanford",
    quote: "I was skeptical about AI matchmakers, but we ended up talking for hours and walking around campus all night.",
  },
  {
    name: "Elena",
    school: "Cal",
    quote: "No awkward swiping, no small talk. We just met up and clicked instantly.",
  },
  {
    name: "Dan",
    school: "USC",
    quote: "Gennety matched us based on our actual vibe instead of just photos. Couldn't be happier!",
  },
];
