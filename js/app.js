document.getElementById('search__btn').addEventListener('click', () => {
  const input = document.getElementById('input__feild');
  const url = `https://openapi.programming-hero.com/api/phones?search=${input.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((info) => showPhoneInCard(info?.data));
  input.value = '';
});

const showPhoneInCard = (phones) => {
  console.log(phones[0]);
  let count = 1;
  phones.forEach((phone) => {
    count++;
    if (count > 20) {
      return;
    } else {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('col');
      cardDiv.innerHTML = `
        <div class="card h-100">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Phone Title: ${phone.phone_name}</h5>
            <h5 class="card-title">Brand Name: ${phone.brand}</h5>
          </div>
          <div class="card-footer bg-white">
          <button class="btn btn-outline-primary col-12">More Details</button>
          </div>
        </div>`;
      document.getElementById('new__card').appendChild(cardDiv);
    }
  });
};
