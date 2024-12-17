function fetching(id){
  fetch(`https://jsonplaceholder.org/users/?id=${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(user => {
    output(user);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function output(datas){
  document.getElementById("id").textContent = datas.id;
  document.getElementById("nev").textContent = [datas.firstname, datas.lastname].join(" ");
  document.getElementById("telefon").textContent = datas.phone;
  document.getElementById("email").textContent = datas.email;
  document.getElementById("cim").textContent = datas.address.zipcode + " " + datas.address.city + " " + datas.address.street + " " + datas.address.suite;
  document.getElementById("geo").textContent = datas.address.geo.lat + "; " + datas.address.geo.lng;
  document.getElementById("cegadat").textContent = datas.company.name + " " + datas.company.catchPhrase + " " + datas.company.bs
}

function search(){
  id = document.getElementById("userID").value
  fetching(id);
}