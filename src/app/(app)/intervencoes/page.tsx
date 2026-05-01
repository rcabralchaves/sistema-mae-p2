const CATEGORIAS = [
  {
    nome: 'Autismo — TEA',
    tag: 'clínico',
    cor: '#7c3aed',
    bg: '#f5f3ff',
    intervencoes: [
      {
        titulo: 'Comunicação Alternativa e Aumentativa (CAA)',
        objetivo: 'Ampliar a comunicação funcional quando a fala é ausente ou limitada.',
        descricao: 'Uso de sistemas alternativos de comunicação como pranchas de figuras, PECS (Picture Exchange Communication System) e aplicativos de CAA para facilitar a expressão de necessidades, desejos e sentimentos.',
        passos: ['Avaliar o nível de comunicação atual', 'Introduzir símbolos de alta relevância (comida, brinquedo, "não")', 'Treinar troca espontânea de figuras para obter objetos desejados', 'Ampliar o vocabulário progressivamente', 'Generalizar para diferentes contextos e comunicadores'],
        materiais: 'Pranchas de comunicação impressas, PECS, tablet com app de CAA (Tobii Dynavox, LetMeTalk)',
      },
      {
        titulo: 'Rotinas Visuais com Antecipação',
        objetivo: 'Reduzir ansiedade e comportamentos disruptivos por meio da previsibilidade.',
        descricao: 'Criação de agendas visuais que mostram a sequência de atividades do dia, facilitando a transição entre tarefas e a antecipação de mudanças na rotina.',
        passos: ['Fotografar ou desenhar as atividades da rotina diária', 'Organizar em sequência visual no local de trabalho', 'Revisar a agenda ao início de cada sessão', 'Sinalizar antecipadamente mudanças usando o "não" visual', 'Ensinar a criança a consultar a agenda de forma independente'],
        materiais: 'Fotos impressas ou laminadas, velcro, quadro de agenda, moldura para "primeiro/depois"',
      },
      {
        titulo: 'Treino de Habilidades Sociais com Modelagem',
        objetivo: 'Desenvolver repertório de interação social e comunicação interpessoal.',
        descricao: 'Ensino estruturado de habilidades sociais como cumprimentar, pedir, esperar a vez e resolver conflitos por meio de modelagem, prática guiada e feedback imediato.',
        passos: ['Identificar habilidades-alvo por observação e entrevista com pais', 'Modelar o comportamento esperado', 'Praticar em duplas ou pequenos grupos', 'Fornecer feedback específico e reforço positivo', 'Praticar em cenários cada vez mais naturais'],
        materiais: 'Cartas de cenários sociais, fantoches, espelho, vídeos modelados',
      },
      {
        titulo: 'Histórias Sociais',
        objetivo: 'Preparar a criança para situações sociais específicas e desenvolver perspectiva social.',
        descricao: 'Narrativas curtas e personalizadas que descrevem situações sociais, incluindo perspectivas, sentimentos e comportamentos esperados, criadas especificamente para as dificuldades de cada criança.',
        passos: ['Identificar a situação-problema a ser abordada', 'Escrever a história em linguagem simples e positiva', 'Incluir sentenças descritivas, perspectivas e diretivas', 'Ler e revisar com a criança regularmente', 'Adaptar conforme evolução'],
        materiais: 'Folhas impressas ou livro artesanal, ilustrações, tablet',
      },
      {
        titulo: 'Regulação Sensorial',
        objetivo: 'Apoiar a auto regulação sensorial para melhorar o engajamento e reduzir comportamentos de crise.',
        descricao: 'Conjunto de estratégias e atividades que fornecem input sensorial organizado, ajudando a criança a atingir e manter um estado de alerta adequado para aprendizagem e interação.',
        passos: ['Realizar perfil sensorial com pais e TO', 'Identificar estímulos que regulam e que desorganizam', 'Criar "dieta sensorial" personalizada', 'Implementar pausas sensoriais entre atividades', 'Ensinar estratégias de autorregulação'],
        materiais: 'Almofadas proprioceptivas, bolas de borracha, fones com cancelamento de ruído, massinha terapêutica',
      },
    ],
  },
  {
    nome: 'TDAH — Déficit de Atenção e Hiperatividade',
    tag: 'clínico/escolar',
    cor: '#d97706',
    bg: '#fffbeb',
    intervencoes: [
      {
        titulo: 'Técnica Pomodoro Adaptada para Crianças',
        objetivo: 'Aumentar a capacidade de manutenção de atenção em tarefas de forma gradual.',
        descricao: 'Método de gestão do tempo adaptado: períodos curtos de trabalho focado intercalados com pausas planejadas, progressivamente aumentando o tempo de concentração.',
        passos: ['Iniciar com blocos de 5–7 minutos de trabalho', 'Sinalizar o início e o fim com timer visual', 'Oferecer pausa de 2–3 minutos com atividade de movimento', 'Aumentar gradualmente para 10, 15, 20 minutos', 'Registrar conquistas em gráfico motivacional'],
        materiais: 'Timer visual (Time Timer), gráfico de registro, reforçadores preferidos',
      },
      {
        titulo: 'Organização Visual com Checklists',
        objetivo: 'Desenvolver autonomia na execução de tarefas através de suporte visual externo.',
        descricao: 'Criação de listas visuais passo a passo para tarefas complexas, rotinas e projetos, reduzindo a dependência da memória de trabalho e aumentando a independência.',
        passos: ['Mapear as tarefas recorrentes com a criança', 'Criar checklist com ícones ou fotos para cada etapa', 'Laminar e afixar nos locais de uso', 'Ensinar a criança a marcar os itens completados', 'Revisar e adaptar conforme necessidade'],
        materiais: 'Checklists impressos e laminados, marca-check apagável, pasta de rotinas',
      },
      {
        titulo: 'Pausas Ativas e Movimento Intencional',
        objetivo: 'Utilizar o movimento como regulador do nível de ativação para melhorar a atenção.',
        descricao: 'Inserção estratégica de atividades físicas breves entre tarefas de concentração, usando o movimento corporal como aliado da aprendizagem.',
        passos: ['Identificar os momentos de maior desregulação', 'Planejar pausas de 3–5 minutos a cada 15–20 minutos', 'Incluir atividades como polichinelos, pular corda, yoga infantil', 'Usar Brain Breaks de vídeo', 'Criar cartões de pausa ativa para escolha da criança'],
        materiais: 'Cartões de Brain Break, corda de pular, vídeos de yoga para crianças',
      },
      {
        titulo: 'Autorregulação e Automonitoramento',
        objetivo: 'Desenvolver a metacognição sobre comportamento e desempenho próprios.',
        descricao: 'Ensino de estratégias para que a criança aprenda a observar e avaliar seu próprio comportamento, identificar gatilhos e aplicar estratégias de controle.',
        passos: ['Ensinar o vocabulário emocional básico', 'Criar "termômetro emocional" personalizado', 'Praticar identificação de estado interno antes das tarefas', 'Ensinar estratégias de acalmar (respiração, afastamento)', 'Registrar em diário de autoavaliação'],
        materiais: 'Termômetro emocional, diário de automonitoramento, cartões de estratégias',
      },
      {
        titulo: 'Jogos de Atenção e Funções Executivas',
        objetivo: 'Treinar habilidades de controle inibitório, memória de trabalho e flexibilidade.',
        descricao: 'Uso de jogos estruturados que demandam sustentação de atenção, inibição de resposta e memória de trabalho como forma lúdica de treino cognitivo.',
        passos: ['Selecionar jogos adequados ao nível e interesse da criança', 'Começar por jogos de regras simples', 'Aumentar progressivamente a complexidade', 'Discutir estratégias usadas após o jogo', 'Generalizar estratégias para tarefas acadêmicas'],
        materiais: 'Perfetti, Uno, Dobble, Spot it, Stop, xadrez simplificado, jogos digitais (Cogmed, Lumosity infantil)',
      },
    ],
  },
  {
    nome: 'Dislexia',
    tag: 'escolar',
    cor: '#0284c7',
    bg: '#f0f9ff',
    intervencoes: [
      {
        titulo: 'Método Fônico Estruturado e Sistemático',
        objetivo: 'Desenvolver a decodificação alfabética por meio de instrução explícita de correspondência fonema-grafema.',
        descricao: 'Ensino sistemático e sequencial das relações letra-som, partindo das correspondências mais simples e regulares para as mais complexas e irregulares.',
        passos: ['Avaliar o conhecimento fonológico atual', 'Iniciar pelas vogais e consoantes de relação simples', 'Apresentar uma correspondência por vez com prática intensa', 'Usar sequência: ver, dizer, escrever, ler', 'Revisar conteúdos anteriores em cada sessão (revisão espaçada)'],
        materiais: 'Cartelas de letras, livros fônicos, software de leitura, quadro branco pequeno',
      },
      {
        titulo: 'Leitura Multissensorial',
        objetivo: 'Fortalecer a memória da forma ortográfica e a decodificação usando múltiplos canais sensoriais.',
        descricao: 'Integração de canais visual, auditivo e cinestésico no ensino da leitura e escrita, aumentando a eficácia da memorização dos padrões ortográficos.',
        passos: ['Apresentar a letra/palavra visualmente', 'Dizer o som em voz alta junto com a criança', 'Traçar a letra na areia, lixa ou ar', 'Escrever em papel com textura', 'Ler em diferentes contextos (cartões, textos, jogos)'],
        materiais: 'Bandejas de areia colorida, letras de lixa, letras magnéticas, tinta para dedos',
      },
      {
        titulo: 'Fluência Leitora com Textos Graduados',
        objetivo: 'Aumentar a velocidade e precisão de leitura por meio de prática repetida.',
        descricao: 'Leitura repetida de textos no nível de instrução da criança, monitorando velocidade e precisão, com uso de modelos e feedback.',
        passos: ['Selecionar texto no nível de instrução (90-95% de acurácia)', 'Modelar a leitura em voz alta com boa prosódia', 'Criança lê em voz alta, adulto acompanha', 'Registrar palavras por minuto e erros', 'Reler o mesmo texto 3–4 vezes antes de avançar'],
        materiais: 'Textos graduados impressos, cronômetro, ficha de registro de fluência',
      },
    ],
  },
  {
    nome: 'Discalculia',
    tag: 'escolar',
    cor: '#b45309',
    bg: '#fef3c7',
    intervencoes: [
      {
        titulo: 'Manipulativos Concretos para Número',
        objetivo: 'Construir compreensão sólida dos conceitos numéricos por meio de representação concreta.',
        descricao: 'Uso de materiais manipuláveis físicos para representar quantidades, operações e relações numéricas antes de avançar para o abstrato.',
        passos: ['Usar sequência Concreto → Representativo → Abstrato (CRA)', 'Trabalhar com material dourado para valor posicional', 'Usar ábaco para operações', 'Representar frações com peças concretas', 'Registrar o que foi manipulado em forma simbólica'],
        materiais: 'Material dourado, ábaco, blocos Cuisenaire, fichas de contagem, régua numérica',
      },
      {
        titulo: 'Linha Numérica e Sentido Numérico',
        objetivo: 'Desenvolver a representação mental dos números e suas relações.',
        descricao: 'Atividades com linha numérica para construir senso de magnitude, ordem, distância entre números e operações por saltos.',
        passos: ['Construir linha numérica com a criança (0 a 10, depois 0 a 100)', 'Praticar localizar números na linha', 'Fazer saltos de adição e subtração', 'Comparar tamanhos e distâncias', 'Usar linha numérica vazia para problemas'],
        materiais: 'Linha numérica impressa, linha numérica de chão (fita), cartões de números',
      },
      {
        titulo: 'Resolução de Problemas com Contexto Real',
        objetivo: 'Tornar a matemática significativa conectando-a ao cotidiano da criança.',
        descricao: 'Trabalho com problemas matemáticos contextualizados com situações da vida real da criança, favorecendo a compreensão e o interesse.',
        passos: ['Levantar interesses e rotinas da criança', 'Criar problemas com o nome e contexto dela', 'Usar objetos reais (dinheiro, régua, relógio)', 'Ensinar estratégia de leitura e identificação de dados', 'Discutir diferentes formas de resolver'],
        materiais: 'Moedas e notas reais ou impressas, embalagens de produtos, tabelas de preços',
      },
    ],
  },
  {
    nome: 'Disgrafia',
    tag: 'escolar',
    cor: '#7c3aed',
    bg: '#f5f3ff',
    intervencoes: [
      {
        titulo: 'Exercícios de Pré-Escrita e Coordenação Fina',
        objetivo: 'Fortalecer a musculatura fina e desenvolver controle do traço.',
        descricao: 'Atividades sistemáticas para desenvolver os pré-requisitos motores da escrita: força de preensão, controle do traço, orientação espacial no papel.',
        passos: ['Atividades de preensão (massinha, pegadores, pinças)', 'Rastejar com lápis em labirintos e tracejados', 'Copiar padrões de linhas, curvas e ângulos', 'Praticar letras problemáticas de forma isolada', 'Integrar em palavras e frases curtas'],
        materiais: 'Massinha terapêutica, folhas de tracejado, lápis triangular, borracha de dedo',
      },
      {
        titulo: 'Adaptações no Instrumento de Escrita',
        objetivo: 'Reduzir a fadiga e melhorar a pega através de adaptações ergonômicas.',
        descricao: 'Ajustes no lápis, postura e superfície de escrita para otimizar o desempenho motor e reduzir o esforço excessivo.',
        passos: ['Avaliar a pega atual e a postura sentada', 'Treinar pega tridigital com lápis triangular', 'Usar adaptador de preensão se necessário', 'Ajustar inclinação do papel', 'Usar superfície levemente elevada (prancha inclinada)'],
        materiais: 'Lápis triangular, adaptadores de pega, prancha inclinada, pautas largas',
      },
      {
        titulo: 'Prática Distribuída e Feedback Visual',
        objetivo: 'Automatizar padrões de letra com feedback imediato sobre a qualidade do traço.',
        descricao: 'Prática frequente e curta de escrita com comparação visual imediata com o modelo, desenvolvendo memória motora dos padrões de letra.',
        passos: ['Praticar 10–15 minutos diários (sessões curtas e frequentes)', 'Comparar escrita com modelo imediatamente', 'Identificar um aspecto específico para melhorar', 'Usar semáforo de autoavaliação (vermelho/amarelo/verde)', 'Celebrar progressos com portfólio de amostras'],
        materiais: 'Modelos de letra, folhas com pauta dupla, portfólio de amostras da escrita',
      },
    ],
  },
  {
    nome: 'Disortografia',
    tag: 'escolar',
    cor: '#6d28d9',
    bg: '#ede9fe',
    intervencoes: [
      {
        titulo: 'Ortografia por Regras e Morfemas',
        objetivo: 'Ensinar a ortografia de forma sistemática, partindo de regras e estruturas da língua.',
        descricao: 'Ensino explícito das regras ortográficas e análise morfológica das palavras, desenvolvendo consciência morfossintática como suporte à escrita.',
        passos: ['Identificar os erros mais frequentes (análise de ditados e textos)', 'Agrupar erros por categoria (uso de c/ss/ç, m/n antes de p/b, etc.)', 'Ensinar a regra com exemplos e contra-exemplos', 'Praticar com jogos e atividades lúdicas', 'Aplicar em contexto de produção textual'],
        materiais: 'Caderno de regras personalizado, cartões de famílias de palavras, jogos ortográficos',
      },
      {
        titulo: 'Dicionário Pessoal de Palavras Difíceis',
        objetivo: 'Construir referencial ortográfico personalizado e desenvolver autonomia na revisão.',
        descricao: 'Construção progressiva de um dicionário pessoal com as palavras que a criança erra com frequência, organizado para consulta rápida.',
        passos: ['Identificar palavras de erro frequente nas produções da criança', 'Criar caderno personalizado em ordem alfabética', 'Incluir a palavra, um desenho e uma frase', 'Revisar e acrescentar semanalmente', 'Usar antes de entregar produções escritas'],
        materiais: 'Caderno, canetinhas coloridas, post-its',
      },
      {
        titulo: 'Revisão Sistemática de Textos',
        objetivo: 'Desenvolver habilidade de revisão e autocorreção ortográfica.',
        descricao: 'Ensino de um protocolo de revisão ortográfica para textos próprios, tornando o processo de autocorreção uma habilidade explícita e praticável.',
        passos: ['Ensinar a criança a ler o texto em voz alta após escrever', 'Usar lista de checagem ortográfica (maiúsculas, ponto, palavras sublinhadas)', 'Sublinhar palavras suspeitas e consultar dicionário/caderno', 'Rever um aspecto por vez', 'Comparar versão original e revisada'],
        materiais: 'Checklist de revisão, dicionário, lápis de cor para marcar categorias de erro',
      },
    ],
  },
  {
    nome: 'Altas Habilidades / Superdotação',
    tag: 'escolar',
    cor: '#dc2626',
    bg: '#fef2f2',
    intervencoes: [
      {
        titulo: 'Enriquecimento Curricular Vertical e Horizontal',
        objetivo: 'Desafiar o aluno com conteúdos mais complexos e aprofundados em suas áreas de interesse.',
        descricao: 'Ampliação do currículo regular com atividades de maior profundidade e complexidade (vertical) e diversificação de experiências em áreas de interesse (horizontal).',
        passos: ['Identificar áreas de destaque e interesse', 'Mapear nível atual de conhecimento além da série', 'Oferecer projetos independentes de pesquisa', 'Conectar com mentores e grupos de pares com habilidades similares', 'Registrar e avaliar produções de forma qualitativa'],
        materiais: 'Livros avançados, acesso a plataformas de aprendizagem, contato com universidades/museus',
      },
      {
        titulo: 'Projetos de Investigação por Interesses',
        objetivo: 'Desenvolver pensamento crítico, criatividade e autonomia intelectual.',
        descricao: 'Desenvolvimento de projetos individuais ou em grupos pequenos, partindo de questões genuínas do aluno, com metodologia de investigação real.',
        passos: ['Identificar questão genuína de interesse do aluno', 'Planejar metodologia de investigação', 'Executar pesquisa com suporte do mediador', 'Produzir resultado final (texto, vídeo, projeto)', 'Apresentar para público real (colegas, pais, comunidade)'],
        materiais: 'Acesso a internet supervisionado, materiais de experimento, câmera, plataformas de apresentação',
      },
      {
        titulo: 'Suporte Socioemocional Específico',
        objetivo: 'Trabalhar as vulnerabilidades emocionais frequentes em pessoas com altas habilidades.',
        descricao: 'Intervenção focada em hipersensibilidade, perfeccionismo, sensação de isolamento e dificuldade de aceitar erros — aspectos frequentes no perfil das altas habilidades.',
        passos: ['Validar a intensidade emocional como parte do perfil', 'Trabalhar tolerância à frustração com tarefas deliberadamente desafiadoras', 'Discutir o conceito de "erro como aprendizagem"', 'Construir rede de pares similares', 'Fortalecer identidade e autoconceito positivo'],
        materiais: 'Bibliografias sobre altas habilidades, grupos de pares, recursos de mindfulness',
      },
    ],
  },
  {
    nome: 'Dificuldades de Aprendizagem Gerais',
    tag: 'clínico/escolar',
    cor: '#374151',
    bg: '#f3f4f6',
    intervencoes: [
      {
        titulo: 'Mapas Mentais e Organização Visual do Conhecimento',
        objetivo: 'Facilitar a organização, compreensão e memorização de informações.',
        descricao: 'Uso de mapas mentais e organizadores gráficos para representar visualmente relações entre conceitos, facilitando a memória e a compreensão.',
        passos: ['Ensinar a identificar a ideia central', 'Ramificar subtemas com cores e símbolos', 'Praticar com conteúdos de interesse', 'Usar para estudar e revisar matérias escolares', 'Digitalizar progressivamente (MindMeister, Canva)'],
        materiais: 'Folhas grandes A3, canetinhas coloridas, post-its, Mindomo/MindMeister',
      },
      {
        titulo: 'Repetição Espaçada e Revisão Ativa',
        objetivo: 'Transferir informações da memória de curto prazo para a memória de longo prazo.',
        descricao: 'Aplicação do princípio da curva do esquecimento de Ebbinghaus: revisão do conteúdo em intervalos progressivamente maiores para fixação eficiente.',
        passos: ['Revisar o conteúdo no dia seguinte (1 dia)', 'Revisar após 3 dias', 'Revisar após 1 semana', 'Revisar após 2 semanas e depois mensalmente', 'Usar flashcards físicos ou digitais (Anki)'],
        materiais: 'Flashcards, agenda de revisão, aplicativo Anki',
      },
      {
        titulo: 'Ensino Explícito e Scaffolding',
        objetivo: 'Reduzir a carga cognitiva e aumentar a eficácia do ensino por meio de suporte estruturado.',
        descricao: 'Instrução direta e estruturada com suporte (scaffolding) progressivamente retirado à medida que o aluno ganha autonomia.',
        passos: ['Modelar completamente ("eu faço")', 'Fazer junto com o aluno ("fazemos juntos")', 'Guiar com perguntas enquanto o aluno faz ("você faz, eu apoio")', 'Prática independente supervisionada', 'Prática independente com feedback posterior'],
        materiais: 'Material de trabalho adaptado, checklist de passos, fichas de modelo',
      },
      {
        titulo: 'Desenvolvimento de Funções Executivas',
        objetivo: 'Fortalecer planejamento, memória de trabalho, controle inibitório e flexibilidade cognitiva.',
        descricao: 'Atividades estruturadas para desenvolver as funções executivas que são base para o desempenho acadêmico.',
        passos: ['Trabalhar planejamento com projetos de múltiplas etapas', 'Treinar memória de trabalho com sequências verbais e não-verbais', 'Praticar controle inibitório com jogos do tipo "Pare e Pense"', 'Desenvolver flexibilidade com atividades de categorização e reclassificação', 'Usar autorregulação com termômetro emocional'],
        materiais: 'Jogos de tabuleiro estratégicos, Cogmed, fichas de planejamento, agenda visual',
      },
    ],
  },
]

const TAG_STYLE: Record<string, { bg: string; color: string }> = {
  clínico:          { bg: '#eff6ff', color: '#1d4ed8' },
  escolar:          { bg: '#f0fdf4', color: '#15803d' },
  'clínico/escolar': { bg: '#f5f3ff', color: '#6d28d9' },
}

export default function IntervencoesPage() {
  const total = CATEGORIAS.reduce((s, c) => s + c.intervencoes.length, 0)

  return (
    <div style={{ maxWidth: 980 }}>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
        {CATEGORIAS.length} categorias · {total} intervenções com objetivos, descrição e passo a passo
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CATEGORIAS.map(cat => (
          <details key={cat.nome} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
            <summary style={{
              padding: '16px 20px', cursor: 'pointer', listStyle: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#fafafa',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 32, borderRadius: 4, background: cat.cor, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{cat.nome}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 1 }}>{cat.intervencoes.length} intervenções</div>
                </div>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 500, ...TAG_STYLE[cat.tag] }}>{cat.tag}</span>
              </div>
              <span style={{ fontSize: 18, color: '#9ca3af' }}>▾</span>
            </summary>

            <div style={{ padding: '16px 20px', borderTop: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cat.intervencoes.map((item, i) => (
                <details key={i} style={{ border: `1px solid ${cat.cor}22`, borderRadius: 8, overflow: 'hidden' }}>
                  <summary style={{ padding: '12px 16px', cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', gap: 10, background: cat.bg }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: cat.cor, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: cat.cor, flex: 1 }}>{item.titulo}</span>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>▾</span>
                  </summary>
                  <div style={{ padding: '14px 18px', background: '#fff' }}>
                    {/* Objetivo */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Objetivo</div>
                      <div style={{ fontSize: 13, color: '#111827', lineHeight: 1.6 }}>{item.objetivo}</div>
                    </div>
                    {/* Descrição */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Descrição</div>
                      <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{item.descricao}</div>
                    </div>
                    {/* Passo a passo */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Passo a passo</div>
                      <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {item.passos.map((p, pi) => (
                          <li key={pi} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#374151', lineHeight: 1.5 }}>
                            <span style={{ width: 20, height: 20, borderRadius: '50%', background: cat.bg, color: cat.cor, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{pi + 1}</span>
                            {p}
                          </li>
                        ))}
                      </ol>
                    </div>
                    {/* Materiais */}
                    <div style={{ padding: '10px 14px', borderRadius: 7, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Materiais: </span>
                      <span style={{ fontSize: 12, color: '#374151' }}>{item.materiais}</span>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
