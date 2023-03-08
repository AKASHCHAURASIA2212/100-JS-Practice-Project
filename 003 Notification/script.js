const notification = document.querySelector(".notification");
const buttons = document.querySelectorAll(".buttons .btn");
const toastDetails = {
  time: 5000,
  success: {
    icon: "fa-circle-check",
    text: "Success:This is Success toast",
  },
  error: {
    icon: "fa-circle-xmark",
    text: "Error:This is Error toast",
  },
  warning: {
    icon: "fa-triangle-exclamation",
    text: "Warning:This is Warning toast",
  },
  info: {
    icon: "fa-circle-info",
    text: "Info:This is Info toast",
  },
};
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    cresteToast(btn.id);
  });
});

function removeToast(toast) {
  toast.classList.add("hide");
  setTimeout(() => toast.remove(), 500);
}

function cresteToast(id) {
  const { icon, text } = toastDetails[id];
  const toast = document.createElement("li"); // create li elment
  toast.className = `toast ${id}`; // setting classname
  toast.innerHTML = `
                    <div class="column">
                        <i class="fa-solid ${icon}"></i>
                        <span>${text}</span>
                    </div>
                    <i class="fa-solid fa-xmark" onClick="removeToast(this.parentElement)"></i>`;
  notification.appendChild(toast);

  setTimeout(() => {
    removeToast(toast);
  }, toastDetails.time);
}
