const foo = (ms) =>
	new Promise((res) =>
		setTimeout(res, ms, `Resolved after ${ms} milliseconds!`)
	);

foo(3000).then((text) => {
	const div = document.createElement("div");
	div.textContent = text;
	document.body.appendChild(div);
});
