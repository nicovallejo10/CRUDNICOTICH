const $submit = document.getElementById("submit"),
  $password = document.getElementById("password"),
  $username = document.getElementById("username"),
  $visible = document.getElementById("visible");

document.addEventListener("change", (e) => {
  if (e.target === $visible) {
    if ($visible.checked === false) $password.type = "password";
    else $password.type = "text";
  }
});

document.addEventListener("click", (e) => {
  if (e.target === $submit) {
    e.preventDefault();
    const usernameValue = $username.value;
    const passwordValue = $password.value;


    if (usernameValue === "nico" && passwordValue === "123") {
      alert(" Esta pagina dice : Ingresaste correctamente");
      window.location.href = "index.html";
    } else if (usernameValue === "nicotich" && passwordValue === "123") {

      alert(" Esta pagina dice : Ingresaste correctamente");
      window.location.href = "index2.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
  }
});

