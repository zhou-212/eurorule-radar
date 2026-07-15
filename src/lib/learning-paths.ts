export interface LearnStep {
  id: string;
  title: string;
  href: string;
  estMinutes: number;
  desc: string;
  isOptional?: boolean;
}

export interface LearnPath {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  audience: string;
  estTotalMinutes: number;
  whyItMatters: string;
  steps: LearnStep[];
  finalReward: string;
}

export function buildLearningPaths(): LearnPath[] {
  return [
    {
      slug: 'start-90-days',
      title: '新手起步(0-90 天)',
      subtitle: '从注册账号到首单出单,90 天走完基本合规',
      icon: '🌱',
      audience: '第一次做亚马逊欧洲站的卖家',
      estTotalMinutes: 90,
      whyItMatters:
        '90 天内把账号、税务、合规、首批货这四件事跑通,后面才有得玩。亚马逊欧洲站 80% 的新手问题都集中在前 3 个月 —— 错过这个窗口,补起来要花 3 倍时间。',
      finalReward: '账号能开张 + 基础合规齐 + 首批货上架',
      steps: [
        {
          id: 'start-90-days-01',
          title: '90 天路线图总览',
          href: '/guide/seller-90days',
          estMinutes: 15,
          desc: '先看清整个 90 天的任务地图,知道每个阶段该做啥。',
        },
        {
          id: 'start-90-days-02',
          title: '选第一站(德国优先)',
          href: '/guide/pick-first-country',
          estMinutes: 12,
          desc: '新手第一站选德国 —— 流程最标准,资源最齐全。',
        },
        {
          id: 'start-90-days-03',
          title: '选发货方式',
          href: '/guide/fba-vs-fbm',
          estMinutes: 12,
          desc: 'FBA 还是 FBM?看品类、预算和品类生命周期再选。',
        },
        {
          id: 'start-90-days-04',
          title: '收到 GPSR 邮件怎么回',
          href: '/guide/amazon-gpsr-email',
          estMinutes: 12,
          desc: '亚马逊的 GPSR 邮件有固定回复模板,照着填就行。',
        },
        {
          id: 'start-90-days-05',
          title: 'CE 标志基础',
          href: '/guide/ce-marking',
          estMinutes: 15,
          desc: '欧盟非食品消费品都跑不掉 CE,先认标志和含义。',
        },
        {
          id: 'start-90-days-06',
          title: '30 天必做清单',
          href: '/checklists/first-30-days-survival',
          estMinutes: 24,
          desc: '把前 30 天零散任务集中打勾,避免漏项。',
        },
      ],
    },
    {
      slug: 'tax-filing',
      title: '税务与申报',
      subtitle: 'VAT / IOSS / OSS 三条路,1 张表说清怎么选',
      icon: '💰',
      audience: 'FBA 卖家 + 跨境直邮卖家',
      estTotalMinutes: 60,
      whyItMatters:
        '欧盟跨境 B2C 销售税是新手最容易踩雷的一块 —— 没注册就销售直接封号,选错申报方式多花 5-10 倍费用。这条路把"该不该注册 / 注册哪个 / 怎么报"三个问题一次说清。',
      finalReward: 'VAT/IOSS 选型 + 申报流程清晰 + 不会因税务问题被海关扣货',
      steps: [
        {
          id: 'tax-filing-01',
          title: 'VAT vs IOSS 速查',
          href: '/compare/vat-vs-ioss',
          estMinutes: 10,
          desc: 'FBA 走 VAT,直邮小额走 IOSS,一张表分清。',
        },
        {
          id: 'tax-filing-02',
          title: 'IOSS 镜像(从 FBA 切换视角)',
          href: '/compare/ioss-vs-vat',
          estMinutes: 8,
          desc: '从 FBA 切换到 FBM 直邮,看 IOSS 怎么接住税务。',
        },
        {
          id: 'tax-filing-03',
          title: 'OSS vs VAT',
          href: '/compare/oss-vs-vat',
          estMinutes: 10,
          desc: 'OSS 是欧盟一站申报的捷径,看清楚边界在哪。',
        },
        {
          id: 'tax-filing-04',
          title: 'VAT 注册流程',
          href: '/guide/vat-registration',
          estMinutes: 12,
          desc: 'VAT 怎么注册?要哪些资料?找代理还是自己办?',
        },
        {
          id: 'tax-filing-05',
          title: '完整 IOSS / VAT 法规细节',
          href: '/radar/eu-ioss-vat',
          estMinutes: 12,
          desc: '法条原文级别的细节,看边界和豁免条款。',
        },
        {
          id: 'tax-filing-06',
          title: '上架前税务资料',
          href: '/checklists/pre-listing-documents',
          estMinutes: 8,
          desc: 'listing 之前把税号、申报主体、资料包准备好。',
        },
      ],
    },
    {
      slug: 'product-safety',
      title: '产品安全(GPSR / CE / CRA)',
      subtitle: '从 CE 标志到 CRA 网络安全,5 步把产品合规做齐',
      icon: '🛡️',
      audience: '非食品消费品卖家 + 联网产品卖家',
      estTotalMinutes: 80,
      whyItMatters:
        '欧盟对非食品消费品的"产品安全"是 2024-2027 间变化最快的领域 —— GPSR 已生效、CRA 2027 全面执行、CE 标志要持续更新。错过任何一项 = listing 下架。',
      finalReward: 'CE 标志 + 欧代 + DoC + CRA SBOM 全齐',
      steps: [
        {
          id: 'product-safety-01',
          title: 'CE vs UKCA 速查',
          href: '/compare/ce-vs-ukca',
          estMinutes: 10,
          desc: '英国脱欧后是 UKCA,欧盟还是 CE,别贴错。',
        },
        {
          id: 'product-safety-02',
          title: 'CE 标志基础',
          href: '/guide/ce-marking',
          estMinutes: 15,
          desc: 'CE 不只是贴个标志,要 DoC、测试报告、欧代三件套。',
        },
        {
          id: 'product-safety-03',
          title: 'DoC 怎么写',
          href: '/guide/compliance-declaration',
          estMinutes: 15,
          desc: '合规声明(DoC)是 CE 的灵魂文档,字段有规范。',
        },
        {
          id: 'product-safety-04',
          title: 'GPSR + 欧代',
          href: '/radar/eu-gpsr-responsible-person',
          estMinutes: 15,
          desc: 'GPSR 强制要求欧代信息出现在包装上,别漏。',
        },
        {
          id: 'product-safety-05',
          title: 'CRA 网络弹性法案',
          href: '/radar/eu-cra-2024-2847',
          estMinutes: 15,
          desc: '2027 联网产品都要 SBOM 和漏洞披露,现在就要准备。',
        },
        {
          id: 'product-safety-06',
          title: 'CRA vs RED 怎么共存',
          href: '/compare/cra-vs-red',
          estMinutes: 10,
          desc: 'CRA 来了 RED 没走,无线产品两个都要兼顾。',
        },
      ],
    },
    {
      slug: 'packaging-environment',
      title: '包装与环保',
      subtitle: '从 LUCID 到电池护照,德国 LUCID + 法国 EPR + PPWR 一次性说清',
      icon: '♻️',
      audience: '所有带包装的卖家 + 含电池商品卖家',
      estTotalMinutes: 70,
      whyItMatters:
        '欧盟"卖完之后怎么处理"的法规正在密集出台 —— PPWR 2026 全面执行、Batteries 2025 已生效、DE LUCID / FR Citeo 各国独立。包装 / 电池没做 = FBA 库存停运。',
      finalReward: 'LUCID / Citeo 注册齐 + 包装检测齐 + 电池护照准备齐',
      steps: [
        {
          id: 'packaging-environment-01',
          title: 'LUCID vs FR EPR',
          href: '/compare/de-lucid-vs-france-epr',
          estMinutes: 10,
          desc: '德国 LUCID 和法国 EPR 是两套独立注册,别混。',
        },
        {
          id: 'packaging-environment-02',
          title: '德国包装避坑',
          href: '/guide/german-packaging-pitfalls',
          estMinutes: 10,
          desc: '德国 LUCID 注册最严,常见坑点都列在这里。',
        },
        {
          id: 'packaging-environment-03',
          title: '德国 LUCID 完整法规',
          href: '/radar/de-lucid-packaging',
          estMinutes: 12,
          desc: 'LUCID 法规原文 + 申报细节,看边界和处罚条款。',
        },
        {
          id: 'packaging-environment-04',
          title: 'PPWR 包装法',
          href: '/radar/eu-ppwr-2025-40',
          estMinutes: 14,
          desc: '2026 PPWR 全面执行,新限制和回收目标一次看。',
        },
        {
          id: 'packaging-environment-05',
          title: '电池法规',
          href: '/radar/eu-batteries-regulation-2023-1542',
          estMinutes: 14,
          desc: '2025 电池法规已生效,电池护照要进采购清单。',
        },
        {
          id: 'packaging-environment-06',
          title: 'PPWR vs Batteries 怎么共存',
          href: '/compare/ppwr-vs-batteries',
          estMinutes: 10,
          desc: '带电池的包装要同时满足两条法规,看优先级。',
        },
      ],
    },
    {
      slug: 'operations-compliance',
      title: '运营合规(广告 / 评论 / 警告信)',
      subtitle: '5 类警告信应对 + 广告合规词 + 评论合规',
      icon: '⚙️',
      audience: '已开张要稳定出单的卖家',
      estTotalMinutes: 50,
      whyItMatters:
        '亚马逊欧洲站封号 80% 来自"运营违规" —— 操纵评论、滥用变体、刷单、违规广告词。2024-2025 亚马逊欧洲站合规审核升级,新手不知道边界很容易中招。',
      finalReward: '警告信能应对 + 广告投放不踩雷 + 评价合规积累',
      steps: [
        {
          id: 'operations-compliance-01',
          title: '收到警告信怎么办',
          href: '/guide/amazon-warning-email',
          estMinutes: 10,
          desc: '警告信分 5 类,先识别类型再走申诉流程。',
        },
        {
          id: 'operations-compliance-02',
          title: '广告合规词',
          href: '/guide/amazon-ads-rules',
          estMinutes: 10,
          desc: 'SP/BV 广告词有禁用清单,投之前要扫一遍。',
        },
        {
          id: 'operations-compliance-03',
          title: '评论合规',
          href: '/guide/review-compliance',
          estMinutes: 10,
          desc: '操纵评论、刷单、返现都是红线,合规积累要做。',
        },
        {
          id: 'operations-compliance-04',
          title: '选品避坑',
          href: '/guide/product-pitfalls',
          estMinutes: 10,
          desc: '高风险品类(医疗、电池、儿童)选之前要清醒。',
        },
        {
          id: 'operations-compliance-05',
          title: '范例: CE 声明样本',
          href: '/radar/example-ce-declaration',
          estMinutes: 10,
          desc: 'CE 声明不知道长啥样?看一个完整样本。',
        },
      ],
    },
  ];
}
