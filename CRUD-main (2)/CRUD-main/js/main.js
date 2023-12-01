// Inicializa o recupera los productos del localStorage
let products = JSON.parse(localStorage.getItem('drugstoreProducts')) || [];

function calcularTotal() {
    // Obtener los valores de los inputs
    var precio = parseFloat(document.getElementById('price').value) || 0;
    var cantidad = parseFloat(document.getElementById('Cantidad').value) || 0;

    // Calcular el total
    var Total = precio * cantidad;

    // Actualizar el valor en el inputTotal
    document.getElementById('Total').value = Total.toFixed(2);
}

// Función para renderizar los productos en la tabla
function renderProducts() {
    const table = document.getElementById('productTable');
    table.innerHTML = `
        <tr>
            <th>Nombre del Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Código de Barras</th>
            <th>Tipo</th>
            <th>Acciones</th>
        </tr>
    `;

    products.forEach((product, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.price}</td>
            <td>${product.Cantidad}</td>
            <td>${product.Total}</td>
            <td>${product.barcode}</td>
            <td>${product.productType}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
    });
}

// Función para agregar o actualizar un producto
function addOrUpdateProduct() {
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const Cantidad = document.getElementById('Cantidad').value;
    const Total = document.getElementById('Total').value;
    const barcode = document.getElementById('barcode').value;
    const productType = document.getElementById('productType').value;
    const productId = document.getElementById('productId').value;

    if (productName && price && barcode && productType) {
        if (productId !== '') {
            // Actualizar producto existente
            const index = parseInt(productId);
            products[index] = { productName, price, Cantidad, Total, barcode, productType };
        } else {
            // Agregar nuevo producto
            products.push({ productName, price, Cantidad, Total , barcode, productType });
        }

        localStorage.setItem('drugstoreProducts', JSON.stringify(products));
        renderProducts();

        // Limpiar los campos del formulario
        document.getElementById('productName').value = '';
        document.getElementById('price').value = '';
        document.getElementById('Cantidad').value = '';
        document.getElementById('Total').value = '';
        document.getElementById('barcode').value = '';
        document.getElementById('productType').value = '';
        document.getElementById('productId').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

// Función para editar un producto
function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.productName;
    document.getElementById('price').value = product.price;
    document.getElementById('Cantidad').value = product.Cantidad;
    document.getElementById('Total').value = product.Total;
    document.getElementById('barcode').value = product.barcode;
    document.getElementById('productType').value = product.productType;
    document.getElementById('productId').value = index;
}

// Función para eliminar un producto
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('drugstoreProducts', JSON.stringify(products));
    renderProducts();
}

// Llama a la función para mostrar los productos al cargar la página
window.onload = renderProducts;

function finalizarCompra() {
    let totalAPagar = 0;

    // Recorre los productos y suma sus totales
    products.forEach(product => {
        totalAPagar += parseFloat(product.Total);
    });

    // Crear el contenido del modal
    const modalContent = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Compra Exitosa</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Total a Pagar: $${totalAPagar.toFixed(2)}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    `;

    // Crear un elemento modal con el contenido y mostrarlo
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'fade');
    modalContainer.innerHTML = modalContent;

    document.body.appendChild(modalContainer);

    // Mostrar el modal
    $(modalContainer).modal('show');

    // Limpiar el contenido de la tabla al cerrarse el modal
    $(modalContainer).on('hidden.bs.modal', function (e) {
        const table = document.getElementById('productTable');
        const rowCount = table.rows.length;
        
        // Eliminar las filas de la tabla, comenzando desde la segunda fila hasta la última
        for (let i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }

        products = []; // Limpiar el arreglo de productos
        localStorage.removeItem('drugstoreProducts'); // Limpiar el almacenamiento local
    });
}


function showProductName() {
    const barcode = document.getElementById('barcode').value;
    const productNameInput = document.getElementById('productName');

    if (barcode === 'other') {
        productNameInput.value = '';
    } else {
        const barcodeNumber = parseInt(barcode);
        if (!isNaN(barcodeNumber) && barcodeNumber >= 1 && barcodeNumber <= 10) {
            switch (barcodeNumber) {
                case 1:
                    productNameInput.value = 'Pepsi';
                    break;
                case 2:
                    productNameInput.value = 'CocaCola';
                    break;
                case 3:
                    productNameInput.value = 'Manaos';
                    break;
                case 4:
                    productNameInput.value = 'Fanta';
                    break;
                case 5:
                    productNameInput.value = 'Pan';
                    break;
                case 6:
                    productNameInput.value = 'Harina';
                    break;
                case 7:
                    productNameInput.value = 'Arroz';
                    break;
                case 8:
                    productNameInput.value = 'Tomate';
                    break;
                case 9:
                    productNameInput.value = 'Leche';
                    break;
                case 10:
                    productNameInput.value = 'Queso';
                    break;
                default:
                    productNameInput.value = '';
                    break;
            }
        } else {
            productNameInput.value = '';
        }
    }
}

