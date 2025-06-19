var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var siteElementContainer = [];
if (localStorage.getItem("website") == null) {
  siteElementContainer = [];
} else {
  siteElementContainer = JSON.parse(localStorage.getItem("website"));
  display();
}
function addSiteElement() {
  if (validationForm(siteName) && validationForm(siteUrl)) {
    var siteElement = {
      name: siteName.value,
      url: siteUrl.value,
    };
    siteElementContainer.push(siteElement);
    localStorage.setItem("website", JSON.stringify(siteElementContainer));
    display();
    clearForm();
  } else {
    console.log("no");
  }
}

function clearForm() {
  siteName.value = null;
  siteUrl.value = null;
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}
function display() {
  tableContainer = ``;
  for (var i = 0; i < siteElementContainer.length; i++) {
    // console.log(siteElementContainer[i].name);
    tableContainer += `
        <tr>
            <td>${i + 1}</td>
            <td>${siteElementContainer[i].name}</td>
            <td><button class="btn btn-visit px-2 m-2 "><i class="fa-solid fa-eye pe-2"></i><a href="${
              siteElementContainer[i].url
            }"  target="_blank">Visit</a></button>
            </td>
            <td><button onclick="deletedSite(${i})" class="btn btn-delete px-2 m-2"><i
                                        class="fa-solid fa-trash pe-2"></i>Delete</button></td>
                        </tr>`;
  }
  document.getElementById("tableContent").innerHTML = tableContainer;
}
function deletedSite(deletedIndex) {
  //delete
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        var x = siteElementContainer.splice(deletedIndex, 1);
        display();
        localStorage.setItem("website", JSON.stringify(siteElementContainer));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}
// localStorage.clear();

function validationForm(ele) {
  console.log(ele.nextElementSibling);
  var regex = {
    siteName: /^[a-z]{3,8}$/gi,
    siteUrl:
      /^(https?:\/\/){0,}(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };
  if (regex[ele.id].test(ele.value)) {
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.add("d-none");
    ele.classList.add("is-valid");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    ele.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
