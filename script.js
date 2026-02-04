/* Header
============================ */
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { // 일정값 이상 스크롤되면
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
});

/* GNB
============================ */
const gnbButtons = document.querySelectorAll('.gnb');

gnbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 대상 ID 가져오기
        const targetId = btn.getAttribute('data-target');
        // 대상 ID의 해당 섹션 가져오기
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // 헤더 높이를 현재 화면 너비 기준으로 계산
            const headerHeight = window.innerWidth * (5.47 / 100); 

            window.scrollTo({
                // 위쪽 헤더 높이만큼 남기기(섹션 가려짐 방지)
                top: targetSection.offsetTop - headerHeight, 
                behavior: 'smooth'
            });
        }
    });
});

/* Top Btn
============================ */
let topBtn = document.querySelector('.topBtn');

topBtn.addEventListener('click', () => {
    window.scrollTo({ // top scroll effect
        top: 0,
        behavior: 'smooth' 
    });
})

/* Main
============================ */
document.addEventListener("DOMContentLoaded", () => {
    const slideElements = document.querySelectorAll('.per-line, .conclusion');
    const fadeElements = document.querySelectorAll('.cl-left li span');
    const seinElements = document.querySelector('.sein-elements');
    const scrollList = document.querySelector('.list-container');
    const descElements = document.querySelectorAll('.sein-desc, .diag-desc, .rout-desc, .medi-desc');
    const otherElements = document.querySelectorAll('.comu-desc, .coup-desc');

    const observerOptions = {
        root: null, // 브라우저 뷰포트 기준
        threshold: .2 // 요소가 설정값만큼 보였을 때 실행
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;

            if (entry.isIntersecting) {
                // Active Class
                const activeClasses = [
                    'sein-elements', 'sein-desc', 'diag-desc', 'rout-desc', 'medi-desc',
                    'comu-desc', 'coup-desc'
                ];
                
                if (activeClasses.some(cls => target.classList.contains(cls))) {
                    target.classList.add('active');
                }

                // Persona & Conclusion
                if (target.classList.contains('per-line') || target.classList.contains('conclusion')) {
                    target.classList.add('slide');
                }
                
                // Colors
                if (target.closest('.cl-left')) {
                    target.classList.add('fadeIn');
                }

                // Routine List
                if (target.classList.contains('list-container')) {
                    const list = target.querySelector('.rout-list');
                    if(list) list.classList.remove('paused');
                }


            } else {
                target.classList.remove('active', 'slide', 'fadeIn');

                if (target.classList.contains('list-container')) {
                    const list = target.querySelector('.rout-list');
                    if(list) list.classList.add('paused');
                }
            }
        });
    }, observerOptions);

    // 영역 진입 감시 -> 실행
    slideElements.forEach(el => observer.observe(el));
    fadeElements.forEach(el => observer.observe(el));
    descElements.forEach(el => observer.observe(el));
    otherElements.forEach(el => observer.observe(el));

    if (seinElements) observer.observe(seinElements);
    if (scrollList) observer.observe(scrollList);
});