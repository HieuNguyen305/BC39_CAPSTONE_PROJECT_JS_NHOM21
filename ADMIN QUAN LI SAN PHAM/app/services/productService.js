function ProductService() {
  this.getListProductApi = function () {
    return axios({
      url: "https://637b69966f4024eac20ce0aa.mockapi.io/api/Testing",
      method: "GET",
    });
  };
  this.deleteProductApi = function (id) {
    return axios({
      url: `https://637b69966f4024eac20ce0aa.mockapi.io/api/Testing/${id}`,
      method: "DELETE",
    });
  };
  this.getProductByIdApi = function (id) {
    return axios({
      url: `https://637b69966f4024eac20ce0aa.mockapi.io/api/Testing/${id}`,
      method: "GET",
    });
  };
  this.updateProductByIdApi = function (product) {
    return axios({
      url: `https://637b69966f4024eac20ce0aa.mockapi.io/api/Testing/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
  this.addProductApi = function (product) {
    return axios({
      url: `https://637b69966f4024eac20ce0aa.mockapi.io/api/Testing`,
      method: "POST",
      data: product,
    });
  };
}
