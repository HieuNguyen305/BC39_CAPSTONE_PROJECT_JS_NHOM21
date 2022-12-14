function Validations() {
  this.kiemTraRong = function (value, errorId, mess) {
    if (value === "") {
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    }
    getEle(errorId).innerHTML = "";
    getEle(errorId).style.display = "none";
    return true;
  };
  this.kiemTraSelect = function (idSelect, errorId, mess) {
    if (getEle(idSelect).selectedIndex !== 0) {
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };
  this.kiemTraChiDuocNhapSo = function (value, errorId, mess) {
    let content = /^[0-9]+$/;
    if (value.match(content)) {
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };
}
