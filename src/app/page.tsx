'use client'
import { useState } from 'react'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)

  const toggleSidebar = () => {
    setIsOpened(!isOpened)
  }

  return <main className="py-4 px-8">Home page</main>
}
