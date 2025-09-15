import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import LoginForm from '../components/LoginForm'
import AboutSection from '../components/AboutSection'
import CreatorsSection from '../components/CreatorsSection'
import Footer from '../components/Footer'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LoginForm />
        <AboutSection />
        <CreatorsSection />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
