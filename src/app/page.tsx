'use client'
import { useState } from 'react'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)

  const toggleSidebar = () => {
    setIsOpened(!isOpened)
  }

  return <main className="p-8">Home page</main>
}
