const canvas = document.getElementById("signal-field");
const context = canvas.getContext("2d");
const particles = [];
const languageToggle = document.querySelector("[data-language-toggle]");
let width = 0;
let height = 0;
let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

const translations = {
  zh: {
    meta: {
      title: "蔡新旺 | HR × Data × AI",
      description: "蔡新旺的个人介绍网页：组织发展、人力资源数字化、人才发展与跨文化 HR 实践。",
    },
    common: {
      name: "蔡新旺",
    },
    nav: {
      aria: "页面导航",
      backTop: "返回顶部",
      profile: "个人画像",
      experience: "经历",
      education: "教育",
      capabilities: "能力矩阵",
      life: "生活",
      certifications: "证书",
      contact: "联系",
      langPrimary: "EN",
      langSecondary: "中文",
    },
    hero: {
      eyebrow: "Human Resources · FinTech Mindset · AI Enablement",
      title: "把组织、人才与数据连接成可执行的增长系统。",
      lead: "我是蔡新旺，拥有 4 年以上人力资源与组织发展经验，关注组织设计、人才梯队、员工关系与 HR 数字化。具备保险、地产、科研机构等多行业组织经验，也熟悉金融行业基础逻辑，擅长把制度、流程、数据看板和 AI 工具结合起来，让人力资源工作更清晰、更高效、更贴近业务。",
      contact: "联系我",
      experience: "查看经历",
    },
    profile: {
      label: "Profile",
      title: "组织发展与数字化 HR 实践者",
      avatarAlt: "蔡新旺头像",
    },
    metrics: {
      hr: "年 HR / OD 经验",
      research: "硕博与科研人才服务经验",
      languages: "英语 / 日语 / 泰语能力",
      tools: "LLM、BI、VBA 工具应用",
    },
    positioning: {
      eyebrow: "Positioning",
      title: "面向 AI 时代的人力资源能力组合",
      items: [
        {
          chip: "组织设计",
          title: "从架构到编制",
          body: "参与组织变革、部门职责梳理、定岗定员与职务职级体系建设，能把组织问题拆成可落地的管理动作。",
        },
        {
          chip: "人才发展",
          title: "从岗位到梯队",
          body: "梳理任职资格、关键岗位与人才画像，搭建专业与管理双通道，支持干部管理、评价配置和人才盘点。",
        },
        {
          chip: "科技金融",
          title: "从数据到决策",
          body: "熟悉 Power BI、Office、SQL、SPSS，能建设人力资源看板、理解金融业务语境，并用 AI 工具提升事务效率。",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "职业经历",
      items: [
        {
          time: "2026.01 - 至今",
          title: "大家财产保险总公司 · 组织发展主管",
          location: "地点：北京，中国",
          body: "负责总分公司组织架构优化方案落地、组织研究与调研、部门职责和处室梳理，以及年度编制核算、定岗定员和编制管理。",
        },
        {
          time: "2023.01 - 2026.01",
          title: "季华实验室 · 组织与人才发展专员",
          location: "地点：佛山，广东，中国",
          body: "服务省级新型研发机构，覆盖先进制造、半导体设备、新型显示设备与新材料等方向。负责职务职级、职称体系、干部管理、人才引进、员工关系与 HR 数字化需求建设。",
        },
        {
          time: "2021.12 - 2022.08",
          title: "远洋集团总部 · 组织发展专员",
          location: "地点：北京，中国",
          body: "参与集团组织诊断、人才画像、任免调配、梯队选拔、数据采集分析与 OD 流程线上化，支持组织优化和人力配置决策。",
        },
      ],
    },
    education: {
      eyebrow: "Education",
      title: "教育背景",
      items: [
        {
          time: "2015.09 - 2019.06",
          title: "华中科技大学（985）",
          location: "地点：武汉，湖北，中国",
          degree: "工商管理（人力资源方向） · 管理学学士",
          body: "主要课程覆盖组织行为学、劳动法与劳动关系、应用心理学、组织设计与工作分析、绩效考核与管理等。",
        },
        {
          time: "2019.10 - 2021.09",
          title: "日本东北大学",
          location: "地点：仙台，宫城县，日本",
          degree: "经济管理学（工商管理） · 管理学硕士",
          body: "硕士方向聚焦跨文化人力资源管理，为海外人力、跨文化协作和多语言工作场景打下基础。",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "能力矩阵",
      groups: [
        {
          title: "专业能力",
          items: [
            "组织发展、组织诊断与组织架构优化",
            "职务职级、职称、任职资格与岗位体系",
            "干部管理、人才盘点、梯队建设与培训运营",
            "员工关系、劳动合同、入离调转与制度流程",
          ],
        },
        {
          title: "数字工具",
          items: [
            "Office、Power BI、数据可视化与报表建设",
            "VBA、SQL、SPSS 与流程自动化小工具",
            "LLM 大模型、AI Coding 与知识管理探索",
            "信息化需求梳理、需求文档与跨部门协作",
          ],
        },
        {
          title: "语言与资质",
          items: [
            "英语 CET-6，日语 N2，可作为工作语言",
            "泰语基础，具备持续学习小语种的兴趣",
            "硕士方向：跨文化人力资源管理",
            "人力资源管理师（中级）",
            "证券从业资格证、基金从业资格证",
          ],
        },
      ],
    },
    life: {
      eyebrow: "Life Notes",
      title: "工作之外，也在认真生活。",
      items: [
        {
          chip: "城市经验",
          title: "成都出发，武汉、仙台、北京与佛山之间移动",
          body: "来自四川成都，求学与工作经历横跨华中、日本东北地区、京津冀与粤港澳大湾区，习惯在不同城市文化中快速建立连接。",
        },
        {
          chip: "长期兴趣",
          title: "语言、跨文化与新技术",
          body: "保持英语、日语和泰语学习，也持续探索 AI 工具、知识管理和个人效率系统，希望让工作方法更轻、更可复制。",
        },
        {
          chip: "生活状态",
          title: "开放、稳定，也愿意走近业务现场",
          body: "喜欢把复杂事情整理成清晰结构，工作之外关注城市观察、阅读、运动和旅行，在真实场景里理解人和组织。",
        },
      ],
    },
    certifications: {
      eyebrow: "Certifications",
      title: "资格证书",
      items: [
        {
          type: "专业技术资格",
          title: "人力资源管理师（中级）",
          body: "覆盖组织管理、员工关系、薪酬绩效、人才发展等专业场景，强化 HR 政策设计、流程治理和合规判断能力。",
        },
        {
          type: "金融从业资格",
          title: "证券从业资格证",
          body: "具备金融市场、证券业务与监管基础认知，能更快理解保险、资管、金融科技等组织里的业务语言。",
        },
        {
          type: "金融从业资格",
          title: "基金从业资格证",
          body: "补充资产管理、产品逻辑与合规框架理解，适合支持金融机构中复合型人才画像与岗位能力建模。",
        },
      ],
    },
    insight: {
      eyebrow: "Industry Lens",
      title: "行业趋势视角",
      body: "全球人力资源趋势正在从单纯流程效率，转向“人机协作、组织能力重构和人才价值释放”。这与我的实践兴趣高度一致：用数据识别问题，用制度稳定运行，用 AI 和自动化释放 HR 的战略时间。",
    },
    contact: {
      title: "期待连接组织、人才与技术的下一站。",
      hometown: "籍贯：四川成都",
      birthday: "出生日期：1997.01.11",
    },
  },
  en: {
    meta: {
      title: "Xinwang Cai | HR × Data × AI",
      description: "Personal profile of Xinwang Cai: organization development, digital HR, talent development, and cross-cultural HR practice.",
    },
    common: {
      name: "Xinwang Cai",
    },
    nav: {
      aria: "Page navigation",
      backTop: "Back to top",
      profile: "Profile",
      experience: "Experience",
      education: "Education",
      capabilities: "Capabilities",
      life: "Life",
      certifications: "Certificates",
      contact: "Contact",
      langPrimary: "中",
      langSecondary: "English",
    },
    hero: {
      eyebrow: "Human Resources · FinTech Mindset · AI Enablement",
      title: "Connecting organization, talent, and data into an executable growth system.",
      lead: "I am Xinwang Cai, an HR and organization development practitioner with 4+ years of experience across insurance, real estate, and research institutions. My work focuses on organization design, talent pipelines, employee relations, and digital HR. I combine policies, processes, dashboards, and AI tools to make HR work clearer, faster, and closer to business needs.",
      contact: "Contact Me",
      experience: "View Experience",
    },
    profile: {
      label: "Profile",
      title: "Organization Development and Digital HR Practitioner",
      avatarAlt: "Portrait of Xinwang Cai",
    },
    metrics: {
      hr: "years in HR / OD",
      research: "postgraduate and research talent service experience",
      languages: "English / Japanese / Thai capability",
      tools: "LLM, BI, and VBA tool practice",
    },
    positioning: {
      eyebrow: "Positioning",
      title: "A human resources capability mix for the AI era",
      items: [
        {
          chip: "Organization Design",
          title: "From structure to headcount",
          body: "Experienced in organization change, responsibility mapping, position planning, staffing standards, and job-grade systems, translating organizational issues into executable management actions.",
        },
        {
          chip: "Talent Development",
          title: "From roles to pipelines",
          body: "Builds qualification models, key-role profiles, and dual career paths to support cadre management, talent review, evaluation, and placement.",
        },
        {
          chip: "Tech + Finance",
          title: "From data to decisions",
          body: "Comfortable with Power BI, Office, SQL, and SPSS; able to build HR dashboards, understand financial business contexts, and use AI tools to improve operational efficiency.",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional Experience",
      items: [
        {
          time: "Jan 2026 - Present",
          title: "Dajia Property & Casualty Insurance HQ · Organization Development Supervisor",
          location: "Location: Beijing, China",
          body: "Responsible for implementing organization-structure optimization across headquarters and branches, conducting organization research and surveys, clarifying department and office responsibilities, and managing annual headcount calculation, position planning, and staffing governance.",
        },
        {
          time: "Jan 2023 - Jan 2026",
          title: "Jihua Laboratory · Organization and Talent Development Specialist",
          location: "Location: Foshan, Guangdong, China",
          body: "Served a provincial new-type R&D institution across advanced manufacturing, semiconductor equipment, new display equipment, and new materials. Covered job-grade systems, professional titles, cadre management, talent acquisition, employee relations, and digital HR requirements.",
        },
        {
          time: "Dec 2021 - Aug 2022",
          title: "Sino-Ocean Group HQ · Organization Development Specialist",
          location: "Location: Beijing, China",
          body: "Participated in group-level organization diagnosis, talent profiling, appointment and allocation, pipeline selection, data collection and analysis, and online OD process development to support organization optimization and workforce decisions.",
        },
      ],
    },
    education: {
      eyebrow: "Education",
      title: "Education",
      items: [
        {
          time: "Sep 2015 - Jun 2019",
          title: "Huazhong University of Science and Technology (Project 985)",
          location: "Location: Wuhan, Hubei, China",
          degree: "B.B.A. in Business Administration, Human Resources Track",
          body: "Coursework included organizational behavior, labor law and labor relations, applied psychology, organization design, job analysis, and performance management.",
        },
        {
          time: "Oct 2019 - Sep 2021",
          title: "Tohoku University, Japan",
          location: "Location: Sendai, Miyagi, Japan",
          degree: "M.A. in Economics and Management, Business Administration",
          body: "Graduate research focused on cross-cultural human resource management, laying a foundation for global HR, multilingual collaboration, and cross-cultural work settings.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Capability Matrix",
      groups: [
        {
          title: "HR Expertise",
          items: [
            "Organization development, diagnosis, and structure optimization",
            "Job grades, professional titles, qualifications, and position systems",
            "Cadre management, talent review, pipeline building, and training operations",
            "Employee relations, contracts, transfers, exits, policies, and workflows",
          ],
        },
        {
          title: "Digital Tools",
          items: [
            "Office, Power BI, data visualization, and reporting",
            "VBA, SQL, SPSS, and lightweight workflow automation",
            "LLMs, AI coding, and knowledge-management exploration",
            "Digital requirements, documentation, and cross-functional collaboration",
          ],
        },
        {
          title: "Languages & Credentials",
          items: [
            "English CET-6 and Japanese JLPT N2, both usable in work settings",
            "Basic Thai, with sustained interest in learning additional languages",
            "Master's focus: cross-cultural human resource management",
            "Intermediate Human Resource Manager certificate",
            "Securities and Fund Practitioner qualifications",
          ],
        },
      ],
    },
    life: {
      eyebrow: "Life Notes",
      title: "A fuller picture beyond work.",
      items: [
        {
          chip: "City Footprint",
          title: "From Chengdu to Wuhan, Sendai, Beijing, and Foshan",
          body: "Originally from Chengdu, Sichuan, with study and work experiences across Central China, northeastern Japan, Beijing, and the Greater Bay Area. I enjoy learning how different cities shape people, teams, and work habits.",
        },
        {
          chip: "Long-Term Interests",
          title: "Languages, cross-cultural work, and new technology",
          body: "I keep learning English, Japanese, and Thai while exploring AI tools, knowledge management, and personal productivity systems to make work methods lighter and more repeatable.",
        },
        {
          chip: "Personal Rhythm",
          title: "Open, steady, and close to real business contexts",
          body: "I like turning complex things into clear structures. Outside work, I care about city observation, reading, exercise, and travel, using real settings to understand people and organizations.",
        },
      ],
    },
    certifications: {
      eyebrow: "Certifications",
      title: "Certifications",
      items: [
        {
          type: "Professional Qualification",
          title: "Intermediate Human Resource Manager",
          body: "Covers organization management, employee relations, compensation and performance, and talent development, strengthening HR policy design, process governance, and compliance judgment.",
        },
        {
          type: "Financial Qualification",
          title: "Securities Practitioner Qualification",
          body: "Provides foundational understanding of financial markets, securities businesses, and regulation, enabling faster communication in insurance, asset management, and fintech organizations.",
        },
        {
          type: "Financial Qualification",
          title: "Fund Practitioner Qualification",
          body: "Adds understanding of asset management, product logic, and compliance frameworks, useful for compound talent profiling and role capability modeling in financial institutions.",
        },
      ],
    },
    insight: {
      eyebrow: "Industry Lens",
      title: "Industry Lens",
      body: "Global HR is moving beyond process efficiency toward human-AI collaboration, organization capability renewal, and talent value release. This aligns closely with my own practice: use data to identify problems, systems to stabilize operations, and AI plus automation to free up strategic HR time.",
    },
    contact: {
      title: "Looking toward the next step where organization, talent, and technology meet.",
      hometown: "Hometown: Chengdu, Sichuan, China",
      birthday: "Date of birth: Jan 11, 1997",
    },
  },
};

function getTranslation(language, path) {
  return path.split(".").reduce((value, key) => value?.[key], translations[language]);
}

function applyLanguage(language) {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.body.dataset.language = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getTranslation(language, element.dataset.i18n);
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attribute, path] = pair.split(":");
      const value = getTranslation(language, path);
      if (attribute && typeof value === "string") {
        element.setAttribute(attribute, value);
      }
    });
  });

  localStorage.setItem("preferredLanguage", language);
}

const initialLanguage = localStorage.getItem("preferredLanguage") || "zh";
applyLanguage(initialLanguage);

languageToggle?.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "zh-CN" ? "en" : "zh";
  applyLanguage(nextLanguage);
});

function resize() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const target = Math.max(46, Math.min(92, Math.floor(width / 18)));
  particles.length = 0;
  for (let index = 0; index < target; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      size: 1 + Math.random() * 1.8,
      pulse: Math.random() * Math.PI * 2,
    });
  }
}

function draw() {
  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = "lighter";

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.pulse += 0.018;

    if (particle.x < -20) particle.x = width + 20;
    if (particle.x > width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = height + 20;
    if (particle.y > height + 20) particle.y = -20;

    const alpha = 0.32 + Math.sin(particle.pulse) * 0.16;
    context.beginPath();
    context.fillStyle = `rgba(87, 231, 255, ${alpha})`;
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();
  }

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance < 130) {
        context.strokeStyle = `rgba(87, 231, 255, ${(1 - distance / 130) * 0.16})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

resize();
draw();
window.addEventListener("resize", resize);
