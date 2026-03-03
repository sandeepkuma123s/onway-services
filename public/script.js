document.getElementById("signupForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const name = document.querySelector("input[placeholder='Full Name']").value;
  const email = document.querySelector("input[placeholder='Email Address']").value;
  const phone = document.querySelector("input[placeholder='Mobile Number']").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, password })
  });

  if(res.ok){
    window.location.href = "success.html";
  }
});