import "../scss/style.scss";

import "../scss/base/swiper.scss";
import "../scss/libs/swiper.scss";
import 'swiper/css';

import Swiper, { Navigation, Autoplay } from 'swiper';
// ========================================================================================================================================================================================================================================================
// Функционал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    // Webp ========================================================================================================================================================================================================================================================
    const isWebp = () => {
        function testWebP(callback) {
            let webP = new Image();
            webP.onload = webP.onerror = function () {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSyggetProductsBox6WWgAA/veff/0PP8bA//LwYAAA";
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

    /*Возвращаем анимацию после загрузки DOM*/
    //============================================================================================================================================================================================================================================
    body.classList.remove('preload');


    let chartData = []

    const showHistorySales = (salesHistory, what) => {
        const chartCounters = document.querySelectorAll('[data-chart-counter]');
        chartCounters.forEach(counter => {
            const count = counter.querySelector('.chart-info__count');
            const label = counter.querySelector('.chart-info__label');
            const sum = counter.querySelector('.chart-info__sum');
            let res = 0;
            let total = 0;
            if (counter.getAttribute('data-chart-counter') === 'order') {
                total = salesHistory.reduce((acc, sale) => {
                    res += what === 'рублях' ? sale.order.sum : sale.order.total;
                    return acc += what === 'рублях' ? sale.order.total : sale.order.sum;
                }, 0);
            } else {
                total = salesHistory.reduce((acc, sale) => {
                    res += what === 'рублях' ? sale.delivered.sum : sale.delivered.total;
                    return acc += what === 'рублях' ? sale.delivered.total : sale.delivered.sum;
                }, 0);
            }
            count.innerHTML = `${total.toLocaleString()} ${what !== 'рублях' ? '₽' : ''}`;
            sum.innerHTML = `${res.toLocaleString()} ${what === 'рублях' ? '₽' : 'шт.'}`;
            label.innerHTML = `${what === 'рублях' ? 'Товаров' : 'Сумма'}`;
        });
    }


    const showDateInterval = (salesHistory) => {
        const chartIntervals = document.querySelectorAll('[data-chart-inerval]');
        const dateFrom = salesHistory[1].date.full;
        const dateTo = salesHistory[salesHistory.length - 2].date.full;
        const monthFrom = dateFrom.split(',')[0].replace(/[^А-Яа-яЁё]/g, '');
        const monthTo = dateTo.split(',')[0].replace(/[^А-Яа-яЁё]/g, '');

        if (monthFrom === monthTo) {
            chartIntervals.forEach(interval => {
                interval.innerHTML = parseInt(dateFrom) ? `${parseInt(dateFrom)} - ${dateTo.split(',')[0]}` : '';
            })
        } else {
            chartIntervals.forEach(interval => {
                interval.innerHTML = `${dateFrom.split(',')[0]} - ${dateTo.split(',')[0]}`;
            })
        }
    }


    const newChart = (what = 'рублях', interval = '14') => {
        let salesHistory = [];
        if (interval === 'неделя') {
            const thisDate = new Date();
            const thisDay = thisDate.getDay() || 7;
            salesHistory = chartData.slice(chartData.length - thisDay, chartData.length);
        } else {
            salesHistory = chartData.slice(chartData.length - interval, chartData.length);
        }

        salesHistory.push({ date: { abbreviated: '', full: '' }, order: { sum: 0, total: 0 }, delivered: { sum: 0, total: 0 } })
        salesHistory.unshift({ date: { abbreviated: '', full: '' }, order: { sum: 0, total: 0 }, delivered: { sum: 0, total: 0 } })

        showDateInterval(salesHistory);
        showHistorySales(salesHistory, what);


        // ========================================================================================================================================================================================================================================================
        // CANVAS  ============================================================================================================================================================================================================================================================================================================
        // ========================================================================================================================================================================================================================================================
        let chartHeight = 0;
        let points = [];
        let pointsY = [];
        let dataChartOrders = [];
        let dataChartDelivery = [];
        const canvas = document.getElementById('chart');
        const context = canvas.getContext('2d');
        const chartWidth = canvas.width - 16;

        const rebuildChart = () => {
            points = [];
            pointsY = [];

            dataChartOrders = [];
            dataChartDelivery = [];


            for (let i = 0; i < salesHistory.length; i++) {
                dataChartOrders.push(what === 'рублях' ? salesHistory[i].order.sum : salesHistory[i].order.total);
                dataChartDelivery.push(what === 'рублях' ? salesHistory[i].delivered.sum : salesHistory[i].delivered.total);
            }
            const maxDataValue = Math.max.apply(null, dataChartOrders);
            const pointWidth = chartWidth / (dataChartOrders.length - 1);
            const pointHeightRatio = chartHeight / maxDataValue;

            context.clearRect(0, 0, canvas.width, canvas.height);

            //Пунктирная верхняя линия
            context.setLineDash([3, 5]);
            context.beginPath();
            context.moveTo(0, 24);
            context.lineTo(788 + 43, 24);
            context.strokeStyle = '#D3DDE6';
            context.stroke();

            //Пунктирная средняя линия
            context.setLineDash([3, 5]);
            context.beginPath();
            context.moveTo(0, (152 + 24) / 2);
            context.lineTo(788 + 43, (152 + 24) / 2);
            context.strokeStyle = '#D3DDE6';
            context.stroke();

            // Серая нижняя линия
            context.setLineDash([1, 0]);

            context.beginPath();
            context.moveTo(0, 152);
            context.lineWidth = 1;

            context.lineTo(788 + 43, 152);
            context.strokeStyle = '#D3DDE6';
            context.stroke();


            //График доставки
            context.beginPath();
            context.moveTo(20, 152);

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
            context.setLineDash([0, 0]);
            context.lineWidth = 2.25;
            context.fillStyle = '#d6e8fb';
            context.fill();


            //График заказов
            context.beginPath();
            context.moveTo(20, canvas.height - (dataChartOrders[0] * pointHeightRatio) - 40);
            for (let i = 0; i < dataChartOrders.length; i++) {
                let x = i * pointWidth + 20;
                let y = canvas.height - (dataChartOrders[i] * pointHeightRatio) - 40;
                points.push(x);
                pointsY.push(y);
                // Рисование плавного перехода
                let prevX = (i - 1) * pointWidth + 20;
                let prevY = canvas.height - (dataChartOrders[i - 1] * pointHeightRatio) - 40;
                let controlPointX1 = (prevX + x) / 2;
                let controlPointY1 = prevY;
                let controlPointX2 = (prevX + x) / 2;
                let controlPointY2 = y;
                if (i < dataChartOrders.length - 1) {
                    context.bezierCurveTo(controlPointX1, controlPointY1, controlPointX2, controlPointY2, x, y);
                }
            }
            context.setLineDash([0, 0]);
            context.lineWidth = 2.25;
            context.strokeStyle = '#3499F1';
            context.stroke();


            //Последний отрезок (пунктиром)
            context.beginPath();
            context.moveTo((dataChartOrders.length - 2) * pointWidth + 20, pointsY[pointsY.length - 2]);

            let x = (dataChartOrders.length - 1) * pointWidth + 20;
            let y = canvas.height - (dataChartOrders[(dataChartOrders.length - 1)] * pointHeightRatio) - 40;
            let prevX = ((dataChartOrders.length - 1) - 1) * pointWidth + 20;
            let prevY = canvas.height - (dataChartOrders[(dataChartOrders.length - 1) - 1] * pointHeightRatio) - 40;
            let controlPointX1 = (prevX + x) / 2;
            let controlPointY1 = prevY;
            let controlPointX2 = (prevX + x) / 2;
            let controlPointY2 = y;
            context.bezierCurveTo(controlPointX1, controlPointY1, controlPointX2, controlPointY2, x, y);
            context.setLineDash([4, 4]);
            context.lineWidth = 2;
            context.strokeStyle = '#b7d9f7';
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

            const getMaxTotal = () => {
                return salesHistory.map(item => item.order.total).sort((a, b) => b - a)[0];
            }

            // Добавление текста в верхнем правом углу
            context.font = '14px Arial';
            context.fillStyle = '#8d95a5';
            context.textAlign = 'right';
            what === 'рублях' ? context.fillText(getMaxOrder(), canvas.width - 10, 18) : context.fillText(getMaxTotal(), canvas.width - 10, 18);

            // Добавление текста в нижнем правом углу
            context.font = '14px Arial';
            context.fillStyle = '#8d95a5';
            context.textAlign = 'right';
            context.fillText('0', canvas.width - 10, canvas.height - 46);


            if (salesHistory.length < 18) {
                for (let i = 0; i < salesHistory.length; i++) {
                    let x = i * pointWidth + 40;
                    let y = canvas.height - (dataChartOrders[i] * pointHeightRatio) - 40;
                    context.font = '12px Arial';
                    context.fillStyle = '#8d95a5';
                    context.textAlign = 'right';
                    context.fillText(salesHistory[i].date.abbreviated, x, canvas.height - 18);
                }
            } else {
                for (let i = 0; i < salesHistory.length; i++) {
                    let x;
                    let y = canvas.height - (dataChartOrders[i] * pointHeightRatio) - 40;
                    if (i % 2 === 0) {
                        x = i * pointWidth + 40;
                        context.font = '12px Arial';
                        context.fillStyle = '#8d95a5';
                        context.textAlign = 'right';
                        context.fillText(salesHistory[i].date.abbreviated, x, canvas.height - 18);
                    }
                }
            }

        }

        const animateChart = () => {
            if (chartHeight < 124) requestAnimationFrame(animateChart);
            chartHeight = chartHeight + 4;
            rebuildChart();
        }
        animateChart();

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

            charWindow.style.display = '';
            charWindow.style.left = searchPoint(mouseX) - 30 + 'px';
            charWindow.classList.add('chart-data_active');

            if (activeNumPoint === 0 || activeNumPoint === points.length - 1) {
                charWindow.style.display = 'none';
            }
        });

        canvas1.addEventListener("mouseout", (event) => {
            context1.clearRect(0, 0, canvas1.width, canvas1.height);
            charWindow.classList.remove('chart-data_active');
        });
    }
    //------------------------------------------------------------------

    const headButtonsPopup = document.querySelectorAll('[data-head-menu]');
    let activeHeadPopup;

    const changeBonus = (parent, button, idx) => {
        const caption = parent.querySelector('[data-head-menu] span');
        const text = button.textContent.trim();
        const icons = parent.querySelectorAll('.head-menu__select');
        const block = parent.closest('.main-box');
        const boxes = block.querySelectorAll('.main-box__link');
        caption.innerHTML = text.length > 23 ? text.slice(0, 23) + '...' : text;
        toggleActiveIcon(button, icons);
        boxes.forEach((box, i) => {
            idx !== i ? box.classList.add('main-box__link_hide') : box.classList.remove('main-box__link_hide');
        })
        hideHeadPopup();
    }


    const changeSales = (parent, button, idx) => {
        const caption = parent.querySelector('[data-head-menu] span');
        const text = parent.querySelector('.head-menu__list').querySelectorAll('li')[idx].querySelector('.head-menu__column span').textContent.trim();
        const icons = parent.querySelectorAll('.head-menu__select');
        const block = parent.closest('.main-box');
        const boxes = block.querySelectorAll('.main-box__goods');
        caption.innerHTML = text.length > 15 ? text.slice(0, 15) + '...' : text;
        toggleActiveIcon(button, icons);
        boxes.forEach((box, i) => {
            idx !== i ? box.classList.add('main-box__goods_hide') : box.classList.remove('main-box__goods_hide');
        })
        hideHeadPopup();
    }


    const toggleActiveIcon = (button, icons) => {
        icons.forEach(icon => {
            icon.classList.remove('head-menu__select_active');
            if (icon.closest('button') === button) {
                icon.classList.add('head-menu__select_active');
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

    const chartControlButons = document.querySelectorAll('[data-chart-control]');

    const changeChart = (buttons) => {
        buttons.forEach(button => {
            const parent = button.closest('.box-head');
            const box = button.closest('.head-menu__box');
            const interval = button.getAttribute('data-interval');
            const content = button.getAttribute('data-content');

            button.addEventListener('click', (e) => {
                const icons = box.querySelectorAll('.head-menu__select');
                const what = parent.querySelector('[data-what]');
                const time = parent.querySelector('[data-time]');
                toggleActiveIcon(button, icons);

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
            })
        })
    }
    changeChart(chartControlButons)

    const showHeadPopup = (button) => {
        const parent = button.closest('.box-head');
        const menu = parent.querySelector('.head-menu');
        const icon = button.querySelector('.icon');
        const buttons = menu.querySelectorAll('.head-menu__button');
        menu.classList.toggle('head-menu_active');
        icon.classList.toggle('box-head__icon-active');

        if (button.getAttribute('data-head-menu') === 'bonus') {
            buttons.forEach((button, idx) => button.addEventListener('click', () => {
                changeBonus(parent, button, idx);
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

    headButtonsPopup.forEach(button => button.addEventListener('click', () => {
        activeHeadPopup = button;
        showHeadPopup(button);
    }))


    document.addEventListener('click', (e) => {
        if (e.target.closest('button') !== activeHeadPopup) {
            hideHeadPopup();
        }
    })

    //--------------------
    const footerHelpButton = document.querySelector('[data-footer-help]');
    const footerMenu = document.querySelector('[data-footer-menu]');

    const showFooterMenu = () => {
        const icons = footerHelpButton.querySelectorAll('.icon');
        footerMenu.classList.toggle('footer__nav_active');

        if (footerMenu.classList.contains('footer__nav_active')) {
            icons[0].classList.add('footer__icon-hide');
            icons[1].classList.remove('footer__icon-hide');
        } else {
            icons[1].classList.add('footer__icon-hide');
            icons[0].classList.remove('footer__icon-hide');
        }
    }

    footerHelpButton.addEventListener('click', showFooterMenu);

    const getDataChart = async () => {
        try {
            let response = await fetch('data.json');
            if (response.ok) {
                let result = response.json()
                    .then((result) => {
                        chartData = result.record;
                        const preloader = document.querySelector('.chart__preloader');
                        preloader.classList.add('chart__preloader_hide');
                        newChart();
                    })
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const chart = document.querySelector('.chart ');

    if (chart) {
        getDataChart();
    }


    //------------------

    const productsPage = document.querySelector('.page_products');

    if (productsPage) {
        let activeTab = document.querySelector('.tabs__box_active');
        const productsButtons = document.querySelectorAll('[data-products-button]');
        const productsMenu = document.querySelectorAll('[data-products-menu]');
        const tableFirstCells = document.querySelectorAll('.products-table__cell_first');
        const tableLastCells = document.querySelectorAll('.products-table__cell_last');
        let productsBox = activeTab.querySelector('.products__box');
        let activeProductsMenu = null;
        let button = null;


        const calcTableCardPosition = () => {
            if (activeProductsMenu && activeProductsMenu.getAttribute('data-products-menu') === 'table-menu') {
                if (productsBox.getBoundingClientRect().right - button.getBoundingClientRect().left < activeProductsMenu.getBoundingClientRect().width) {
                    activeProductsMenu.style.left = productsBox.getBoundingClientRect().right - activeProductsMenu.getBoundingClientRect().width + 'px';
                } else if (button.getBoundingClientRect().left < 24) {
                    activeProductsMenu.style.left = productsBox.getBoundingClientRect().left + 'px';
                } else {
                    activeProductsMenu.style.left = button.getBoundingClientRect().left + 'px';
                }

                if (window.innerHeight - button.getBoundingClientRect().bottom < activeProductsMenu.getBoundingClientRect().height + 20) {
                    activeProductsMenu.style.top = button.getBoundingClientRect().top - activeProductsMenu.getBoundingClientRect().height + 'px';
                } else {
                    activeProductsMenu.style.top = button.getBoundingClientRect().bottom + 'px';
                }

                if (activeProductsMenu.getBoundingClientRect().top < 24) {
                    activeProductsMenu.style.top = 24 + 'px';
                }

                if (window.innerHeight - activeProductsMenu.getBoundingClientRect().bottom < 24) {
                    activeProductsMenu.style.top = window.innerHeight - activeProductsMenu.getBoundingClientRect().height - 24 + 'px';
                }
            }
        }



        const toggleMenu = () => {
            productsMenu.forEach(item => {
                if (activeProductsMenu !== item) {
                    item.classList.remove('active');
                }
            })
            activeProductsMenu.classList.toggle('active');

            activeTab = document.querySelector('.tabs__box_active');
            productsBox = activeTab.querySelector('.products__box');
            calcTableCardPosition();
        }

        window.addEventListener('resize', (e) => {
            activeTab = document.querySelector('.tabs__box_active');
            productsBox = activeTab.querySelector('.products__box');
            calcTableCardPosition();
        })


        window.addEventListener('scroll', function () {
            activeTab = document.querySelector('.tabs__box_active')
            productsBox = activeTab.querySelector('.products__box');
            calcTableCardPosition();
        })


        const getProductsBox = (productsBox) => {
            productsBox.addEventListener('scroll', (e) => {
                calcTableCardPosition();

                tableFirstCells.forEach(cell => {
                    if (e.target.scrollLeft > 5) {
                        cell.classList.add('products-table__cell_highlight');
                    } else {
                        cell.classList.remove('products-table__cell_highlight');
                    }
                })

                tableLastCells.forEach(cell => {
                    if ((e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth) > 5) {
                        cell.classList.add('products-table__cell_highlight');
                    } else {
                        cell.classList.remove('products-table__cell_highlight');
                    }
                })
            });
        }

        getProductsBox(productsBox);

        const toggleButton = () => {
            productsButtons.forEach(item => {
                if (button !== item) {
                    item.classList.remove('active');
                    item.classList.remove('products-table__cell_focus');
                }
            })
            button.classList.toggle('active');

            if (button.classList.contains('products-table__cell_last')) {
                button.classList.toggle('products-table__cell_focus')
            }

        }

        productsButtons.forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation();
                const parent = item.closest('[data-products-parent]');
                const stockCard = e.target.closest('.stock-card')
                activeProductsMenu = parent.querySelector('[data-products-menu]');
                button = item;

                if (!stockCard) {
                    toggleMenu();
                    toggleButton();
                }
                if ((e.target.closest('.stock-card__close') || e.target.closest('.stock-card__button')) && stockCard) {
                    toggleMenu();
                    toggleButton();
                }
            });
        })

        document.addEventListener('click', (e) => {
            if (activeProductsMenu) {
                const target = e.target;
                const menuIsActive = activeProductsMenu ? activeProductsMenu.classList.contains('active') : false;
                const itsCatalog = target == activeProductsMenu || activeProductsMenu.contains(target);


                if (menuIsActive && !activeProductsMenu.classList.contains('products-category__catalog')) {
                    toggleMenu();
                    toggleButton();
                }
                if (menuIsActive && activeProductsMenu.classList.contains('products-category__catalog') && !itsCatalog) {
                    toggleMenu();
                    toggleButton();
                }
            }
        })

        //---------------------

        const productsDiscounts = document.querySelectorAll('[data-products-discount]')

        productsDiscounts.forEach(product => {
            const prompt = product.querySelector('.product-prompt_sale');
            product.addEventListener('mouseover', (e) => {
                if (prompt) {
                    prompt.classList.add('active')
                    prompt.style.top = product.getBoundingClientRect().top - prompt.getBoundingClientRect().height - 10 + 'px';
                    prompt.style.left = product.getBoundingClientRect().right - prompt.getBoundingClientRect().width + 'px';
                }
            })

            product.addEventListener('mouseout', (e) => {
                if (prompt) {
                    prompt.classList.remove('active')
                }
            })
        })

        //--------------------

        const productsIndexs = document.querySelectorAll('[data-products-index]');

        productsIndexs.forEach(index => {
            const parent = index.closest('.products-table__cell');
            const popupData = parent.querySelector('.products-table__tooltip');

            index.addEventListener('mouseover', () => {
                if (popupData) {
                    popupData.classList.add('active');
                    popupData.style.top = index.getBoundingClientRect().top - popupData.getBoundingClientRect().height - 12 + 'px';
                    popupData.style.left = index.getBoundingClientRect().left + 'px';
                }
            })

            index.addEventListener('mouseout', () => {
                if (popupData) {
                    popupData.classList.remove('active');
                }
            })
        })


        //---------------------------
        const productsTableInfoPopup = document.querySelectorAll('[data-table-info]');

        productsTableInfoPopup.forEach(infoPopup => {
            const parent = infoPopup.closest('.products-table__cell');
            const popupData = parent.querySelector('.products-table__info');

            parent.addEventListener('mouseover', () => {
                if (popupData) {
                    popupData.classList.add('active');
                    popupData.style.top = infoPopup.getBoundingClientRect().top - popupData.getBoundingClientRect().height - 10 + 'px';
                    popupData.style.left = infoPopup.getBoundingClientRect().right - popupData.getBoundingClientRect().width + 'px';
                }
            })

            parent.addEventListener('mouseout', () => {
                if (popupData) {
                    popupData.classList.remove('active');
                }
            })
        })

        //--------------------------


        //----------------------------------------------
        const searchPanels = document.querySelectorAll('[data-products-search]')

        const activeSearchPanel = (searchPanels) => {
            searchPanels.forEach(panel => {
                const label = panel.querySelector('.products-search__label')
                const input = panel.querySelector('.products-search__input')
                input.addEventListener('focus', () => {
                    panel.classList.add('products-search__panel_focus')
                    label ? label.classList.add('products-search__label_focus') : false;
                })

                input.addEventListener('blur', () => {
                    panel.classList.remove('products-search__panel_focus')
                    label ? label.classList.remove('products-search__label_focus') : false
                })
            })
        }

        activeSearchPanel(searchPanels);

        //----------------------------------------------------
        const dropdowns = document.querySelectorAll('.products-category__button');

        const toggleSubmenu = () => {
            dropdowns.forEach(dropdown => {
                const parent = dropdown.closest('.products-category__item')
                const submenu = parent.querySelectorAll('ul');
                dropdown.addEventListener('click', event => {
                    event.preventDefault();
                    if (event.currentTarget.closest('li') === parent || event.target === dropdown) {
                        dropdown.classList.toggle('products-category__button_active');
                        submenu.forEach(menu => {
                            if (menu.parentNode === parent) {
                                menu.classList.toggle('products-category__sub_active');
                            }
                        })
                    }
                });
            });
        }
        toggleSubmenu();



        //-------------------------------------------------------

        const getSelectCategoryProducts = (activeTab) => {
            const productsCatalogCategory = activeTab.querySelector('[data-products-category]');
            const productsCatalogCheckboxes = productsCatalogCategory.querySelectorAll('.products-checkbox__input');
            const productsCatalogButton = activeTab.querySelector('.products-search__button_select');
            const productsCatalogCounter = productsCatalogButton.querySelector('span');
            const productsCatalogRemove = activeTab.querySelector('.products-search__button_remove');
            const productsCatalogReset = activeTab.querySelector('[data-products-reset]')
            const productsCatalogApply = activeTab.querySelector('[data-products-apply]')
            let selectCheckboxCounter = 0;

            const setSelectCategory = () => {
                if (selectCheckboxCounter === 1) {
                    productsCatalogCounter.innerHTML = `Выбрана ${selectCheckboxCounter} категория`;
                    productsCatalogButton.classList.add('selected');
                    productsCatalogRemove.classList.add('active');
                    productsCatalogApply.classList.remove('products-search__button_disabled')
                } else if (selectCheckboxCounter > 1 && selectCheckboxCounter < 5) {
                    productsCatalogCounter.innerHTML = `Выбрано ${selectCheckboxCounter} категории`;
                    productsCatalogButton.classList.add('selected');
                    productsCatalogRemove.classList.add('active');
                    productsCatalogApply.classList.remove('products-search__button_disabled')
                } else if (selectCheckboxCounter > 1 && selectCheckboxCounter > 5) {
                    productsCatalogCounter.innerHTML = `Выбрано ${selectCheckboxCounter} категорий`;
                    productsCatalogButton.classList.add('selected');
                    productsCatalogRemove.classList.add('active');
                    productsCatalogApply.classList.remove('products-search__button_disabled')
                } else {
                    productsCatalogCounter.innerHTML = `Выбрать категории`;
                    productsCatalogButton.classList.remove('selected');
                    productsCatalogRemove.classList.remove('active');
                    productsCatalogApply.classList.add('products-search__button_disabled')
                }
            }

            productsCatalogRemove.addEventListener('click', () => {
                productsCatalogCheckboxes.forEach(input => {
                    input.checked = false;
                    selectCheckboxCounter = 0;
                    setSelectCategory();
                })
            })

            productsCatalogReset.addEventListener('click', () => {
                productsCatalogCheckboxes.forEach(input => {
                    input.checked = false;
                    selectCheckboxCounter = 0;
                    setSelectCategory();
                })
            })

            productsCatalogCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const parentList = checkbox.closest('ul');
                    const catalogDirectory = checkbox.closest('[data-products-directory]');
                    const checkboxes = catalogDirectory.querySelectorAll('.products-checkbox__input');
                    const parentLabel = checkboxes[0].closest('label');
                    const mainCheckbox = parentLabel.querySelector('.products-checkbox__custom');

                    if (e.currentTarget.checked) {
                        if (parentList.classList.contains('products-category__sub')) {
                            mainCheckbox.classList.add('products-checkbox__custom_parent');
                            checkboxes.forEach((item) => {
                                if (item !== e.currentTarget && !item.checked) {
                                    item.checked = true;
                                }
                            })
                            selectCheckboxCounter += 1;
                            setSelectCategory();
                        } else {
                            checkboxes.forEach((item) => {
                                if (item !== e.currentTarget && !item.checked) {
                                    item.checked = true;

                                }
                            })
                            selectCheckboxCounter += checkboxes.length - 1;
                            setSelectCategory();
                        }
                    } else {
                        if (parentList.classList.contains('products-category__sub')) {
                            mainCheckbox.classList.remove('products-checkbox__custom_parent');
                            checkboxes.forEach((item) => {
                                if (item !== e.currentTarget && item.checked) {
                                    item.checked = false;
                                }
                            })
                        } else {
                            mainCheckbox.classList.remove('products-checkbox__custom_parent');
                            checkboxes.forEach((item) => {
                                if (item !== e.currentTarget && item.checked) {
                                    item.checked = false;
                                }
                            })
                        }
                        selectCheckboxCounter = (selectCheckboxCounter - (checkboxes.length - 1)) < 0 ? 0 : selectCheckboxCounter - (checkboxes.length - 1);
                        setSelectCategory();
                    }
                })
            })
        }

        getSelectCategoryProducts(activeTab);


        //-------------
        const getProductsGallery = (activeTab) => {
            const photosCheckboxes = activeTab.querySelectorAll('[data-checkbox-foto]')
            photosCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    if (e.currentTarget.checked) {
                        const activeBox = e.currentTarget.getAttribute('data-checkbox-foto')
                        if (activeBox === 'gallery') {
                            const images = activeTab.querySelectorAll('.products-table__image');
                            images.forEach(image => {
                                image.classList.remove('products-table__image_hide')
                            })
                        }
                        if (activeBox === 'colors') {
                            const colors = activeTab.querySelectorAll('.products-table__images');
                            colors.forEach(color => {
                                color.classList.remove('products-table__images_hide')
                            })
                        }
                    } else {
                        const activeBox = e.currentTarget.getAttribute('data-checkbox-foto')
                        if (activeBox === 'gallery') {
                            const images = activeTab.querySelectorAll('.products-table__image');
                            images.forEach(image => {
                                if (!image.hasAttribute('data-products-avatar')) {
                                    image.classList.add('products-table__image_hide')
                                }
                                if (image.classList.contains('products-table__image_none')) {
                                    image.classList.remove('products-table__image_hide')
                                }
                            })
                        }
                        if (activeBox === 'colors') {
                            const colors = activeTab.querySelectorAll('.products-table__images_colors');
                            colors.forEach(color => {
                                color.classList.add('products-table__images_hide')
                            })
                        }
                    }
                })
            })
        }
        getProductsGallery(activeTab);



        const getSelectProducts = (activeTab) => {
            const productCheckBoxes = activeTab.querySelectorAll('.products-table__cell_first  .products-checkbox__input');
            const productCellsLasts = activeTab.querySelectorAll('.products-table__cell_last')
            const productSelectCaption = activeTab.querySelector('.products-select__caption > span');
            const codeMainCostumCheckParent = productCheckBoxes[0].closest('.products-checkbox');
            const codeMainCostumCheckbox = codeMainCostumCheckParent.querySelector('.products-checkbox__custom');
            const productsSelectPanel = activeTab.querySelector('.products-select');
            const productsCategoryButtons = activeTab.querySelector('.products-category');
            const clearSelectProducts = activeTab.querySelector('.products-select__button');
            const productsButtonDownload = document.querySelector('.products-add__button_download');
            const productActionBox = activeTab.querySelector('.products-search__action-box');
            let productSelectCounter = 0;

            const setSelectProduct = () => {
                if (productSelectCounter) {
                    searchPanels[0].style.display = 'none';
                    productsCategoryButtons.style.display = 'none';
                    productsSelectPanel.style.display = 'flex';
                    productsButtonDownload.style.display = 'none';
                    productActionBox.style.display = 'block';
                    productSelectCaption.innerHTML = productSelectCounter;
                    productCellsLasts.forEach(cell => {
                        const locked = cell.querySelector('.products-table__locked');
                        const more = cell.querySelector('.products-table__more');
                        if (locked) {
                            locked.style.display = 'block';
                            more.style.display = 'none';
                            cell.style['pointer-events'] = 'none'
                        }
                    })
                }
                else {
                    searchPanels[0].style.display = '';
                    productsSelectPanel.style.display = '';
                    productsCategoryButtons.style.display = '';
                    productsButtonDownload.style.display = '';
                    productActionBox.style.display = '';
                    codeMainCostumCheckbox.classList.remove('products-checkbox__custom_parent');
                    productCheckBoxes.forEach(checkbox => {
                        checkbox.checked = false;
                    })
                    productCellsLasts.forEach(cell => {
                        const locked = cell.querySelector('.products-table__locked');
                        const more = cell.querySelector('.products-table__more');
                        if (locked) {
                            locked.style.display = '';
                            more.style.display = '';
                            cell.style['pointer-events'] = ''
                        }
                    })
                }
            }

            productCheckBoxes[0].addEventListener('change', (e) => {
                if (e.currentTarget.checked) {
                    codeMainCostumCheckbox.classList.remove('products-checkbox__custom_parent')
                    productCheckBoxes.forEach(checkbox => {
                        checkbox.checked = true;
                    })
                    productSelectCounter = productCheckBoxes.length - 1;
                } else {
                    productCheckBoxes.forEach(checkbox => {
                        checkbox.checked = false;
                    })
                    productSelectCounter = 0;
                }
                setSelectProduct();
            })

            productCheckBoxes.forEach((checkbox, index) => {
                checkbox.addEventListener('change', (e) => {
                    if (e.currentTarget.checked && index !== 0) {
                        codeMainCostumCheckbox.classList.add('products-checkbox__custom_parent')
                        productCheckBoxes[0].checked = true;
                        ++productSelectCounter;
                        setSelectProduct();
                    } else {
                        if (index !== 0) {
                            codeMainCostumCheckbox.classList.add('products-checkbox__custom_parent')
                            --productSelectCounter;
                            setSelectProduct();
                        }
                    }
                })
            })

            clearSelectProducts.addEventListener('click', () => {
                productCheckBoxes.forEach(checkbox => {
                    checkbox.checked = false;
                    productSelectCounter = 0;
                    setSelectProduct();
                })
            });
        }
        getSelectProducts(activeTab);

        class Tabs {
            constructor(attr, className) {
                this.tabs = document.querySelectorAll(`[${attr}]`);

                if (this.tabs.length) {
                    this.buttons = document.querySelectorAll(`[${attr}] [${attr}-button]`);
                    this.attr = attr;
                    this.className = className;
                    this.events();
                }
            }

            events() {
                this.buttons.forEach((button) => {
                    button.addEventListener("click", (e) => {
                        this.toggler(e.target.closest(`[${this.attr}]`), e.currentTarget)
                    })
                });
            }

            toggler(tabs, activeTab) {
                const buttons = tabs.querySelectorAll(`[${this.attr}-button]`);
                const boxes = tabs.querySelectorAll(`[${this.attr}-box]`);
                buttons.forEach((button, idx) => {
                    if (button !== activeTab) {
                        buttons[idx].classList.remove(`${this.className}__button_active`);
                        buttons[idx].classList.remove('products-panel__button_active');
                        boxes[idx].classList.remove(`${this.className}__box_active`);
                    } else {
                        buttons[idx].classList.add(`${this.className}__button_active`);
                        buttons[idx].classList.add('products-panel__button_active');
                        boxes[idx].classList.add(`${this.className}__box_active`);
                        activeTab = document.querySelector('.tabs__box_active')
                        productsBox = activeTab.querySelector('.products__box');
                        getProductsBox(productsBox);
                        calcTableCardPosition();
                        getProductsGallery(activeTab);
                        getSelectProducts(activeTab);
                        getSelectCategoryProducts(activeTab);
                    }
                });
            }
        }

        //Tabs
        new Tabs("data-tabs", "tabs");



        // Costum Select ========================================================================================================================================================================================================================================================

        const customSelects = document.querySelectorAll('.custom-select');

        if (customSelects.length) {
            customSelects.forEach(selectWrapper => {
                const selectedOption = selectWrapper.querySelector('.selected-option');
                const optionsList = selectWrapper.querySelector('.options');
                const hiddenSelect = selectWrapper.querySelector('.hidden-select');

                selectedOption.addEventListener('click', () => {
                    optionsList.style.display = optionsList.style.display === 'none' ? 'block' : 'none';
                });

                optionsList.querySelectorAll('li').forEach(option => {
                    option.addEventListener('click', () => {
                        selectedOption.querySelector('span').textContent = option.textContent;
                        hiddenSelect.value = option.dataset.value;
                        hiddenSelect.dispatchEvent(new Event('change'));
                        optionsList.style.display = 'none';
                    });
                });

                hiddenSelect.addEventListener('change', () => {
                    selectedOption.querySelector('span').textContent = hiddenSelect.options[hiddenSelect.selectedIndex].textContent;
                });

                document.addEventListener('click', (event) => {
                    if (!selectWrapper.contains(event.target)) {
                        optionsList.style.display = 'none';
                    }
                });
            });
        }
    }
})

