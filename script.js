// Navegação Mobile
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-menu a").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Header transparente/sólido baseado no scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 10, 10, 0.98)"
  } else {
    header.style.background = "rgba(10, 10, 10, 0.95)"
  }
})

// Formulário de Agendamento
const agendamentoForm = document.getElementById("agendamentoForm")

agendamentoForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Coletar dados do formulário
  const nome = document.getElementById("nome").value
  const telefone = document.getElementById("telefone").value
  const servico = document.getElementById("servico").value
  const data = document.getElementById("data").value
  const horario = document.getElementById("horario").value

  // Validar campos obrigatórios
  if (!nome || !telefone || !servico || !data || !horario) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  // Validar data (não pode ser no passado)
  const dataEscolhida = new Date(data)
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  if (dataEscolhida < hoje) {
    alert("Por favor, escolha uma data futura.")
    return
  }

  // Formatar data para exibição
  const dataFormatada = new Date(data).toLocaleDateString("pt-BR")

  // Criar mensagem para WhatsApp
  const mensagem = `Olá! Gostaria de agendar um horário na Barbearia Imperial.

*Dados do agendamento:*
Nome: ${nome}
Telefone: ${telefone}
Serviço: ${servico}
Data: ${dataFormatada}
Horário: ${horario}

Aguardo confirmação. Obrigado!`

  // Codificar mensagem para URL
  const mensagemCodificada = encodeURIComponent(mensagem)

  // Número do WhatsApp da barbearia
  const numeroWhatsApp = "5585984209226"

  // Criar URL do WhatsApp
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`

  // Abrir WhatsApp em nova aba
  window.open(urlWhatsApp, "_blank")

  // Limpar formulário
  agendamentoForm.reset()

  // Mostrar mensagem de sucesso
  alert("Redirecionando para o WhatsApp! Aguarde a confirmação do seu agendamento.")
})

// Animações ao scroll (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Aplicar animação aos elementos
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".galeria-item, .valor, .info-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Máscara para telefone
document.getElementById("telefone").addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "")

  if (value.length >= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  } else if (value.length >= 7) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
  } else if (value.length >= 3) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
  } else if (value.length >= 1) {
    value = value.replace(/(\d{0,2})/, "($1")
  }

  e.target.value = value
})

// Definir data mínima como hoje
document.addEventListener("DOMContentLoaded", () => {
  const dataInput = document.getElementById("data")
  const hoje = new Date()
  const dataMinima = hoje.toISOString().split("T")[0]
  dataInput.setAttribute("min", dataMinima)
})

// Efeito parallax suave no hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Contador de caracteres para campos (se necessário)
function adicionarContador(inputId, maxLength) {
  const input = document.getElementById(inputId)
  if (input) {
    input.setAttribute("maxlength", maxLength)

    const contador = document.createElement("small")
    contador.style.color = "#666"
    contador.style.fontSize = "0.8rem"
    contador.textContent = `0/${maxLength}`

    input.parentNode.appendChild(contador)

    input.addEventListener("input", function () {
      contador.textContent = `${this.value.length}/${maxLength}`
    })
  }
}

// Aplicar contador ao campo nome (opcional)
// adicionarContador('nome', 50);

console.log("Barbearia Imperial - Site carregado com sucesso! 💈")
