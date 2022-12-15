let producService = new ProductService();
const getEle = (id) => document.getElementById(id);
const validation = new Validations();

// Call all list data from API
function getListProduct() {
  producService
    .getListProductApi()
    .then((rs) => {
      renderHTML(rs.data);
      console.log(rs.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
// Call func get list data from link API
getListProduct();

// Render list data ra UI
function renderHTML(data) {
  let content = "";
  data.forEach(function (product, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="editProduct('${
                  product.id
                }')">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct('${
                  product.id
                }')">Delete</button>
            </td>
        </tr>
        `;
  });
  getEle("tblDanhSachSanPham").innerHTML = content;
}

// Delete Product by Id
function deleteProduct(id) {
  producService
    .deleteProductApi(id)
    .then((rs) => {
      alert(`Delete Complete : ${rs.data.name}`);
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
    });
}

getEle("btnThemSanPham").onclick = function () {
  let content = "Add Product";
  document.getElementsByClassName("modal-title")[0].innerHTML = content;
  let button = `<button class="btn btn-primary" onclick="addProduct()">ADD</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
};

// Add Product
function addProduct() {
  let name = getEle("tenSP").value;
  let price = getEle("price").value;
  let screen = getEle("screen").value;
  let backCamera = getEle("backCamera").value;
  let frontCamera = getEle("frontCamera").value;
  let img = getEle("hinhAnh").value;
  let desc = getEle("moTa").value;
  let type = getEle("dongSanPham").value;
  var product = new Products(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  //Flag
  let flag = true;
  //Check Validation Tên Sản Phẩm
  flag &= validation.kiemTraRong(
    name,
    "errorNameSP",
    "(*) Không để trống tên sản phẩm"
  );
  //Check Validation giá tiền
  flag &=
    validation.kiemTraRong(
      price,
      "errorPrice",
      "(*) Không để trống giá tiền"
    ) &&
    validation.kiemTraChiDuocNhapSo(
      price,
      "errorPrice",
      "(*) Giá tiền chỉ được nhập số"
    ); //Check Validation screen
  flag &= validation.kiemTraRong(
    screen,
    "errorScreen",
    "(*) Không để trống thông số màn hình"
  ); //Check Validation backCamera
  flag &= validation.kiemTraRong(
    backCamera,
    "errorBack",
    "(*) Không để trống thông số Camera Sau"
  ); //Check Validation FrontCamera
  flag &= validation.kiemTraRong(
    frontCamera,
    "errorFront",
    "(*) Không để trống thông số Camera Trước"
  ); //Check Validation Hình Ảnh
  flag &= validation.kiemTraRong(
    img,
    "errorPic",
    "(*) Không để trống hình ảnh"
  ); //Check Validation Mô Tả
  flag &= validation.kiemTraRong(
    desc,
    "errorMoTa",
    "(*) Không để trống mô tả của sản phẩm"
  ); //Check Validation Dòng sản phẩm
  flag &= validation.kiemTraSelect(
    "dongSanPham",
    "errorDSP",
    "(*) Vui lòng chọn đúng dòng sản phẩm"
  );

  if (flag) {
    producService
      .addProductApi(product)
      .then((rs) => {
        alert("Add Complete !");
        getListProduct();
        const allField = document.querySelectorAll(".form-group .form-control");
        allField.forEach((input) => (input.value = ""));
        document.getElementsByClassName("close")[0].click();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Edit Product
function editProduct(id) {
  let content = "Edit Product";
  document.getElementsByClassName("modal-title")[0].innerHTML = content;
  let button = `<button class="btn btn-warning" onclick="updateProduct('${id}')">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
  producService
    .getProductByIdApi(id)
    .then((rs) => {
      let editProduct = rs.data;
      getEle("tenSP").value = editProduct.name;
      getEle("price").value = editProduct.price;
      getEle("screen").value = editProduct.screen;
      getEle("backCamera").value = editProduct.backCamera;
      getEle("frontCamera").value = editProduct.frontCamera;
      getEle("hinhAnh").value = editProduct.img;
      getEle("moTa").value = editProduct.desc;
      getEle("dongSanPham").value = editProduct.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

// // Update Product
function updateProduct(id) {
  let name = getEle("tenSP").value;
  let price = getEle("price").value;
  let screen = getEle("screen").value;
  let backCamera = getEle("backCamera").value;
  let frontCamera = getEle("frontCamera").value;
  let img = getEle("hinhAnh").value;
  let desc = getEle("moTa").value;
  let type = getEle("dongSanPham").value;
  let product = new Products(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  producService
    .updateProductByIdApi(product)
    .then(() => {
      alert("Update Complete!");
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
}
