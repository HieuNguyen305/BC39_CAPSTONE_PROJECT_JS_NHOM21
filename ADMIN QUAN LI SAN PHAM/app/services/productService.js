function ProductService() {
  this.getListProductApi = function () {
    return axios({
      url: "https://638eea544ddca317d7e94038.mockapi.io/api/products",
      method: "GET",
    });
  };
  this.deleteProductApi = function (id) {
    return axios({
      url: `https://638eea544ddca317d7e94038.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });
  };
  this.getProductByIdApi = function (id) {
    return axios({
      url: `https://638eea544ddca317d7e94038.mockapi.io/api/products/${id}`,
      method: "GET",
    });
  };
  this.updateProductByIdApi = function (product) {
    return axios({
      url: `https://638eea544ddca317d7e94038.mockapi.io/api/products/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
  this.addProductApi = function (product) {
    return axios({
      url: `https://638eea544ddca317d7e94038.mockapi.io/api/products`,
      method: "POST",
      data: product,
    });
  };
}
