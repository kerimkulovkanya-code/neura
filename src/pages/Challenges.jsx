import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Challenges() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Friend challenges and marathons coming soon.
        </p>
      </CardContent>
    </Card>
  );
}