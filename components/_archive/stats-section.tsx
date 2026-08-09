// Archived unmounted alternative. Retained for design history only.
"use client";

import { motion } from "framer-motion";

interface StatItemProps {
  number: string;
  unit: string;
  title: string;
  details: string;
}

function StatCard({ number, unit, title, details }: StatItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start w-full group"
    >
      {/* Stat Number and Unit Row */}
      <div className="flex items-baseline font-display font-black text-8xl md:text-[9.5rem] leading-[82%] tracking-[-4px] sm:tracking-[-6px] select-none text-white">
        {number}
        <span className="text-primary font-mono text-4xl sm:text-5xl md:text-6xl ml-1 font-bold">
          {unit}
        </span>
      </div>

      {/* Brutalist Divider Line */}
      <div className="w-full h-[1px] bg-hairline my-6 group-hover:bg-primary transition-colors duration-300" />

      {/* Stat Description */}
      <h3 className="font-sans text-lg font-semibold text-white tracking-tight uppercase font-mono text-xs text-muted mb-2">
        {title}
      </h3>
      <p className="font-sans text-sm text-muted leading-relaxed max-w-[240px]">
        {details}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const stats: StatItemProps[] = [
    {
      number: "12",
      unit: "+",
      title: "Years Experience",
      details: "Across SaaS, AI tools, dashboards, and web/mobile products.",
    },
    {
      number: "2",
      unit: "x",
      title: "Conversion Lift",
      details: "Booking flows and landing pages improved through testing and UX iteration.",
    },
    {
      number: "20",
      unit: "+",
      title: "Products Shipped",
      details: "Platforms, apps, tools, websites, and product flows from brief to launch.",
    },
    {
      number: "25",
      unit: "%",
      title: "Faster Handoff",
      details: "Design systems and AI-assisted workflows reducing design-to-dev time.",
    },
  ];

  return (
    <section className="w-full px-6 sm:px-12 py-20 border-t border-b border-hairline bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            {"// PROOF BEHIND THE WORK"}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
