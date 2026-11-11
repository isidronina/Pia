// Chave usada para salvar os dados na memória do navegador (LocalStorage)
const STORAGE = { session: 'usuario_sessao' };

// Função que serve para salvar os dados da sessão do usuário
function writeStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

// Função que serve para exibir ou esconder mensagens de erro na tela
function showFeedback(selector, message) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.textContent = message;
  el.hidden = !message;
}

// Função que redireciona o usuário para a próxima página após o login
function go(route) {
  window.location.href = route;
}

// Isso faz com que o botão "Mostrar / Ocultar" alterne o tipo do input de senha
document.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('[data-action="toggle-login-password"]');
  if (toggleBtn) {
    const passwordInput = document.getElementById('senha');
    if (passwordInput) {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Ocultar';
      } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Mostrar';
      }
    }
  }
});

// Isso modifica o comportamento ao enviar o formulário de login
const formLogin = document.getElementById('login-form');
if (formLogin) {
  formLogin.addEventListener('submit', (e) => {
    // Evita que a página recarregue sozinha ao enviar o formulário
    e.preventDefault();
    
    const data = new FormData(formLogin);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("senha") || "");
    
    const emailError = formLogin.querySelector('[data-error="email"]');
    const passwordError = formLogin.querySelector('[data-error="senha"]');
    
    // Limpa os erros anteriores antes de validar de novo
    emailError.hidden = true;
    passwordError.hidden = true;
    showFeedback('[data-error="form"]', "");

    let valid = true;
    
    // Valida se o e-mail digitado confere com o e-mail de acesso permitido
    if (email !== "console.log220@gmail.com") {
      emailError.textContent = "E-mail não cadastrado (Use: console.log220@gmail.com)";
      emailError.hidden = false;
      valid = false;
    }
    
    // Valida se a senha digitada confere com a senha permitida
    if (password !== "adm26pt@") {
      passwordError.textContent = "Senha incorreta (Use: adm26pt@)";
      passwordError.hidden = false;
      valid = false;
    }

    // Se houver algum erro, interrompe o processo aqui
    if (!valid) return;

    // Salva os dados do admin no navegador e redireciona para o dashboard
    const userData = { nome: "Administrador", email, logadoEm: new Date().toISOString() };
    if (!writeStorage(STORAGE.session, userData)) {
      showFeedback('[data-error="form"]', "Erro ao salvar a sessão no navegador.");
      return;
    }

    // Abre a próxima página
    go("dashboard.html");
  });
}
