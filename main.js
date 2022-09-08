let customerList = [
  { id: 1, firstName: "Leanne", lastName: "Graham", balance: 6000 },
  { id: 2, firstName: "Ervin", lastName: "Howell", balance: 7000 },
  { id: 3, firstName: "Clementine", lastName: "Bauch", balance: 8000 },
  { id: 4, firstName: "Patricia", lastName: "Lebsack", balance: 9000 },
];

let productList = [
  { id: 1, productName: "Chai", price: 120, stockAmount: 12 },
  { id: 2, productName: "Aniseed Syrup", price: 140, stockAmount: 13 },
  { id: 3, productName: "Mishi Kobe Niku", price: 160, stockAmount: 14 },
  { id: 4, productName: "Tofu", price: 180, stockAmount: 15 },
  { id: 5, productName: "Genen Shouyu", price: 200, stockAmount: 16 },
];

let bankStatementList = [
  {
    id: 1,
    customerId: 1,
    recipient: "Ervin Howell",
    amount: 200,
    date: "02.09.2022",
  },
  {
    id: 2,
    customerId: 1,
    recipient: "Clementine Bauch",
    amount: 400,
    date: "05.09.2022",
  },
  {
    id: 3,
    customerId: 2,
    recipient: "Ervin Howell",
    amount: 500,
    date: "02.09.2022",
  },
  {
    id: 4,
    customerId: 2,
    recipient: "Leanne Graham",
    amount: 200,
    date: "05.09.2022",
  },
];

displayCustomer();
displayProduct();
customerSelect();
productSelect();

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const balance = document.getElementById("balance");
const btnAddCustomer = document.getElementById("btnAddCustomer");
const btnAllRemoveCustomer = document.getElementById("btnAllRemoveCustomer");
const btnAllRemoveProduct = document.getElementById("btnAllRemoveProduct");
const customerHistory = document.getElementById("liveCustomerHistory");
const historyHeader = document.getElementById("historyHeader");
const btnClose = document.getElementById("btnClose");
const btnSend = document.getElementById("btnSend");
const amount = document.getElementById("amount");

/* müşteri ekleme fonksiyonu*/
btnAddCustomer.addEventListener("click", addCustomer);
function addCustomer() {
  if (firstName.value == "" || lastName.value == "" || balance.value == "") {
    alert("Fill out the form completely!");
  } else {
    customerList.push({
      id: customerList.length + 1,
      firstName: firstName.value,
      lastName: lastName.value,
      balance: balance.value,
    });
    alert("New customer added.");
    firstName.value = "";
    lastName.value = "";
    balance.value = null;
  }
  customerSelect();
  displayCustomer();
  event.preventDefault();
}

/* müşteri bilgilerini listeleme işlemi */
function displayCustomer() {
  let customerContainer = document.getElementById("customerContainer");
  customerContainer.innerHTML = "";
  if (customerList.length == 0) {
    customerContainer.innerHTML = `<tr><td colspan="5"><p class="text-center">Customer list is empty!</p></td></tr>`;
  } else {
    for (let customer of customerList) {
      let customerTr = `
        <tr class="customer-list-item" id="${customer.id}">
            <td>${customer.firstName} ${customer.lastName}</td>
            <td class="text-end">${customer.balance} $</td>
            <td class="border-0 text-center">
                <a href="" onclick="bankStatementSection(${customer.id})"><i title="Bank statement" class="fa-regular fa-file-lines"></i></a>
            </td>
            <td class="border-0 text-center">
                <a href="" onclick="customerProductListSection(${customer.id})"><i title="Customer product list" class="fa-solid fa-tag"></i></a>
            </td>
            <td class="border-0 text-center">
                <a href="" onclick="removeCustomer(${customer.id})"><i title="Delete customer" class="fa-regular fa-trash-can"></i></a>
            </td>
        </tr>`;
      customerContainer.insertAdjacentHTML("beforeend", customerTr);
    }
  }
}

/* müşteri silme fonksiyonu */
function removeCustomer(id) {
  let deletedId;
  for (let index in customerList) {
    if (customerList[index].id == id) {
      deletedId = index;
    }
    //console.log(index);
  }
  customerList.splice(deletedId, 1);
  customerSelect();
  displayCustomer();
  event.preventDefault();
  alert("Customer deleted.");
}

/* tüm müşterileri silme fonksiyonu */
btnAllRemoveCustomer.addEventListener("click", function () {
  customerList.splice(0, customerList.length);
  customerSelect();
  displayCustomer();
});

/* ürünleri listeleme işlemi */
function displayProduct() {
  let productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";
  if (productList.length == 0) {
    productContainer.innerHTML = `<p class="text-center mt-3">Product list is empty!</p>`;
  } else {
    for (let product of productList) {
      let productLi = `
      <li
                class="product-list-item list-group-item d-flex justify-content-between align-items-center" id="${product.id}"
              >
                <i onclick="removeProduct(${product.id})" title="Delete product" class="fa-regular fa-circle-xmark"></i>
                <div class="ms-2 me-auto">
                  <div class="fw-bold">${product.productName}</div>
                  <span class="small">Stock amount <strong>${product.stockAmount}</strong></span>
                </div>
                <span class="badge bg-success p-3">${product.price} $</span>
              <div class="p-2"><button class="btn btn-outline-danger ml-5">sell</button></div>
              </li>`;
      productContainer.insertAdjacentHTML("beforeend", productLi);
    }
  }
}

/* ürün ekleme fonksiyonu*/
btnAddProduct.addEventListener("click", addProduct);
function addProduct() {
  if (productName.value == "" || price.value == "" || stockAmount.value == "") {
    alert("Fill out the form completely!");
  } else {
    productList.push({
      id: productList.length + 1,
      productName: productName.value,
      price: price.value,
      stockAmount: stockAmount.value,
    });
    alert("New product added.");
    productName.value = "";
    price.value = "";
    stockAmount.value = null;
  }
  productSelect();
  displayProduct();
  event.preventDefault();
}

/* ürün silme fonksiyonu */
function removeProduct(id) {
  let deletedId;
  for (let index in productList) {
    if (productList[index].id == id) {
      deletedId = index;
    }
  }
  productList.splice(deletedId, 1);
  productSelect();
  displayProduct();
  event.preventDefault();
  alert("Product deleted.");
}

/* tüm ürünleri silme fonksiyonu */
btnAllRemoveProduct.addEventListener("click", function () {
  productList.splice(0, productList.length);
  productSelect();
  displayProduct();
});

/* select içine müşteri listeleme işlemi */
function customerSelect() {
  let customerSelectFrom = document.getElementById("customerSelectFrom");
  let customerSelectTo = document.getElementById("customerSelectTo");
  let sellerSelect = document.getElementById("sellerSelect");
  let customerSelect = document.getElementById("customerSelect");
  customerSelectFrom.innerHTML = "`<option selected>From...</option>`";
  customerSelectTo.innerHTML = "`<option selected>To...</option>`";
  sellerSelect.innerHTML = "`<option selected>Seller...</option>`";
  customerSelect.innerHTML = "`<option selected>Customer...</option>`";
  if (customerList.length == 0) {
    customerSelectFrom.innerHTML = `<option selected>From...</option>`;
    customerSelectTo.innerHTML = `<option selected>To...</option>`;
    sellerSelect.innerHTML = `<option selected>Seller...</option>`;
    customerSelect.innerHTML = `<option selected>Customer...</option>`;
  } else {
    for (let customer of customerList) {
      let customerOption = `
                      <option value="${customer.id}">${customer.firstName} ${customer.lastName}</option>`;
      customerSelectFrom.insertAdjacentHTML("beforeend", customerOption);
      customerSelectTo.insertAdjacentHTML("beforeend", customerOption);
      sellerSelect.insertAdjacentHTML("beforeend", customerOption);
      customerSelect.insertAdjacentHTML("beforeend", customerOption);
    }
  }
}

/* select içine ürünleri listeleme işlemi */
function productSelect() {
  let productSelect = document.getElementById("productSelect");
  productSelect.innerHTML = "`<option selected>Product...</option>`";
  if (productList.length == 0) {
    productSelect.innerHTML = `<option selected>Product...</option>`;
  } else {
    for (let product of productList) {
      let productOption = `
                      <option value="${product.id}">${product.productName}</option>`;
      productSelect.insertAdjacentHTML("beforeend", productOption);
    }
  }
}

// customer listten seçtiğimiz kişinin hesap geçmişini görüntülemek istediğimiz zaman
function bankStatementSection(id) {
  console.log(id);
  customerHistory.innerHTML = "";
  historyHeader.innerHTML = "Bank Statement<br/>&nbsp";
  let bankStatementList = `
        <li class="list-group-item">bank statement ${id}</li>`;
  customerHistory.insertAdjacentHTML("beforeend", bankStatementList);
  event.preventDefault();
}

// customer listten seçtiğimiz kişinin ürünlerini görüntülemek istediğimiz zaman
function customerProductListSection(id) {
  console.log(id);
  customerHistory.innerHTML = "";
  historyHeader.innerHTML = "Customer Product List<br/>&nbsp";
  let customerProductList = `
    <li class="list-group-item">product ${id}</li>`;
  customerHistory.insertAdjacentHTML("beforeend", customerProductList);
  event.preventDefault();
}

// hesap geçmişi ya da müşteri ürünleri listesini kapatmak için buton
btnClose.addEventListener("click", function () {
  customerHistory.innerHTML = "";
  customerHistory.innerHTML = "";
  historyHeader.innerHTML = `<small>Click to view customer information</small>`;
});

// müşteriler arası para transferi
btnSend.addEventListener("click", sendMoney);
function sendMoney() {
  if (
    customerSelectFrom.value == "" ||
    customerSelectTo.value == "" ||
    amount.value == ""
  ) {
    alert("Fill out the form completely!");
  } else {
    let sender = customerList.filter((x) => x.id == customerSelectFrom.value);
    let recipient = customerList.filter((x) => x.id == customerSelectTo.value);
    if (sender.length > 0 && recipient.length > 0) {
      if (sender[0].id !== recipient[0].id) {
        if (sender[0].balance > amount.value) {
          sender[0].balance =
            parseFloat(sender[0].balance) - parseFloat(amount.value);
          recipient[0].balance =
            parseFloat(recipient[0].balance) + parseFloat(amount.value);
          alert("Money transfer done.");
        } else {
          alert("Insufficient balance.");
        }
      } else {
        alert("Sender and receiver cannot be the same person.");
      }
    } else {
      alert("Send money failed.");
    }

    customerSelectFrom.value = "From...";
    customerSelectTo.value = "To...";
    amount.value = null;
    console.log(customerList);
  }
  displayCustomer();
  event.preventDefault();
}
