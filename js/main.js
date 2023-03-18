/* fancybox BEGIN */
Fancybox.defaults.placeFocusBack = false;
Fancybox.defaults.autoFocus = false;
Fancybox.defaults.trapFocus = false;
Fancybox.defaults.Toolbar = {
	display: ["close", "counter"]
};
Fancybox.defaults.l10n = {
	CLOSE: "Закрыть",
	NEXT: "Дальше",
	PREV: "Назад",
	MODAL: "Вы можете закрыть данное окно, нажав клавишу ESC",
	ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
	IMAGE_ERROR: "Изображение не найдено",
	ELEMENT_NOT_FOUND: "HTML элемент не найден",
	AJAX_NOT_FOUND: "Ошибка загрузки AJAX : Не найдено",
	AJAX_FORBIDDEN: "Ошибка загрузки AJAX : Запрещено",
	IFRAME_ERROR: "Ошибка загрузки страницы",
	TOGGLE_ZOOM: "Переключить уровень масштаба",
	TOGGLE_THUMBS: "Переключить эскиз",
	TOGGLE_SLIDESHOW: "Переключить презентацию",
	TOGGLE_FULLSCREEN: "Переключить режим полного экрана",
	DOWNLOAD: "Скачать",
};

function initFancy() {
	Fancybox.bind(".fancy", {
		closeButton: 'inside'
	});

	Fancybox.bind(".fancy-modal", {
		dragToClose: false
	});

	Fancybox.bind(".fancy-video", {
		dragToClose: false,
	});

	Fancybox.bind(".fancy-map", {
		dragToClose: false,
		type: 'iframe'
	});
}

document.addEventListener("DOMContentLoaded", function () {
	initFancy();
});
/* fancybox END */


/* Прокрутка к секциям BEGIN */
document.addEventListener("DOMContentLoaded", function () {
	$('.scrollto').on('click', function () {
		const elementClick = $(this).attr("href");
		const destination = $(elementClick).offset().top;
		$('html,body').stop().animate({ scrollTop: destination }, 1000);
		$('.burger').removeClass('active');
		$('.mob-panel').removeClass('active');
		$('body').removeClass('stopped');
		return false;
	});
});
/* Прокрутка к секциям END */


/* Mob menu Begin */
document.addEventListener("DOMContentLoaded", function () {
	$('.burger').on('click', function () {
		$(this).toggleClass('active');
		$('.mob-panel').toggleClass('active');
		$('body').toggleClass('stopped');
	});

	$(document).on('click touchstart', function (e) {
		const div = $(".burger,.mob-panel");
		if (!div.is(e.target) && div.has(e.target).length === 0 && $('.mob-panel').hasClass('active')) {
			$('.burger').removeClass('active');
			$('.mob-panel').removeClass('active');
			$('body').removeClass('stopped');
		}
	});
});
/* Mob menu End */


/* Reviews Begin */
document.addEventListener("DOMContentLoaded", function () {
	const moreBtn = document.querySelector('.reviews-more-btn .btn');
	const hiddenReviews = $('.reviews-list-hidden');

	moreBtn.addEventListener('click', (e) => {
		hiddenReviews.slideToggle();
		if (e.target.innerHTML === "Читать ещё отзывы") {
			e.target.innerHTML = "Свернуть";
		} else {
			e.target.innerHTML = "Читать ещё отзывы";
		}
	})

	const reviewsRating = new StarRating('.star-rating', {
		tooltip: false
	});

	const formRating = new StarRating('.form-stars', {
		tooltip: false,
	});
})
/* Reviews End */