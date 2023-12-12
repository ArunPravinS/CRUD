var ch
var numer = null
// Load data from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('hide');
  form.style.display = 'none'
  // Retrieve the stored data from local storage
  const storedData = localStorage.getItem("formDataArray");

  // Parse the stored data to an array or set it to an empty array if null
  formDataArray = storedData ? JSON.parse(storedData) : [];
  document.getElementById("totalcount").innerHTML = formDataArray.length

  // Update the table with the loaded data
  updateTable();
});

// Function to save formDataArray to local storage
function saveToLocalStorage() {
  // Convert formDataArray to a JSON string and store it in local storage
  localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
}


let product = document.getElementById("product");
console.log(product)


let category = document.getElementById("category");
let price = document.getElementById("price");
let count = document.getElementById("count");
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1")
let re = /^[1-9][0-9]{0,4}$/

let formDataArray = [];

let currentPage = 1;
const itemsPerPage = 5;


function onFormSubmit(e) {
  event.preventDefault();
  formValidation();
}
let formValidation = () => {


  if (product.value == "") {

    msg.innerHTML = "Product Name cannot be blank";
  }
  else if (!re.test(price.value)) {
    msg1.innerHTML = "Price should be between 1 and 99999";

  }
  else {
    if (numer == null) {

      readFormData();
      const form = document.querySelector('.c12');
      form.style.display = 'block';
      const forms = document.getElementById('hide');
      forms.style.display = 'none';
      document.getElementById("totalcount").innerHTML = formDataArray.length
      msg.innerHTML = "";
      msg1.innerHTML = "";

      updateTable();



      resetForm();
      saveToLocalStorage();
    }
    else {
      const form = document.querySelector('.c12');
      form.style.display = 'block';
      const forms = document.getElementById('hide');
      forms.style.display = 'none';
      save1()
      saveToLocalStorage();
    }
  }


}

function readFormData() {
  let product = document.getElementById("product").value;
  let category = document.getElementById("category").value;
  let price = document.getElementById("price").value;
  let count = document.getElementById("count").value;

  let formData = {
    product: product,
    category: category,
    price: price,
    count: count
  };

  formDataArray.push(formData);


}
function updateTable() {
  let tableBody = document.getElementById("storeList").getElementsByTagName('tbody')[0];

  tableBody.innerHTML = "";
  for (let i = 0; i < formDataArray.length; i++) {
    let rowData = formDataArray[i];

    // Create a new row
    let row = tableBody.insertRow(i);

    // Insert cells with data
    let cell1 = row.insertCell(0);
    cell1.innerHTML = i + 1;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = rowData.product;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = rowData.category;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = rowData.price;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = rowData.count;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = rowData.count * rowData.price;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = `<i onClick= "editRow(${i}) save1(${i})" style="color:#50a7b0" class="fas fa-edit"></i>`;

    let cell8 = row.insertCell(7);
    cell8.innerHTML = ` <i onClick ="deleteTask(${i})" style="color:#d31d59" class="fas fa-trash-alt"></i>`;




  }
  //Add the following lines to handle pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = formDataArray.slice(startIndex, endIndex);

  // Update the table with paginated data
  updateTable2(paginatedData);

  // Update the current page indicator
  document.getElementById("currentPage").innerText = currentPage;


}
function updateTable2(paginatedData) {
  let tableBody = document.getElementById("storeList").getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";

  // Calculate the starting index based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;

  for (let i = 0; i < paginatedData.length; i++) {
    let rowData = paginatedData[i];


    let row = tableBody.insertRow(i);


    let cell1 = row.insertCell(0);
    cell1.innerHTML = startIndex + i + 1;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = rowData.product;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = rowData.category;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = rowData.price;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = rowData.count;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = rowData.count * rowData.price;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = `<i onClick= "editRow(${startIndex + i})" style="color:#50a7b0" class="fas fa-edit"></i>`;

    let cell8 = row.insertCell(7);
    cell8.innerHTML = ` <i onClick =" deleteTask(${startIndex + i})" style="color:#d31d59" class="fas fa-trash-alt"></i>`;
  }
  
}
function editRow(index) {
  const form = document.querySelector('.c12');
  form.style.display = 'none';
  const forms = document.getElementById('hide');
  forms.style.display = 'block';
  const formData = formDataArray[index];
  // Populate the form with existing data for editing
  document.getElementById("product").value = formData.product;
  document.getElementById("category").value = formData.category;
  document.getElementById("price").value = formData.price;
  document.getElementById("count").value = formData.count;
  // Remove the item from the array
  formDataArray.splice(index, 1);
  console.log(index)
  ch = index
  numer = "parentElement"
}



function save1() {
  const editedFormData = {
    product: document.getElementById("product").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    count: document.getElementById("count").value
  };

  formDataArray.splice(ch, 0, editedFormData);
  document.getElementById("totalcount").innerHTML = formDataArray.length

  // Update the table with the modified data
  updateTable();
  resetForm();
  back()
}






function deleteTask(index) {

  if (confirm('Do you want to delete this record?')) {
    formDataArray.splice(index, 1);
    document.getElementById("totalcount").innerHTML = formDataArray.length
    updateTable()

  }
};





//Reset the data
function resetForm() {
  document.getElementById("product").value = '';
  document.getElementById("category").value = '';
  document.getElementById("price").value = '';
  document.getElementById("count").value = '';
  selectedTask = null;
}


function deleteAllRows() {
  formDataArray.splice(0, formDataArray.length)
  updateTable()
  block()
  document.getElementById("totalcount").innerHTML = formDataArray.length
}


// form visibility
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  const form = document.getElementById('hide');
  // form.style.display = 'block'
  const forms = document.querySelector('.c12');
  // forms.style.display = 'none';

  if (form.style.display === 'none') {
    // 👇️ this SHOWS the form
    form.style.display = 'block';
    forms.style.display = 'none';

  } else {
    // 👇️ this HIDES the form
    form.style.display = 'none';
    forms.style.display = 'block';
  }
});


function fil() {
  let category = document.getElementById("category1").value;
  if (category == "none1") {
    updateTable()
    block()
  }
  else {
    document.getElementById("btn").style.display = "none"
    document.querySelector(".pagination-container").style.display = "none"
    filter1()




  }
}
function filter1() {
  let category = document.getElementById("category1").value;
  console.log(category)
  const rdr = formDataArray.filter(function (xad) {
    return xad.category.indexOf(category) > -1
  });
  console.log(rdr)
  updateTable1(rdr)



}



function updateTable1(rdr) {
  let tableBody = document.getElementById("storeList").getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";

  // Calculate the starting index based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;

  for (let i = 0; i < rdr.length; i++) {
    let rowData = rdr[i];


    let row = tableBody.insertRow(i);


    let cell1 = row.insertCell(0);
    cell1.innerHTML = startIndex + i + 1;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = rowData.product;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = rowData.category;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = rowData.price;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = rowData.count;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = rowData.count * rowData.price;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = `<i onClick= "editFilter(${i})" style="color:#50a7b0" class="fas fa-edit"></i>`;

    let cell8 = row.insertCell(7);
    cell8.innerHTML = ` <i onClick =" deleteFilter(${i})" style="color:#d31d59" class="fas fa-trash-alt"></i>`;
  }
}
// show All
function showall() {
  let tableBody = document.getElementById("storeList").getElementsByTagName('tbody')[0];


  tableBody.innerHTML = "";
  for (let i = 0; i < formDataArray.length; i++) {
    let rowData = formDataArray[i];

    // Create a new row
    let row = tableBody.insertRow(i);

    // Insert cells with data
    let cell1 = row.insertCell(0);
    cell1.innerHTML = i + 1;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = rowData.product;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = rowData.category;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = rowData.price;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = rowData.count;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = rowData.count * rowData.price;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = `<i onClick= "editRow(${i})" style="color:#50a7b0" class="fas fa-edit"></i>`;

    let cell8 = row.insertCell(7);
    cell8.innerHTML = ` <i onClick ="deleteTask(${i})" style="color:#d31d59" class="fas fa-trash-alt"></i>`;
  }

  document.querySelector(".pagination-container").style.display = "none"
  document.getElementById("btn").style.display = "none"
  // let element = document.getElementById("fixed");

  // // Change the style properties
  // // element.style.position = "fixed";
  // // element.style.width = "100%";

}
// back
function back() {

  updateTable()

  block()
}


// ascsort
function ascSort() {
  formDataArray.sort((a, b) => {
    let fa = a.product.toLowerCase(),
      fb = b.product.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  updateTable()
  block()
}

//decsort()
function decSort() {
  formDataArray.sort((a, b) => {
    let fa = a.product.toLowerCase(),
      fb = b.product.toLowerCase();

    if (fa < fb) {
      return 1;
    }
    if (fa > fb) {
      return -1;
    }
    return 0;
  });
  updateTable()
  block()
}

// filter by product Name
function filter2() {
  let category = document.getElementById("findProduct").value;
  if (category == "") {
    updateTable()
  }
  else {
    ascSort()
    const rdr = formDataArray.filter(function (xad) {
      return xad.product.indexOf(category) > -1
    });
    document.getElementById("btn").style.display = "none"
    document.querySelector(".pagination-container").style.display = "none"
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const paginatedData = rdr.slice(startIndex, endIndex);


    // Update the table with paginated data
    updateTable1(rdr);
    // block()


  }
}

// Function to navigate to the next page
function nextPage() {
  const totalPages = Math.ceil(formDataArray.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
  }
}

// Function to navigate to the previous page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
}
function block() {
  document.getElementById("btn").style.display = "block"
  document.querySelector(".pagination-container").style.display = "block"
}


function deleteFilter(index) {
  let category12 = document.getElementById("category1").value;

  const rdr = formDataArray.filter(function (xad) {
    return xad.category.indexOf(category12) > -1
  });

  if (confirm('Do you want to delete this record?')) {
    for (j = 0; formDataArray.length - 1; j++) {
      // console.log(rdr[index].product)
      // rdr[index].product
      formDataArray[j].product
      if ((rdr[index].product == formDataArray[j].product) && (rdr[index].category == formDataArray[j].category) && (rdr[index].price == formDataArray[j].price) && (rdr[index].count == formDataArray[j].count)) {
        formDataArray.splice(j, 1)
        document.getElementById("totalcount").innerHTML = formDataArray.length



        break;
      }



    }

  }
  const rdx = formDataArray.filter(function (xad) {
    return xad.category.indexOf(category12) > -1
  });
  updateTable1(rdx)



}
function editFilter(index) {

  let category12 = document.getElementById("category1").value;

  const rdr = formDataArray.filter(function (xad) {
    return xad.category.indexOf(category12) > -1
  });

  if (confirm('Do you want to Edit this record?')) {
    for (j = 0; formDataArray.length - 1; j++) {
      // console.log(rdr[index].product)
      // rdr[index].product
      console.log(formDataArray[j].product)
      if ((rdr[index].product == formDataArray[j].product) && (rdr[index].category == formDataArray[j].category) && (rdr[index].price == formDataArray[j].price) && (rdr[index].count == formDataArray[j].count)) {

        const formData = formDataArray[j];
        // Populate the form with existing data for editing
        document.getElementById("product").value = formData.product;
        document.getElementById("category").value = formData.category;
        document.getElementById("price").value = formData.price;
        document.getElementById("count").value = formData.count;
        // Remove the item from the array
        // formDataArray.splice(j, 1);
        // console.log(index)
        ch = j
        numer = "parentElement"
        formDataArray.splice(j, 1)
        document.getElementById("totalcount").innerHTML = formDataArray.length



        break;
      }



    }

  }
  const form = document.querySelector('.c12');
  form.style.display = 'none';
  const forms = document.getElementById('hide');
  forms.style.display = 'block';


}








