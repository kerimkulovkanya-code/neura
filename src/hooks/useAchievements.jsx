import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const BADGES = [
  {
    id: 'first-checkin',
    name: 'First Step',
    description: 'Completed your first check-in',
    icon: '🌟',
    condition: (stats) => stats.totalCheckins >= 1,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: '7-day streak',
    icon: '🔥',
    condition: (stats) => stats.streak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Habit Master',
    description: '30-day streak',
    icon: '⚡',
    condition: (stats) => stats.streak >= 30,
  },
  {
    id: 'xp-100',
    name: 'Apprentice',
    description: 'Reach 100 XP',
    icon: '🧙',
    condition: (stats) => stats.xp >= 100,
  },
  {
    id: 'xp-500',
    name: 'Expert',
    description: 'Reach 500 XP',
    icon: '🧪',
    condition: (stats) => stats.xp >= 500,
  },
  {
    id: 'xp-1000',
    name: 'Master',
    description: 'Reach 1000 XP',
    icon: '🏅',
    condition: (stats) => stats.xp >= 1000,
  },
  {
    id: 'checkins-10',
    name: 'Consistent',
    description: '10 total check-ins',
    icon: '📆',
    condition: (stats) => stats.totalCheckins >= 10,
  },
  {
    id: 'checkins-50',
    name: 'Dedicated',
    description: '50 total check-ins',
    icon: '🎯',
    condition: (stats) => stats.totalCheckins >= 50,
  },
  {
    id: 'checkins-100',
    name: 'Legend',
    description: '100 total check-ins',
    icon: '🏆',
    condition: (stats) => stats.totalCheckins >= 100,
  },
];

const fireConfetti = () => {
  confetti({
    particleCount: 60,
    spread: 55,
    origin: { y: 0.7 },
    colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']
  });
};

export function useAchievements(checkins, xp, streak) {
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('neura_badges');
    if (saved) setEarnedBadges(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const stats = {
      totalCheckins: checkins.length,
      xp,
      streak,
    };

    const newlyEarned = BADGES.filter(
      (badge) => badge.condition(stats) && !earnedBadges.some((b) => b.id === badge.id)
    );

    if (newlyEarned.length > 0) {
      const updated = [...earnedBadges, ...newlyEarned];
      setEarnedBadges(updated);
      localStorage.setItem('neura_badges', JSON.stringify(updated));

      newlyEarned.forEach((badge, index) => {
        setTimeout(() => fireConfetti(), index * 150);
        toast(
          <div className="flex items-center gap-3">
            <span className="text-2xl">{badge.icon}</span>
            <div>
              <div className="font-bold">{badge.name}</div>
              <div className="text-xs text-muted-foreground">{badge.description}</div>
            </div>
          </div>,
          {
            duration: 5000,
            position: 'bottom-right',
            className: 'bg-background border border-border',
          }
        );
      });
    }
  }, [checkins, xp, streak]);

  return { earnedBadges };
}