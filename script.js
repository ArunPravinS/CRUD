// Load data from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the stored data from local storage
  const storedData = localStorage.getItem("formDataArray");

  // Parse the stored data to an array or set it to an empty array if null
  formDataArray = storedData ? JSON.parse(storedData) : [];

  // Update the table with the loaded data
  updateTable();
});

// Function to save formDataArray to local storage
function saveToLocalStorage() {
  // Convert formDataArray to a JSON string and store it in local storage
  localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
}

let formDataArray = [];

let currentPage = 1;
const itemsPerPage = 5;


function onFormSubmit(e) {
  event.preventDefault();
  readFormData();
  const form = document.querySelector('.c12');
  form.style.display = 'block';
  const forms = document.getElementById('hide');
  forms.style.display = 'none';
  document.getElementById("totalcount").innerHTML = formDataArray.length

  updateTable();



  resetForm();
  saveToLocalStorage();


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
    cell7.innerHTML = `<i onClick= "onEdit(this)" class="fas fa-edit"></i>`;

    let cell8 = row.insertCell(7);
    cell8.innerHTML = ` <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>`;




  }
  //Add the following lines to handle pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = formDataArray.slice(startIndex, endIndex);

  // Update the table with paginated data
  updateTable1(paginatedData);

  // Update the current page indicator
  document.getElementById("currentPage").innerText = currentPage;
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

}





let onEdit = (e) => {
  const form = document.querySelector('.c12');
  form.style.display = 'none';
  const forms =  document.getElementById('hide');
  forms.style.display = 'block';
  let selectedTask = e.parentElement.parentElement;

  document.getElementById("product").value = selectedTask.children[1].innerHTML;
  document.getElementById("category").value = selectedTask.children[2].innerHTML;
  document.getElementById("price").value = selectedTask.children[3].innerHTML;
  document.getElementById("count").value = selectedTask.children[4].innerHTML;
  deleteTask(e)
  updateRecord()

}
function updateRecord() {

  selectedTask.cells[1].innerHTML = formData.product;
  selectedTask.cells[2].innerHTML = formData.category;
  selectedTask.cells[3].innerHTML = formData.price;
  selectedTask.cells[4].innerHTML = formData.count;
  selectedTask.cells[5].innerHTML = formData.count * formData.price;
}
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  formDataArray.splice(e.parentElement.parentElement.id, 1);
  document.getElementById("totalcount").innerHTML = formDataArray.length


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
  document.getElementById("totalcount").innerHTML = formDataArray.length
}


// form visibility
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  const form = document.getElementById('hide');

  if (form.style.display === 'none') {
    // 👇️ this SHOWS the form
    form.style.display = 'block';
  } else {
    // 👇️ this HIDES the form
    form.style.display = 'none';
  }
});


function fil() {
  let category = document.getElementById("category1").value;
  if (category == "none") {
    updateTable()
  }
  else {
    filter1()




  }
}
function filter1() {
  let category = document.getElementById("category1").value;
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
    cell7.innerHTML = `<i onClick= "onEdit(this)" class="fas fa-edit"></i>`;

    let cell8 = row.insertCell(7);
    cell8.innerHTML = ` <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>`;
  }
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
}

// filter by product Name
function filter2() {
  let category = document.getElementById("findProduct").value;
  const rdr = formDataArray.filter(function (xad) {
    return xad.product.indexOf(category) > -1
  });
  updateTable1(rdr)
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






