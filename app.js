const data = {
  totals: [
    {q:'Q8_0', correct:42, acc:26.3, parse:1, time:39.25, speed:10.96, score:1.74},
    {q:'Q6_K', correct:42, acc:26.3, parse:1, time:31.96, speed:13.97, score:1.74},
    {q:'Q4_K_M', correct:41, acc:25.6, parse:2, time:30.69, speed:16.25, score:1.61}
  ],
  subjects: [
    {name:'물리학 I', q8:20.0, q6:20.0, q4:22.5},
    {name:'화학 I', q8:22.5, q6:22.5, q4:17.5},
    {name:'생명과학 I', q8:30.0, q6:32.5, q4:32.5},
    {name:'지구과학 I', q8:32.5, q6:30.0, q4:30.0}
  ],
  types: [
    {name:'개념 이해형', q8:52.4, q6:57.1, q4:57.1},
    {name:'계산 적용형', q8:22.4, q6:20.7, q4:20.7},
    {name:'과정·인과 추론형', q8:25.0, q6:25.0, q4:25.0},
    {name:'자료 해석형', q8:21.3, q6:21.3, q4:19.7}
  ],
  visual: [
    {name:'그림 없음', q8:37.5, q6:41.7, q4:37.5},
    {name:'그림 있음', q8:24.3, q6:23.5, q4:23.5}
  ],
  paired: [
    {pair:'Q8_0 vs Q6_K', both:40, left:2, right:2, wrong:116, p:1},
    {pair:'Q8_0 vs Q4_K_M', both:30, left:12, right:11, wrong:107, p:1},
    {pair:'Q6_K vs Q4_K_M', both:30, left:12, right:11, wrong:107, p:1}
  ]
};

const slides = [
  {
    title:'title',
    notes:'첫 문장은 짧게 갑니다. “이 발표는 모델을 크게 만드는 이야기가 아니라, 제한된 노트북에서 어떤 양자화 조건이 실제로 쓸 만한가를 검증한 결과입니다.”\n\n청중에게 오늘 볼 기준을 미리 못 박습니다: 정확도, 설명 품질, 속도, 안정성.',
    html:`<div class="keyhint">← → / Space / B / P / O</div>
      <div class="kicker">2026 격물치지 프로젝트</div>
      <h1>LLM의 양자화 수준은<br/>과학 문제 풀이를 얼마나 흔드는가?</h1>
      <p class="lead">Gemma 4 E4B 모델을 Q8_0 · Q6_K · Q4_K_M으로 비교한 로컬 실행 실험. 결론부터 말하면, <b>정답률 차이는 작고 속도 차이는 컸다.</b></p>
      <div class="badges"><span class="badge">160문항</span><span class="badge">4개 과목</span><span class="badge">3개 양자화 조건</span><span class="badge">정적 웹 발표</span></div>`
  },
  {
    title:'question',
    notes:'핵심 질문을 하나로 좁힙니다. “모델을 가볍게 만들면 성능이 무너질까?”라는 단순한 질문처럼 보이지만, 실제로는 학습 도구의 신뢰성 문제입니다.\n\n여기서는 성능을 정답률 하나로 보지 않았다고 강조합니다.',
    html:`<div class="grid2">
      <div><div class="kicker">Research Question</div><h2>같은 모델을 더 거칠게 압축하면, 과학 문항 풀이 성능도 같이 무너질까?</h2><p class="lead">양자화는 메모리와 속도를 개선하지만, 계산·자료 해석·설명 품질을 손상시킬 수 있다.</p></div>
      <div class="stack">
        <div class="card white"><div class="label">독립변인</div><div class="metric"><strong>Q8 / Q6 / Q4</strong><span>양자화 수준</span></div></div>
        <div class="card"><div class="label">종속변인</div><p class="lead" style="font-size:19px;margin-top:0">정답률, 설명 점수, 오답 유형, 파싱 실패, 평균 시간, 생성 속도</p></div>
      </div></div>`
  },
  {
    title:'design',
    notes:'연구 설계의 신뢰성을 보여주는 슬라이드입니다. 비교 조건 외에는 모두 고정했다는 점이 중요합니다.\n\n“양자화만 바꿨다”는 말이 청중에게 남아야 합니다.',
    html:`<div class="kicker">Experiment Design</div><h2>변수 하나만 바꾸기 위해 나머지는 고정했다.</h2>
      <div class="timeline">
        <div class="step" data-n="1"><b>160</b><small>물리·화학·생명·지구과학 각 40문항</small></div>
        <div class="step" data-n="2"><b>동일 모델</b><small>Gemma 4 E4B 계열, 양자화 조건만 변경</small></div>
        <div class="step" data-n="3"><b>동일 입력</b><small>문항 순서, 프롬프트, 그림·표 제공 방식 통제</small></div>
        <div class="step" data-n="4"><b>자동 채점</b><small>선택지 번호를 공식 정답표와 비교</small></div>
        <div class="step" data-n="5"><b>LLM 평가</b><small>설명 품질 0~5점, 오답 유형 복수 분류</small></div>
      </div>`
  },
  {
    title:'prediction',
    notes:'여기는 청중 참여 지점입니다. 발표 중 실제로 손들게 해도 됩니다. 버튼을 누르면 결과가 드러납니다.\n\n질문: “가장 실용적인 조건은 무엇일까요?” 대부분 Q8 또는 Q4를 고를 가능성이 큽니다. 그런 다음 Q6의 절충성이 핵심이라고 전환합니다.',
    html:`<div class="kicker">Audience Check</div><h2>예상해 봅시다. 가장 실용적인 양자화 조건은?</h2>
      <div class="prompt-box">정확도는 유지하면서, 로컬 노트북에서 더 빠르게 돌아가는 조건은 무엇일까?</div>
      <div class="compare">
        <button class="quant-card vote" data-vote="Q8_0"><h3>Q8_0</h3><div class="speed">정밀도</div><p>정보 보존이 많다. 대신 느릴 가능성이 높다.</p></button>
        <button class="quant-card vote" data-vote="Q6_K"><h3>Q6_K</h3><div class="speed">절충</div><p>성능과 실행 부담 사이의 중간 지점.</p></button>
        <button class="quant-card vote" data-vote="Q4_K_M"><h3>Q4_K_M</h3><div class="speed">속도</div><p>가장 가볍다. 품질 손실 가능성이 있다.</p></button>
      </div>
      <div id="voteResult" class="insight reveal">결과: <b>Q6_K</b>가 가장 설득력 있는 절충점이다. Q8_0과 같은 정답률·설명 평균을 유지하면서 더 빨랐다.</div>`
  },
  {
    title:'overall',
    notes:'핵심 결과입니다. 숫자를 크게 말합니다. 정답률: Q8과 Q6은 동일, Q4는 1문항 차이. 속도: 낮은 정밀도일수록 빨라짐.\n\n중요한 해석: 이 실험에서는 Q8이 Q6보다 뚜렷하게 우수하지 않았습니다.',
    html:`<div class="grid2">
      <div><div class="kicker">Main Result</div><h2>정답률은 거의 같았고, 속도는 확실히 달랐다.</h2><p class="lead">Q6_K는 Q8_0과 같은 정답 수와 설명 평균을 보이면서 평균 생성 속도가 더 높았다.</p></div>
      <div>
        <div id="overallChart"></div>
        <div class="controls"><button class="toggle active" data-chart="acc">정답률</button><button class="toggle" data-chart="speed">생성 속도</button><button class="toggle" data-chart="score">설명 평균</button></div>
        <p id="chartNote" class="axis-note">Q8_0 26.3%, Q6_K 26.3%, Q4_K_M 25.6%</p>
      </div>
    </div>`
  },
  {
    title:'tradeoff',
    notes:'이 슬라이드는 발표자가 직접 카드를 클릭하면서 설명합니다. Q8: 안정적이지만 느림. Q6: 핵심 결론. Q4: 빠르지만 설명 품질과 파싱 안정성에서 손실.\n\n강한 표현을 써도 됩니다: “이 데이터만 놓고 보면 Q8을 고집할 이유는 약합니다.”',
    html:`<div class="kicker">Interactive Comparator</div><h2>속도·정답률·설명 품질의 균형</h2>
      <div class="compare" id="quantCompare"></div>
      <div id="quantInsight" class="insight">카드를 클릭하면 조건별 해석이 바뀝니다.</div>`
  },
  {
    title:'paired',
    notes:'전체 점수만 보면 Q4가 1문항 차이입니다. 하지만 문항별로 보면 다른 문항을 맞히고 틀립니다.\n\n즉 양자화는 점수를 조금만 바꾸더라도 특정 문제의 답변 경로를 바꿀 수 있습니다.',
    html:`<div class="kicker">Paired Comparison</div><h2>총점은 비슷해도, 같은 문제에서 같은 답을 낸 것은 아니다.</h2>
      <div class="matrix">
        <div class="cell"><b>Q8 vs Q6</b><p>둘 다 정답 40문항, 한쪽만 정답은 각각 2문항. 사실상 같은 패턴.</p></div>
        <div class="cell"><b>Q8 vs Q4</b><p>둘 다 정답 30문항. Q8만 정답 12문항, Q4만 정답 11문항.</p></div>
        <div class="cell"><b>p = 1</b><p>맥니마 검정상 어느 조건이 통계적으로 뚜렷하게 우세하다고 말하기 어렵다.</p></div>
        <div class="cell white"><b>핵심</b><p>양자화는 전체 점수를 단순히 낮추기보다, 애매한 문항의 최종 선택을 바꾼다.</p></div>
      </div>`
  },
  {
    title:'subjects',
    notes:'과목별로 단조롭지 않다는 점을 말합니다. 화학에서는 Q4 하락이 눈에 띄지만, 생명과학에서는 Q6/Q4가 높았습니다.\n\n단정 금지: 과목별 표본은 40문항이므로 경향으로만 봐야 합니다.',
    html:`<div class="grid2">
      <div><div class="kicker">Subject View</div><h2>과목별 영향은 균일하지 않았다.</h2><p class="lead">화학에서는 Q4_K_M 하락이 보였지만, 생명과학에서는 Q6_K와 Q4_K_M이 더 높았다. 양자화 효과는 단조롭지 않다.</p></div>
      <div><div id="subjectChart"></div><div class="controls"><button class="toggle active" data-subject="q8">Q8_0</button><button class="toggle" data-subject="q6">Q6_K</button><button class="toggle" data-subject="q4">Q4_K_M</button></div></div>
    </div>`
  },
  {
    title:'types',
    notes:'모델의 약점은 양자화보다 문항 유형에서 더 크게 보입니다. 개념형은 상대적으로 낫고, 계산·자료 해석·과정 추론은 낮습니다.\n\n이건 교육적 메시지입니다. AI 답변을 가장 조심해야 할 유형은 그림과 계산입니다.',
    html:`<div class="kicker">Problem Type</div><h2>진짜 병목은 ‘양자화’보다 ‘복합 과학 추론’이었다.</h2>
      <div class="split-line">
        <div><div id="typeChart"></div><p class="axis-note">개념 이해형을 제외하면 대부분 20%대 수준.</p></div>
        <div class="stack">
          <div class="card white"><div class="label">가장 취약</div><div class="metric"><strong>계산·자료</strong><span>수식, 표, 그래프</span></div></div>
          <div class="card"><div class="label">해석</div><p class="lead" style="font-size:18px;margin-top:0">작은 E4B 모델에서는 양자화 차이보다 기본 추론 능력의 한계가 더 크게 작용했을 가능성이 높다.</p></div>
        </div>
      </div>`
  },
  {
    title:'visual',
    notes:'가장 실전적인 슬라이드입니다. 그림 없는 문항과 그림 있는 문항의 차이가 매우 큽니다.\n\n“그림을 첨부하면 모델이 사람처럼 읽을 것”이라는 기대를 반박합니다.',
    html:`<div class="grid2">
      <div><div class="kicker">Multimodal Limit</div><h2>그림·표가 들어가면 정답률이 크게 떨어졌다.</h2><p class="lead">그림 없는 문항은 37.5~41.7%, 그림 있는 문항은 23.5~24.3% 수준. 양자화보다 시각 자료 해석 병목이 더 컸다.</p></div>
      <div><div id="visualChart"></div><div class="insight" style="font-size:19px">과학 그림은 단순 이미지 인식이 아니다. 축, 단위, 표의 행렬, 조건, 선택지를 동시에 연결해야 한다.</div></div>
    </div>`
  },
  {
    title:'errors',
    notes:'오답 유형을 질적으로 해석합니다. 불완전한 추론과 개념 오류가 많았고, 정답 추출·형식 오류도 적지 않았습니다.\n\n학습 보조 도구라면 정답 번호보다 설명 검증이 더 중요하다고 연결합니다.',
    html:`<div class="kicker">Error Anatomy</div><h2>오답은 ‘계산 실수’보다 구조적이었다.</h2>
      <table class="mini-table">
        <thead><tr><th>오답 유형</th><th>Q8_0</th><th>Q6_K</th><th>Q4_K_M</th><th>해석</th></tr></thead>
        <tbody>
          <tr><td>불완전한 추론</td><td>133</td><td>131</td><td>136</td><td>조건을 끝까지 연결하지 못함</td></tr>
          <tr><td>개념 오류</td><td>129</td><td>133</td><td>134</td><td>핵심 과학 개념 적용 실패</td></tr>
          <tr><td>정답 추출·형식 오류</td><td>69</td><td>67</td><td>70</td><td>선택지 출력 안정성 문제</td></tr>
          <tr><td>시각 자료 오독</td><td>52</td><td>52</td><td>46</td><td>그림·표 해석 병목</td></tr>
        </tbody>
      </table>
      <p class="lead">정답 번호가 맞아도 설명이 틀릴 수 있다. 학습용으로는 이 지점이 더 위험하다.</p>`
  },
  {
    title:'interpretation',
    notes:'결론의 균형을 잡습니다. “Q6이 좋다”와 “전체 성능은 낮다”를 동시에 말해야 합니다.\n\n이 연구는 양자화의 승자를 뽑는 실험이면서, 작은 로컬 모델의 한계를 드러낸 실험이기도 합니다.',
    html:`<div class="kicker">Interpretation</div><h2>이 결과를 과대해석하면 안 된다. 하지만 무시해도 안 된다.</h2>
      <div class="grid3" style="margin-top:34px">
        <div class="card white"><div class="label">1</div><h3>Q6_K가 실용적</h3><p class="small">Q8_0과 같은 정답률·설명 평균, 더 빠른 생성 속도.</p></div>
        <div class="card"><div class="label">2</div><h3>Q4_K_M은 목적 제한</h3><p class="small">가장 빠르지만 설명 평균과 파싱 안정성에서 약한 손실.</p></div>
        <div class="card"><div class="label">3</div><h3>모델 크기 한계</h3><p class="small">전체 정답률 26% 수준. 양자화보다 기본 추론·시각 해석 능력이 더 큰 병목일 수 있다.</p></div>
      </div>`
  },
  {
    title:'recommendation',
    notes:'실제 적용 가이드입니다. 발표의 실용성을 높이는 부분입니다.\n\n분명하게 말합니다. 과학 문제 풀이 용도로 Q4를 무조건 쓰는 것은 위험합니다. Q6이 현실적인 기본값입니다.',
    html:`<div class="grid2"><div><div class="kicker">Practical Guide</div><h2>로컬 과학 학습용 기본값은 Q6_K가 낫다.</h2><p class="lead">빠른 초안이나 간단한 개념 확인은 Q4_K_M도 가능하다. 하지만 계산 과정과 그림·표 해석을 믿고 학습하려면 Q6_K 이상을 권한다.</p></div>
      <div class="stack">
        <div class="card white"><div class="metric"><strong>Q6_K</strong><span>권장 기본값</span></div><p class="small">속도 개선 + 성능 유지.</p></div>
        <div class="card"><div class="metric"><strong>Q4_K_M</strong><span>속도 우선</span></div><p class="small">설명 검증이 가능한 상황에서만.</p></div>
        <div class="card"><div class="metric"><strong>Q8_0</strong><span>보수적 선택</span></div><p class="small">속도보다 정밀도 보존을 우선할 때.</p></div>
      </div></div>`
  },
  {
    title:'future',
    notes:'후속 연구는 세 가지입니다. 더 큰 모델, 반복 실행, 시각 자료 조건 분리.\n\n마지막에 발표의 핵심 문장으로 마무리합니다.',
    html:`<div class="kicker">Next Experiment</div><h2>다음 질문은 더 선명하다.</h2>
      <div class="final-grid">
        <div class="card white"><p class="quote">“양자화 차이가 작았던 이유는 정말 양자화가 안전해서인가, 아니면 E4B 모델의 기본 성능 한계에 가려졌기 때문인가?”</p></div>
        <div class="stack">
          <div class="card"><h3>12B급 이상 반복</h3><p class="small">더 큰 모델에서 차이가 커지는지 확인.</p></div>
          <div class="card"><h3>동일 조건 반복 실행</h3><p class="small">생성 변동성과 통계 안정성 확보.</p></div>
          <div class="card"><h3>그림 조건 분리</h3><p class="small">원본 그림, 텍스트 요약, 사람 요약 조건 비교.</p></div>
        </div>
      </div>`
  }
];

let current = 0;
let presenter = true;
let startTime = Date.now();
const slideEl = document.getElementById('slide');
const railEl = document.getElementById('rail');
const notesEl = document.getElementById('notes');
const notesPanel = document.getElementById('notesPanel');
const progressEl = document.getElementById('progress');
const timerEl = document.getElementById('timer');

function renderRail() {
  railEl.innerHTML = slides.map((s,i)=>`<button title="${i+1}. ${s.title}" class="${i===current?'active':''}" data-go="${i}">${String(i+1).padStart(2,'0')}</button>`).join('');
  railEl.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => go(+btn.dataset.go)));
}
function go(i) {
  current = Math.max(0, Math.min(slides.length-1, i));
  render();
}
function next(){ go(current+1); }
function prev(){ go(current-1); }
function render() {
  slideEl.innerHTML = slides[current].html;
  notesEl.textContent = slides[current].notes;
  progressEl.style.width = `${((current+1)/slides.length)*100}%`;
  renderRail();
  hydrate();
}
function makeBars(rows, key, max=60, suffix='%') {
  const el = document.createElement('div');
  el.className = 'chart';
  rows.forEach(r => {
    const v = r[key];
    const h = Math.max(8, (v/max)*230);
    const label = r.q || r.name;
    el.innerHTML += `<div class="bar-wrap"><div class="bar" style="height:${h}px"><em>${v}${suffix}</em></div><div class="bar-label">${label}</div></div>`;
  });
  return el;
}
function hydrate() {
  if (document.getElementById('overallChart')) renderOverall('acc');
  if (document.getElementById('quantCompare')) renderQuantCompare('Q6_K');
  if (document.getElementById('subjectChart')) renderSubject('q8');
  if (document.getElementById('typeChart')) {
    document.getElementById('typeChart').appendChild(makeBars(data.types.map(x=>({name:x.name, q:x.name, v:x.q6, value:x.q6})), 'value', 60, '%'));
  }
  if (document.getElementById('visualChart')) {
    const rows = [
      {name:'그림 없음 Q6', value:41.7},
      {name:'그림 있음 Q6', value:23.5}
    ];
    document.getElementById('visualChart').appendChild(makeBars(rows, 'value', 50, '%'));
  }
  document.querySelectorAll('.toggle[data-chart]').forEach(btn => btn.addEventListener('click', () => renderOverall(btn.dataset.chart)));
  document.querySelectorAll('.toggle[data-subject]').forEach(btn => btn.addEventListener('click', () => renderSubject(btn.dataset.subject)));
  document.querySelectorAll('.vote').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.vote').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('voteResult')?.classList.add('on');
  }));
}
function renderOverall(kind) {
  const target = document.getElementById('overallChart');
  if(!target) return;
  target.innerHTML = '';
  let rows, key, max, suffix, note;
  if(kind==='speed') { rows = data.totals.map(x=>({...x, value:x.speed})); key='value'; max=18; suffix=' tok/s'; note='Q8_0 10.96, Q6_K 13.97, Q4_K_M 16.25 tok/s'; }
  else if(kind==='score') { rows = data.totals.map(x=>({...x, value:x.score})); key='value'; max=5; suffix='점'; note='Q8_0 1.74점, Q6_K 1.74점, Q4_K_M 1.61점'; }
  else { rows = data.totals.map(x=>({...x, value:x.acc})); key='value'; max=35; suffix='%'; note='Q8_0 26.3%, Q6_K 26.3%, Q4_K_M 25.6%'; }
  target.appendChild(makeBars(rows, key, max, suffix));
  document.getElementById('chartNote').textContent = note;
  document.querySelectorAll('.toggle[data-chart]').forEach(b=>b.classList.toggle('active', b.dataset.chart===kind));
}
function renderQuantCompare(active) {
  const target = document.getElementById('quantCompare');
  if(!target) return;
  target.innerHTML = data.totals.map(x => `<button class="quant-card ${x.q===active?'active':''}" data-q="${x.q}"><h3>${x.q}</h3><div class="speed">${x.speed}</div><p>tok/s · 정답률 ${x.acc}% · 설명 ${x.score}점 · 파싱 실패 ${x.parse}회</p></button>`).join('');
  const insight = {
    'Q8_0':'가장 보수적인 선택이다. 하지만 이 실험에서는 Q6_K보다 정답률이나 설명 품질 우위가 없었다.',
    'Q6_K':'가장 실용적인 선택이다. Q8_0과 같은 정답률·설명 평균을 유지하면서 약 27% 빠른 생성 속도를 보였다.',
    'Q4_K_M':'가장 빠르다. 다만 설명 평균이 가장 낮고 파싱 실패도 2회로 가장 많았다. 학습용 답변에는 검증이 필요하다.'
  };
  document.getElementById('quantInsight').innerHTML = insight[active];
  target.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => renderQuantCompare(btn.dataset.q)));
}
function renderSubject(key) {
  const target = document.getElementById('subjectChart');
  if(!target) return;
  target.innerHTML = '';
  const rows = data.subjects.map(x=>({name:x.name, value:x[key]}));
  target.appendChild(makeBars(rows, 'value', 40, '%'));
  document.querySelectorAll('.toggle[data-subject]').forEach(b=>b.classList.toggle('active', b.dataset.subject===key));
}
function updateTimer(){
  const sec = Math.floor((Date.now()-startTime)/1000);
  const m = String(Math.floor(sec/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  timerEl.textContent = `${m}:${s}`;
}
setInterval(updateTimer, 500);

document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);
document.getElementById('resetTimer').addEventListener('click', () => { startTime = Date.now(); updateTimer(); });
document.getElementById('presenterBtn').addEventListener('click', () => {
  presenter = !presenter;
  notesPanel.style.display = presenter ? 'flex' : 'none';
});
document.getElementById('fullscreenBtn').addEventListener('click', () => {
  if(!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.();
});
document.getElementById('blackoutBtn').addEventListener('click', toggleBlackout);
document.getElementById('menuBtn').addEventListener('click', () => railEl.classList.toggle('open'));
function toggleBlackout(){ document.getElementById('blackout').hidden = !document.getElementById('blackout').hidden; }

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
  if(e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
  if(e.key.toLowerCase() === 'b') toggleBlackout();
  if(e.key.toLowerCase() === 'p') document.getElementById('presenterBtn').click();
  if(e.key.toLowerCase() === 'o') railEl.classList.toggle('open');
  if(e.key === 'Home') go(0);
  if(e.key === 'End') go(slides.length-1);
});
render();
