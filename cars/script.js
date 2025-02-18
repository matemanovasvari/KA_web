async function getAllCars(){
    try {
        const response = await fetch('https://surveys-5jvt.onrender.com/api/cars/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getCarById(id){
    try {
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function createCar(model, brand, year){
    try {
        const response = await fetch('https://surveys-5jvt.onrender.com/api/cars/', {
            method: 'POST',
            body: JSON.stringify({
                model: model,
                brand: brand,
                year: year
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function updateCar(id, model, brand, year){
    try {
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                model: model,
                brand: brand,
                year: year
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function deleteCar(id){
    try {
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`, {
            method: 'DELETE'
        });
        return "Delete successful!";
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function main() {
    //console.log(await getAllCars());
    //console.log(await getCarById(1));
    //console.log(await createCar("Ignis", "Suzuki", 2000));
    //console.log(await updateCar(20 , "Swift", "Suzuki", 2000));
    //console.log(await deleteCar(19));
}

//main();