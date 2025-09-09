import { scroll } from "./scroll.js";
import { toggleMenu } from "./toggleMenu.js";
import { supabase } from "../js/supabase.js";
scroll();

window.toggleMenu = toggleMenu;

function habilitarFuncion() {
  const comentarBoton = document.getElementById("boton-comentar");
  const comentario = document.getElementById("comment");
  if (comentario) {
    comentario.addEventListener("input", () => {
      if (comentario.value.trim().length > 0) {
        comentarBoton.classList.remove("opacity-30");
        comentarBoton.classList.remove("pointer-events-none");
      } else {
        comentarBoton.classList.add("opacity-30");
        comentarBoton.classList.add("pointer-events-none");
      }
    });
    comentarBoton.addEventListener("click", (e) => {
      mostrarComentario();
      e.preventDefault();
    });
  }
}

supabase.auth.onAuthStateChange((event, session) => {
  const sectionComment = document.getElementById("comentarios-seccion");
  if (session?.user) {
    sectionComment.innerHTML = `<div class="border border-gray-300/30 rounded-2xl bg-gradient-to-r from-fuchsia-600/20 to-pink-500/20 p-7 max-sm:p-4 w-full gap-4 flex flex-col hover:brightness-115">
                    <h4 class="text-xl font-semibold flex gap-2">
                        <svg
                            class="text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"/>
                        </svg>
                        Comparte tu Opinión
                    </h4>
                    <form class="flex flex-col gap-1.5">
                        <label class="text-slate-200/90" for="comment">Comentario</label>
                        <textarea
                            maxlength="200"
                            placeholder="Comparte tu opinión sobre este ensayo..."
                            class="overflow-y-auto no-scrollbar resize-none w-full max-h-40 border p-4 border-gray-200/30 rounded-2xl bg-white/5 flex 
                            focus:outline-white focus:outline-1"
                            id="comment"
                            rows="3"
                        ></textarea>
                        <button id="boton-comentar" class="font-semibold mt-4 flex gap-2 items-center justify-center  bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-300 group active:scale-110 active:shadow-lg active:shadow-pink-600 sombra-low w-max ml-auto opacity-30 pointer-events-none">Comentar</button>
                    </form>
                </div>`;
    habilitarFuncion();
  } else {
    sectionComment.innerHTML = `<div class="border border-gray-300/30 p-4 py-8 rounded-2xl bg-purple-950/20 hover:bg-purple-900/40 hover:translate-y-[-10px] transition-all duration-300 ease-in-out flex flex-col items-center gap-5 max-sm:gap-3">
                    <div class="rounded-full bg-gradient-to-br from-purple-700 to-cyan-700 w-20 h-20  text-fuchsia-600 flex justify-center items-center max-sm:w-15 max-sm:h-15 ">
                        <svg
                            class="w-2/3 h-2/3"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-login-2"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"/>
                            <path d="M3 12h13l-3 -3"/>
                            <path d="M13 15l3 -3"/>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-semibold text-center">Unete a la Conversación</h3>
                    <p class="text-slate-300/70 text-center">Inicia sesión para compartir tus reflexiones y participar en las discusiones académicas.</p>
                    <button id="iniciar-2" class="flex gap-2 items-center justify-center  bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-300 group active:scale-110 active:shadow-lg active:shadow-pink-600 sombra-low font-semibold">Iniciar Sesión</button>
                </div>`;
    sesionIniciar();
  }
});
function sesionIniciar() {
  const iniciarButton2 = document.getElementById("iniciar-2");

  iniciarButton2.addEventListener("click", async (e) => {
    e.preventDefault();
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.href,
      },
    });
  });
}
async function obtenerUsuario() {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    return {
      nombre: await data.user.user_metadata.full_name,
      foto: await data.user.user_metadata.avatar_url,
    };
  }
}

async function cargarComentarios() {
  const comentarios = document.getElementById("comentarios");
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    comentarios.innerText = "Error cargando comentarios";
    return;
  }
  
  data.forEach((comentarioCargado)=>{
    const comentarioContenedor = document.createElement("div");
    comentarioContenedor.innerHTML = `
    <div class="flex gap-2 border-b h-10 items-center pb-2 border-gray-300/30 ">
      <img class="rounded-full" src="${comentarioCargado.avatar_url}" height="30px" width="30px" alt="">
      <p class="font-semibold text-xl max-sm:text-sm  overflow-hidden text-ellipsis text-nowrap">${comentarioCargado.nickname}</p>
    </div>
    <div>
      <p class="text-slate-200">${comentarioCargado.content}</p>
    </div>`;
  comentarioContenedor.className =
    "text-white border border-gray-300/30 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-fuchsia-600/30 p-8 max-sm:p-4 w-full gap-6 flex flex-col";

  comentarios.insertAdjacentElement("beforeend", comentarioContenedor);
  
  })

}
async function mostrarComentario() {
  const comentario = document.getElementById("comment");
  const comentarios = document.getElementById("comentarios");
  const { nombre, foto } = await obtenerUsuario();

  const { error } = await supabase.from("comments").insert([
    {
      nickname: nombre,
      content: comentario.value,
      avatar_url: foto,
    },
  ]);

  if (error) {
    alert("Ocurrió un error al guardar el comentario");
    return;
  }

  const comentarioContenedor = document.createElement("div");
  comentarioContenedor.innerHTML = `
    <div class="flex gap-2 border-b h-10 items-end pb-2 border-gray-300/30 ">
      <img class="rounded-full" src="${foto}" height="30px" width="30px" alt="">
      <p class="font-semibold text-xl max-sm:text-sm">${nombre}</p>
    </div>
    <div>
      <p class="text-slate-200">${comentario.value}</p>
    </div>`;
  comentarioContenedor.className =
    "text-white border border-gray-300/30 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-fuchsia-600/30 p-8 max-sm:p-4 w-full gap-6 flex flex-col";

  comentarios.insertAdjacentElement("beforeend", comentarioContenedor);
  comentario.value = "";
}
cargarComentarios()