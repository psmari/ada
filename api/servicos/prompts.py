def gerar_prompt_para_dna(materia: str, conteudo_csv: str) -> str:
    """
    Formata o prompt final que será enviado para a API do Gemini,
    inserindo o nome da matéria e o conteúdo da planilha.
    """
    return f"""
        Você é um Analista de Dados Pedagógicos especializado em ensino técnico. Você recebeu dados brutos de uma pesquisa aplicada a uma turma do SENAI, no formato de planilha (CSV). Sua tarefa é analisar esses dados e gerar um parágrafo conciso e acionável chamado 'DNA da Turma'.

        Instruções para a Análise:
        Nível de Experiência: Analise as respostas do csv identifique a distribuição em porcentagem (ex: '80% iniciante', 'grupo bem dividido entre novatos e experientes (40% e 60%)') na matéria de {materia}.
        Afinidades Dominantes: Identifique as 2 ou 3 áreas de interesse ou experiência prévia mais citadas nas respostas de múltipla escolha.
        Padrões Ocultos: Análise as respostas abertas ('conte uma vez que consertou algo') e encontre temas recorrentes (ex: 'muitos relatam experiências com consertos eletrônicos', 'vários mencionam projetos com madeira').
        Estilo de Aprendizagem: Determine qual o estilo de aprendizagem (Visual, Auditivo, Leitura, Cinestésico) predominante na turma.
        Marcas e especificidades: Cite marcas que foram mencionada na pesquisa, liste coisas específicas da turma.
        Formato do Resultado: Apresente a análise final em um único parágrafo de texto, começando com 'DNA da Turma:'. O texto deve ser prático, direto e fácil para um instrutor entender e usar imediatamente.
        
        Esse são os dados do csv: 
        '''
        {conteudo_csv}
        '''
    """

