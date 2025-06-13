'use client'

import React, { Suspense } from 'react'
import MenuContent from './MenuContent'

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuContent />
    </Suspense>
  )
}
