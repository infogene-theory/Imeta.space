import React, { useState } from 'react';
import { Activity, Heart, Thermometer, Clock, TrendingUp, BookOpen, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const IGTMedicalPlatform = () => {
  const [activeTab, setActiveTab] = useState('monitor');
  const [healthData, setHealthData] = useState({
    coreTemp: 36.8,
    heartRate: 72,
    hrvSDNN: 55,
    rhythmR: 0.75,
    coherenceC: 0.65,
    entropyRatio: 0.45
  });
  
  const [symptomData, setSymptomData] = useState({
    fatigue: false,
    headache: false,
    coldHands: false,
    insomnia: false,
    appetite: 'normal'
  });

  // 计算健康状态
  const calculateHealthStatus = () => {
    const { coherenceC, entropyRatio, coreTemp, rhythmR } = healthData;
    
    // 太极态判断
    const inTaijiZone = (
      coherenceC >= 0.63 && coherenceC <= 0.68 &&
      entropyRatio >= 0.43 && entropyRatio <= 0.47 &&
      coreTemp >= 36.5 && coreTemp <= 37.0 &&
      rhythmR >= 0.7
    );
    
    if (inTaijiZone) {
      return { status: 'excellent', color: 'green', text: '太极态 - 理想健康状态' };
    } else if (coherenceC < 0.6 || entropyRatio > 0.55) {
      return { status: 'warning', color: 'orange', text: '阳亢态 - 建议降温调理' };
    } else if (coherenceC > 0.72 || entropyRatio < 0.35) {
      return { status: 'warning', color: 'blue', text: '阴盛态 - 建议温阳疏通' };
    } else {
      return { status: 'good', color: 'yellow', text: '亚健康 - 需要调整' };
    }
  };

  const healthStatus = calculateHealthStatus();

  // 监测面板
  const MonitorPanel = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="text-blue-600" />
          实时健康监测
        </h2>
        
        {/* 整体状态 */}
        <div className={`bg-white p-4 rounded-lg mb-4 border-2 border-${healthStatus.color}-400`}>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">当前状态:</span>
            <span className={`text-xl font-bold text-${healthStatus.color}-600`}>
              {healthStatus.text}
            </span>
          </div>
        </div>

        {/* IGT核心参数 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">相干性 C</div>
            <div className="text-2xl font-bold text-blue-600">{healthData.coherenceC}</div>
            <div className="text-xs text-gray-500">目标: 0.63-0.68</div>
            <input 
              type="range" 
              min="0.5" 
              max="0.8" 
              step="0.01" 
              value={healthData.coherenceC}
              onChange={(e) => setHealthData({...healthData, coherenceC: parseFloat(e.target.value)})}
              className="w-full mt-2"
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">熵涨落比 δS/⟨S⟩</div>
            <div className="text-2xl font-bold text-purple-600">{healthData.entropyRatio}</div>
            <div className="text-xs text-gray-500">目标: 0.43-0.47</div>
            <input 
              type="range" 
              min="0.2" 
              max="0.7" 
              step="0.01" 
              value={healthData.entropyRatio}
              onChange={(e) => setHealthData({...healthData, entropyRatio: parseFloat(e.target.value)})}
              className="w-full mt-2"
            />
          </div>
        </div>

        {/* 温度与节律参数 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="text-red-500" size={20} />
              <span className="text-sm text-gray-600">核心温度</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{healthData.coreTemp}°C</div>
            <div className="text-xs text-gray-500">正常: 36.5-37.0°C</div>
            <input 
              type="range" 
              min="35.5" 
              max="38.5" 
              step="0.1" 
              value={healthData.coreTemp}
              onChange={(e) => setHealthData({...healthData, coreTemp: parseFloat(e.target.value)})}
              className="w-full mt-2"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-pink-500" size={20} />
              <span className="text-sm text-gray-600">心率变异性 HRV</span>
            </div>
            <div className="text-2xl font-bold text-pink-600">{healthData.hrvSDNN}ms</div>
            <div className="text-xs text-gray-500">正常: >50ms</div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              step="1" 
              value={healthData.hrvSDNN}
              onChange={(e) => setHealthData({...healthData, hrvSDNN: parseInt(e.target.value)})}
              className="w-full mt-2"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-rose-500" size={20} />
              <span className="text-sm text-gray-600">静息心率</span>
            </div>
            <div className="text-2xl font-bold text-rose-600">{healthData.heartRate}次/分</div>
            <div className="text-xs text-gray-500">正常: 60-100次/分</div>
            <input 
              type="range" 
              min="50" 
              max="120" 
              step="1" 
              value={healthData.heartRate}
              onChange={(e) => setHealthData({...healthData, heartRate: parseInt(e.target.value)})}
              className="w-full mt-2"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-indigo-500" size={20} />
              <span className="text-sm text-gray-600">节律规整度 R</span>
            </div>
            <div className="text-2xl font-bold text-indigo-600">{healthData.rhythmR}</div>
            <div className="text-xs text-gray-500">正常: ≥0.7</div>
            <input 
              type="range" 
              min="0.4" 
              max="0.9" 
              step="0.01" 
              value={healthData.rhythmR}
              onChange={(e) => setHealthData({...healthData, rhythmR: parseFloat(e.target.value)})}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* 个性化建议 */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-4">个性化调理建议</h3>
        <div className="space-y-3">
          {healthData.coherenceC < 0.63 && (
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="text-orange-500 mt-1" size={20} />
              <div>
                <div className="font-semibold text-orange-800">相干性偏低 - 系统协调性不足</div>
                <div className="text-sm text-orange-700">建议: 规律作息、HRV生物反馈训练、八段锦调和气机</div>
              </div>
            </div>
          )}
          
          {healthData.entropyRatio > 0.55 && (
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="text-red-500 mt-1" size={20} />
              <div>
                <div className="font-semibold text-red-800">熵涨落过大 - 内部波动失控</div>
                <div className="text-sm text-red-700">建议: 降温策略、平肝潜阳(天麻钩藤饮)、冷敷肝区、足浴引火下行</div>
              </div>
            </div>
          )}

          {healthData.entropyRatio < 0.35 && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="text-blue-500 mt-1" size={20} />
              <div>
                <div className="font-semibold text-blue-800">熵涨落不足 - 系统活力低下</div>
                <div className="text-sm text-blue-700">建议: 温阳策略、健脾扶正(参苓白术散)、艾灸中脘、适度运动</div>
              </div>
            </div>
          )}

          {healthData.coreTemp < 36.5 && (
            <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
              <Thermometer className="text-cyan-500 mt-1" size={20} />
              <div>
                <div className="font-semibold text-cyan-800">核心温度偏低 - 阳气不足</div>
                <div className="text-sm text-cyan-700">建议: 温阳补气、姜茶红糖水、避免寒凉饮食</div>
              </div>
            </div>
          )}

          {healthData.rhythmR < 0.7 && (
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <Clock className="text-purple-500 mt-1" size={20} />
              <div>
                <div className="font-semibold text-purple-800">节律紊乱 - 昼夜节律失调</div>
                <div className="text-sm text-purple-700">建议: 22:00前入睡、晨起接受自然光30分钟、避免夜间蓝光</div>
              </div>
            </div>
          )}

          {healthStatus.status === 'excellent' && (
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-500 mt-1" size={20} />
              <div>
                <div className="font-semibold text-green-800">恭喜！您处于理想的太极态</div>
                <div className="text-sm text-green-700">继续保持: 规律作息、均衡饮食、适度运动、情志平和</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // 诊断工具
  const DiagnosisPanel = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">四维探查诊断工具</h2>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">症状输入</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={symptomData.fatigue}
                onChange={(e) => setSymptomData({...symptomData, fatigue: e.target.checked})}
                className="w-4 h-4"
              />
              <span>乏力疲劳</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={symptomData.headache}
                onChange={(e) => setSymptomData({...symptomData, headache: e.target.checked})}
                className="w-4 h-4"
              />
              <span>头晕头痛</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={symptomData.coldHands}
                onChange={(e) => setSymptomData({...symptomData, coldHands: e.target.checked})}
                className="w-4 h-4"
              />
              <span>手足冰凉</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={symptomData.insomnia}
                onChange={(e) => setSymptomData({...symptomData, insomnia: e.target.checked})}
                className="w-4 h-4"
              />
              <span>失眠多梦</span>
            </label>
          </div>
        </div>

        {/* IFSS系统故障定位 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">IFSS系统故障分析</h3>
          
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <div className="font-semibold text-blue-900">输入环节状态</div>
              <div className="text-sm text-blue-800 mt-2">
                {symptomData.appetite === 'poor' ? 
                  '⚠️ 检测到输入通道异常 - 食欲不振，中焦功能低下' : 
                  '✓ 输入通道正常'}
              </div>
            </div>

            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <div className="font-semibold text-purple-900">处理环节状态</div>
              <div className="text-sm text-purple-800 mt-2">
                {healthData.coherenceC < 0.6 || healthData.entropyRatio > 0.55 ? 
                  '⚠️ 检测到处理模块异常 - 肝系统(相位调节器)失调' : 
                  '✓ 处理中枢正常'}
              </div>
            </div>

            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <div className="font-semibold text-green-900">输出环节状态</div>
              <div className="text-sm text-green-800 mt-2">
                {symptomData.coldHands ? 
                  '⚠️ 检测到输出通道受阻 - 外冷界面(EEI)熵排放不畅' : 
                  '✓ 输出通道通畅'}
              </div>
            </div>
          </div>
        </div>

        {/* 中西医协同建议 */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">协同治疗方案</h3>
          
          {symptomData.headache && healthData.coherenceC < 0.6 && (
            <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <div className="font-bold text-red-800 mb-2">诊断: 肝阳上亢型高血压前期</div>
              <div className="space-y-2 text-sm">
                <div><strong>中医策略:</strong> 平肝潜阳 - 天麻钩藤饮加减</div>
                <div><strong>西医策略:</strong> 监测血压，必要时短期降压药</div>
                <div><strong>温度管理:</strong> 肝区冷敷15分钟/日，涌泉穴按摩引火下行</div>
                <div><strong>目标:</strong> C值 0.58→0.64, δS/⟨S⟩ 0.57→0.46</div>
              </div>
            </div>
          )}

          {symptomData.fatigue && symptomData.insomnia && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="font-bold text-purple-800 mb-2">诊断: 心肾不交型慢性疲劳</div>
              <div className="space-y-2 text-sm">
                <div><strong>中医策略:</strong> 交通心肾 - 交泰丸(黄连+肉桂)</div>
                <div><strong>西医策略:</strong> 改善睡眠结构，必要时短期助眠</div>
                <div><strong>温度管理:</strong> 睡前温水泡脚+手心冷敷，调节上热下寒</div>
                <div><strong>目标:</strong> 手心-足心温差 1.7℃→0.8℃</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // 知识库
  const KnowledgePanel = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">IGT医学知识库</h2>
        
        {/* 核心理论 */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-bold text-amber-800 mb-4">核心理论精髓</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="font-bold text-lg mb-2">🌟 第一性原理</div>
              <div className="text-gray-700">
                <strong>温度即熵的涨落: T = ∂U/∂S</strong>
                <p className="mt-2 text-sm">所有演化都是温度场(熵涨落场)的动力学。温度不仅是能量的度量，更是系统有序度变化的根本驱动力。</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold text-lg mb-2">⚖️ 太极态定义</div>
              <div className="text-gray-700">
                <strong>健康的数学表达:</strong>
                <ul className="mt-2 text-sm space-y-1 ml-4">
                  <li>• 相干性 C ∈ [0.63, 0.68] - 系统协同性最佳</li>
                  <li>• 熵涨落比 δS/⟨S⟩ ∈ [0.43, 0.47] - 活力与稳定平衡</li>
                  <li>• 核心温度 36.5-37.0℃ - 热力学稳态</li>
                  <li>• 节律规整度 R ≥ 0.7 - 时间序参量有序</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-bold text-lg mb-2">🔄 三层耗散结构</div>
              <div className="text-gray-700 text-sm space-y-2">
                <div><strong>内热核心(PES):</strong> 心肝肾 - 负熵输入与转化中心</div>
                <div><strong>中温窗口(MBZ):</strong> 脾肺 - 缓冲与处理层，维持太极态</div>
                <div><strong>外冷界面(EEI):</strong> 皮肤经络 - 正熵排放通道</div>
              </div>
            </div>
          </div>
        </div>

        {/* 实用技巧 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-amber-800 mb-4">日常调理技巧</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border-2 border-red-200 rounded-lg">
              <div className="font-bold text-red-700 mb-2">🔥 降温策略(阳亢)</div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>✓ 冷敷肝区15分钟</li>
                <li>✓ 天麻钩藤饮</li>
                <li>✓ 涌泉穴按摩</li>
                <li>✓ 避免熬夜</li>
              </ul>
            </div>

            <div className="p-4 border-2 border-blue-200 rounded-lg">
              <div className="font-bold text-blue-700 mb-2">❄️ 加温策略(阴盛)</div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>✓ 艾灸中脘足三里</li>
                <li>✓ 参苓白术散</li>
                <li>✓ 温水泡脚</li>
                <li>✓ 适度运动</li>
              </ul>
            </div>

            <div className="p-4 border-2 border-purple-200 rounded-lg">
              <div className="font-bold text-purple-700 mb-2">⏰ 节律优化</div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>✓ 22:00前入睡</li>
                <li>✓ 晨起自然光30分钟</li>
                <li>✓ 规律进食时间</li>
                <li>✓ HRV生物反馈</li>
              </ul>
            </div>

            <div className="p-4 border-2 border-green-200 rounded-lg">
              <div className="font-bold text-green-700 mb-2">🍃 代谢重编程</div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>✓ 16:8间歇性禁食</li>
                <li>✓ 周期性生酮适应</li>
                <li>✓ 冷热适应训练</li>
                <li>✓ 八段锦调气</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-xl mb-6">
          <h1 className="text-4xl font-bold mb-2">信息基因论医学应用平台</h1>
          <p className="text-blue-100">IGT Medical Platform - 熵调控健康管理系统</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <TrendingUp size={16} />
              <span>基于温度即熵涨落原理</span>
            </div>
            <div>|</div>
            <div>中西医协同诊疗</div>
            <div>|</div>
            <div>个性化精准调理</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab('monitor')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'monitor'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Activity size={20} />
              健康监测
            </div>
          </button>
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'diagnosis'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <User size={20} />
              诊断工具
            </div>
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'knowledge'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <BookOpen size={20} />
              知识库
            </div>
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'monitor' && <MonitorPanel />}
          {activeTab === 'diagnosis' && <DiagnosisPanel />}
          {activeTab === 'knowledge' && <KnowledgePanel />}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>IGT医学应用平台 v1.0 | 识被动熵规律，用中医主动调，测温度辨寒热，数节律判紊乱</p>
          <p className="mt-1">⚠️ 本平台仅供健康监测和教育用途，不能替代专业医疗诊断</p>
        </div>
      </div>
    </div>
  );
};

export default IGTMedicalPlatform;