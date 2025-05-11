// TOGGLE-DASHBOARD

//  document.addEventListener('DOMContentLoaded', function () {
//    const toggleBtn = document.getElementById('toggle-sidebar');
//    const sidebar = document.querySelector('.sidebar');
//  
//    toggleBtn.addEventListener('click', function () {
//      sidebar.classList.toggle('collapsed');
//    });
//  });


const toggleBtn = document.getElementById('toggle-sidebar');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', () => {
  container.classList.toggle('sidebar-collapsed');
});


// Active class switch
const navLinks = document.querySelectorAll('.nav li');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});


// CONNECTIONS 

    const input = document.getElementById("messageInput");
    const messagesDiv = document.getElementById("messages");
    let isLeft = true;

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && input.value.trim() !== "") {
        const msg = document.createElement("div");
        msg.className = "msg " + (isLeft ? "left" : "right");
        msg.innerText = input.value.trim();
        messagesDiv.appendChild(msg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        input.value = "";
        isLeft = !isLeft;
      }
    });

    // HOME

     const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const discussBtns = document.querySelectorAll(".discuss-btn");
    const likeBtns = document.querySelectorAll(".like-btn");
    const dislikeBtns = document.querySelectorAll(".dislike-btn");

    // Handle discuss button click
    discussBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const content = btn.closest(".card-home").getAttribute("data-content");
        popupText.textContent = content;
        popup.classList.add("active");
      });
    });

    // Handle like button click
    


    // Handle dislike button click
    dislikeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("disliked");
      });
    });

    function closePopup() {
      popup.classList.remove("active");
    }