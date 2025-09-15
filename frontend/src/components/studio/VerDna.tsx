import React from 'react'
import { useTurma } from '../../contexts/TurmaContext'

const VerDna: React.FC = () => {
  const { turmaAtual } = useTurma()

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-ada-dark mb-6">
        DNA da Turma - {turmaAtual?.nome || 'Nenhuma turma selecionada'}
      </h3>

      {/* Card de Análise */}
      <div className="bg-gradient-to-br from-ada-gray to-red-50 rounded-xl p-8 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-ada-red rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-ada-dark mb-3">
              Análise Completa do Perfil
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {turmaAtual?.dna || 'Nenhum DNA disponível para esta turma. Faça upload de um arquivo CSV na aba Configurações para gerar a análise do perfil da turma.'}
            </p>
          </div>
        </div>
      </div>

      {/* Métricas - só mostra se houver DNA */}
      {turmaAtual?.dna && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h5 className="font-semibold text-ada-dark mb-2">Nível de Experiência</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Iniciantes</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-ada-red h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h5 className="font-semibold text-ada-dark mb-2">Estilo de Aprendizagem</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Visual-Cinestésico</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-ada-red h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h5 className="font-semibold text-ada-dark mb-2">Interesse em Projetos</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Automação</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-ada-red h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recomendações */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h5 className="font-semibold text-ada-dark mb-4">Recomendações Pedagógicas</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-ada-red font-bold">•</span>
                <span>Priorize exercícios práticos e laboratórios hands-on</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-ada-red font-bold">•</span>
                <span>Use visualizações e diagramas para explicar conceitos abstratos</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-ada-red font-bold">•</span>
                <span>Inclua projetos de automação para engajar os alunos</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-ada-red font-bold">•</span>
                <span>Forneça exemplos práticos relacionados ao mercado de trabalho</span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default VerDna