let alısverisForm = document.querySelector(".alısveris-form");
let urunList = document.querySelector(".urunList");
let sepet = document.querySelector(".sepet");
let sepetTutari = document.querySelector(".sepetTutari");
let urunlerList = [];

if (typeof localStorage.urunlerList !== "undefined") {
  urunlerList = JSON.parse(localStorage.urunlerList);
  renderSepet();
}

function handleFormSubmit(e) {
  e.preventDefault();
  let formData = new FormData(alısverisForm);
  let formObj = Object.fromEntries(formData);
  urunlerList.push(formObj);
  alısverisForm.reset();

  save();
  renderSepet();
}
alısverisForm.addEventListener("submit", handleFormSubmit);

function save() {
  localStorage.urunlerList = JSON.stringify(urunlerList);
}

function renderSepet() {
  urunList.innerHTML = "";
  for (let urun of urunlerList) {
    urunList.innerHTML += `
      <div class="urun-item">
      <p>${urun.urunismi}</p>
      <p>${urun.renk}</p>
      <p>${urun.fiyat}</p>
      <p>${urun.kategori}</p>
      <button class="add">✔️</button>
      </div>`;
  }
  let add = document.querySelectorAll(".add");
  let sepetToplam = 0;
  for (let i = 0; i < add.length; i++) {
    add[i].addEventListener("click", () => {
      sepetToplam += Number(parseInt(urunlerList[i].fiyat));
      sepet.innerHTML += `
          <div class="urun-item">
          <p>${urunlerList[i].urunismi}</p>
          <p>${urunlerList[i].renk}</p>
          <p>${urunlerList[i].fiyat}</p>
          <p>${urunlerList[i].kategori}</p>
          </div>`;
      sepetTutari.innerHTML = `<p>Alışveriş Tutarı = ${sepetToplam}</p>`;
    });
  }
}
let garbage = document.querySelector(".garbage");

function handleClearStorage() {
  localStorage.clear();
  urunlerList = [];
  urunList.innerHTML = "";
  sepetTutari.innerHTML =  "";
  sepet.innerHTML =  "";
}
garbage.addEventListener("click", handleClearStorage);
