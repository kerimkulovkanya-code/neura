import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NeuralCanvas from '@/components/canvas/NeuralCanvas';
import { contractAddress, contractABI } from '@/lib/contract';
import confetti from 'canvas-confetti';

export default function Dashboard() {
  const [habit, setHabit] = useState('Meditate');
  const [checkins, setCheckins] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [xp, setXp] = useState(0);
  
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  useEffect(() => {
    const savedHabit = localStorage.getItem('neura_habit');
    if (savedHabit) setHabit(savedHabit);
    const savedNodes = localStorage.getItem('neura_nodes_positions');
    if (savedNodes) setNodes(JSON.parse(savedNodes));
    const savedXp = localStorage.getItem('neura_xp');
    if (savedXp) setXp(parseInt(savedXp, 10));
    const savedCheckins = localStorage.getItem('neura_checkins');
    if (savedCheckins) setCheckins(JSON.parse(savedCheckins));
  }, []);

  useEffect(() => {
    localStorage.setItem('neura_habit', habit);
  }, [habit]);
  useEffect(() => {
    localStorage.setItem('neura_nodes_positions', JSON.stringify(nodes));
  }, [nodes]);
  useEffect(() => {
    localStorage.setItem('neura_xp', xp.toString());
  }, [xp]);
  useEffect(() => {
    localStorage.setItem('neura_checkins', JSON.stringify(checkins));
  }, [checkins]);

  const addNode = () => {
    const lastNode = nodes[nodes.length - 1];
    let x, y;
    if (!lastNode) {
      x = 300; y = 200;
    } else {
      const angle = nodes.length * 0.5;
      const radius = 15 + nodes.length * 1.5;
      x = 300 + Math.cos(angle) * radius;
      y = 200 + Math.sin(angle) * radius;
      x = Math.min(550, Math.max(50, x));
      y = Math.min(350, Math.max(50, y));
    }
    return { x, y };
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']
    });
  };

  const calculateStreak = (dates) => {
    if (!dates.length) return 0;
    let streak = 0;
    let currentDate = new Date();
    const sorted = [...dates].sort().reverse();
    for (let i = 0; i < sorted.length; i++) {
      if (new Date(sorted[i]).toDateString() === currentDate.toDateString()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else break;
    }
    return streak;
  };

  const streak = calculateStreak(checkins);

  const handleCheckin = async () => {
    const now = new Date().toISOString();
    setCheckins([...checkins, now]);
    setNodes([...nodes, addNode()]);
    setXp(xp + 10);
    triggerConfetti();

    if (isConnected && address) {
      try {
        await writeContract({
          address: contractAddress,
          abi: contractABI,
          functionName: 'reward',
          args: [address],
        });
      } catch (error) {
        console.error('Reward failed:', error);
      }
    }
  };

  const level = Math.floor(xp / 100) + 1;
  const xpForCurrentLevel = xp % 100;

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Your Neural Canvas</h1>
        <div className="flex items-center gap-4 self-end sm:self-auto">
          <div className="text-right">
            <div className="text-xs md:text-sm text-muted-foreground">Level {level}</div>
            <div className="text-sm md:text-base font-medium">{xp} XP</div>
          </div>
          <Progress value={xpForCurrentLevel} className="w-24 md:w-32" />
        </div>
      </div>

      <Card className="glass bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-200">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">{streak} day{streak !== 1 && 's'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total check-ins</p>
            <p className="text-xl font-semibold">{checkins.length}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Current Habit</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              placeholder="Name your habit"
              className="flex-1"
            />
            <Button
              onClick={handleCheckin}
              className="w-full sm:w-auto active:scale-95 transition-transform duration-150"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin">⚡</span>
                  Rewarding...
                </>
              ) : (
                'Check‑in'
              )}
            </Button>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            You've checked in {checkins.length} time{checkins.length !== 1 && 's'} today.
          </p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardContent className="p-2 md:p-6">
          <NeuralCanvas nodes={nodes} />
        </CardContent>
      </Card>
    </div>
  );
}