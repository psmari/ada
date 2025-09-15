import React from 'react'

const HeroSection: React.FC = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-white to-ada-gray">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-ada-dark leading-tight">
                Transforme dados em
                <span className="text-gradient block">insights pedagógicos</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                A plataforma A.D.A. utiliza inteligência artificial para analisar o perfil da sua turma 
                e criar conteúdo personalizado que maximiza o aprendizado dos seus alunos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-lg px-8 py-4">
                Saiba Mais
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Ver Demonstração
              </button>
            </div>
          </div>

          {/* Ilustração */}
          <div className="relative animate-float">
            <div className="bg-gradient-to-br from-ada-red to-ada-red-dark rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-ada-red rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-ada-gray rounded w-3/4"></div>
                  <div className="h-4 bg-ada-gray rounded w-1/2"></div>
                  <div className="h-4 bg-ada-gray rounded w-2/3"></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 bg-ada-red rounded"></div>
                  <div className="h-16 bg-ada-gray rounded"></div>
                  <div className="h-16 bg-ada-red rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
