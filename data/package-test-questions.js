window.BANMYEONPPU_PACKAGE_TEST_QUESTIONS = [
  {
    "id": 1,
    "jobRole": "Package & Test",
    "category": "P&T 개요 및 후공정 이해",
    "group": "other",
    "difficulty": "입문",
    "question": "반도체 후공정(Back-End Process)의 두 가지 주요 단계는 무엇인지 설명해보세요.",
    "answer": "반도체 후공정은 웨이퍼 제조가 완료된 이후 진행되는 공정으로, 크게 패키지 공정과 테스트 공정, 두 단계로 구성됩니다. 패키지 공정은 웨이퍼에서 개별 다이(Die)를 분리한 뒤, 외부 환경으로부터 칩을 보호하고 기판이나 시스템과의 전기적 연결을 제공하기 위해 패키지 형태로 조립하는 과정입니다. 세부 공정으로는 웨이퍼 다이싱(Wafer Dicing), 다이 어태치(Die Attach), 와이어 본딩(Wire Bonding) 또는 플립 칩(Flip Chip) 접합, 몰딩(Molding), 볼 마운팅(Ball Mounting), 마킹(Marking) 등이 포함됩니다. 테스트 공정은 완성된 제품이 설계 규격을 만족하는지 전기적으로 검증하는 단계로, 웨이퍼 상태에서 수행하는 웨이퍼 테스트(Wafer Test)와 패키지 완성 후 수행하는 패키지 테스트(Package Test)로 나뉩니다. 두 공정은 최종 제품의 품질과 수율(Yield) 확보에 직결되므로 전공정 못지않게 중요합니다.",
    "keywords": [
      "Back-End Process",
      "Package Process",
      "Test Process",
      "Wafer Dicing",
      "Final 품질"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "반도체 후공정은 패키지 공정과 테스트 공정으로 구성됩니다. 패키지 공정은 다이 분리 후 와이어 본딩(Wire Bonding), 몰딩(Molding), 볼 마운팅(Ball Mounting) 등을 통해 칩을 보호하고 전기적으로 연결하는 과정입니다. 테스트 공정은 웨이퍼 테스트(Wafer Test)와 패키지 테스트(Package Test)로 나뉘며, 제품이 설계 규격을 만족하는지 전기적으로 검증합니다. 두 공정 모두 수율과 품질 확보에 핵심적입니다."
  },
  {
    "id": 2,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "입문",
    "question": "웨이퍼 테스트(Wafer Test)와 패키지 테스트(Package Test)의 차이점은 무엇인가요?",
    "answer": "웨이퍼 테스트는 웨이퍼 다이싱 이전, 즉 다이(Die)가 웨이퍼에 붙어 있는 상태에서 프로브 카드(Probe Card)를 이용해 전기적 특성을 검사하는 공정입니다. 이 단계에서 불량 다이를 조기에 걸러냄으로써 패키지 공정 진입 전 비용 손실을 최소화할 수 있습니다. 수백 개의 다이를 웨이퍼 단위로 동시에 측정하므로 높은 처리량을 확보할 수 있습니다. 반면 패키지 테스트는 조립이 완료된 패키지 상태에서 테스트 소켓(Test Socket)에 장착하여 최종 전기적 특성, 기능, 속도를 검증하는 단계입니다. 패키지 테스트에서는 실제 동작 조건에 가까운 환경에서 AC 특성, 기능 테스트(Function Test), 번인(Burn-In) 등이 수행됩니다. 두 테스트를 모두 통과한 제품만 출하되므로, 각 단계의 테스트 범위와 한계를 상호 보완적으로 설계하는 것이 중요합니다.",
    "keywords": [
      "Wafer Test",
      "Package Test",
      "Probe Card",
      "Test Socket",
      "Final 품질"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "웨이퍼 테스트(Wafer Test)는 다이싱 전 웨이퍼 상태에서 프로브 카드(Probe Card)로 불량 다이를 조기 선별하는 공정입니다. 패키지 테스트(Package Test)는 조립 완료 후 실제 동작 조건에 가까운 환경에서 AC 특성, 기능, 속도를 최종 검증합니다. 웨이퍼 테스트로 비용 손실을 줄이고, 패키지 테스트로 출하 품질을 보장하는 상호 보완적 구조입니다."
  },
  {
    "id": 3,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "입문",
    "question": "반도체 테스트를 온도에 따라 분류하면 어떤 종류가 있으며, 각각 어떤 조건에서 진행되나요?",
    "answer": "반도체 테스트는 온도 조건에 따라 크게 세 가지로 분류됩니다. 첫째, Hot Test는 고온 환경에서 진행하는 테스트로, 일반적으로 85°C 이상의 온도에서 수행됩니다. 고온에서 발생하기 쉬운 누설 전류(Leakage Current) 증가, 타이밍 마진 감소 등의 문제를 검출합니다. 둘째, Cold Test는 저온 환경, 보통 0°C 이하에서 진행하며, 저온에서 나타나는 문턱 전압(Threshold Voltage) 변화나 동작 속도 저하 등을 확인합니다. 셋째, Room Test는 상온(25°C 내외)에서 수행하는 기본적인 전기적 특성 검사입니다. 실제 양산에서는 제품 규격과 목표 시장에 따라 이 중 일부 또는 전부를 선택적으로 적용합니다. Hot Test 비중이 가장 높으며, 세 가지 온도 조건을 모두 수행하면 제품 신뢰성을 폭넓게 검증할 수 있지만 테스트 비용과 시간이 증가하므로 적절한 균형이 필요합니다.",
    "keywords": [
      "Hot Test",
      "Cold Test",
      "Room Test",
      "Leakage Current",
      "Timing Margin"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "온도에 따른 테스트는 세 가지입니다. Hot Test는 85°C 이상 고온에서 누설 전류와 타이밍 마진을 검증하고, Cold Test는 0°C 이하 저온에서 문턱 전압 변화와 속도 저하를 확인합니다. Room Test는 25°C 상온에서 기본 전기 특성을 검사합니다. 양산에서는 제품 규격에 맞게 선택적으로 적용하며, Hot Test 비중이 가장 높습니다."
  },
  {
    "id": 4,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "입문",
    "question": "반도체 테스트에서 수율(Yield)이란 무엇이며, 왜 중요한가요?",
    "answer": "수율(Yield)은 전체 생산된 제품 중 설계 규격을 만족하여 양품으로 판정된 제품의 비율을 의미합니다. 일반적으로 '양품 수 ÷ 전체 생산 수 × 100(%)'로 계산합니다. 반도체 산업에서 수율은 수익성과 직결되는 핵심 지표입니다. 수율이 1% 향상되면 같은 웨이퍼에서 더 많은 양품 칩을 얻게 되어 단가가 낮아지고 경쟁력이 높아집니다. 수율에 영향을 주는 요인은 전공정 결함 밀도, 패키지 공정 불량, 테스트 탈락 등 다양합니다. 특히 웨이퍼 테스트 단계의 수율을 웨이퍼 수율(Wafer Yield), 패키지 공정 후 테스트 수율을 패키지 수율(Package Yield)이라 구분합니다. 고수율 달성을 위해서는 공정 안정화, 테스트 커버리지 최적화, 불량 원인 분석 및 피드백이 체계적으로 이루어져야 합니다. 수율 분석은 공정 개선의 출발점이므로 엔지니어가 반드시 이해해야 할 개념입니다.",
    "keywords": [
      "Yield",
      "Wafer Yield",
      "Package Yield",
      "불량 원인 분석",
      "공정 Feedback"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "수율(Yield)은 전체 생산량 대비 양품 비율로, '양품 수 ÷ 전체 생산 수 × 100(%)'로 계산합니다. 수율이 높을수록 단가가 낮아지고 수익성이 개선되므로 반도체 산업의 핵심 지표입니다. 웨이퍼 수율(Wafer Yield)과 패키지 수율(Package Yield)로 구분하며, 공정 안정화와 불량 원인 분석을 통해 지속적으로 개선해야 합니다."
  },
  {
    "id": 5,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "입문",
    "question": "웨이퍼 테스트에서 프로브 카드(Probe Card)의 역할은 무엇인가요?",
    "answer": "프로브 카드(Probe Card)는 웨이퍼 테스트 시 테스터(Tester)와 웨이퍼 상의 다이(Die) 사이를 전기적으로 연결해 주는 핵심 인터페이스 장치입니다. 테스터에서 생성한 테스트 신호를 웨이퍼의 패드(Pad)에 전달하고, 다이의 응답 신호를 다시 테스터로 전송하는 역할을 합니다. 프로브 카드는 수십~수천 개의 프로브 핀(Probe Pin)을 탑재하며, 각 핀이 웨이퍼 패드에 물리적으로 접촉하여 전기 신호를 주고받습니다. 구조에 따라 니들/캔틸레버(Needle/Cantilever) 타입과 버티컬(Vertical) 타입으로 나뉩니다. 프로브 카드의 접촉 정밀도, 접촉 저항, 신호 무결성(Signal Integrity)은 테스트 품질에 직접 영향을 미칩니다. 최근에는 미세 피치(Fine Pitch)화와 멀티 다이(Multi-Die) 동시 측정 요구가 증가하면서 프로브 카드 기술도 함께 진화하고 있습니다.",
    "keywords": [
      "Probe Card",
      "Pad Contact",
      "Tester Interface",
      "Electrical Signal",
      "Signal Integrity"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "프로브 카드(Probe Card)는 웨이퍼 테스트 시 테스터(Tester)와 웨이퍼 다이(Die)의 패드(Pad) 사이를 전기적으로 연결하는 인터페이스 장치입니다. 수십~수천 개의 프로브 핀이 다이 패드에 물리적으로 접촉하여 테스트 신호를 전달합니다. 접촉 정밀도와 신호 무결성(Signal Integrity)이 테스트 품질을 결정하며, 최근 미세 피치화 트렌드에 따라 기술도 빠르게 발전하고 있습니다."
  },
  {
    "id": 6,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "입문",
    "question": "번인(Burn-In) 테스트를 수행하는 목적은 무엇인가요?",
    "answer": "번인(Burn-In) 테스트는 반도체 제품에 고온, 전압 스트레스를 인위적으로 가하여 초기 불량품을 조기에 걸러내기 위한 공정입니다. 반도체 신뢰성의 욕조 곡선(Bathtub Curve)에서 나타나는 초기 고장(Early Failure) 구간의 불량을 시장 출하 전에 선별하는 것이 핵심 목적입니다. 초기 고장은 제조 공정 중 발생한 잠재적 결함, 예를 들어 산화막 결함, 금속 배선 불량, 접합부 미세 균열 등이 열·전기 스트레스로 인해 빠르게 현재화되는 현상입니다. 번인은 보통 125°C 전후의 고온 오븐에서 일정 시간(수십~수백 시간) 동안 인가 전압을 가하며 진행합니다. 번인을 통과한 제품은 초기 고장률이 크게 감소하여 안정적인 동작 수명 구간에서 사용됩니다. 차량용(Automotive) 또는 군사용 등 고신뢰성이 요구되는 제품에는 번인이 필수적으로 적용됩니다.",
    "keywords": [
      "Burn-In",
      "고온·고전압 Stress",
      "Early Failure",
      "Latent Defect",
      "신뢰성 Screening"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "번인(Burn-In)은 고온·고전압 스트레스를 인위적으로 가해 초기 불량품을 조기에 선별하는 공정입니다. 욕조 곡선(Bathtub Curve)의 초기 고장(Early Failure) 구간 불량을 출하 전에 제거하는 것이 핵심 목적입니다. 산화막 결함, 배선 불량 등 잠재적 결함을 빠르게 현재화시키며, 차량용 등 고신뢰성 제품에는 필수적으로 적용됩니다."
  },
  {
    "id": 7,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "입문",
    "question": "패키지 테스트 공정에서 외관 검사(Visual Inspection) 시 주로 확인하는 불량 유형에는 어떤 것들이 있나요?",
    "answer": "외관 검사(Visual Inspection)는 패키지 테스트 공정에서 전기적 검사와 함께 수행되는 중요한 품질 관리 단계로, 육안 또는 자동 광학 검사 장비(AOI)를 통해 패키지 외부의 물리적 불량을 확인합니다. 주요 불량 유형으로는 첫째, 크랙(Crack)으로 몰딩 수지나 기판에 발생한 균열입니다. 둘째, 마킹 불량(Marking Error)으로 제품명, 로트 번호 등이 잘못 인쇄되거나 누락된 경우입니다. 셋째, 더블(Double) 마킹처럼 중복 인쇄된 경우, 넷째, 미스오리엔테이션(Misorientation)으로 패키지 방향 표시가 잘못된 경우입니다. 다섯째, 이물질이나 오염(Contamination)이 표면에 부착된 경우도 있습니다. 솔더볼(Solder Ball) 패키지에서는 볼 누락, 볼 위치 불량, 브리징(Bridging) 등도 주요 검사 항목입니다. 외관 불량은 전기적 특성에 영향을 주거나 신뢰성 저하로 이어질 수 있어 반드시 걸러내야 합니다.",
    "keywords": [
      "Visual Inspection",
      "Crack",
      "Warpage",
      "Misorientation",
      "Bridging"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "외관 검사(Visual Inspection)에서는 크랙(Crack), 마킹 불량(Marking Error), 중복 마킹(Double), 방향 표시 오류(Misorientation), 표면 오염(Contamination) 등을 확인합니다. 솔더볼(Solder Ball) 제품은 볼 누락, 위치 불량, 브리징(Bridging)도 검사합니다. 이러한 외관 불량은 신뢰성 저하로 이어질 수 있어 출하 전 반드시 선별해야 합니다."
  },
  {
    "id": 8,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "입문",
    "question": "반도체 패키지란 무엇이며, 왜 필요한가요?",
    "answer": "반도체 패키지는 웨이퍼 공정을 통해 완성된 실리콘 다이(Die)를 외부 환경으로부터 보호하고, 회로 기판과 전기적으로 연결할 수 있도록 만든 구조물입니다. 순수한 실리콘 다이는 매우 얇고 취약하여 물리적 충격, 습기, 열, 정전기 등에 노출되면 쉽게 손상됩니다. 따라서 패키지는 첫째로 기계적 보호(Mechanical Protection) 기능을 제공합니다. 둘째로 다이의 미세한 패드(Pad)와 외부 시스템 기판의 배선을 연결하는 전기적 연결(Electrical Connection) 기능을 담당합니다. 셋째로 동작 중 발생하는 열을 외부로 방출하는 열 방출(Thermal Dissipation) 기능도 수행합니다. 패키지의 형태, 크기, 재료는 응용 분야와 요구 성능에 따라 다양하게 설계되며, 스마트폰, PC, 자동차, 서버 등 거의 모든 전자기기에서 핵심 부품으로 사용됩니다. 패키지 기술은 반도체 성능과 신뢰성을 결정짓는 중요한 요소입니다.",
    "keywords": [
      "Die 보호",
      "Electrical Connection",
      "Mechanical Protection",
      "Thermal Dissipation",
      "Package Form"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "반도체 패키지는 실리콘 다이(Die)를 보호하고 외부 기판과 전기적으로 연결하는 구조물입니다. 물리적 충격·습기·열·정전기로부터 다이를 보호하는 기계적 보호, 다이 패드와 외부 배선을 잇는 전기적 연결, 동작 열을 방출하는 열 방출 기능을 제공합니다. 스마트폰부터 서버까지 모든 전자기기에 필수적인 핵심 부품입니다."
  },
  {
    "id": 9,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "입문",
    "question": "반도체 패키지의 3가지 주요 역할(기능)을 설명해보세요.",
    "answer": "반도체 패키지의 주요 역할은 크게 전기적 연결, 기계적 보호, 열 방출 세 가지로 구분할 수 있습니다. 첫 번째, 전기적 연결(Electrical Connection)은 다이의 미세한 패드(Pad)와 외부 PCB 기판의 배선을 와이어 본딩(Wire Bonding), 플립 칩(Flip Chip), TAB 등의 방식으로 연결하는 기능입니다. 신호, 전원, 접지를 정확하게 전달하는 것이 핵심입니다. 두 번째, 기계적 보호(Mechanical Protection)는 실리콘 다이를 외부의 물리적 충격, 습기, 먼지, 화학 물질 등으로부터 보호하는 기능입니다. 주로 에폭시 몰딩 컴파운드(EMC)나 세라믹 패키지가 이 역할을 담당합니다. 세 번째, 열 방출(Thermal Dissipation)은 동작 중 발생하는 열을 패키지 외부로 효율적으로 방출하여 다이의 온도를 안전 범위 내로 유지하는 기능입니다. 방열 특성이 부족하면 성능 저하나 신뢰성 문제가 발생합니다.",
    "keywords": [
      "Electrical Connection",
      "Mechanical Protection",
      "Thermal Dissipation",
      "EMC",
      "외부 Interface"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "패키지의 3가지 주요 역할은 전기적 연결(Electrical Connection), 기계적 보호(Mechanical Protection), 열 방출(Thermal Dissipation)입니다. 전기적 연결은 다이 패드와 기판 배선을 연결하고, 기계적 보호는 EMC 등으로 물리적·화학적 손상을 막으며, 열 방출은 동작 중 발생하는 열을 외부로 방출하여 신뢰성을 유지합니다."
  },
  {
    "id": 10,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "반도체 패키지 개발 트렌드 6가지를 말해보세요.",
    "answer": "반도체 패키지 기술의 개발 트렌드는 여섯 가지 방향으로 요약할 수 있습니다. 첫째, Small Form Factor(소형화)로 웨어러블, 모바일 기기의 소형화 요구에 대응합니다. 둘째, High Speed(고속화)로 데이터 처리 속도 증가에 따른 신호 전송 속도 향상을 추구합니다. 셋째, High Reliability(고신뢰성)로 자동차, 산업용 등 가혹한 환경에서의 신뢰성 확보가 중요합니다. 넷째, Low Cost(저비용화)로 동일 성능을 더 낮은 비용으로 구현하는 방향입니다. 다섯째, Thermal Dissipation(방열 향상)으로 고성능 칩의 발열 문제를 해결하기 위한 패키지 구조 혁신이 필요합니다. 여섯째, Stacking(적층화)으로 여러 칩을 수직으로 쌓아 집적도와 대역폭을 높이는 기술입니다. 이 여섯 가지 트렌드는 서로 상충되는 경우도 있어, 응용 분야에 맞는 최적 균형점을 찾는 것이 패키지 설계의 핵심 과제입니다.",
    "keywords": [
      "Small Form Factor",
      "High Speed",
      "High Reliability",
      "Low Cost",
      "Chip Stacking"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "패키지 개발 트렌드는 Small Form Factor(소형화), High Speed(고속화), High Reliability(고신뢰성), Low Cost(저비용화), Thermal Dissipation(방열 향상), Stacking(적층화) 6가지입니다. 소형·고속·고신뢰성·저비용·방열·적층화 요구를 동시에 만족시키는 것이 어렵기 때문에, 응용 분야에 맞는 최적 설계가 중요합니다."
  },
  {
    "id": 11,
    "jobRole": "Package & Test",
    "category": "P&T 개요 및 후공정 이해",
    "group": "other",
    "difficulty": "입문",
    "question": "IDM(Integrated Device Manufacturer), 팹리스(Fabless), OSAT(Outsourced Semiconductor Assembly and Test)의 차이를 설명해보세요.",
    "answer": "반도체 산업은 크게 세 가지 비즈니스 모델로 구분됩니다. IDM(Integrated Device Manufacturer)은 설계, 웨이퍼 제조, 패키지, 테스트까지 전 공정을 자체적으로 보유한 종합 반도체 기업입니다. 인텔(Intel), 삼성전자, SK하이닉스 등이 대표적입니다. 팹리스(Fabless)는 반도체 설계만 담당하고 제조는 외부 파운드리(Foundry)에 위탁하는 기업입니다. 엔비디아(Nvidia), 퀄컴(Qualcomm), AMD 등이 이에 해당합니다. 설계에 집중하여 투자 비용을 줄이고 빠른 제품 개발이 가능합니다. OSAT(Outsourced Semiconductor Assembly and Test)는 팹리스나 IDM으로부터 웨이퍼를 공급받아 패키지 조립과 테스트만 전문적으로 수행하는 기업입니다. ASE, Amkor, JCET 등이 대표적인 OSAT입니다. 면접에서는 이 세 모델의 역할 분담과 공급망 관계를 명확히 설명하는 것이 중요합니다.",
    "keywords": [
      "IDM",
      "Fabless",
      "OSAT",
      "Foundry",
      "Outsourcing"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "IDM은 설계부터 제조·패키지·테스트까지 수직 계열화한 종합 반도체 기업(삼성전자, 인텔)입니다. 팹리스(Fabless)는 설계만 담당하고 제조는 파운드리에 위탁하는 기업(엔비디아, 퀄컴)입니다. OSAT는 팹리스·IDM에서 웨이퍼를 공급받아 패키지 조립과 테스트만 전문적으로 수행하는 기업(ASE, Amkor)입니다."
  },
  {
    "id": 12,
    "jobRole": "Package & Test",
    "category": "P&T 개요 및 후공정 이해",
    "group": "other",
    "difficulty": "입문",
    "question": "반도체 전공정(Front-End Process)과 후공정(Back-End Process)의 차이는 무엇인가요?",
    "answer": "반도체 전공정(Front-End Process)은 실리콘 웨이퍼 위에 트랜지스터, 배선 등 회로를 직접 형성하는 공정입니다. 포토리소그래피(Photolithography), 식각(Etching), 증착(Deposition), 이온 주입(Ion Implantation), CMP(Chemical Mechanical Planarization) 등 수십에서 수백 단계의 공정이 클린룸에서 진행됩니다. 나노미터 단위의 회로 패턴을 정밀하게 구현해야 하므로 고도의 기술력이 요구됩니다. 반면 후공정(Back-End Process)은 웨이퍼 제조 완료 후, 개별 다이(Die)를 분리하고 패키지로 조립한 뒤 전기적으로 검증하는 단계입니다. 패키지 공정과 테스트 공정으로 구성되며, 전공정 대비 클린룸 등급이 낮고 물리적·기계적 조립 작업이 많습니다. 두 공정은 상호 의존적이며, 전공정에서 결정된 다이 크기, 패드 배치가 후공정 패키지 설계에 직접 영향을 줍니다.",
    "keywords": [
      "Front-End Process",
      "Back-End Process",
      "Wafer Fabrication",
      "Package Assembly",
      "Electrical Test"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "전공정(Front-End)은 웨이퍼 위에 포토리소그래피(Photolithography), 식각(Etching), 증착(Deposition) 등을 통해 회로를 형성하는 단계입니다. 후공정(Back-End)은 완성된 웨이퍼에서 다이를 분리하고 패키지로 조립·테스트하는 단계입니다. 전공정은 나노미터 수준의 정밀도가 요구되고, 후공정은 물리적 조립과 전기 검증에 초점을 맞춥니다."
  },
  {
    "id": 13,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "입문",
    "question": "DIP(Dual In-line Package)란 무엇이며, 어떤 환경에서 주로 사용되나요?",
    "answer": "DIP(Dual In-line Package)는 패키지 양쪽에 리드(Lead)가 두 줄로 나란히 배치된 가장 전통적인 패키지 형태입니다. 리드가 Through-Hole 방식으로 PCB에 삽입되어 납땜으로 고정됩니다. 구조가 단순하고 수동 조립 및 납땜이 용이하여 개발 초기에 널리 사용되었습니다. 리드 수에 따라 8핀, 14핀, 16핀 등 다양한 제품이 있으며, 핀 간격(Pin Pitch)은 일반적으로 2.54mm(100mil)입니다. 장점은 PCB 기판에 견고하게 고정되어 기계적 강도가 우수하고 교체가 쉽다는 점입니다. 단점은 SMT(Surface Mount Technology) 방식 대비 부품 밀도가 낮고, 핀 수가 제한적이며 자동화에 불리합니다. 현재는 고집적 소비자 제품보다는 산업용, 교육용 프로토타이핑, 마이크로컨트롤러, 오실레이터, 메모리 등 일부 분야에서 여전히 사용됩니다. 역사적으로 초기 반도체 패키지 시장을 이끌었던 주요 형태입니다.",
    "keywords": [
      "DIP",
      "Through-Hole",
      "Lead Pin",
      "High Reliability",
      "Legacy Application"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "DIP(Dual In-line Package)는 패키지 양쪽에 리드가 두 줄로 배치되어 PCB의 Through-Hole에 삽입·납땜되는 전통적인 패키지입니다. 구조가 단순하고 교체가 쉬운 장점이 있으나, 부품 밀도가 낮고 핀 수 확장이 어려워 현재는 산업용, 교육·프로토타이핑, 마이크로컨트롤러 등 일부 분야에서 사용됩니다."
  },
  {
    "id": 14,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "입문",
    "question": "QFP(Quad Flat Package)의 특징과 주요 적용 분야를 설명해보세요.",
    "answer": "QFP(Quad Flat Package)는 패키지의 4면 모두에서 리드가 날개처럼 바깥으로 뻗어나오는 표면 실장형(SMT) 패키지입니다. DIP 대비 훨씬 많은 I/O 핀을 수용할 수 있어 고집적 IC에 적합합니다. 리드 수는 보통 44핀부터 304핀 이상까지 다양하며, 핀 피치(Pin Pitch)는 0.4mm~1.0mm 수준입니다. 박형 버전인 TQFP(Thin QFP)는 두께를 줄여 슬림한 제품에 사용됩니다. SMT 자동화 공정에 적합하여 대량 생산성이 우수하고, 리드가 외부로 노출되어 있어 납땜 검사가 쉽다는 장점이 있습니다. 그러나 리드가 가늘어 핀 수가 늘어날수록 피치가 좁아지면서 납땜 브리징(Bridging) 불량이 발생할 위험이 높아집니다. 주요 적용 분야는 마이크로컨트롤러(MCU), 디지털 신호 처리기(DSP), ASIC, FPGA 등입니다. 고집적·고핀수 요구에는 BGA 계열로 대체되는 추세이지만, 중간 집적도 제품에서는 여전히 광범위하게 사용됩니다.",
    "keywords": [
      "QFP",
      "Gull Wing Lead",
      "Surface Mount",
      "I/O 확장",
      "Consumer Device"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "QFP(Quad Flat Package)는 패키지 4면 모두에 리드가 배치된 표면 실장형 패키지로, 많은 I/O 핀을 수용할 수 있어 MCU, DSP, ASIC 등에 널리 사용됩니다. 핀 피치(Pin Pitch)는 0.4~1.0mm이며, SMT 자동화 공정에 적합합니다. 핀 수가 많아질수록 피치가 좁아져 브리징(Bridging) 불량 위험이 증가하는 단점이 있습니다."
  },
  {
    "id": 15,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "입문",
    "question": "BGA(Ball Grid Array)와 LGA(Land Grid Array)의 차이점은 무엇인가요?",
    "answer": "BGA(Ball Grid Array)와 LGA(Land Grid Array)는 모두 패키지 하단에 배열 형태의 접속 단자가 있는 고밀도 패키지이지만, 접속 방식에서 근본적인 차이가 있습니다. BGA는 패키지 하단에 구 형태의 솔더볼(Solder Ball)이 형성되어 있어, PCB 기판에 올려 리플로(Reflow) 공정을 통해 납땜합니다. 솔더볼이 패키지와 기판 사이의 간격(Standoff Height)을 자연스럽게 형성하여 열 응력 흡수에 유리합니다. 반면 LGA는 패키지 하단에 솔더볼 대신 평평한 금속 랜드(Land)만 있으며, 소켓(Socket)에 장착하여 접속하거나 별도의 솔더 페이스트(Solder Paste)를 통해 납땜합니다. LGA는 솔더볼이 없어 운반 중 볼 손상 위험이 없고, 소켓 방식에서는 교체가 용이합니다. CPU나 서버용 프로세서에서 LGA 소켓 방식이 많이 쓰이며, BGA는 모바일·가전 제품에 폭넓게 적용됩니다.",
    "keywords": [
      "BGA",
      "LGA",
      "Solder Ball",
      "Land Pad",
      "Board Connection"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "BGA(Ball Grid Array)는 패키지 하단에 솔더볼(Solder Ball)이 형성되어 리플로(Reflow)로 기판에 납땜합니다. LGA(Land Grid Array)는 솔더볼 대신 평평한 랜드(Land)만 있으며 소켓이나 솔더 페이스트로 접속합니다. BGA는 모바일·가전에 광범위하게 사용되고, LGA는 CPU·서버 프로세서 소켓 방식에 주로 적용됩니다."
  },
  {
    "id": 16,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "WLCSP(Wafer Level Chip Scale Package)란 무엇이며, 일반 패키지와 어떻게 다른가요?",
    "answer": "WLCSP(Wafer Level Chip Scale Package)는 웨이퍼 상태에서 패키지 공정을 완료한 뒤 개별 칩으로 다이싱하는 방식입니다. 패키지 크기가 칩(Die) 크기와 동일하거나 매우 유사하여 초소형 패키지 구현이 가능합니다. 일반 패키지는 다이를 먼저 개별로 분리한 후 기판이나 리드프레임에 조립하는 과정이 필요하지만, WLCSP는 웨이퍼 단계에서 재배선층(RDL, Redistribution Layer)과 솔더볼(Solder Ball)을 형성하므로 공정이 단순화됩니다. 주요 장점은 초소형·초박형 구현, 짧은 신호 경로로 인한 전기적 성능 향상, 낮은 인덕턴스(Inductance), 그리고 웨이퍼 단위 병렬 처리에 따른 비용 효율성입니다. 단점은 칩 크기에 따라 I/O 수가 제한되고, 기판 없이 PCB에 직접 실장되어 열 응력에 취약하다는 점입니다. 스마트폰 카메라 모듈, PMIC, RF 칩 등 소형 모바일 부품에 주로 사용됩니다.",
    "keywords": [
      "WLCSP",
      "Wafer Level Package",
      "Chip Scale",
      "Batch Process",
      "Miniaturization"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "WLCSP(Wafer Level Chip Scale Package)는 웨이퍼 상태에서 재배선층(RDL)과 솔더볼(Solder Ball)을 형성한 뒤 다이싱하는 방식으로, 패키지 크기가 칩 크기와 동일합니다. 초소형·초박형 구현과 짧은 신호 경로가 장점이나, I/O 수 제한과 열 응력 취약성이 단점입니다. 스마트폰 PMIC, RF 칩 등에 널리 사용됩니다."
  },
  {
    "id": 17,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "SiP(System in Package)란 무엇이며, SoC(System on Chip)와 어떻게 다른가요?",
    "answer": "SiP(System in Package)는 여러 개의 다이(Die)나 부품을 하나의 패키지 안에 집적하여 완전한 기능 시스템을 구현하는 패키지 기술입니다. 서로 다른 공정 노드로 제조된 디지털 칩, 아날로그 칩, 메모리, 수동 부품 등을 하나의 패키지에 통합할 수 있습니다. 반면 SoC(System on Chip)는 하나의 실리콘 다이 위에 CPU, GPU, 메모리 인터페이스, 아날로그 회로 등 여러 기능 블록을 집적하는 방식입니다. SiP의 장점은 이종 공정 기술을 자유롭게 조합할 수 있어 설계 유연성이 높고, 각 칩의 최적 공정 노드를 선택할 수 있습니다. SoC는 단일 다이이므로 신호 경로가 짧고 전력 효율이 우수하지만, 설계 복잡도가 높고 모든 기능을 동일 공정으로 구현해야 하는 제약이 있습니다. 스마트워치, TWS 이어폰, IoT 기기 등 소형 고기능 제품에서 SiP가 각광받고 있습니다.",
    "keywords": [
      "SiP",
      "SoC",
      "Multi-Die Integration",
      "Passive Component",
      "System Integration"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "SiP(System in Package)는 서로 다른 기술로 만든 여러 칩과 부품을 하나의 패키지에 통합하는 기술입니다. SoC(System on Chip)는 하나의 다이 위에 모든 기능을 집적하는 방식입니다. SiP는 이종 공정 조합이 가능해 설계 유연성이 높고, SoC는 단일 다이로 신호 경로가 짧아 전력 효율이 우수합니다."
  },
  {
    "id": 18,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "리드프레임(Lead Frame) 기반 패키지와 서브스트레이트(Substrate) 기반 패키지의 차이점을 설명해보세요.",
    "answer": "리드프레임(Lead Frame) 기반 패키지는 금속(Cu 합금 등) 박판을 스탬핑 또는 에칭으로 가공한 리드프레임 위에 다이를 탑재하고 와이어 본딩(Wire Bonding)으로 연결하는 방식입니다. DIP, QFP, TSOP, SOJ 등이 대표적이며, 구조가 단순하고 저비용으로 양산이 용이합니다. 그러나 핀 수가 증가할수록 리드 피치가 좁아져 한계가 있으며, 전기적 성능도 서브스트레이트 방식 대비 낮습니다. 서브스트레이트(Substrate) 기반 패키지는 다층 유기 기판 위에 다이를 탑재하고, 솔더볼(Solder Ball)을 통해 PCB와 연결하는 방식입니다. BGA, CSP, Flip Chip BGA 등이 해당합니다. 다층 배선으로 더 많은 I/O를 수용할 수 있고, 신호 무결성(Signal Integrity)이 우수하며 고속·고집적 제품에 적합합니다. 비용은 높지만 고성능이 요구되는 AP, GPU, 서버 CPU 등에 폭넓게 사용됩니다.",
    "keywords": [
      "Lead Frame",
      "Substrate",
      "Routing Density",
      "Cost",
      "High I/O"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "리드프레임(Lead Frame) 기반은 금속 박판을 가공한 리드프레임 위에 다이를 탑재하는 방식으로, 구조가 단순하고 저비용입니다(DIP, QFP). 서브스트레이트(Substrate) 기반은 다층 유기 기판 위에 다이를 탑재하고 솔더볼(Solder Ball)로 PCB에 연결하는 방식으로, I/O가 많고 신호 무결성이 우수합니다(BGA, Flip Chip BGA)."
  },
  {
    "id": 19,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "패키지 설계에서 Design Rule이란 무엇이며, 왜 중요한가요?",
    "answer": "Design Rule은 반도체 패키지를 설계할 때 반드시 지켜야 하는 최소 치수 규격의 집합입니다. 제조 공정의 한계와 신뢰성 요구를 반영하여 정의되며, 이를 어길 경우 공정 불량이나 신뢰성 저하가 발생합니다. 주요 항목으로는 라인 앤드 스페이스(Line & Space), 솔더 패드 간격(Solder Pad Space), 볼 피치(Ball Pitch), 솔더 레지스트 오픈 크기(Solder Resist Open Size) 등이 있습니다. 예를 들어 솔더볼 간격이 너무 좁으면 리플로(Reflow) 공정에서 볼끼리 붙는 브리징(Bridging) 불량이 발생합니다. 서브스트레이트(Substrate) 배선에서 라인 앤드 스페이스가 너무 좁으면 단락(Short) 위험이 증가합니다. Design Rule은 패키지 제조사마다 약간씩 다르며, 기술 발전에 따라 지속적으로 미세화됩니다. 설계 단계에서 이를 철저히 검토해야 제조 불량을 최소화하고 안정적인 수율을 확보할 수 있습니다.",
    "keywords": [
      "Design Rule",
      "Package Layout",
      "Clearance",
      "Manufacturability",
      "Reliability"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Design Rule은 패키지 설계 시 반드시 지켜야 할 최소 치수 규격으로, 라인 앤드 스페이스(Line & Space), 볼 피치(Ball Pitch), 솔더 레지스트 오픈(Solder Resist Open) 등이 포함됩니다. 이를 어기면 브리징(Bridging), 단락(Short) 등 공정 불량이 발생합니다. 설계 단계에서 철저히 검토해야 수율과 신뢰성을 확보할 수 있습니다."
  },
  {
    "id": 20,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "입문",
    "question": "열 저항(Thermal Resistance)이란 무엇이며, 단위는 무엇인가요?",
    "answer": "열 저항(Thermal Resistance)은 반도체 패키지에서 열이 이동할 때의 저항 정도를 나타내는 지표로, 전기 저항과 유사한 개념입니다. 단위는 °C/W(도씨 퍼 와트)이며, 특정 전력이 소비될 때 두 지점 간의 온도 차이를 나타냅니다. 즉, 열 저항 값이 클수록 같은 전력 조건에서 온도 차이가 크게 발생하여 방열이 어렵다는 것을 의미합니다. 패키지 설계에서 주요 열 저항 지표로는 θja(Junction-to-Ambient), θjc(Junction-to-Case), θjb(Junction-to-Board)가 있습니다. 이 값들은 패키지의 방열 성능을 평가하고, 냉각 시스템(히트싱크, 열전도 패드 등) 설계에 활용됩니다. 고성능 칩일수록 발열량이 크므로 열 저항을 최소화하는 패키지 구조 선택이 중요합니다. 열 저항을 낮추기 위해 열 전도성이 높은 재료, 방열 패드(Thermal Pad), 히트 스프레더(Heat Spreader) 등을 활용합니다.",
    "keywords": [
      "Thermal Resistance",
      "Junction Temperature",
      "Heat Dissipation",
      "°C/W",
      "Package Design"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "열 저항(Thermal Resistance)은 열이 이동할 때의 저항을 나타내며, 단위는 °C/W입니다. 값이 클수록 방열이 어렵습니다. 주요 지표로 θja(Junction-to-Ambient), θjc(Junction-to-Case), θjb(Junction-to-Board)가 있으며, 패키지 방열 성능 평가와 냉각 시스템 설계에 활용됩니다. 고성능 칩일수록 열 저항 최소화가 중요합니다."
  },
  {
    "id": 21,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "θja(Junction-to-Ambient Thermal Resistance)가 의미하는 바를 설명해보세요.",
    "answer": "θja(Junction-to-Ambient Thermal Resistance)는 반도체 다이(Die)의 접합부(Junction)에서 주변 공기(Ambient) 사이의 열 저항을 나타내는 지표입니다. 단위는 °C/W이며, 주어진 전력 소비량에서 접합부 온도가 주변 온도 대비 얼마나 높아지는지를 수치화합니다. 수식으로 표현하면 Tj = Ta + (θja × P)이며, 여기서 Tj는 접합부 온도, Ta는 주변 온도, P는 소비 전력입니다. θja 값이 작을수록 방열 성능이 우수한 패키지입니다. 이 값은 패키지 재료, 구조, 다이 크기, 방열 경로 등에 의해 결정됩니다. 열 해석에서 θja가 중요한 이유는 접합부 최대 허용 온도(Tjmax)를 초과하지 않도록 패키지 사용 조건을 결정하는 데 사용되기 때문입니다. 또한 냉각 시스템 설계, 히트싱크 규격 산정에도 기초 데이터로 활용됩니다.",
    "keywords": [
      "θJA",
      "Junction",
      "Ambient",
      "Heat Path",
      "Thermal Budget"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "θja(Junction-to-Ambient Thermal Resistance)는 다이 접합부(Junction)에서 주변 공기(Ambient)까지의 열 저항으로, 단위는 °C/W입니다. Tj = Ta + (θja × P) 식으로 접합부 온도를 계산하며, 값이 작을수록 방열 성능이 우수합니다. 접합부 최대 허용 온도(Tjmax) 초과 방지와 냉각 시스템 설계의 기초 데이터로 활용됩니다."
  },
  {
    "id": 22,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "입문",
    "question": "컨벤셔널(Conventional) 패키지의 기본 공정 순서를 간략히 설명해보세요.",
    "answer": "컨벤셔널(Conventional) 패키지 공정은 리드프레임(Lead Frame) 또는 서브스트레이트(Substrate)를 기반으로 하는 전통적인 패키지 조립 공정입니다. 기본 순서는 다음과 같습니다. 먼저 웨이퍼 다이싱(Wafer Dicing)으로 웨이퍼에서 개별 다이를 분리합니다. 다음으로 다이 어태치(Die Attach)를 통해 분리된 다이를 리드프레임이나 서브스트레이트에 접착합니다. 이후 와이어 본딩(Wire Bonding) 또는 플립 칩(Flip Chip) 방식으로 다이의 패드와 기판 배선을 전기적으로 연결합니다. 연결이 완료되면 EMC(Epoxy Molding Compound)를 이용한 몰딩(Molding) 공정으로 다이와 연결부를 보호합니다. 이후 솔더볼(Solder Ball) 부착, 마킹(Marking), 개별 단품 분리(Singulation) 과정을 거칩니다. 마지막으로 웨이퍼 테스트와 패키지 테스트를 통한 전기적 검증과 외관 검사(Visual Inspection)로 공정이 마무리됩니다.",
    "keywords": [
      "Wafer Dicing",
      "Die Attach",
      "Wire Bonding",
      "Molding",
      "Ball Mounting"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "컨벤셔널 패키지 공정 순서는 웨이퍼 다이싱(Dicing) → 다이 어태치(Die Attach) → 와이어 본딩(Wire Bonding) 또는 플립 칩(Flip Chip) → 몰딩(Molding) → 솔더볼 마운팅(Ball Mounting) → 마킹(Marking) → 단품 분리(Singulation) → 테스트 및 외관 검사입니다. 각 단계에서 품질 관리가 최종 수율에 직결됩니다."
  },
  {
    "id": 23,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "입문",
    "question": "웨이퍼 다이싱(Dicing)이란 무엇이며, 왜 필요한가요?",
    "answer": "웨이퍼 다이싱(Wafer Dicing)은 웨이퍼 위에 형성된 수많은 다이(Die)를 스크라이브 라인(Scribe Line)을 따라 개별로 분리하는 공정입니다. 이 공정이 필요한 이유는 웨이퍼 상의 각 다이를 독립된 칩으로 만들어 패키지 조립에 활용하기 위해서입니다. 주요 방법으로는 블레이드 다이싱(Blade Dicing)과 스텔스 레이저 다이싱(Stealth Laser Dicing)이 있습니다. 블레이드 다이싱은 다이아몬드 코팅된 회전 블레이드로 웨이퍼를 직접 절삭하는 방식으로, 범용성이 높지만 기계적 스트레스와 치핑(Chipping) 발생 위험이 있습니다. 스텔스 레이저 다이싱은 레이저를 웨이퍼 내부에 집속하여 개질층을 형성한 후 확장 테이프(Expanding Tape)로 분리하는 방식으로, 치핑이 적고 다이 강도를 높게 유지할 수 있습니다. 다이 크기와 두께, 웨이퍼 재질에 따라 적합한 다이싱 방법을 선택합니다.",
    "keywords": [
      "Wafer Dicing",
      "Die Singulation",
      "Saw Street",
      "Chipping",
      "Yield Loss"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "웨이퍼 다이싱(Wafer Dicing)은 웨이퍼 위의 다이(Die)를 스크라이브 라인을 따라 개별로 분리하는 공정입니다. 블레이드 다이싱(Blade Dicing)은 회전 블레이드로 직접 절삭하며 범용성이 높고, 스텔스 레이저 다이싱(Stealth Laser Dicing)은 레이저로 내부 개질층을 형성한 뒤 분리하여 치핑이 적습니다. 다이 크기와 두께에 맞는 방법을 선택합니다."
  },
  {
    "id": 24,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "입문",
    "question": "다이 어태치(Die Attach)란 무엇이며, 어떤 재료가 사용되나요?",
    "answer": "다이 어태치(Die Attach)는 다이싱으로 분리된 개별 다이(Die)를 리드프레임(Lead Frame) 또는 서브스트레이트(Substrate)에 물리적으로 고정하는 공정입니다. 이 공정은 기계적 고정뿐만 아니라 전기적 접지 연결 및 열 방출 경로 형성의 역할도 합니다. 사용되는 주요 재료로는 첫째, 에폭시 계열 다이 어태치 필름(DAF, Die Attach Film) 또는 페이스트(Paste)가 있으며, 절연성 또는 전도성 종류가 있습니다. 둘째, 은(Ag) 함유 도전성 에폭시는 전기적 접지 연결이 필요한 경우에 사용됩니다. 셋째, 솔더(Solder)는 고온 안정성이 필요한 차량용이나 고신뢰성 제품에 적용됩니다. 플립 칩(Flip Chip) 패키지에서는 별도의 다이 어태치 공정 없이 솔더 범프(Solder Bump)를 통해 기판에 직접 접합합니다. 다이 어태치 재료의 열 전도성과 접착 강도는 패키지 신뢰성에 중요한 영향을 미칩니다.",
    "keywords": [
      "Die Attach",
      "Epoxy",
      "Solder Paste",
      "DAF",
      "Thermal Conductivity"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "다이 어태치(Die Attach)는 분리된 다이(Die)를 리드프레임이나 서브스트레이트(Substrate)에 고정하는 공정입니다. 에폭시 다이 어태치 필름(DAF), 도전성 Ag 에폭시 페이스트, 솔더(Solder) 등이 사용됩니다. 기계적 고정, 전기적 접지, 열 방출 경로 역할을 하며, 재료의 열 전도성과 접착 강도가 신뢰성에 직접 영향을 미칩니다."
  },
  {
    "id": 25,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "입문",
    "question": "와이어 본딩(Wire Bonding)이란 무엇이며, 어떤 재료가 주로 사용되나요?",
    "answer": "와이어 본딩(Wire Bonding)은 다이(Die)의 패드(Pad)와 리드프레임(Lead Frame) 또는 서브스트레이트(Substrate)의 배선을 가는 금속 와이어로 전기적으로 연결하는 공정입니다. 가장 널리 사용되는 인터커넥션(Interconnection) 방식으로, 볼 본딩(Ball Bonding)과 웨지 본딩(Wedge Bonding) 두 가지 방식이 있습니다. 볼 본딩은 와이어 끝에 FAB(Free Air Ball)을 형성하고 다이 패드에 열압착(Thermocompression)으로 1차 본딩 후 기판 측에 2차 본딩(Stitching)을 수행합니다. 주로 사용되는 와이어 재료는 세 가지입니다. 금(Au) 와이어는 내산화성이 우수하고 본딩 품질이 안정적이지만 비용이 높습니다. 구리(Cu) 와이어는 Au 대비 저비용이며 전도성이 우수하지만 산화 방지를 위한 N2/H2 가스 분위기 제어가 필요합니다. 은합금(Ag) 와이어는 Au와 Cu의 장점을 절충한 재료입니다.",
    "keywords": [
      "Wire Bonding",
      "Au Wire",
      "Cu Wire",
      "Ball Bonding",
      "Stitch Bonding"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "와이어 본딩(Wire Bonding)은 다이 패드(Pad)와 기판 배선을 금속 와이어로 연결하는 인터커넥션 공정입니다. 주요 재료는 내산화성이 우수한 Au 와이어, 저비용·고전도성의 Cu 와이어, 절충형인 Ag 합금 와이어입니다. 볼 본딩(Ball Bonding) 방식이 주로 사용되며, FAB(Free Air Ball) 형성 후 다이 패드에 1차 본딩, 기판에 2차 본딩 순으로 진행됩니다."
  },
  {
    "id": 26,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "입문",
    "question": "EMC(Epoxy Molding Compound)를 이용한 몰딩(Molding) 공정의 목적은 무엇인가요?",
    "answer": "EMC(Epoxy Molding Compound)를 이용한 몰딩(Molding) 공정은 다이(Die), 와이어 본딩(Wire Bonding) 등 내부 구조물을 에폭시 수지로 봉지(封止)하여 외부 환경으로부터 보호하는 공정입니다. 몰딩의 주요 목적은 크게 세 가지입니다. 첫째, 기계적 보호(Mechanical Protection)로 물리적 충격, 진동으로부터 다이와 와이어를 보호합니다. 둘째, 환경적 보호(Environmental Protection)로 습기, 먼지, 화학 물질로부터 칩을 차단합니다. 셋째, 전기적 절연(Electrical Insulation)으로 다이 주변의 도체 간 절연을 확보합니다. EMC는 에폭시 수지(Epoxy Resin), 경화제(Hardener), 실리카 필러(Silica Filler), 이형제(Release Agent), 플레임 리타던트(Flame Retardant) 등으로 구성됩니다. 몰딩 방법으로는 트랜스퍼 몰딩(Transfer Molding)이 가장 일반적이며, 웨이퍼 레벨 제품에는 압축 몰딩(Compression Molding)이 적용됩니다.",
    "keywords": [
      "EMC",
      "Molding",
      "Encapsulation",
      "Moisture Protection",
      "Mechanical Protection"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "EMC(Epoxy Molding Compound) 몰딩은 다이와 와이어 본딩(Wire Bonding) 등 내부 구조를 에폭시로 봉지하여 보호하는 공정입니다. 기계적 충격 보호, 습기·먼지 차단, 전기적 절연이 주요 목적입니다. 트랜스퍼 몰딩(Transfer Molding)이 일반적이며, EMC는 에폭시 수지, 실리카 필러(Silica Filler), 경화제 등으로 구성됩니다."
  },
  {
    "id": 27,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "입문",
    "question": "볼 마운팅(Ball Mounting) 공정이란 무엇인지 설명해보세요.",
    "answer": "볼 마운팅(Ball Mounting)은 BGA(Ball Grid Array) 계열 패키지에서 서브스트레이트(Substrate) 하단의 솔더 패드(Solder Pad)에 솔더볼(Solder Ball)을 부착하는 공정입니다. 이 솔더볼은 완성된 패키지를 PCB 기판에 실장할 때 전기적 연결과 기계적 고정을 동시에 담당합니다. 공정 순서는 먼저 서브스트레이트 하단의 각 패드에 솔더 플럭스(Solder Flux)를 도포합니다. 다음으로 볼 배치(Ball Placement) 장비를 이용해 솔더볼을 정확한 위치에 올립니다. 이후 리플로(Reflow) 오븐에서 열처리하여 솔더볼을 패드에 용융 접합시킵니다. 주요 품질 관리 항목으로는 볼 누락(Missing Ball), 볼 위치 불량(Misalignment), 볼 크기 균일성 등이 있습니다. 솔더볼 재료는 납프리(Lead-Free) SAC(SnAgCu) 합금이 주로 사용됩니다. 볼 피치(Ball Pitch)는 제품 I/O 수와 패키지 크기에 따라 결정됩니다.",
    "keywords": [
      "Ball Mounting",
      "Solder Ball",
      "BGA",
      "Reflow",
      "Board Mount"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "볼 마운팅(Ball Mounting)은 BGA 패키지 서브스트레이트(Substrate) 하단 솔더 패드에 솔더볼(Solder Ball)을 부착하는 공정입니다. 플럭스(Flux) 도포 → 볼 배치 → 리플로(Reflow) 순으로 진행됩니다. 납프리 SAC(SnAgCu) 합금볼이 주로 사용되며, 볼 누락·위치 불량·크기 균일성이 주요 품질 관리 항목입니다."
  },
  {
    "id": 28,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "입문",
    "question": "리드프레임(Lead Frame)에 사용되는 주요 재료와 그 이유를 설명해보세요.",
    "answer": "리드프레임(Lead Frame)은 반도체 패키지에서 다이(Die)를 탑재하는 다이 패드(Die Pad)와 외부 전기 연결을 위한 리드(Lead)로 구성된 금속 구조물입니다. 주로 사용되는 재료는 구리(Cu) 합금과 철-니켈(Fe-Ni) 합금입니다. Cu 합금은 전기 전도성과 열 전도성이 우수하여 현재 가장 널리 사용됩니다. 고순도 Cu에 소량의 Sn, Ag 등을 첨가하여 강도를 보완하며, 표면에는 Ag 또는 Pd/Ni/Au 도금을 하여 와이어 본딩(Wire Bonding) 품질과 내식성을 향상시킵니다. Fe-Ni 합금(대표적으로 42 Alloy)은 열팽창계수(CTE)가 실리콘 다이와 유사하여 열 응력 완화에 유리하지만, 전도성이 Cu 합금보다 낮고 가공성이 떨어집니다. 리드프레임 재료는 전기 전도성, 열 전도성, 기계적 강도, 가공성, CTE, 도금 친화성 등을 종합적으로 고려하여 선정합니다.",
    "keywords": [
      "Lead Frame",
      "Cu Alloy",
      "Fe-Ni Alloy",
      "Thermal Conductivity",
      "Plating"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "리드프레임(Lead Frame)의 주요 재료는 Cu 합금과 Fe-Ni 합금입니다. Cu 합금은 전기·열 전도성이 우수하여 가장 널리 사용되며, Ag 또는 Pd/Ni/Au 도금으로 와이어 본딩(Wire Bonding) 품질을 향상시킵니다. Fe-Ni 합금(42 Alloy)은 실리콘과 열팽창계수(CTE)가 유사해 열 응력 완화에 유리하지만, 전도성이 낮습니다."
  },
  {
    "id": 29,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "입문",
    "question": "솔더(Solder)란 무엇이며, 반도체 패키지에서 어떤 역할을 하나요?",
    "answer": "솔더(Solder)는 낮은 녹는점을 가진 금속 합금으로, 반도체 패키지에서 전기적 연결과 기계적 고정을 동시에 제공하는 핵심 접합 재료입니다. 패키지에서 솔더의 주요 역할은 크게 세 가지입니다. 첫째, BGA 패키지의 솔더볼(Solder Ball)로 패키지와 PCB 기판을 전기적으로 연결합니다. 둘째, 플립 칩(Flip Chip) 패키지에서 다이와 서브스트레이트(Substrate) 사이의 범프(Bump)로 사용됩니다. 셋째, 패키지 내부에서 다이 어태치(Die Attach) 재료로 고온 신뢰성이 필요한 일부 제품에 적용됩니다. 과거에는 Sn-Pb(주석-납) 합금이 주로 사용되었으나, 유해 물질 규제(RoHS 등)로 인해 현재는 납프리(Lead-Free) SAC(SnAgCu) 계열 합금이 표준입니다. 솔더의 주요 특성으로는 녹는점, 젖음성(Wettability), 기계적 강도, 크리프 특성 등이 있으며, 응용 분야에 따라 합금 조성을 최적화합니다.",
    "keywords": [
      "Solder",
      "Electrical Connection",
      "Mechanical Bonding",
      "Reflow",
      "Lead-Free"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "솔더(Solder)는 낮은 녹는점의 금속 합금으로, 패키지에서 BGA 솔더볼(Solder Ball)로 PCB와 전기적으로 연결하고, 플립 칩(Flip Chip) 범프(Bump)로 다이와 기판을 접합합니다. 현재는 납프리(Lead-Free) SAC(SnAgCu) 합금이 표준이며, 녹는점, 젖음성(Wettability), 기계적 강도 등이 주요 특성입니다."
  },
  {
    "id": 30,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "언더필(Underfill)이란 무엇이며, 왜 사용하나요?",
    "answer": "언더필(Underfill)은 플립 칩(Flip Chip) 패키지나 BGA에서 다이(Die)와 서브스트레이트(Substrate) 사이의 공간을 채우는 에폭시 계열 수지입니다. 언더필을 사용하는 주요 이유는 다이와 기판의 열팽창계수(CTE) 차이로 인한 열 응력(Thermal Stress)을 분산시켜 솔더 접합부(Solder Joint)의 피로 파괴(Fatigue Failure)를 방지하기 위해서입니다. 열사이클 반복 시 CTE 불일치로 솔더 범프에 집중되는 응력을 언더필이 고르게 분산시켜 접합부 수명을 크게 연장합니다. 또한 습기, 이온 오염 등으로부터 솔더 접합부를 보호하는 환경적 보호 기능도 합니다. 언더필의 종류로는 플립 칩 조립 후 모세관 현상으로 주입하는 CUF(Capillary Under Fill), 몰딩과 동시에 충진하는 MUF(Molded Under Fill), 사전 부착형 NCF(Non-Conductive Film) 등이 있습니다. CTE, 점도, 경화 조건이 주요 재료 선정 기준입니다.",
    "keywords": [
      "Underfill",
      "Flip Chip",
      "CTE Mismatch",
      "Stress Relief",
      "Solder Bump"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "언더필(Underfill)은 다이와 기판 사이를 채우는 에폭시 수지로, 열팽창계수(CTE) 차이로 인한 열 응력을 분산시켜 솔더 접합부(Solder Joint)의 수명을 연장합니다. 종류는 모세관 주입 방식의 CUF(Capillary Under Fill), 몰딩과 동시 충진의 MUF(Molded Under Fill), 사전 부착형 NCF(Non-Conductive Film)가 있습니다."
  },
  {
    "id": 31,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "입문",
    "question": "JEDEC이란 무엇이며, 반도체 패키지 신뢰성과 어떤 관련이 있나요?",
    "answer": "JEDEC(Joint Electron Device Engineering Council)은 반도체 산업의 표준화를 담당하는 국제 민간 표준 기구입니다. 주요 반도체 제조사, OSAT, 재료 업체 등이 회원으로 참여하여 공동으로 기술 표준을 제정합니다. 패키지 신뢰성 분야에서 JEDEC은 신뢰성 시험 방법, 조건, 판정 기준 등을 규정한 표준을 발행합니다. 대표적인 JEDEC 신뢰성 관련 표준으로는 JESD22 시리즈(신뢰성 시험 방법), JESD47(신뢰성 프로그램 요구사항), MSL(Moisture Sensitivity Level) 관련 J-STD-020, 그리고 DRAM 인터페이스 및 신뢰성 표준이 있습니다. JEDEC 표준에 따라 신뢰성 시험을 수행하고 데이터를 공유함으로써 고객사는 공급사의 제품 신뢰성을 객관적으로 평가할 수 있습니다. 반도체 패키지 엔지니어는 JEDEC 표준에 대한 이해를 바탕으로 신뢰성 시험을 계획하고 결과를 분석할 수 있어야 합니다.",
    "keywords": [
      "JEDEC",
      "Standardization",
      "Reliability Test",
      "Qualification",
      "Industry Standard"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "JEDEC(Joint Electron Device Engineering Council)은 반도체 산업의 국제 표준 기구로, 신뢰성 시험 방법·조건·판정 기준을 제정합니다. 주요 표준으로 JESD22(신뢰성 시험), J-STD-020(MSL) 등이 있습니다. JEDEC 표준에 따라 시험을 수행하면 고객사가 공급사 제품의 신뢰성을 객관적으로 평가할 수 있습니다."
  },
  {
    "id": 32,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "입문",
    "question": "MSL(Moisture Sensitivity Level)이란 무엇이며, 왜 관리가 필요한가요?",
    "answer": "MSL(Moisture Sensitivity Level)은 반도체 패키지가 흡습(수분 흡수)에 얼마나 민감한지를 나타내는 등급입니다. JEDEC 표준 J-STD-020에 따라 Level 1부터 Level 6까지 분류되며, 숫자가 낮을수록 수분에 덜 민감하고 개봉 후 관리 기간이 깁니다. MSL 관리가 중요한 이유는 패키지 내부에 수분이 흡수된 상태에서 SMT 리플로(Reflow) 공정의 고온을 받으면, 급격히 기화된 수분이 패키지 내부 압력을 높여 크랙(Crack)이나 층간 박리(Delamination)를 유발하는 '팝콘(Popcorn)' 현상이 발생하기 때문입니다. 이를 방지하기 위해 패키지 개봉 후에는 정해진 온습도 조건에서 제한된 시간 내에 실장해야 하며, 조건 초과 시에는 베이킹(Baking) 공정으로 수분을 제거해야 합니다. MSL 등급은 패키지 재료, 구조, 두께에 따라 달라집니다.",
    "keywords": [
      "MSL",
      "Moisture Absorption",
      "Reflow",
      "Popcorn Effect",
      "Dry Pack"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "MSL(Moisture Sensitivity Level)은 패키지의 흡습 민감도 등급으로, J-STD-020 기준 Level 1~6으로 분류됩니다. 흡습된 패키지가 리플로(Reflow) 고온에 노출되면 수분이 급격히 기화하여 크랙(Crack)·박리(Delamination)를 유발하는 팝콘 현상이 발생합니다. 이를 방지하기 위해 개봉 후 규정된 시간 내 실장하거나 베이킹(Baking)으로 수분을 제거해야 합니다."
  },
  {
    "id": 33,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "입문",
    "question": "신뢰성 시험(Reliability Test)을 수행하는 이유와 목적을 설명해보세요.",
    "answer": "신뢰성 시험(Reliability Test)은 반도체 패키지 제품이 실제 사용 환경에서 설계 수명 동안 정상적으로 기능하는지를 사전에 검증하기 위해 수행합니다. 실제 현장(Field) 환경에서 수명을 자연적으로 관찰하면 수년에서 수십 년이 걸리므로, 온도·습도·전압·기계적 스트레스 등을 가속하여 단기간에 잠재 불량을 조기에 발현시키는 가속 신뢰성 시험(Accelerated Life Test) 방식을 사용합니다. 주요 목적은 첫째, 신제품의 설계 및 재료 타당성을 검증합니다. 둘째, 공정 변경 후 신뢰성 유지 여부를 확인합니다. 셋째, 고객사에 제품 신뢰성 데이터를 제공하여 신뢰를 구축합니다. 넷째, 불량 발생 시 고장 분석(Failure Analysis)을 통해 근본 원인을 파악하고 개선합니다. 대표적인 신뢰성 시험으로는 고온고습 시험(THB, HAST), 열충격 시험(TC), 낙하 시험(Drop Test), 진동 시험 등이 있습니다.",
    "keywords": [
      "Reliability Test",
      "Lifetime Prediction",
      "Stress Condition",
      "Failure Mode",
      "Qualification"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "신뢰성 시험은 실제 사용 수명 동안 제품이 정상 동작하는지 사전 검증하기 위해 수행합니다. 자연 수명 관찰 대신 온도·습도·전압 스트레스를 가속하여 단기간에 잠재 불량을 발현시킵니다. 신제품 설계 검증, 공정 변경 확인, 고객사 신뢰성 데이터 제공, 고장 원인 분석 등이 주요 목적입니다."
  },
  {
    "id": 34,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "THB(Temperature Humidity Bias) 시험이란 무엇이며, 어떤 불량을 검출하나요?",
    "answer": "THB(Temperature Humidity Bias)는 온도, 습도, 바이어스 전압을 동시에 인가하여 패키지의 고온고습 신뢰성을 평가하는 시험입니다. JEDEC JESD22-A101 등의 표준에 따라 주로 85°C, 85%RH 조건에서 일정 전압을 인가한 채로 수백~수천 시간 동안 진행합니다. 이 시험이 검출하는 주요 불량 메커니즘은 다음과 같습니다. 첫째, 금속 배선의 전기화학적 부식(Corrosion)으로, 고온고습 환경에서 수분과 이온이 배선을 부식시킵니다. 둘째, 이온 마이그레이션(Ion Migration)으로, 전압 인가 시 이온이 이동하여 배선 간 단락(Short)이 발생합니다. 셋째, 봉지재(EMC)와 금속 배선 또는 다이 계면의 박리(Delamination)입니다. THB는 바이어스 전압을 인가하는 점에서 전압 없이 진행하는 UHAST(Unbiased HAST)와 구별됩니다. 습기에 민감한 패키지 재료나 접합 인터페이스의 장기 신뢰성을 평가하는 데 특히 유효합니다.",
    "keywords": [
      "THB",
      "Humidity",
      "Bias",
      "Corrosion",
      "Leakage Current"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "THB(Temperature Humidity Bias)는 85°C/85%RH 조건에서 바이어스 전압을 인가하며 고온고습 신뢰성을 평가하는 시험입니다. 금속 배선의 전기화학적 부식(Corrosion), 이온 마이그레이션(Ion Migration)으로 인한 단락, EMC와 계면의 박리(Delamination)를 주로 검출합니다. 전압 인가가 없는 UHAST와 구별됩니다."
  },
  {
    "id": 35,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "TC(Thermal Cycling) 신뢰성 시험이란 무엇이며, 주로 무엇을 평가하나요?",
    "answer": "TC(Thermal Cycling)는 패키지를 고온과 저온 사이를 반복적으로 오가는 온도 조건에 노출시켜 열 응력으로 인한 피로 파괴를 평가하는 신뢰성 시험입니다. JEDEC JESD22-A104 표준에 따라 일반적으로 -40°C~+125°C(또는 -55°C~+150°C) 범위에서 수백에서 수천 사이클 반복합니다. 온도 변화 시 패키지 내 서로 다른 재료 간 열팽창계수(CTE) 차이로 인해 계면에 반복적인 기계적 응력이 가해집니다. 이 시험으로 주로 평가하는 불량은 솔더 접합부(Solder Joint)의 열 피로 파괴(Thermal Fatigue), 기판 또는 다이와 EMC 계면의 박리(Delamination), 와이어 본딩(Wire Bonding) 단선, 기판 배선 균열(Crack) 등입니다. TC 시험 결과는 Coffin-Manson 모델 등으로 분석하여 실제 사용 조건에서의 수명을 예측하는 데 활용됩니다. 자동차 및 산업용 제품에서 특히 중요하게 적용됩니다.",
    "keywords": [
      "Thermal Cycling",
      "CTE Mismatch",
      "Solder Fatigue",
      "Delamination",
      "Temperature Stress"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "TC(Thermal Cycling)는 고온·저온을 반복하여 열팽창계수(CTE) 차이로 인한 피로 파괴를 평가하는 시험입니다. 일반적으로 -40°C~+125°C 범위에서 수백~수천 사이클 반복합니다. 솔더 접합부(Solder Joint) 열 피로, 계면 박리(Delamination), 와이어 본딩(Wire Bonding) 단선 등을 검출하며, Coffin-Manson 모델로 수명을 예측합니다."
  },
  {
    "id": 36,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "프로브 카드(Probe Card)의 Needle/Cantilever 타입과 Vertical 타입의 구조적 차이점과, 각각의 장단점을 설명해보세요.",
    "answer": "프로브 카드(Probe Card)는 구조에 따라 니들/캔틸레버(Needle/Cantilever) 타입과 버티컬(Vertical) 타입으로 나뉩니다. 니들/캔틸레버 타입은 PCB에서 비스듬히 뻗어 나온 바늘 형태의 핀이 웨이퍼 패드에 사선 방향으로 접촉합니다. 구조가 단순하고 제작 비용이 낮으나, 핀 간격에 한계가 있어 파인 피치(Fine Pitch) 패드에는 적합하지 않습니다. 또한 접촉 시 스크러빙(Scrubbing) 동작으로 패드 손상이 발생할 수 있습니다. 반면 버티컬 타입은 핀이 수직에 가깝게 패드에 접촉하여 스크러빙이 최소화됩니다. 수직 접촉이므로 핀 피치를 더 좁게 설계할 수 있어 파인 피치 및 고핀수 다이 테스트에 유리합니다. 접촉 정밀도가 높고 신호 무결성(Signal Integrity)도 우수하여 고주파 테스트에 적합합니다. 단점은 제작 비용이 높고 핀 교체 유지보수가 복잡합니다. 최근 핀 피치 미세화 추세에 따라 버티컬 타입의 수요가 증가하고 있습니다.",
    "keywords": [
      "Cantilever Probe",
      "Vertical Probe",
      "Contact Force",
      "Fine Pitch",
      "Parallel Test"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "니들/캔틸레버(Needle/Cantilever) 타입은 사선 방향으로 접촉하여 구조가 단순하고 저비용이지만 파인 피치(Fine Pitch) 적용이 어렵고 패드 스크러빙 손상 위험이 있습니다. 버티컬(Vertical) 타입은 수직 접촉으로 파인 피치·고핀수 대응이 가능하고 신호 무결성(Signal Integrity)이 우수하나, 제작 비용이 높습니다. 최근 파인 피치 추세에 따라 버티컬 타입 수요가 증가합니다."
  },
  {
    "id": 37,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "EPM(Electrical Parameter Monitoring)이란 무엇이며, 웨이퍼 테스트에서 어떻게 활용되나요?",
    "answer": "EPM(Electrical Parameter Monitoring)은 웨이퍼 테스트에서 각 다이의 전기적 파라미터(Idsat, Vth, Ioff 등)를 측정하고 통계적으로 분석하여 전공정(Fab) 상태를 실시간으로 모니터링하는 기법입니다. 각 웨이퍼 및 로트(Lot) 단위로 측정된 파라미터 분포를 관리 한계(Control Limit)와 비교하여 공정 이상(Excursion)을 조기에 감지합니다. EPM의 주요 활용 방식은 다음과 같습니다. 먼저 SPC(Statistical Process Control)와 연계하여 공정 능력 지수(Cpk)를 산출하고 트렌드를 분석합니다. 파라미터가 관리 한계를 벗어나면 즉시 알람을 발생시켜 후속 로트 투입을 보류하거나 공정 점검을 실시합니다. 또한 장기적 EPM 데이터는 설계 마진 검증, 공정 최적화, 다이 선별(Binning) 기준 설정에 활용됩니다. 수율(Yield) 저하의 원인을 조기에 파악하고 피드백하여 공정을 개선하는 데 핵심 역할을 합니다.",
    "keywords": [
      "EPM",
      "Electrical Parameter",
      "Wafer Map",
      "Process Monitoring",
      "Limit Setting"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "EPM(Electrical Parameter Monitoring)은 웨이퍼 테스트에서 Idsat, Vth 등 전기 파라미터를 측정·분석하여 공정 이상(Excursion)을 조기 감지하는 기법입니다. SPC(Statistical Process Control)와 연계해 관리 한계 이탈 시 즉각 알람을 발생시켜 추가 불량을 예방합니다. 장기 데이터는 수율 향상과 공정 최적화에 활용됩니다."
  },
  {
    "id": 38,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "웨이퍼 번인(Wafer Burn-In)이 기존 패키지 번인 대비 갖는 경제적·기술적 이점은 무엇인가요?",
    "answer": "웨이퍼 번인(Wafer Burn-In)은 다이싱 이전 웨이퍼 상태에서 번인(Burn-In) 스트레스를 인가하는 방식입니다. 기존 패키지 번인은 조립을 완료한 패키지를 번인 보드에 탑재하여 스트레스를 가하므로, 번인 후 불량이 발견되면 패키지 공정 비용 전체가 낭비됩니다. 반면 웨이퍼 번인은 다이 단계에서 초기 불량을 선별하므로 불량 다이의 패키지 공정 진입을 원천 차단하여 원가 절감 효과가 큽니다. 특히 KGD(Known Good Die)가 요구되는 멀티 칩 패키지(MCP)나 3D 적층 패키지에서 이점이 두드러집니다. 기술적으로는 웨이퍼 레벨 프로브 카드(Probe Card)를 이용해 다수 다이를 동시에 처리하므로 처리량(Throughput)이 높습니다. 단, 웨이퍼 상태에서의 전원 공급 및 신호 라우팅이 복잡하고, 고온 번인 시 프로브 카드의 열 안정성 확보가 기술적 도전 과제입니다.",
    "keywords": [
      "Wafer Burn-In",
      "Cost Reduction",
      "Early Failure",
      "Package Cost",
      "Parallel Screening"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "웨이퍼 번인(Wafer Burn-In)은 다이 단계에서 초기 불량을 선별하여 불량 다이의 패키지 공정 진입을 차단함으로써 원가를 절감합니다. KGD(Known Good Die)가 요구되는 적층 패키지에서 특히 유리하고, 다수 다이 동시 처리로 처리량(Throughput)이 높습니다. 다만 고온 환경에서의 프로브 카드(Probe Card) 열 안정성 확보가 기술적 과제입니다."
  },
  {
    "id": 39,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "TDBI(Test During Burn-In)란 무엇이며, 기존 번인 방식과의 차이점은 무엇인가요?",
    "answer": "TDBI(Test During Burn-In)는 번인(Burn-In) 스트레스를 인가하는 동안 동시에 기능 테스트(Functional Test)를 수행하는 방식입니다. 기존 번인은 단순히 고온·고전압 스트레스를 시간 동안 인가한 후 별도의 테스트 단계에서 불량을 확인하는 정적(Static) 방식입니다. 반면 TDBI는 번인 진행 중 동적(Dynamic) 테스트 패턴을 지속적으로 인가하여 실시간으로 불량 다이를 감지하고, 불필요한 스트레스 시간을 단축할 수 있습니다. TDBI의 주요 장점은 첫째, 번인과 테스트를 동시에 수행하여 총 공정 시간(TAT, Turn-Around Time)을 단축합니다. 둘째, 실시간으로 불량이 발생한 다이를 식별하여 즉시 마킹(Marking) 처리가 가능합니다. 셋째, 스트레스 중 실제 동작 조건을 모의하므로 테스트 커버리지가 향상됩니다. 특히 메모리 제품에서는 TDBI가 고온 동작 시 활성화되는 결함을 효과적으로 검출합니다.",
    "keywords": [
      "TDBI",
      "Real-Time Monitoring",
      "Burn-In Board",
      "Dynamic Test",
      "Failure Detection"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "TDBI(Test During Burn-In)는 번인(Burn-In) 스트레스 중에 기능 테스트를 동시에 수행하는 방식입니다. 기존 번인은 스트레스 후 별도로 검사하는 정적(Static) 방식이지만, TDBI는 번인 중 동적 테스트 패턴을 인가하여 실시간 불량을 감지합니다. 공정 시간(TAT) 단축과 테스트 커버리지 향상이 주요 장점입니다."
  },
  {
    "id": 40,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "반도체 신뢰성의 욕조 곡선(Bathtub Curve)이란 무엇이며, 테스트 전략과 어떻게 연관되나요?",
    "answer": "욕조 곡선(Bathtub Curve)은 반도체 제품의 고장률(Failure Rate)을 시간 축으로 나타낸 그래프로, 형태가 욕조를 옆에서 본 단면과 유사하여 붙여진 이름입니다. 초기 고장(Early Failure) 구간에서는 제조 공정 중 발생한 잠재적 결함이 빠르게 나타나 고장률이 높습니다. 이후 우발 고장(Random Failure) 구간에서는 고장률이 낮고 일정하게 유지되며, 이 구간이 제품의 유효 수명(Useful Life) 기간입니다. 마지막 마모 고장(Wear-Out Failure) 구간에서는 노화로 인해 고장률이 다시 증가합니다. 테스트 전략과의 연관성은 다음과 같습니다. 번인(Burn-In)은 초기 고장 구간의 잠재 불량을 조기에 가속 발현시켜 출하 전에 선별하는 역할을 합니다. 웨이퍼 테스트와 패키지 테스트는 초기 고장 다이를 걸러내어 유효 수명 구간의 제품만 출하하도록 보장합니다.",
    "keywords": [
      "Bathtub Curve",
      "Early Failure",
      "Random Failure",
      "Wear-Out Failure",
      "Screening Strategy"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "욕조 곡선(Bathtub Curve)은 시간에 따른 고장률을 나타내며, 초기 고장(Early Failure), 우발 고장(Random Failure), 마모 고장(Wear-Out Failure) 3개 구간으로 나뉩니다. 번인(Burn-In)은 초기 고장 구간의 잠재 불량을 출하 전에 선별하며, 웨이퍼 테스트·패키지 테스트는 유효 수명 구간의 양품만 출하하도록 보장합니다."
  },
  {
    "id": 41,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "반도체 패키지의 전기적 연결(Electrical Connection) 방식 3가지(Wire Bonding, Flip Chip, TAB)를 비교 설명해보세요.",
    "answer": "반도체 패키지의 전기적 연결 방식은 크게 와이어 본딩(Wire Bonding), 플립 칩(Flip Chip), TAB(Tape Automated Bonding)으로 구분됩니다. 와이어 본딩(Wire Bonding)은 다이 패드와 기판 배선을 금속 와이어로 연결하는 방식입니다. 공정이 단순하고 비용이 낮으나, 와이어 길이로 인한 인덕턴스(Inductance)가 발생하여 고주파 특성에 불리합니다. 플립 칩(Flip Chip)은 다이를 뒤집어 솔더 범프(Solder Bump)를 통해 기판에 직접 접합하는 방식입니다. 신호 경로가 짧아 전기적 성능이 우수하고, I/O 수를 넓은 면적으로 분산시킬 수 있어 고집적·고속 제품에 적합합니다. 다만 열 응력 관리를 위해 언더필(Underfill)이 필요합니다. TAB(Tape Automated Bonding)은 얇은 필름 테이프 위에 형성된 미세 Cu 리드로 다이 패드와 기판을 연결하는 방식입니다. 파인 피치 구현이 가능하고 LCD 드라이버 IC 등에 사용되지만 범용성은 낮습니다.",
    "keywords": [
      "Wire Bonding",
      "Flip Chip",
      "TAB",
      "Interconnect",
      "I/O Density"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "와이어 본딩(Wire Bonding)은 단순·저비용이나 와이어 인덕턴스로 고속 특성이 불리합니다. 플립 칩(Flip Chip)은 다이를 뒤집어 범프(Bump)로 직접 접합하여 신호 경로가 짧고 고속·고집적에 적합하나 언더필(Underfill)이 필요합니다. TAB(Tape Automated Bonding)은 필름 테이프의 Cu 리드로 연결하여 파인 피치 구현에 유리하며 LCD 드라이버 IC 등에 사용됩니다."
  },
  {
    "id": 42,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "패키지 개발 트렌드 중 High Speed 요구에 대응하기 위한 기술적 접근 방법을 설명해보세요.",
    "answer": "High Speed 요구에 대응하기 위한 패키지 기술의 접근 방법은 여러 방향에서 이루어집니다. 첫째, 신호 경로 단축입니다. 플립 칩(Flip Chip) 접합이나 TSV(Through Silicon Via)를 통해 와이어 본딩 대비 인덕턴스(Inductance)와 커패시턴스(Capacitance)를 낮춰 신호 전달 속도를 향상시킵니다. 둘째, 임피던스 매칭(Impedance Matching)입니다. 서브스트레이트(Substrate) 설계 시 라인 폭, 유전체 두께, 재료를 최적화하여 신호 반사(Reflection)를 최소화합니다. 셋째, 고속 서브스트레이트 재료 적용입니다. 저유전율(Low-k), 저손실(Low Loss Tangent) 재료를 사용하여 신호 감쇠를 줄입니다. 넷째, 2.5D/3D 패키지로 다이 간 거리를 최소화하여 메모리-로직 간 대역폭을 극대화합니다. HBM(High Bandwidth Memory)이 대표적 사례입니다. 다섯째, 전력 분배 네트워크(PDN, Power Delivery Network) 최적화로 IR Drop과 노이즈를 억제합니다.",
    "keywords": [
      "High Speed",
      "Signal Integrity",
      "Low Inductance",
      "Flip Chip",
      "Short Interconnect"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "High Speed 대응 패키지 기술은 플립 칩(Flip Chip)·TSV(Through Silicon Via)로 신호 경로를 단축하고, 서브스트레이트(Substrate) 설계에서 임피던스 매칭(Impedance Matching)을 최적화합니다. 저유전율(Low-k) 재료로 신호 감쇠를 줄이고, 2.5D/3D 패키지로 다이 간 대역폭을 극대화하는 HBM(High Bandwidth Memory) 기술이 대표 사례입니다."
  },
  {
    "id": 43,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "Small Form Factor(소형화) 트렌드에서 패키지 기술이 어떤 방향으로 발전하고 있는지 설명해보세요.",
    "answer": "Small Form Factor(소형화) 트렌드는 웨어러블 기기, 스마트폰, IoT 센서 등의 급성장으로 더욱 가속되고 있습니다. 패키지 소형화 기술의 발전 방향은 다음과 같습니다. 첫째, WLCSP(Wafer Level Chip Scale Package)의 확산입니다. 패키지 크기가 다이 크기와 동일한 수준으로 구현되어 공간 효율이 극대화됩니다. 둘째, Fan-Out WLP(Wafer Level Package)로 다이 외부까지 I/O를 확장하면서도 패키지 크기를 최소화합니다. 셋째, 칩 적층(Stacking) 기술의 발전입니다. SiP(System in Package)와 3D 패키지로 수평 면적을 늘리지 않고 수직 방향으로 기능을 집적합니다. 넷째, 임베디드(Embedded) 기술로 수동 부품이나 다이를 기판 내부에 내장하여 부품 실장 면적을 줄입니다. 다섯째, 미세 피치 범프(Fine Pitch Bump)와 서브스트레이트 미세 배선 기술의 발전으로 패키지 전체 면적을 줄입니다. 소형화와 고성능을 동시에 만족시키는 것이 핵심 과제입니다.",
    "keywords": [
      "Small Form Factor",
      "CSP",
      "WLCSP",
      "SiP",
      "High-Density Integration"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "소형화 트렌드에서 패키지 기술은 WLCSP(Wafer Level Chip Scale Package) 확산, Fan-Out WLP로 I/O 확장, SiP(System in Package)·3D 적층으로 수직 집적, 임베디드(Embedded) 기술로 수동 부품 내장, 미세 피치 범프(Fine Pitch Bump)로 면적 축소 방향으로 발전하고 있습니다. 소형화와 고성능의 동시 달성이 핵심 과제입니다."
  },
  {
    "id": 44,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "TSOP(Thin Small Outline Package)와 SOJ(Small Outline J-lead)의 리드 구조 차이와 적용 분야를 설명해보세요.",
    "answer": "TSOP(Thin Small Outline Package)와 SOJ(Small Outline J-lead)는 모두 메모리 패키지에 널리 사용되어 온 SMT 방식의 리드프레임 기반 패키지입니다. TSOP는 패키지의 긴 면(Long Side) 양쪽에서 얇고 평평한 갈매기 날개(Gull Wing) 형태의 리드가 바깥으로 뻗어나옵니다. 패키지 두께가 얇아 고밀도 실장이 가능하고, 리드가 외부로 노출되어 납땜 검사가 용이합니다. DRAM, NAND Flash 등 표준 메모리 모듈에서 광범위하게 사용되었습니다. SOJ는 리드가 패키지 양쪽에서 나온 뒤 아래쪽으로 J자 형태로 구부러집니다. J 리드 구조는 리드가 패키지 하단 아래로 접혀 실장 면적이 줄어들고, 납땜 면이 패키지 아래에 위치하여 납땜 후 납땜부 검사가 어렵습니다. SOJ는 주로 DRAM, SRAM 등 메모리 제품에 적용되었으나, 현재는 TSOP와 함께 BGA 계열 패키지로 점차 대체되는 추세입니다.",
    "keywords": [
      "TSOP",
      "SOJ",
      "Gull Wing Lead",
      "J-Lead",
      "Memory Package"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "TSOP(Thin Small Outline Package)는 긴 면 양쪽에서 갈매기 날개(Gull Wing) 리드가 바깥으로 뻗어나와 납땜 검사가 용이하고 DRAM·Flash 메모리에 주로 사용됩니다. SOJ(Small Outline J-lead)는 리드가 J자 형태로 패키지 하단에 접혀 실장 면적이 작지만 납땜 검사가 어렵습니다. 두 방식 모두 현재는 BGA 계열로 대체되는 추세입니다."
  },
  {
    "id": 45,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "Fan-In WLCSP와 Fan-Out WLCSP(FOWLP)의 구조적 차이와 각각의 장단점을 설명해보세요.",
    "answer": "Fan-In WLCSP와 Fan-Out WLP(FOWLP)는 모두 웨이퍼 레벨 패키지이지만 I/O 배치 방식에서 근본적으로 다릅니다. Fan-In WLCSP는 솔더볼(Solder Ball)이 다이(Die) 면적 내부에만 배치됩니다. 패키지 크기 = 다이 크기이므로 초소형이지만, 다이 크기 내에 수용 가능한 I/O 수에 한계가 있습니다. 소형 다이, 적은 I/O 수의 PMIC, RF 칩에 최적화되어 있습니다. Fan-Out WLP(FOWLP)는 다이 주변에 몰딩 컴파운드(Molding Compound)로 재구성 웨이퍼(Reconstituted Wafer)를 형성하고, 재배선층(RDL)을 다이 외부까지 확장하여 솔더볼을 다이 면적 밖에도 배치합니다. 덕분에 I/O 수를 대폭 늘리고 다이 크기보다 큰 패키지를 형성할 수 있습니다. 방열 면적도 넓고, 다이 박형화 부담이 줄어듭니다. 단점은 공정이 복잡하고 비용이 높으며, 재구성 웨이퍼 처리 중 다이 이동(Die Shift) 문제가 발생할 수 있습니다.",
    "keywords": [
      "Fan-In WLCSP",
      "Fan-Out WLCSP",
      "RDL",
      "I/O Redistribution",
      "Package Footprint"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Fan-In WLCSP는 솔더볼(Solder Ball)이 다이 면적 내부에만 배치되어 초소형이지만 I/O 수가 제한됩니다. Fan-Out WLP(FOWLP)는 재구성 웨이퍼 위에 재배선층(RDL)을 다이 외부로 확장하여 많은 I/O를 수용합니다. FOWLP는 I/O 확장성과 방열 면적이 우수하나, 공정이 복잡하고 다이 이동(Die Shift) 관리가 필요합니다."
  },
  {
    "id": 46,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "TSV(Through Silicon Via)란 무엇이며, 기존 와이어 본딩 방식 대비 어떤 성능 이점이 있나요?",
    "answer": "TSV(Through Silicon Via)는 실리콘 다이 또는 웨이퍼를 수직으로 관통하는 전기적 연결 구조입니다. 다이에 수직 방향으로 미세한 홀(Via)을 형성하고, 구리(Cu) 등 도전 재료를 채워 상하 다이 간의 전기적 연결을 확립합니다. 와이어 본딩과 비교하여 다음과 같은 성능 이점이 있습니다. 첫째, 초단거리 신호 연결로 인덕턴스(Inductance)가 극적으로 감소하여 신호 전달 지연이 최소화됩니다. 둘째, 수직 적층으로 칩 간 거리가 수십 마이크로미터(μm) 수준이므로 대역폭(Bandwidth)이 획기적으로 증가합니다. HBM(High Bandwidth Memory)에서 수천 개의 TSV를 통해 수 테라바이트/초(TB/s) 수준의 대역폭을 실현합니다. 셋째, 전력 소비도 감소합니다. 신호 경로 단축으로 RC 지연이 줄어 동적 전력 소비가 낮아집니다. 단점은 TSV 형성을 위한 고정밀 식각, 스텝 커버리지, CMP, 웨이퍼 박형화 공정이 필요하여 제조 비용이 높습니다.",
    "keywords": [
      "TSV",
      "Vertical Interconnect",
      "Short Path",
      "High Bandwidth",
      "Low Power"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "TSV(Through Silicon Via)는 실리콘 다이를 수직으로 관통하는 전기적 연결 구조입니다. 와이어 본딩 대비 신호 경로가 극도로 짧아 인덕턴스(Inductance)가 감소하고 대역폭(Bandwidth)이 획기적으로 증가합니다. HBM(High Bandwidth Memory)이 대표 사례로 수 TB/s 대역폭을 실현합니다. 다만 고정밀 공정으로 제조 비용이 높습니다."
  },
  {
    "id": 47,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "HBM(High Bandwidth Memory)이란 무엇이며, 기존 DRAM 대비 대역폭과 전력 측면에서의 장점을 설명해보세요.",
    "answer": "HBM(High Bandwidth Memory)은 여러 개의 DRAM 다이를 TSV(Through Silicon Via)로 수직 적층하고, 로직 다이(Logic Die) 또는 인터포저(Interposer)와 함께 2.5D/3D 패키지로 구성하는 고대역폭 메모리입니다. 기존 DRAM(DDR, LPDDR 등) 대비 두 가지 측면에서 큰 장점이 있습니다. 첫째, 대역폭 측면입니다. 기존 DRAM은 좁은 버스 폭(Narrow Bus Width)으로 연결되지만, HBM은 수천 개의 TSV를 통해 초광폭 버스(Ultra-Wide Bus, 최대 1024비트 이상)를 형성하여 단위 전력 당 대역폭이 기존 대비 수 배~수십 배 높습니다. 현재 HBM3E는 스택당 1.2TB/s의 대역폭을 실현합니다. 둘째, 전력 효율 측면입니다. 신호 경로가 짧아 I/O 동작 전압과 소비 전력이 낮습니다. 같은 대역폭을 기존 GDDR6 대비 절반 이하의 전력으로 달성합니다. AI 가속기, GPU, HPC 시스템에서 필수 메모리로 자리 잡았습니다.",
    "keywords": [
      "HBM",
      "DRAM Stack",
      "TSV",
      "High Bandwidth",
      "Power Efficiency"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "HBM(High Bandwidth Memory)은 여러 DRAM 다이를 TSV(Through Silicon Via)로 수직 적층하여 초광폭 버스를 구성하는 고대역폭 메모리입니다. 기존 DRAM 대비 수십 배 높은 대역폭(HBM3E 기준 1.2TB/s)을 제공하고, 신호 경로가 짧아 전력 효율이 크게 향상됩니다. AI 가속기·GPU·HPC에 필수 메모리로 사용됩니다."
  },
  {
    "id": 48,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "2.5D 패키지(인터포저 기반)와 3D 패키지(TSV 직접 적층)의 구조적 차이와 각각의 활용 시나리오를 설명해보세요.",
    "answer": "2.5D 패키지와 3D 패키지는 모두 칩 간 거리를 줄여 대역폭과 성능을 향상시키는 어드밴스드 패키징(Advanced Packaging) 기술이지만, 접근 방식이 다릅니다. 2.5D 패키지는 로직 다이와 메모리 다이를 실리콘 인터포저(Silicon Interposer) 위에 나란히 배치하고, 인터포저의 미세 배선으로 상호 연결하는 방식입니다. 두 다이가 수평으로 배치되므로 '2.5D'라 부릅니다. TSMC의 CoWoS(Chip-on-Wafer-on-Substrate)가 대표 기술로, AI GPU에 HBM을 연결하는 데 활용됩니다. 3D 패키지는 다이를 수직으로 직접 적층하고 TSV(Through Silicon Via)로 연결합니다. 다이 간 거리가 수십 μm 수준으로 최소화되어 대역폭이 극대화됩니다. HBM 내부 DRAM 적층, 3D NAND 적층이 대표 사례입니다. 2.5D는 제조 난이도가 상대적으로 낮고 이종 다이 통합에 유리하며, 3D는 집적도와 대역폭이 더 높지만 열 방출 관리와 제조 복잡도가 높습니다.",
    "keywords": [
      "2.5D Package",
      "Interposer",
      "3D Package",
      "TSV Stacking",
      "Heterogeneous Integration"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "2.5D 패키지는 로직·메모리 다이를 실리콘 인터포저(Interposer) 위에 수평 배치하여 미세 배선으로 연결합니다(TSMC CoWoS 등). 3D 패키지는 다이를 수직으로 직접 적층하고 TSV(Through Silicon Via)로 연결하여 집적도와 대역폭이 극대화됩니다. 2.5D는 이종 다이 통합에 유리하고, 3D는 집적도가 높지만 열 방출 관리가 어렵습니다."
  },
  {
    "id": 49,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "칩 적층(Chip Stack) 시 와이어 본딩 방식의 기술적 한계와 이를 극복하기 위한 대안 기술은 무엇인가요?",
    "answer": "칩 적층(Chip Stack) 시 와이어 본딩(Wire Bonding) 방식은 다이를 피라미드 형태로 쌓거나 와이어가 연결될 공간을 확보하기 위해 스페이서(Spacer)를 삽입하는 구조입니다. 이 방식의 주요 한계는 다음과 같습니다. 첫째, 와이어 루프(Wire Loop) 높이로 인해 패키지 전체 두께가 제한됩니다. 둘째, 적층 수가 늘어날수록 와이어 경로가 길어져 신호 지연과 인덕턴스가 증가합니다. 셋째, 다이 크기가 작아질수록 와이어 본딩 공간 확보가 어렵습니다. 이러한 한계를 극복하는 대안 기술은 TSV(Through Silicon Via)를 이용한 수직 연결입니다. TSV는 다이를 관통하는 수직 전도체로 다이 간 직접 연결이 가능하여 와이어가 불필요합니다. 또한 다이 간 연결 피치(Pitch)를 수십 μm 이하로 줄여 초광폭 버스 구현이 가능합니다. 추가적으로, 하이브리드 본딩(Hybrid Bonding)은 Cu-Cu 직접 접합으로 범프 없이 마이크로미터 이하 피치 연결을 실현합니다.",
    "keywords": [
      "Chip Stack",
      "Wire Length",
      "Parasitic",
      "TSV",
      "Hybrid Bonding"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "칩 적층 시 와이어 본딩(Wire Bonding)은 와이어 루프 높이로 패키지 두께가 증가하고, 적층 수 증가 시 신호 경로가 길어져 인덕턴스가 커지는 한계가 있습니다. 대안으로 TSV(Through Silicon Via)는 다이를 관통하는 수직 연결로 신호 경로를 최소화하고, 하이브리드 본딩(Hybrid Bonding)은 Cu-Cu 직접 접합으로 범프 없이 초미세 피치를 실현합니다."
  },
  {
    "id": 50,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "LOC(Lead On Chip) 패키지의 구조와 특징을 설명해보세요.",
    "answer": "LOC(Lead On Chip)는 리드프레임(Lead Frame)의 리드(Lead)가 다이(Die) 위로 올라오도록 설계한 패키지 구조입니다. 기존 리드프레임 패키지에서 다이 패드(Die Pad) 위에 다이를 올려놓는 것과 달리, LOC는 리드가 다이 상면을 덮도록 배치되어 다이와 리드 사이를 접착 테이프로 고정합니다. 이 구조의 주요 특징은 다음과 같습니다. 첫째, 다이 크기가 패키지 크기에 가깝게 설계할 수 있어 공간 효율이 높습니다. 기존 방식은 다이 주변에 본딩 와이어를 위한 공간이 필요하지만, LOC에서는 리드가 다이 위에 위치하여 와이어 길이를 단축할 수 있습니다. 둘째, 와이어 본딩(Wire Bonding) 길이가 짧아 전기적 성능이 향상됩니다. 셋째, 다이 패드 없이 접착 테이프로 고정하므로 패키지 두께를 줄일 수 있습니다. LOC는 주로 메모리(DRAM, Flash) 제품에서 활용되었으며, TSOP에 적용되어 반도체 메모리 밀도 향상에 기여했습니다.",
    "keywords": [
      "LOC",
      "Lead On Chip",
      "Center Pad",
      "Wire Length",
      "Memory Package"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "LOC(Lead On Chip)는 리드프레임(Lead Frame)의 리드(Lead)가 다이 위로 올라오도록 설계한 패키지로, 다이와 리드 사이를 접착 테이프로 고정합니다. 다이 크기를 패키지 크기에 근접하게 할 수 있어 공간 효율이 높고, 와이어 길이가 단축되어 전기적 성능이 향상됩니다. DRAM·Flash 메모리 TSOP 패키지에 주로 활용되었습니다."
  },
  {
    "id": 51,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "솔더 접합부(Solder Joint) 신뢰성에 영향을 미치는 주요 요인들과 설계 시 고려사항을 설명해보세요.",
    "answer": "솔더 접합부(Solder Joint)의 신뢰성은 여러 요인에 의해 결정됩니다. 첫째, 열팽창계수(CTE) 불일치입니다. 패키지와 PCB 기판의 CTE 차이로 열사이클(Thermal Cycling) 시 솔더 접합부에 반복적인 응력이 집중되어 피로 파괴(Fatigue Failure)가 발생합니다. 둘째, 솔더 볼 높이(Standoff Height)입니다. 높이가 클수록 열 응력 흡수 능력이 향상됩니다. 셋째, 솔더 재료 조성입니다. SAC(SnAgCu) 합금의 Ag, Cu 함량에 따라 기계적 강도, 크리프(Creep) 특성이 달라집니다. 넷째, 패드 설계입니다. Cu 패드 크기, SMD(Solder Mask Defined)/NSMD(Non-Solder Mask Defined) 방식 선택이 접합 형상에 영향을 줍니다. 다섯째, 리플로(Reflow) 프로파일입니다. 최대 온도, 유지 시간, 냉각 속도가 접합 미세구조에 영향을 줍니다. 설계 시에는 볼 피치(Ball Pitch), 패드 크기, 언더필(Underfill) 적용 여부 등을 종합적으로 고려하여 수명을 최적화해야 합니다.",
    "keywords": [
      "Solder Joint",
      "CTE Mismatch",
      "Thermal Fatigue",
      "Pad Design",
      "Reliability Margin"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "솔더 접합부(Solder Joint) 신뢰성에는 패키지·기판 간 열팽창계수(CTE) 불일치, 솔더볼 높이(Standoff Height), SAC 합금 조성, 패드 설계(SMD/NSMD), 리플로(Reflow) 프로파일이 영향을 미칩니다. 설계 시 볼 피치(Ball Pitch), 패드 크기, 언더필(Underfill) 적용을 최적화하여 열 피로 파괴(Fatigue Failure)를 최소화해야 합니다."
  },
  {
    "id": 52,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "패키지의 θja, θjc, θjb의 의미를 각각 설명하고, 이 값이 패키지 설계에서 왜 중요한지 논해보세요.",
    "answer": "반도체 패키지의 열 특성을 나타내는 세 가지 열 저항 지표입니다. θja(Junction-to-Ambient)는 다이 접합부에서 주변 공기까지의 열 저항으로, 패키지의 전체 방열 성능을 나타냅니다. Tj = Ta + θja × P 공식으로 접합부 온도를 계산하며, 냉각 시스템 설계의 기초로 사용됩니다. θjc(Junction-to-Case)는 접합부에서 패키지 상면(Case)까지의 열 저항으로, 히트싱크(Heatsink)나 TIM(Thermal Interface Material)을 부착할 때의 방열 성능 계산에 활용됩니다. θjb(Junction-to-Board)는 접합부에서 PCB 기판까지의 열 저항으로, 기판을 통한 방열 경로를 평가합니다. 이 세 값이 중요한 이유는 접합부 최대 온도(Tjmax)를 초과하지 않는 조건에서 최대 허용 전력(TDP)을 결정하기 때문입니다. 설계 단계에서 이 값들을 시뮬레이션으로 예측하고, 방열 재료와 구조를 최적화하여 제품 신뢰성을 확보합니다.",
    "keywords": [
      "θJA",
      "θJC",
      "θJB",
      "Junction Temperature",
      "Thermal Path"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "θja(Junction-to-Ambient)는 접합부~공기 간 열 저항으로 전체 방열 성능을 나타냅니다. θjc(Junction-to-Case)는 접합부~패키지 상면으로 히트싱크(Heatsink) 설계에 활용되고, θjb(Junction-to-Board)는 접합부~기판 간 방열 경로를 나타냅니다. 세 값 모두 접합부 최대 허용 온도(Tjmax) 이내에서 최대 허용 전력을 결정하는 데 사용됩니다."
  },
  {
    "id": 53,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "크로스토크(Crosstalk)란 무엇이며, 패키지 레이아웃 설계 시 이를 줄이기 위한 방법을 설명해보세요.",
    "answer": "크로스토크(Crosstalk)는 인접한 신호 라인 간의 전자기적 결합(Capacitive 또는 Inductive Coupling)으로 인해 원치 않는 신호 간섭이 발생하는 현상입니다. 패키지 배선이 고밀도화·고속화될수록 크로스토크 문제가 심각해집니다. 크로스토크를 줄이기 위한 설계 방법은 다음과 같습니다. 첫째, 신호 라인 간 간격(Spacing)을 늘립니다. 용량성 결합은 라인 간 거리의 제곱에 반비례하므로, 간격을 넓히면 크로스토크가 크게 감소합니다. 둘째, 접지(Ground) 라인을 인접 신호 라인 사이에 삽입(Guard Trace)하여 차폐 효과를 얻습니다. 셋째, 서브스트레이트(Substrate) 재료의 유전율(Dk)을 낮춰 용량성 결합을 줄입니다. 넷째, 고속 신호 라인을 별도 층에 배치하고 전원/접지 레이어로 격리합니다. 다섯째, 차동 신호(Differential Signaling)를 사용하여 노이즈 내성을 높입니다. 시뮬레이션(HFSS, HyperLynx 등)으로 사전 검증하는 것이 필수입니다.",
    "keywords": [
      "Crosstalk",
      "Signal Integrity",
      "Trace Spacing",
      "Ground Shield",
      "Impedance"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "크로스토크(Crosstalk)는 인접 신호 라인 간 전자기 결합으로 발생하는 신호 간섭입니다. 감소 방법으로는 신호 라인 간 간격(Spacing) 확대, Guard Trace 삽입, 저유전율 서브스트레이트(Substrate) 재료 사용, 고속 신호 라인의 별도 층 배치, 차동 신호(Differential Signaling) 적용이 있습니다. 시뮬레이션으로 사전 검증이 필수입니다."
  },
  {
    "id": 54,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "열팽창계수(CTE, Coefficient of Thermal Expansion) 불일치가 패키지 신뢰성에 미치는 영향과 대응 방법은?",
    "answer": "CTE(열팽창계수)는 온도 변화에 따른 재료의 선형 팽창 비율로, 단위는 ppm/°C입니다. 반도체 패키지에서 사용되는 재료들은 CTE가 서로 다릅니다. 예를 들어 실리콘 다이는 2.6ppm/°C, 유기 서브스트레이트(Substrate)는 약 15~18ppm/°C, FR4 PCB는 약 17~20ppm/°C입니다. 온도가 변화할 때 이 차이로 인해 재료 경계면에 전단 응력(Shear Stress)이 발생하고, 반복적인 열사이클로 솔더 접합부 피로 파괴, 계면 박리(Delamination), 와이어 단선 등이 유발됩니다. 대응 방법은 다음과 같습니다. 첫째, 언더필(Underfill)로 다이와 기판 사이 공간을 채워 응력을 분산시킵니다. 둘째, CTE가 실리콘에 가까운 재료(세라믹 기판, 특수 합금 리드프레임)를 선택합니다. 셋째, 솔더볼 높이(Standoff Height)를 높여 응력 흡수 능력을 향상시킵니다. 넷째, 유한요소 해석(FEA)으로 응력 분포를 사전 시뮬레이션합니다.",
    "keywords": [
      "CTE Mismatch",
      "Warpage",
      "Delamination",
      "Material Selection",
      "Stress Simulation"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "CTE(열팽창계수) 불일치는 온도 변화 시 재료 경계면에 전단 응력(Shear Stress)을 발생시켜 솔더 접합부 피로 파괴, 계면 박리(Delamination), 와이어 단선을 유발합니다. 대응 방법으로는 언더필(Underfill) 적용으로 응력 분산, CTE가 실리콘에 가까운 재료 선택, 솔더볼 높이(Standoff Height) 증대, FEA 시뮬레이션으로 사전 검증이 있습니다."
  },
  {
    "id": 55,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "Blade 다이싱과 Stealth Laser 다이싱의 원리 차이와 각각의 장단점을 설명해보세요.",
    "answer": "블레이드 다이싱(Blade Dicing)과 스텔스 레이저 다이싱(Stealth Laser Dicing)은 웨이퍼를 개별 다이로 분리하는 두 가지 대표적인 방법입니다. 블레이드 다이싱은 다이아몬드 지립(Abrasive)이 코팅된 회전 블레이드로 웨이퍼를 물리적으로 절삭합니다. 범용성이 높고 다양한 재료에 적용 가능하지만, 기계적 절삭으로 인한 치핑(Chipping), 마이크로 크랙(Micro Crack)이 발생하여 다이 강도를 저하시킬 수 있습니다. 스텔스 레이저 다이싱은 레이저를 웨이퍼 내부에 집속하여 실리콘 개질층(Modified Layer)을 형성하고, 이후 익스팬딩 테이프(Expanding Tape)를 확장하여 개질층을 따라 다이를 분리합니다. 기계적 접촉이 없어 치핑이 거의 없고 다이 강도가 우수하며, 스크라이브 라인(Scribe Line)을 좁게 설계할 수 있어 웨이퍼당 다이 수가 증가합니다. 단, 투명하지 않은 재료나 두꺼운 웨이퍼에는 적용이 제한됩니다.",
    "keywords": [
      "Blade Dicing",
      "Stealth Laser Dicing",
      "Chipping",
      "Kerf Loss",
      "Thin Wafer"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "블레이드 다이싱(Blade Dicing)은 회전 블레이드로 웨이퍼를 물리적으로 절삭하여 범용성이 높지만 치핑(Chipping)·마이크로 크랙으로 다이 강도가 저하됩니다. 스텔스 레이저 다이싱(Stealth Laser Dicing)은 레이저로 웨이퍼 내부에 개질층을 형성 후 분리하여 치핑이 거의 없고 스크라이브 라인(Scribe Line)이 좁아 다이 수율이 향상됩니다."
  },
  {
    "id": 56,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "심화",
    "question": "와이어 본딩에서 FAB(Free Air Ball) 형성 원리와 볼 본딩(Ball Bonding) 및 스티칭(Stitching) 과정을 설명해보세요.",
    "answer": "와이어 본딩(Wire Bonding) 공정에서 FAB(Free Air Ball)는 와이어 끝에 전기 스파크(EFO, Electronic Flame Off)를 순간 인가하여 와이어 끝을 용융시키고, 표면 장력에 의해 구 형태의 볼이 형성되는 것입니다. 볼 크기는 전류량과 인가 시간으로 제어합니다. 볼 본딩(Ball Bonding) 과정은 다음과 같습니다. 먼저 형성된 FAB을 다이 패드(Die Pad) 위에 위치시키고, 캐필러리(Capillary)를 통해 열압착(Thermocompression) 또는 초음파(Ultrasonic) 에너지를 인가하여 1차 볼 본딩을 수행합니다. 이때 볼이 눌려 납작한 형태의 본딩 볼(Bonded Ball)이 됩니다. 다음으로 캐필러리가 루프(Loop)를 그리며 기판 또는 리드프레임(Lead Frame)의 배선 측으로 이동합니다. 마지막으로 2차 본딩인 스티칭(Stitching)을 수행합니다. 스티칭에서는 와이어를 기판 패드에 열압착으로 접합한 뒤 와이어를 끊어 공정을 완료합니다.",
    "keywords": [
      "FAB",
      "Ball Bonding",
      "Stitching",
      "Capillary",
      "Ultrasonic Energy"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "FAB(Free Air Ball)은 전기 스파크(EFO)로 와이어 끝을 용융시켜 표면 장력으로 구 형태로 형성한 것입니다. 볼 본딩은 FAB을 다이 패드(Pad) 위에서 열압착·초음파로 1차 접합하고, 캐필러리(Capillary)가 루프를 그려 기판 배선으로 이동한 뒤 2차 스티칭(Stitching) 접합으로 완료됩니다."
  },
  {
    "id": 57,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "Transfer 몰딩과 Compression 몰딩의 공정 차이와 각각의 적용 사례를 설명해보세요.",
    "answer": "트랜스퍼 몰딩(Transfer Molding)과 컴프레션 몰딩(Compression Molding)은 EMC(Epoxy Molding Compound)를 이용한 두 가지 대표적인 반도체 패키지 봉지 공정입니다. 트랜스퍼 몰딩은 태블릿(Tablet) 형태의 EMC를 가열하여 용융시킨 뒤, 플런저(Plunger)로 가압하여 러너(Runner)와 게이트(Gate)를 통해 금형 캐비티(Cavity) 내에 주입하는 방식입니다. 공정이 안정적이고 자동화가 용이하여 리드프레임(Lead Frame) 기반 패키지와 일반 BGA 패키지에 광범위하게 사용됩니다. 컴프레션 몰딩은 EMC(분말 또는 액상 형태)를 금형 하부에 분배한 뒤, 금형을 닫으며 상부에서 압력을 가해 전면적으로 압착하는 방식입니다. 금형 내 잔류 응력이 적고, 워페이지(Warpage) 제어가 유리하며 대면적 웨이퍼 몰딩에 적합합니다. Fan-Out WLP(Wafer Level Package)나 패널 레벨 패키지(Panel Level Package)와 같이 대면적을 균일하게 봉지해야 하는 제품에 주로 적용됩니다.",
    "keywords": [
      "Transfer Molding",
      "Compression Molding",
      "EMC Flow",
      "Void",
      "Warpage"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "트랜스퍼 몰딩(Transfer Molding)은 태블릿 EMC를 용융·가압하여 게이트(Gate)를 통해 캐비티(Cavity)에 주입하며, 리드프레임(Lead Frame) 기반 패키지·일반 BGA에 광범위하게 사용됩니다. 컴프레션 몰딩(Compression Molding)은 EMC를 금형 내 분배 후 전면 압착하여 워페이지(Warpage) 제어가 유리하며, Fan-Out WLP 등 대면적 패키지에 적용됩니다."
  },
  {
    "id": 58,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "Flip Chip 공정의 원리와 와이어 본딩 방식 대비 전기적·구조적 장점을 설명해보세요.",
    "answer": "플립 칩(Flip Chip) 공정은 다이(Die)의 패드(Pad) 면을 아래로 뒤집어 서브스트레이트(Substrate) 또는 PCB 기판에 솔더 범프(Solder Bump) 또는 Cu 필라(Cu Pillar)를 통해 직접 접합하는 방식입니다. 와이어 본딩(Wire Bonding) 대비 주요 장점은 다음과 같습니다. 첫째, 전기적 성능 면에서 와이어가 없으므로 인덕턴스(Inductance)와 커패시턴스(Capacitance)가 대폭 감소하여 고주파 신호 전달에 유리합니다. 둘째, I/O 밀도(Density) 측면에서 다이 전체 면적에 걸쳐 I/O를 배치할 수 있어 와이어 본딩의 외주(Perimeter) 배치 방식보다 훨씬 많은 I/O를 수용합니다. 셋째, 패키지 크기를 와이어 루프 공간 없이 최소화할 수 있습니다. 넷째, 열 방출 경로가 다이 하부 기판과 직접 연결되어 방열 효율이 향상됩니다. 단, CTE 불일치로 인한 솔더 접합부 응력을 해소하기 위해 언더필(Underfill)이 필수적이며, 공정 비용이 와이어 본딩보다 높습니다.",
    "keywords": [
      "Flip Chip",
      "Solder Bump",
      "Short Interconnect",
      "High I/O",
      "Underfill"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "플립 칩(Flip Chip)은 다이를 뒤집어 솔더 범프(Solder Bump) 또는 Cu 필라(Cu Pillar)로 기판에 직접 접합합니다. 와이어가 없어 인덕턴스(Inductance)가 감소하고 고주파 성능이 우수하며, 다이 전면에 I/O를 배치하여 핀 수를 대폭 늘릴 수 있습니다. 다만 CTE 불일치 해소를 위해 언더필(Underfill)이 필요합니다."
  },
  {
    "id": 59,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "KGD(Known Good Die)란 무엇이며, 멀티 칩 패키지(MCP) 또는 SiP 제조 시 왜 중요한가요?",
    "answer": "KGD(Known Good Die)는 패키지 조립 전 단계에서 전기적 기능과 성능이 완전히 검증된 양품 다이(Die)를 의미합니다. 일반적인 웨이퍼 테스트로는 일부 기능이나 신뢰성을 완전히 검증하기 어려우므로, KGD를 확보하기 위해서는 웨이퍼 번인(Wafer Burn-In), 고온 동작 테스트 등 추가적인 검증 공정이 필요합니다. KGD가 MCP(Multi Chip Package)나 SiP(System in Package)에서 중요한 이유는 다음과 같습니다. 여러 개의 다이를 하나의 패키지에 통합하는 경우, 하나의 다이가 불량이면 전체 패키지가 불량이 됩니다. 패키지 조립 비용은 비싸기 때문에, 불량 다이를 사전에 선별하지 않으면 비싼 양품 다이들도 함께 폐기되는 수율·원가 손실이 발생합니다. 따라서 MCP, 3D 적층, 칩렛(Chiplet) 패키지에서 각 다이의 KGD 확보는 전체 시스템 수율을 결정짓는 핵심 요소입니다.",
    "keywords": [
      "KGD",
      "Multi-Chip Package",
      "SiP Yield",
      "Good Die Selection",
      "Cost Reduction"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "KGD(Known Good Die)는 패키지 조립 전 전기적 기능과 성능이 완전히 검증된 양품 다이입니다. MCP(Multi Chip Package)나 SiP(System in Package)에서 하나의 불량 다이가 전체 패키지 폐기로 이어지므로, KGD 확보는 수율과 원가 손실 방지에 필수적입니다. 웨이퍼 번인(Wafer Burn-In)과 고온 테스트로 KGD를 확보합니다."
  },
  {
    "id": 60,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "DBG(Dicing Before Grinding) 공정의 원리와 기존 방식 대비 장점을 설명해보세요.",
    "answer": "DBG(Dicing Before Grinding)는 웨이퍼 박형화(Back Grinding) 이전에 다이싱(Dicing)을 먼저 수행하는 공정 순서입니다. 기존 방식(Grinding Before Dicing)은 먼저 웨이퍼를 목표 두께로 박형화한 후 다이싱하는 순서입니다. 얇아진 웨이퍼는 취급이 어렵고 다이싱 시 치핑(Chipping) 및 크랙(Crack) 발생 위험이 큽니다. DBG는 웨이퍼가 두꺼운 상태에서 먼저 스크라이브 라인을 따라 부분 절삭(Half-Cut Dicing)하고, 이후 박형화 공정에서 웨이퍼를 연삭(Grinding)하면 다이가 자연스럽게 분리됩니다. DBG의 주요 장점은 첫째, 얇은 웨이퍼에서의 다이싱이 아니므로 치핑과 크랙이 크게 감소하고 다이 강도가 향상됩니다. 둘째, 극박형(≤50μm 이하) 다이를 안전하게 제작할 수 있어 스택 패키지(Stack Package) 제조에 유리합니다. 셋째, 다이 분리가 자연스럽게 이루어지므로 공정이 단순화됩니다.",
    "keywords": [
      "DBG",
      "Dicing Before Grinding",
      "Thin Wafer",
      "Crack Reduction",
      "Handling Damage"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "DBG(Dicing Before Grinding)는 웨이퍼 두꺼울 때 먼저 부분 절삭(Half-Cut)한 뒤 박형화(Back Grinding)하면서 다이가 자연 분리되는 공정입니다. 기존 방식 대비 얇은 웨이퍼 취급 시 치핑(Chipping)·크랙이 감소하고 다이 강도가 향상됩니다. 극박형(50μm 이하) 다이 제조와 스택 패키지(Stack Package) 제작에 유리합니다."
  },
  {
    "id": 61,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "솔더 재료에서 납프리(Lead-Free) 솔더를 사용하는 이유와 대표적인 SAC(SnAgCu) 합금계의 특성을 설명해보세요.",
    "answer": "납프리(Lead-Free) 솔더가 산업 표준이 된 주요 이유는 환경 규제입니다. EU의 RoHS(Restriction of Hazardous Substances) 지침이 2006년 시행되면서 전자 제품에서 납(Pb)의 사용이 엄격히 제한되었습니다. 납은 인체와 환경에 유해한 중금속으로, 전자 폐기물 처리 과정에서 토양·수질 오염의 원인이 됩니다. 대표적인 납프리 솔더는 SAC(Sn-Ag-Cu) 계열 합금으로, 주석(Sn), 은(Ag), 구리(Cu)의 혼합물입니다. SAC305(Sn 96.5%, Ag 3%, Cu 0.5%)가 가장 널리 사용됩니다. Sn-Pb 공정 합금(63/37) 대비 녹는점이 약 217°C로 높아 리플로(Reflow) 온도가 상승합니다. Ag 함량이 높을수록 기계적 강도와 크리프(Creep) 저항이 향상되지만, 비용이 증가합니다. Cu 함량은 젖음성(Wettability) 향상과 IMC(Intermetallic Compound) 성장 억제에 기여합니다. 응용 목적에 따라 Ag와 Cu 함량을 조절하여 최적 특성을 확보합니다.",
    "keywords": [
      "Lead-Free Solder",
      "SAC Alloy",
      "SnAgCu",
      "RoHS",
      "Melting Point"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "납프리(Lead-Free) 솔더는 EU RoHS 등 환경 규제로 Pb 사용이 제한됨에 따라 도입되었습니다. SAC(Sn-Ag-Cu) 합금이 표준으로, SAC305(Sn 96.5%, Ag 3%, Cu 0.5%)가 가장 널리 사용됩니다. Sn-Pb 대비 녹는점이 높아(~217°C) 리플로(Reflow) 온도가 상승하며, Ag 함량이 기계적 강도와 크리프(Creep) 저항을 결정합니다."
  },
  {
    "id": 62,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "EMC(Epoxy Molding Compound)의 주요 구성 성분과 각 성분의 역할을 설명해보세요.",
    "answer": "EMC(Epoxy Molding Compound)는 반도체 패키지 몰딩에 사용되는 복합 재료로, 여러 성분의 조합으로 이루어집니다. 주요 구성 성분과 역할은 다음과 같습니다. 첫째, 에폭시 수지(Epoxy Resin)는 매트릭스 역할을 하며 기계적 강도, 전기적 절연성, 화학적 안정성을 제공합니다. 둘째, 경화제(Hardener, Curing Agent)는 에폭시와 반응하여 가교(Crosslinking) 구조를 형성합니다. 셋째, 실리카 필러(Silica Filler)는 전체 EMC 부피의 70~90%를 차지하며, 열팽창계수(CTE)를 실리콘에 가깝게 낮추고, 열 전도성을 향상시키며, 기계적 강도를 높입니다. 넷째, 이형제(Release Agent)는 금형으로부터 쉽게 분리되도록 합니다. 다섯째, 플레임 리타던트(Flame Retardant)는 UL 94 V-0 등의 난연 등급 요구를 만족시킵니다. 여섯째, 착색제(Colorant)는 패키지를 검은색으로 만들어 광선에 의한 회로 노출을 방지합니다. 이 성분들의 조성 비율에 따라 EMC의 유동성, 경화 특성, 열팽창계수가 결정됩니다.",
    "keywords": [
      "EMC",
      "Epoxy Resin",
      "Silica Filler",
      "Hardener",
      "Flame Retardant"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "EMC(Epoxy Molding Compound)의 주요 성분은 기계적 강도·절연성을 제공하는 에폭시 수지(Epoxy Resin), 경화 반응을 유발하는 경화제(Hardener), CTE 저감·방열을 담당하는 실리카 필러(Silica Filler, 70~90%), 금형 분리를 돕는 이형제(Release Agent), 난연을 위한 플레임 리타던트(Flame Retardant)입니다."
  },
  {
    "id": 63,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "언더필(Underfill)의 종류인 CUF(Capillary Under Fill), MUF(Molded Under Fill), NCF(Non-Conductive Film)를 비교 설명해보세요.",
    "answer": "언더필(Underfill) 재료는 충진 방식에 따라 CUF, MUF, NCF로 구분됩니다. CUF(Capillary Under Fill)는 플립 칩(Flip Chip) 조립 완료 후, 다이 측면에 액상 언더필을 도포하면 모세관 현상으로 다이 하부의 범프(Bump) 사이로 자동 침투·충진됩니다. 이후 열경화로 고정합니다. 공정이 추가되는 단점이 있으나 재료 선택 자유도가 높고 충진 품질이 우수합니다. MUF(Molded Under Fill)는 EMC(Epoxy Molding Compound) 몰딩 공정 중에 동시에 다이 하부까지 충진하는 방식입니다. 별도의 언더필 공정이 필요 없어 공정이 단순화되지만, EMC 재료가 범프 사이 미세 공간까지 충진될 수 있는 유동성이 요구됩니다. NCF(Non-Conductive Film)는 고체 필름 형태의 언더필을 다이 부착 전 미리 기판에 라미네이션하거나 다이 배면에 부착한 후, 다이 어태치 공정과 동시에 접합합니다. 공정이 간단하고 적층 패키지에 적합합니다.",
    "keywords": [
      "CUF",
      "MUF",
      "NCF",
      "Underfill",
      "Process Compatibility"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "CUF(Capillary Under Fill)는 조립 후 액상 언더필을 모세관 현상으로 침투시켜 충진 품질이 우수합니다. MUF(Molded Under Fill)는 EMC 몰딩과 동시에 충진하여 공정이 단순화됩니다. NCF(Non-Conductive Film)는 필름 형태로 미리 부착 후 다이 어태치와 동시 접합하며, 적층 패키지에 적합합니다."
  },
  {
    "id": 64,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "와이어 본딩 재료에서 Au 와이어, Cu 와이어, Ag 합금 와이어의 특성과 장단점을 비교해보세요.",
    "answer": "와이어 본딩(Wire Bonding)에 사용되는 세 가지 주요 와이어 재료를 비교합니다. Au(금) 와이어는 내산화성이 뛰어나 와이어 표면 산화가 없어 본딩 품질이 안정적이고 신뢰성이 높습니다. 공정 조건 제어가 쉬우나 금 가격이 높아 재료 원가 부담이 큽니다. Cu(구리) 와이어는 Au 대비 비용이 약 1/5 수준으로 저비용이며, 전기 전도성과 기계적 강도가 우수합니다. 단, 산화가 쉬우므로 본딩 공정 중 N2/H2 혼합 가스로 산화 방지 분위기를 형성해야 합니다. 또한 높은 경도로 인해 본딩 시 다이 패드(Pad) 손상(크레이터링, Cratering) 위험이 Au 대비 높습니다. Ag(은) 합금 와이어는 Au와 Cu의 중간적 특성을 가집니다. Au보다 저비용이면서 Cu보다 산화 저항성이 우수합니다. 전도성도 Cu에 준하는 수준입니다. 현재 산업에서는 원가 절감을 위해 Cu 와이어 채택이 증가하고 있으며, Ag 합금 와이어도 점차 확대되고 있습니다.",
    "keywords": [
      "Au Wire",
      "Cu Wire",
      "Ag Alloy Wire",
      "Cost",
      "Bond Reliability"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Au 와이어는 내산화성이 우수하고 본딩 품질이 안정적이나 비용이 높습니다. Cu 와이어는 Au 대비 약 1/5의 저비용이고 전도성이 우수하나 산화 방지를 위해 N2/H2 가스 분위기가 필요하고 패드 손상(Cratering) 위험이 있습니다. Ag 합금 와이어는 Au와 Cu의 중간 특성으로 산화 저항성이 Cu보다 우수하며 비용도 합리적입니다."
  },
  {
    "id": 65,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "심화",
    "question": "서브스트레이트(Substrate) 제조에서 포토 레지스트(Photo Resist)의 Positive 타입과 Negative 타입의 화학적 동작 원리 차이를 설명해보세요.",
    "answer": "포토 레지스트(Photo Resist)는 광에 반응하여 화학적 성질이 변화하는 고분자 재료로, 반도체 및 서브스트레이트(Substrate) 패턴 형성에 필수적입니다. Positive 타입과 Negative 타입은 광 반응 방향이 반대입니다. Positive 타입은 광에 노출된 부분의 화학 결합이 분해되어 현상액(Developer)에 용해됩니다. 일반적으로 노볼락(Novolac) 수지와 PAC(Diazonaphthoquinone, DNQ)로 구성됩니다. PAC는 광이 닿으면 케텐(Ketene) 중간체를 거쳐 카르복실산으로 변환되어 현상액에 용해도가 높아집니다. 마스크 패턴이 그대로 웨이퍼에 전사됩니다. Negative 타입은 광에 노출된 부분이 가교(Crosslinking) 반응으로 경화되어 현상액에 불용성이 됩니다. 노출되지 않은 부분이 제거됩니다. 패턴이 마스크의 반전 형태로 형성됩니다. Positive 타입은 해상도가 우수하여 미세 패턴 구현에 유리하고, Negative 타입은 밀착성과 내화학성이 우수합니다.",
    "keywords": [
      "Positive PR",
      "Negative PR",
      "Exposure Reaction",
      "Substrate Patterning",
      "Resolution"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Positive 포토 레지스트(Photo Resist)는 광에 노출된 부분이 화학적으로 분해되어 현상액에 용해되고, 마스크 패턴이 그대로 전사됩니다. Negative 타입은 광에 노출된 부분이 가교(Crosslinking)되어 경화되고, 비노출 부분이 제거되어 마스크의 반전 패턴이 형성됩니다. Positive는 고해상도에 유리하고, Negative는 밀착성이 우수합니다."
  },
  {
    "id": 66,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "HAST(Highly Accelerated Stress Test)와 THB(Temperature Humidity Bias)의 시험 조건 차이와 각각 어떤 불량 모드를 가속하는지 설명해보세요.",
    "answer": "HAST(Highly Accelerated Stress Test)와 THB(Temperature Humidity Bias)는 모두 고온고습 환경에서 패키지 신뢰성을 평가하는 시험이지만 조건과 목적이 다릅니다. THB는 85°C/85%RH 조건에서 바이어스 전압을 인가하며 수백~수천 시간 동안 진행합니다. 상대적으로 낮은 온도·습도 조건에서 장기간 평가합니다. HAST는 130°C 또는 110°C, 85%RH 이상의 과포화 고압 증기 조건에서 진행합니다. 온도와 압력이 높아 수분 침투 속도가 THB 대비 훨씬 빠르므로 시험 시간이 대폭 단축됩니다. JEDEC 표준에서 Biased HAST(바이어스 인가)와 Unbiased HAST(UHAST, 바이어스 없음)로 구분합니다. 가속하는 불량 모드는 공통적으로 금속 배선 부식(Corrosion), 이온 마이그레이션(Ion Migration), 계면 박리(Delamination)입니다. 바이어스 인가 조건(THB, Biased HAST)은 이온 마이그레이션이 더 잘 가속되며, UHAST는 수분 침투로 인한 부식과 박리를 가속합니다.",
    "keywords": [
      "HAST",
      "THB",
      "Moisture Acceleration",
      "Bias Stress",
      "Corrosion"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "THB(Temperature Humidity Bias)는 85°C/85%RH와 바이어스 전압 인가 조건에서 장기간 진행하고, HAST(Highly Accelerated Stress Test)는 130°C, 과포화 고압 증기 조건으로 수분 침투를 빠르게 가속하여 단기간에 평가합니다. 둘 다 금속 부식(Corrosion), 이온 마이그레이션(Ion Migration), 계면 박리(Delamination)를 가속하며, HAST가 시험 시간을 대폭 단축합니다."
  },
  {
    "id": 67,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "MSL(Moisture Sensitivity Level) 등급별 관리 조건과, MSL 관리 실패 시 발생할 수 있는 패키지 불량을 설명해보세요.",
    "answer": "MSL(Moisture Sensitivity Level)은 JEDEC J-STD-020 표준에 따라 Level 1부터 Level 6까지 분류됩니다. 등급이 낮을수록 흡습에 강하고 개봉 후 사용 가능 시간이 길며, 등급이 높을수록 엄격한 관리가 필요합니다. 대표적인 관리 조건은 다음과 같습니다. Level 1은 무제한 바닥 수명(Unlimited Floor Life)으로 관리가 필요 없습니다. Level 2는 23°C/60%RH에서 1년, Level 2a는 4주, Level 3은 168시간, Level 4는 72시간, Level 5는 48시간, Level 6은 TOE(Time On Exposure) 방식으로 극히 짧은 시간만 허용됩니다. MSL 관리에 실패하면 패키지 내부에 과도한 수분이 흡수된 상태에서 리플로(Reflow) 고온에 노출될 때 수분이 급격히 기화하여 내부 압력이 상승합니다. 이로 인해 패키지 크랙(Package Crack), 다이와 기판 계면 박리(Die Delamination), 와이어 본딩(Wire Bonding) 손상, 솔더 접합부 보이드(Void) 등 다양한 불량이 발생합니다. 팝콘 현상(Popcorn Effect)이라 불립니다.",
    "keywords": [
      "MSL Level",
      "Floor Life",
      "Dry Pack",
      "Popcorn Defect",
      "Delamination"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "MSL(Moisture Sensitivity Level)은 J-STD-020 기준 Level 1~6이며, 등급이 높을수록 개봉 후 허용 시간이 짧습니다. Level 1은 무제한, Level 3은 168시간, Level 5는 48시간이 허용됩니다. 관리 실패 시 리플로(Reflow) 고온에서 수분이 급기화하여 팝콘 현상(Popcorn Effect), 패키지 크랙(Crack), 계면 박리(Delamination)가 발생합니다."
  },
  {
    "id": 68,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "Data Retention이란 무엇이며, 반도체 메모리 패키지 신뢰성에서 어떻게 평가하나요?",
    "answer": "Data Retention(데이터 유지 특성)은 반도체 메모리가 전원 없이 저장된 데이터를 얼마나 오랫동안 유지할 수 있는지를 나타내는 신뢰성 지표입니다. 주로 Flash 메모리(NAND, NOR)나 EEPROM에서 중요하게 평가됩니다. 플로팅 게이트(Floating Gate) 또는 전하 트랩(Charge Trap) 구조에 저장된 전하가 시간이 지남에 따라 누설되면 데이터가 손실됩니다. JEDEC 표준에 따르면 대부분의 소비자용 Flash는 10년 이상의 Data Retention을 요구하며, 산업용·차량용은 더 긴 수명을 요구합니다. 평가 방법은 아레니우스(Arrhenius) 모델을 이용한 가속 시험입니다. 고온(예: 150°C, 200°C)에서 시간을 단축하여 실제 사용 온도에서의 수명을 예측합니다. 활성화 에너지(Ea)를 구하여 가속 인자를 계산합니다. 패키지 신뢰성 관점에서는 몰딩 공정의 고온 공정이나 납땜 공정이 메모리 셀의 전하 특성에 영향을 줄 수 있으므로, 공정 후 Data Retention을 검증합니다.",
    "keywords": [
      "Data Retention",
      "Charge Loss",
      "Memory Cell",
      "High Temperature Stress",
      "Retention Test"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Data Retention은 전원 없이 메모리가 데이터를 유지하는 기간 특성으로, NAND Flash 등에서 핵심 신뢰성 지표입니다. 아레니우스(Arrhenius) 가속 시험으로 고온에서 수명을 단기 평가하고, 활성화 에너지(Ea)로 실제 사용 온도의 수명을 예측합니다. 패키지 몰딩·납땜 공정 후 메모리 셀 특성 변화도 검증해야 합니다."
  },
  {
    "id": 69,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "반도체 낙하 시험(Drop Test)의 목적과 주요 평가 항목, 그리고 이를 개선하기 위한 설계 방향을 설명해보세요.",
    "answer": "낙하 시험(Drop Test)은 스마트폰, 태블릿, 웨어러블 기기 등 모바일 제품에서 실제 사용 중 발생하는 낙하 충격에 대한 내구성을 평가하는 신뢰성 시험입니다. JEDEC JESD22-B111 등의 표준에 따라 보드 레벨(Board Level)에서 1,500G, 0.5ms의 충격 조건을 반복 인가합니다. 낙하 충격 시 PCB 기판이 굽힘(Bending)을 받으며 솔더 접합부(Solder Joint)에 큰 전단 응력(Shear Stress)이 순간적으로 가해집니다. 주요 평가 항목은 솔더 접합부의 균열(Crack) 발생, 패키지와 기판 사이의 박리(Delamination), 기판 배선의 단선입니다. 낙하 신뢰성 개선 방법은 다음과 같습니다. 첫째, 언더필(Underfill)을 적용하여 솔더 접합부에 집중되는 응력을 분산시킵니다. 둘째, 코너 글루(Corner Glue)를 패키지 모서리에 도포하여 충격 흡수 능력을 높입니다. 셋째, 솔더볼 크기와 피치를 최적화합니다. 넷째, 유한요소 해석(FEA)으로 사전 시뮬레이션합니다.",
    "keywords": [
      "Drop Test",
      "Board Level Reliability",
      "Solder Crack",
      "Mechanical Shock",
      "Reinforcement Design"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "낙하 시험(Drop Test)은 모바일 기기의 낙하 충격 내구성을 평가하며, JESD22-B111 기준 1,500G 이상의 충격을 반복 인가합니다. 솔더 접합부(Solder Joint) 균열, 계면 박리(Delamination)를 주로 평가합니다. 개선 방법으로 언더필(Underfill) 적용, 코너 글루(Corner Glue) 도포, 솔더볼 피치 최적화, FEA 시뮬레이션이 사용됩니다."
  },
  {
    "id": 70,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "심화",
    "question": "JEDEC 표준에서 신뢰성 시험 관련 주요 표준(JC11, JC14 등)의 역할과 산업에서의 적용 방식을 설명해보세요.",
    "answer": "JEDEC은 다양한 위원회(Committee)를 통해 반도체 신뢰성 관련 표준을 제정합니다. 주요 위원회와 표준은 다음과 같습니다. JC-11은 패키지 기계적 표준을 담당하며, 패키지 외형 치수(Outline Dimensions), 공차(Tolerance) 등을 규정합니다. JC-14는 반도체 패키지 신뢰성 관련 표준을 담당하며, JESD22 시리즈가 대표적입니다. JESD22에는 THB, HAST, TC(Thermal Cycle), 낙하 시험(Drop Test), 납땜 열충격(Solder Heat) 등 다양한 신뢰성 시험 방법이 포함됩니다. J-STD-020은 MSL(Moisture Sensitivity Level)과 리플로(Reflow) 조건을 규정합니다. 산업에서는 이 표준들을 다음과 같이 적용합니다. 고객사(Customer)는 공급사에 JEDEC 표준에 따른 신뢰성 데이터를 요구합니다. OSAT는 표준 시험 조건과 판정 기준을 따라 신뢰성 시험을 수행하고 데이터를 고객에게 제출합니다. 차량용(Automotive) 등 고신뢰성 분야에서는 JEDEC 표준 외에 AEC-Q100 등 추가 요구사항이 병행 적용됩니다.",
    "keywords": [
      "JEDEC",
      "JC11",
      "JC14",
      "JESD22",
      "Reliability Qualification"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "JEDEC 신뢰성 관련 주요 위원회로 JC-11(패키지 기계 표준), JC-14(신뢰성 시험 표준)가 있습니다. JC-14의 JESD22 시리즈는 THB, HAST, TC(Thermal Cycle), 낙하 시험(Drop Test) 등의 시험 방법을 규정하고, J-STD-020은 MSL과 리플로(Reflow) 조건을 정의합니다. 고객사는 이 표준에 따른 데이터를 요구하고 공급사는 이를 제출합니다."
  },
  {
    "id": 71,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "심화",
    "question": "Arrhenius 모델을 활용하여 패키지 수명을 예측하는 방법을 설명하고, 가속 인자(AF)를 계산하는 공식을 유도하시오.",
    "answer": "Arrhenius 모델은 반응 속도가 온도에 지수적으로 비례한다는 가정을 기반으로 합니다. 수명 예측식은 t = A × exp(Ea / kT)이며, 여기서 Ea는 활성화 에너지(eV), k는 Boltzmann 상수(8.617×10⁻⁵ eV/K), T는 절대 온도입니다. 가속 인자 AF는 사용 조건(Tu)과 가속 조건(Ts) 간의 수명 비율로, AF = exp[(Ea/k) × (1/Tu - 1/Ts)]로 계산됩니다. 예를 들어 Ea = 0.7 eV, Tu = 55°C(328K), Ts = 125°C(398K)일 때 AF ≈ 52가 됩니다. 이는 가속 조건에서 100시간 시험이 사용 조건 5,200시간에 해당함을 의미합니다. 실제 적용 시 고려할 점은 첫째, 고장 메커니즘마다 Ea가 다르므로 적절한 값을 선택해야 하며, 둘째, 온도 외 습도, 전압 등 복합 스트레스는 별도의 모델(예: Eyring 모델)이 필요합니다. 셋째, 가속 조건이 과도하면 현실과 다른 고장 메커니즘이 유발될 수 있어 조건 선정에 주의가 필요합니다.",
    "keywords": [
      "Arrhenius Model",
      "Activation Energy",
      "Acceleration Factor",
      "Lifetime Prediction",
      "Temperature Stress"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Arrhenius 모델의 수명식은 t = A × exp(Ea/kT)이며, 가속 인자 AF = exp[(Ea/k) × (1/Tu - 1/Ts)]로 계산합니다. Ea는 고장 메커니즘별 활성화 에너지, Tu는 사용 온도, Ts는 가속 온도입니다. Ea = 0.7 eV 기준 55→125°C 가속 시 AF ≈ 52로, 가속 시험 100시간이 실사용 5,200시간에 해당합니다. 단, 과도한 가속 조건은 새로운 고장 메커니즘을 유발할 수 있어 주의가 필요합니다."
  },
  {
    "id": 72,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "심화",
    "question": "Coffin-Manson 모델이란 무엇이며, 솔더 접합부의 열 피로 수명을 예측하는 데 어떻게 적용되는지 설명하시오.",
    "answer": "Coffin-Manson 모델은 소성 변형(Plastic Strain)의 반복으로 인한 피로 파괴를 예측하는 모델로, Nf = C × (ΔεP)^(-m)의 형태를 가집니다. 여기서 Nf는 파괴까지의 사이클 수, ΔεP는 소성 변형 범위, C와 m은 재료 상수입니다. 솔더 접합부에 적용 시, 온도 사이클 동안 칩과 기판 간 CTE(열팽창계수) 차이로 인해 솔더에 전단 변형이 반복 가해집니다. 수정 Coffin-Manson 식에서는 온도 변화 범위 ΔT와 다이 크기 D를 고려한 ΔεP = (ΔCTE × ΔT × D) / (2 × h)를 사용합니다. 예를 들어 Si(CTE 3ppm/°C)와 FR4 기판(CTE 17ppm/°C) 간 ΔCTE = 14ppm/°C이며, 대형 다이일수록, 온도 범위가 클수록 솔더 수명은 단축됩니다. 따라서 언더필 적용, Low-CTE 기판 채택, 솔더 재료 최적화를 통해 수명을 연장합니다.",
    "keywords": [
      "Coffin-Manson Model",
      "Thermal Fatigue",
      "Plastic Strain",
      "Solder Joint",
      "Cycle Life"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Coffin-Manson 모델은 소성 변형 반복에 의한 피로 파괴를 Nf = C × (ΔεP)^(-m)으로 예측합니다. 솔더 접합부에서는 칩과 기판의 CTE 차이로 인해 온도 사이클마다 전단 변형이 반복됩니다. 변형 범위는 ΔCTE × ΔT × 다이 크기에 비례하므로, 다이가 크고 온도 변화가 클수록 수명이 짧아집니다. 언더필 적용이나 Low-CTE 기판 사용으로 수명을 연장할 수 있습니다."
  },
  {
    "id": 73,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "심화",
    "question": "Weibull 분포를 신뢰성 분석에 사용하는 이유와, Shape Parameter(β)의 값에 따른 고장 패턴 해석 방법을 설명하시오.",
    "answer": "Weibull 분포는 형상 매개변수(β, Shape Parameter)와 척도 매개변수(η, Scale Parameter) 두 개로 다양한 고장 패턴을 표현할 수 있어 반도체 신뢰성 분석에 광범위하게 사용됩니다. 고장률 함수는 h(t) = (β/η) × (t/η)^(β-1)로 정의됩니다. β < 1이면 고장률이 시간에 따라 감소하는 초기 고장(Infant Mortality) 패턴으로, 제조 공정 결함이 원인입니다. β = 1이면 고장률이 일정한 우발 고장(Random Failure) 패턴으로, 지수 분포와 동일하며 외부 충격 등이 원인입니다. β > 1이면 고장률이 시간에 따라 증가하는 마모 고장(Wear-Out Failure) 패턴으로, 노화나 재료 열화가 원인입니다. 욕조 곡선(Bathtub Curve)의 각 구간이 이 세 가지 β 값에 대응합니다. 실무에서는 수명 시험 데이터를 Weibull 확률지에 플로팅하여 β를 추정하고, 고장 메커니즘을 판단합니다. B10 수명(불량률 10% 시점)이나 MTTF(평균 고장 시간)도 η와 β로 계산합니다.",
    "keywords": [
      "Weibull Distribution",
      "Shape Parameter",
      "Failure Rate",
      "Early Failure",
      "Wear-Out"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Weibull 분포는 형상 매개변수 β로 고장 패턴을 유연하게 표현할 수 있어 신뢰성 분석에 사용됩니다. β < 1은 초기 고장(제조 결함), β = 1은 우발 고장(무작위 스트레스), β > 1은 마모 고장(노화, 열화)을 나타냅니다. 이 세 구간이 욕조 곡선의 각 단계에 대응합니다. 수명 시험 데이터를 Weibull 확률지에 플로팅하여 β를 추정하고, B10 수명이나 MTTF를 산출합니다."
  },
  {
    "id": 74,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "심화",
    "question": "포토레지스트(Photo Resist)의 양성(Positive)과 음성(Negative) 방식의 반응 원리 차이를 설명하고, 각각의 적용 사례를 제시하시오.",
    "answer": "포토레지스트(Photo Resist)는 빛에 반응하여 용해도가 변하는 감광성 고분자 재료입니다. Positive PR은 노볼락(Novolac) 수지와 광산 발생제(PAC)로 구성되며, 노광된 영역의 PAC가 분해되어 현상액(TMAH)에 용해도가 증가합니다. 따라서 노광 영역이 제거되어 마스크 패턴과 동일한 형상이 기판에 남습니다. 해상도가 우수하여 미세 패턴 공정에 주로 사용되며, 반도체 전공정 포토리소그래피의 표준입니다. Negative PR은 노광 영역에서 광가교 반응(Cross-linking)이 일어나 용해도가 감소하여 현상 후 노광 부위가 남습니다. 따라서 마스크 패턴의 반전 형상이 형성됩니다. Undercut 구조 형성이 용이하고 내화학성이 강해 전기 도금(Electroplating) 공정, Bump 형성, MEMS 구조물 제작 등에 활용됩니다. 패키지 공정에서는 RDL(재배선층) 형성 시 두꺼운 Negative PR이 사용됩니다.",
    "keywords": [
      "Photo Resist",
      "Positive Tone",
      "Negative Tone",
      "Solubility Change",
      "Pattern Transfer"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Positive PR은 노광 영역이 현상액에 녹아 제거되고, Negative PR은 노광 영역이 광가교 반응으로 굳어 남습니다. Positive PR은 해상도가 높아 전공정 미세 패턴에 사용되고, Negative PR은 Undercut 구조 형성이 용이해 Bump 형성이나 RDL 공정에 사용됩니다. 패키지 후공정에서 두꺼운 Negative PR을 사용해 재배선층을 형성하는 것이 대표적 적용 사례입니다."
  },
  {
    "id": 75,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "패키지 설계에서 Signal Integrity(신호 무결성) 문제를 유발하는 원인과 이를 개선하기 위한 설계 기법을 설명하시오.",
    "answer": "Signal Integrity(SI)는 신호가 전송 경로에서 왜곡 없이 전달되는 특성을 의미합니다. SI 문제의 주요 원인은 첫째, Reflection(반사)으로, 임피던스 불연속 지점에서 신호가 반사되어 오버슈트/언더슈트를 유발합니다. 둘째, Crosstalk(누화)로, 인접 배선 간 전기적 결합으로 신호가 간섭받습니다. 셋째, SSN(Simultaneous Switching Noise)으로, 다수의 I/O가 동시에 스위칭할 때 전원/접지 인덕턴스에 의해 전압이 흔들립니다. 넷째, Skin Effect와 Dielectric Loss로 인해 고주파 신호 감쇠가 증가합니다. 설계 개선 기법으로는 첫째, 전송선 임피던스를 50Ω으로 제어하여 반사를 최소화합니다. 둘째, 인접 배선 간 간격을 3W 이상 확보(3W Rule)하여 Crosstalk를 줄입니다. 셋째, Decoupling Capacitor를 전원 핀 근처에 배치하여 SSN을 억제합니다. 넷째, 저유전율(Low-k) 기판 재료를 사용하고 Via를 최소화합니다. 고속 인터페이스에서는 Differential Pair 라우팅이 필수입니다.",
    "keywords": [
      "Signal Integrity",
      "Impedance Matching",
      "Crosstalk",
      "Return Path",
      "Layout Optimization"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Signal Integrity 문제의 주요 원인은 임피던스 불연속에 의한 Reflection, 인접 배선 간 Crosstalk, 동시 스위칭에 의한 SSN, 고주파 손실입니다. 개선 기법으로는 전송선 임피던스 50Ω 제어, 3W Rule 적용으로 배선 간격 확보, Decoupling Cap 배치로 SSN 억제, Low-k 기판 재료 사용이 있습니다. 고속 인터페이스에서는 Differential Pair 라우팅이 필수입니다."
  },
  {
    "id": 76,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "실전",
    "question": "패키지의 열 저항(Thermal Resistance) θja, θjc, θjb의 차이를 설명하고, 이를 활용한 접합 온도(Junction Temperature) 계산 방법을 서술하시오.",
    "answer": "열 저항은 반도체 소자의 열 방출 경로별 저항을 나타냅니다. θja(Junction-to-Ambient)는 접합부에서 주변 공기까지의 총 열 저항으로, 패키지의 전체 냉각 성능을 나타내며 자연 대류 조건에서 측정됩니다. θjc(Junction-to-Case)는 접합부에서 패키지 외면까지의 열 저항으로, 히트싱크 장착 시 유효하며 패키지 자체의 열 저항을 나타냅니다. θjb(Junction-to-Board)는 접합부에서 기판까지의 열 저항으로, 기판을 통한 방열 경로를 나타냅니다. 접합 온도 계산식은 Tj = Ta + P × θja (자연 대류), 또는 Tj = Tc + P × θjc (히트싱크 부착 시)입니다. 예를 들어 P = 5W, θja = 20°C/W, Ta = 25°C이면 Tj = 25 + 5×20 = 125°C가 됩니다. 최대 접합 온도(Tjmax) 이하로 유지해야 소자 신뢰성이 보장되며, 이를 초과하면 전기적 특성 열화 및 수명 감소가 발생합니다. 고전력 소자에는 히트싱크, TIM(열계면재료), 강제 냉각을 조합하여 사용합니다.",
    "keywords": [
      "Thermal Resistance",
      "θJA",
      "θJC",
      "θJB",
      "Junction Temperature"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "θja는 접합→공기, θjc는 접합→패키지 외면, θjb는 접합→기판으로의 열 저항입니다. 접합 온도는 Tj = Ta + P × θja 또는 히트싱크 부착 시 Tj = Tc + P × θjc로 계산합니다. 예를 들어 P=5W, θja=20°C/W, Ta=25°C면 Tj=125°C입니다. Tjmax를 초과하면 신뢰성이 저하되므로, 고전력 소자는 히트싱크와 TIM을 조합해 냉각합니다."
  },
  {
    "id": 77,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "TSV(Through Silicon Via) 기술의 형성 공정을 단계별로 설명하고, TSV가 HBM(High Bandwidth Memory) 구현에 필수적인 이유를 서술하시오.",
    "answer": "TSV(Through Silicon Via)는 실리콘 웨이퍼를 수직으로 관통하는 전기적 연결 구조입니다. 형성 공정은 다음 순서로 진행됩니다. 첫째, Via 형성 단계에서 Deep RIE(Bosch Process)로 직경 5~10μm, 깊이 50~100μm의 수직 홀을 식각합니다. 둘째, 절연막 형성 단계에서 홀 내벽에 SiO2 절연막을 증착하여 누설 전류를 방지합니다. 셋째, Barrier/Seed층 증착으로 Ti/TiN Barrier Metal과 Cu Seed Layer를 스퍼터링합니다. 넷째, Cu Electroplating으로 홀을 Cu로 완전히 채웁니다. 다섯째, CMP(Chemical Mechanical Planarization)로 표면을 평탄화합니다. 마지막으로 웨이퍼 Thinning으로 TSV 후면을 노출시킵니다. HBM에서 TSV가 필수인 이유는, DRAM 다이를 수직으로 수십 층 적층할 때 각 층을 TSV로 연결하여 와이어 본딩 대비 배선 길이를 1/1000 이하로 줄이기 때문입니다. 이를 통해 HBM은 256~1024비트의 초광폭 버스를 구현하여 수백 GB/s의 대역폭을 달성합니다.",
    "keywords": [
      "TSV Process",
      "Deep Etching",
      "Insulation",
      "Cu Filling",
      "HBM"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "TSV 공정은 Deep RIE로 Via 식각 → SiO2 절연막 증착 → Barrier/Seed층 스퍼터링 → Cu Electroplating → CMP 평탄화 → 웨이퍼 Thinning 순서로 진행됩니다. HBM에서 TSV가 필수인 이유는, 다단 적층된 DRAM 다이를 TSV로 수직 연결하면 배선 길이가 극히 짧아져 256~1024비트 광폭 버스를 구현할 수 있기 때문입니다. 이로써 수백 GB/s의 고대역폭을 실현합니다."
  },
  {
    "id": 78,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "2.5D 패키징에서 Silicon Interposer 방식(CoWoS)과 Organic Interposer 방식(EMIB)의 구조적 차이와 각각의 장단점을 비교하시오.",
    "answer": "2.5D 패키징은 두 개 이상의 칩을 공통 인터포저 위에 나란히 배치하여 고밀도로 연결하는 기술입니다. CoWoS(Chip on Wafer on Substrate)는 TSMC 기술로, 실리콘 웨이퍼 전체를 인터포저로 사용합니다. 수만 개의 TSV와 수μm급 미세 배선으로 칩 간 초고밀도 연결이 가능하며, GPU와 HBM처럼 대역폭이 극히 중요한 응용에 사용됩니다. 단점은 대면적 실리콘 인터포저의 수율 확보가 어렵고 제조 비용이 매우 높다는 점입니다. EMIB(Embedded Multi-die Interconnect Bridge)는 Intel 기술로, 유기 기판(PCB) 내부에 소면적 실리콘 브릿지를 매립합니다. 연결이 필요한 칩 간 경계 부분에만 실리콘 브릿지가 위치하므로, 인터포저 전체를 실리콘으로 만들 필요가 없습니다. 이를 통해 비용과 수율 측면에서 CoWoS 대비 유리합니다. 단, 연결 밀도는 CoWoS보다 낮습니다. 두 기술 모두 AI/HPC 분야의 이종 집적(Heterogeneous Integration)에 핵심 기술로 활용됩니다.",
    "keywords": [
      "Silicon Interposer",
      "CoWoS",
      "Organic Interposer",
      "EMIB",
      "Warpage"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "CoWoS는 대면적 실리콘 웨이퍼 전체를 인터포저로 사용하여 수μm급 초고밀도 배선과 TSV로 칩과 HBM을 연결합니다. 연결 밀도가 매우 높지만 비용이 높고 수율 확보가 어렵습니다. EMIB는 유기 기판 내부에 소면적 실리콘 브릿지만 매립하여 필요한 부위만 고밀도 연결합니다. CoWoS 대비 비용이 낮고 수율이 좋지만 연결 밀도는 낮습니다. 두 기술 모두 AI/HPC 이종 집적에 사용됩니다."
  },
  {
    "id": 79,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "Chiplet 아키텍처의 개념과 이점을 설명하고, Chiplet 간 연결을 위한 표준 인터페이스(UCIe 등)의 역할을 서술하시오.",
    "answer": "Chiplet 아키텍처는 하나의 모놀리식 SoC 대신, 기능별로 분리된 작은 다이(Chiplet)를 이종 집적하여 하나의 패키지를 완성하는 설계 방식입니다. 주요 이점은 첫째, 수율 향상으로, 대면적 단일 다이는 결함 밀도로 인해 수율이 크게 저하되지만, 소면적 Chiplet은 높은 수율을 유지합니다. 둘째, 공정 최적화로, CPU 코어는 첨단 노드(3nm)로, 아날로그나 I/O는 성숙 노드(28nm)로 각각 최적 공정에서 제조할 수 있습니다. 셋째, 설계 재사용성으로, 검증된 Chiplet을 여러 제품에 재사용할 수 있어 개발 비용과 기간이 단축됩니다. 넷째, 이종 집적으로, 다른 회사의 Chiplet을 결합하여 최적의 시스템을 구성할 수 있습니다. Chiplet 간 연결 표준으로 UCIe(Universal Chiplet Interconnect Express)가 등장했으며, 이는 다양한 제조사의 Chiplet을 상호 연결하기 위한 개방형 표준입니다. UCIe는 물리 계층(D2D Interface), 프로토콜 계층(PCIe/CXL), 소프트웨어 계층으로 구성되어 높은 대역폭과 낮은 전력을 제공합니다.",
    "keywords": [
      "Chiplet",
      "UCIe",
      "Die-To-Die Interface",
      "Yield Improvement",
      "Heterogeneous Integration"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Chiplet 아키텍처는 기능별로 분리된 소형 다이를 이종 집적하여 하나의 패키지를 구성합니다. 이점은 소면적화로 인한 수율 향상, 기능별 최적 공정 적용, 설계 재사용, 이종 집적이 가능하다는 것입니다. UCIe는 서로 다른 제조사의 Chiplet을 상호 연결하기 위한 개방형 표준으로, 물리 계층부터 프로토콜 계층까지 정의하여 높은 대역폭과 낮은 전력 소비를 목표로 합니다."
  },
  {
    "id": 80,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "Hybrid Bonding 기술의 원리를 설명하고, 기존 Micro-Bump 방식 대비 우수한 점과 양산 적용 시 기술적 과제를 서술하시오.",
    "answer": "Hybrid Bonding은 Cu-Cu 직접 금속 접합과 SiO2-SiO2 산화막 접합을 동시에 수행하는 Die-to-Die 또는 Wafer-to-Wafer 접합 기술입니다. 접합 원리는 먼저 양면 다이의 표면을 Chemical Mechanical Planarization으로 원자 수준으로 평탄화하고, Plasma 활성화 처리 후 상온에서 표면 접촉 시 산화막이 Van der Waals 힘으로 접합됩니다. 이후 열처리(200-400°C)에서 Cu가 열팽창하여 Cu-Cu 금속 접합이 완성됩니다. Micro-Bump 대비 우수한 점은 첫째, 접합 피치가 1~10μm로 Micro-Bump(50μm 이상)보다 훨씬 미세하여 연결 밀도가 수십~수백 배 높습니다. 둘째, 범프 재료(Solder, Cu Pillar)가 없어 패키지 두께가 크게 감소합니다. 셋째, 저항과 인덕턴스가 감소하여 전기적 성능이 향상됩니다. 양산 기술 과제로는 나노미터 수준의 표면 평탄도 및 정렬 정확도 확보, 결함 없는 접합 품질 검사 방법 개발, 그리고 접합 후 다이 수율 관리(KGD 이슈)가 있습니다.",
    "keywords": [
      "Hybrid Bonding",
      "Cu-Cu Bonding",
      "Fine Pitch",
      "Micro-Bump",
      "Surface Planarity"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Hybrid Bonding은 Cu-Cu 금속 접합과 SiO2-SiO2 산화막 접합을 동시에 수행합니다. 표면 평탄화 → Plasma 활성화 → 상온 접촉(산화막 접합) → 열처리(Cu 접합) 순으로 진행됩니다. Micro-Bump 대비 접합 피치가 1~10μm로 수십 배 미세하고, 범프 제거로 두께가 줄며 전기적 성능이 우수합니다. 과제는 나노 수준 평탄도·정렬 정확도 확보와 접합 품질 검사 방법 개발입니다."
  },
  {
    "id": 81,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "FOWLP(Fan-Out Wafer Level Package)의 구조와 제조 공정을 설명하고, Fan-In WLP 대비 기술적 장점을 서술하시오.",
    "answer": "FOWLP(Fan-Out Wafer Level Package)는 다이 면적보다 넓은 재배선 영역(Fan-Out 영역)을 활용하여 I/O를 재배치하는 패키지 기술입니다. 구조는 다이 주변을 EMC(에폭시 몰딩 컴파운드)로 매립하고, 그 위에 RDL(Redistribution Layer)을 형성한 후 Solder Ball을 배치합니다. 주요 공정은 두 가지 방식이 있습니다. Chip First 방식은 캐리어 웨이퍼에 다이를 Face-Down으로 배치 → EMC로 몰딩 → 캐리어 제거 → RDL 형성 → 솔더볼 배치 순서입니다. Chip Last 방식은 RDL을 먼저 형성한 후 다이를 플립칩 방식으로 접합합니다. Fan-In WLP 대비 장점은 첫째, I/O 수 확장 가능성으로, Fan-In은 다이 면적 내에서만 Ball을 배치할 수 있어 I/O가 제한되지만, Fan-Out은 다이 외부로 확장하여 수백~수천 개의 I/O를 수용합니다. 둘째, 기판 없이 제조 가능하여 패키지 두께가 얇고 제조 비용이 낮습니다. 셋째, 스텝 커버리지가 우수한 RDL로 전기적 성능이 우수합니다. TSMC InFO, ASE FOCoS 등이 대표적 FOWLP 기술입니다.",
    "keywords": [
      "FOWLP",
      "Reconstituted Wafer",
      "RDL",
      "Fan-Out",
      "Package Miniaturization"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "FOWLP는 다이를 EMC로 매립하고 다이 외부로 RDL을 확장하여 Solder Ball을 배치합니다. Chip First 방식은 다이 배치 → EMC 몰딩 → 캐리어 제거 → RDL 형성 → 솔더볼 순서입니다. Fan-In WLP 대비 I/O 수 제한이 없고, 기판 없이 제조 가능해 박형화 및 저비용화가 가능하며, 우수한 전기적 성능을 제공합니다. TSMC InFO, ASE FOCoS가 대표적입니다."
  },
  {
    "id": 82,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "RDL(Redistribution Layer) 형성 공정을 단계별로 설명하고, RDL이 현대 첨단 패키지에서 핵심적인 역할을 하는 이유를 서술하시오.",
    "answer": "RDL(Redistribution Layer, 재배선층)은 다이의 I/O 패드를 원하는 위치로 재배치하는 금속 배선 구조입니다. 형성 공정은 다음 순서로 진행됩니다. 첫째, 절연막 형성으로 PI(Polyimide) 또는 PBO(Polybenzoxazole) 절연층을 스핀 코팅합니다. 둘째, 리소그래피로 Via 개구부를 패터닝합니다. 셋째, Seed Layer 스퍼터링으로 Ti/Cu를 증착합니다. 넷째, Photo Resist 패터닝으로 배선 형상을 정의합니다. 다섯째, Cu Electroplating으로 배선을 형성합니다. 여섯째, PR 제거 및 Seed Layer 에칭으로 최종 배선을 완성합니다. 이 과정을 반복하여 다층 RDL을 형성합니다. 현대 패키지에서 RDL이 핵심적인 이유는 첫째, WLCSP와 FOWLP에서 기판 없이 I/O 재배치가 가능하여 패키지를 박형화합니다. 둘째, 미세 피치(Line & Space < 2μm)의 고밀도 배선으로 Chiplet 간 고속 신호 전송을 지원합니다. 셋째, 이종 칩 집적 시 서로 다른 I/O 피치를 호환하는 인터페이스 역할을 합니다.",
    "keywords": [
      "RDL",
      "Photolithography",
      "Cu Plating",
      "Redistribution",
      "Fine Pitch"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "RDL 형성은 절연막(PI/PBO) 코팅 → 리소그래피(Via 패터닝) → Seed Layer 스퍼터링 → PR 패터닝 → Cu 전기도금 → PR 및 Seed Layer 제거 순서로 진행하며, 이를 반복해 다층 RDL을 형성합니다. 현대 패키지에서 RDL은 기판 없이 I/O 재배치를 가능하게 하고, 미세 피치 고밀도 배선으로 Chiplet 간 연결을 지원하며, 이종 집적 시 피치 변환 인터페이스 역할을 합니다."
  },
  {
    "id": 83,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "SiP(System in Package)의 개념을 설명하고, SoC(System on Chip) 방식 대비 SiP의 기술적 장단점을 비교하시오.",
    "answer": "SiP(System in Package)는 CPU, 메모리, RF, 전원관리 IC 등 서로 다른 기능의 다이를 하나의 패키지 안에 통합하는 기술입니다. 반면 SoC(System on Chip)는 모든 기능을 하나의 다이에 집적합니다. SiP의 장점은 첫째, 이종 기술 통합이 가능합니다. 로직은 3nm, DRAM은 1Xnm, RF는 GaAs 공정 등 각 기능에 최적화된 공정을 사용할 수 있습니다. 둘째, 개발 기간이 짧습니다. 기존에 검증된 개별 다이를 조합하므로 새로운 SoC 설계보다 개발 기간과 비용이 적게 듭니다. 셋째, 소형화 및 박형화에 유리하여 웨어러블, IoT 기기 등에 적합합니다. SiP의 단점은 첫째, 다이 간 연결 지연이 SoC 내부 연결보다 커서 전기적 성능이 다소 낮을 수 있습니다. 둘째, 패키지 내 고장 발생 시 전체 교체가 필요한 경우가 있습니다. 셋째, 복잡한 조립 공정으로 패키지 단가가 높습니다. SoC는 집적 밀도와 성능이 높지만, 대면적 다이의 수율 저하와 높은 설계 비용이 단점입니다. Apple Watch, TWS 이어폰 등이 SiP의 대표적 적용 사례입니다.",
    "keywords": [
      "SiP",
      "SoC",
      "Heterogeneous Integration",
      "Time-To-Market",
      "Package Level Integration"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "SiP는 서로 다른 기능의 다이를 하나의 패키지에 통합하고, SoC는 하나의 다이에 모든 기능을 집적합니다. SiP의 장점은 이종 공정 최적화, 짧은 개발 기간, 소형화이고, 단점은 다이 간 연결 지연, 수리 어려움, 높은 조립 비용입니다. SoC는 성능과 집적도가 높지만 대면적 수율 저하와 높은 설계 비용이 단점입니다. Apple Watch가 대표적 SiP 사례입니다."
  },
  {
    "id": 84,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "HBM(High Bandwidth Memory)의 구조와 동작 원리를 설명하고, GDDR과 비교하여 어떤 응용 분야에 HBM이 적합한지 서술하시오.",
    "answer": "HBM(High Bandwidth Memory)은 DRAM 다이를 TSV로 수직 적층하고 로직 다이(Base Die) 위에 쌓아, 패키지 내에서 GPU나 AI 가속기와 근접 배치하는 차세대 메모리 기술입니다. HBM 구조는 Bottom의 Base Die(로직/MUX 회로) 위에 DRAM 코어 다이를 TSV와 Micro-Bump로 4~16층 적층하고, 이를 Silicon Interposer(2.5D) 위에서 GPU와 나란히 배치합니다. 동작 원리에서 HBM은 채널당 128비트 폭의 버스를 제공하며, 현재 HBM3는 8채널 × 128비트 = 1024비트 버스 폭을 가집니다. 이로써 HBM3는 819 GB/s 이상의 대역폭을 달성합니다. GDDR6 대비 HBM의 장점은 대역폭이 5~10배 높고, 전력 효율(GB/s per W)이 훨씬 우수하며, PCB 면적을 덜 차지합니다. 반면 GDDR은 표준 패키지로 제조되어 단가가 낮고 용량 확장이 용이합니다. HBM의 적합 응용은 대용량 데이터를 고속 처리해야 하는 AI/딥러닝 학습(GPU), HPC(슈퍼컴퓨터), 그래픽 렌더링, 네트워크 스위치 등이며, 메모리 대역폭이 연산 성능의 병목인 워크로드에 필수적입니다.",
    "keywords": [
      "HBM",
      "GDDR",
      "Memory Stack",
      "High Bandwidth",
      "AI Accelerator"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "HBM은 DRAM 다이를 TSV로 수직 적층하고 로직 다이 위에 쌓아, Silicon Interposer를 통해 GPU와 근접 배치합니다. HBM3는 1024비트 버스로 819 GB/s 이상의 대역폭을 제공합니다. GDDR 대비 대역폭이 5~10배 높고 전력 효율이 우수하지만 단가가 높습니다. AI 학습, HPC, 고성능 그래픽 등 메모리 대역폭이 병목인 응용 분야에 적합합니다."
  },
  {
    "id": 85,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "실전",
    "question": "ATE(Automatic Test Equipment)의 구성 요소와 역할을 설명하고, 테스트 비용을 절감하기 위한 주요 기술적 방법을 서술하시오.",
    "answer": "ATE(Automatic Test Equipment)는 반도체 소자의 전기적 특성과 기능을 자동으로 검사하는 장비 시스템입니다. 주요 구성 요소는 첫째, Tester 본체로, 디지털/아날로그/전원/타이밍 채널을 갖춘 핵심 계측 장비입니다. 둘째, Handler/Prober로, 패키지된 소자(Handler)나 웨이퍼(Prober)를 자동으로 이송하여 테스트 소켓에 정렬합니다. 셋째, DIB(Device Interface Board)/Load Board로, ATE와 DUT(Device Under Test) 사이의 신호 인터페이스를 담당합니다. 넷째, Test Socket/Probe Card로, DUT의 단자와 직접 접촉하는 소모품입니다. 다섯째, 테스트 프로그램(Test Program)으로, 테스트 순서와 판정 기준을 정의합니다. 테스트 비용 절감 방법으로는 첫째, Multi-Site Testing으로, 여러 DUT를 동시에 테스트하여 처리량(Throughput)을 높입니다. 둘째, Test Time 최적화로, 불필요한 테스트 항목을 제거하고 병렬 테스트를 적용합니다. 셋째, BIST(Built-In Self Test)로 칩 내부에 자가 테스트 회로를 내장하여 ATE 의존도를 줄입니다. 넷째, Adaptive Test로, 중간 결과에 따라 불량 소지품을 조기에 제외합니다.",
    "keywords": [
      "ATE",
      "Tester",
      "Handler",
      "Test Program",
      "Parallel Test"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "ATE는 Tester 본체, Handler/Prober, DIB/Load Board, Test Socket/Probe Card, Test Program으로 구성됩니다. 테스트 비용 절감 방법으로는 여러 DUT를 동시 검사하는 Multi-Site Testing, 불필요 항목 제거 및 병렬화로 테스트 시간 단축, 칩 내부에 자가 테스트 회로를 내장하는 BIST 적용, 조기 불량 선별로 낭비를 줄이는 Adaptive Test가 있습니다."
  },
  {
    "id": 86,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "반도체 테스트에서 IDDQ 테스트와 IDDT 테스트의 원리를 설명하고, 각각 어떤 결함을 검출하는 데 효과적인지 서술하시오.",
    "answer": "IDDQ(Quiescent IDD) 테스트는 CMOS 회로가 정적 상태(비스위칭 상태)일 때 전원 전류를 측정하는 기법입니다. 정상적인 CMOS 회로는 정적 상태에서 누설 전류만 흐르므로 IDD가 수십~수백 μA 수준으로 매우 낮습니다. 그러나 게이트 산화막 단락, 브리징 결함, 또는 PN 접합 단락 같은 내부 결함이 있으면 전류 경로가 형성되어 IDDQ가 mA 수준으로 급증합니다. 따라서 IDDQ 측정으로 내부 단락성 물리적 결함을 효과적으로 검출할 수 있습니다. IDDT(Transient IDD) 테스트는 회로가 스위칭하는 동안의 과도 전류를 측정합니다. 정상 회로는 스위칭 빈도와 비례하는 일정한 IDDT 패턴을 보이지만, 논리 게이트 결함이나 타이밍 오류가 있으면 비정상적인 전류 파형이 나타납니다. IDDT는 기능 테스트로 검출하기 어려운 지연 결함(Delay Fault)이나 일시적 오동작을 유발하는 결함 검출에 유리합니다. 두 기법 모두 전통적인 전압 출력 기반 테스트를 보완하는 전류 기반 테스트로, 첨단 미세 공정에서 결함 검출률을 높이는 데 활용됩니다.",
    "keywords": [
      "IDDQ Test",
      "IDDT Test",
      "Quiescent Current",
      "Transient Current",
      "Defect Detection"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "IDDQ 테스트는 정적 상태의 전원 전류를 측정하여 게이트 단락, 브리징 결함 같은 내부 단락성 결함을 검출합니다. 정상 CMOS는 μA 수준의 누설 전류만 흐르지만, 결함이 있으면 mA 수준으로 급증합니다. IDDT 테스트는 스위칭 중 과도 전류를 측정하여 기능 테스트로 검출하기 어려운 지연 결함이나 타이밍 오류를 검출합니다. 두 기법 모두 전압 기반 테스트를 보완합니다."
  },
  {
    "id": 87,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "메모리 테스트에서 March 알고리즘의 동작 원리를 설명하고, SAF(Stuck-At Fault)와 CF(Coupling Fault) 검출에 각각 어떻게 적용되는지 서술하시오.",
    "answer": "March 알고리즘은 메모리 셀에 대한 순차적 읽기/쓰기 작업의 집합으로 구성된 메모리 테스트 알고리즘입니다. March 테스트는 {(↑), (↓)} 방향으로 메모리 주소를 순회하며, 각 주소에서 읽기(R) 또는 쓰기(W) 작업을 수행합니다. SAF(Stuck-At Fault)는 특정 셀이 항상 0 또는 1로 고정되는 결함입니다. March 알고리즘은 초기화 단계에서 모든 셀에 0을 쓴 후 0을 읽어 SAF0를 검출하고, 이후 모든 셀에 1을 쓴 후 1을 읽어 SAF1을 검출합니다. CF(Coupling Fault)는 한 셀(Aggressor)의 상태 변화가 다른 셀(Victim)의 값에 영향을 미치는 결함입니다. March 알고리즘의 방향 전환(↑→↓) 구간에서 특정 패턴의 쓰기/읽기 작업을 통해 Aggressor 셀의 변화가 Victim 셀에 미치는 영향을 검출합니다. 대표적인 March 알고리즘으로 March C-는 5개의 March Element로 SAF, TF(Transition Fault), CF를 모두 검출할 수 있으며 테스트 복잡도는 O(14n)입니다. 고용량 메모리 테스트에서는 March 알고리즘의 테스트 시간을 줄이기 위해 BIST(Built-In Self Test)와 결합하여 사용합니다.",
    "keywords": [
      "March Algorithm",
      "SAF",
      "Coupling Fault",
      "Memory Test",
      "Address Sequence"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "March 알고리즘은 메모리 주소를 순방향/역방향으로 순회하며 읽기/쓰기를 반복하는 메모리 테스트 알고리즘입니다. SAF 검출은 전체 셀을 0으로 초기화 후 읽어 SAF0, 1로 초기화 후 읽어 SAF1을 확인합니다. CF 검출은 방향 전환 구간에서 Aggressor 셀 상태 변화가 Victim 셀에 영향을 미치는지 확인합니다. March C-는 O(14n) 복잡도로 SAF, TF, CF를 모두 검출합니다."
  },
  {
    "id": 88,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "심화",
    "question": "전자이동(Electromigration, EM) 현상의 발생 원리와 이것이 반도체 패키지의 Cu 배선 및 Solder Bump에 미치는 영향을 서술하시오.",
    "answer": "전자이동(Electromigration, EM)은 금속 배선에 고밀도 전류가 흐를 때, 전자의 운동량이 금속 원자에 전달되어 원자가 전류 방향으로 이동하는 현상입니다. 전자이동에 의한 원자 이동 속도는 Black's Equation으로 표현되며, 수명 MTTF = A × J^(-n) × exp(Ea/kT)에 비례합니다. 여기서 J는 전류 밀도, Ea는 활성화 에너지입니다. Cu 배선에서의 EM 영향은 전자 흐름의 상류 측에서는 원자가 빠져나가 Void(빈 공간)가 형성되어 단선을 유발하고, 하류 측에서는 원자가 축적되어 Hillock(돌기)이 형성되어 인접 배선 단락을 유발합니다. EM은 선폭이 줄어들수록(전류 밀도 증가) 심각해지므로 첨단 공정에서 중요한 신뢰성 이슈입니다. Solder Bump에서의 EM은 Current Crowding 효과로 인해 Cu/Solder 계면의 특정 부위에 전류가 집중되어 IMC(금속간화합물) 형성이 가속화되고 Void가 생성됩니다. EM 대책으로 배선 단면적 증대, 텅스텐 플러그 사용, 배선 재료의 Ea가 높은 Cu/Ta Barrier 사용, Solder Bump 크기 최적화가 있습니다.",
    "keywords": [
      "Electromigration",
      "Current Density",
      "Cu Routing",
      "Solder Bump",
      "Black’s Equation"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "전자이동(EM)은 고밀도 전류의 전자가 금속 원자를 이동시키는 현상으로, Cu 배선에서 상류에 Void(단선), 하류에 Hillock(단락)을 형성합니다. 수명은 Black's Equation MTTF ∝ J^(-n) × exp(Ea/kT)로 예측하며, 전류 밀도가 클수록 수명이 단축됩니다. Solder Bump에서는 Current Crowding으로 계면에 Void가 생성됩니다. 대책으로 배선 단면적 증대, 高Ea Barrier Metal 사용, Bump 크기 최적화가 있습니다."
  },
  {
    "id": 89,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "패키지 재료에서 CTE(열팽창계수) 불일치 문제를 설명하고, 이를 완화하기 위한 재료적·구조적 해결 방안을 서술하시오.",
    "answer": "CTE(Coefficient of Thermal Expansion, 열팽창계수) 불일치는 서로 다른 재료들이 온도 변화 시 팽창/수축하는 정도가 달라 접합 계면에 열 응력이 발생하는 문제입니다. 주요 재료별 CTE는 Si: 3ppm/°C, Cu: 17ppm/°C, FR4 기판: 16~18ppm/°C, BT 수지: 13~15ppm/°C, Solder(SAC305): 약 22ppm/°C입니다. CTE 불일치가 가장 큰 문제를 일으키는 계면은 Si 다이와 PCB 기판(ΔCTE ≈ 13~15ppm/°C) 사이로, 온도 사이클 동안 Solder Joint에 전단 응력이 반복 가해져 Coffin-Manson 피로 파괴를 유발합니다. 재료적 해결 방안으로는 첫째, 언더필(Underfill) 충전으로 Solder Joint에 가해지는 응력을 분산합니다. 둘째, Low-CTE 기판(세라믹, ABF 등)을 사용하여 ΔCTE를 줄입니다. 셋째, Si 다이에 가까운 CTE를 갖는 코어 재료(Cu-Mo, Cu-W)를 히트 스프레더로 사용합니다. 구조적 해결 방안으로는 Solder Ball 피치·크기·형상 최적화, ACF/NCP와 같은 이방성 전도 필름 사용, 다이 코너 부근에 더 강한 코너 글루를 적용하는 방법이 있습니다.",
    "keywords": [
      "CTE Mismatch",
      "Low CTE Material",
      "Stress Buffer",
      "Underfill",
      "Warpage Control"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "CTE 불일치는 서로 다른 재료의 팽창계수 차이로 접합 계면에 열 응력이 발생하는 문제입니다. Si(3ppm)와 FR4 기판(17ppm) 간 ΔCTE가 가장 크며, Solder Joint에 반복 응력이 가해져 피로 파괴를 유발합니다. 해결책으로 언더필로 응력 분산, Low-CTE 기판 사용, Cu-Mo 히트 스프레더 적용과 같은 재료적 방법과, Solder Ball 형상 최적화, 코너 글루 적용 같은 구조적 방법이 있습니다."
  },
  {
    "id": 90,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "반도체 공정에서 수율(Yield)의 종류(Die Yield, Package Yield, Final Test Yield)를 설명하고, 각 단계에서 수율을 향상시키는 방법을 서술하시오.",
    "answer": "반도체 수율은 제조 공정의 단계별로 정의됩니다. Die Yield(다이 수율)은 웨이퍼 상의 전체 다이 중 Wafer Test(Probe Test)를 통과한 양품 다이의 비율입니다. Die Yield = exp(-D0 × A)로 표현되며, D0는 결함 밀도, A는 다이 면적입니다. 다이 크기가 클수록, 결함 밀도가 높을수록 수율이 떨어집니다. Package Yield(패키지 수율)은 패키지 조립 공정에서 조립 불량, 와이어 본딩 불량, 솔더볼 불량 등으로 발생하는 손실을 제외한 수율입니다. Final Test Yield(최종 테스트 수율)은 패키지 완성 후 최종 전기 특성 검사에서 통과하는 비율로, 조립 공정 중 발생한 전기적 손상이나 패키지 내부 결함을 선별합니다. 수율 향상 방법으로는 Die Yield는 공정 결함 밀도 감소(공정 제어 강화, 클린룸 오염 관리), 설계 최적화(Design Rule 준수, DFM 적용)로 높입니다. Package Yield는 조립 공정 파라미터 최적화, 자동화 강화, 인라인 검사(AOI, X-ray) 확대로 높입니다. Final Test Yield는 EPM(Engineering Probe Map) 데이터와 연계하여 조립 결함을 추적하고, 테스트 커버리지를 높여 잠재 불량을 선제적으로 검출합니다.",
    "keywords": [
      "Die Yield",
      "Package Yield",
      "Final Test Yield",
      "Defect Pareto",
      "Yield Improvement"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Die Yield는 웨이퍼 테스트 통과 비율로 공정 결함 밀도와 다이 면적에 반비례합니다. Package Yield는 조립 공정 불량을 제외한 비율로, 공정 최적화와 인라인 AOI/X-ray 검사로 향상시킵니다. Final Test Yield는 최종 전기 특성 검사 통과율로, EPM 데이터 분석과 테스트 커버리지 향상으로 개선합니다. 전체 수율은 세 단계 수율의 곱으로 결정됩니다."
  },
  {
    "id": 91,
    "jobRole": "Package & Test",
    "category": "P&T 개요 및 후공정 이해",
    "group": "other",
    "difficulty": "실전",
    "question": "IDM, Fabless, OSAT의 비즈니스 모델을 비교하고, 각각의 장단점과 현재 반도체 산업에서의 역할을 설명하시오.",
    "answer": "IDM(Integrated Device Manufacturer)은 설계, 웨이퍼 제조, 패키지, 테스트를 모두 자체적으로 수행하는 수직 통합 모델입니다. 대표 기업은 인텔, 삼성, SK하이닉스입니다. 장점은 전 공정 최적화, 기술 기밀 보호, 빠른 내부 소통이며, 단점은 막대한 설비 투자 비용과 공정 변화에 대한 느린 대응입니다. Fabless는 설계만 하고 제조는 외부(Foundry, OSAT)에 위탁하는 모델입니다. 대표 기업은 Qualcomm, NVIDIA, AMD, Apple입니다. 장점은 초기 투자 비용이 낮고 설계에 집중할 수 있으며 빠른 제품 출시가 가능합니다. 단점은 제조 파트너 의존도가 높고, 기술 기밀 유출 위험이 있습니다. OSAT(Outsourced Semiconductor Assembly & Test)는 패키지 조립과 테스트만 전문으로 수행하는 기업입니다. 대표 기업은 ASE, Amkor, JCET입니다. 장점은 특정 패키지 공정에 전문화된 기술력과 높은 처리 용량을 제공합니다. 단점은 설계 역량이 없어 고부가가치 창출에 한계가 있습니다. 현재 산업 추세는 TSMC와 같은 Foundry의 패키지 사업 진출(CoWoS, InFO)로 OSAT와 Foundry의 경계가 흐려지고 있습니다.",
    "keywords": [
      "IDM",
      "Fabless",
      "OSAT",
      "Foundry",
      "Business Model"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "IDM은 설계부터 테스트까지 모두 자체 수행하며 인텔·삼성이 대표적입니다. 장점은 전 공정 최적화이고 단점은 높은 투자 비용입니다. Fabless는 설계만 하고 제조를 위탁하며 Qualcomm·NVIDIA가 대표적입니다. 초기 비용이 낮고 설계 집중이 가능하지만 제조 파트너 의존도가 높습니다. OSAT는 패키지·테스트 전문 기업으로 ASE·Amkor가 대표적이며, 현재 TSMC의 패키지 사업 진출로 OSAT와 Foundry 경계가 모호해지고 있습니다."
  },
  {
    "id": 92,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "Wafer Dicing 공정에서 Blade Dicing과 Stealth Laser Dicing의 원리를 비교하고, 각 방식의 적용 조건과 장단점을 서술하시오.",
    "answer": "웨이퍼 다이싱은 웨이퍼를 개별 다이로 절단하는 공정입니다. Blade Dicing은 다이아몬드 입자가 결합된 블레이드(두께 10~100μm)를 고속(수만 RPM) 회전시켜 물리적으로 웨이퍼를 절삭합니다. 절삭선(Kerf) 폭은 블레이드 두께에 따라 30~150μm입니다. 장점은 공정이 안정적이고 다양한 재료(Si, GaAs, Glass)에 적용 가능합니다. 단점은 기계적 충격으로 칩 에지에 Chipping(결손)이 발생하고, Kerf 손실이 크며, 박형 웨이퍼(< 100μm)에서 균열이 발생할 수 있습니다. Stealth Laser Dicing(SLD)은 웨이퍼 내부에 레이저 빔을 집광하여 개질층(Modified Layer)을 형성하고, 이후 테이프 익스팬딩으로 개질층을 따라 웨이퍼를 분리합니다. 장점은 Kerf 손실이 거의 없어(< 1μm) 다이 크기를 최대화할 수 있고, 박형 웨이퍼에서도 Chipping 없이 절단 가능하며, 절단면이 깨끗합니다. 단점은 가격이 비싸고, 두꺼운 웨이퍼나 SiC 등 일부 재료에서 개질층 형성이 어렵습니다. DBG(Dicing Before Grinding)는 SLD와 결합하여 박형 웨이퍼 제조에 주로 사용됩니다.",
    "keywords": [
      "Blade Dicing",
      "Stealth Laser Dicing",
      "Wafer Thickness",
      "Cutting Quality",
      "Throughput"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Blade Dicing은 다이아몬드 블레이드로 물리적 절삭하며 안정적이지만 Chipping과 Kerf 손실이 큽니다. Stealth Laser Dicing은 레이저로 웨이퍼 내부에 개질층을 형성 후 테이프 확장으로 분리하여 Kerf 손실이 거의 없고 박형 웨이퍼에 적합합니다. SLD는 다이 크기 최대화와 Chipping 방지가 가능하지만 비용이 높고 일부 재료에는 적용이 어렵습니다."
  },
  {
    "id": 93,
    "jobRole": "Package & Test",
    "category": "Package 공정 및 재료",
    "group": "other",
    "difficulty": "실전",
    "question": "Flip Chip 패키지에서 언더필(Underfill)의 역할을 설명하고, CUF, MUF, NCF 방식의 차이와 각각의 적용 사례를 서술하시오.",
    "answer": "Flip Chip 패키지에서 언더필(Underfill)은 플립 칩 다이와 기판 사이의 공간을 에폭시 수지로 채우는 공정으로, CTE 불일치로 인한 솔더 접합부의 열 응력을 분산시켜 신뢰성을 향상시킵니다. CUF(Capillary Underfill)는 플립칩 본딩 후 다이 에지에 언더필 재료를 디스펜싱하면 모세관 현상으로 다이 하부 공간에 자동으로 충전됩니다. 이후 열 경화(150°C, 60~120분)합니다. 장점은 공정이 성숙하고 재료 선택폭이 넓으나, 공정 시간이 길고 반유체 재료의 흐름 제어가 필요합니다. MUF(Molded Underfill)는 별도의 언더필 공정 없이 EMC 몰딩 공정에서 몰딩 컴파운드가 다이 하부까지 충전되도록 합니다. 공정 단계가 줄어 생산성이 높지만, 다이 하부의 완전한 충전 확인이 어렵습니다. NCF(Non-Conductive Film)는 다이 부착 전 다이 또는 기판에 필름형 언더필을 미리 부착합니다. 이후 열압착 본딩(TC Bonding) 시 NCF가 경화되어 언더필과 접합이 동시에 완료됩니다. 공정 단순화와 박형화에 유리하여 고밀도 적층 패키지(HBM, PoP)에 사용됩니다.",
    "keywords": [
      "Underfill",
      "CUF",
      "MUF",
      "NCF",
      "Flip Chip Reliability"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "언더필은 Flip Chip 다이와 기판 사이를 에폭시로 채워 CTE 불일치로 인한 솔더 접합부의 응력을 분산합니다. CUF는 모세관 현상으로 충전하는 성숙한 공정이지만 시간이 깁니다. MUF는 EMC 몰딩 시 하부까지 충전하여 공정을 단순화합니다. NCF는 필름형으로 사전 부착 후 본딩과 동시 경화하여 고밀도 적층 패키지에 적합합니다."
  },
  {
    "id": 94,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "심화",
    "question": "AEC-Q100 규격의 목적과 주요 테스트 항목을 설명하고, 자동차용 반도체가 일반 소비자용 반도체보다 엄격한 신뢰성 요구 조건을 갖는 이유를 서술하시오.",
    "answer": "AEC-Q100(Automotive Electronics Council Qualification 100)은 자동차용 IC의 신뢰성을 검증하는 국제 표준입니다. 목적은 자동차 환경에서 요구되는 극한 온도, 진동, 습도, 전자파 등의 혹독한 조건에서 반도체가 장기간 안정적으로 동작함을 보증하는 것입니다. 주요 테스트 항목은 Grade 0~4로 분류되며, Grade 0(-40 to 150°C)이 가장 엄격합니다. 테스트에는 High Temperature Operating Life(HTOL), Temperature Cycling(TC), HAST, THB, ESD, Latch-up, EMC, Mechanical Shock & Vibration이 포함됩니다. 자동차용 반도체의 신뢰성 요구가 엄격한 이유는 첫째, 안전 직결성으로, 자동차의 제동, 조향, 에어백 등의 안전 기능을 제어하는 반도체의 고장은 인명 피해로 직결됩니다. 둘째, 극한 환경으로, 엔진 룸 온도는 -40~150°C에 달하고 진동, 습도, 화학물질 노출 등 가혹한 환경에 노출됩니다. 셋째, 장기 신뢰성으로, 자동차의 설계 수명은 15년 이상으로, 이 기간 동안 무결함 동작이 요구됩니다. 넷째, 배타적 책임으로, 자동차 OEM은 부품 결함에 대해 법적 책임을 지므로, 부품 공급사에 높은 품질을 요구합니다.",
    "keywords": [
      "AEC-Q100",
      "Automotive Semiconductor",
      "Stress Test",
      "Mission Profile",
      "Quality Grade"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "AEC-Q100은 자동차용 IC의 신뢰성을 검증하는 국제 표준으로, HTOL, TC, HAST, THB, ESD, EMC 등을 포함합니다. Grade 0(-40~150°C)이 가장 엄격한 등급입니다. 자동차용 반도체에 엄격한 신뢰성이 요구되는 이유는 제동·조향·에어백 등 안전 기능과 직결되고, 극한 온도·진동·화학물질 환경에 노출되며, 15년 이상의 장기 무결함 동작이 필요하기 때문입니다."
  },
  {
    "id": 95,
    "jobRole": "Package & Test",
    "category": "Package 구조 및 설계",
    "group": "other",
    "difficulty": "심화",
    "question": "Power Integrity(전원 무결성) 문제의 원인을 설명하고, PDN(Power Delivery Network) 설계에서 이를 해결하는 방법을 서술하시오.",
    "answer": "Power Integrity(PI)는 반도체 칩에 안정적인 전원이 공급되는 특성을 의미합니다. PI 문제의 주요 원인은 첫째, 전원 공급 경로의 기생 인덕턴스(L)와 저항(R)으로, 전류가 급격히 변화할 때 ΔV = L × di/dt 형태의 전압 강하(SSN, Ground Bounce)가 발생합니다. 둘째, PCB와 패키지 배선의 임피던스로 인해 고주파에서 전원 전압이 요동칩니다. 셋째, 공진 현상으로, 전원 분배 네트워크(PDN)의 L과 C 성분이 공진하면 특정 주파수에서 임피던스 피크가 발생합니다. PDN(Power Delivery Network) 설계 해결 방법은 첫째, Bulk Capacitor는 수십~수백 μF의 대용량 커패시터로 낮은 주파수(수 kHz 이하) 임피던스를 낮춥니다. 둘째, Bypass/Decoupling Capacitor는 수 nF~수백 nF의 커패시터를 전원 핀과 가장 가까운 위치에 배치하여 중간 주파수(수 MHz) 임피던스를 낮춥니다. 셋째, Package Capacitor는 패키지 내부에 내장된 커패시터로 수십~수백 pF 수준이며, 수백 MHz 이상의 고주파 임피던스를 낮춥니다. 넷째, On-Die Decoupling Capacitor는 칩 내부에 형성되어 수 GHz 이상의 초고주파 임피던스를 제어합니다. 다층 커패시터의 조합으로 넓은 주파수 대역에서 평탄한 임피던스를 유지하는 것이 PDN 설계의 핵심입니다.",
    "keywords": [
      "Power Integrity",
      "PDN",
      "IR Drop",
      "Decoupling Capacitor",
      "Ground Bounce"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "Power Integrity 문제의 원인은 전원 경로의 기생 인덕턴스에 의한 SSN(di/dt), 배선 임피던스, PDN의 L-C 공진입니다. PDN 설계 해결책은 주파수 대역별 커패시터 조합입니다. Bulk Cap(수백 μF)은 저주파, Decoupling Cap(수십 nF)은 중간 주파수, Package Cap(수백 pF)은 수백 MHz, On-Die Cap은 GHz 이상 임피던스를 낮춥니다. 다층 커패시터 조합으로 넓은 대역에서 평탄한 임피던스를 유지하는 것이 핵심입니다."
  },
  {
    "id": 96,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "반도체 패키지 공정에서 EMC(Epoxy Molding Compound) 몰딩 시 발생할 수 있는 주요 불량 유형과 각 불량의 발생 원인 및 대책을 서술하시오.",
    "answer": "EMC 몰딩 공정에서 발생하는 주요 불량 유형과 원인 및 대책은 다음과 같습니다. 첫째, Void(기공)는 EMC 내부에 기포가 잔류하는 불량입니다. 수분 흡습이나 잔류 가스에 의해 발생하며, EMC 사전 건조 처리, 이송 속도 최적화, 진공 몰딩(Vacuum Transfer Molding) 적용으로 대응합니다. 둘째, Delamination(계면 박리)은 EMC와 리드프레임, 다이패드, 와이어 간 접합이 분리되는 불량입니다. 표면 오염이나 계면 접착력 부족이 원인이며, 표면 전처리(Plasma 처리), 프라이머(Primer) 적용, 저응력 EMC 선택으로 대응합니다. 셋째, Wire Sweep(와이어 쏠림)은 EMC 이송 중 유동력으로 와이어가 변형되어 단락 또는 단선을 유발합니다. 이송 속도 감소, 와이어 루프 최적화, 고점도 EMC 적용으로 대응합니다. 넷째, Bleed(블리드)는 EMC의 저점도 성분이 다이패드 상면 또는 리드 단자로 번지는 불량입니다. 금형 클램핑 압력과 EMC 점도 최적화로 대응합니다. 다섯째, Crack(균열)은 열 응력 또는 수분에 의한 팝콘 크랙으로 패키지가 파손됩니다. MSL 관리 준수, 저CTE/저흡습 EMC 선택으로 대응합니다.",
    "keywords": [
      "EMC Molding Defect",
      "Void",
      "Delamination",
      "Wire Sweep",
      "Process Parameter"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "EMC 몰딩 주요 불량은 다섯 가지입니다. Void(기공)는 수분·가스 잔류가 원인으로 진공 몰딩과 사전 건조로 대응합니다. Delamination은 계면 접착력 부족이 원인으로 Plasma 처리와 Primer로 대응합니다. Wire Sweep는 수지 유동으로 와이어가 쏠리는 불량으로 이송 속도 감소와 고점도 EMC로 대응합니다. Bleed는 저점도 성분 번짐으로 클램핑 압력 최적화로 대응합니다. Crack은 팝콘 크랙으로 MSL 관리와 저흡습 EMC로 대응합니다."
  },
  {
    "id": 97,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "실전",
    "question": "BGA(Ball Grid Array) 패키지의 Solder Ball 접합 품질을 검사하는 방법(2D AOI, 3D SPI, X-ray CT)을 비교하고 각각의 한계점을 설명하시오.",
    "answer": "BGA 패키지의 솔더볼 접합 품질 검사 방법을 비교합니다. 2D AOI(Automated Optical Inspection)는 카메라로 PCB 표면을 촬영하여 솔더 인쇄 면적, 형상, 이물질 등을 검사합니다. 처리 속도가 빠르고 비용이 낮지만, 패키지 하부의 솔더볼 접합 상태는 광학적으로 접근 불가하여 BGA의 내부 접합 불량 검출에 근본적인 한계가 있습니다. 3D SPI(Solder Paste Inspection)는 구조광(Fringe Projection) 또는 레이저를 이용하여 솔더 페이스트의 높이, 체적, 형상을 3차원으로 측정합니다. 인쇄 공정 직후 솔더 부피 부족이나 위치 오프셋을 조기에 검출하여 리플로우 후 불량을 예방합니다. 단, 리플로우 후의 실제 접합 형상은 검사할 수 없습니다. X-ray 검사(2D X-ray, 3D CT)는 투과 방사선으로 패키지 내부를 촬영하여 솔더볼의 형상, 브리지, Void, 단선 등을 검출합니다. 2D X-ray는 빠르지만 상하 중첩 이미지로 다층 구조 분석에 한계가 있습니다. 3D CT는 360° 다각도 촬영으로 내부 구조를 정확히 재현하지만 검사 시간이 길고 비용이 매우 높아 전수 검사보다는 샘플링이나 불량 분석에 주로 사용됩니다.",
    "keywords": [
      "BGA Inspection",
      "2D AOI",
      "3D SPI",
      "X-Ray CT",
      "Hidden Joint"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "2D AOI는 표면 광학 검사로 빠르지만 BGA 내부 솔더볼 접합 검출이 불가합니다. 3D SPI는 솔더 페이스트를 3D로 측정하여 인쇄 불량을 조기 검출하지만 리플로우 후 접합 상태는 검사 불가합니다. X-ray 검사는 패키지 내부 솔더볼 Void, 브리지, 단선을 검출할 수 있으며, 3D CT는 정확하지만 검사 시간이 길고 비용이 높아 샘플링 검사나 불량 분석에 주로 사용됩니다."
  },
  {
    "id": 98,
    "jobRole": "Package & Test",
    "category": "신뢰성·품질·불량 분석",
    "group": "other",
    "difficulty": "심화",
    "question": "반도체 신뢰성에서 IMC(Intermetallic Compound, 금속간화합물)의 생성 원리와 패키지 신뢰성에 미치는 영향을 설명하고, IMC 성장 억제 방안을 서술하시오.",
    "answer": "IMC(Intermetallic Compound, 금속간화합물)는 솔더와 금속 패드(Cu, Ni/Au 등) 간 계면에서 열처리(리플로우) 또는 고온 보관 중 상호 확산(Inter-diffusion)에 의해 생성되는 금속 화합물입니다. 대표적인 IMC는 Cu/Sn 계면의 Cu6Sn5(η상)와 Cu3Sn(ε상), Ni/Sn 계면의 Ni3Sn4입니다. Cu6Sn5는 리플로우 직후 형성되며, 추가 열처리에서 Cu3Sn으로 성장합니다. IMC 층의 두께는 확산 방정식 d = (D0 × t)^0.5 × exp(-Q/2RT)에 따라 시간 및 온도 증가에 비례하여 성장합니다. IMC가 패키지 신뢰성에 미치는 영향은 첫째, IMC는 솔더보다 경도가 높고 취성이 강하여 온도 사이클 하에서 계면에 균열이 발생합니다. 둘째, IMC 층이 과도하게 성장하면 접합 강도가 저하됩니다. 셋째, Kirkendall Void(커켄달 보이드)가 IMC 층 내에 형성되어 접합부 약화를 가속합니다. IMC 성장 억제 방안으로는 Ni Barrier Layer 사용(Cu와 Sn 간 직접 접촉 차단), 리플로우 온도와 시간 최소화, 저온 솔더(Bi-Sn 계) 적용, 그리고 패키지 보관 온도 관리가 있습니다.",
    "keywords": [
      "IMC",
      "Intermetallic Compound",
      "Solder Interface",
      "Brittle Fracture",
      "Growth Control"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "IMC는 솔더와 금속 패드 간 계면에서 상호 확산으로 생성되는 금속 화합물로, Cu/Sn 계면에서 Cu6Sn5, Cu3Sn이 대표적입니다. IMC는 취성이 강하여 온도 사이클에서 균열을 유발하고, 과도 성장 시 접합 강도를 저하시키며, Kirkendall Void를 형성합니다. 억제 방안으로 Ni Barrier Layer로 Cu-Sn 직접 접촉 차단, 리플로우 시간·온도 최소화, 저온 솔더 사용이 있습니다."
  },
  {
    "id": 99,
    "jobRole": "Package & Test",
    "category": "Test 공정 및 측정 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "반도체 테스트에서 DFT(Design for Testability)의 개념을 설명하고, 대표적인 DFT 기법인 Scan Chain과 JTAG(Boundary Scan)의 동작 원리를 서술하시오.",
    "answer": "DFT(Design for Testability)는 반도체 설계 단계에서 테스트 용이성을 높이는 회로 및 구조를 미리 내장하여 제조 후 테스트 커버리지를 향상시키는 방법론입니다. 현대 복잡한 SoC는 외부 핀만으로 내부 로직을 직접 제어·관찰하기 어렵기 때문에 DFT가 필수입니다. Scan Chain은 SoC 내부의 플립플롭(FF)들을 직렬로 연결하는 기법입니다. 각 FF에 MUX를 추가하여 정상 동작 모드(Functional Mode)와 스캔 모드(Scan Mode)를 선택할 수 있습니다. 스캔 모드에서는 외부에서 테스트 벡터(Test Vector)를 순차적으로 입력(Scan-In)하여 모든 FF의 상태를 원하는 값으로 설정하고, 하나의 클럭 후 FF 상태를 외부로 순차 출력(Scan-Out)하여 내부 상태를 관찰합니다. 이를 통해 조합 논리 회로의 결함(SAF, Transition Fault 등)을 효과적으로 검출합니다. JTAG(IEEE 1149.1, Boundary Scan)은 각 I/O 핀에 Boundary Scan Cell(BSC)을 추가하여 외부 직렬 인터페이스(TDI, TDO, TMS, TCK)로 핀 상태를 제어·관찰합니다. PCB 조립 후 칩 간 연결 불량(솔더 브리지, 단선) 검출에 특히 유용합니다.",
    "keywords": [
      "DFT",
      "Scan Chain",
      "JTAG",
      "Boundary Scan",
      "Fault Coverage"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "DFT는 설계 단계에서 테스트 용이성을 높이는 회로를 내장하는 방법론입니다. Scan Chain은 내부 플립플롭을 직렬로 연결하여 스캔 모드에서 테스트 벡터를 순차 입출력함으로써 내부 로직 결함을 검출합니다. JTAG(Boundary Scan)은 각 I/O 핀에 Boundary Scan Cell을 부가하여 직렬 인터페이스로 핀 상태를 제어·관찰하며, PCB 조립 후 칩 간 연결 불량 검출에 효과적입니다."
  },
  {
    "id": 100,
    "jobRole": "Package & Test",
    "category": "Advanced Packaging 기술",
    "group": "other",
    "difficulty": "심화",
    "question": "반도체 패키지 산업의 미래 발전 방향을 이종 집적(Heterogeneous Integration) 관점에서 논하고, 이를 실현하기 위한 핵심 기술과 당면 과제를 서술하시오.",
    "answer": "반도체 패키지 산업은 단일 공정·단일 다이 한계를 극복하고 성능과 효율을 극대화하기 위해 이종 집적(Heterogeneous Integration, HI)으로 빠르게 진화하고 있습니다. 이종 집적은 다른 기능, 다른 공정 노드, 심지어 다른 재료계(Si, GaAs, SiC)의 다이를 하나의 패키지에서 최적으로 결합하는 기술 방향입니다. 핵심 기술로는 첫째, 고밀도 다이 간 상호 연결 기술로 TSV, Hybrid Bonding, RDL이 있으며 이를 통해 수 μm 이하 피치의 연결을 실현합니다. 둘째, 2.5D/3D 패키징 기술로 CoWoS, EMIB, SoIC(TSMC) 등의 플랫폼이 경쟁합니다. 셋째, KGD(Known Good Die) 선별 기술로, 적층 전 개별 다이의 양부 판정이 필수입니다. 넷째, 표준 인터페이스(UCIe, BoW, AIB)의 확립으로 다양한 공급자의 Chiplet을 상호 호환 가능하게 합니다. 당면 과제로는 첫째, 대면적 이종 집적 패키지의 수율과 비용 문제가 있습니다. 둘째, 다이 간 열 관리의 복잡성이 증가합니다. 셋째, 테스트 방법론의 발전으로 HI 패키지의 전체 기능 검증이 필요합니다. 넷째, 표준화 미흡으로 공급망 복잡성이 증가합니다. 이종 집적은 AI, HPC, 자율주행 등 미래 기술의 핵심 구현 기반이 될 것입니다.",
    "keywords": [
      "Heterogeneous Integration",
      "Chiplet",
      "Advanced Packaging",
      "Thermal Management",
      "Supply Chain"
    ],
    "active": true,
    "estimatedAnswerMinutes": 2,
    "shortAnswer": "반도체 패키지는 이종 집적(HI) 방향으로 진화하고 있습니다. 핵심 기술은 TSV·Hybrid Bonding·RDL을 통한 고밀도 다이 간 연결, CoWoS·EMIB 등 2.5D/3D 플랫폼, KGD 선별 기술, UCIe 등 표준 인터페이스 확립입니다. 당면 과제는 대면적 패키지의 수율·비용, 복잡해진 열 관리, HI 패키지 테스트 방법론, 공급망 표준화입니다. 이종 집적은 AI·HPC·자율주행 실현의 핵심 기반이 될 것입니다."
  }
];
