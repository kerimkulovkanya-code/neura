import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BADGES } from '@/hooks/useAchievements.jsx';

export default function BadgesDisplay({ earnedBadges = [] }) {
  const earned = BADGES.filter((badge) =>
    earnedBadges.some((b) => b.id === badge.id)
  );
  const locked = BADGES.filter(
    (badge) => !earnedBadges.some((b) => b.id === badge.id)
  );

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏅 Achievements
          <span className="text-sm font-normal text-muted-foreground">
            {earned.length}/{BADGES.length} collected
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {earned.length > 0 ? (
            <div>
              <h3 className="text-sm font-medium mb-3">Earned</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {earned.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <span className="text-3xl mb-1">{badge.icon}</span>
                    <span className="text-xs font-semibold text-center">{badge.name}</span>
                    <span className="text-[10px] text-muted-foreground text-center mt-1">{badge.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No badges yet. Keep checking in!</p>
          )}
          {locked.length > 0 && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Locked</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 opacity-60">
                {locked.slice(0, 6).map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center p-3 bg-muted rounded-lg grayscale">
                    <span className="text-3xl mb-1">{badge.icon}</span>
                    <span className="text-xs font-semibold text-center">{badge.name}</span>
                    <span className="text-[10px] text-muted-foreground text-center mt-1">????</span>
                  </div>
                ))}
              </div>
              {locked.length > 6 && (
                <p className="text-xs text-muted-foreground text-center mt-2">+{locked.length - 6} more hidden badges...</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}