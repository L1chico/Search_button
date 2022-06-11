let img_src = document.getElementById("img_1");
let srch = document.getElementById("srch");

let img_count = 0;
let iter_count = 1;

let width_Num = 48;

function move_srch_forward(width_Num) {
    console.log('Функция запустилась')
    console.log(width_Num);
    srch.style.width = String(width_Num) + 'px';
   
    console.log(width_Num);
    return width_Num;

}
function move_srch_backward() {
    if (width_Num >= 48) {
        return setTimeout(() => {
            width_Num = String(Number(width_Num) - 2);
            console.log(width_Num);
            srch.style.width = String(width_Num) + 'px';
        }, 100);
    }
}
console.log(srch.style.width);
console.log(srch.style.animationPlayState);
//Версия 1
/* img_src.onclick = () => {
    switch (img_count) {
        case 0:
            img_src.src = "X.png";
            img_count = 1;
            srch.style.animationPlayState = 'running';console.log('while');
            console.log(srch.style.animationPlayState);
            setTimeout(() => {
                srch.style.animationPlayState = 'paused';
                console.log('whilsdfsdfsdfsd');
                srch.style.width = '250px';
            }, 990);
            console.log(srch.style.animationPlayState);
            console.log(srch.style.width);
            break;
        case 1:
            img_src.src = "glass.png";
            img_count = 0;
            srch.style.animationPlayState = 'running';console.log('while');
            setTimeout(() => {
                srch.style.animationPlayState = 'paused';
                console.log('whilsdfsdfsdfsd');
            }, 980);
            srch.style.width = '48px';
            break;
    }
} */
//Версия 2 (Не работает)
/* img_src.onclick = () => {
    switch (img_count) {
        case 0:
            img_src.src = "X.png";
            img_count = 1;
            console.log(width_Num);
            let start = Date.now();
            clearInterval(timer);
            let timer = setInterval(() => {
                let timePassed = Date.now() - start;
                if (timePassed < 1000) {
                    width_Num = String(Number(width_Num) + 4);
                    srch.style.width = String(width_Num) + 'px';
                }
                else {
                    clearInterval(timer);
                }
            }, 20);
            break;
        case 1:
            img_src.src = "glass.png";
            img_count = 0;
            break;
    }
} */
//Версия 3
function animate_forward({duration, draw, timing}) {
    let start = performance.now();
    console.log('Отсчёт времени');
    requestAnimationFrame(function animate_forward(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) {timeFraction = 1;}

        let progress = timing(timeFraction);
        console.log('отрисовка');
        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate_forward);
            console.log('Конец анимации');
        }
    })
}
img_src.onclick = () => {
    switch (img_count) {
        case 0:
            img_src.src = "X.png";
            img_count = 1;
            let start = performance.now();
            console.log('Анимация запущена');
            animate_forward({
                duration: 1000,
                timing: (timeFraction) => {
                    return Math.pow(timeFraction, 2);
                    /* return 1 - Math.sin(Math.acos(timeFraction)); */
                },
                draw: (progress) => {
                    srch.style.width = 48 + progress * 202 + 'px';
                }
            });
            console.log('Конец анимации');
            break;
        case 1:
            img_src.src = "glass.png";
            img_count = 0;
            animate_forward({
                duration: 1000,
                timing: (timeFraction) => {
                    /* return timeFraction; */
                    return Math.pow(timeFraction, 2);
                },
                draw: (progress) => {
                    srch.style.width = 250 + progress * -202 + 'px';
                }
            });
            break;
    }
}