import "../scss/style.scss";

import "../scss/base/swiper.scss";
import "../scss/libs/swiper.scss";
import 'swiper/css';

import Swiper, { Navigation, Autoplay } from 'swiper';
import { info } from "sass";
// ========================================================================================================================================================================================================================================================
// Функционал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Webp ========================================================================================================================================================================================================================================================
    const isWebp = () => {
        function testWebP(callback) {
            let webP = new Image();
            webP.onload = webP.onerror = function () {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP(function (support) {
            let className = support === true ? 'webp' : 'no-webp';
            document.documentElement.classList.add(className);
        });
    }
    isWebp();
    // Webp ========================================================================================================================================================================================================================================================

    // Sliders ========================================================================================================================================================================================================================================================
    const initSliders = () => {
        if (document.querySelector('[data-slider-news]')) {
            new Swiper('[data-slider-news]', {
                slidesPerView: 3,
                spaceBetween: 16,
                speed: 400,
                loop: true,
            });
        }

        if (document.querySelector('[data-slider-info]')) {
            new Swiper('[data-slider-info]', {
                modules: [Navigation, Autoplay],
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 400,
                loop: true,

                autoplay: {
                    delay: 10000,
                    disableOnInteraction: true,
                },

                navigation: {
                    prevEl: '[data-info-prev]',
                    nextEl: '[data-info-next]',
                },
            });
        }

        if (document.querySelector('[data-slider-rating]')) {
            new Swiper('[data-slider-rating]', {
                modules: [Navigation],
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 4,
                speed: 400,
                direction: "vertical",
                navigation: {
                    prevEl: '[data-rating-top]',
                    nextEl: '[data-rating-bottom]',
                },
            });
        }

        if (document.querySelector('[data-slider-communications]')) {
            new Swiper('[data-slider-communications]', {
                modules: [Navigation],
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 4,
                speed: 400,
                direction: "vertical",
                navigation: {
                    prevEl: '[data-communications-top]',
                    nextEl: '[data-communications-bottom]',
                },
            });
        }

        if (document.querySelector('[data-slider-fbs]')) {
            new Swiper('[data-slider-fbs]', {
                modules: [Navigation],
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 4,
                speed: 400,
                direction: "vertical",
                navigation: {
                    prevEl: '[data-fbs-top]',
                    nextEl: '[data-fbs-bottom]',
                },
            });
        }

        if (document.querySelector('[data-slider-fbo]')) {
            new Swiper('[data-slider-fbo]', {
                modules: [Navigation],
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 4,
                speed: 400,
                direction: "vertical",
                navigation: {
                    prevEl: '[data-fbo-top]',
                    nextEl: '[data-fbo-bottom]',
                },
            });
        }
    }
    initSliders();
    // Sliders ========================================================================================================================================================================================================================================================


    const salesHistory = [
        {
            date: {
                abbreviated: '03, сб',
                full: '3 июня, суббота'
            },
            order: {
                sum: 0,
                total: 0
            },
            delivered: {
                sum: 0,
                total: 0
            }
        },
        {
            date: {
                abbreviated: '04, вс',
                full: '4 июня, воскресение'
            },
            order: {
                sum: 187,
                total: 1
            },
            delivered: {
                sum: 187,
                total: 1
            }
        },
        {
            date: {
                abbreviated: '05, пн',
                full: '5 июня, понедельник'
            },
            order: {
                sum: 966,
                total: 4
            },
            delivered: {
                sum: 966,
                total: 4
            }
        },
        {
            date: {
                abbreviated: '06, вт',
                full: '6 июня, вторник'
            },
            order: {
                sum: 2792,
                total: 10
            },
            delivered: {
                sum: 2792,
                total: 10
            }
        },
        {
            date: {
                abbreviated: '07, ср',
                full: '7 июня, среда'
            },
            order: {
                sum: 388,
                total: 2
            },
            delivered: {
                sum: 388,
                total: 2
            }
        },
        {
            date: {
                abbreviated: '08, пт',
                full: '8 июня, четверг'
            },
            order: {
                sum: 2817,
                total: 6
            },
            delivered: {
                sum: 2328,
                total: 5
            }
        },
        {
            date: {
                abbreviated: '09, пт',
                full: '9 июня, пятница'
            },
            order: {
                sum: 4152,
                total: 8
            },
            delivered: {
                sum: 169,
                total: 1
            }
        },
        {
            date: {
                abbreviated: '10, сб',
                full: '10 июня, суббота'
            },
            order: {
                sum: 1876,
                total: 6
            },
            delivered: {
                sum: 169,
                total: 1
            }
        },
        {
            date: {
                abbreviated: '11, вс',
                full: '11 июня, воскресенье'
            },
            order: {
                sum: 4515,
                total: 9
            },
            delivered: {
                sum: 169,
                total: 1
            }
        },
        {
            date: {
                abbreviated: '12, пн',
                full: '12 июня, понедельник'
            },
            order: {
                sum: 1769,
                total: 4
            },
            delivered: {
                sum: 350,
                total: 1
            }
        },
        {
            date: {
                abbreviated: '13, вт',
                full: '13 июня, вторник'
            },
            order: {
                sum: 3225,
                total: 8
            },
            delivered: {
                sum: 0,
                total: 0
            }
        },
        {
            date: {
                abbreviated: '14, ср',
                full: '14 июня, среда'
            },
            order: {
                sum: 4313,
                total: 9
            },
            delivered: {
                sum: 0,
                total: 0
            }
        },
        {
            date: {
                abbreviated: '15, чт',
                full: '15 июня, четверг'
            },
            order: {
                sum: 1798,
                total: 4
            },
            delivered: {
                sum: 0,
                total: 0
            }
        },

        {
            date: {
                abbreviated: '16, пт',
                full: '16 июня, пятница'
            },
            order: {
                sum: 0,
                total: 0
            },
            delivered: {
                sum: 0,
                total: 0
            }
        },
    ];


    // ========================================================================================================================================================================================================================================================
    // CANVAS  ============================================================================================================================================================================================================================================================================================================
    // ========================================================================================================================================================================================================================================================
    const points = [];
    const pointsY = [];

    const canvas = document.getElementById('chart');
    const context = canvas.getContext('2d');
    const dataChartOrders = [];
    const dataChartDelivery = [];
    const chartWidth = canvas.width - 46;
    const chartHeight = canvas.height - 64;

    for (let i = 0; i < salesHistory.length; i++) {
        dataChartOrders.push(salesHistory[i].order.sum);
        dataChartDelivery.push(salesHistory[i].delivered.sum);
    }

    const maxDataValue = Math.max.apply(null, dataChartOrders);
    const pointWidth = chartWidth / (dataChartOrders.length - 1);
    const pointHeightRatio = chartHeight / maxDataValue;



    //Пунктирная верхняя линия
    context.setLineDash([3, 5]);
    context.beginPath();
    context.moveTo(0, 24);
    context.lineTo(788 + 23, 24);
    context.strokeStyle = '#D3DDE6';
    context.stroke();

    //Пунктирная средняя линия
    context.setLineDash([3, 5]);
    context.beginPath();
    context.moveTo(0, (152 + 24) / 2);
    context.lineTo(788 + 23, (152 + 24) / 2);
    context.strokeStyle = '#D3DDE6';
    context.stroke();


    // Серая нижняя линия
    context.setLineDash([0, 0]);
    context.beginPath();
    context.moveTo(0, 152);
    context.lineTo(788 + 23, 152);
    context.strokeStyle = '#D3DDE6';
    context.stroke();


    //График доставки

    context.beginPath();
    context.moveTo(20, canvas.height - (dataChartDelivery[0] * pointHeightRatio) - 40);

    for (let i = 0; i < dataChartDelivery.length; i++) {
        let x = i * pointWidth + 20;
        let y = canvas.height - (dataChartDelivery[i] * pointHeightRatio) - 40;
        // Рисование плавного перехода
        let prevX = (i - 1) * pointWidth + 20;
        let prevY = canvas.height - (dataChartDelivery[i - 1] * pointHeightRatio) - 40;
        let controlPointX1 = (prevX + x) / 2;
        let controlPointY1 = prevY;
        let controlPointX2 = (prevX + x) / 2;
        let controlPointY2 = y;
        context.bezierCurveTo(controlPointX1, controlPointY1, controlPointX2, controlPointY2, x, y);
    }

    context.lineWidth = 2.25;
    context.fillStyle = '#d6e8fb';
    context.fill();


    //График продаж

    context.beginPath();
    context.moveTo(20, canvas.height - (dataChartOrders[0] * pointHeightRatio) - 40);

    for (var i = 0; i < dataChartOrders.length; i++) {
        var x = i * pointWidth + 20;
        var y = canvas.height - (dataChartOrders[i] * pointHeightRatio) - 40;
        points.push(x)
        pointsY.push(y)
        // Рисование плавного перехода
        var prevX = (i - 1) * pointWidth + 20;
        var prevY = canvas.height - (dataChartOrders[i - 1] * pointHeightRatio) - 40;
        var controlPointX1 = (prevX + x) / 2;
        var controlPointY1 = prevY;
        var controlPointX2 = (prevX + x) / 2;
        var controlPointY2 = y;
        context.bezierCurveTo(controlPointX1, controlPointY1, controlPointX2, controlPointY2, x, y);
    }

    context.lineWidth = 2.25;
    context.strokeStyle = '#3499F1';
    context.stroke();

    //Показываем точки  на графике доставки
    for (let i = 0; i < dataChartOrders.length; i++) {
        let x = i * pointWidth + 20;
        let y = canvas.height - (dataChartOrders[i] * pointHeightRatio) - 40;

        context.beginPath();
        context.arc(x, y, 4, 0, 2 * Math.PI);
        context.fillStyle = '#3499F1';
        context.fill();

        context.beginPath();
        context.arc(x, y, 2, 0, 2 * Math.PI);
        context.fillStyle = '#f5f7fa';
        context.fill();
    }



    const getMaxOrder = () => {
        const maxOrder = new Intl.NumberFormat('de-DE').format(salesHistory.map(item => item.order.sum).sort((a, b) => b - a)[0]);
        return maxOrder.slice(0, maxOrder.indexOf('.') + 2) + 'K'
    }


    // Добавление текста в верхнем правом углу
    context.font = '14px Arial';
    context.fillStyle = '#8d95a5';
    context.textAlign = 'right';
    context.fillText(getMaxOrder(), canvas.width - 10, 18);

    // Добавление текста в нижнем правом углу
    context.font = '14px Arial';
    context.fillStyle = '#8d95a5';
    context.textAlign = 'right';
    context.fillText('0', canvas.width - 10, canvas.height - 46);

    for (let i = 0; i < salesHistory.length; i++) {
        var x = i * pointWidth + 40;
        var y = canvas.height - (dataChartOrders[i] * pointHeightRatio) - 40;
        context.font = '12px Arial';
        context.fillStyle = '#8d95a5';
        context.textAlign = 'right';
        context.fillText(salesHistory[i].date.abbreviated, x, canvas.height - 18);
    }



    // ========================================================================================================================================================================================================================================================
    // CANVAS - 1 ============================================================================================================================================================================================================================================================================================================
    // ========================================================================================================================================================================================================================================================
    const canvas1 = document.getElementById('chart-1');
    const context1 = canvas1.getContext('2d');
    let activeNumPoint = 0;
    let mouseX = 0;
    let mouseY = 0;

    const charWindow = document.querySelector('[data-chart]');
    const charWindowDate = document.querySelector('.chart-data__date');
    const charOrderSum = document.querySelector('.chart-data__item_order > .chart-data__sum');
    const charOrderQuantity = document.querySelector('.chart-data__item_order > .chart-data__quantity');
    const charDeliveredSum = document.querySelector('.chart-data__item_delivered > .chart-data__sum');
    const charDeliveredQuantity = document.querySelector('.chart-data__item_delivered > .chart-data__quantity');


    const searchPoint = (searchNum) => {
        return points.find(it => Math.abs(it - searchNum) === Math.min(...points.map(it => Math.abs(it - searchNum))));
    }

    const drawVerticalLine = (x, y) => {
        context1.clearRect(0, 0, canvas1.width, canvas1.height);
        context1.beginPath();
        context1.moveTo(x, 16);
        context1.lineTo(x, canvas1.height - 41);
        context1.strokeStyle = '#647082';
        context1.lineWidth = 1;
        context1.stroke();

        context1.beginPath();
        context1.arc(x, y - 1, 3, 0, 3 * Math.PI);
        context1.fillStyle = '#3499F1';
        context1.fill();
    }

    canvas1.addEventListener('mousemove', (event) => {
        const rect = canvas1.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
        activeNumPoint = points.findIndex(item => item === searchPoint(mouseX));

        if (salesHistory[activeNumPoint]) {
            charWindowDate.innerHTML = salesHistory[activeNumPoint].date.full;
            charOrderSum.innerHTML = `${salesHistory[activeNumPoint].order.sum} ₽`;
            charOrderQuantity.innerHTML = `${salesHistory[activeNumPoint].order.total} тов.`;
            charDeliveredSum.innerHTML = `${salesHistory[activeNumPoint].delivered.sum} ₽`;
            charDeliveredQuantity.innerHTML = `${salesHistory[activeNumPoint].delivered.total} тов.`;
        }

        drawVerticalLine(searchPoint(mouseX), pointsY[activeNumPoint]);
        charWindow.style.left = searchPoint(mouseX) + 'px'
        charWindow.classList.add('chart-data_active');
    });

    canvas1.addEventListener("mouseout", (event) => {
        context1.clearRect(0, 0, canvas1.width, canvas1.height);
        charWindow.classList.remove('chart-data_active');
    });



    //------------------------------------------------------------------
    const headButtonsPopup = document.querySelectorAll('[data-head-menu]');

    const newChart = (what = 'rub', interval = '14') => {
        console.log(what, interval)
    }

    const changeChart = (parent, button) => {
        const box = button.closest('.head-menu__box');
        const icons = box.querySelectorAll('.head-menu__select')
        const what = parent.querySelector('[data-what]');
        const time = parent.querySelector('[data-time]');
        const interval = button.getAttribute('data-interval');
        const content = button.getAttribute('data-content');

        toggleActiveIcon(button, icons)

        if (interval) {
            const intervalNum = parseInt(interval) || 'неделя';
            time.innerHTML = interval;
            time.setAttribute('data-time', intervalNum);
            newChart(what.getAttribute('data-what'), intervalNum);
        }

        if (content) {
            what.innerHTML = content;
            what.setAttribute('data-what', content);
            newChart(content, time.getAttribute('data-time'));
        }
        hideHeadPopup();
    }

    const changeBonus = (parent, button, idx) => {
        const icons = parent.querySelectorAll('.head-menu__select');
        const block = parent.closest('.main-box');
        const boxes = block.querySelectorAll('.main-box__link')
        toggleActiveIcon(button, icons)
        boxes.forEach((box, i) => {
            idx !== i ? box.classList.add('main-box__link_hide') : box.classList.remove('main-box__link_hide');
        })
        hideHeadPopup();
    }

    const changeSales = (parent, button, idx) => {
        const icons = parent.querySelectorAll('.head-menu__select');
        const block = parent.closest('.main-box');
        const boxes = block.querySelectorAll('.main-box__goods')
        toggleActiveIcon(button, icons)
        boxes.forEach((box, i) => {
            idx !== i ? box.classList.add('main-box__goods_hide') : box.classList.remove('main-box__goods_hide');
        })
        hideHeadPopup();
    }



    const toggleActiveIcon = (button, icons) => {
        icons.forEach(icon => {
            icon.classList.remove('head-menu__select_active')
            if (icon.closest('button') === button) {
                icon.classList.add('head-menu__select_active')
            }
        })
    }

    const hideHeadPopup = () => {
        headButtonsPopup.forEach(button => {
            const parent = button.closest('.box-head');
            const menu = parent.querySelector('.head-menu');
            const icon = button.querySelector('.icon');
            menu.classList.remove('head-menu_active');
            icon.classList.remove('box-head__icon-active');
        })
    }


    const showHeadPopup = (button) => {
        const parent = button.closest('.box-head');
        const menu = parent.querySelector('.head-menu');
        const icon = button.querySelector('.icon');
        const buttons = menu.querySelectorAll('.head-menu__button');
        menu.classList.add('head-menu_active');
        icon.classList.add('box-head__icon-active');

        if (button.getAttribute('data-head-menu') === 'chart') {
            buttons.forEach(button => button.addEventListener('click', () => {
                changeChart(parent, button)
            }))
        }

        if (button.getAttribute('data-head-menu') === 'bonus') {
            buttons.forEach((button, idx) => button.addEventListener('click', () => {
                changeBonus(parent, button, idx)
            }))
        }

        if (button.getAttribute('data-head-menu') === 'sales') {
            buttons.forEach((button, idx) => {
                button.addEventListener('click', () => {
                    button.tagName === 'BUTTON' ? changeSales(parent, button, idx) : hideHeadPopup();
                })
            })
        }
    }

    headButtonsPopup.forEach(button => button.addEventListener('click', () => showHeadPopup(button)))

    //--------------------
    const footerHelpButton = document.querySelector('[data-footer-help]');
    const footerMenu = document.querySelector('[data-footer-menu]');


    const showFooterMenu = () => {
        const icons = footerHelpButton.querySelectorAll('.icon')
        footerMenu.classList.toggle('footer__nav_active');

        if (footerMenu.classList.contains('footer__nav_active')) {
            icons[0].classList.add('footer__icon-hide');
            icons[1].classList.remove('footer__icon-hide');
        } else {
            icons[1].classList.add('footer__icon-hide');
            icons[0].classList.remove('footer__icon-hide');
        }
    }

    footerHelpButton.addEventListener('click', showFooterMenu)
});