import React from "react";
import "../../styles/footer.css";

const Footer = () => {
    return (
        <footer class="">
            {/* document.addEventListener("DOMContentLoaded", function() {
                    // Obtenemos el elemento donde mostraremos el contador
                    const contadorElement = document.getElementById("contador");

                    // Obtenemos el contador actual almacenado en localStorage o establecemos el valor inicial
                    let contador = localStorage.getItem("Watchers") || 2050;

                    // Mostramos el contador actual
                    contadorElement.textContent = "Watchers #" + contador;

                    // Incrementamos el contador y lo guardamos en localStorage cada vez que se recarga la página
                    contador++;
                    localStorage.setItem("Watchers", contador.toString());
            }); */}
        </footer>
    )
}

export default Footer