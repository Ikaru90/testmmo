export function addedLoginForm(onLogin) {
  const layout = document.createElement("div");
  layout.setAttribute("id", "layout");
  layout.className = "login-layout";

  const form = document.createElement("form");
  form.className = "login-form";
  form.onsubmit = () => onLogin();

  const loginSpan = document.createElement("label");
  loginSpan.setAttribute("for", "login");
  loginSpan.appendChild(document.createTextNode("Login: "));

  const login = document.createElement("input");
  login.setAttribute("id", "login");
  login.setAttribute("name", "login");
  login.type = "text";
  login.className = "login-field";

  const br = document.createElement("br");

  const passwordSpan = document.createElement("label");
  passwordSpan.setAttribute("for", "password");
  passwordSpan.appendChild(document.createTextNode("Password: "));

  const password = document.createElement("input");
  password.setAttribute("id", "password");
  password.setAttribute("name", "password");
  password.type = "password";
  password.className = "login-field";

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.className = "center";

  form.appendChild(loginSpan);
  form.appendChild(login);
  form.appendChild(br);
  form.appendChild(passwordSpan);
  form.appendChild(password);
  form.appendChild(submit);
  layout.appendChild(form);
  document.body.appendChild(layout);
}
