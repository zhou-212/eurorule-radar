/**
 * /compare/{slug} 长尾 SEO 对比页 — 配置数据
 * ------------------------------------------------------------
 * 6 个对比页 = 速查表 + 各自是什么 + 4 种卖家画像 + 时间线 +
 * 罚款风险 + FAQ + 相关 Radar 卡。
 * ------------------------------------------------------------
 */

export type Persona = { name: string; pick: 'left' | 'right' | 'both' | 'neither'; reason: string };
export type TimelineItem = { date: string; what: string };
export type FAQ = { q: string; a: string };
export type QuickRow = { label: string; left: string; right: string };

export interface CompareConfig {
  slug: string;
  leftName: string;
  rightName: string;
  leftFullName: string;
  rightFullName: string;
  oneLiner: string;
  leftShort: string;
  rightShort: string;
  quickTable: QuickRow[];
  leftWhat: string;
  rightWhat: string;
  personas: Persona[];
  timeline: TimelineItem[];
  fineRisk: { left: string; right: string };
  faq: FAQ[];
  primaryRadarIds: [string, string];
  relatedRadarCategories: string[];
  relatedChecklistTags: string[];
  seoDescription: string;
}

export function buildComparesConfig(): CompareConfig[] {
  return [
    /* ============ 1. GPSR vs EPR ============ */
    {
      slug: 'gpsr-vs-epr',
      leftName: 'GPSR',
      rightName: 'EPR',
      leftFullName: 'GPSR 通用产品安全法规',
      rightFullName: 'EPR 生产者延伸责任',
      oneLiner: 'GPSR 管"产品本身安不安全",EPR 管"卖完之后怎么回收",两件事都要做。',
      leftShort: '产品安全 + 欧代(欧盟责任人),Amazon EU 强制',
      rightShort: '包装 / 电池 / 电器等回收系统,各成员国独立注册',
      quickTable: [
        { label: '管什么', left: '产品本身的安全性(材质、设计、风险)', right: '产品用完后的回收(包装、电池、电子废弃物)' },
        { label: '是否强制', left: '所有非食品消费品(2024-12-13 起)', right: '看类目,几乎所有带包装的商品都要' },
        { label: '主要义务', left: '指定欧代 + 标欧代信息 + 准备技术文档', right: '注册回收系统 + 印 EPR 编号 + 缴费' },
        { label: '涉及国家', left: '欧盟 27 国统一', right: '各成员国独立(DE LUCID、FR Citeo...)' },
        { label: '注册号格式', left: '无单独注册号(欧代协议即可)', right: 'DE1234... / FR1234... (LUCID、Citeo UID)' },
        { label: '没做的后果', left: '亚马逊 listing 限流、海关扣货', right: 'FBA 库存停运、罚款 1000-10000 €' },
        { label: '费用区间', left: '欧代 500-3000 € / 年', right: '回收系统 100-5000 € / 年(按重量)' },
      ],
      leftWhat: 'GPSR 是 2024-12-13 全面生效的欧盟通用产品安全法规,管的是产品本身安不安全。基本上所有非食品消费品(电子、玩具、纺织、家居)只要卖到欧盟都要遵守。\n\n你需要做三件事:找一个住在欧盟的"欧代"挂名,在产品和包装上印好欧代的邮政地址和联系方式,再到亚马逊后台 EU Responsible Person 字段填上。\n\n简单说:有人在欧盟当地替你的产品安全背书,出问题时能联系到人。',
      rightWhat: 'EPR 是欧盟各国"生产者延伸责任"法规,管的是产品用完之后怎么回收。德国 LUCID 收包装费、法国 Citeo 收包装费、意大利 CONAI、西班牙 Ecoembes,每个国家规则都不太一样。\n\n费用按你卖的重量算,常见包装 EPR 一年 100-5000 欧元不等。亚马逊后台有个"Manage your EPR compliance"专门填这个,不填的话 FBA 库存可能被停。\n\n简单说:你卖出去的东西以后怎么回收,得交钱给各国指定的回收公司。',
      personas: [
            {
              name: '亚马逊 EU 5 国全开 + 卖带包装的电子配件',
              pick: 'both',
              reason: '你两个都触发。电子配件属于非食品消费品,GPSR 要求你找欧盟欧代 + 改产品标签;带包装卖到德法西意,EPR 包装回收每个国家都要分别注册。算下来光欧代一年 500-3000 欧元,加上 5 国包装 EPR,一年合规成本 5000 欧元起。'
            },
            {
              name: '卖纯手工木梳,没塑料包装,只在德国卖',
              pick: 'left',
              reason: '木梳是消费品,GPSR 一定要做欧代 + 改标签。但你没塑料包装,德国 LUCID 的包装 EPR 不用做(只针对带包装的)。如果你只用纸盒或布袋,先上 LUCID 看你的包装材质怎么归类,多数情况下纸盒也算"包装",建议跟回收公司确认。'
            },
            {
              name: '卖带包装的工业耗材,B2B 卖给 EU 工厂',
              pick: 'right',
              reason: '工业耗材(润滑油、清洁剂、化学品)B2B 卖给 EU 工厂,GPSR 不适用(消费品规则不覆盖 B2B 工业品)。但你的产品带包装投放到 EU 市场,德国 LUCID、法国 Citeo 这些包装 EPR 你作为 producer 还是要注册,按重量交费。'
            },
            {
              name: '卖 SaaS 订阅 / 数字下载 / 咨询服务',
              pick: 'neither',
              reason: '数字产品没有实物,既不在 GPSR 的"产品"范围,也不在 EPR 的"包装/电池/电子/纺织/家具"五大类目里。你在欧盟卖数字服务只需要考虑 VAT 增值税和 GDPR 隐私,跟这两个法规都没关系。完全不触发。'
            }
          ],
      timeline: [
            {
              date: '2019-01-01',
              what: '德国 LUCID 系统上线,包装 EPR 注册开始强制(Verpackungsgesetz 生效)'
            },
            {
              date: '2022-01-01',
              what: '亚马逊法国站开始强制要求 Citeo 包装 EPR 注册号,无注册号 FBA 入库被拦'
            },
            {
              date: '2022-07-01',
              what: '亚马逊德国站全面强制 LUCID 注册号,所有卖家用德仓必须有注册号'
            },
            {
              date: '2023-06-01',
              what: '亚马逊向 EU 5 国卖家推送 GPSR 合规预警邮件,提醒准备欧代'
            },
            {
              date: '2024-12-13',
              what: 'GPSR 全面生效,所有非食品消费品必须挂欧代,亚马逊开始下架不合规 listing'
            },
            {
              date: '2025-01-01',
              what: '意大利 CONAI、西班牙 Ecoembes 全面检查 EPR 注册号,亚马逊后台联动核验'
            }
          ],
      fineRisk: {
            left: 'GPSR 不做的后果有三层:一是亚马逊限流,listing 直接下架或搜索屏蔽,后台 EU Responsible Person 字段空着就被打回;二是海关扣货,产品到欧盟港口被海关抽查,发现没欧代或标签不合规直接扣押销毁;三是产品召回,出问题找不到欧盟责任人,品牌方承担全部召回成本,一次几万到几百万欧元。',
            right: 'EPR 不做的后果主要两块:一是亚马逊 FBA 库存停运,Manage your EPR compliance 字段空着或注册号无效,FBA 仓库直接停止发货,货压在仓库出不去;二是各国官方罚款,德国 LUCID 1000-10000 欧元/次,法国 Citeo 最高 30000 欧元/产品,意大利 CONAI 按未申报重量补缴 3-5 倍。'
          },
      faq: [
            {
              q: '我已经用了 CE 标志 + 老的 EC-REP 欧代,GPSR 还要重新做吗?',
              a: '要。GPSR 的 Responsible Person 跟老的 EC-REP 不完全一样:一是要求主体必须在欧盟(英国或瑞士公司不算),二是邮政地址和邮箱要明确写在产品标签上,不能藏在说明书里。多数情况你要换一家欧代服务商,旧的 EC-REP 不一定能满足 GPSR 要求。'
            },
            {
              q: 'EPR 包装费到底怎么算?为什么有人交 100 有人交 5000?',
              a: '看三个东西:一是卖到哪个国家(德法西意荷规则不同),二是你卖了多少公斤包装(亚马逊按重量 × 单价算),三是包装材质(纸盒比塑料便宜,玻璃最贵)。轻的(一年 < 1 吨)一年 100-300 欧元,中量(1-10 吨)500-2000 欧元,大量(> 10 吨)几千欧元。亚马逊 Manage your EPR compliance 后台有估算工具。'
            },
            {
              q: '我只在德国卖,法国/意大利的 EPR 也要做吗?',
              a: '不用。每个国家分开,你在德国卖就只做德国 LUCID,在法国卖就只做法国 Citeo。亚马逊后台的 EPR 字段是按国家分开的,你可以只填你卖的国家。但你一旦开通法国/意大利的 FBA 入库,这两个国家的 EPR 也得跟上,否则 FBA 入库被拦。'
            },
            {
              q: '我的产品是二手/翻新的,GPSR 和 EPR 还要做吗?',
              a: 'GPSR 二手商品一般不适用(EU 2019/1020 明确排除二手),但你卖的时候要在产品页明确标注"Used"。EPR 看你的产品类型,二手电子(电池)还是要做 EPR 电子 + 电池类目,二手包装(纸盒)如果重新包装也要做包装 EPR。翻新流程建议拍下来留底,海关问时有据可查。'
            },
            {
              q: '不在亚马逊卖,在自己独立站卖,这两个法规也适用吗?',
              a: '适用。GPSR 和 EPR 都是欧盟法规,跟销售渠道无关,只要产品卖到欧盟消费者手里(亚马逊、独立站、eBay、线下零售)都要做。区别在于:独立站亚马逊不替你检查,合规风险全在你身上;亚马逊会主动核查,不合规直接下架。独立站反而更要小心,出问题就是海关或消费者直接找你。'
            }
          ],
      primaryRadarIds: ['eu-gpsr-responsible-person', 'france-epr-triman'],
      relatedRadarCategories: ['产品安全', '包装责任', '平台合规'],
      relatedChecklistTags: ['GPSR', 'EPR', '新卖家'],
      seoDescription: 'GPSR vs EPR 哪个跟你有关?GPSR 管产品安全(欧代),EPR 管包装回收(GPSR 是"卖前"、EPR 是"卖后"),两件事都强制。本页用速查表 + 4 种卖家画像,1 分钟判断你该做哪个,两个都做要多少钱。',
    },

    /* ============ 2. CE vs UKCA ============ */
    {
      slug: 'ce-vs-ukca',
      leftName: 'CE',
      rightName: 'UKCA',
      leftFullName: 'CE 合格标志(欧盟)',
      rightFullName: 'UKCA 合格标志(英国)',
      oneLiner: 'CE 在欧盟卖、UKCA 在英国卖,产品同时卖两边 = 两个标志都要。',
      leftShort: '欧盟 27 国统一合格标志,几乎所有非食品消费品',
      rightShort: '英国(脱欧后)合格标志,2024-12-31 后 UKCA 占主导',
      quickTable: [
        { label: '适用地区', left: '欧盟 27 国 + EEA(冰岛/挪威/列支敦士登)', right: '英国(英格兰、苏格兰、威尔士)' },
        { label: '是否强制', left: '几乎所有非食品消费品(适用指令列表)', right: '原 CE 标志的英方替代品(2024-12 后)' },
        { label: '发证机构', left: '欧盟公告机构(Notified Body,如 TÜV、SGS)', right: '英国认可机构(UK Approved Body)' },
        { label: 'DoC 模板', left: 'EU Declaration of Conformity', right: 'UK Declaration of Conformity' },
        { label: '欧代要求', left: 'GPSR 强制(欧盟责任人)', right: 'UK Responsible Person(英国责任人)' },
        { label: '亚马逊要求', left: 'Amazon EU 5 国(DE/FR/IT/ES/NL)统一', right: 'Amazon UK 单独立法' },
        { label: '费用', left: '公告机构测试 1000-20000 €(按产品)', right: '英方认可机构测试 800-15000 £' },
      ],
      leftWhat: 'CE 是欧盟 27 国 + 冰岛/挪威/列支敦士登的"合格标志",贴在产品上表示这个产品符合欧盟所有相关指令(安全、电磁兼容、化学限制等)。基本上所有非食品消费品(电子、玩具、化妆品、医疗器械、机械)卖到欧盟都要有 CE。\n\n要做 CE 一般要:做测试找 Notified Body(比如 TÜV/SGS/Intertek)、出 EU 符合性声明(DoC)、贴 CE 标志、再挂个欧盟欧代。\n\n简单说:CE 是你在欧盟卖货的"准入证"。',
      rightWhat: 'UKCA 是英国(脱欧后)自己的合格标志,从 2024-12-31 起在英国全面替代 CE。你想在 Amazon UK 卖货,产品上得有 UKCA 标志,得找 UK Approved Body 做测试、出 UK DoC 声明、挂 UK Responsible Person。CE 标志在英国不能再用了。\n\n简单说:EU 用 CE,UK 用 UKCA,两边各做一套,不能通用。',
      personas: [
            {
              name: 'Amazon UK + Amazon EU 5 国都开,卖电子配件',
              pick: 'both',
              reason: '你两边都触发,英国一个合格标志 + 欧盟一个合格标志各做各的。电子配件一般要 Notified Body 测电磁兼容(EMC)+ LVD 安全指令,英国那边要找 UK Approved Body 再做一遍测试(报告不互认)。一年下来两个标志 + 两个欧代 + 两个 DoC,合规预算准备 3000-8000 欧元。'
            },
            {
              name: '只在 Amazon EU 5 国卖,不做英国市场',
              pick: 'left',
              reason: '只做 CE 就行,不用管 UKCA。注意:亚马逊 EU 5 国是指 DE/FR/IT/ES/NL 五个站点的统一后台,你这五国都用 CE + 欧盟欧代。如果以后想拓英国,UKCA 要单独再做一次,测试报告多数情况要重新测,不能拿 CE 报告直接顶 UKCA。'
            },
            {
              name: '只做 Amazon UK 英国本土店,产品全英国制造',
              pick: 'right',
              reason: '只做 UKCA 就行,CE 不需要。但 UKCA 要求必须有 UK Responsible Person(英国当地责任人),欧盟欧代不能替代。UK Approved Body 的测试报告要按英国 BS 标准出,不是欧盟 EN 标准,这两个标准细节上有差别,多数情况要重新测。'
            },
            {
              name: '只做美国 Amazon.com,产品全美国 FBA',
              pick: 'neither',
              reason: 'CE 和 UKCA 都是欧盟和英国市场的要求,美国市场有自己的 FCC(电子)、UL(安全)、FDA(食品/医疗/化妆品)等标志,跟 CE/UKCA 不是一回事。你做美国市场,这两个都不用考虑,专心搞定 FCC/UL/FDA 就行。'
            }
          ],
      timeline: [
            {
              date: '2020-01-31',
              what: '英国正式脱欧,UKCA 标志开始筹备,CE 在英国进入过渡期'
            },
            {
              date: '2021-01-01',
              what: 'UKCA 标志正式发布,英国开始接受 UKCA + CE 双轨制'
            },
            {
              date: '2023-01-01',
              what: 'UKCA 过渡期延长(原定 2022-01-01 结束),CE 在英国继续可用'
            },
            {
              date: '2024-09-16',
              what: '亚马逊 UK 推送 UKCA 强制通知,要求 12-31 前完成切换'
            },
            {
              date: '2024-12-31',
              what: 'UKCA 在英国全面替代 CE,CE 标志在英国不再被认可'
            },
            {
              date: '2025-01-01',
              what: '亚马逊 UK 开始下架无 UKCA 标志的 listing,英国海关 HMRC 同步严查'
            }
          ],
      fineRisk: {
            left: 'CE 不做的后果:一是亚马逊 EU 5 国 listing 下架,产品页被要求补传 DoC + Notified Body 证书;二是欧盟海关扣货,产品到港发现没 CE 或 CE 不合规,直接扣押、退回或销毁,损失运费 + 货值;三是欧盟各成员国市监抽查,罚款按产品类目 1000-50000 欧元不等,严重的(医疗器械、玩具)上黑名单,以后整个欧盟清关都难。',
            right: 'UKCA 不做的后果:一是 Amazon UK listing 下架,2024-12-31 后没有 UKCA 标志的产品页被屏蔽,搜索结果看不到;二是英国 OPSS(产品安全与标准办公室)罚款,单次 1000-10000 英镑,严重的直接起诉;三是英国海关 HMRC 扣货,跟欧盟类似,没 UKCA 标志或 DoC 不合规直接扣押。'
          },
      faq: [
            {
              q: 'CE 标志的产品能在英国卖吗?',
              a: '2024-12-31 之前可以,之后不行。脱欧后有过渡期让卖家慢慢切,2024 年底过渡期结束,从 2025-01-01 起英国只认 UKCA,CE 在英国等于没用。如果你现在还有大量 CE 库存,要么赶紧做 UKCA(加贴或重做测试),要么只卖 EU 不卖 UK,二选一。'
            },
            {
              q: 'UKCA 测试机构在哪里找?跟做 CE 的是同一家吗?',
              a: '不一样。CE 找的是欧盟 Notified Body(欧盟公告机构),编号是 4 位数字,例如 TÜV SÜD(0123)、SGS(0120)。UKCA 找的是 UK Approved Body(英国认可机构),名单在 gov.uk 官网有列。两个名单分开,测试报告基本不互认,要重新测(可能用同一台机器,但报告重出)。'
            },
            {
              q: 'CE 的 DoC 声明能直接转 UKCA DoC 用吗?',
              a: '不能直接转,要改三个地方:一是把"EU Directive"换成"UK Regulation",二是加上 UK Responsible Person 信息(不是欧盟欧代),三是声明末尾签字人的地址要在英国。DoC 模板可以一样,但内容要按 UK 法规重新写。建议你存两份 DoC,一份 EU DoC、一份 UK DoC,别混着改。'
            },
            {
              q: '欧代(EC-REP)和 UK Responsible Person 是同一个人吗?',
              a: '可以是同一家公司,但要这家公司同时在欧盟和英国都有实体(比如总部在德国但在英国有分公司)。多数情况你得找两家:一家是欧盟欧代(GPSR 要求),一家是 UK Responsible Person(UKCA 要求)。如果是同一家服务商的英国子公司,看他们能不能同时提供两个角色,有的服务商可以一站搞定。'
            },
            {
              q: 'DoC 是什么?不会写怎么办?',
              a: 'DoC(Declaration of Conformity)就是符合性声明,你自己签字声明产品符合哪些法规。要写的内容:产品型号、你的公司信息、适用的法规清单(比如 EMC 指令、LVD 指令)、测试报告编号、欧盟欧代或 UK RP 信息、签字人 + 日期。模板在欧盟官网和英国 gov.uk 都能下到,不会写就照着模板填,关键别漏欧代/RP 信息。'
            }
          ],
      primaryRadarIds: ['eu-gpsr-responsible-person', 'guide-ce-marking'],
      relatedRadarCategories: ['产品安全', '标签与说明书', 'CE', 'UKCA'],
      relatedChecklistTags: ['CE', '新卖家', 'UK'],
      seoDescription: 'CE vs UKCA 哪个跟你有关?CE 是欧盟合格标志,UKCA 是英国(脱欧后)的合格标志,产品同时卖两边 = 两个标志都做。本页用速查表 + 4 种卖家画像,1 分钟判断你 CE / UKCA 怎么选。',
    },

    /* ============ 3. VAT vs IOSS ============ */
    {
      slug: 'vat-vs-ioss',
      leftName: 'VAT',
      rightName: 'IOSS',
      leftFullName: 'VAT 增值税',
      rightFullName: 'IOSS 进口一站式申报',
      oneLiner: 'VAT 是"你得交的税",IOSS 是"跨境小包怎么方便交税",< 150 € 的货用 IOSS。',
      leftShort: '欧盟销售税,基本所有 B2C 卖家都要注册',
      rightShort: '跨境小包进口一站式申报,< 150 € 货值免清关麻烦',
      quickTable: [
        { label: '是什么', left: 'Value Added Tax(增值税),欧盟各国 17-27%', right: 'Import One-Stop-Shop,跨境 B2C < 150 € 的简化申报' },
        { label: '门槛', left: '所有 B2C 销售(无论金额)', right: '仅限货值 < 150 € 的跨境小包' },
        { label: '注册国家', left: '看你有库存的国家(DE/FR/IT/ES/...)+ 1 个', right: '1 个 IOSS 中介国(任意欧盟成员国都行)' },
        { label: '注册方式', left: '每个国家单独注册(本地税号)', right: '1 个 IOSS 号,通用全欧盟' },
        { label: '申报频率', left: '月报 / 季报(看国家)', right: '月报,通过 IOSS 中介提交' },
        { label: '适合谁', left: '所有在欧盟有库存的卖家', right: '从中国直发到欧盟买家、< 150 €' },
        { label: '没做的后果', left: '海关清关延误、罚款 1000-5000 €', right: '货被海关扣,买家付额外税' },
      ],
      leftWhat: `VAT 全称 Value Added Tax(增值税),就是欧盟的'消费税'。你在欧盟任何一国卖了货,买家付的钱里都有一笔要交给当地政府,这就是 VAT。税率各国自己定:德国 19%、法国 20%、意大利 22%、西班牙 21%、荷兰 21%。你有欧盟库存(比如 FBA 仓在德国),就在那个国家注册一个 VAT 税号,自己收、自己交、自己申报。FBA 帮你代扣代缴买家那部分 VAT,但你这边的注册和申报不能省。每个有库存的国家都要单独注册,只多了一个可以一表报全欧的 OSS 申报可选。`,
      rightWhat: `IOSS 全称 Import One-Stop Shop(进口一站式申报),专门解决跨境小包的清关麻烦。它只用在'直接从中国发货给欧盟买家'的 B2C 直邮场景,而且单件货值必须低于 150 欧元。注册一个 IOSS 号,就能覆盖欧盟 27 国,不用一个国家一个号。流程是这样的:你卖货时直接收买家 VAT,月底一次性申报到一个 IOSS 中介国,买家收快递时就不用再交任何税。亚马逊后台有个 'Amazon IOSS Number' 字段,填上就能用,亚马逊在 25 个国家有 IOSS 计划,卖家可以托亚马逊代为申报。`,
      personas: [
            {
              name: 'FBA 卖家,所有库存都在 DE/FR/IT/ES 仓',
              pick: 'left',
              reason: '你必须每个有库存的国家都注册 VAT 税号。FBA 仓帮你代扣代缴买家那部分,但你这边的注册号和申报不能省,一个都跑不掉。'
            },
            {
              name: '跨境直邮卖家,客单价 30-100 €,主销德国/法国/意大利',
              pick: 'right',
              reason: '1 个 IOSS 号覆盖全欧 27 国,买家清关时不用掏一分钱、不用等海关,你的转化率能直接拉高一截。'
            },
            {
              name: '混合卖家:FBA 仓在 DE + 同时用中国仓直邮测试新品',
              pick: 'left',
              reason: 'FBA 部分必须走 VAT(主),直邮部分可加 1 个 IOSS 号做辅助。两套体系平行,主次清楚。'
            },
            {
              name: '新手刚起步,只做直邮,客单价 < 150 €',
              pick: 'right',
              reason: '亚马逊 IOSS 计划帮你代申报,你只管卖货就行,不用先砸几千欧去注册 VAT,零门槛上手。'
            },
            {
              name: '大件家具卖家,客单价普遍 500-2000 €',
              pick: 'left',
              reason: 'IOSS 只管 < 150 € 的小包,你这个价位根本进不去,直接走 VAT 没第二条路。'
            }
          ],
      timeline: [
            {
              date: '2021-07-01',
              what: '欧盟废除跨境 B2C < 22 € 的小包免税门槛,跨境小包开始要交税'
            },
            {
              date: '2021-07-01',
              what: 'IOSS 正式生效(欧盟 27 国),跨境小包有了绿色通道'
            },
            {
              date: '2021-07-01',
              what: '跨境 B2C > 150 € 强制按进口 VAT 处理,清关要交税'
            },
            {
              date: '2022-07',
              what: '亚马逊在 24 个欧盟国家上线 IOSS 计划,卖家填号即可用'
            },
            {
              date: '2024-01',
              what: '亚马逊 IOSS 计划扩展到 25 个国家'
            }
          ],
      fineRisk: {
            left: 'VAT 不注册直接卖货,德国罚款 1000-5000 €,法国可以追到 1 万 €,意大利最严,持续 6 个月以上追究刑事责任,海关还会扣你货。已发货的还要追溯补缴,一笔一笔算账。',
            right: 'IOSS 没用对,单件货值未申报要罚 5% 货值(最低 25 €/件)。比如一批 1000 元的货没走 IOSS,罚 50 €/件,100 件就是 5000 €。这笔钱没有最低门槛,小件小货一样罚。'
          },
      faq: [
            {
              q: '我必须两个都做吗?',
              a: '不是。看销售模式:FBA 库存走 VAT,跨境直邮 < 150 € 走 IOSS,跨境直邮 > 150 € 走 VAT。两个体系是平行的,不会同时强制要求你两个都做。'
            },
            {
              q: '亚马逊 FBA 已经代扣代缴了,我还要注册 VAT 吗?',
              a: '要。FBA 帮你收买家那部分 VAT,但你这边的注册号和申报义务没省。亚马逊德国仓要求你必须有 DE 的 VAT 税号才能发货进仓,缺号就入不了仓。'
            },
            {
              q: '1 个 IOSS 号能覆盖全欧盟吗?',
              a: '能,27 国都覆盖。但需要挂靠一个 IOSS 中介(就是你委托代为申报的实体),中介费 100-300 €/月,加月报 50-200 €/月。'
            },
            {
              q: '跨境直邮 + 客单价 120 €,用 IOSS 还是 VAT?',
              a: '用 IOSS。低于 150 € 走 IOSS,买家不用付清关费、不用在海关等,转化率比走 VAT 高一截。'
            },
            {
              q: 'VAT 注册 1 个国家多少钱?',
              a: '注册费 100-500 €(看国家和代理),季报费 100-500 €。DE/FR/IT/ES 全注册 + 全申报,一年准备 5000-15000 € 起步。'
            },
            {
              q: '我能不能不注册任何东西,小批量试试水?',
              a: '不建议。任何进入欧盟的货都可能被海关拦下检查,小批量也可能补缴 + 罚款。新手直接走亚马逊 IOSS 计划最省事,几千欧的注册费可以先省下来。'
            },
            {
              q: 'VAT 申报是月报还是季报?',
              a: '看国家。德国季报,法国月报(超过一定额度),意大利季报,西班牙月报。新注册时一般是季报,达到一定规模后会被税局要求改月报。'
            }
          ],
      primaryRadarIds: ['eu-ioss-vat', 'eu-ioss-vat'],
      relatedRadarCategories: ['税务', '跨境物流', '平台合规'],
      relatedChecklistTags: ['VAT', 'IOSS', '新卖家'],
      seoDescription: 'VAT vs IOSS 哪个跟你有关?VAT 是欧盟增值税,IOSS 是跨境小包 < 150 € 的简化申报。FBA 卖家主用 VAT,跨境直邮小包用 IOSS。本页用速查表 + 4 种卖家画像,1 分钟判断你走哪条。',
    },

    /* ============ 4. IOSS vs VAT ============ */
    {
      slug: 'ioss-vs-vat',
      leftName: 'IOSS',
      rightName: 'VAT',
      leftFullName: 'IOSS 进口一站式申报',
      rightFullName: 'VAT 增值税',
      oneLiner: 'IOSS 适合"跨境直邮 < 150 € 小包",VAT 适合"在欧盟有库存"。',
      leftShort: '跨境小包进口一站式申报,< 150 € 货值免清关麻烦',
      rightShort: '欧盟销售税,基本所有 B2C 卖家都要注册',
      quickTable: [
        { label: '货值门槛', left: '仅限 < 150 €', right: '无(任何金额都要交)' },
        { label: '是否需要欧盟库存', left: '不需要(从中国直发也行)', right: '需要(任何欧盟境内的库存点)' },
        { label: '亚马逊后台', left: 'Amazon IOSS Number 字段', right: 'VAT 证书号(每个国家一个)' },
        { label: '申报频率', left: '月报(1 个 IOSS 号,覆盖全欧)', right: '月报 / 季报(每个国家单独)' },
        { label: '成本', left: 'IOSS 中介费 100-300 € / 月 + 月报', right: '每个国家 VAT 注册 + 月报 100-500 €' },
        { label: '买家体验', left: '下单时付清税,无海关惊喜', right: '货到付清(FBA 时已含税)' },
        { label: '适合谁', left: '跨境直邮 / 轻小件 / 单价 < 150 €', right: 'FBA 库存 / 大件 / 货值 > 150 €' },
      ],
      leftWhat: `IOSS 全称 Import One-Stop Shop(进口一站式申报),是欧盟给跨境小包开的'绿色通道'。它只用在'直接从中国(或非欧盟)发货给欧盟买家'的 B2C 直邮场景,而且单件货值必须低于 150 欧元。注册一个 IOSS 号,就能覆盖欧盟 27 国,不用一个国家一个号。流程是这样的:你卖货时直接收买家 VAT,月底一次性申报到一个 IOSS 中介国,买家收快递时不用再交任何税。亚马逊后台有 'Amazon IOSS Number' 字段,填上就能用,亚马逊在 25 个国家有 IOSS 计划可以托它代为申报。`,
      rightWhat: `VAT 全称 Value Added Tax(增值税),就是欧盟的'消费税'。你在欧盟任何一国卖了货,买家付的钱里都有一笔要交给当地政府,这就是 VAT。税率各国自己定:德国 19%、法国 20%、意大利 22%、西班牙 21%、荷兰 21%。你有欧盟库存(比如 FBA 仓在德国),就在那个国家注册一个 VAT 税号,自己收、自己交、自己申报。FBA 帮你代扣代缴买家那部分 VAT,但你这边的注册和申报不能省。每个有库存的国家都要单独注册,只多了一个可以一表报全欧的 OSS 申报可选。`,
      personas: [
            {
              name: '跨境直邮卖家,客单价 30-80 €,主销德国/法国',
              pick: 'left',
              reason: '你做的就是低单价直邮,IOSS 一个号覆盖 27 国,买家清关零摩擦,转化率比 VAT 模式高一截。'
            },
            {
              name: 'FBA 卖家,所有库存都在 DE/FR/IT/ES 仓',
              pick: 'right',
              reason: 'IOSS 只管直邮,你 FBA 仓里放着的货全部按当地 VAT 走,每个仓所在国都要注册,没有捷径。'
            },
            {
              name: '准备从跨境直邮切到 FBA 的卖家',
              pick: 'right',
              reason: `你一旦把货发到德国 FBA 仓,身份就从'跨境直邮'变成'在欧盟销售',IOSS 不再适用,必须先把 VAT 税号注册好。`
            },
            {
              name: '客单价 > 150 € 的高端卖家(家具/电子产品)',
              pick: 'right',
              reason: '150 € 以上的件不能走 IOSS,只能清关时按进口 VAT 处理,本质就是 VAT 流程,IOSS 完全帮不上忙。'
            },
            {
              name: '用亚马逊物流欧洲配送(EFN),共享一个欧盟仓库存',
              pick: 'right',
              reason: 'EFN 是把一个欧盟仓的库存跨国家调拨,本质就是有库存,必须走 VAT,IOSS 不适用。'
            },
            {
              name: '刚起步,每天 10-50 单跨境直邮 < 150 €',
              pick: 'left',
              reason: '你这个量级根本不值得注册 VAT(一年 5000-15000 € 起步),走亚马逊 IOSS 计划零门槛上手,钱可以先省着。'
            }
          ],
      timeline: [
            {
              date: '2021-07-01',
              what: 'IOSS 正式生效(欧盟 27 国),跨境小包绿色通道落地'
            },
            {
              date: '2021-07-01',
              what: '欧盟废除跨境 B2C < 22 € 的小包免税门槛,小包不再免征'
            },
            {
              date: '2021-07-01',
              what: '跨境 B2C > 150 € 强制按进口 VAT 处理(IOSS 不再适用)'
            },
            {
              date: '2022-07',
              what: '亚马逊在 24 个欧盟国家上线 IOSS 计划,直邮卖家填号即可用'
            },
            {
              date: '2024-01',
              what: '亚马逊 IOSS 计划扩展到 25 个国家'
            }
          ],
      fineRisk: {
            left: 'IOSS 没用对,单件货值未申报要罚 5% 货值(最低 25 €/件)。比如一批 1000 元的货没走 IOSS,罚 50 €/件,100 件就是 5000 €。这笔钱没有最低门槛,小件小货一样罚,直邮小卖家损失占比最高。',
            right: 'VAT 不注册直接卖货,德国罚款 1000-5000 €,法国可以追到 1 万 €,意大利最严,持续 6 个月以上追究刑事责任,海关还会扣你货。已发货的还要追溯补缴,一笔一笔算账。'
          },
      faq: [
            {
              q: '我现在做跨境直邮,什么时候要切到 VAT?',
              a: '两个时间点:① 开始用 FBA 海外仓(德国仓/法国仓等);② 单件货值超过 150 €。这两类都强制走 VAT,IOSS 不管用,别拖到被海关扣货再切。'
            },
            {
              q: '客单价 145 €,算 IOSS 还是 VAT?',
              a: '算 IOSS。150 € 是阈值,低于 150 都能用。卡线上的 145 没问题,不用担心被税局找麻烦。'
            },
            {
              q: '我能不能跨境直邮 + FBA 一起做,两边都注册?',
              a: `可以。FBA 那边的 VAT 单独走(每个有库存的国家都要号),跨境直邮这边加 1 个 IOSS 号。两套体系是平行的,亚马逊后台 'Amazon IOSS Number' 字段填上即可。`
            },
            {
              q: '跨境直邮突然爆单,客单价涨到 200 € 了怎么办?',
              a: '当件货值超过 150 € 时,这一单就不能用 IOSS 了。要么切到 FBA 海外仓走 VAT,要么这单单独走进口清关(买家付清关费)。提前规划,别等清关时手忙脚乱。'
            },
            {
              q: 'IOSS 申报怎么操作?',
              a: '你(或你的中介)每个月把当月所有 IOSS 订单汇总,生成月报提交到 IOSS 中介国。各国买家的 VAT 总额一次性结清给中介,中介再分发给各国税局,你不用一国一国去报。'
            },
            {
              q: 'VAT 和 IOSS 哪个成本高?',
              a: '看规模。FBA 多国库存,VAT 一年 5000-15000 €(注册 + 季报)。跨境直邮 IOSS,一个月中介费 100-300 € + 月报 50-200 €。小卖家做 IOSS 便宜,大卖家做 FBA 跑量后 VAT 单价更低。'
            },
            {
              q: '我想从 FBA 退回跨境直邮,流程麻烦吗?',
              a: '退 FBA 仓容易(亚马逊后台申请移除库存),但你的 VAT 税号该保留就保留(以后还要用)。跨境直邮这边加个 IOSS 号即可,两套独立,可以并存也可以单跑。'
            }
          ],
      primaryRadarIds: ['eu-ioss-vat', 'eu-ioss-vat'],
      relatedRadarCategories: ['税务', '跨境物流', '平台合规'],
      relatedChecklistTags: ['IOSS', 'VAT', 'FBA'],
      seoDescription: 'IOSS vs VAT 怎么选?跨境小包 < 150 € 用 IOSS 走 1 个号,省清关麻烦;FBA 库存 / 大件用 VAT(每个国家单独注册)。本页用速查表 + 4 种卖家画像 + 跨境 / FBA 切换建议,1 分钟判断。',
    },

    /* ============ 5. PPWR vs Batteries ============ */
    {
      slug: 'ppwr-vs-batteries',
      leftName: 'PPWR',
      rightName: 'Batteries',
      leftFullName: 'PPWR 包装与包装废弃物法规',
      rightFullName: 'Batteries 电池与废电池法规',
      oneLiner: 'PPWR 管"包装材料",Batteries 管"包装里含的电池",含电池产品两个都触发。',
      leftShort: '2026-08-12 全面执行,所有带包装商品触发',
      rightShort: '2025-08-18 全面适用,所有含电池商品触发',
      quickTable: [
        { label: '管什么', left: '包装本身(物质、厚度、可回收、标签)', right: '电池(化学、容量、护照、回收)' },
        { label: '生效日', left: '2026-08-12 全面执行(2025-02-11 生效)', right: '2025-08-18 全面适用(2023-07 已生效)' },
        { label: '是否依赖有包装', left: '是,所有带包装商品', right: '否,只要产品含电池或销售电池' },
        { label: '重叠场景', left: '无电池的包装(纯产品)', right: '电池 + 包装的组合(最常见)' },
        { label: '主要义务', left: '物质检测 + 最小化 + 标签 + 回收等级', right: '容量标签 + 回收注册 + 碳足迹 + 电池护照' },
        { label: '回收注册', left: 'LUCID(DE) / Citeo(FR) / Syderep 等', right: 'ear(DE) / Corepile(FR) / COBAT(IT) 等' },
        { label: '罚款', left: '包装罚款 1000-50000 €(看国家)', right: '电池罚款 5000-100000 €(看国家)' },
      ],
      leftWhat: 'PPWR 是《包装与包装废弃物法规》,2025-02-11 落地,2026-08-12 起强制执行。你只要在欧盟卖带包装商品——纸盒、快递袋、泡沫、塑料膜都算——它就管你。包装要过重金属 + PFAS 检测,空置容积不能超 50%,要印运营主体 + 批次,2028 起欧盟统一材质象形标识;你不达标,德国罚 1000-50000 €、法国罚 1500-15000 €。',
      rightWhat: 'Batteries 是《电池与废电池法规》,2023-07 已生效,2025-08-18 全面适用。你产品里那块电池——充电宝、电动玩具、纽扣电池、电动工具电池——通通算,分便携式、LMT(电动滑板车)、SLI(汽车电瓶)、工业、EV 五类。要在电池本体印容量 + 化学成分 + 回收符号 + 二维码,2027-02-18 起 LMT/工业/EV 强制开电池护照;你不达标,德国 ear 罚 5 万 €、法国 Corepile 罚 1.5 万 €。',
      personas: [
            {
              name: '亚马逊 EU 5 国全开 + 卖含电池的电子产品(充电宝 / 玩具 / 电动工具)',
              pick: 'both',
              reason: '你两个都触发:PPWR 管你那个外包装纸盒,Batteries 管你产品里那块电池。充电宝 + 包装盒这种最典型,两边都得做。'
            },
            {
              name: '纯包装卖家(快递袋 / 缓冲气泡膜 / 纸盒,产品本身不含电池)',
              pick: 'left',
              reason: '你只触发 PPWR。Batteries 不管纯包装,电池回收系统不用注册、电池护照不用开。'
            },
            {
              name: '卖 18650 电芯 / 储能电源 / 工业电池组(B2B 或独立包装)',
              pick: 'right',
              reason: '你只触发 Batteries。电池本身就是产品,PPWR 只看电池外壳有没有过度包装,基本不会卡你。'
            },
            {
              name: '美妆 / 食品 / 服装卖家(产品本体无电池,但有纸盒 / 袋装)',
              pick: 'left',
              reason: '你只触发 PPWR。口红、粉底、衣服不带电池,Batteries 这条线跟你没关系,别多花冤枉钱。'
            }
          ],
      timeline: [
            {
              date: '2023-07',
              what: 'Batteries 法规正式生效,过渡期开始'
            },
            {
              date: '2025-02-11',
              what: 'PPWR 法规生效,18 个月过渡期'
            },
            {
              date: '2025-08-18',
              what: 'Batteries 全面适用,五类电池强制新规,标签 + 化学成分 + 二维码都跟上'
            },
            {
              date: '2026-08-12',
              what: 'PPWR 全面执行,所有带包装商品强制按新规做检测、印标识、注册回收系统'
            },
            {
              date: '2027-02-18',
              what: 'LMT / 工业 / EV 电池强制启用电池护照(电子身份证,扫码看完整溯源)'
            },
            {
              date: '2028',
              what: 'PPWR 统一材质象形标识(全欧盟长一个样,不再各国一套)'
            }
          ],
      fineRisk: {
            left: '你不做 PPWR,德国包装法罚 1000-50000 €(看情节轻重),法国 Citeo 直接锁 Listing,Amazon 同步下架。批量卖家被查一次,几万欧罚款 + FBA 库存积压,资金链容易断。',
            right: '你不做 Batteries,德国 ear 罚 5 万 € 起步,重的直接没收库存 + 禁售链接;法国 Corepile 罚 1.5 万 € 一档,Amazon FR 没填电池 EPR 同样下架。'
          },
      faq: [
            {
              q: '我只卖纸盒和快递袋,需要做 Batteries 吗?',
              a: '不用。Batteries 管电池,跟你的包装没半毛钱关系。你只触发 PPWR,老老实实做包装合规就行。'
            },
            {
              q: '我卖充电宝,两个都要做吗?',
              a: '要。充电宝本体触发 Batteries,要印容量 + 化学 + 回收符号 + 二维码;外面那个纸盒 + 内托触发 PPWR,要过物质检测 + 印运营主体 + 印材质标识。'
            },
            {
              q: '德国注册了,法国还需要单独做吗?',
              a: '需要。两国回收系统是分开的——德国 LUCID + 选个绿点/Interseroh 之类的回收方,法国 Citeo 包装 + Corepile 电池,各填各的,字段不通用。'
            },
            {
              q: '两个都触发,流程会重复吗?',
              a: '部分重叠、部分独立。包装检测报告可以共用一份(测完重金属和 PFAS 就行),但 EPR 注册号、回收系统缴费、平台后台登记,两边都得各做一次。'
            },
            {
              q: '罚款大概多少?',
              a: 'PPWR 这边,德国 1000-50000 €、法国 1500-15000 €;Batteries 这边,德国 5 万 € 起步 + 没收 + 禁售、法国 1.5 万 €。小卖家被罚一次基本白干半年。'
            },
            {
              q: '小卖家有豁免吗?',
              a: '几乎没有。PPWR 和 Batteries 都是「进了欧盟市场就算」,不管你公司大不大、一年卖多少单。哪怕一年只发 100 单,该注册注册、该贴标贴标。'
            }
          ],
      primaryRadarIds: ['eu-ppwr-2025-40', 'eu-batteries-regulation-2023-1542'],
      relatedRadarCategories: ['环保合规', '产品安全', '标签与说明书'],
      relatedChecklistTags: ['包装', '电池', '新卖家'],
      seoDescription: 'PPWR vs Batteries 哪个跟你有关?PPWR 管"包装"(物质 / 标签),Batteries 管"含电池产品"(化学 / 护照),含电池商品 = 两个都触发。本页用速查表 + 4 种卖家画像,1 分钟判断该做哪个、先后顺序。',
    },

    /* ============ 6. DE LUCID vs FR EPR ============ */
    {
      slug: 'de-lucid-vs-france-epr',
      leftName: 'LUCID (DE)',
      rightName: 'EPR (FR)',
      leftFullName: '德国 LUCID 包装登记册',
      rightFullName: '法国 EPR 多类目注册',
      oneLiner: 'LUCID 是德国包装法,EPR(法)是法国多类目回收,卖德国填 LUCID,卖法国填 EPR,都卖 = 都填。',
      leftShort: '德国包装回收登记,Amazon DE 强制',
      rightShort: '法国多类目(包装 / 电气 / 电池 / 纺织),Amazon FR 强制',
      quickTable: [
        { label: '适用国家', left: '只在德国(DE)', right: '只在法国(FR)' },
        { label: '亚马逊字段', left: '"German Packaging Law"', right: '"Manage your EPR compliance" → France' },
        { label: '回收系统', left: 'Duales System(Grüner Punkt / Interseroh / Reclay 等)', right: 'Citeo(包装)/ Ecologic(电气)/ Corepile(电池)/ Refashion(纺织) 等' },
        { label: '注册号', left: 'LUCID 号(DE 开头,15 位)', right: 'UID 号(FR 开头,各回收系统独立)' },
        { label: '包装标识', left: 'LUCID 号 + 回收系统 logo', right: 'Triman 标识 + UID 号' },
        { label: '是否免费注册', left: 'LUCID 注册免费,系统收费', right: 'Citeo 等大部分收费(年度)' },
        { label: '费用', left: '回收系统 100-5000 € / 年(按重量)', right: 'Citeo 100-1000 € / 年(按类目)' },
      ],
      leftWhat: '你想往德国卖带包装商品,就得去 LUCID 注册一个号——这是德国包装登记册,号长 DE + 13 位数字(比如 DE1234567890123),在 stiftung-ear 上免费申请。注册完还要选个回收系统——绿点(Grüner Punkt)、Interseroh、Reclay、Landbell 任选一个,按包装重量缴费。Amazon DE 2022 年起强制查你号,没填直接下架 Listing;小型卖家一年大概 100-500 €。',
      rightWhat: '法国 EPR 跟德国不一样,是按类目拆的多套系统:包装(Citeo / Syderep)、电气(Ecologic)、电池(Corepile)、纺织(Refashion)、家具、轮胎、纸张,各类目独立注册、独立缴费。你每类拿一个 UID 编号,印在产品或包装上,加一个 Triman 标识(法国特有的小人 + 垃圾桶图案)。Amazon FR 2022 年起强制,UID 缺一项 FBA 库存就停运;小型卖家一个类目 100-1000 €/年。',
      personas: [
            {
              name: 'Amazon DE + FR 都开,卖电子产品(小家电 / 智能家居)',
              pick: 'both',
              reason: '你两边都卖、两站都开:德国 LUCID 号 + 选个绿点之类的回收方,法国按你类目注册 EPR(包装必填,电气 / 电池看情况)。Amazon 后台两个号分开填,缺一不可。'
            },
            {
              name: '只做德国站(DE),产品带包装但不含电池',
              pick: 'left',
              reason: '你只触发 LUCID,注册完号 + 选个回收方按重量缴费就行,法国那边不用管。'
            },
            {
              name: '只做法国站(FR),卖衣服 / 美妆 / 食品',
              pick: 'right',
              reason: '你只触发法国 EPR,注册包装类目(几乎所有带包装商品都得做),拿到 UID + 印 Triman 标识,德国那边不用碰。'
            },
            {
              name: '多类目卖家:电气 + 电池 + 包装(电视 / 冰箱 / 充电宝)DE + FR 都开',
              pick: 'both',
              reason: '德国 LUCID 包装号 + 法国包装 / 电气 / 电池三个 UID,加起来四五个号要注册,Amazon 后台也是四个空都要填。建议先用表格列清楚,别漏。'
            }
          ],
      timeline: [
            {
              date: '2022-01',
              what: 'Amazon DE 开始强制校验 LUCID 号,缺号 Listing 直接下架'
            },
            {
              date: '2022-01',
              what: 'Amazon FR 开始强制校验 EPR UID(包装类目先行),缺号 FBA 库存停运'
            },
            {
              date: '2022 年起',
              what: '法国逐步扩大 EPR 强制类目:电气、电池、纺织、家具、轮胎、纸张陆续纳入'
            },
            {
              date: '2025-08-18',
              what: 'Batteries 法规全面适用,法国电池 EPR 强制力度升级,没注册的 Listing 同步下架'
            },
            {
              date: '2026-08-12',
              what: 'PPWR 全面执行,德国 LUCID + 法国 EPR 包装类目双重强化,新卖家几乎无法绕开'
            }
          ],
      fineRisk: {
            left: '你不做 LUCID,Amazon DE 直接下架 Listing,德国包装法再罚 1000-50000 €。库存压在 FBA 仓里动不了,资金链一断就是几十万的货烂在海外仓。',
            right: '你不做法国 EPR,Amazon FR 停运 FBA 库存(自发货流量暴跌),包装 Citeo 罚 1500-15000 €、电气 / 电池类目再各罚一档,叠加起来轻松破 5 万 €。'
          },
      faq: [
            {
              q: 'LUCID 和 France EPR 是不是同一个东西?',
              a: '不是。LUCID 是德国一个统一的包装登记册,所有带包装商品共用一个号;France EPR 是法国按类目拆的多套系统,一个卖家可能拿好几个 UID,各管各的。'
            },
            {
              q: '我两个都卖,流程麻烦吗?',
              a: '两个号分开申请:LUCID 号免费、3-7 个工作日下号;法国 EPR 各回收系统独立注册,快的一周、慢的两三周。Amazon 后台两边各有一个空要填,不会自动同步。'
            },
            {
              q: '注册要花多少钱?',
              a: 'LUCID 号本身免费,但你得选个德国回收方按包装重量缴费,小型卖家 100-500 €/年;法国 EPR 各类目独立计费,包装类目 100-300 €、电气 / 电池类目 100-1000 € 不等,看你卖什么。'
            },
            {
              q: '我只想省钱,只填一个行不行?',
              a: '不行。Amazon DE 和 Amazon FR 是两套独立的合规校验,德国缺 LUCID 号 DE 站下架,法国缺 UID FR 站下架。你要哪个站活着,就得把那个站的号填上。'
            },
            {
              q: 'Triman 标识是什么?',
              a: '法国特有的小人 + 垃圾桶图案(像一个奔跑的人往垃圾桶扔东西),印在产品或包装上,告诉消费者这个东西可以回收。包装、电气、电池、纺织、家具类目都得印,跟 UID 一起出现,缺一个都算不合规。'
            },
            {
              q: '我已经在德国注册了绿点,法国还要单独做 Citeo 吗?',
              a: '要。绿点是德国回收方,Citeo 是法国回收方,两边数据不互通、缴费不通用,公司主体也可能不同。你必须在法国再单独注册一个 Citeo 账号、拿到自己的 UID。'
            }
          ],
      primaryRadarIds: ['de-lucid-packaging', 'france-epr-triman'],
      relatedRadarCategories: ['包装责任', '环保合规', '平台合规'],
      relatedChecklistTags: ['LUCID', 'EPR', '新卖家', '德国', '法国'],
      seoDescription: '德国 LUCID vs 法国 EPR 怎么选?LUCID 只管德国包装回收,EPR(法)管法国多类目(包装 / 电气 / 电池 / 纺织)。卖 DE 填 LUCID、卖 FR 填 EPR、两边都卖 = 都填。本页用速查表 + 4 种卖家画像,1 分钟判断要注册哪些。',
    },

    /* ============ 7. CRA vs NIS2 ============ */
    {
      slug: 'cra-vs-nis2',
      leftName: 'CRA',
      rightName: 'NIS2',
      leftFullName: '欧盟 CRA 网络弹性法案',
      rightFullName: '欧盟 NIS2 网络与信息安全指令 2',
      oneLiner: 'CRA 管"产品本身的网络安全",NIS2 管"组织的网络安全",做关键基础设施供应商 + 卖联网硬件 = 两个都触发。',
      leftShort: '联网产品(智能硬件 + 软件)默认安全 + 漏洞披露 + 5 年支持',
      rightShort: '关键基础设施(能源/交通/医疗/银行)组织级网络安全义务',
      quickTable: [
        { label: '管什么', left: '联网产品本身(设备 + 软件 + IoT)', right: '组织的网络安全治理(流程 + 人员 + 系统)' },
        { label: '是否强制', left: '所有联网产品(2027-12-11 起)', right: '关键基础设施实体(中型以上企业,2024-10 各国转化)' },
        { label: '主要义务', left: '默认安全 + SBOM + 漏洞披露 + 5 年支持', right: '风险评估 + 事件响应 24h 通报 + 治理 + 供应链管理' },
        { label: '涉及主体', left: '产品制造商 / 进口商 / 分销商', right: '能源 / 交通 / 银行 / 医疗 / 数字基础设施运营方' },
        { label: '监督机构', left: '市场监管机构(各国)', right: 'ENISA + 各国 CSIRT 网络安全机构' },
        { label: '没做的后果', left: '产品下架 + 召回 + 罚款', right: '管理责任 + 罚款 + 业务暂停' },
        { label: '罚款', left: '1500 万 € 或全球营收 2.5%', right: '1000 万 € 或全球营收 2%' },
      ],
      leftWhat: '你卖联网产品(智能家居、可穿戴、工业传感器、联网玩具)就得懂 CRA。它是欧盟 2024 年通过的《网络弹性法案》,管的是产品本身的网络安全——出厂默认安全、漏洞及时打补丁、停产后还要维护 5 年。2027 年 12 月 11 日起全面强制执行。亚马逊从 2024 年起就提前要 DoC(合规声明),不少跨境卖家已经踩过坑。',
      rightWhat: 'NIS2 是欧盟《网络与信息安全指令》第二版,管的是企业、医院、电力公司、银行这类关键基础设施运营方,不是单个产品。它要求这些组织建网络安全体系——7×24 小时风险监控、漏洞通报、供应链管理都得有。成员国 2024 年 10 月 17 日前要把它写进本国法律。罚起来不轻,顶格 1000 万欧元或全球营收 2%。',
      personas: [
            {
              name: '卖消费电子的跨境卖家(智能音箱、扫地机器人、智能门锁)',
              pick: 'left',
              reason: '你卖的就是 CRA 管的联网产品,从 2024 年亚马逊要 DoC 那一刻起你就被卷进来了。NIS2 跟这种小卖家基本无关,那是大公司 IT 部门操心的事。'
            },
            {
              name: '卖工业设备给电力公司、医院、银行的企业(2B 销售)',
              pick: 'both',
              reason: '你卖的产品要符合 CRA(产品维度),你的买家(电力公司)还要符合 NIS2(组织维度)。买家招标的时候经常反过来要求你出示 CRA 合规文件,两份合规你都得跑。'
            },
            {
              name: '关键基础设施运营方本身(电力、医院、银行、电信运营商)',
              pick: 'right',
              reason: 'NIS2 的监管对象就是你这类组织,从 2024 年 10 月起就要建体系。CRA 跟你关系不大,除非你公司同时也卖自己的联网硬件,那才叠加触发。'
            },
            {
              name: '纯软件 SaaS 卖家(没硬件、纯云端服务)',
              pick: 'neither',
              reason: 'CRA 主要管带硬件联网的产品,纯云端 SaaS 暂时不在 CRA 适用范围(等具体细则)。NIS2 也只有当你的客户是关键基础设施运营方才触发,普通小客户不受影响。'
            }
          ],
      timeline: [
            {
              date: '2024-10-17',
              what: 'NIS2 各成员国把它写进本国法律的截止日'
            },
            {
              date: '2024-10',
              what: '亚马逊开始要求联网产品卖家提交 DoC(合规声明)'
            },
            {
              date: '2025-09',
              what: 'CRA 主要条款的细则陆续公布'
            },
            {
              date: '2026-2027',
              what: '欧盟市场监管机构开始按 CRA 执法,罚款案例陆续曝光'
            },
            {
              date: '2027-12-11',
              what: 'CRA 全面强制执行,所有联网产品必须符合'
            }
          ],
      fineRisk: {
            left: 'CRA 不做的后果直接落到产品上:亚马逊下架、欧盟海关扣货、企业客户拒收。最狠的是罚款——1500 万欧元或全球年营收 2.5%,哪个高按哪个算。欧盟还会把不合规产品列入公开警告数据库,品牌名声跟着一起受损。',
            right: 'NIS2 不做的后果落在企业层面。监管机构可以现场审计、限期整改、暂停业务。1000 万欧元或全球营收 2% 是基线罚款,管理层个人还可能被追责。2025 年起医院、电力公司被罚的案例陆续曝光,真不是吓唬人。'
          },
      faq: [
            {
              q: '我卖英国市场,需要看 CRA 和 NIS2 吗?',
              a: '英国脱欧了,这两个都不直接适用。但你的买家如果在欧盟市场,他反过来会要求你提供合规文件,基本绕不开。亚马逊英国站目前没强制,但欧盟站强制。'
            },
            {
              q: '亚马逊要 DoC,小卖家预算不够怎么办?',
              a: '自己先按 CRA 要求做一遍自评(默认密码、漏洞更新机制),找认证实验室出报告(预算 3000-8000 欧),再生成 DoC 模板提交亚马逊。预算紧就先做核心 SKU,逐步铺开。'
            },
            {
              q: '罚款真的会执行吗?',
              a: `GDPR 刚开始也是各种'不会真罚',最后 Meta 被罚 12 亿欧元。CRA 和 NIS2 都有具体执法机关,2026 年起开始落地罚款案例,别赌监管手软。`
            },
            {
              q: '我同时触发 CRA 和 NIS2,文件要做两套吗?',
              a: '是。两份独立的合规体系——CRA 是产品的技术文档(漏洞披露机制、SBOM、5 年支持计划),NIS2 是企业的治理体系(风险评估、应急响应、人员培训)。但你可以共用一份风险评估和漏洞流程文档,只是按两个口径分别归档。'
            }
          ],
      primaryRadarIds: ['eu-cra-2024-2847', 'eu-cra-2024-2847'],
      relatedRadarCategories: ['产品安全', '网络安全'],
      relatedChecklistTags: ['CRA', 'NIS2', '新卖家'],
      seoDescription: 'CRA vs NIS2 哪个跟你有关?CRA 管联网产品的网络安全(设备 + 软件),NIS2 管关键基础设施组织的网络安全(流程 + 治理)。做硬件 + 做关键基础设施的 = 两个都触发。本页用速查表 + 4 种卖家画像,1 分钟判断。',
    },

    /* ============ 8. CRA vs RED ============ */
    {
      slug: 'cra-vs-red',
      leftName: 'CRA',
      rightName: 'RED',
      leftFullName: '欧盟 CRA 网络弹性法案',
      rightFullName: '欧盟 RED 无线电设备指令',
      oneLiner: 'RED 管"无线产品的基础合规",CRA 管"网络安全的硬性义务",卖 Wi-Fi/蓝牙产品 = 两个都触发。',
      leftShort: '所有联网产品(2027-12-11 起)默认安全 + 漏洞披露',
      rightShort: '所有无线电设备(2014/53/EU)频谱 + EMC + 安全',
      quickTable: [
        { label: '管什么', left: '网络安全的硬性义务(默认安全 / 漏洞披露 / 5 年支持)', right: '无线电产品的频谱 + EMC + 安全(Article 3.3)' },
        { label: '是否强制', left: '所有联网产品(2027-12-11 起)', right: '所有无线电设备(2014/53/EU 一直有效)' },
        { label: '主要义务', left: '默认安全 + SBOM + 漏洞披露 + 5 年支持期', right: '频谱合规 + EMC + 已有网络安全条款(3.3 d/e/f)' },
        { label: '范围差异', left: '所有联网产品(不限无线)', right: '只针对含 Wi-Fi/蓝牙/4G/5G/NFC 等无线模块' },
        { label: 'DoC', left: 'EU CRA DoC 模板', right: 'EU RED DoC 模板' },
        { label: '测试要求', left: '网络安全测试(SBOM + 渗透测试)', right: 'RF 测试 + EMC 测试 + 安全评估' },
        { label: '罚款', left: '1500 万 € 或全球营收 2.5%', right: '按成员国法律(通常 1000-50000 €)' },
      ],
      leftWhat: '你只要卖带 Wi-Fi、蓝牙、4G/5G 的联网产品(智能灯泡、宠物喂食器、儿童手表、工业传感器)就得懂 CRA。它是欧盟 2024 年通过的《网络弹性法案》,管的是产品的网络安全维度——默认安全、漏洞披露、停产后维护 5 年。2027 年 12 月 11 日全面执行。罚款 1500 万欧元或全球营收 2.5%,哪个高按哪个。',
      rightWhat: `RED 是《无线电设备指令》(2014/53/EU),所有含无线电功能的产品上市欧盟都要做。它管的是频谱、电磁兼容(EMC)、电气安全。从 2022 年 2 月起 RED 加了 3.3 d/e/f 三条网络安全条款,开始往网络安全方向靠。但 RED 主要是'硬件射频能不能用',对漏洞披露、停产支持这些细节写得不如 CRA 深。`,
      personas: [
            {
              name: '卖 Wi-Fi 智能家居的卖家(智能插座、智能灯、扫地机器人)',
              pick: 'both',
              reason: '你产品含无线电(走 RED),还联网(走 CRA),双层合规都得做。RED 实验室出射频报告,CRA 单独出网络安全技术文档,工作量翻倍。'
            },
            {
              name: '卖蓝牙耳机的卖家(纯音频播放,没联网功能)',
              pick: 'right',
              reason: `蓝牙耳机有无线电功能,RED 一定要做。CRA 只针对'联网产品'——纯本地蓝牙连手机不算联网,暂时不在 CRA 范围。但 2027 年后细则如果收窄,建议持续关注。`
            },
            {
              name: '卖工业 4G/5G 路由器的 B2B 卖家',
              pick: 'both',
              reason: '含 4G/5G 走 RED,联网设备走 CRA。你的买家(电力公司、工厂)还会叠加 NIS2 要求,实际上是 RED + CRA + NIS2 三层。但本表只对比前两个,你看主表就行。'
            },
            {
              name: '卖儿童智能手表(含 SIM 卡,能独立联网)',
              pick: 'both',
              reason: '含蜂窝模块走 RED,独立联网又走 CRA。儿童产品还可能叠加 GDPR、儿童数据保护条款,合规压力最大的一类。'
            }
          ],
      timeline: [
            {
              date: '2014',
              what: 'RED 2014/53/EU 正式生效,替代老 R&TTE 指令'
            },
            {
              date: '2022-02',
              what: 'RED 3.3 d/e/f 网络安全条款强制执行,DoC 要含网络安全'
            },
            {
              date: '2024-10',
              what: '亚马逊开始要求联网产品提交 DoC(合规声明)'
            },
            {
              date: '2025-2026',
              what: '欧盟市场监管机构按 RED 3.3 d/e/f 大规模抽查联网产品'
            },
            {
              date: '2027-12-11',
              what: 'CRA 全面强制执行,所有联网产品必须符合'
            }
          ],
      fineRisk: {
            left: 'CRA 不做的后果:亚马逊下架、欧盟海关扣货、企业客户拒收。罚款 1500 万欧元或全球年营收 2.5%,哪个高按哪个。欧盟还会把不合规产品列入公开警告数据库,品牌名声跟着受损。',
            right: 'RED 不做的后果:罚款按成员国(德国可到 10 万欧元、法国 5-15 万欧元、意大利 5-10 万欧元),不合规产品会被亚马逊下架、欧盟海关扣押,产品上贴的 CE 标志也作废。'
          },
      faq: [
            {
              q: 'RED DoC 已经有网络安全了,CRA 来了还差什么?',
              a: `RED 3.3 d/e/f 是粗线条的'产品不能轻易被攻击';CRA 要的是 SBOM(软件物料清单)、主动漏洞报告机制、停产后 5 年安全更新、入驻欧盟漏洞数据库。RED DoC 满足不了 CRA 全部要求,得单独再写一份 CRA 技术文档。`
            },
            {
              q: '蓝牙耳机算联网产品吗?',
              a: '看功能。如果只是连手机放音乐,不能独立上网,不算联网,暂时不在 CRA 范围;如果能独立连 Wi-Fi 听流媒体(像 AirPods Pro 2 那种),算联网,CRA 要做。'
            },
            {
              q: '我有 RED CE 证书,还需要单独做 CRA 吗?',
              a: '要。CE 标志本身不变,但 CRA 是独立的合规体系——需要额外的技术文档(漏洞披露、5 年支持、SBOM)、单独的合格评定程序。RED 证书不能直接复用,得 CRA 单独跑一遍。'
            },
            {
              q: 'RED 和 CRA 哪个先做?',
              a: 'RED 先做(2022 年就强制了),产品上市时已经要 RED 合规。CRA 2027 年 12 月才强制,这两年先把 CRA 的技术文档准备起来,2026 年中试运行,2027 年底正式切换。'
            }
          ],
      primaryRadarIds: ['eu-cra-2024-2847', 'eu-gpsr-responsible-person'],
      relatedRadarCategories: ['产品安全', '网络安全', '标签与说明书'],
      relatedChecklistTags: ['CRA', 'CE', '新卖家'],
      seoDescription: 'CRA vs RED 哪个跟你有关?RED 是无线电设备指令(频谱 + EMC),CRA 是网络弹性法案(默认安全 + 漏洞披露)。卖 Wi-Fi 智能家居 = RED + CRA 双层合规。本页用速查表 + 4 种卖家画像,1 分钟判断。',
    },

    /* ============ 9. EPREL vs Energy Label ============ */
    {
      slug: 'eprel-vs-energylabel',
      leftName: 'EPREL',
      rightName: 'Energy Label',
      leftFullName: 'EPREL 欧盟能效产品数据库',
      rightFullName: 'Energy Label 能效标签',
      oneLiner: 'EPREL 是后台数据库(产品上市前登记),Energy Label 是产品上贴的能效标签,卖电器 = 两个都做。',
      leftShort: '产品能效数据库,产品上市前必须登记',
      rightShort: '产品上贴的物理能效标签(A-G 级)',
      quickTable: [
        { label: '管什么', left: '产品能效数据(后台登记)', right: '产品能效展示(物理贴纸)' },
        { label: '是否强制', left: '欧盟销售的特定能效产品(冰箱/洗衣机/灯/电视/轮胎等)', right: '同上,需要能效标签的所有产品' },
        { label: '主要义务', left: '测能效 + 在 EPREL 数据库登记型号 + 技术参数', right: '按 EPREL 数据打印标签 + 贴到产品包装' },
        { label: '顺序', left: '第 1 步:登记(上市前)', right: '第 2 步:打标签(生产时)' },
        { label: '新规变化', left: '2021 起新规:等级从 A+++ 至 D 改成 A 到 G', right: '同上' },
        { label: '亚马逊要求', left: '后台提交 EPREL 登记号', right: '上传产品标签图片' },
        { label: '罚款', left: '1000-50000 €(看国家)', right: '1000-10000 € + 海关扣货' },
      ],
      leftWhat: '你卖欧盟能效产品(冰箱、洗衣机、洗碗机、电视、灯、轮胎)前,必须先去 EPREL 登记。EPREL 是欧盟的产品能效数据库,网址 eprel.ec.europa.eu,免费注册。你要提交型号、技术参数(能效等级、噪音、能耗)、供应商信息,系统给你一个登记号。没这个号,产品不能上市,海关也会扣。',
      rightWhat: 'Energy Label 是产品包装和机身上贴的物理标签,显示能效等级(A 到 G 七个等级,新规下大多只能拿到 D/E/F)。它和 EPREL 是配对关系——先在 EPREL 登记拿到技术参数,再用欧盟官方生成的 QR 码和等级图打印成标签,贴到产品上。消费者扫 QR 码能直接看到你在 EPREL 上传的数据。',
      personas: [
            {
              name: '卖大家电的卖家(冰箱、洗衣机、洗碗机、烤箱)',
              pick: 'both',
              reason: `大家电是 EPREL 强制清单的'重灾区',从 2021 年能效改革后就必须先登记后贴标。两步顺序错了(先打印标签没登记),产品直接违规,下架扣货一条龙。`
            },
            {
              name: '卖 LED 灯泡、智能灯具的卖家',
              pick: 'both',
              reason: '光源类 2023 年 9 月起强制能效标签,EPREL 登记 + 物理标签都要做。智能灯具如果带联网功能还会叠加 CRA,本表先只对比能效这部分。'
            },
            {
              name: '卖轮胎的卖家(汽车、电动车胎)',
              pick: 'both',
              reason: '轮胎 2021 年 5 月起强制能效标签,EPREL + 标签都得做。轮胎还要管抓地力、噪音等级,参数比其他品类多,登记时要一次性提交完整数据。'
            },
            {
              name: '卖智能音箱、智能手表(没列入能效清单的产品)',
              pick: 'neither',
              reason: '智能音箱、手表目前不在能效强制清单里,EPREL 不强制登记,也不用贴 Energy Label。但如果产品有联网功能,要走 CRA 合规,本表不展开。'
            }
          ],
      timeline: [
            {
              date: '2021-03',
              what: '大家电能效标签改革,从 A+++-D 改为 A-G'
            },
            {
              date: '2021-05',
              what: '轮胎强制能效标签 + EPREL 登记'
            },
            {
              date: '2023-09',
              what: '灯具(光源)能效标签改革,新规强制执行'
            },
            {
              date: '2024-2025',
              what: '欧盟市场监管机构加强 EPREL 数据真实性抽查'
            },
            {
              date: '2025-2026',
              what: '新一批品类(吸尘器、热水器等)陆续纳入能效清单'
            }
          ],
      fineRisk: {
            left: '没在 EPREL 登记就上市,罚款 1000-50000 €(按国家差异大)。德国监管严格,英国脱欧后也保留了类似处罚机制。同时产品会被亚马逊下架、欧盟海关扣押,企业买家也会拒收。',
            right: `标签错误或没贴,罚款 1000-10000 €,亚马逊下架 + 海关扣货。最麻烦的是等级错标——比如把 E 标成 C,会被市场监管部门定性为'误导消费者',罚款 + 公开召回 + 销毁标签,损失可能上百万。`
          },
      faq: [
            {
              q: '先打印标签还是先登记 EPREL?',
              a: `一定先登记 EPREL。登记完拿到 QR 码和技术参数,才能打印合规标签。顺序反了,即使标签本身做对了也是违规,海关和监管会按'无登记'处罚。`
            },
            {
              q: 'QR 码丢了能补吗?',
              a: '重新登录 EPREL 后台下载。建议批量生产前先在 EPREL 上确认数据无误,再批量打标签,避免重印浪费成本。'
            },
            {
              q: '能效等级自己测还是找实验室?',
              a: '必须有资质的第三方实验室出报告,然后才能填到 EPREL。自我声明会被监管机构盯上,抽查时一旦发现数据对不上,罚款 + 召回 + 公开曝光,损失比找实验室贵得多。'
            },
            {
              q: '我卖的产品不在能效清单里,需要做吗?',
              a: '不需要。EPREL 强制清单由欧盟不断更新,目前主要是大家电、灯具、轮胎三大类。可以上 eprel.ec.europa.eu 看最新清单,新品类(吸尘器等)2025-2026 年陆续加入。'
            }
          ],
      primaryRadarIds: ['eu-eprel-energy-label', 'eu-gpsr-responsible-person'],
      relatedRadarCategories: ['产品安全', '环保合规', '标签与说明书'],
      relatedChecklistTags: ['EPREL', '能效', '上架'],
      seoDescription: 'EPREL vs Energy Label 哪个跟你有关?EPREL 是后台数据库(产品型号登记),Energy Label 是产品上贴的能效标签。卖家电 / 灯具 / 轮胎 = 两个都做。本页用速查表 + 4 种卖家画像,1 分钟判断。',
    },

    /* ============ 10. OSS vs VAT ============ */
    {
      slug: 'oss-vs-vat',
      leftName: 'OSS',
      rightName: 'VAT',
      leftFullName: 'OSS 欧盟一站式申报',
      rightFullName: 'VAT 增值税',
      oneLiner: 'OSS 是"非欧盟卖家跨境 B2C 的简化申报",VAT 是"所有销售的税",无欧盟库存选 OSS,有库存选 VAT。',
      leftShort: '非欧盟卖家在欧盟跨境销售(无库存)的简化申报',
      rightShort: '欧盟销售税,所有 B2C 卖家都要交',
      quickTable: [
        { label: '是什么', left: 'One-Stop Shop 跨境 B2C 一站式申报(2021-07 生效)', right: 'Value Added Tax 欧盟销售税(各国 17-27%)' },
        { label: '适用卖家', left: '非欧盟卖家在欧盟无库存 + 跨境 B2C 销售', right: '所有 B2C 卖家(无论有库存 / 跨境)' },
        { label: '注册数量', left: '1 个 OSS 号覆盖全欧 27 国', right: '有库存的每个国家都要注册 + 1 个' },
        { label: '门槛', left: '无金额限制(无库存即可)', right: '无门槛(所有 B2C 销售)' },
        { label: '申报频率', left: '季报', right: '月报 / 季报(看国家)' },
        { label: 'OSS vs IOSS 区别', left: 'OSS 管所有跨境 B2C', right: 'IOSS 只管 < 150 € 跨境小包' },
        { label: '没做的后果', left: '罚款 1000-10000 € + 追溯补缴', right: '罚款 1000-5000 € + 海关扣货(看国家)' },
      ],
      leftWhat: 'OSS(One-Stop Shop)是你作为非欧盟卖家在欧盟跨境 B2C 销售的简化申报通道。1 个 OSS 税号能覆盖 27 个欧盟成员国,每季度一次性申报所有欧盟订单的 VAT,按买家所在国的税率交税。2021 年 7 月 1 日生效。OSS 本身不收税,它只是申报方式,真正交的还是 VAT。',
      rightWhat: 'VAT(增值税)是欧盟所有 B2C 销售必须交的消费税,税率 17-27%(德国 19%、法国 20%、意大利 22%、匈牙利 27%)。你在欧盟有库存就按各国 VAT 注册(每国一个税号);没库存、做跨境直邮或远程销售,就走 OSS 一次搞定。OSS 是通道,VAT 是税——这俩是配对关系,不是二选一。',
      personas: [
            {
              name: '中国卖家亚马逊 FBA(在德国仓/法国仓发货)',
              pick: 'neither',
              reason: `FBA 在欧盟有库存,直接走仓库所在国的 VAT 注册和申报,亚马逊也会帮你代扣代缴。OSS 是给'无库存跨境直邮'准备的,你用 FBA 不需要 OSS。`
            },
            {
              name: '中国卖家从国内直邮给欧盟消费者(跨境 B2C,无库存)',
              pick: 'both',
              reason: '你卖货要交 VAT(按买家所在国税率),用 OSS 一次性申报 27 国。OSS 是你的申报通道,VAT 是你要交的税,两个一起跑才合规。'
            },
            {
              name: '中国卖家做 B2B(把货卖给欧盟分销商或零售商)',
              pick: 'neither',
              reason: 'B2B 不走 OSS,B2B 走反向收取(reverse charge)——你的欧盟买家自己申报 VAT 抵扣。你只需要有欧盟 VAT 税号开发票就行。'
            },
            {
              name: '欧盟本地公司跨成员国卖货(德国公司卖到法国/意大利)',
              pick: 'both',
              reason: '本地公司也可以选 OSS 简化申报(避免 27 国分别注册),也可以各国分别注册。OSS 不是非欧盟卖家专属,本地公司也能用,但要看你销售额量级。'
            }
          ],
      timeline: [
            {
              date: '2021-07-01',
              what: 'OSS 正式生效,替代之前分散的 MOSS 系统'
            },
            {
              date: '2021-07-01',
              what: 'IOSS 同步生效,管 < 150 € 的跨境小包'
            },
            {
              date: '2024-2025',
              what: '欧盟成员国税务局开始对未注册 OSS 的卖家邮件警告'
            },
            {
              date: '2025-09',
              what: '亚马逊开始强制要求非欧盟卖家提供 OSS 号或 IOSS 号'
            }
          ],
      fineRisk: {
            left: '没注册 OSS 就跨境卖货,罚款 1000-10000 €(按国家),还要追溯补缴 VAT(可能追 5 年)。如果金额大,补缴 + 罚款 + 滞纳金加起来能到货值的 20-40%。',
            right: '偷税漏 VAT 的处罚更狠:德国按未缴 VAT 的 10% 罚款,法国 40%,意大利 30%。欧盟还在推进跨境电商 VAT 大数据联网,2026 年起未申报的订单会更容易被监管自动发现。'
          },
      faq: [
            {
              q: 'OSS 和 IOSS 到底啥区别?',
              a: 'IOSS(Import One-Stop Shop)只管 150 € 以下的跨境小包,1 个税号搞定清关 + 申报;OSS 管所有跨境 B2C,没金额限制。卖高价商品(家具、家电)走 OSS;卖 < 150 € 配件走 IOSS 更划算(免小额进口 VAT)。'
            },
            {
              q: '我用亚马逊 FBA,还需要 OSS 吗?',
              a: 'FBA 部分不需要,亚马逊会按库存所在国 VAT 帮你代扣。但你自己从国内直邮给欧盟客户的部分(不在 FBA 仓的)要走 OSS。两个渠道分清楚,别混。'
            },
            {
              q: 'OSS 税率按哪个国家算?',
              a: '按买家收货地址所在国的 VAT 税率(不是你的注册国)。德国买家按 19%,法国买家按 20%,意大利买家按 22%。OSS 系统自动按配送地址匹配税率,你申报时不用自己算。'
            },
            {
              q: '怎么注册 OSS?',
              a: '在欧盟任一成员国(一般是你的中介机构所在国,比如爱尔兰、荷兰)税务局网站申请。需要先有欧盟 VAT 税号。找代理办的话 1000-3000 元人民币,自己办免费但手续复杂。'
            },
            {
              q: '暂停销售时 OSS 要取消吗?',
              a: '至少 1 个季度内没有销售就可以申请注销。但注销前的申报义务还在,补申报漏报会有罚款。建议保留 OSS 号,重新开卖时不用再走一次注册流程。'
            }
          ],
      primaryRadarIds: ['eu-ioss-vat', 'eu-ioss-vat'],
      relatedRadarCategories: ['税务', '跨境物流', '平台合规'],
      relatedChecklistTags: ['OSS', 'VAT', '跨境', '新卖家'],
      seoDescription: 'OSS vs VAT 哪个跟你有关?OSS 是非欧盟卖家在欧盟无库存跨境销售的简化申报(1 个号覆盖全欧),VAT 是所有 B2C 卖家都要交的税。无库存选 OSS,有库存选 VAT。本页用速查表 + 4 种卖家画像,1 分钟判断。',
    },
  ];
}
