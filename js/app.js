document.getElementById('search__btn').addEventListener('click', () => {
  const input = document.getElementById('input__feild');
  if (input.value == '') {
    document.getElementById('validation').innerHTML = `
    <div class="text-center text-danger py-2">You Have Enatered A Null String. Please Enter A Valid Brand Name</div>`;
  } else {
    document.getElementById('validation').innerHTML = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${input.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((info) => showPhoneInCard(info?.data));
  }
  input.value = '';
});

const showPhoneInCard = (phones) => {
  /* console.log(phones[0]); */
  let count = 0;
  document.getElementById('new__card').textContent = '';
  phones.forEach((phone) => {
    count++;
    if (count > 20) {
      return;
    } else {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('col');
      cardDiv.innerHTML = `
        <div class="card h-100 shadow">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Phone Title: ${phone.phone_name}</h5>
            <h5 class="card-title">Brand Name: ${phone.brand}</h5>
          </div>
          <div class="card-footer bg-white">
          <button onclick="PhoneDetails('${phone.slug}')" class="btn btn-outline-primary col-12 shadow-none">More Details</button>
          </div>
        </div>`;
      document.getElementById('new__card').appendChild(cardDiv);
    }
  });
};

const PhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((info) => ReadAllData(info.data));
};

const ReadAllData = (data) => {
  console.log(data);
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('col-12');
  imgDiv.classList.add('col-md-5');
  imgDiv.innerHTML = `
  <img class="img-fluid col-12 pt-4" src="${data.image}" alt="" srcset="">`;
  document.getElementById('details__add').appendChild(imgDiv);

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('col-12');
  detailsDiv.classList.add('col-md-7');
  detailsDiv.innerHTML = `
        <table class="table table-striped table-hover">
          <thead class="text-center">
            <tr>
              <th class="col-4 fs-4">Features</th>
              <th class="col-8 fs-4">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-4 fs-5 text-center text-primary">Unique Id</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Brand</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-primary">Phone Name</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Display</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-primary">Storage</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Memory</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-primary">Chipset</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Sensors</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Release</td>
              <td class="col-8"></td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Others Info</td>
              <td class="col-8"></td>
            </tr>
          </tbody>
        </table>`;
  document.getElementById('details__add').appendChild(detailsDiv);
};
