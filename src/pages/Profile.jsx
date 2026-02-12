import { useAccount, useReadContract } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { contractAddress, contractABI } from '@/lib/contract';
import { useEffect, useState } from 'react';
import { useAchievements } from '@/hooks/useAchievements.jsx';
import BadgesDisplay from '@/components/badges/BadgesDisplay';

export default function Profile() {
  const { address, isConnected } = useAccount();
  const [checkins, setCheckins] = useState([]);
  const [xp, setXp] = useState(0);
  
  useEffect(() => {
    const savedCheckins = localStorage.getItem('neura_checkins');
    if (savedCheckins) setCheckins(JSON.parse(savedCheckins));
    const savedXp = localStorage.getItem('neura_xp');
    if (savedXp) setXp(parseInt(savedXp, 10));
  }, []);

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address },
  });

  const nrnBalance = balance ? (Number(balance) / 1e18).toFixed(2) : '0';
  const level = Math.floor(xp / 100) + 1;
  
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
  const { earnedBadges } = useAchievements(checkins, xp, streak);

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Profile Stats</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-6">
          {isConnected ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Wallet</p>
                  <p className="font-mono text-xs md:text-sm break-all">
                    {address?.slice(0,6)}...{address?.slice(-4)}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">NRN Balance</p>
                  <p className="text-xl md:text-2xl font-bold">{nrnBalance} NRN</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Level</p>
                    <p className="text-lg md:text-xl font-semibold">{level}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Total XP</p>
                    <p className="text-lg md:text-xl font-semibold">{xp} XP</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-lg md:text-xl font-semibold">{streak} days</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span>XP to next level</span>
                    <span>{100 - (xp % 100)} XP</span>
                  </div>
                  <Progress value={xp % 100} className="h-2" />
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Total Check-ins</p>
                <p className="text-2xl md:text-3xl font-bold">{checkins.length}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Connect your wallet to see your stats.</p>
          )}
        </CardContent>
      </Card>
      <BadgesDisplay earnedBadges={earnedBadges} />
    </div>
  );
}