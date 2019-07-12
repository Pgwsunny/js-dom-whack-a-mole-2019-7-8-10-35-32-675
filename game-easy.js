window.onload = function () {

    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const startBtn = document.getElementById('start_btn');
    let titleH1 = document.getElementById('title');

    let lastHole;
    let timeUp = false;
    let score = 0;
    let gameTime = 10000;


    startBtn.addEventListener('click', function () {
        showBtnAnimation();
        startGame();
    }, false);

    function showBtnAnimation() {
        event.preventDefault();

        startBtn.classList.add('animate');
        // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
        setTimeout(() => {
            startBtn.classList.remove('animate');
            startBtn.style.display = 'none';
        }, 500);
    }


    function startGame() {
        resetScoreAndTime();
        peep();

        setTimeout(() => {
            document.getElementById("title").innerText = "TIME UP";
            startBtn.classList.remove("animate");
            startBtn.style.removeProperty("display");
            startBtn.innerText = "reply";
        }, gameTime)
    }

    /**
     * 初始化设置.
     */
    function resetScoreAndTime() {
        // TODO: 写游戏的初始化设置
        /*把袋鼠上一个出现的位置存储到localStorage中*/
        if(window.localStorage){
            localStorage.setItem('position', '');
        }
    }

    /**
     * 出洞.
     */
    function peep() {
        const time = randomTime(200, 1000);
        var as = setInterval(function () {
            var startTime = new Date().getTime();
            if((new Date().getTime() - startTime)>=gameTime){
                clearInterval(as);
            }else{
                const hole = randomHole(holes);
                comeOutAndStop(hole, time);
            }
        },800);
    }

    /**
     * 随机生成地鼠出洞的停留时间. 该时间其实是[min, max]间的随机数.
     *
     * @param min 随机数的下界.
     * @param max 随机数的上界.
     * @returns {number}
     */
    function randomTime(min, max) {
        // TODO: 写生成随机数的逻辑，
        var rand = parseInt(Math.random()*(max-min+1)+min,10);
        return rand;
    }

    /**
     * 随机选择地鼠钻出的地洞，如果与上一个是相同地洞，则重新选择一个地洞.
     *
     * @param holes
     * @returns {*}
     */
    function randomHole(holes) {
        // TODO: 写地鼠随机选择钻出地洞的逻辑，如果与上一个是相同地洞，则重新选择一个地洞.

        var lastPosition = localStorage.getItem("position");
        var rand = Math.floor(Math.random()*6);
        while (lastPosition ==rand ){
            rand = Math.floor(Math.random()*6);
        }
        localStorage.setItem("position",rand);
        return rand;
    }

    /**
     * 地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
     *
     * @param hole 地鼠所出地洞.
     * @param time 地鼠停留时间.
     */
    function comeOutAndStop(hole, time) {
        // TODO: 写地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
        var startTime = new Date().getTime();
        holes[hole].classList.add("up");
        var interval = setInterval(function () {
            if((new Date().getTime()-startTime) >= time){
                clearInterval(interval);
                holes[hole].classList.remove("up");
            }
        },80);
    }

    /**
     * 打地鼠。为每个moles添加点击事件，点击后分数显示+1，地鼠入洞。
     */
    moles.forEach(mole => mole.addEventListener('click', function (e) {
        // TODO: 在这里写用户点击地鼠发生的事.
        score++;
        document.getElementById("score").innerText = score;
    }));

};