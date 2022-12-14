class ProductService {
  endpoint = () => {
    return "https://638eea544ddca317d7e94038.mockapi.io/api/products";
  };
  getListProductApi = () => {
    return axios({
      url: this.endpoint(),
      method: "GET",
    });
  };
}
