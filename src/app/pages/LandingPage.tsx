import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Bot, MessageSquare, Brain, Activity, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-xl bg-mw-bg-secondary/40 backdrop-blur-md border border-mw-border-subtle hover:border-mw-accent-cyan/30 hover:shadow-lg transition-all"
    >
      <div className="w-12 h-12 rounded-lg bg-mw-bg-tertiary flex items-center justify-center mb-4 text-mw-accent-cyan">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-heading font-semibold text-mw-text-primary mb-2">{title}</h3>
      <p className="text-sm text-mw-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 text-center space-y-8">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-mw-accent-cyan/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-mw-accent-violet/10 rounded-full blur-[80px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-mw-border-subtle bg-mw-bg-secondary/50 text-xs font-medium text-mw-accent-cyan mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mw-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mw-accent-cyan"></span>
            </span>
            v1.0 is now available
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
            Weave memories <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-accent-cyan to-mw-accent-violet">
              into your NPCs
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-mw-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Give your characters persistent long-term memory, dynamic personalities, and the ability to build relationships over time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/docs/introduction/what-is-clawdblox" 
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-mw-accent-cyan to-mw-accent-violet text-white font-semibold shadow-lg shadow-mw-accent-cyan/20 hover:shadow-mw-accent-cyan/40 hover:scale-105 transition-all flex items-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <a 
              href="https://github.com/memoryweave" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full bg-mw-bg-secondary border border-mw-border-default text-mw-text-primary font-medium hover:bg-mw-bg-tertiary transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>
        
        {/* Code Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden border border-mw-border-default bg-[#0d1117] shadow-2xl"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-mw-border-default">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="ml-4 text-xs text-mw-text-tertiary font-mono">example.lua</div>
          </div>
          <div className="p-6 overflow-x-auto text-left">
            <pre className="font-mono text-sm leading-relaxed text-mw-text-primary">
              <code>
<span className="text-mw-accent-violet">local</span> MemoryWeave = <span className="text-mw-accent-cyan">require</span>(<span className="text-green-400">"MemoryWeave"</span>)<br/>
<br/>
<span className="text-mw-text-secondary">-- Initialize an NPC with personality</span><br/>
<span className="text-mw-accent-violet">local</span> shopkeeper = MemoryWeave.NPC.<span className="text-yellow-400">new</span>(<span className="text-green-400">"Marcus"</span>, &#123;<br/>
&nbsp;&nbsp;traits = &#123; openness = <span className="text-orange-400">0.8</span>, extraversion = <span className="text-orange-400">0.6</span> &#125;,<br/>
&nbsp;&nbsp;role = <span className="text-green-400">"Blacksmith"</span><br/>
&#125;)<br/>
<br/>
<span className="text-mw-text-secondary">-- Speak to the NPC (context is automatically retrieved)</span><br/>
shopkeeper:<span className="text-yellow-400">speak</span>(<span className="text-green-400">"Hello again! Do you have that sword I asked for?"</span>)
              </code>
            </pre>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard 
          icon={Brain}
          title="Persistent Memory"
          description="NPCs remember past conversations, player actions, and world events using vector-based long-term memory."
        />
        <FeatureCard 
          icon={Activity}
          title="Dynamic Personality"
          description="OCEAN personality traits shape how NPCs speak, react, and make decisions — every NPC feels unique."
        />
        <FeatureCard 
          icon={MessageSquare}
          title="Flowing Conversations"
          description="Context-aware dialogue powered by AI with streaming support, memory injection, and personality-driven responses."
        />
        <FeatureCard 
          icon={Bot}
          title="Living World"
          description="NPCs follow daily routines, pursue goals, and build relationships — even when players aren't around."
        />
      </section>
    </div>
  );
}
