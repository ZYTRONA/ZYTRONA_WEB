import React from 'react'

export function BackgroundGrid() {
  return (
    <div className="ambient-background" aria-hidden="true">
      {/* Subtle futuristic matrix grid */}
      <div className="cyber-grid-overlay" />
      
      {/* Ambient gradient glow orbs */}
      <div className="ambient-orb orb-primary" />
      <div className="ambient-orb orb-secondary" />
      <div className="ambient-orb orb-accent" />
      
      {/* Top light beam */}
      <div className="ambient-beam" />
    </div>
  )
}

export default BackgroundGrid
