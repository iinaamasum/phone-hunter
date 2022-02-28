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
  imgDiv.classList.add('col-12 col-md-5');
  imgDiv.innerHTML=`
  <img src="${data.image}" alt="" srcset="">`

  const 
};
