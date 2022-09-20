const lottoForm = document.querySelector('.lotto-form')
const lottoMain = document.querySelector('.lotto-main')

// ball의 숫자 범위에 따른 공 색깔 지정
const ballColor = function(ballNum) {
  if (ballNum <= 10) {
    return 'rgb(242, 242, 0)'
  }
  else if (ballNum <= 20) {
    return 'blue'
  }
  else if (ballNum <= 30) {
    return 'red'
  }
  else if (ballNum <= 40) {
    return 'gray'
  }
  else {
    return 'green'
  }
}

// 폼의 로또번호생성 버튼 클릭 시, select의 결과를 받음
lottoForm.addEventListener('submit', function(event) {
  event.preventDefault()

  // lotto-main 내부의 기존의 ball-container, datetime 클래스 태그 모두 없애기
  const remainedBallContainers = document.querySelectorAll('.ball-container')
  for (let container of remainedBallContainers) {
    container.remove()
  }
  const remainedPTags = document.querySelectorAll('.datetime')
  for (let p of remainedPTags) {
    p.remove()
  }
  
  // 로또 번호 생성 개수 입력값 받기
  const formData = new FormData(lottoForm)
  const cnt = formData.get('cnt-select')

  // p태그 생성 (현재 날짜, 시간 정보 표시)
  const pTag = document.createElement('p')
  const date = new Date();
  pTag.classList.add('datetime')
  pTag.innerText = 'created at ' + `${date.toLocaleString('ko-kr')}`
  lottoMain.appendChild(pTag)

  // 입력받은 개수만큼 ball-container 생성
  for (let num = 1; num <= cnt; num++) {
    // ball-container
    const ballContainer = document.createElement('article')
    ballContainer.classList.add('ball-container')
    lottoMain.appendChild(ballContainer)
    // h4 태그
    const h4Tag = document.createElement('h4')
    h4Tag.innerText = `${num}번째 행운 번호`
    ballContainer.appendChild(h4Tag)
    // ball-list
    const ballList = document.createElement('div')
    ballList.classList.add('ball-list')
    ballContainer.appendChild(ballList)
    
    // 6개의 번호 랜덤 뽑기
    const randomNums = _.sampleSize(_.range(1, 46), 6)
    
    for (let randomNum of randomNums) {
      // 6개의 ball
      const ball = document.createElement('div')
      ball.classList.add('ball')
      ball.innerText = randomNum
      ball.style.backgroundColor = ballColor(randomNum)
      ballList.appendChild(ball)
    }
  }
})