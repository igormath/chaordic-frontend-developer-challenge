const mainContainer = document.querySelector(".main__container");
const mainBtn = document.querySelector(".main__btn");
const mainLoading = document.querySelector(".main__loading");

let currentPage = 0;

(async () => {

    mainBtn.addEventListener("click", getProducts);

    async function getProducts() {
        const nextPage = currentPage + 1;

        fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${nextPage}`, { credentials: "omit" })
            .then(res => res.json())
            .then(data => {
                mainContainer.insertAdjacentHTML("beforeend", data.products.map(product =>
                    `<div class="main__product">
                    <img src="${product.image}">
                    <ul>
                        <li>
                            <h4 class="main__product__name">${product.name}</h4>
                        </li>
                        <li>
                            <p class="main__product__description">${product.description}</p>
                        </li>
                        <li>
                        <p class="main__product__old-price">De: R$${product.oldPrice}</p>
                        </li>
                        <li>
                        <p class="main__product__price"><span>Por: R$${product.price}</span></p>
                        </li>
                        <li>
                            <p class="main__product__installment">ou ${product.installments.count}x de R$${product.installments.value}</p>
                            </li>
                            <li>
                            <button class="main__product__btn">Comprar</button>
                            </li>
                            </ul>
                            </div>`))
                mainLoading.style.display = "none";
                currentPage = nextPage;
            })
            .catch(err => console.log(err));
    };
    getProducts()
})()
