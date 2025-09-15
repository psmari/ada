import React from 'react'

interface Creator {
  name: string
  role: string
  description: string
  avatar: string
}

const creators: Creator[] = [
  {
    name: "Prof.ª Mariana Silva",
    role: "Idealizadora e desenvolvedora",
    description: "Especialista em IA e desenvolvimento de aplicativos educacionais.",
    avatar: "/images/creators/mari.jpeg"
  },
  {
    name: "Prof. Vinicius Mota",
    role: "Criador e editor de Conteúdo",
    description: "Especialista em criação de conteúdo educacional e metodologias de ensino.",
    avatar: "/images/creators/vini.png"
  },
  {
    name: "Prof. Dr. Lucas Garofolo",
    role: "Designer UX/UI",
    description: "Especialista em experiência do usuário e design de interfaces educacionais intuitivas.",
    avatar: "/images/creators/lucas.png"
  },
]

const CreatorsSection: React.FC = () => {
  return (
    <section id="criadores" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-ada-dark mb-4">
            Nossa Equipe
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça os especialistas por trás da plataforma A.D.A., 
            unindo tecnologia e pedagogia para revolucionar o ensino.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {creators.map((creator, index) => (
            <div 
              key={index} 
              className="card p-6 text-center group hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-ada-dark mb-2">
                {creator.name}
              </h3>
              <p className="text-ada-red font-medium mb-3">
                {creator.role}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {creator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CreatorsSection
