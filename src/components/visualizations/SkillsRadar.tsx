'use client';

import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface SkillData {
  skill: string;
  value: number;
  fullMark: number;
}

interface SkillsRadarProps {
  data: SkillData[];
}

const SkillsRadar = ({ data }: SkillsRadarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] glass-panel rounded-3xl p-4 md:p-8 relative overflow-hidden"
      role="img"
      aria-label={`Skills radar chart showing: ${data.map(d => `${d.skill} at ${d.value}%`).join(', ')}`}
    >
      {/* Cyber glow effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-radial-gradient opacity-20" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 156, 0.15) 0%, transparent 70%)'
        }} />
      </div>

      {/* Chart container */}
      <div className="relative z-10 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            {/* Grid lines */}
            <PolarGrid
              stroke="#00ff9c40"
              strokeWidth={1}
            />

            {/* Skill labels on each axis */}
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: '#00ff9c',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                fontWeight: 600
              }}
            />

            {/* Value scale (0-100) */}
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#9aa4af', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}
            />

            {/* The actual radar shape */}
            <Radar
              name="Skill Level"
              dataKey="value"
              stroke="#00ff9c"
              fill="#00ff9c"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ fill: '#00ff9c', r: 4 }}
              activeDot={{ r: 6, fill: '#00bcd4' }}
            />

            {/* Tooltip on hover */}
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1416',
                border: '1px solid #00ff9c40',
                borderRadius: '8px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                padding: '8px 12px',
                boxShadow: '0 0 20px rgba(0, 255, 156, 0.2)'
              }}
              labelStyle={{ color: '#00ff9c', fontWeight: 600, marginBottom: '4px' }}
              itemStyle={{ color: '#e6f1ff' }}
              formatter={(value: number | undefined) => value !== undefined ? [`${value}%`, 'Proficiency'] : ['-', 'Proficiency']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Hidden table for screen readers */}
      <table className="sr-only">
        <caption>Skill Proficiency Levels</caption>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Proficiency</th>
          </tr>
        </thead>
        <tbody>
          {data.map(skill => (
            <tr key={skill.skill}>
              <td>{skill.skill}</td>
              <td>{skill.value}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default SkillsRadar;
