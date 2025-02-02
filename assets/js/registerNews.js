document
  .getElementById("form-register-news")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Formulario enviado");

    const TITULO_NOT = document.getElementById("name").value;
    const TEXTO_NOT = document.getElementById("autor").value;
    const CATEGORIA_NOT = document.getElementById("categoryNEWS").value;
    const ETIQUETA_NOT = document.getElementById("labelNEWS").value;
    const FECHA_PUBLICAR_NOT = document.getElementById("isbn").value;

    if (
      !TITULO_NOT ||
      !TEXTO_NOT ||
      !CATEGORIA_NOT ||
      !FECHA_PUBLICAR_NOT ||
      !ETIQUETA_NOT
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch("/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TITULO_NOT,
          TEXTO_NOT,
          CATEGORIA_NOT,
          ETIQUETA_NOT,
          FECHA_PUBLICAR_NOT,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Producto registrado exitosamente.");
        document.getElementById("form-register-news").reset();
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.message || "Error al registrar producto.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Ocurrió un error al procesar el registro del producto.");
    }
  });

const loadCategoriesNEWS = async () => {
  try {
    const response = await fetch("/categoriesNEWS");
    if (response.ok) {
      const categoriesNEWS = await response.json();
      const categorySelect = document.getElementById("categoryNEWS");

      categorySelect.innerHTML =
        '<option value="" disabled selected hidden>Categoría</option>';

      categoriesNEWS.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.ID_CAT;
        option.textContent = category.NOMBRE_CAT;
        categorySelect.appendChild(option);
      });

      categorySelect.innerHTML =
        '<option value="" disabled selected hidden>Categoría</option>';
    } else {
      console.error("Error al cargar las categorías:", await response.text());
    }
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
};

document.addEventListener("DOMContentLoaded", loadCategoriesNEWS);

const loadSubcategoriesNEWS = async (categoryId) => {
  try {
    const response = await fetch(`/subcategoriesNEWS/${categoryId}`);
    if (response.ok) {
      const subcategories = await response.json();
      const subcategorySelect = document.getElementById("subcategoryNEWS");
      subcategorySelect.innerHTML =
        '<option value="" disabled selected hidden>Subcategoría</option>';

      subcategories.forEach((subcategory) => {
        const option = document.createElement("option");
        option.value = subcategory.ID_ETQ;
        option.textContent = subcategory.NOMBRE_ETQ;
        subcategorySelect.appendChild(option);
      });
    } else {
      console.error("Error al cargar subcategorías.");
    }
  } catch (error) {
    console.error("Error al cargar subcategorías:", error);
  }
};

document.getElementById("categoryNEWS").addEventListener("change", (e) => {
  const categoryId = e.target.value;
  loadSubcategoriesNEWS(categoryId);
});

document
  .getElementById("form-edit-news")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const ID_NOT = document.getElementById("edit-id").value.trim();
    const TITULO_NOT = document.getElementById("edit-title").value.trim();
    const TEXTO_NOT = document.getElementById("edit-text").value.trim();
    const FECHA_PUBLICAR_NOT = document
      .getElementById("edit-date")
      .value.trim();
    const CATEGORIA_NOT = document
      .getElementById("edit-categoryNEWS")
      .value.trim();
    const ETIQUETA_NOT = document.getElementById("edit-labelNEWS").value.trim();
    const ACTIVO_NOT = document.getElementById("modal-active").value.trim();

    try {
      const response = await fetch(`/news/${ID_NOT}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TITULO_NOT,
          TEXTO_NOT,
          FECHA_PUBLICAR_NOT,
          CATEGORIA_NOT,
          ETIQUETA_NOT,
          ACTIVO_NOT,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Noticia editada exitosamente.");
        location.reload();
      } else {
        const error = await response.json();
        console.error("Error del servidor:", error);
        alert(error.message || "Error al editar noticia.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      alert("Ocurrió un error inesperado.");
    }
  });

function updateCheckboxState() {
  const checkbox = document.getElementById("cb5");
  const hiddenInput = document.getElementById("modal-active");
  hiddenInput.value = checkbox.checked ? 1 : 0;
}
