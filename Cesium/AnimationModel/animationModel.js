//Animation
let timeContainer = document.getElementsByClassName("animation-time-placeholder");// 时间输入（显示）框的容器
let pauseTimeUpdate = false;  // 是否暂停时间更新
let pickdata = document.getElementsByClassName("animation-pickdata")[0],
    pickdataChoose = document.getElementsByClassName("animation-pickdata-choose")[0],
    pickdataSure = document.getElementsByClassName("animation-pickdata-sure")[0];
// 复位
let animationResetBtn = document.getElementsByClassName("animation-reset")[0];
let animationPlayer = document.getElementsByClassName("animation-player")[0];
let animationPauseBtn = document.getElementsByClassName("animation-player-pause")[0];
let animationPlayerBtn = document.getElementsByClassName("animation-player-player")[0];

// 按键松开的时候
/*
$(".animation-time-placeholder").keyup(function () {
    let sixtyReg = /^([0-9]|[0-5][0-9])$/;
    let twelveReg = /^(0?[[1-9]|1[0-2])$/;
    let hourReg = /^((\d)|(1\d)|(2[0-4]))$/;
    let dayReg = /^((0?[1-9])|((1|2)[0-9])|30|31)$/;
    let index = $(".contenteditable").index(this)
    let length = $(this).val().length
    let val = $(this).val()
    let doSomething = false;
    switch (index)
    {
        case 0:
            console.log("年")
            if(length >= 4){
                doSomething = true;
                if ("number" != (typeof Number(val))) {
                    $(this).val(2018)
                }
               // $(this).blur()
               // $(this).val($(this).val().substr(0,4))
               // $(".contenteditable").eq(index+1).focus()
            }

            break;
        case 1:
            console.log("月")
            if(length >= 2){
                doSomething = true;
                if($(this).val() > 12) {
                    $(this).val(12)
                }
               // $(this).blur()
               // $(this).val($(this).val().substr(0,2))
               // $(".contenteditable").eq(index+1).focus()
            }
            break;
        case 2:
            console.log("日")
            if(length >= 2){
                doSomething = true;
                if(val > 31) {
                    $(this).val(31)
                }
               // $(this).blur()
               // $(this).val($(this).val().substr(0,2))
               // $(".contenteditable").eq(index+1).focus()
            }
            break;
        case 3:
            console.log("时")
            if(length >= 2){
                doSomething = true;
                if(val > 24) {
                    $(this).val(24)
                }
               // $(this).blur()
               // $(this).val($(this).val().substr(0,2))
               // $(".contenteditable").eq(index+1).focus()
            }
            break;
        case 4:
            console.log("分")
            if(length >= 2){
                doSomething = true;
                if(val > 59) {
                    $(this).val(59)
                }
               // $(this).blur()
               // $(this).val($(this).val().substr(0,2))
               // $(".contenteditable").eq(index+1).focus()
            }
            break;
        case 5:
            console.log("秒")
            if(length >= 2){
                doSomething = true;
                if(val > 59) {
                    $(this).val(59)
                }
                // $(this).val($(this).val().substr(0,2))
                // $(this).blur()
            }
            break;
        default:
    }

    if (doSomething) {
        $(this).blur()
        if(index == 0) {
            $(this).val($(this).val().substr(0,4))
        } else {
            $(this).val($(this).val().substr(0,2))
        }
        if (index !== 5) {
            $(".contenteditable").eq(index+1).focus()
        }
    }

})
*/ 

animationResetBtn.addEventListener("click",function () {
    console.log("复位");
    Pangu.Data.ResetTime=true;   
})
//  选择时间
pickdata.addEventListener("click",function () {
    let length = timeContainer.length;
    if (this.getAttribute("data") == "pick") {
       
        pauseTimeUpdate = true;  // 时间暂停更新

        this.setAttribute("data","sure")

        pickdataChoose.style.display = "none"
        pickdataSure.style.display = "block"


        for (let i = 0; i < length; i ++) { // 更改 input 状态
            timeContainer[i].removeAttribute("readonly")
        }
        timeContainer[0].select();
    } else {  // 确定
        let clock = Pangu.Data.viewer.clock;
        // 北京时间 zone8Time
        var inputTime = getInputTime()
        // 转0时区时间
        inputTime.setTime(inputTime.getTime()+8*60*60*1000)

        console.log(inputTime)

        var inputCurrentTime = Pangu.JulianDate.fromDate(inputTime)
        var startTime = Pangu.JulianDate.toGregorianDate(clock.startTime);
        var stopTime = Pangu.JulianDate.toGregorianDate(clock.stopTime);
        var currentTime = Pangu.JulianDate.toGregorianDate(inputCurrentTime);

        console.log(Pangu.JulianDate.greaterThan(inputCurrentTime,clock.startTime),Pangu.JulianDate.lessThan(inputCurrentTime,clock.stopTime)) 
        // 在时间范围内
        if (Pangu.JulianDate.greaterThan(inputCurrentTime,clock.startTime),Pangu.JulianDate.lessThan(inputCurrentTime,clock.stopTime)) {
            console.log("输入时间在范围之内")
            console.log(startTime,currentTime,stopTime)


            clock._currentTime = inputCurrentTime;


            panguSceneControler.speedControl('pause');
            pauseTimeUpdate = false

            this.setAttribute("data","pick")

            pickdataChoose.style.display = "block"
            pickdataSure.style.display = "none"


            for (let i = 0; i < length; i ++) { // input  readonly
                timeContainer[i].setAttribute("readonly","")
            }

            // 切换播放按钮状态
            animationPauseBtn.style.display = "none"
            animationPlayerBtn.style.display = "block"
            panguSceneControler.speedControl('pause');
        } else {
            console.log("输入时间不在范围内")
        }
        
    }
});

animationPlayer.addEventListener("click",function(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    console.log(target.getAttribute("data"))
    let option = target.getAttribute("data")
    switch (option) {  
            case "player" : // 播放
                panguSceneControler.speedControl('start');
                animationPauseBtn.style.display = "block"
                animationPlayerBtn.style.display = "none"
                break;
            case "pause" : // 暂停
                panguSceneControler.speedControl('pause');
                animationPauseBtn.style.display = "none"
                animationPlayerBtn.style.display = "block"
                break;
            case "speed" : // 快进
                panguSceneControler.speedControl('speedUp');
                break;
            case "goback" : // 后退
                panguSceneControler.speedControl('speedCut');
                break;
        }

})

Pangu.Data.viewer.clock.onTick.addEventListener(function (clock) {
    var viewer=Pangu.Data.viewer;
    var gregorianDate = Pangu.JulianDate.toGregorianDate(clock._currentTime);
    var nowTime = Pangu.JulianDate.now();

    if(Pangu.Data.ResetTime&&Pangu.JulianDate.compare(clock.stopTime,nowTime)>=0){
        viewer.clock.multiplier=1;
        clock.currentTime=nowTime;
        Pangu.Data.ResetTime=false;
    }

    if(!pauseTimeUpdate) { // 更新时间
        updateTime(gregorianDate);
    }
})

function updateTime (gregorianDate) {
    let length = timeContainer.length;
    for (let i = 0; i < length; i ++ ) {
        switch (i) {  
            case 0 : // 年
                timeContainer[i].value = gregorianDate.year
                break;
            case 1 : // 月
                timeContainer[i].value = timeFormat(gregorianDate.month)
                break;
            case 2 : // 日
                timeContainer[i].value =  timeFormat(gregorianDate.day)
                break;
            case 3 : // 时
                timeContainer[i].value = timeFormat(gregorianDate.hour)
                break;
            case 4 : // 分
                timeContainer[i].value = timeFormat(gregorianDate.minute)
                break;
            case 5 : // 秒
                timeContainer[i].value = timeFormat(gregorianDate.second)
                break;
        }
    }
}

//  获取用户输入时间
function getInputTime () {
    let length = timeContainer.length;

    for (let i = 0; i < length; i ++ ) {
        switch (i) {  
            case 0 : // 年
                var y = timeContainer[0].value
                break;
            case 1 : // 月
                var m = timeContainer[1].value - 1
                break;
            case 2 : // 日
                var d =  timeContainer[2].value
                break;
            case 3 : // 时
                var h = timeContainer[3].value
                break;
            case 4 : // 分
                var M = timeContainer[4].value
                break;
            case 5 : // 秒
                var s = timeContainer[5].value
                break;
        }
    }
    return new Date(y, m, d, h, M, s);
}
