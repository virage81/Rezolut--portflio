$(function () {
	// Slider
	let reviewsContainer = $("#slider");

	reviewsContainer.slick({
		slidesToShow: 1,
		fade: true,
	});
});

// fixed Header
let header = document.querySelector("#header"),
	headerHeight = parseInt(header.offsetHeight + header.offsetTop),
	headerBtn = document.querySelector("#header-button"),
	headerNav = document.querySelector("#header-nav"),
	scrollTop = 0;

function checkPos(e) {
	scrollTop = Math.floor(e.currentTarget.pageYOffset);
	if (scrollTop >= headerHeight) {
		header.classList.add("header--fixed");
	} else {
		header.classList.remove("header--fixed");
	}
	headerNav.classList.remove("show");
	header.classList.remove("header--show-nav");
}

window.addEventListener("scroll", checkPos);
window.addEventListener("load", checkPos);

// checkPos();

// adaptive Header
headerBtn.onclick = () => {
	headerNav.classList.toggle("show");
	headerNav.classList.contains("show") ? header.classList.add("header--show-nav") : header.classList.remove("header--show-nav");
};

window.onclick = closeHeader;

function closeHeader(e) {
	if (e.target) console.log(e.target);
}
