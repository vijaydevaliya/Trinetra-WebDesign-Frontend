import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Receipt, ShieldCheck, Bell, Activity, TrendingUp } from 'lucide-react';

export const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('billing');

  return (
    <div className="rounded-3xl glass-card-light dark:glass-card-dark p-6 sm:p-8 border border-brand-500/20 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-200 dark:border-navy-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xl font-bold text-navy-950 dark:text-white">
              Vasuki Live Society Command Center
            </h3>
          </div>
          <p className="text-xs text-navy-600 dark:text-brand-200/70 mt-1">
            Gated Community Operational Intelligence Dashboard (Blue Theme)
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-1.5 p-1 bg-brand-100 dark:bg-navy-900 rounded-xl">
          {[
            { id: 'billing', label: 'Collections' },
            { id: 'visitors', label: 'Gate Access' },
            { id: 'tickets', label: 'Helpdesk' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'text-navy-700 dark:text-brand-200 hover:text-navy-950 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Units', value: '480 Units', icon: Users, change: '+100% Onboarded' },
          { title: 'MTD Collection', value: '₹ 18,45,000', icon: Receipt, change: '96.4% Reconciled' },
          { title: 'Gate Passes Today', value: '312 Verified', icon: ShieldCheck, change: '0 Incident Flags' },
          { title: 'Active Tickets', value: '4 Pending', icon: Bell, change: '< 45 min Avg SLA' },
        ].map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-brand-50 dark:bg-navy-900/80 border border-brand-500/15"
          >
            <div className="flex items-center justify-between text-brand-600 dark:text-brand-400 mb-2">
              <span className="text-xs font-medium text-navy-600 dark:text-brand-200/70">{m.title}</span>
              <m.icon className="w-4 h-4" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-navy-950 dark:text-white">
              {m.value}
            </div>
            <div className="text-[10px] font-semibold text-emerald-500 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>{m.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Animated Metric Visualization */}
      <div className="p-6 rounded-2xl bg-brand-50 dark:bg-navy-900 text-navy-900 dark:text-white border border-brand-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-navy-800 dark:text-brand-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-500 dark:text-brand-400" />
            <span>Monthly Maintenance Collection Breakdown</span>
          </h4>
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-300 font-mono">
            Auto-Reconciled
          </span>
        </div>

        {/* Animated Bar Graph */}
        <div className="space-y-3 pt-2">
          {[
            { label: 'Wing A & B Maintenance', pct: 98, amount: '₹7,80,000' },
            { label: 'Wing C & D Maintenance', pct: 94, amount: '₹6,40,000' },
            { label: 'Clubhouse & Facility Charges', pct: 88, amount: '₹2,75,000' },
            { label: 'EV Charging Utility Invoices', pct: 100, amount: '₹1,50,000' },
          ].map((bar, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-navy-700 dark:text-brand-100">{bar.label}</span>
                <span className="text-brand-600 dark:text-brand-400 font-semibold">{bar.amount} ({bar.pct}%)</span>
              </div>
              <div className="w-full h-2.5 bg-brand-100 dark:bg-navy-950 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.pct}%` }}
                  transition={{ duration: 1.2, delay: idx * 0.15, ease: 'easeOut' }}
                  className="h-full bg-brand-gradient rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
