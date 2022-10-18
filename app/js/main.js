function headerFixed() {
	let header = document.querySelector("#header"),
		scrollTop = 0,
		headerHeight = header.offsetHeight + header.offsetTop;

	window.onscroll = () => {
		scrollTop = window.scrollY;

		scrollTop >= headerHeight ? header.classList.add("header--fixed") : header.classList.remove("header--fixed");
	};
}

headerFixed();
