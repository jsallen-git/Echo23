const input = document.getElementById('inputField');
const banner = document.getElementById('banner');

input.addEventListener('focus', () => {
  banner.style.opacity = '1';
});

input.addEventListener('blur', () => {
  banner.style.opacity = '0';
});

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("commentForm").addEventListener("submit", function (e) {
		e.preventDefault();
		
		const name = document.getElementById("name").value.trim();
		const email = document.getElementById("email").value.trim();
		const comments = document.getElementById("comments").value.trim();
		
		if (name && email && comments) {
			const commentBlock = document.createElement("div");
			commentBlock.className = "comment-block";
			commentBlock.innerHTML = `<strong>${name}</strong> (<em>${email}</em>)<br><p>${comments}</p><hr>`;
			
			document.getElementById("commentSection").appendChild(commentBlock);
			document.getElementById("commentForm").reset();
		}
	});
});