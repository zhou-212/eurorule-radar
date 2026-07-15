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
          href: '/eu/guide/seller-90days',
          estMinutes: 15,
          desc: '先看清整个 90 天的任务地图,知道每个阶段该做啥。',
        },
        {
          id: 'start-90-days-02',
          title: '选第一站(德国优先)',
          href: '/eu/guide/pick-first-country',
          estMinutes: 12,
          desc: '新手第一站选德国 —— 流程最标准,资源最齐全。',
        },
        {
          id: 'start-90-days-03',
          title: '选发货方式',
          href: '/eu/guide/fba-vs-fbm',
          estMinutes: 12,
          desc: 'FBA 还是 FBM?看品类、预算和品类生命周期再选。',
        },
        {
          id: 'start-90-days-04',
          title: '收到 GPSR 邮件怎么回',
          href: '/eu/guide/amazon-gpsr-email',
          estMinutes: 12,
          desc: '亚马逊的 GPSR 邮件有固定回复模板,照着填就行。',
        },
        {
          id: 'start-90-days-05',
          title: 'CE 标志基础',
          href: '/eu/guide/ce-marking',
          estMinutes: 15,
          desc: '欧盟非食品消费品都跑不掉 CE,先认标志和含义。',
        },
        {
          id: 'start-90-days-06',
          title: '30 天必做清单',
          href: '/eu/checklists/first-30-days-survival',
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
          href: '/eu/compare/vat-vs-ioss',
          estMinutes: 10,
          desc: 'FBA 走 VAT,直邮小额走 IOSS,一张表分清。',
        },
        {
          id: 'tax-filing-02',
          title: 'IOSS 镜像(从 FBA 切换视角)',
          href: '/eu/compare/ioss-vs-vat',
          estMinutes: 8,
          desc: '从 FBA 切换到 FBM 直邮,看 IOSS 怎么接住税务。',
        },
        {
          id: 'tax-filing-03',
          title: 'OSS vs VAT',
          href: '/eu/compare/oss-vs-vat',
          estMinutes: 10,
          desc: 'OSS 是欧盟一站申报的捷径,看清楚边界在哪。',
        },
        {
          id: 'tax-filing-04',
          title: 'VAT 注册流程',
          href: '/eu/guide/vat-registration',
          estMinutes: 12,
          desc: 'VAT 怎么注册?要哪些资料?找代理还是自己办?',
        },
        {
          id: 'tax-filing-05',
          title: '完整 IOSS / VAT 法规细节',
          href: '/eu/radar/eu-ioss-vat',
          estMinutes: 12,
          desc: '法条原文级别的细节,看边界和豁免条款。',
        },
        {
          id: 'tax-filing-06',
          title: '上架前税务资料',
          href: '/eu/checklists/pre-listing-documents',
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
          href: '/eu/compare/ce-vs-ukca',
          estMinutes: 10,
          desc: '英国脱欧后是 UKCA,欧盟还是 CE,别贴错。',
        },
        {
          id: 'product-safety-02',
          title: 'CE 标志基础',
          href: '/eu/guide/ce-marking',
          estMinutes: 15,
          desc: 'CE 不只是贴个标志,要 DoC、测试报告、欧代三件套。',
        },
        {
          id: 'product-safety-03',
          title: 'DoC 怎么写',
          href: '/eu/guide/compliance-declaration',
          estMinutes: 15,
          desc: '合规声明(DoC)是 CE 的灵魂文档,字段有规范。',
        },
        {
          id: 'product-safety-04',
          title: 'GPSR + 欧代',
          href: '/eu/radar/eu-gpsr-responsible-person',
          estMinutes: 15,
          desc: 'GPSR 强制要求欧代信息出现在包装上,别漏。',
        },
        {
          id: 'product-safety-05',
          title: 'CRA 网络弹性法案',
          href: '/eu/radar/eu-cra-2024-2847',
          estMinutes: 15,
          desc: '2027 联网产品都要 SBOM 和漏洞披露,现在就要准备。',
        },
        {
          id: 'product-safety-06',
          title: 'CRA vs RED 怎么共存',
          href: '/eu/compare/cra-vs-red',
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
          href: '/eu/compare/de-lucid-vs-france-epr',
          estMinutes: 10,
          desc: '德国 LUCID 和法国 EPR 是两套独立注册,别混。',
        },
        {
          id: 'packaging-environment-02',
          title: '德国包装避坑',
          href: '/eu/guide/german-packaging-pitfalls',
          estMinutes: 10,
          desc: '德国 LUCID 注册最严,常见坑点都列在这里。',
        },
        {
          id: 'packaging-environment-03',
          title: '德国 LUCID 完整法规',
          href: '/eu/radar/de-lucid-packaging',
          estMinutes: 12,
          desc: 'LUCID 法规原文 + 申报细节,看边界和处罚条款。',
        },
        {
          id: 'packaging-environment-04',
          title: 'PPWR 包装法',
          href: '/eu/radar/eu-ppwr-2025-40',
          estMinutes: 14,
          desc: '2026 PPWR 全面执行,新限制和回收目标一次看。',
        },
        {
          id: 'packaging-environment-05',
          title: '电池法规',
          href: '/eu/radar/eu-batteries-regulation-2023-1542',
          estMinutes: 14,
          desc: '2025 电池法规已生效,电池护照要进采购清单。',
        },
        {
          id: 'packaging-environment-06',
          title: 'PPWR vs Batteries 怎么共存',
          href: '/eu/compare/ppwr-vs-batteries',
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
          href: '/eu/guide/amazon-warning-email',
          estMinutes: 10,
          desc: '警告信分 5 类,先识别类型再走申诉流程。',
        },
        {
          id: 'operations-compliance-02',
          title: '广告合规词',
          href: '/eu/guide/amazon-ads-rules',
          estMinutes: 10,
          desc: 'SP/BV 广告词有禁用清单,投之前要扫一遍。',
        },
        {
          id: 'operations-compliance-03',
          title: '评论合规',
          href: '/eu/guide/review-compliance',
          estMinutes: 10,
          desc: '操纵评论、刷单、返现都是红线,合规积累要做。',
        },
        {
          id: 'operations-compliance-04',
          title: '选品避坑',
          href: '/eu/guide/product-pitfalls',
          estMinutes: 10,
          desc: '高风险品类(医疗、电池、儿童)选之前要清醒。',
        },
        {
          id: 'operations-compliance-05',
          title: '范例: CE 声明样本',
          href: '/eu/radar/example-ce-declaration',
          estMinutes: 10,
          desc: 'CE 声明不知道长啥样?看一个完整样本。',
        },
      ],
    },

    {
      slug: 'crisis-compliance',
      title: '危机公关(收到警告信 / 限流 / 扣货怎么救)',
      subtitle: '5 步救店:识别 → 48h 应对 → 申诉模板 → 复盘 → 预防',
      icon: '🚨',
      audience: '所有遇到 / 可能遇到合规危机的亚马逊欧洲站卖家',
      estTotalMinutes: 60,
      whyItMatters:
        '80% 卖家一生至少遇到 1 次合规危机 —— 警告信、限流、扣货、消费者投诉、监管调查,每一种都能让 listing 在 24-72 小时内下架、库存冻结、资金回不来。危机出现后的 48 小时是黄金窗口,熟悉流程的卖家能压住火情,不熟悉的卖家一拖再拖,损失放大 5-10 倍。\n5 种危机的应对路径完全不同:警告信要分类申诉、限流要找根因补料、扣货要走海关/平台双向流程、消费者投诉要 ADR 调解、监管调查要律师介入。把这 5 条路都走过一遍,危机来时你才能在 24 小时内启动响应,而不是在工单里来回踢皮球。\n预防比救火便宜 10 倍:把识别 → 应对 → 申诉 → 复盘 → 预防 5 步跑通,危机处理时长从 30 天压缩到 7 天,库存冻结资金回款周期从 90 天压缩到 30 天,listing 恢复率从 40% 提升到 80% 以上。',
      finalReward: '能冷静应对 5 大危机 + 申诉邮件模板 + 48 小时应对清单 + 复盘模板',
      steps: [
        {
          id: 'crisis-compliance-01',
          title: '5 大警告信类型识别',
          href: '/eu/guide/amazon-warning-email',
          estMinutes: 12,
          desc: '警告信分 5 类(产品安全 / 知识产权 / 假冒伪劣 / 合规文档 / 评论操纵),先识别类型再走申诉流程。'
        },
        {
          id: 'crisis-compliance-02',
          title: '48 小时应对清单',
          href: '/eu/checklists/compliance-notice-48h',
          estMinutes: 15,
          desc: '收到通知的 48 小时黄金窗口:截图存档、收集证据、起草申诉、内部沟通。错过就很难翻盘。'
        },
        {
          id: 'crisis-compliance-03',
          title: 'GPSR 邮件怎么回(模板)',
          href: '/eu/guide/amazon-gpsr-email',
          estMinutes: 10,
          desc: 'GPSR 是 2024-12 后最常见的批量通知,3 套中英模板 + 5 步避坑指南。'
        },
        {
          id: 'crisis-compliance-04',
          title: 'FBA 库存被停 / 扣货',
          href: '/eu/guide/german-packaging-pitfalls',
          estMinutes: 12,
          desc: 'FBA 仓库不让发货 = 库存积压;扣货 = 资金冻结。LUCID/EPR 缺失是常见触发原因,亚马逊仓库逐个审核。'
        },
        {
          id: 'crisis-compliance-05',
          title: '复盘 + 预防机制',
          href: '/eu/checklists/pre-listing-documents',
          estMinutes: 11,
          desc: '危机处理完后,3 件事必做:1) 内部复盘报告 2) 改进 SOP 3) 季度合规审计。预防比救火便宜 10 倍。'
        }
      ],
    },
    {
      slug: 'product-sourcing-compliance',
      title: '选品合规调研',
      subtitle: '亚马逊欧洲站选品前 60 分钟的合规快速排查',
      icon: '🎯',
      audience: '新卖家 / 选品新手 / 转类目老卖家',
      estTotalMinutes: 60,
      whyItMatters:
        '选错品 = 上架后立刻被下架、库存压着走不出、罚款 + 扣货。新品上市前 60 分钟的合规预排查能省 5-15 万 € 后续合规费 + 库存成本。这条路径按"先高风险类目 → 再易踩坑材质 → 再平台强制"3 维度排查,80% 卖家能在 60 分钟内识别"这个品能不能卖"。',
      finalReward: '走完 60 分钟,你会得到:1 张"产品合规检查表"+ 1 个"能不能卖"的明确判断(卖 / 缓卖 / 不卖)+ 1 个合规总成本预算。这是新品上市前的最后一道门,带去采购/选品/小组成员会直接能用。',
      steps: [
        {
          id: 'step-1',
          title: '5 类高风险类目先排除',
          href: '/eu/radar/eu-child-product-warnings/',
          estMinutes: 15,
          desc: '5 类高风险类目(食品 / 医疗 / 儿童玩具 / 化妆品 / 化学品)在欧盟需特殊许可证或强制认证,小卖家直接避开,除非你已经有相关供应链。1 张速查卡,5 分钟排除。',
        },
        {
          id: 'step-2',
          title: '6 种"易踩坑"材质快速过',
          href: '/eu/radar/eu-rohs-2011-65/',
          estMinutes: 15,
          desc: '带电池 / 含磁铁 / 接触食品 / 含塑料 / 含金属 / 含木包装,每一类都对应不同法规(RoHS / REACH / FCMA / LUCID / IOSS)。15 分钟过一遍你的产品,哪些碰了就标黄。',
        },
        {
          id: 'step-3',
          title: '4 个平台强制资质清点',
          href: '/eu/radar/eu-gpsr-responsible-person/',
          estMinutes: 15,
          desc: 'GPSR 责任人 / 欧代 / EPR 注册 / 品牌备案(Amazon Brand Registry)4 项是平台强制的,缺一就限流。每项检查你的后台是否已配齐,15 分钟 4 项过完。',
        },
        {
          id: 'step-4',
          title: '3 步核算合规总成本',
          href: '/eu/radar/eu-fcma-2024-1808/',
          estMinutes: 10,
          desc: '检测费(€1000-5000)+ 责任人(€200-500/年)+ EPR(€100-1000/年)+ CE/UKCA(€500-2000/产品)= 总成本 ÷ 预期销量 = 单件合规成本。>售价 30% 建议换品。',
        },
        {
          id: 'step-5',
          title: '1 张合规检查表打勾',
          href: '/eu/checklists/new-seller-basics/',
          estMinutes: 5,
          desc: '走完 4 步,填 1 张"产品合规检查表"(商品/类目/材质/法规/资质/预算),过勾就上,不过勾就再调研。5 分钟收尾,带去采购谈判。',
        },
      ],
    },
  ];;
}
