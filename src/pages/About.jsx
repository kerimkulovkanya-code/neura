import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">About This Project</CardTitle>
          <CardDescription>Your modern React starter template</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This project was set up with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>React 18 + Vite 6</li>
            <li>Tailwind CSS 3 + shadcn/ui components</li>
            <li>React Router 6 for navigation</li>
            <li>ESLint + jsconfig.json for clean code</li>
            <li>Organized folder structure ready to scale</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Edit <code className="bg-muted px-1 py-0.5 rounded">src/pages/Home.jsx</code> and{' '}
            <code className="bg-muted px-1 py-0.5 rounded">src/App.jsx</code> to start building your app.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}