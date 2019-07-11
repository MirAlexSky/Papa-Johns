'use strict';

let statistics = [],
    schedule,
    maxHeight;

let scheduleDataLoaded = false;
let DOMLoaded = false;

let pager = {
    'currentPage': 0,
    'pageList': [],
    'pageNum': null,
    initPager: function(arrayOfPages, pageNum) {
        for (let pageClass of arrayOfPages) {
            this.pageList.push(document.getElementsByClassName(pageClass)[0]);
        }
        this.pageNum = document.getElementsByClassName(pageNum)[0]
    },
    nextPage: function() {
        if (this.currentPage === this.pageList.length - 1) return;
        this.currentPage++;
        this.pageList[this.currentPage].classList.remove('hidden');
        this.pageList[this.currentPage - 1].classList.add('hidden');

        this.pageNum.textContent = this.currentPage + 1;
    },
    previousPage: function() {
        if (this.currentPage === 0) return;
        this.currentPage--;
        this.pageList[this.currentPage].classList.remove('hidden');
        this.pageList[this.currentPage + 1].classList.add('hidden');

        this.pageNum.textContent = this.currentPage + 1;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    DOMLoaded = true;
    loadSchedule();
    loadPager();
});

let xhr = new XMLHttpRequest();
xhr.open('GET', 'php/getStatistic.php', true);

xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;

    initStatistics(JSON.parse(xhr.responseText));
};

xhr.send();

function loadSchedule() {
    schedule = document.querySelector('.schedule');
    maxHeight = schedule.clientHeight - 60;

    if (scheduleDataLoaded) {
        updateSchedule();
    }
}

function loadPager() {
    pager.initPager([
        'slide-history',
        'slide-support',
        'slide-quality'], 'control__current-page');

    let arrowBack = document.querySelector('.arrow-back');
    let arrowNext = document.querySelector('.arrow-next');

    arrowBack.addEventListener('click', function() {
        pager.previousPage();
    });

    arrowNext.addEventListener('click', function() {
        pager.nextPage();
    })
}

function initStatistics(response) {
    if (response.successful) {
        statistics = response.body;

        statistics.sort(function(a, b) {
            return (a.year - b.year);
        });

        scheduleDataLoaded = true;
        if (DOMLoaded) {
            updateSchedule();
        }
    }
}

function updateSchedule() {

    let maxCount = ~~statistics[statistics.length - 1].franchises +
        ~~statistics[statistics.length - 1].restaurants;

    for (let statistic of statistics) {
        let column = document.createElement('div');
        column.classList.add('schedule-column');

        let num1 = document.createElement('div');
        num1.classList.add('schedule-num1');
        let num2 = document.createElement('div');
        num2.classList.add('schedule-num2');
        let num3 = document.createElement('div');
        num3.classList.add('schedule-num3');
        let num4 = document.createElement('div');
        num4.classList.add('schedule-num4');
        let rectFranchise = document.createElement('div');
        rectFranchise.className = 'schedule-rect rect-franchise';
        let rectRestaurant = document.createElement('div');
        rectRestaurant.className = 'schedule-rect rect-restaurant';

        num1.textContent = ~~statistic.franchises + ~~statistic.restaurants;
        num2.textContent = statistic.franchises;
        num3.textContent = statistic.restaurants;
        num4.textContent = statistic.year;

        rectFranchise.style.height =
            statistic.franchises / maxCount * maxHeight + 'px';
        rectRestaurant.style.height =
            statistic.restaurants / maxCount * maxHeight + 'px';

        column.appendChild(num1);
        column.appendChild(num2);
        column.appendChild(num3);
        column.appendChild(rectFranchise);
        column.appendChild(rectRestaurant);
        column.appendChild(num4);

        schedule.appendChild(column);
    }
}

