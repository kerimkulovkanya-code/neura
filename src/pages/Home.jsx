import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Welcome to MyApp
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A modern React starter with Vite, Tailwind CSS, and shadcn/ui.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </section>

      {/* Features grid */}
      <section className="grid md:grid-cols-3 gap-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle>⚡ Fast</CardTitle>
            <CardDescription>Built with Vite for instant HMR and fast builds.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🎨 Beautiful</CardTitle>
            <CardDescription>Tailwind CSS + shadcn/ui for stunning, accessible UIs.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🧩 Modular</CardTitle>
            <CardDescription>Clean folder structure ready to scale.</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  )
}