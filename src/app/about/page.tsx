// app/about/page.tsx
import Navbar from "../components/Navbar"
export default function About() {
  return (
    <div>
        <Navbar />
      <h1 className="text-4xl font-bold mb-6">About YumOnGo</h1>
      <p className="max-w-3xl">
        YumOnGo is dedicated to delivering delicious and fresh food directly to your doorstep. We pride ourselves
        on quality ingredients and quick service.
      </p>
    </div>
  )
}
