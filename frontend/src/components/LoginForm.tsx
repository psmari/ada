import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação de login - redireciona para dashboard
    navigate('/dashboard')
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-ada-dark mb-2">
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Acesse sua conta para começar' 
                  : 'Crie sua conta gratuitamente'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ada-dark mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-ada-dark mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-ada-dark mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="input-field"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-ada-red hover:text-ada-red-dark font-medium transition-colors duration-300"
              >
                {isLogin 
                  ? 'Não tem uma conta? Criar conta' 
                  : 'Já tem uma conta? Fazer login'
                }
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                Ao continuar, você concorda com nossos{' '}
                <a href="#" className="text-ada-red hover:underline">Termos de Uso</a>
                {' '}e{' '}
                <a href="#" className="text-ada-red hover:underline">Política de Privacidade</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
