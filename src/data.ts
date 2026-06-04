import { Hairstyle, Testimonial, Bonus, FAQItem } from './types';

// Let's import the generated image paths which we saved as assets
export const EBOOK_COVER_PATH = 'https://i.ibb.co/cc1VL9HK/Chat-GPT-Image-4-de-jun-de-2026-12-58-04.png';
export const PREVIEW_HAIRSTYLE_PATH = '/src/assets/images/girl_hairstyle_ribbons_1780586621647.png';

export const hairstyles: Hairstyle[] = [
  {
    id: 'p1',
    name: 'Trança Caipira Clássica com Fitas',
    category: 'Longo',
    difficulty: 'Iniciante',
    duration: 15,
    materials: [
      'Fitas de cetim coloridas (2 cores de sua preferência)',
      '2 elásticos de cabelo (silicone transparentes)',
      'Escova de cabelo',
      'Grampos pequenos (opcional)',
      'Laço grande pronto para o topo'
    ],
    steps: [
      'Divida o cabelo ao meio de forma bem retinha, da testa até a nuca, criando duas partes iguais.',
      'Em uma das partes, separe três mechas logo abaixo da orelha para iniciar uma trança simples de três pontas.',
      'Pegue as duas fitas de cetim coloridas e amarre junto com uma das mechas antes de trançar.',
      'Comece a trançar as mechas normalmente, incorporando as fitas de cetim paralelamente ao cabelo. Deixe as fitas bem esticadas para aparecerem bem.',
      'Prenda a ponta com o elástico de silicone escondido e finalize com um laço fofo por cima.',
      'Repita exatamente o mesmo processo na outra metade do cabelo.',
      'DICA EXTRA: Dê pequenas puxadinhas nas laterais da trança para deixá-la mais gordinha e chamativa!'
    ],
    tip: 'Esborrifar um pouco de spray fixador leve ou água com um pouquinho de gel ajuda a assentar os fios rebeldes (frizz) antes de trançar.',
    image: PREVIEW_HAIRSTYLE_PATH
  },
  {
    id: 'p2',
    name: 'Coque Junino Decorado com Mini-Bandeirinhas',
    category: 'Médio',
    difficulty: 'Fácil',
    duration: 10,
    materials: [
      'Escova de cabelo',
      '1 elástico forte (rabicó)',
      '4 a 6 grampos para coque de cor próxima ao cabelo',
      'Pequenos enfeites de bandeirinhas juninas em miniatura ou fitas coloridas',
      'Presilha Junina pequena'
    ],
    steps: [
      'Penteie todo o cabelo para trás e faça um rabo de cavalo bem alto e firme no topo da cabeça.',
      'Torça todo o rabo de cavalo de forma delicada e vá girando ao redor da base (elástico) para formar um coque donut.',
      'Prenda as pontas do coque firmemente usando os grampos de cabelo.',
      'Pegue o cordão de mini-bandeirinhas decorativas (ou as fitas coloridas prontas) e contorne a base do coque.',
      'Com o auxílio de dois grampos pequenos, prenda as pontas do barbante das bandeirinhas discretamente atrás do coque.',
      'Finalize aplicando um laço xadrez ou flor caipira logo na lateral ou topo do coque.'
    ],
    tip: 'Se o cabelo for fino demais ou muito escorregadio, use um lenço colorido amarrado tipo bandana em volta do coque para encobrir imperfeições e dar um charme caipira instantâneo.',
    image: 'https://picsum.photos/seed/coque/400/400'
  },
  {
    id: 'p3',
    name: 'Maria-Chiquinha com Elásticos Coloridos',
    category: 'Curto',
    difficulty: 'Iniciante',
    duration: 8,
    materials: [
      'Mini elásticos de silicone em cores sortidas (verde, vermelho, amarelo, azul)',
      'Escova e pente de dentes finos',
      '2 mini mini mini chapéus de palha decorativos com presilha bico de pato'
    ],
    steps: [
      'Divida todo o cabelinho da criança ao meio, criando duas secções para Maria-Chiquinha.',
      'Em uma das laterais, faça um primeiro rabo pequeno pegando apenas a mecha da frente (perto da testa) e prenda com um elástico azul.',
      'Junte essa mecha amarrada com um pouco mais de cabelo logo abaixo e coloque um elástico amarelo, criando um efeito gominho.',
      'Siga fazendo isso até completar toda a extensão da Maria-Chiquinha (cerca de 3 a 4 elásticos ao longo do comprimento).',
      'Repita o mesmo processo do outro lado de forma simétrica.',
      'Prenda os mini chapeuzinhos de palha por cima das amarrações principais no topo da Maria-Chiquinha.'
    ],
    tip: 'Este penteado é extraordinário para cabelos curtos ou bebês que têm poucos fios e ainda não têm comprimento para trança!',
    image: 'https://picsum.photos/seed/short_braids/400/400'
  },
  {
    id: 'p4',
    name: 'Rabo de Cavalo Junino com Laço Caipira Gigante',
    category: 'Médio',
    difficulty: 'Iniciante',
    duration: 5,
    materials: [
      '1 elástico largo e resistente',
      'Escova ou pente',
      'Spray de brilho ou água perfumada infantil',
      'Fitas coloridas de espessuras variadas ou laço gigante junino'
    ],
    steps: [
      'Estique o cabelo todo para trás fazendo um rabo de cavalo médio clássico.',
      'Prenda muito bem com o elástico para garantir que a criança possa balançar, correr e dançar a quadrilha sem desmanchar.',
      'Pegue o laço gigante caipira (com fitas longas penduradas em cascata) e prenda diretamente por cima do elástico.',
      'Penteie as fitas de cetim do laço para misturá-las sutilmente com o cabelo solto da criança.',
      'Se quiser, adicione mini presilhas em formato de flores pela extensão do rabo!'
    ],
    tip: 'Penteado mais seguro, rápido de 5 minutos e à prova de bagunça, ideal para quando você está super atrasada!',
    image: 'https://picsum.photos/seed/pony/400/400'
  },
  {
    id: 'p5',
    name: 'Falso Moicano Junino com Elásticos e Trancinhas',
    category: 'Médio',
    difficulty: 'Médio',
    duration: 15,
    materials: [
      'Mini elásticos de silicone neon e coloridos',
      'Pente fino',
      'Laço junino vermelho',
      'Gel fixador sem álcool'
    ],
    steps: [
      'Separe uma mecha no topo central da cabeça (como um topete do moicano) e prenda com elástico colorido.',
      'Logo abaixo, separe outra mecha central horizontal e junte com a ponta da primeira mecha, amarrando com outro elástico.',
      'Repita esse processo por 4 vezes até o meio da cabeça.',
      'Penteie o cabelo das laterais rente à cabeça e deixe-o solto abaixo das amarrações centrais.',
      'O cabelo que de fato sobrar solto atrás pode ser trançado em várias pequenas tranças fininhas decoradas com fitas coloridas.',
      'Conclua prendendo um laço com bico de pato bem no início da nuca.'
    ],
    tip: 'Passar uma pequena quantidade de gel com glitter na parte presa central do moicano dá um destaque brilhante maravilhoso na festa junina!',
    image: 'https://picsum.photos/seed/mohawk/400/400'
  },
  {
    id: 'p6',
    name: 'Trança Embutida Lateral com Pregadeiras de Pipoca',
    category: 'Longo',
    difficulty: 'Avançado',
    duration: 20,
    materials: [
      'Elásticos fininhos de cabelo',
      'Pente separador de mechas',
      'Pregadeiras pequenas decoradas em formato de flores ou pipochas',
      'Um laço vermelho grande'
    ],
    steps: [
      'Inicie uma trança embutida na lateral superior esquerda da cabeça, direcionando-a em diagonal para a lateral inferior direita da nuca.',
      'Vá alimentando a trança com pequenas mechas conforme desce lateralmente pela cabeça.',
      'Ao chegar na nuca, continue o trançado de forma simples, sobre o ombro direito, até o final e amarre.',
      'Espalhe as pequenas pregadeiras juninas divertidas (como flores de feltro ou mini mini chapéus) ao longo da costura da trança embutida.',
      'Coloque o laço grande cobrindo o elástico de fechamento.'
    ],
    tip: 'Dificuldade Avançada, mas explicada perante os vídeos de nosso Guia com riqueza de detalhes no posicionamento das mãos!',
    image: 'https://picsum.photos/seed/emb/400/400'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Juliana Mendes',
    text: 'Gente, esse Guia me salvou! Descobri que a Festa Junina da escola da minha filha de 5 anos era no dia seguinte às 20h e eu estava desesperada porque não sei fazer trança nenhuma! Assisti às vídeo aulas rápidas, fiz a Maria-Chiquinha com elásticos coloridos em 10 minutos. Ficou LINDA e ela recebeu muitos elogios na quadrilha!',
    stars: 5,
    role: 'Mãe da Mel (5 anos)',
    avatar: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    id: 't2',
    name: 'Carla Vasconcellos',
    text: 'Eu gastava quase R$ 120,00 no salão todo ano para arrumar o cabelo da minha filha pra festa junina além do estresse das filas. Com o Guia gastei menos de 10 reais comprando fitas de cetim e fiz eu mesma assistindo as aulas da "Trança Caipira Clássica". O passo a passo é extremamente detalhado e muito mais fácil do que os vídeos difíceis que a gente vê no YouTube!',
    stars: 5,
    role: 'Mãe da Gabi (8 anos)',
    avatar: 'https://picsum.photos/seed/user2/100/100'
  },
  {
    id: 't3',
    name: 'Patricia Lima Tavares',
    text: 'Adorei que tem aulas exclusivas para cabelos curtos! Minha pequenininha tem o cabelo bem ralo, mas os penteados juninos com elásticos coloridos e os mini chapeuzinhos assistindo aos vídeos deram super certo! Recomendo super pela facilidade.',
    stars: 5,
    role: 'Mãe da Alice (3 anos)',
    avatar: 'https://picsum.photos/seed/user3/100/100'
  },
  {
    id: 't4',
    name: 'Isabela Rodrigues',
    text: 'Os bônus são incríveis de verdade. A lista de materiais me economizou tempo na papelaria pois comprei só o que iria precisar de verdade. Minha filhota ficou super orgulhosa do penteado e durou a festa junina INTEIRA!',
    stars: 5,
    role: 'Mãe da Yasmin (7 anos)',
    avatar: 'https://picsum.photos/seed/user4/100/100'
  }
];

export const bonuses: Bonus[] = [
  {
    id: 'b1',
    title: 'BÔNUS 1: 10 Penteados de Festa Junina Para Cabelos Curtos e Franjas',
    description: 'Vídeos exclusivos com ideias de tiaras de elásticos, meias-presilhas e amarrações com pompons que não dependem de volume ou comprimento.',
    originalValue: 27
  },
  {
    id: 'b2',
    title: 'BÔNUS 2: Guia Prático de Tranças Seguras para Iniciantes (O "Zero a Zero")',
    description: 'Aprenda do absoluto zero em vídeo a segurar as mechas sem embaraçar o cabelo ou machucar o couro cabeludo sensível da criança.',
    originalValue: 19
  },
  {
    id: 'b3',
    title: 'BÔNUS 3: Checklist e Lista de Materiais Econômicos',
    description: 'Acesse pelo celular nas compras e compre as fitas e mini-enfeites corretos com apenas R$ 15,00 ou menos.',
    originalValue: 12
  },
  {
    id: 'b4',
    title: 'BÔNUS 4: 10 Penteados Salvadores "Express" de Até 5 Minutos em Vídeo',
    description: 'Atrasou ou a criança está agitada demais? Assista a estes tutoriais rápidos, lindos e fáceis de fixar.',
    originalValue: 32,
    highlight: true
  }
];

export const faqItems: FAQItem[] = [
  {
    id: 'f1',
    question: 'Eu realmente vou conseguir fazer se nunca fiz tranças ou penteados?',
    answer: 'Com certeza absoluta! O Guia de vídeo aulas foi criado especificamente para mães iniciantes. Nossos tutoriais em vídeo não pulam etapas e ensinam o posicionamento exato dos dedos mecha por mecha.'
  },
  {
    id: 'f2',
    question: 'Como funciona o acesso ao material?',
    answer: 'O acesso ao portal de vídeo aulas é imediato! Assim que seu pagamento for confirmado (mesmo via Pix ou Cartão de Crédito), você recebe o link para acessar o Guia diretamente no seu e-mail cadastrado, podendo assistir pelo celular, tablet ou computador sempre que desejar.'
  },
  {
    id: 'f3',
    question: 'Serve para cabelos bem curtinhos ou ralos?',
    answer: 'Sim! Temos vídeo aulas com bônus específicos e mais de 10 ideias de penteados que utilizam mini-elásticos coloridos, tiaras de cabelo e presilhas, que dão um visual caipira maravilhoso sem precisar de longas tranças.'
  },
  {
    id: 'f4',
    question: 'Quais os materiais mínimos necessários?',
    answer: 'Você só precisa de coisas básicas que provavelmente já tem em casa: pente, elásticos de silicone (transparentes ou coloridos) e fitas decorativas comuns de papelaria. Nós ensinamos nas vídeo aulas a reaproveitar o que você tiver no armário!'
  },
  {
    id: 'f5',
    question: 'E se eu não gostar ou achar muito difícil?',
    answer: 'Oferecemos garantia incondicional de 7 dias de satisfação. Se você acessar a área de membros com os vídeos e achar que os penteados não são fáceis ou práticos para você, basta nos enviar um e-mail que devolvemos 100% do seu dinheiro sem perguntas!'
  },
  {
    id: 'f6',
    question: 'Como faço para assistir às vídeo aulas?',
    answer: 'O Guia é composto por vídeo aulas passo a passo super dinâmicas e de fácil entendimento. Você pode acessar e assistir no celular, computador ou tablet com total flexibilidade de horário, quantas vezes quiser!'
  },
  {
    id: 'f7',
    question: 'O pagamento é seguro e único?',
    answer: 'Sim! Pagamento único, sem mensalidades adicionais. A transação é criptografada e processada com segurança líder de mercado.'
  }
];
