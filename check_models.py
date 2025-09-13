import os
import google.generativeai as genai

# Lembre-se de configurar sua variável de ambiente GOOGLE_API_KEY
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

print("Modelos disponíveis que suportam 'generateContent':")

for model in genai.list_models():
  # Verifica se o método 'generateContent' está listado como suportado
  if 'generateContent' in model.supported_generation_methods:
    print(f"- {model.name}")