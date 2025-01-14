function getMethod(){
  fetch(`https://jsonplaceholder.typicode.com/todos`, {
    method: "GET"
  })
  .then(response => response.json())
  .then(json => {
    json.forEach(user => {
      writeToWebpage(user);
    });
    document.getElementById("users").innerHTML = li;
  });
}

function postMethod(titleValue, completedStatus){
  fetch(`https://jsonplaceholder.typicode.com/todos`, {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      title: titleValue.toString(),
      completed: completedStatus
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json));
}

function putMethod(newTitleValue, newComletedStatus){
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      userId: 1,
      title: newTitleValue.toString(),
      completed: newCompletedStatus 
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json));
}

function patchMethod(id, modification){
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: modification.toString(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json));
}

function deleteMethod(id){
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(json => console.log(json))
  .catch(error => console.error('There was a problem with the fetch operation:', error));
}

function writeToWebpage(datas){
  document.getElementById("id").textContent = datas.id;
  document.getElementById("userId").textContent = [datas.firstname, datas.lastname].join(" ");
  document.getElementById("telefon").textContent = datas.phone;
  document.getElementById("email").textContent = datas.email;
  document.getElementById("cim").textContent = datas.address.zipcode + " " + datas.address.city + " " + datas.address.street + " " + datas.address.suite;
  document.getElementById("geo").textContent = datas.address.geo.lat + "; " + datas.address.geo.lng;
  document.getElementById("cegadat").textContent = datas.company.name + " " + datas.company.catchPhrase + " " + datas.company.bs
}