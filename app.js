// Lista de amigos (máximo 10)
const amigos = [];

// -------- Utilidades --------
function esNombreValido(nombre) {
  const limpio = (nombre ?? "").trim();
  if (limpio === "") return false;          // vacío
  if (/^\d+$/.test(limpio)) return false;   // solo números
  return true;
}

// Normaliza para comparar (ignora mayúsculas, espacios y sufijo "2p")
function normaliza(nombre) {
  return (nombre ?? "").trim().toLowerCase().replace(/2p$/i, "");
}

// -------- UI --------
function renderListaAmigos() {
  const ul = document.getElementById("listaAmigos");
  ul.innerHTML = "";
  amigos.forEach((amigo, idx) => {
    const li = document.createElement("li");
    li.textContent = `${idx + 1}. ${amigo}`;
    ul.appendChild(li);
  });
}

function limpiarResultado() {
  document.getElementById("resultado").innerHTML = "";
}

// -------- Acciones --------
function agregarAmigo() {
  const input = document.getElementById("amigo");
  let nombre = input.value;

  // Validación de nombre
  if (!esNombreValido(nombre)) {
    alert("Ingresa un nombre válido (no vacío ni numérico).");
    input.focus();
    input.select();
    return;
  }

  // Límite de 10
  if (amigos.length >= 10) {
    alert("La lista está llena (máximo 10 participantes).");
    input.focus();
    input.select();
    return;
  }

  // Duplicados -> concatenar "2p"
  const yaExiste = amigos.some(a => normaliza(a) === normaliza(nombre));
  if (yaExiste) {
    nombre = nombre.trim() + "2p";
  }

  amigos.push(nombre.trim());
  input.value = "";
  input.focus();

  renderListaAmigos();
  limpiarResultado();
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Primero agrega al menos un nombre.");
    return;
  }

  const indice = Math.floor(Math.random() * amigos.length);
  const elegido = amigos[indice];

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  const li = document.createElement("li");
  li.textContent = `El amigo secreto es: ${elegido}`;
  resultado.appendChild(li);
}
