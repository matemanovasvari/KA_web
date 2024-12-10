function fetching(id){
    fetch(`https://jsonplaceholder.org/users/id=${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(user => {
    showOnWebsite(user);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function showOnWebsite(datas){
    document.getElementById("id").textContent = datas.id;
    document.getElementById("name").textContent = [datas.firstname, datas.lastname].join(" ");
    document.getElementById("phone").textContent = datas.phone;
    document.getElementById("email").textContent = datas.email;
    document.getElementById("address").textContent = datas.address.zipcode + " " + datas.address.city + " " + datas.address.street + " " + datas.address.suite;
    document.getElementById("geo").textContent = datas.address.geo.lat + "; " + datas.address.geo.lng;
    document.getElementById("compdat").textContent = datas.company.name + " " + datas.company.catchPhrase + " " + datas.company.bs
}

function search(){
    id = document.getElementById("userID").value
    fetching(id);
}