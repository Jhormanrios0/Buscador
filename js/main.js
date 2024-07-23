function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");
  const listaArticulos = document.querySelectorAll(".articulo");
  const noResults = document.getElementById("noResults");

  const searchHandler = debounce((e) => {
    const searchText = e.target.value.toLowerCase();
    let found = false;

    listaArticulos.forEach((artic) => {
      if (artic.textContent.toLowerCase().includes(searchText)) {
        artic.classList.remove("filtro");
        found = true;
      } else {
        artic.classList.add("filtro");
      }
    });

    noResults.classList.toggle("hidden", found);
  }, 300);

  buscador.addEventListener("keyup", (e) => {
    if (e.key === "Escape") e.target.value = "";
    searchHandler(e);
  });
});
