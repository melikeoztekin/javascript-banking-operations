let selectedCustomerId = 0;
let customerList = [
  {
    id: 1,
    firstName: "Leanne",
    lastName: "Graham",
    balance: 6000,
  },
  {
    id: 2,
    firstName: "Ervin",
    lastName: "Howell",
    balance: 100,
  },
  {
    id: 3,
    firstName: "Clementine",
    lastName: "Bauch",
    balance: 8000,
  },
  {
    id: 4,
    firstName: "Patricia",
    lastName: "Lebsack",
    balance: 9000,
  },
];

let productList = [
  { id: 1, productName: "Chai", price: 120, stockAmount: 12 },
  { id: 2, productName: "Aniseed Syrup", price: 140, stockAmount: 13 },
  { id: 3, productName: "Mishi Kobe Niku", price: 160, stockAmount: 14 },
  { id: 4, productName: "Tofu", price: 180, stockAmount: 15 },
  { id: 5, productName: "Genen Shouyu", price: 200, stockAmount: 16 },
];

let productPurchaseToBankStatementList = [];

let productSwapToBankStatementList = [
  {
    id: 1,
    sellerId: 1,
    customerId: 3,
    productId: 1,
    price: 110,
    date: "",
  },
];

let moneyTransferToBankStatementList = [
  {
    id: 1,
    senderId: 1,
    recipientId: 2,
    amount: 100,
    date: "01.09.2022",
  },
  {
    id: 2,
    senderId: 2,
    recipientId: 3,
    amount: 200,
    date: "02.09.2022",
  },
  {
    id: 3,
    senderId: 3,
    recipientId: 4,
    amount: 300,
    date: "03.09.2022",
  },
  {
    id: 4,
    senderId: 4,
    recipientId: 1,
    amount: 400,
    date: "04.09.2022",
  },
];

let customerProductList = [
  { id: 1, customerId: 1, productId: 1, stock: 2 },
  { id: 2, customerId: 2, productId: 2, stock: 3 },
  { id: 3, customerId: 2, productId: 3, stock: 5 },
  { id: 4, customerId: 3, productId: 4, stock: 1 },
];

displayCustomer(); // en başta oluşturulan default müşteri listesi gelsin diye ekledik
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
const btnExchange = document.getElementById("btnExchange");

/* müşteri ekleme fonksiyonu*/
btnAddCustomer.addEventListener("click", addCustomer);
function addCustomer() {
  //eğer inputların içi boşsa uyarı ver değilse ekleme işlemini gerçekleştir.
  if (firstName.value == "" || lastName.value == "" || balance.value == "") {
    alert("Fill out the form completely!");
  } else {
    customerList.push({
      id: customerList.length + 1, //idnin yeni gelen kullanıcı ile 1 artarak gelmesini sağladık
      firstName: firstName.value,
      lastName: lastName.value,
      balance: balance.value,
    });
    alert("New customer added.");
    //ekleme işlemi sonrası inputların içini temizledik
    firstName.value = "";
    lastName.value = "";
    balance.value = null;
  }
  customerSelect(); // ekleme işleminde selectlere de müşteri bilgisi eklemesi için
  displayCustomer(); //ekleme işlemi gerçekleşince yeni listeyi görüntülemedi
  event.preventDefault(); //sayfanın her click işlemi ile güncellenmesini engelledik
}

/* müşteri bilgilerini listeleme işlemi */
function displayCustomer() {
  let customerContainer = document.getElementById("customerContainer");
  customerContainer.innerHTML = ""; // her müşteri ekleme işleminde sabit diziden gelenlerin tekrarlanmasını engelledik

  /* eğer user list boşsa silindi ya da hiç eklenmediyse mesaj çıkar müşteri varsa listeler */
  if (customerList.length == 0) {
    customerContainer.innerHTML = `<tr><td colspan="5"><p class="text-center">Customer list is empty!</p></td></tr>`;
  } else {
    for (let customer of customerList) {
      let customerTableItem = `
        <tr class="customer-list-item" id="${customer.id}">
            <td>${customer.firstName} ${customer.lastName}</td>
            <td class="text-end">${customer.balance} $</td>
            <td class="border-0 text-center">
                <a href="" onclick="bankStatementSection(${customer.id})"><i title="Bank statement" class="fa-regular fa-file-lines"></i></a>
            </td>
            <td class="border-0 text-center">
                <a href="" onclick="customerProductListSection(${customer.id})"><ititle="Customer product list" class="fa-solid fa-tag"></ititle=></a>
            </td>
            <td class="border-0 text-center">
                <a href="" onclick="removeCustomer(${customer.id})"><i title="Delete customer" class="fa-regular fa-trash-can"></i></a>
            </td>
        </tr>`;
      customerContainer.insertAdjacentHTML("beforeend", customerTableItem);
      //yeni eklenen müşterinin listede sona tr elementi olarak eklenmesini sağladık
    }
  }
}

/* müşteri silme fonksiyonu */
function removeCustomer(id) {
  //console.log("silme fonksiyonu çalıştı" + id);
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
    for (let product of productList.filter((x) => x.stockAmount != 0)) {
      let productListItem = `
      <li
                class="product-list-item list-group-item d-flex justify-content-between align-items-center" id="${product.id}"
              >
                <i onclick="removeProduct(${product.id})" title="Delete product" class="fa-regular fa-circle-xmark"></i>
                <div class="ms-2 me-auto">
                  <div class="fw-bold">${product.productName}</div>
                  <span class="small">Stock amount <strong>${product.stockAmount}</strong></span>
                </div>
                <span class="badge bg-success p-3">${product.price} $</span>
              <div class="p-2"><button class="btn btn-outline-danger ml-5" onclick="productSell(${product.id})">sell</button></div>
              </li>`;
      productContainer.insertAdjacentHTML("beforeend", productListItem);
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
      if (
        customerProductList.filter(
          (x) => x.productId == product.id && sellerSelect.value == x.customerId
        ).length > 0
      ) {
        let productOption = `
      <option value="${product.id}">${product.productName}</option>`;
        productSelect.insertAdjacentHTML("beforeend", productOption);
      }
    }
  }
}

/* satıcı için select seçimi yapıldığında ürün selecti değişimi */
function selectChange() {
  productSelect();
}

/* customer listten seçtiğimiz kişinin ürünlerini görüntülemek istediğimiz zaman */
function customerProductListSection(id) {
  //console.log(id);
  selectedCustomerId = id;
  customerHistory.innerHTML = "";
  historyHeader.innerHTML = "Customer Product List<br/>&nbsp";
  let product = customerProductList.filter((x) => x.customerId == id);
  if (product.length > 0) {
    for (product of customerProductList) {
      if (product.customerId == id) {
        for (let pr of productList) {
          if (product.productId == pr.id) {
            let customerProductListItem = `<li
            class="product-list-item list-group-item d-flex justify-content-between align-items-center" id="${product.id}"
          >
            <div class="ms-2 me-auto">
              <div class="fw-bold">${pr.productName}</div>
              <span class="small">Stock amount <strong>${product.stock}</strong></span>
            </div>
            <span class="badge bg-success p-3">${pr.price} $</span>
          </li>`;
            customerHistory.insertAdjacentHTML(
              "beforeend",
              customerProductListItem
            );
          }
        }
      }
    }
  } else {
    let customerProductListItem = `
    <div class="alert alert-secondary" role="alert">
    <i class="fa-solid fa-circle-exclamation"></i>
    Product not found
  </div>`;
    customerHistory.insertAdjacentHTML("beforeend", customerProductListItem);
  }
  event.preventDefault();
}

/* hesap geçmişi ya da müşteri ürünleri listesini kapatmak için buton */
btnClose.addEventListener("click", function () {
  selectedCustomerId = 0;
  customerHistory.innerHTML = "";
  customerHistory.innerHTML = "";
  historyHeader.innerHTML = `<small>Click to view customer information</small>`;
});

/* müşteriler arası para transferi */
btnSend.addEventListener("click", sendMoney);
function sendMoney() {
  if (
    customerSelectFrom.value == "From..." ||
    customerSelectTo.value == "To..." ||
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
          addMoneyTransferToBankStatement(
            sender[0].id,
            recipient[0].id,
            amount.value
          );
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
    //console.log(customerList);
  }
  displayCustomer();
  event.preventDefault();
}

/* müşteriler arası ürün taransferi yapmak için */
btnExchange.addEventListener("click", productExchange);
let productSelect1 = document.getElementById("productSelect");
let customerSelect1 = document.getElementById("customerSelect");
function productExchange() {
  if (
    sellerSelect.value == "Seller..." ||
    customerSelect1.value == "Customer..." ||
    productSelect1.value == "Product..."
  ) {
    alert("Fill out the form completely!");
  } else {
    let added = false;
    let newCustomerProductList = [];
    let seller = customerList.filter((x) => x.id == sellerSelect.value);
    let customer = customerList.filter((x) => x.id == customerSelect1.value);
    let product = productList.filter((x) => x.id == productSelect1.value);

    if (seller[0].id !== customer[0].id) {
      if (customer[0].balance >= product[0].price) {
        customerProductList.forEach((x) => {
          if (
            x.customerId == sellerSelect.value &&
            x.productId == productSelect1.value
          ) {
            added = true;
            if (x.stock > 1) {
              newCustomerProductList.push({
                id: x.id,
                customerId: x.customerId,
                stock: x.stock - 1,
                productId: x.productId,
              });
            }
          } else {
            newCustomerProductList.push(x);
          }
        });
        if (added) {
          let newArray = [];
          let isThere = false;
          newCustomerProductList.forEach((x) => {
            if (
              x.customerId == customerSelect1.value &&
              x.productId == productSelect1.value
            ) {
              isThere = true;
              newArray.push({
                id: x.id,
                customerId: x.customerId,
                productId: x.productId,
                stock: x.stock + 1,
              });
            } else {
              newArray.push(x);
            }
          });
          if (isThere == false) {
            newArray.push({
              id: newArray.length + 1,
              customerId: customerSelect1.value,
              productId: productSelect1.value,
              stock: 1,
            });
          }
          customerProductList = newArray;
        }
        addProductSwapToBankSatement(
          seller[0].id,
          customer[0].id,
          product[0].id,
          product[0].price
        );
        alert("Product delivery successful.");
        seller[0].balance =
          parseFloat(seller[0].balance) + parseFloat(product[0].price);
        customer[0].balance =
          parseFloat(customer[0].balance) - parseFloat(product[0].price);
      } else {
        alert("Insufficient balance.");
      }
    } else {
      alert("You cannot send products to yourself.");
    }
    sellerSelect.value = "Seller...";
    customerSelect1.value = "Customer...";
    productSelect1.value = "Product...";
  }
  displayCustomer();
  event.preventDefault();
}

/* müşteriye ürün satma */
function productSell(id) {
  if (selectedCustomerId != 0) {
    let index = customerProductList.findIndex(
      (x) => x.customerId == selectedCustomerId && x.productId == id
    );
    let product = getProduct(id);
    let customerBalance = customerBalanceInquiry(selectedCustomerId);
    if (product) {
      if (customerBalance > product.price) {
        if (index != -1) {
          customerProductList[index].stock =
            customerProductList[index].stock + 1;
        } else {
          customerProductList.push({
            id: customerProductList.length + 1,
            customerId: selectedCustomerId,
            productId: id,
            stock: 1,
          });
        }
        customerBalanceSet(selectedCustomerId, customerBalance - product.price);
        addProductPurchaseToBankStatement(
          selectedCustomerId,
          id,
          product.price
        );
        productStockDown(id);
      } else {
        alert("Insufficient balance.");
      }
    }
    customerProductListSection(selectedCustomerId);
    displayCustomer();
    displayProduct();
  } else {
    alert("Please select customer.");
  }
}
function customerBalanceInquiry(customerId) {
  let selectCustomer = customerList.filter((x) => x.id == customerId);
  if (selectCustomer.length > 0) {
    return selectCustomer[0].balance;
  }
  return 0;
}
function customerBalanceSet(customerId, balance) {
  let index = customerList.findIndex((x) => x.id == customerId);

  if (index != -1) {
    customerList[index].balance = balance;
  }
}
function getProduct(productId) {
  return productList.filter((x) => x.id == productId)[0];
}
function productStockDown(productId) {
  let index = productList.findIndex((x) => x.id == productId);
  if (index != -1) {
    let product = productList[index];
    if (product.stockAmount > 1) {
      productList[index].stockAmount = product.stockAmount - 1;
    } else {
      productList[index].stockAmount = 0;
    }
  }
}

/* banka geçmişine para transfer işlemini ekleme */
function addMoneyTransferToBankStatement(senderId, recipientId, amount) {
  moneyTransferToBankStatementList.push({
    id: moneyTransferToBankStatementList.length + 1,
    senderId: senderId,
    recipientId: recipientId,
    amount: amount,
    date: new Date().toLocaleString(),
  });
}

/* banka geçmişine ürün takas işlemini ekleme */
function addProductSwapToBankSatement(sellerId, customerId, productId, price) {
  console.error(productId, customerId, sellerId, price);
  productSwapToBankStatementList.push({
    id: productSwapToBankStatementList.length + 1,
    sellerId: sellerId,
    customerId: customerId,
    productId: productId,
    price: price,
    date: new Date().toLocaleString(),
  });
}

/* banka özetine ürün alma işlemini ekleme */
function addProductPurchaseToBankStatement(customerId, productId, price) {
  productPurchaseToBankStatementList.push({
    id: productPurchaseToBankStatementList.length + 1,
    customerId: customerId,
    productId: productId,
    price: price,
    date: new Date().toLocaleString(),
  });
}

/* customer listten seçtiğimiz kişinin hesap geçmişini görüntülemek istediğimiz zaman */
function bankStatementSection(id) {
  console.log(id);
  customerHistory.innerHTML = "";
  historyHeader.innerHTML = "Bank Statement<br/>&nbsp";
  selectedCustomerId = 0;
  moneyTransferToBankStatementList
    .filter((x) => x.recipientId == id || x.senderId == id)
    .forEach((x) => {
      if (x.recipientId != id) {
        let customer = customerList.filter((y) => y.id == x.recipientId)[0];
        let bankStatementListItem = `
        <li class="list-group-item"><i class="fa-solid fa-reply"></i> ${x.date}, ${x.amount}$ was send to ${customer.firstName} ${customer.lastName}.</li>`;
        customerHistory.insertAdjacentHTML("beforeend", bankStatementListItem);
      } else {
        let customer = customerList.filter((y) => y.id == x.senderId)[0];
        let bankStatementListItem = `
        <li class="list-group-item"><i class="fa-solid fa-share"></i> ${x.date}, ${x.amount}$ was taken from ${customer.firstName} ${customer.lastName}.</li>`;
        customerHistory.insertAdjacentHTML("beforeend", bankStatementListItem);
      }
    });

  productSwapToBankStatementList
    .filter((x) => x.sellerId == id || x.customerId == id)
    .forEach((x) => {
      let product = productList.filter((y) => y.id == x.productId)[0];
      if (x.customerId != id) {
        let customer = customerList.filter((y) => y.id == x.customerId)[0];
        let bankStatementListItem = `
        <li class="list-group-item"><i class="fa-solid fa-arrow-up"></i> ${product.productName} worth ${x.price}$ was sent to ${customer.firstName} ${customer.lastName} on ${x.date}.</li>`;
        customerHistory.insertAdjacentHTML("beforeend", bankStatementListItem);
      } else {
        let customer = customerList.filter((y) => y.id == x.sellerId)[0];
        let bankStatementListItem = `
        <li class="list-group-item"><i class="fa-solid fa-arrow-down"></i> ${product.productName} worth ${x.price}$ was purchased from ${customer.firstName} ${customer.lastName} on ${x.date}.</li>`;
        customerHistory.insertAdjacentHTML("beforeend", bankStatementListItem);
      }
    });

  productPurchaseToBankStatementList
    .filter((x) => x.customerId == id)
    .forEach((x) => {
      let product = productList.filter((y) => y.id == x.productId)[0];
      let bankStatementListItem = `
    <li class="list-group-item"><i class="fa-solid fa-cart-arrow-down"></i> ${x.date} the ${product.productName} was purchased for ${x.price}$.</li>`;
      customerHistory.insertAdjacentHTML("beforeend", bankStatementListItem);
    });

  event.preventDefault();
}
