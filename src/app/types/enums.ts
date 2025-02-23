// enums.ts
export enum BudgetRange {
    '1000-5000' = '$1,000 - $5,000',
    '5000-10000' = '$5,000 - $10,000',
    '10000+' = '$10,000+'
}

export enum Timeline {
    '1_week' = '1 Week',
    '2_weeks' = '2 Weeks',
    '1_month' = '1 Month',
    '2_months' = '2 Months',
    '3_months' = '3 Months',
}

export enum RequestFields {
    ProjectTitle = 'Project Title',
    ProjectDescription = 'Project Description',
    BudgetRange = 'Budget Range',
    Timeline = 'Timeline',
}

// Frontend Languages
export enum FrontendLanguages {
    javascript = 'JavaScript',
    typescript = 'TypeScript',
}

// Frontend Frameworks
export enum FrontendFrameworks {
    react = 'React',
    angular = 'Angular',
    vue = 'Vue',
    svelte = 'Svelte',
    ember = 'Ember',
    next = 'Next.js',
    nuxt = 'Nuxt.js',
    jquery = 'jQuery',
    backbone = 'Backbone.js',
    bootstrap = 'Bootstrap',
    tailwind = 'TailwindCSS',
    material = 'Material-UI',
    bulma = 'Bulma',
}

// Backend Languages
export enum BackendLanguages {
    nodejs = 'Node.js',
    javascript = 'JavaScript',
    python = 'Python',
    ruby = 'Ruby',
    java = 'Java',
    csharp = 'C#',
    php = 'PHP',
    go = 'Go',
    rust = 'Rust',
    kotlin = 'Kotlin',
    scala = 'Scala',
    dart = 'Dart',
    elixir = 'Elixir',
    swift = 'Swift',
}

// Backend Frameworks
export enum BackendFrameworks {
    express = 'Express.js',
    nest = 'NestJS',
    django = 'Django',
    flask = 'Flask',
    rails = 'Ruby on Rails',
    spring = 'Spring',
    dotnet = 'ASP.NET',
    laravel = 'Laravel',
    symfony = 'Symfony',
    gin = 'Gin',
    hapi = 'Hapi.js',
    fastapi = 'FastAPI',
    graphql = 'Express-GraphQL',
}

// AI Languages
export enum AILanguages {
    python = 'Python',
    r = 'R',
    julia = 'Julia',
    cpp = 'C++',
    java = 'Java',
    javascript = 'JavaScript',
    lisp = 'Lisp',
}

// AI Frameworks
export enum AIFrameworks {
    tensorflow = 'TensorFlow',
    pytorch = 'PyTorch',
    keras = 'Keras',
    scikit = 'Scikit-Learn',
    opencv = 'OpenCV',
    nltk = 'NLTK',
    spacy = 'spaCy',
    caffe = 'Caffe',
    mxnet = 'MXNet',
    huggingface = 'Hugging Face',
}

// Academic Writing Types
export enum AcademicWritingTypes {
    research_paper = 'Research Paper',
    thesis = 'Thesis',
    dissertation = 'Dissertation',
    essay = 'Essay',
    literature_review = 'Literature Review',
    case_study = 'Case Study',
    report = 'Report',
    proposal = 'Proposal',
    review_article = 'Review Article',
    white_paper = 'White Paper',
    editorial = 'Editorial',
    opinion_piece = 'Opinion Piece',
    abstract = 'Abstract',
    book_chapter = 'Book Chapter',
    conference_paper = 'Conference Paper',
    journal_article = 'Journal Article',
    critical_review = 'Critical Review',
}

// Writing Techniques
export enum WritingTechniques {
    persuasive = 'Persuasive',
    descriptive = 'Descriptive',
    narrative = 'Narrative',
    expository = 'Expository',
    analytical = 'Analytical',
    critical = 'Critical',
    argumentative = 'Argumentative',
    comparative = 'Comparative',
    cause_and_effect = 'Cause and Effect',
    problem_solution = 'Problem-Solution',
}

// Research Paper Structure
export enum ResearchPaperStructure {
    introduction = 'Introduction',
    literature_review = 'Literature Review',
    methodology = 'Methodology',
    results = 'Results',
    discussion = 'Discussion',
    conclusion = 'Conclusion',
    abstract = 'Abstract',
    references = 'References',
    appendices = 'Appendices',
}

// Academic Writing Styles
export enum AcademicWritingStyles {
    apa = 'APA',
    mla = 'MLA',
    chicago = 'Chicago',
    harvard = 'Harvard',
    vancouver = 'Vancouver',
    turabian = 'Turabian',
    ieee = 'IEEE',
    acs = 'ACS',
    ama = 'AMA',
    asa = 'ASA',
    bluebook = 'Bluebook',
}

// Research Paper Writing Process
export enum ResearchPaperWritingProcess {
    topic_selection = 'Topic Selection',
    research = 'Research',
    writing = 'Writing',
    editing = 'Editing',
    proofreading = 'Proofreading',
    submission = 'Submission',
    review = 'Review',
    publication = 'Publication',
}

// Critical Writing Types
export enum CriticalWritingTypes {
    literary_analysis = 'Literary Analysis',
    film_criticism = 'Film Criticism',
    art_criticism = 'Art Criticism',
    rhetorical_analysis = 'Rhetorical Analysis',
    policy_analysis = 'Policy Analysis',
    research_review = 'Research Review',
}

// Critical Thinking Skills
export enum CriticalThinkingSkills {
    problem_solving = 'Problem Solving',
    logical_reasoning = 'Logical Reasoning',
    analytical_thinking = 'Analytical Thinking',
    decision_making = 'Decision Making',
    evaluating_arguments = 'Evaluating Arguments',
    identifying_bias = 'Identifying Bias',
    drawing_conclusions = 'Drawing Conclusions',
    making_connections = 'Making Connections',
}

// Critical Writing Structure
export enum CriticalWritingStructure {
    introduction = 'Introduction',
    argumentation = 'Argumentation',
    analysis = 'Analysis',
    evaluation = 'Evaluation',
    conclusion = 'Conclusion',
}

// Discussion Types
export enum DiscussionTypes {
    debate = 'Debate',
    panel_discussion = 'Panel Discussion',
    round_table = 'Round Table',
    symposium = 'Symposium',
    qanda = 'Q&A',
    forum = 'Forum',
    interview = 'Interview',
}

// Discussion Components
export enum DiscussionComponents {
    opening_statement = 'Opening Statement',
    argument = 'Argument',
    counter_argument = 'Counter-Argument',
    rebuttal = 'Rebuttal',
    closing_statement = 'Closing Statement',
    audience_questions = 'Audience Questions',
    moderator = 'Moderator',
}

// Academic Writing Tools
export enum AcademicWritingTools {
    zotero = 'Zotero',
    endnote = 'EndNote',
    mendeley = 'Mendeley',
    refworks = 'RefWorks',
    grammarly = 'Grammarly',
    scrivener = 'Scrivener',
    hemingway = 'Hemingway Editor',
    prowritingaid = 'ProWritingAid',
}

// Research Paper Databases
export enum ResearchPaperDatabases {
    google_scholar = 'Google Scholar',
    jstor = 'JSTOR',
    pubmed = 'PubMed',
    science_direct = 'ScienceDirect',
    springer = 'Springer',
    wiley = 'Wiley Online Library',
    ieee = 'IEEE Xplore',
    eric = 'ERIC',
    scopus = 'Scopus',
    researchgate = 'ResearchGate',
}

// Plagiarism Checkers
export enum PlagiarismCheckers {
    turnitin = 'Turnitin',
    copyscape = 'Copyscape',
    grammarly = 'Grammarly',
    plagscan = 'Plagscan',
    quetext = 'Quetext',
    plagiarism_checker = 'Plagiarism Checker',
    unicheck = 'Unicheck',
    small_seo_tools = 'Small SEO Tools',
    duplichecker = 'Duplichecker',
}

// Reference Management Tools
export enum ReferenceManagementTools {
    zotero = 'Zotero',
    endnote = 'EndNote',
    mendeley = 'Mendeley',
    refworks = 'RefWorks',
    citavi = 'Citavi',
    paperpile = 'Paperpile',
    jabref = 'JabRef',
}

// Academic Discussion Types
export enum AcademicDiscussionTypes {
    formal = 'Formal',
    informal = 'Informal',
    panel = 'Panel',
    symposium = 'Symposium',
    workshop = 'Workshop',
}

// Citation Styles
export enum CitationStyles {
    apa = 'APA',
    mla = 'MLA',
    chicago = 'Chicago',
    harvard = 'Harvard',
    ieee = 'IEEE',
    ama = 'AMA',
    turabian = 'Turabian',
    vancouver = 'Vancouver',
    acs = 'ACS',
}

export enum StudyLevel {
    HighSchool = 'High School',
    Undergraduate = 'Undergraduate',
    Masters = 'Masters',
    PhD = 'PhD',
    Doctoral = 'Doctoral'
}
  