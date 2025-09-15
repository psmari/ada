import React from 'react'
import StudioHeader from '../components/studio/StudioHeader'
import TabSystem from '../components/studio/TabSystem'
import StudioFooter from '../components/studio/StudioFooter'

const Studio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudioHeader />
      <TabSystem />
      <StudioFooter />
    </div>
  )
}

export default Studio
