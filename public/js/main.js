document.addEventListener("DOMContentLoaded", function() {
  const editNameButton = document.getElementById("editNameButton");
  const modal = document.getElementById("editNameModal");
  const closeButton = document.querySelector(".close-button");

  editNameButton.addEventListener("click", function() {
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
