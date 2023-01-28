async function login(e) {
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  fetch("/auth/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        window.location.reload();
        return;
      }
      const token = data.token;
      localStorage.setItem("token", token);

      console.log(token, data);
    });

  console.log("helooooooooooooooooooooo", email, password);
  console.log("helooooooooooooooooooooo");
}
