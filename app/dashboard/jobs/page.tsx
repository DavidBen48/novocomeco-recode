'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Search,
  MapPin,
  Building,
  Calendar,
  DollarSign,
  Clock,
  Bookmark,
  CheckCircle,
  X,
  Send,
  Upload,
  ArrowLeft,
  Briefcase,
  Star,
  Zap
} from 'lucide-react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'CLT' | 'PJ' | 'Freelance' | 'Estágio'
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  deadline: string
  applied: boolean
  remote: boolean
}

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<'presencial' | 'homeoffice' | 'applied'>('presencial')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    skills: [] as string[],
    hasExperience: ''
  })

  const [jobs, setJobs] = useState<Job[]>([
    /* 
      nesse trecho, pedi ajuda para a IA para gerar
      aleatóriamente para eu não precisar fazer tudo
      "na mão".
    */
    {
      id: '1',
      title: 'Desenvolvedor Frontend React',
      company: 'Google',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 12.000',
      description: 'Buscamos um desenvolvedor frontend experiente em React para integrar nossa equipe de desenvolvimento de produtos inovadores. Você trabalhará em projetos de grande escala que impactam milhões de usuários.',
      requirements: ['React.js', 'TypeScript', 'HTML5/CSS3', 'Git', 'JavaScript ES6+'],
      benefits: ['Plano de saúde premium', 'Vale alimentação R$ 1.200', 'Home office híbrido', 'Participação nos lucros', 'Auxílio educação'],
      postedDate: '15/06',
      deadline: '15/07',
      applied: false,
      remote: true
    },
    {
      id: '2',
      title: 'Desenvolvedor Backend Node.js',
      company: 'Microsoft',
      location: 'Rio de Janeiro, RJ',
      type: 'CLT',
      salary: 'R$ 9.000 - R$ 15.000',
      description: 'Oportunidade para desenvolvedor backend com experiência em Node.js e arquitetura de microsserviços. Trabalhe com tecnologias de ponta em um ambiente colaborativo.',
      requirements: ['Node.js', 'Express.js', 'MongoDB', 'Docker', 'AWS'],
      benefits: ['Plano de saúde premium', 'Seguro de vida', 'Auxílio educação', 'Stock options', 'Ginástica laboral'],
      postedDate: '12/06',
      deadline: '12/07',
      applied: false,
      remote: false
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'Meta',
      location: 'Remoto',
      type: 'PJ',
      salary: 'R$ 12.000 - R$ 18.000',
      description: 'Desenvolvedor full stack para trabalhar em projetos de realidade virtual e metaverso. Seja parte da revolução tecnológica que está moldando o futuro.',
      requirements: ['React', 'Node.js', 'Python', 'AWS', 'GraphQL'],
      benefits: ['Trabalho 100% remoto', 'Horário flexível', 'Equipamentos fornecidos', 'Cursos pagos', 'Conferências internacionais'],
      postedDate: '10/06',
      deadline: '10/07',
      applied: false,
      remote: true
    },
    {
      id: '4',
      title: 'Desenvolvedor Mobile React Native',
      company: 'Spotify',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 10.000 - R$ 16.000',
      description: 'Desenvolvedor mobile para criar experiências musicais incríveis em dispositivos móveis. Trabalhe com uma das maiores plataformas de streaming do mundo.',
      requirements: ['React Native', 'JavaScript', 'iOS/Android', 'Redux', 'TypeScript'],
      benefits: ['Spotify Premium vitalício', 'Plano de saúde', 'Ginástica laboral', 'Day off aniversário', 'Eventos exclusivos'],
      postedDate: '08/06',
      deadline: '08/07',
      applied: false,
      remote: true
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'Amazon',
      location: 'Brasília, DF',
      type: 'CLT',
      salary: 'R$ 11.000 - R$ 17.000',
      description: 'Engenheiro DevOps para gerenciar infraestrutura cloud e pipelines de CI/CD. Trabalhe com a maior infraestrutura de cloud do mundo.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      benefits: ['AWS Credits ilimitados', 'Plano de saúde', 'Participação nos lucros', 'Relocation assistance', 'Desconto em produtos'],
      postedDate: '05/06',
      deadline: '05/07',
      applied: false,
      remote: false
    },
    {
      id: '6',
      title: 'Desenvolvedor Python',
      company: 'Netflix',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 9.500 - R$ 14.000',
      description: 'Desenvolvedor Python para trabalhar em sistemas de recomendação e análise de dados. Ajude a criar algoritmos que entretêm milhões de pessoas.',
      requirements: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Machine Learning'],
      benefits: ['Netflix Premium', 'Plano de saúde', 'Vale alimentação', 'Home office', 'Licença sabática'],
      postedDate: '03/06',
      deadline: '03/07',
      applied: false,
      remote: true
    },
    {
      id: '7',
      title: 'Desenvolvedor Java Spring',
      company: 'Oracle',
      location: 'Belo Horizonte, MG',
      type: 'CLT',
      salary: 'R$ 8.500 - R$ 13.000',
      description: 'Desenvolvedor Java para sistemas enterprise de alta performance. Trabalhe com tecnologias robustas em projetos de grande escala.',
      requirements: ['Java', 'Spring Boot', 'Hibernate', 'Oracle DB', 'Maven'],
      benefits: ['Plano de saúde', 'Previdência privada', 'Auxílio educação', 'Certificações Oracle', 'Bônus anual'],
      postedDate: '01/06',
      deadline: '01/07',
      applied: false,
      remote: false
    },
    {
      id: '8',
      title: 'Desenvolvedor Angular',
      company: 'IBM',
      location: 'Porto Alegre, RS',
      type: 'CLT',
      salary: 'R$ 7.500 - R$ 11.000',
      description: 'Desenvolvedor frontend especializado em Angular para projetos de transformação digital. Seja parte da revolução tecnológica empresarial.',
      requirements: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'SASS'],
      benefits: ['Plano de saúde', 'Vale alimentação', 'Auxílio transporte', 'Treinamentos IBM', 'Flexibilidade de horário'],
      postedDate: '28/05',
      deadline: '28/06',
      applied: false,
      remote: true
    },
    {
      id: '9',
      title: 'Estagiário de TI',
      company: 'HP',
      location: 'Curitiba, PR',
      type: 'Estágio',
      salary: 'R$ 2.000 - R$ 2.500',
      description: 'Oportunidade para estudantes de TI atuarem em projetos de suporte e infraestrutura.',
      requirements: ['Cursando TI', 'Boa comunicação', 'Proatividade'],
      benefits: ['Vale transporte', 'Vale refeição', 'Seguro de vida', 'Salário: R$ 2.000 - R$ 2.500'],
      postedDate: '01/07',
      deadline: '01/08',
      applied: false,
      remote: false
    },
    {
      id: '10',
      title: 'Desenvolvedor Júnior',
      company: 'Lenovo',
      location: 'Recife, PE',
      type: 'CLT',
      salary: 'R$ 3.500 - R$ 5.000',
      description: 'Desenvolvimento de aplicações web e manutenção de sistemas.',
      requirements: ['JavaScript', 'HTML/CSS', 'Git'],
      benefits: ['Plano de saúde', 'Vale alimentação', 'Salário: R$ 3.500 - R$ 5.000'],
      postedDate: '02/07',
      deadline: '02/08',
      applied: false,
      remote: false
    },
    {
      id: '11',
      title: 'Analista de Dados',
      company: 'Toshiba',
      location: 'Remoto',
      type: 'PJ',
      salary: 'R$ 7.000 - R$ 10.000',
      description: 'Análise de dados e geração de relatórios para tomada de decisão.',
      requirements: ['SQL', 'Power BI', 'Excel avançado'],
      benefits: ['Trabalho remoto', 'Horário flexível', 'Salário: R$ 7.000 - R$ 10.000'],
      postedDate: '03/07',
      deadline: '03/08',
      applied: false,
      remote: true
    },
    {
      id: '12',
      title: 'Tech Lead',
      company: 'Rolex',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 18.000 - R$ 20.000',
      description: 'Liderança técnica de equipe de desenvolvimento de software.',
      requirements: ['Liderança', 'Arquitetura de Software', 'Experiência com projetos grandes'],
      benefits: ['Plano de saúde premium', 'Bônus anual', 'Salário: R$ 18.000 - R$ 20.000'],
      postedDate: '04/07',
      deadline: '01/09',
      applied: false,
      remote: false
    },
    {
      id: '13',
      title: 'Desenvolvedor Frontend',
      company: 'Yamaha',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 6.000 - R$ 9.000',
      description: 'Desenvolvimento de interfaces para sistemas de música e áudio.',
      requirements: ['React', 'TypeScript', 'CSS3', 'Web Audio API'],
      benefits: ['Plano de saúde', 'Vale alimentação', 'Salário: R$ 6.000 - R$ 9.000'],
      postedDate: '05/07',
      deadline: '05/08',
      applied: false,
      remote: false
    },
    {
      id: '14',
      title: 'Desenvolvedor Backend',
      company: 'Samsung',
      location: 'Manaus, AM',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 12.000',
      description: 'Desenvolvimento de APIs e sistemas backend para produtos Samsung.',
      requirements: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      benefits: ['Plano de saúde', 'Participação nos lucros', 'Salário: R$ 8.000 - R$ 12.000'],
      postedDate: '06/07',
      deadline: '06/08',
      applied: false,
      remote: false
    },
    {
      id: '15',
      title: 'Desenvolvedor Mobile',
      company: 'Apple',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 12.000 - R$ 16.000',
      description: 'Desenvolvimento de aplicativos iOS para ecossistema Apple.',
      requirements: ['Swift', 'iOS SDK', 'Xcode', 'Core Data'],
      benefits: ['Produtos Apple', 'Plano de saúde premium', 'Salário: R$ 12.000 - R$ 16.000'],
      postedDate: '07/07',
      deadline: '07/08',
      applied: false,
      remote: false
    },
    {
      id: '16',
      title: 'DevOps Engineer',
      company: 'Intel',
      location: 'Remoto',
      type: 'PJ',
      salary: 'R$ 10.000 - R$ 15.000',
      description: 'Automação de infraestrutura e pipelines de CI/CD.',
      requirements: ['Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
      benefits: ['Trabalho remoto', 'Equipamentos fornecidos', 'Salário: R$ 10.000 - R$ 15.000'],
      postedDate: '08/07',
      deadline: '08/08',
      applied: false,
      remote: true
    },
    {
      id: '17',
      title: 'Desenvolvedor Full Stack',
      company: 'Nike',
      location: 'Rio de Janeiro, RJ',
      type: 'CLT',
      salary: 'R$ 9.000 - R$ 13.000',
      description: 'Desenvolvimento de aplicações web para e-commerce esportivo.',
      requirements: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      benefits: ['Produtos Nike', 'Plano de saúde', 'Salário: R$ 9.000 - R$ 13.000'],
      postedDate: '09/07',
      deadline: '09/08',
      applied: false,
      remote: false
    },
    {
      id: '18',
      title: 'Analista de Segurança',
      company: 'Cisco',
      location: 'Brasília, DF',
      type: 'CLT',
      salary: 'R$ 8.500 - R$ 12.000',
      description: 'Análise e implementação de soluções de segurança cibernética.',
      requirements: ['Cibersegurança', 'Firewall', 'SIEM', 'Certificações'],
      benefits: ['Certificações Cisco', 'Plano de saúde', 'Salário: R$ 8.500 - R$ 12.000'],
      postedDate: '10/07',
      deadline: '10/08',
      applied: false,
      remote: false
    },
    {
      id: '19',
      title: 'Desenvolvedor Python',
      company: 'Adidas',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.000 - R$ 10.000',
      description: 'Desenvolvimento de sistemas de análise de dados esportivos.',
      requirements: ['Python', 'Django', 'Machine Learning', 'Pandas'],
      benefits: ['Produtos Adidas', 'Plano de saúde', 'Salário: R$ 7.000 - R$ 10.000'],
      postedDate: '11/07',
      deadline: '11/08',
      applied: false,
      remote: false
    },
    {
      id: '20',
      title: 'Desenvolvedor Java',
      company: 'Oracle',
      location: 'Belo Horizonte, MG',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 12.000',
      description: 'Desenvolvimento de sistemas enterprise com Java e Oracle.',
      requirements: ['Java', 'Spring', 'Oracle DB', 'JPA'],
      benefits: ['Certificações Oracle', 'Plano de saúde', 'Salário: R$ 8.000 - R$ 12.000'],
      postedDate: '12/07',
      deadline: '12/08',
      applied: false,
      remote: false
    },
    {
      id: '21',
      title: 'Desenvolvedor React',
      company: 'Tesla',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 11.000 - R$ 15.000',
      description: 'Desenvolvimento de interfaces para sistemas de veículos elétricos.',
      requirements: ['React', 'TypeScript', 'Redux', 'WebGL'],
      benefits: ['Desconto Tesla', 'Plano de saúde premium', 'Salário: R$ 11.000 - R$ 15.000'],
      postedDate: '13/07',
      deadline: '01/09',
      applied: false,
      remote: false
    },
    {
      id: '22',
      title: 'Desenvolvedor Angular',
      company: 'BMW',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 9.000 - R$ 13.000',
      description: 'Desenvolvimento de aplicações web para sistemas automotivos.',
      requirements: ['Angular', 'TypeScript', 'RxJS', 'Material Design'],
      benefits: ['Desconto BMW', 'Plano de saúde', 'Salário: R$ 9.000 - R$ 13.000'],
      postedDate: '01/07',
      deadline: '01/08',
      applied: false,
      remote: false
    },
    {
      id: '23',
      title: 'Desenvolvedor Node.js',
      company: 'Mercedes-Benz',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.500 - R$ 12.000',
      description: 'Desenvolvimento de APIs para sistemas de conectividade veicular.',
      requirements: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
      benefits: ['Desconto Mercedes', 'Plano de saúde', 'Salário: R$ 8.500 - R$ 12.000'],
      postedDate: '02/07',
      deadline: '02/08',
      applied: false,
      remote: false
    },
    {
      id: '24',
      title: 'Desenvolvedor Flutter',
      company: 'Audi',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 11.000',
      description: 'Desenvolvimento de aplicativos móveis para sistemas Audi.',
      requirements: ['Flutter', 'Dart', 'Firebase', 'Material Design'],
      benefits: ['Desconto Audi', 'Plano de saúde', 'Salário: R$ 8.000 - R$ 11.000'],
      postedDate: '03/07',
      deadline: '03/08',
      applied: false,
      remote: false
    },
    {
      id: '25',
      title: 'Desenvolvedor Vue.js',
      company: 'Volkswagen',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.500 - R$ 10.000',
      description: 'Desenvolvimento de interfaces para sistemas de concessionárias.',
      requirements: ['Vue.js', 'JavaScript', 'Vuex', 'Vuetify'],
      benefits: ['Desconto VW', 'Plano de saúde', 'Salário: R$ 7.500 - R$ 10.000'],
      postedDate: '04/07',
      deadline: '04/08',
      applied: false,
      remote: false
    },
    {
      id: '26',
      title: 'Desenvolvedor PHP',
      company: 'Ferrari',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 9.000 - R$ 12.000',
      description: 'Desenvolvimento de sistemas para concessionárias Ferrari.',
      requirements: ['PHP', 'Laravel', 'MySQL', 'Composer'],
      benefits: ['Experiência Ferrari', 'Plano de saúde', 'Salário: R$ 9.000 - R$ 12.000'],
      postedDate: '05/07',
      deadline: '05/08',
      applied: false,
      remote: false
    },
    {
      id: '27',
      title: 'Desenvolvedor .NET',
      company: 'Porsche',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 10.000 - R$ 14.000',
      description: 'Desenvolvimento de sistemas enterprise para Porsche.',
      requirements: ['C#', '.NET Core', 'SQL Server', 'Entity Framework'],
      benefits: ['Desconto Porsche', 'Plano de saúde premium', 'Salário: R$ 10.000 - R$ 14.000'],
      postedDate: '06/07',
      deadline: '06/08',
      applied: false,
      remote: false
    },
    {
      id: '28',
      title: 'Desenvolvedor Go',
      company: 'Lamborghini',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 11.000 - R$ 15.000',
      description: 'Desenvolvimento de sistemas de alta performance.',
      requirements: ['Go', 'Gin', 'PostgreSQL', 'Docker'],
      benefits: ['Experiência Lamborghini', 'Plano de saúde', 'Salário: R$ 11.000 - R$ 15.000'],
      postedDate: '07/07',
      deadline: '07/08',
      applied: false,
      remote: false
    },
    {
      id: '29',
      title: 'Desenvolvedor Rust',
      company: 'Bugatti',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 12.000 - R$ 16.000',
      description: 'Desenvolvimento de sistemas críticos de segurança.',
      requirements: ['Rust', 'Systems Programming', 'Memory Safety', 'Performance'],
      benefits: ['Experiência Bugatti', 'Plano de saúde premium', 'Salário: R$ 12.000 - R$ 16.000'],
      postedDate: '08/07',
      deadline: '08/08',
      applied: false,
      remote: false
    },
    {
      id: '30',
      title: 'Desenvolvedor Kotlin',
      company: 'McLaren',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 10.000 - R$ 14.000',
      description: 'Desenvolvimento de aplicativos Android para sistemas McLaren.',
      requirements: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Coroutines'],
      benefits: ['Experiência McLaren', 'Plano de saúde', 'Salário: R$ 10.000 - R$ 14.000'],
      postedDate: '09/07',
      deadline: '09/08',
      applied: false,
      remote: false
    },
    {
      id: '31',
      title: 'Desenvolvedor Swift',
      company: 'Bentley',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 11.000 - R$ 15.000',
      description: 'Desenvolvimento de aplicativos iOS para sistemas Bentley.',
      requirements: ['Swift', 'iOS SDK', 'SwiftUI', 'Core Data'],
      benefits: ['Experiência Bentley', 'Plano de saúde premium', 'Salário: R$ 11.000 - R$ 15.000'],
      postedDate: '10/07',
      deadline: '10/08',
      applied: false,
      remote: false
    },
    {
      id: '32',
      title: 'Desenvolvedor Scala',
      company: 'Rolls-Royce',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 13.000 - R$ 17.000',
      description: 'Desenvolvimento de sistemas de alta performance para Rolls-Royce.',
      requirements: ['Scala', 'Akka', 'Play Framework', 'Slick'],
      benefits: ['Experiência Rolls-Royce', 'Plano de saúde premium', 'Salário: R$ 13.000 - R$ 17.000'],
      postedDate: '11/07',
      deadline: '11/08',
      applied: false,
      remote: false
    },
    {
      id: '33',
      title: 'Desenvolvedor Elixir',
      company: 'Aston Martin',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 10.000 - R$ 14.000',
      description: 'Desenvolvimento de sistemas distribuídos para Aston Martin.',
      requirements: ['Elixir', 'Phoenix', 'Ecto', 'OTP'],
      benefits: ['Experiência Aston Martin', 'Plano de saúde', 'Salário: R$ 10.000 - R$ 14.000'],
      postedDate: '12/07',
      deadline: '12/08',
      applied: false,
      remote: false
    },
    {
      id: '34',
      title: 'Desenvolvedor Clojure',
      company: 'Maserati',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 9.000 - R$ 13.000',
      description: 'Desenvolvimento de sistemas funcionais para Maserati.',
      requirements: ['Clojure', 'Ring', 'Compojure', 'Datomic'],
      benefits: ['Experiência Maserati', 'Plano de saúde', 'Salário: R$ 9.000 - R$ 13.000'],
      postedDate: '13/07',
      deadline: '01/09',
      applied: false,
      remote: false
    },
    {
      id: '35',
      title: 'Desenvolvedor Haskell',
      company: 'Alfa Romeo',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.500 - R$ 12.000',
      description: 'Desenvolvimento de sistemas com programação funcional.',
      requirements: ['Haskell', 'GHC', 'Cabal', 'Stack'],
      benefits: ['Experiência Alfa Romeo', 'Plano de saúde', 'Salário: R$ 8.500 - R$ 12.000'],
      postedDate: '01/07',
      deadline: '01/08',
      applied: false,
      remote: false
    },
    {
      id: '36',
      title: 'Desenvolvedor F#',
      company: 'Lancia',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 11.000',
      description: 'Desenvolvimento de sistemas com F# e .NET.',
      requirements: ['F#', '.NET', 'Functional Programming', 'Type Providers'],
      benefits: ['Experiência Lancia', 'Plano de saúde', 'Salário: R$ 8.000 - R$ 11.000'],
      postedDate: '02/07',
      deadline: '02/08',
      applied: false,
      remote: false
    },
    {
      id: '37',
      title: 'Desenvolvedor Erlang',
      company: 'Fiat',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.500 - R$ 10.000',
      description: 'Desenvolvimento de sistemas concorrentes para Fiat.',
      requirements: ['Erlang', 'OTP', 'BEAM VM', 'Mnesia'],
      benefits: ['Experiência Fiat', 'Plano de saúde', 'Salário: R$ 7.500 - R$ 10.000'],
      postedDate: '03/07',
      deadline: '03/08',
      applied: false,
      remote: false
    },
    {
      id: '38',
      title: 'Desenvolvedor Julia',
      company: 'Chrysler',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 11.000',
      description: 'Desenvolvimento de sistemas científicos para Chrysler.',
      requirements: ['Julia', 'Scientific Computing', 'Jupyter', 'Plots'],
      benefits: ['Experiência Chrysler', 'Plano de saúde', 'Salário: R$ 8.000 - R$ 11.000'],
      postedDate: '04/07',
      deadline: '04/08',
      applied: false,
      remote: false
    },
    {
      id: '39',
      title: 'Desenvolvedor R',
      company: 'Dodge',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.000 - R$ 10.000',
      description: 'Análise de dados e machine learning para Dodge.',
      requirements: ['R', 'RStudio', 'Tidyverse', 'Shiny'],
      benefits: ['Experiência Dodge', 'Plano de saúde', 'Salário: R$ 7.000 - R$ 10.000'],
      postedDate: '05/07',
      deadline: '05/08',
      applied: false,
      remote: false
    },
    {
      id: '40',
      title: 'Desenvolvedor MATLAB',
      company: 'Jeep',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.500 - R$ 11.500',
      description: 'Desenvolvimento de algoritmos para sistemas Jeep.',
      requirements: ['MATLAB', 'Simulink', 'Signal Processing', 'Control Systems'],
      benefits: ['Experiência Jeep', 'Plano de saúde', 'Salário: R$ 8.500 - R$ 11.500'],
      postedDate: '06/07',
      deadline: '06/08',
      applied: false,
      remote: false
    },
    {
      id: '41',
      title: 'Desenvolvedor Fortran',
      company: 'RAM',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.000 - R$ 9.000',
      description: 'Desenvolvimento de sistemas legados para RAM.',
      requirements: ['Fortran', 'Legacy Systems', 'Numerical Computing', 'Performance'],
      benefits: ['Experiência RAM', 'Plano de saúde', 'Salário: R$ 7.000 - R$ 9.000'],
      postedDate: '07/07',
      deadline: '07/08',
      applied: false,
      remote: false
    },
    {
      id: '42',
      title: 'Desenvolvedor COBOL',
      company: 'Chevrolet',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 6.500 - R$ 8.500',
      description: 'Manutenção de sistemas legados para Chevrolet.',
      requirements: ['COBOL', 'Mainframe', 'DB2', 'JCL'],
      benefits: ['Experiência Chevrolet', 'Plano de saúde', 'Salário: R$ 6.500 - R$ 8.500'],
      postedDate: '08/07',
      deadline: '08/08',
      applied: false,
      remote: false
    },
    {
      id: '43',
      title: 'Desenvolvedor Assembly',
      company: 'Cadillac',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 9.000 - R$ 12.000',
      description: 'Desenvolvimento de sistemas de baixo nível para Cadillac.',
      requirements: ['Assembly', 'x86', 'Embedded Systems', 'Performance'],
      benefits: ['Experiência Cadillac', 'Plano de saúde', 'Salário: R$ 9.000 - R$ 12.000'],
      postedDate: '09/07',
      deadline: '09/08',
      applied: false,
      remote: false
    },
    {
      id: '44',
      title: 'Desenvolvedor C++',
      company: 'Buick',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 11.000',
      description: 'Desenvolvimento de sistemas de alta performance para Buick.',
      requirements: ['C++', 'STL', 'Boost', 'CMake'],
      benefits: ['Experiência Buick', 'Plano de saúde', 'Salário: R$ 8.000 - R$ 11.000'],
      postedDate: '10/07',
      deadline: '10/08',
      applied: false,
      remote: false
    },
    {
      id: '45',
      title: 'Desenvolvedor C',
      company: 'Pontiac',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.500 - R$ 10.000',
      description: 'Desenvolvimento de sistemas embarcados para Pontiac.',
      requirements: ['C', 'Embedded Systems', 'RTOS', 'Microcontrollers'],
      benefits: ['Experiência Pontiac', 'Plano de saúde', 'Salário: R$ 7.500 - R$ 10.000'],
      postedDate: '11/07',
      deadline: '11/08',
      applied: false,
      remote: false
    },
    {
      id: '46',
      title: 'Desenvolvedor Ada',
      company: 'Oldsmobile',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 6.000 - R$ 8.000',
      description: 'Desenvolvimento de sistemas críticos para Oldsmobile.',
      requirements: ['Ada', 'Safety Critical', 'SPARK', 'Formal Methods'],
      benefits: ['Experiência Oldsmobile', 'Plano de saúde', 'Salário: R$ 6.000 - R$ 8.000'],
      postedDate: '12/07',
      deadline: '12/08',
      applied: false,
      remote: false
    },
    {
      id: '47',
      title: 'Desenvolvedor Lisp',
      company: 'Saturn',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.000 - R$ 9.500',
      description: 'Desenvolvimento de sistemas de IA para Saturn.',
      requirements: ['Lisp', 'AI', 'Machine Learning', 'Symbolic Computing'],
      benefits: ['Experiência Saturn', 'Plano de saúde', 'Salário: R$ 7.000 - R$ 9.500'],
      postedDate: '13/07',
      deadline: '01/09',
      applied: false,
      remote: false
    },
    {
      id: '48',
      title: 'Desenvolvedor Prolog',
      company: 'Hummer',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.500 - R$ 11.000',
      description: 'Desenvolvimento de sistemas de lógica para Hummer.',
      requirements: ['Prolog', 'Logic Programming', 'Expert Systems', 'AI'],
      benefits: ['Experiência Hummer', 'Plano de saúde', 'Salário: R$ 8.500 - R$ 11.000'],
      postedDate: '01/07',
      deadline: '01/08',
      applied: false,
      remote: false
    },
    {
      id: '49',
      title: 'Desenvolvedor Smalltalk',
      company: 'Saab',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.500 - R$ 10.000',
      description: 'Desenvolvimento de sistemas orientados a objetos para Saab.',
      requirements: ['Smalltalk', 'Object-Oriented', 'Pharo', 'Seaside'],
      benefits: ['Experiência Saab', 'Plano de saúde', 'Salário: R$ 7.500 - R$ 10.000'],
      postedDate: '02/07',
      deadline: '02/08',
      applied: false,
      remote: false
    },
    {
      id: '50',
      title: 'Desenvolvedor Eiffel',
      company: 'Volvo',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 11.000',
      description: 'Desenvolvimento de sistemas com Design by Contract para Volvo.',
      requirements: ['Eiffel', 'Design by Contract', 'Object-Oriented', 'Safety'],
      benefits: ['Experiência Volvo', 'Plano de saúde', 'Salário: R$ 8.000 - R$ 11.000'],
      postedDate: '03/07',
      deadline: '03/08',
      applied: false,
      remote: false
    },
    {
      id: '51',
      title: 'Desenvolvedor Simula',
      company: 'Scania',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.000 - R$ 9.500',
      description: 'Desenvolvimento de sistemas de simulação para Scania.',
      requirements: ['Simula', 'Simulation', 'Object-Oriented', 'Modeling'],
      benefits: ['Experiência Scania', 'Plano de saúde', 'Salário: R$ 7.000 - R$ 9.500'],
      postedDate: '04/07',
      deadline: '04/08',
      applied: false,
      remote: false
    },
    {
      id: '52',
      title: 'Desenvolvedor BCPL',
      company: 'MAN',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 6.500 - R$ 8.500',
      description: 'Desenvolvimento de sistemas legados para MAN.',
      requirements: ['BCPL', 'Legacy Systems', 'Systems Programming', 'Performance'],
      benefits: ['Experiência MAN', 'Plano de saúde', 'Salário: R$ 6.500 - R$ 8.500'],
      postedDate: '05/07',
      deadline: '05/08',
      applied: false,
      remote: false
    },
    {
      id: '53',
      title: 'Desenvolvedor Algol',
      company: 'Iveco',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 6.000 - R$ 8.000',
      description: 'Desenvolvimento de sistemas algorítmicos para Iveco.',
      requirements: ['Algol', 'Algorithmic Programming', 'Structured Programming', 'Legacy'],
      benefits: ['Experiência Iveco', 'Plano de saúde', 'Salário: R$ 6.000 - R$ 8.000'],
      postedDate: '06/07',
      deadline: '06/08',
      applied: false,
      remote: false
    },
    {
      id: '54',
      title: 'Desenvolvedor PL/I',
      company: 'DAF',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.000 - R$ 9.000',
      description: 'Desenvolvimento de sistemas enterprise para DAF.',
      requirements: ['PL/I', 'Enterprise Systems', 'Mainframe', 'COBOL'],
      benefits: ['Experiência DAF', 'Plano de saúde', 'Salário: R$ 7.000 - R$ 9.000'],
      postedDate: '07/07',
      deadline: '07/08',
      applied: false,
      remote: false
    },
    {
      id: '55',
      title: 'Desenvolvedor APL',
      company: 'Renault',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 10.500',
      description: 'Desenvolvimento de sistemas de array para Renault.',
      requirements: ['APL', 'Array Programming', 'Mathematical Computing', 'Notation'],
      benefits: ['Experiência Renault', 'Plano de saúde', 'Salário: R$ 8.000 - R$ 10.500'],
      postedDate: '08/07',
      deadline: '08/08',
      applied: false,
      remote: false
    },
    {
      id: '56',
      title: 'Desenvolvedor J',
      company: 'Peugeot',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 7.500 - R$ 10.000',
      description: 'Desenvolvimento de sistemas de programação de array para Peugeot.',
      requirements: ['J', 'Array Programming', 'Tacit Programming', 'Functional'],
      benefits: ['Experiência Peugeot', 'Plano de saúde', 'Salário: R$ 7.500 - R$ 10.000'],
      postedDate: '09/07',
      deadline: '09/08',
      applied: false,
      remote: false
    }
  ])

  useEffect(() => {
    // Load applied jobs from localStorage
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobIds') || '[]')
    setJobs(prev => prev.map(job => ({
      ...job,
      applied: appliedJobs.includes(job.id)
    })))
  }, [])

  const filteredJobs = jobs.filter(job => {
    const matchesTab = (activeTab === 'presencial' && job.location !== 'Remoto') ||
                    (activeTab === 'homeoffice' && job.remote) ||
                    (activeTab === 'applied' && job.applied)
    
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  const handleApply = (job: Job) => {
    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  const handleSkillToggle = (skill: string) => {
    setApplicationData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const submitApplication = () => {
    if (selectedJob) {
      // Update job as applied
      const updatedJobs = jobs.map(job => 
        job.id === selectedJob.id ? { ...job, applied: true } : job
      )
      setJobs(updatedJobs)
      
      // Save to localStorage
      const appliedJobIds = updatedJobs.filter(j => j.applied).map(j => j.id)
      localStorage.setItem('appliedJobIds', JSON.stringify(appliedJobIds))
      
      // Update dashboard stats
      const currentStats = JSON.parse(localStorage.getItem('dashboardStats') || '{}')
      const updatedStats = {
        ...currentStats,
        appliedJobs: appliedJobIds.length
      }
      localStorage.setItem('dashboardStats', JSON.stringify(updatedStats))
      
      setShowApplicationModal(false)
      setSelectedJob(null)
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        skills: [],
        hasExperience: ''
      })
      
      alert('Candidatura enviada com sucesso! 🎉')
    }
  }

  if (selectedJob && !showApplicationModal) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <motion.button
          onClick={() => setSelectedJob(null)}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar às vagas</span>
        </motion.button>

        {/* Job Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-black text-white mb-4 gradient-text-animated">
                {selectedJob.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold">{selectedJob.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{selectedJob.salary}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="px-4 py-2 bg-gradient-primary rounded-xl text-white font-semibold text-center">
                {selectedJob.type}
              </span>
              {selectedJob.remote && (
                <span className="px-4 py-2 bg-gradient-green rounded-xl text-white font-semibold text-center">
                  Remoto
                </span>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Briefcase className="w-6 h-6 text-purple-400" />
                  <span>Descrição da Vaga</span>
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {selectedJob.description}
                </p>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span>Requisitos</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedJob.requirements.map((req, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-primary rounded-xl text-white font-semibold"
                    >
                      {req}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-green-400" />
                  <span>Benefícios</span>
                </h3>
                <ul className="space-y-3">
                  {selectedJob.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-lg">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* Job Info */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="font-bold text-white mb-4 text-xl">Informações da Vaga</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Publicado em:</span>
                    <span className="font-semibold text-white">{selectedJob.postedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Prazo até:</span>
                    <span className="font-semibold text-white">{selectedJob.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tipo:</span>
                    <span className="font-semibold text-white">{selectedJob.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Modalidade:</span>
                    <span className="font-semibold text-white">
                      {selectedJob.remote ? 'Remoto' : 'Presencial'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {selectedJob.applied ? (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-green-500/20 border border-green-500/50 rounded-2xl p-6 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-green-300 font-bold text-lg">
                      Você se candidatou para esta vaga
                    </p>
                    <p className="text-green-400 text-sm mt-2">
                      Acompanhe o status da sua candidatura
                    </p>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={() => handleApply(selectedJob)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-primary text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-lg transition-all"
                  >
                    <Send className="w-6 h-6" />
                    <span>Candidatar-se</span>
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/10 text-white py-4 px-6 rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center space-x-3"
                >
                  <Bookmark className="w-6 h-6" />
                  <span>Salvar Vaga</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      <button onClick={() => window.location.href = '/dashboard'} className="mb-4 px-4 py-2 rounded bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold">Voltar Para Área do Aluno</button>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Vagas de <span className="gradient-text-animated">Emprego</span>
          </h1>
          <p className="text-gray-400 text-lg">Encontre sua próxima oportunidade de carreira</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Briefcase className="w-5 h-5" />
          <span>{filteredJobs.length} vagas encontradas</span>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar vagas por título ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-2 bg-black/40 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
          {[
            { key: 'presencial', label: 'Presencial', count: jobs.filter(j => j.location !== 'Remoto').length },
            { key: 'homeoffice', label: 'Home Office', count: jobs.filter(j => j.remote).length },
            { key: 'applied', label: 'Aplicadas', count: jobs.filter(j => j.applied).length }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                activeTab === tab.key
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.key ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Jobs List */}
      <div className="space-y-6 w-full">
        <AnimatePresence>
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      {job.title}
                    </h3>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-gradient-primary rounded-full text-white text-sm font-semibold">
                        {job.type}
                      </span>
                      {job.remote && (
                        <span className="px-3 py-1 bg-gradient-green rounded-full text-white text-sm font-semibold">
                          Remoto
                        </span>
                      )}
                      {job.applied && (
                        <span className="px-3 py-1 bg-gradient-secondary rounded-full text-white text-sm font-semibold">
                          Aplicado
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-4">
                    <div className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold">{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold">{job.salary}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 line-clamp-2 text-lg leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Publicado em {job.postedDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Prazo até {job.deadline}</span>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-gradient-primary rounded-lg"
                    >
                      <ArrowLeft className="w-5 h-5 text-white rotate-180" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/90 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Candidatar-se para: {selectedJob.title}
                  </h3>
                  <p className="text-gray-400">{selectedJob.company}</p>
                </div>
                <motion.button
                  onClick={() => setShowApplicationModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={applicationData.name}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Habilidades que você possui (marque as que se aplicam)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedJob.requirements.map((req, index) => (
                      <motion.label
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          applicationData.skills.includes(req)
                            ? 'bg-gradient-primary border-purple-500 text-white'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={applicationData.skills.includes(req)}
                          onChange={() => handleSkillToggle(req)}
                          className="hidden"
                        />
                        <CheckCircle className={`w-5 h-5 ${
                          applicationData.skills.includes(req) ? 'text-white' : 'text-gray-500'
                        }`} />
                        <span className="font-medium">{req}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Você tem experiência na área?
                  </label>
                  <div className="flex space-x-4">
                    {['Sim', 'Não'].map((option) => (
                      <motion.label
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          applicationData.hasExperience === option
                            ? 'bg-gradient-primary border-purple-500 text-white'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name="experience"
                          value={option}
                          checked={applicationData.hasExperience === option}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, hasExperience: e.target.value }))}
                          className="hidden"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          applicationData.hasExperience === option
                            ? 'border-white bg-white'
                            : 'border-gray-400'
                        }`} />
                        <span className="font-medium">{option}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Currículo (PDF ou Word)
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-white/50 transition-colors cursor-pointer"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white font-semibold mb-2">
                      Clique para fazer upload ou arraste seu arquivo aqui
                    </p>
                    <p className="text-gray-400 text-sm">
                      Formatos aceitos: PDF, DOC, DOCX (máx. 5MB)
                    </p>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                  </motion.div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <motion.button
                    type="button"
                    onClick={() => setShowApplicationModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-4 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-colors font-semibold"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={submitApplication}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-primary text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Enviar Candidatura
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}