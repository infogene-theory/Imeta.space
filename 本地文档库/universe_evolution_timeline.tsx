import React, { useState } from 'react';
import { Thermometer, Layers, Zap, AlertCircle, CheckCircle } from 'lucide-react';

const TemperatureLayerEvolution = () => {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [viewMode, setViewMode] = useState('structure'); // 'structure' or 'timeline'

  // 核心系统的温度分层数据
  const systems = [
    {
      id: 'sun',
      name: '太阳（恒星典型）',
      age: '46亿年',
      status: '中期稳态',
      layers: [
        {
          name: '外层（光球-日冕）',
          tempRange: '5800K → 数百万K',
          energy: '低（已辐射）',
          density: '稀薄',
          role: '能量出口',
          characteristics: '低密度、快速响应、不稳定但无关紧要',
          physics: '辐射主导，热能持续逃逸'
        },
        {
          name: '中层（辐射层+对流层）',
          tempRange: '200万K → 5800K',
          energy: '中等（调制中）',
          density: '适中',
          role: '温度窗口层（关键）',
          characteristics: '能量涨落被驯化，允许长期结构存在',
          physics: '温度梯度稳定，能量缓慢输运，这是恒星寿命的决定层',
          isKey: true
        },
        {
          name: '内层（核心）',
          tempRange: '~1500万K',
          energy: '极高（核聚变）',
          density: '极高',
          role: '能量源',
          characteristics: '高熵生产，但不决定结构',
          physics: '氢→氦核聚变，提供能量差'
        }
      ],
      windowWidth: '200万K',
      stability: '极高',
      lifespan: '~100亿年',
      keyInsight: '中层温度窗口极宽（百万级跨度），使能量输出可以延续数十亿年'
    },
    {
      id: 'early_earth',
      name: '早期地球（熔融态）',
      age: '46-40亿年前',
      status: '初期不稳定',
      layers: [
        {
          name: '外层（原始大气+地壳）',
          tempRange: '300K → 1500K',
          energy: '低（冷却中）',
          density: '稀薄→固化',
          role: '能量出口',
          characteristics: '快速冷却，地壳反复破裂重组',
          physics: '辐射冷却+对流散热'
        },
        {
          name: '中层（地幔）',
          tempRange: '1500K → 4000K',
          energy: '中等',
          density: '粘性流体',
          role: '温度窗口层',
          characteristics: '岩浆对流，温度波动大',
          physics: '对流主导，能量输运不稳定',
          isKey: true
        },
        {
          name: '内层（地核）',
          tempRange: '~5000K',
          energy: '高（放射性+引力势能）',
          density: '极高',
          role: '能量源',
          characteristics: '铁镍熔融，高温高压',
          physics: '放射性衰变+引力收缩'
        }
      ],
      windowWidth: '2500K',
      stability: '低',
      lifespan: '数亿年（此阶段）',
      keyInsight: '中层窗口虽存在，但极不稳定，频繁的能量涨落导致地质剧变'
    },
    {
      id: 'modern_earth',
      name: '现代地球（固态壳）',
      age: '现在',
      status: '中期稳态',
      layers: [
        {
          name: '外层（地壳+大气+水圈）',
          tempRange: '200K → 350K',
          energy: '极低',
          density: '固态+气态',
          role: '能量出口+生命载体',
          characteristics: '温度极度稳定，允许液态水长期存在',
          physics: '太阳辐射+内热平衡'
        },
        {
          name: '中层（地幔）',
          tempRange: '1500K → 4000K',
          energy: '中等',
          density: '粘性固体',
          role: '温度窗口层',
          characteristics: '缓慢对流，板块运动',
          physics: '极缓慢的固态对流，能量输运高度稳定',
          isKey: true
        },
        {
          name: '内层（地核）',
          tempRange: '~5000K',
          energy: '中高（持续异常）',
          density: '极高',
          role: '能量源+磁场',
          characteristics: '外核液态（磁发电机），内核固态',
          physics: '放射性衰变（20TW）+未知来源（27TW）'
        }
      ],
      windowWidth: '2500K',
      stability: '高',
      lifespan: '>30亿年（已持续）',
      keyInsight: '中层虽窄，但极稳定。外层温度窗口（200-350K）孕育生命。内热异常暗示外部能量输入？'
    },
    {
      id: 'cell',
      name: '生物细胞',
      age: '38亿年前起源',
      status: '主动稳态',
      layers: [
        {
          name: '外层（细胞膜+细胞壁）',
          tempRange: '与环境平衡',
          energy: '低（选择性交换）',
          density: '半透膜',
          role: '能量/物质门控',
          characteristics: '主动调控物质进出，维持内外温度差',
          physics: '离子泵、蛋白质通道'
        },
        {
          name: '中层（细胞质）',
          tempRange: '273-323K（液态水）',
          energy: '中等',
          density: '水溶液',
          role: '温度窗口层（生化反应）',
          characteristics: '酶促反应的最优温度区间',
          physics: 'ATP水解驱动的化学反应网络',
          isKey: true
        },
        {
          name: '内层（线粒体/核心代谢）',
          tempRange: '局部可能稍高',
          energy: '高（ATP生产）',
          density: '高度组织',
          role: '能量工厂',
          characteristics: '电子传递链，质子梯度',
          physics: '氧化磷酸化，化学能转换'
        }
      ],
      windowWidth: '50K',
      stability: '极高（主动维持）',
      lifespan: '小时-年（个体），数十亿年（物种）',
      keyInsight: '中层温度窗口极窄（273-323K），但通过主动代谢精确维持。这是从被动到主动的革命性跃迁'
    },
    {
      id: 'dead_mars',
      name: '死亡火星（对照组）',
      age: '~45亿年',
      status: '晚期衰亡',
      layers: [
        {
          name: '外层（表面）',
          tempRange: '130K → 300K（日夜）',
          energy: '极低',
          density: '固态',
          role: '冻结壳',
          characteristics: '大气稀薄，温度剧烈波动',
          physics: '纯辐射冷却，无调控'
        },
        {
          name: '中层（地幔）',
          tempRange: '？（可能已冷却）',
          energy: '极低',
          density: '固化',
          role: '失效的窗口层',
          characteristics: '温度窗口消失或极窄',
          physics: '对流停止，热传导主导',
          isKey: true,
          isDead: true
        },
        {
          name: '内层（地核）',
          tempRange: '？（可能<2000K）',
          energy: '低',
          density: '高',
          role: '冷却的能量源',
          characteristics: '磁场消失（~40亿年前）',
          physics: '放射性衰变微弱，引力能耗尽'
        }
      ],
      windowWidth: '<500K？',
      stability: '无（已死亡）',
      lifespan: '活跃期<5亿年',
      keyInsight: '中层温度窗口过早消失 → 磁场消失 → 大气剥离 → 表面冻结。这是温度分层失效的典型案例'
    }
  ];

  // 时间线数据
  const timeline = [
    {
      time: '138亿年前',
      event: '大爆炸',
      tempLayer: '极端高温（>10³²K）',
      windowStatus: '不存在',
      description: '纯能量态，无结构分层'
    },
    {
      time: '38万年后',
      event: 'CMB形成',
      tempLayer: '~3000K → 2.7K',
      windowStatus: '全宇宙单一温度',
      description: '相干锁定完成，但无局部温度梯度'
    },
    {
      time: '2亿年后',
      event: '第一代恒星',
      tempLayer: '外5800K，核心千万K',
      windowStatus: '首次出现稳定温度窗口',
      description: '核聚变建立三层结构，宇宙进入"温度分层时代"'
    },
    {
      time: '92亿年后',
      event: '太阳系/地球',
      tempLayer: '地球外300K，核心5000K',
      windowStatus: '行星级温度窗口建立',
      description: '引力势能转化为分层热结构'
    },
    {
      time: '100亿年后',
      event: '生命起源',
      tempLayer: '细胞内273-323K',
      windowStatus: '纳米级温度窗口（主动）',
      description: '首次出现主动维持温度窗口的系统'
    },
    {
      time: '现在',
      event: '智能文明',
      tempLayer: '人体36.5-37.5°C',
      windowStatus: '极窄窗口+全球调控',
      description: '个体温度窗口±1K，但调控范围扩展至全球气候'
    }
  ];

  const renderStructureView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map(sys => (
          <div
            key={sys.id}
            className={`bg-slate-800 rounded-lg p-4 border-2 cursor-pointer transition-all ${
              selectedSystem?.id === sys.id
                ? 'border-blue-500 shadow-lg shadow-blue-500/50'
                : 'border-slate-700 hover:border-slate-600'
            }`}
            onClick={() => setSelectedSystem(sys)}
          >
            <h3 className="text-xl font-bold mb-2">{sys.name}</h3>
            <div className="space-y-1 text-sm">
              <p className="text-slate-400">年龄: {sys.age}</p>
              <p className="text-slate-400">状态: <span className={sys.status.includes('死亡') ? 'text-red-400' : 'text-green-400'}>{sys.status}</span></p>
              <p className="text-slate-400">窗口宽度: <span className="text-yellow-300">{sys.windowWidth}</span></p>
              <p className="text-slate-400">稳定性: <span className="text-blue-300">{sys.stability}</span></p>
            </div>
          </div>
        ))}
      </div>

      {selectedSystem && (
        <div className="bg-slate-800 rounded-lg p-6 border border-blue-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6" />
            {selectedSystem.name} - 温度分层结构
          </h2>
          
          <div className="mb-6 p-4 bg-blue-900/30 rounded border border-blue-700">
            <p className="text-lg font-semibold text-blue-300 mb-2">核心洞察：</p>
            <p className="text-slate-200">{selectedSystem.keyInsight}</p>
          </div>

          <div className="space-y-4">
            {selectedSystem.layers.map((layer, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${
                  layer.isKey
                    ? layer.isDead
                      ? 'bg-red-900/20 border-red-600'
                      : 'bg-yellow-900/20 border-yellow-600'
                    : 'bg-slate-700/50 border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {layer.name}
                      {layer.isKey && (
                        layer.isDead ? (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-yellow-400" />
                        )
                      )}
                    </h3>
                    {layer.isKey && (
                      <p className="text-sm text-yellow-300 mt-1">
                        {layer.isDead ? '⚠️ 失效的温度窗口层' : '🔑 关键温度窗口层'}
                      </p>
                    )}
                  </div>
                  <Thermometer className="w-6 h-6 text-red-400" />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div className="bg-slate-800/50 p-2 rounded">
                    <p className="text-slate-400">温度范围</p>
                    <p className="text-orange-300 font-bold">{layer.tempRange}</p>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded">
                    <p className="text-slate-400">能量水平</p>
                    <p className="text-red-300 font-bold">{layer.energy}</p>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded">
                    <p className="text-slate-400">密度</p>
                    <p className="text-blue-300 font-bold">{layer.density}</p>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded">
                    <p className="text-slate-400">功能角色</p>
                    <p className="text-green-300 font-bold">{layer.role}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-400 font-semibold">特征：</p>
                    <p className="text-slate-200">{layer.characteristics}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-semibold">物理机制：</p>
                    <p className="text-slate-300 italic">{layer.physics}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTimelineView = () => (
    <div className="space-y-6">
      {timeline.map((node, idx) => (
        <div key={idx} className="relative pl-8 pb-8 border-l-2 border-blue-500">
          <div className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-blue-500 border-4 border-slate-900"></div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-blue-300">{node.event}</h3>
              <span className="text-sm text-slate-400">{node.time}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-slate-700/50 p-2 rounded">
                <p className="text-slate-400">温度层次</p>
                <p className="text-orange-300 font-bold">{node.tempLayer}</p>
              </div>
              <div className="bg-slate-700/50 p-2 rounded">
                <p className="text-slate-400">窗口状态</p>
                <p className="text-yellow-300 font-bold">{node.windowStatus}</p>
              </div>
              <div className="bg-slate-700/50 p-2 rounded col-span-1 md:col-span-1">
                <p className="text-slate-200">{node.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-lg">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          温度分层：宇宙演化的硬物理主线
        </h1>
        <p className="text-slate-300 text-lg mb-4">
          从恒星到生命，统一的三层结构：外层（能量出口）→ 中层（温度窗口）→ 内层（能量源）
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('structure')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'structure'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            结构对比
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'timeline'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            演化时间线
          </button>
        </div>
      </div>

      <div className="mb-6 bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
        <h2 className="text-xl font-bold text-yellow-300 mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          核心物理定律
        </h2>
        <div className="space-y-2 text-sm text-slate-200">
          <p>1️⃣ <strong>引力势能</strong>向内转化为热能（压缩生热）</p>
          <p>2️⃣ <strong>能量向外</strong>输运（辐射/对流，热力学第二定律）</p>
          <p>3️⃣ <strong>高熵向外</strong>扩散（不可逆，但速度可调控）</p>
          <p className="text-yellow-300 font-semibold mt-3">
            → 任何自引力天体必然形成"外冷-中温-内热"的三层结构
          </p>
        </div>
      </div>

      {viewMode === 'structure' ? renderStructureView() : renderTimelineView()}

      <div className="mt-8 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4">终极洞察</h2>
        <div className="space-y-3 text-slate-200">
          <p className="text-lg font-semibold text-blue-300">
            星体能否形成、能否长期存在，决定因素不是"热不热"，而是：
          </p>
          <div className="bg-blue-900/30 p-4 rounded border border-blue-700">
            <p className="text-xl font-bold text-center text-yellow-300">
              是否存在一个可长期维持的中层温度窗口
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-700/50 p-3 rounded">
              <p className="font-semibold text-red-300">内层提供能量差</p>
              <p className="text-sm text-slate-400">高熵源，但不决定结构</p>
            </div>
            <div className="bg-yellow-900/30 p-3 rounded border border-yellow-700">
              <p className="font-semibold text-yellow-300">中层驯化涨落</p>
              <p className="text-sm text-slate-300">把高熵能量转化为稳定结构</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded">
              <p className="font-semibold text-blue-300">外层负责释放</p>
              <p className="text-sm text-slate-400">低密度，快速响应</p>
            </div>
          </div>
          <p className="mt-4 text-slate-300 italic">
            恒星之所以成立，正是因为它在极端高能与低能辐射之间，成功维持了这一温度层次。
            生命之所以出现，是因为细胞将这一原则推向极致：主动维持极窄的温度窗口（273-323K）。
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureLayerEvolution;