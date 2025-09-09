import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rdyqxvlrwpgcrxqsgcjf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkeXF4dmxyd3BnY3J4cXNnY2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTY3NDgsImV4cCI6MjA3MjY5Mjc0OH0.wIIMhMvDxFhOezbcnOhwKpXyIj_Byc8CnEPSlR1OK4M";
export const supabase = createClient(supabaseUrl, supabaseKey);

const iniciarButton = document.getElementById("iniciar");

iniciarButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.href,
    },
  });
  
});

async function mostrarUsuario(usuario) {
  const contenedor = document.getElementById("contenedor");
  if (!usuario) {
    const iniciar = document.getElementById("iniciar");

    iniciar.classList.replace("hidden", "flex");
   
  } else {
    const contenedorPerfil = document.getElementById("contenedor-perfil");
    const nombre = document.getElementById("nombre-perfil");
    const imagen = document.getElementById("imagen-perfil");

    const nombreGoogle = usuario.full_name;
    const urlGoogle = usuario.avatar_url;

    nombre.innerHTML = nombreGoogle;
    imagen.setAttribute("src", `${urlGoogle}`);
    if (contenedor.classList.contains("w-[5rem]")) {
      contenedor.classList.add("w-[5rem]");
    }

    contenedorPerfil.classList.replace("hidden", "flex");
  }
}
console.log(document.title)

supabase.auth.onAuthStateChange((event, session) => {
  mostrarUsuario(session?.user.user_metadata);
  if(event === "SIGNED_IN"){
    const url = new URL(window.location)
    url.hash = "";
    url.search = ""

    window.history.replaceState({}, document.title, url.pathname)

  }
  
});

const cerrar = document.getElementById("cerrar");
cerrar.addEventListener("click", async () => {
  await supabase.auth.signOut();
  contenedorPerfil.classList.replace("flex", "hidden");
  contenedorCerrar.classList.replace("flex", "hidden");
});

const contenedorPerfil = document.getElementById("contenedor-perfil");
const contenedorCerrar = document.querySelector(".contenedor-cerrar");

contenedorPerfil.addEventListener("click", (e) => {
  e.stopPropagation();
  if (contenedorCerrar.classList.contains("hidden")) {
    contenedorCerrar.classList.replace("hidden", "flex");
    setTimeout(() => {
      contenedorCerrar.classList.add("contenedor-abierto");
    }, 5);
  } else {
    contenedorCerrar.classList.remove("contenedor-abierto");
    setTimeout(() => {
      contenedorCerrar.classList.replace("flex", "hidden");
    }, 550);
  }
});

document.addEventListener("click", (e) => {
  if (!contenedorCerrar.contains(e.target)) {
    contenedorCerrar.classList.replace("flex", "hidden");
    
  }
});

