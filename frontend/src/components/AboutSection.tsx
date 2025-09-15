import React from 'react'

const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-16 bg-ada-gray">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-ada-dark mb-6">
            Como Funciona a A.D.A.
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Nossa plataforma revoluciona a forma como instrutores criam conteúdo pedagógico, 
            utilizando análise de dados e inteligência artificial para personalizar o aprendizado.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-ada-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ada-dark mb-3">Upload de Dados</h3>
              <p className="text-gray-600">
                Faça upload do arquivo CSV com as respostas da pesquisa da sua turma
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-ada-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ada-dark mb-3">Análise Inteligente</h3>
              <p className="text-gray-600">
                IA analisa o perfil da turma e gera insights personalizados
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-ada-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ada-dark mb-3">Conteúdo Personalizado</h3>
              <p className="text-gray-600">
                Crie exercícios e cenários adaptados ao perfil da sua turma
              </p>
            </div>
          </div>

          <div className="mt-12">
            <button className="btn-primary text-lg px-8 py-4">
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
