/* getting input value */
document.getElementById('search__btn').addEventListener('click', (e) => {
  document.getElementById('spinner').style.display = 'block';
  e.preventDefault();
  document.getElementById('details').style.display = 'none';
  const input = document.getElementById('input__feild');
  /* validation */
  if (input.value == '') {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('new__card').textContent = '';
    document.getElementById('phones').style.display = 'block';
    document.getElementById('validation').innerHTML = `
    <div class="text-center text-danger py-2">You Have Enatered A Null String. Please Enter A Valid Brand Name</div>`;
    return;
  } else {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('validation').innerHTML = '';
    /* fetching data */
    const url = `https://openapi.programming-hero.com/api/phones?search=${input.value.toLowerCase()}`;
    fetch(url)
      .then((res) => res.json())
      .then((info) => {
        /* checking status of data */
        if (info.status == true) {
          showPhoneInCard(info.data);
          document.getElementById('phones').style.display = 'block';
        } else {
          /* validaion of wrong name */
          document.getElementById('phones').style.display = 'block';
          document.getElementById('new__card').textContent = '';
          document.getElementById('validation').innerHTML = `
              <div class="text-center text-danger py-2">
              You have entered wrong phone name or the phone is not available</div>`;
        }
      });
  }
  input.value = '';
});

/* card showing function */
const showPhoneInCard = (phones) => {
  document.getElementById('new__card').textContent = '';
  /* looping and showing data */
  if (phones.length > 20) {
    phones.slice(0, 20).forEach((phone) => {
      cardCreation(phone);
    });
    /* see more button creation */
    const div = document.createElement('div');
    div.classList.add('my-4');
    div.classList.add('col-12');
    div.innerHTML = `
            <div class="btn btn-outline-primary col-12 shadow">Show More</div>`;
    div.addEventListener('click', () => moreData(phones));
    document.getElementById('see__more').appendChild(div);
  } else {
    phones.forEach((phone) => {
      cardCreation(phone);
    });
  }
};

/* showMore function  */
const moreData = (phones) => {
  document.getElementById('new__card').textContent = '';
  document.getElementById('see__more').textContent = '';
  console.log(phones);
  phones.forEach((phone) => {
    cardCreation(phone);
  });
};

/* card creation function */
const cardCreation = (phone) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('col');
  cardDiv.innerHTML = `
        <div class="card h-100 shadow">
          <img src="${phone?.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title span__font">Phone: ${phone?.phone_name}</h5>
            <h5 class="card-title span__font">Brand: ${phone?.brand}</h5>
          </div>
          <div class="card-footer bg-white">
          <a href="#details"><button onclick="PhoneDetails('${phone?.slug}')" class="btn btn-outline-dark col-12 shadow-none">More Details</button></a>
          </div>
        </div>`;
  document.getElementById('new__card').appendChild(cardDiv);
};

/* show details function */
const PhoneDetails = (id) => {
  document.getElementById('details').style.display = 'block';
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((info) => ReadAllData(info?.data));
};

/* rading data function of PhoneDetails */
const ReadAllData = (data) => {
  /* image div creation */
  console.log(data);
  document.getElementById('details__add').textContent = '';
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('col-12');
  imgDiv.classList.add('pt-4');
  imgDiv.classList.add('mt-5');
  imgDiv.classList.add('col-md-5');
  imgDiv.innerHTML = `
  <img class="img-fluid col-12 pt-5" src="${
    !data?.image ? 'Info not found' : data.image
  }" alt="" srcset="">
  <h4 class="text-center py-3 text-danger">Picture: ${
    !data?.name ? 'Info not found' : data.name
  }</h4>
  `;
  document.getElementById('details__add').appendChild(imgDiv);

  /* table div creation */
  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('col-12');
  detailsDiv.classList.add('col-md-7');
  detailsDiv.classList.add('table-responsive');
  console.log(data.mainFeatures.sensors);
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
              <td class="col-4 fs-5 text-center text-primary">Product Id</td>
              <td class="col-8">${
                !data?.slug ? 'Info not found' : data.slug
              }</td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Brand</td>
              <td class="col-8">${
                !data?.brand ? 'Info not found' : data.brand
              }</td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-primary">Phone Name</td>
              <td class="col-8">${
                !data?.name ? 'Info not found' : data.name
              }</td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Display</td>
              <td class="col-8">${
                !data?.mainFeatures?.displaySize
                  ? 'Info not found'
                  : data.mainFeatures.displaySize
              }</td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-primary">Storage</td>
              <td class="col-8">${
                !data?.mainFeatures?.storage
                  ? 'Info not found'
                  : data.mainFeatures.storage
              }</td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Memory</td>
              <td class="col-8">${
                !data?.mainFeatures?.memory
                  ? 'Info not found'
                  : data.mainFeatures.memory
              }</td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-primary">Chipset</td>
              <td class="col-8">${
                !data?.mainFeatures?.chipSet
                  ? 'Info not found'
                  : data.mainFeatures.chipSet
              }</td>
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Sensors</td>
              <td id="sensor" class="col-8">${
                !data?.mainFeatures?.sensors
                  ? 'Info not found'
                  : sensorDetails(data.mainFeatures.sensors)
              }
            </tr>
            <tr>
              <td class="col-4 fs-5 text-center text-success">Release</td>
              <td class="col-8">${
                data.releaseDate != ''
                  ? data.releaseDate
                  : 'No release date found'
              }</td>
            </tr>
            
          </tbody>
           <thead>
               <th class="col-4"></th>
              <th class="col-8 fs-5 fw-bold">Others Info</th>
           </thead>
          <tbody>
            <tr>
              <td class="col-4 text-center">WLAN</td>
              <td class="col-8">${
                !data?.others?.WLAN ? 'Info not found' : data.others.WLAN
              }</td>
            </tr>
            <tr>
              <td class="col-4 text-center">Bluetooth</td>
              <td class="col-8">${
                !data?.others?.Bluetooth
                  ? 'Info not found'
                  : data.others.Bluetooth
              }</td>
            </tr>
            <tr>
              <td class="col-4 text-center">GPS</td>
              <td class="col-8">${
                !data?.others?.GPS ? 'Info not found' : data.others.GPS
              }</td>
            </tr>
            <tr>
              <td class="col-4 text-center">NFC</td>
              <td class="col-8">${
                !data?.others?.NFC ? 'Info not found' : data.others.NFC
              }</td>
            </tr>
            <tr>
              <td class="col-4 text-center">Radio</td>
              <td class="col-8">${
                !data?.others?.Radio ? 'Info not found' : data.others.Radio
              }</td>
            </tr>
            <tr>
              <td class="col-4 text-center">USB</td>
              <td class="col-8">${
                !data?.others?.USB ? 'Info not found' : data.others.USB
              }</td>
            </tr>
              
           </tbody>
        </table>`;
  document.getElementById('details__add').appendChild(detailsDiv);
};

/* sensor in details */
const sensorDetails = (sensors) => {
  let i = 1;
  console.log(sensors);
  let sensorString = '';
  sensors.forEach((sensor) => {
    sensorString += i + ') ' + sensor + ' ' + '\n';
    i++;
  });
  return sensorString;
};
