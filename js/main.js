/* Отправка формы в php BEGIN */
document.addEventListener("DOMContentLoaded", function () {
	$(".ajax-form").off("submit").on("submit", function (event) {
		event.preventDefault();
		const form = $(this);
		const submitBtn = form.find('.btn');
		const thanksModal = form.data('thanks') === undefined ? '#modal-thanks' : form.data('thanks');
		let canSend = true;

		$(this).find("[data-req='true']").each(function () {
			if ($(this).val() === "") {
				$(this).addClass('error');
				canSend = false;
			}
			if ($(this).is('select')) {
				if ($(this).val() === null) {
					$(this).addClass('error');
					canSend = false;
				}
			}
			if ($(this).is('input[type="checkbox"]')) {
				if ($(this).prop('checked') !== true) {
					$(this).addClass('error');
					canSend = false;
				}
			}
			if ($(this).is('input[type="tel"]')) {
				if ($(this).cleanVal().length < 11) {
					$(this).addClass('error');
					canSend = false;
				}
			}
		});

		$(this).find("[data-req='true']").on('focus', function () {
			$(this).removeClass('error');
		});

		// empty file inputs fix for mac
		const fileInputs = $('input[type="file"]:not([disabled])', form);
		fileInputs.each(function (_, input) {
			if (input.files.length > 0) return;
			$(input).prop('disabled', true)
		});

		const form_data = new FormData(this);

		fileInputs.prop('disabled', false);

		$("[data-label]").each(function () {
			const input_name = $(this).attr('name');
			const input_label__name = input_name + '_label';
			const input_label__value = $(this).data('label').toString();
			form_data.append(input_label__name, input_label__value)
		});

		if (canSend === true) {
			submitBtn.prop('disabled', true);
			$.ajax({
				type: "POST",
				async: true,
				url: "/ajax/send.php",
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				success: (function (res) {
					let result = $.parseJSON(res);
					console.log(result);
					Fancybox.close();
					if (result.mailSend) {
						setTimeout(function () {
							Fancybox.show([{src: thanksModal}]);
						}, 600);
						setTimeout(function () {
							Fancybox.close();
						}, 4500);
						form[0].reset();
					} else {
						Fancybox.show([{src: '#modal-error'}]);
					}
				})
			});
			setTimeout(function () {
				submitBtn.prop('disabled', false);
			}, 5000);
		}
	});
});
/* Отправка формы в php END */


/* Flickity defaults BEGIN */
//Flickity.defaults.accessibility = false;
/* Flickity defaults END */


/* Input mask BEGIN */
document.addEventListener("DOMContentLoaded", function () {
	const telInputs = $("input[type='tel']");
	String.prototype.replaceAt = function(index, replacement) {
		return this.substr(0, index) + replacement + this.substr(index + replacement.length);
	};

	const options =  {
		onKeyPress: function(cep, event, currentField, options){
			if (cep.charAt(1) === "8"){
				const currentValue = currentField.get(0).value;
				currentField.get(0).value = currentValue.replaceAt(1, "7");
			}
		}
	};

	telInputs.mask("+0 (000) 000-00-00", options);

	telInputs.on('focus',function () {
		if ($(this).get(0).value.length < 2){
			$(this).get(0).value = "+"
		}
	});

	telInputs.on('blur',function () {
		if ($(this).get(0).value === "+"){
			$(this).get(0).value = ""
		}
	})
});
/* Input mask END */


/* fancybox BEGIN */
Fancybox.defaults.placeFocusBack = false;
Fancybox.defaults.autoFocus = false;
Fancybox.defaults.trapFocus = false;
Fancybox.defaults.Toolbar = {
	display: ["close","counter"]
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
		$('html,body').stop().animate({scrollTop: destination}, 1000);
		return false;
	});
});
/* Прокрутка к секциям END */


/* Anim Observer BEGIN */
document.addEventListener("DOMContentLoaded", function() {
	const elements = document.querySelectorAll('.anim');
	const options = {
		rootMargin: '-50px 0px',
		threshold: 0
	}
	const callback = (entries) => {
		entries.forEach(entry => {
			if (entry.intersectionRatio > 0) {
				entry.target.classList.add('animated');
				observer.unobserve(entry.target);
			} else {
				//entry.target.classList.remove('animated');
			}
		});
	}

	const observer = new IntersectionObserver(callback,options);

	elements.forEach(element => {
		observer.observe(element);
	});
});
/* Anim Observer END */


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