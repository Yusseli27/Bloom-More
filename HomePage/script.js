document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       CARRITO
    ===================================== */

    let cart = JSON.parse(
        localStorage.getItem("bloomCart")
    ) || [];


    const cartNumber =
        document.getElementById("cartNumber");

    const toast =
        document.getElementById("toast");


    function updateCart() {

        cartNumber.textContent = cart.length;

        localStorage.setItem(
            "bloomCart",
            JSON.stringify(cart)
        );

    }


    function showToast(text) {

        toast.textContent = text;

        toast.classList.add("show");

        setTimeout(function () {

            toast.classList.remove("show");

        }, 2200);

    }


    document
        .querySelectorAll(".add-cart")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const product = {

                    name: button.dataset.name,

                    price: Number(
                        button.dataset.price
                    )

                };


                cart.push(product);

                updateCart();


                showToast(
                    "♡ " +
                    product.name +
                    " fue agregado al carrito"
                );

            });

        });


    document
        .getElementById("cartButton")
        .addEventListener("click", function () {

            if (cart.length === 0) {

                showToast(
                    "Tu carrito está vacío 🌷"
                );

                return;

            }


            let total = 0;


            cart.forEach(function (item) {

                total += item.price;

            });


            showToast(
                "🛒 " +
                cart.length +
                " producto(s) · $" +
                total.toFixed(2)
            );

        });


    updateCart();



    /* =====================================
       FAVORITOS
    ===================================== */

    document
        .querySelectorAll(".like")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                button.classList.toggle("liked");


                if (
                    button.classList.contains("liked")
                ) {

                    button.textContent = "♥";

                } else {

                    button.textContent = "♡";

                }

            });

        });



    /* =====================================
       FILTROS
    ===================================== */

    const filters =
        document.querySelectorAll(".filter");

    const products =
        document.querySelectorAll(".product");


    filters.forEach(function (filterButton) {

        filterButton.addEventListener(
            "click",
            function () {


                filters.forEach(function (button) {

                    button.classList.remove("active");

                });


                filterButton.classList.add("active");


                const selected =
                    filterButton.dataset.filter;


                products.forEach(function (product) {

                    if (
                        selected === "all" ||
                        product.dataset.category === selected
                    ) {

                        product.style.display = "block";

                    } else {

                        product.style.display = "none";

                    }

                });

            }
        );

    });



    /* =====================================
       BUSCADOR
    ===================================== */

    const searchButton =
        document.getElementById("searchButton");

    const searchBox =
        document.getElementById("searchBox");

    const closeSearch =
        document.getElementById("closeSearch");

    const searchInput =
        document.getElementById("searchInput");


    searchButton.addEventListener(
        "click",
        function () {

            searchBox.classList.toggle("show");

            if (
                searchBox.classList.contains("show")
            ) {

                searchInput.focus();

            }

        }
    );


    closeSearch.addEventListener(
        "click",
        function () {

            searchBox.classList.remove("show");

            searchInput.value = "";

            products.forEach(function (product) {

                product.style.display = "block";

            });

        }
    );


    searchInput.addEventListener(
        "input",
        function () {

            const search =
                searchInput.value.toLowerCase();


            products.forEach(function (product) {

                const name =
                    product.dataset.name.toLowerCase();


                if (
                    name.includes(search)
                ) {

                    product.style.display = "block";

                } else {

                    product.style.display = "none";

                }

            });

        }
    );



    /* =====================================
       MODAL RAMO PERSONALIZADO
    ===================================== */

    const modal =
        document.getElementById("modal");

    const customButton =
        document.getElementById("customButton");

    const modalClose =
        document.getElementById("modalClose");

    const continueButton =
        document.getElementById("continueButton");


    let selectedStyle = "";


    customButton.addEventListener(
        "click",
        function () {

            modal.classList.add("show");

        }
    );


    modalClose.addEventListener(
        "click",
        function () {

            modal.classList.remove("show");

        }
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        }
    );



    /* ESTILOS DEL RAMO */

    document
        .querySelectorAll(".modal-options button")
        .forEach(function (option) {

            option.addEventListener(
                "click",
                function () {


                    document
                        .querySelectorAll(
                            ".modal-options button"
                        )
                        .forEach(function (button) {

                            button.classList.remove(
                                "selected"
                            );

                        });


                    option.classList.add(
                        "selected"
                    );


                    selectedStyle =
                        option.dataset.style;

                }
            );

        });



    continueButton.addEventListener(
        "click",
        function () {

            if (!selectedStyle) {

                showToast(
                    "Elige un estilo para continuar 🌸"
                );

                return;

            }


            modal.classList.remove("show");


            showToast(
                "✿ Ramo " +
                selectedStyle.toLowerCase() +
                " seleccionado"
            );

        }
    );



    /* =====================================
       NEWSLETTER
    ===================================== */

    const newsletter =
        document.getElementById(
            "newsletterForm"
        );

    newsletter.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const message =
                document.getElementById(
                    "message"
                );


            message.textContent =
                "♡ ¡Gracias! Te enviaremos nuestras novedades.";


            document.getElementById(
                "email"
            ).value = "";

        }
    );



    /* =====================================
       BOTÓN FAVORITOS
    ===================================== */

    document
        .getElementById("favoriteButton")
        .addEventListener(
            "click",
            function () {

                const favorites =
                    document.querySelectorAll(
                        ".like.liked"
                    ).length;


                if (favorites === 0) {

                    showToast(
                        "Todavía no tienes favoritos ♡"
                    );

                } else {

                    showToast(
                        "♡ Tienes " +
                        favorites +
                        " favorito(s)"
                    );

                }

            }
        );



    /* =====================================
       ESC PARA CERRAR MODAL
    ===================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                modal.classList.remove("show");

                searchBox.classList.remove(
                    "show"
                );

            }

        }
    );

});