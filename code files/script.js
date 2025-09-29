document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regform");
  const cardsContainer = document.getElementById("cards-container");
  const summaryTableBody = document.querySelector("#summary-table tbody");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("err-email");

  // Simple email validation
  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    emailError.textContent = ""; // clear old error

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = emailInput.value.trim();
    const prog = document.getElementById("prog").value.trim();

    const interests = Array.from(
      document.querySelectorAll("input[name='interests[]']")
    )
      .map((i) => i.value.trim())
      .filter((val) => val !== "");

    const photoInput = document.getElementById("photo");
    const year = form.querySelector("input[name='year']:checked");

    // Validation
    if (!validateEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
      emailInput.focus();
      return;
    }
    if (!year) {
      alert("Please select your Year of Study.");
      return;
    }

    // Create card
    const card = document.createElement("div");
    card.classList.add("profile-card");
    card.style.border = "1px solid #f1c40f";
    card.style.padding = "15px";
    card.style.marginBottom = "15px";
    card.style.borderRadius = "10px";
    card.style.color = "#f1c40f";

    const cardContent = `
      <h3>${fname} ${lname}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Programme:</strong> ${prog}</p>
      <p><strong>Interests:</strong> ${interests.join(", ") || "None"}</p>
      <p><strong>Year of Study:</strong> ${year.value}</p>
    `;
    card.innerHTML = cardContent;

    // If photo uploaded, show preview
    if (photoInput.files && photoInput.files[0]) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(photoInput.files[0]);
      img.alt = "Profile Photo";
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "50%";
      img.style.display = "block";
      img.style.marginTop = "10px";
      card.appendChild(img);
    }

    cardsContainer.appendChild(card);

    // Add row to summary table
    const row = summaryTableBody.insertRow();
    row.innerHTML = `
      <td>${fname}</td>
      <td>${lname}</td>
      <td>${email}</td>
      <td>${prog}</td>
      <td>${interests.join(", ")}</td>
      <td>${photoInput.files[0] ? photoInput.files[0].name : "None"}</td>
      <td>${year.value}</td>
    `;

    form.reset(); // clear form
  });

  form.addEventListener("reset", () => {
    emailError.textContent = "";
  });
});
