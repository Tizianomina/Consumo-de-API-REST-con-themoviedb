let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=e9042e5e29d7e9f52a46a6defc067d82&lenguage=es-ARG&page=${pagina}`
    );

    /* console.log(respuesta); */

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      /* console.log(datos) */
      let peliculas = ``;

      datos.results.forEach((pelicula) => {
        peliculas += `
        <div class="pelicula">
            <img class = "poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}
            ">
            <h3 class="titulo">${pelicula.title}</h3>
        </div>    
        
        `;
      });

      document.getElementById("contenedor").innerHTML = peliculas;

      console.log("todo bien! " + respuesta.status);
    } else if (respuesta.status === 404) {
      console.log("La Película no Existe " + respuesta.status);
    } else if (respuesta.status === 401) {
      console.log("Error en la API-KEY " + respuesta.status);
    } else {
      console.log("Hubo un Error inesperado... " + respuesta.status);
    }
  } catch (e) {
    console.log(e);
  }
};



cargarPeliculas();
