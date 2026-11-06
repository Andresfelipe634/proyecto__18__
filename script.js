const selectorLenguaje = document.getElementById("selector-lenguaje");
const contenedorEstado = document.getElementById("contenedor-estado");
selectorLenguaje.addEventListener("change", async (event) => {
    const lenguaje = event.target.value;
    contenedorEstado.innerHTML = "Cargando...";

    try {
        const url = `https://api.github.com/search/repositories?q=language:${lenguaje}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        const repositorios = datos.items;
        const indiceAleatorio = Math.floor(Math.random() * repositorios.length);
        const repositorioAleatorio = repositorios[indiceAleatorio];
      contenedorEstado.innerHTML = `
      <div class = "repo-card">
        <h3>${repositorioAleatorio.name}</h3>
        <p>${repositorioAleatorio.description}</p>
        <div class ="stats">
        <span>⭐ ${repositorioAleatorio.stargazers_count}</span>
        <span>🍴 ${repositorioAleatorio.forks_count}</span>
        <span>🚨 ${repositorioAleatorio.open_issues_count}</span>
        
        </div>

        <button onclick = "location.reload()">Buscar otro repositorio</button>
      </div>
      `;
    
    }catch (error) {
        console.error("Error al obtener los datos:", error);
        contenedorEstado.innerHTML = "Error al cargar los datos.";
    }
   

    
});
