import { users } from './users.js'

// Genera las filas de la tabla para mostrar los usuarios
function htmlRowsUsers() {
    const html = users.map(user => {
        return `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.gender == 'female' ? 'femenimo' : 'masculino'}</td>
                    <td>
                        <button onclick="deleteUser(${user.id})"  class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>`
    })
    //devuelve a la funcion el html pero con un join unicamente para unir nuestros objeto con lo indicado.
    return html.join("")
} 
//pasamos los mismos parametros indicados en la funcion anterior pero esto va a ser para nuevo usuario.
function htmlRowUser(user) {
    return `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.gender == 'female' ? 'femenimo' : 'masculino'}</td>
                <td>
                    <button onclick="deleteUser(${user.id})" class="btn btn-danger">Eliminar</button>
                </td>
            </tr>`
}

// devuelve el body 
function getTablebody() {
    return document.getElementById('table-body')
}
// Imprime los usuarios en el documento
function printUsers() {
    const htmlDataUsers = htmlRowsUsers()
    const tableBody = getTablebody()
    tableBody.innerHTML = htmlDataUsers
}

//Limpia formulario
function resetForm(){
    document.getElementById('form').reset()
}
//Obener id de los usuarios
function getUsersId(){
    users.forEach(function(user,index){
        user.id = index + 1
    })
}
//Obtener correos
function getEmails(){
    let emailToFind='academlo';
    //Filtro todos los correos de academlo
    const emails = users.filter(function(user){

        for(var i=0; i<user.email.length;i++){

            if(user.email.charAt(i) == '@'){//oscar2@academlo.com

                if(user.email.substring(i+1,user.email.length-4)==emailToFind){
                    
                    return user
                }
            }
        }
    })
    return emails
}

//Se guarda el nuevo usuario al Object array
function saveUsers(user){
    users.unshift(user)
    return users
}
//Eliminar 
function deleteUser(id){
    console.log(id)
    const userDeleted = users.filter(user=>{
        if(user.id==id){
            users.splice(user.id-1,1)
            return user
        }
    })
    
    console.log(userDeleted)
    console.log(users)
     
    getUsersId()
    printUsers()
}

//Filtar
function filter(){
    const filterOption = document.getElementById('select-filter').value
    const tableBody = getTablebody()
    //0. Elimino toda la información
    tableBody.innerHTML=''
    //Dibuja todos los usuarios del género femenino
    if(filterOption=='female'){
        const userFilterFemale = users.filter(function(user){
            return user.gender == 'female'
        })
        userFilterFemale.forEach(user=>{
        
            const htmlFilterUser = htmlRowUser(user)
            
            tableBody.innerHTML += htmlFilterUser
        })
    }
    //Dibuja a todos los usuarios con correo de academmlo
    if(filterOption=='academlo'){
       
        getEmails().forEach(user=>{
        
            const htmlFilterUser = htmlRowUser(user)
            
            tableBody.innerHTML += htmlFilterUser
        })
    }
    //Dibuja a todos los usuarios ordenador por nombre
    if(filterOption=='sort'){
        //1. Variable temporal donde se guardará el nuevo array
        let temp = []
        //2. Mediante la función sort, paso como parámetro una función anónima que contiene dos parámetros
        //3. usando la función anónima recorro la matríz
        //4. Evaluo si el nombre previo es mayor al siguiente, me retorne un 1
        //5. Si el nombre previo es menor que el siguiente, me retorne un -1
        //6. Y por default me regrese un 0 en caso que sean iguales
        //7. Genero un nuevo array y lo paso a temporal
        temp = users.sort(function(prev, next){
            if(prev.name > next.name){
                return 1
            }
            if(prev.name < next.name){
                return -1
            }
            return 0
        })
        //8. Recorro mi nuevo array mediante un forEach
        temp.forEach(user=>{
            //9. Agrego usuarios uno a uno 
            const htmlFilterUser = htmlRowUser(user)
            //10. Dibujo mi tabla con la nueva información
            tableBody.innerHTML += htmlFilterUser
        })
    }
    return filterOption
}

// Obtiene los datos del nuevo usuario
function getNewUser () {
    const inputName = document.getElementById('input-name')
    const inputEmail = document.getElementById('input-email')
    const inputAge = document.getElementById('input-age')
    const inputGender = document.getElementById('select-age')

    const newUser = {
        name: inputName.value,
        email: inputEmail.value,
        age: inputAge.value,
        gender: inputGender.value
    }
    return newUser
}
// Imprime los datos de un usuario nuevo en el documento
function addUser() {
    const newUser = getNewUser()
    const tableBody = getTablebody()
    const htmlNewUser = htmlRowUser(newUser)
    tableBody.innerHTML += htmlNewUser
    saveUsers(newUser)
    getUsersId()
    resetForm()
    //Si el género del nuevo usuario agregado es femenino encontrándose en ese momento en el filtro 'solo mujeres', se mostrará en dicho filtro 
    if( filter()==newUser.gender){ 
        filter()  
    }else{
        printUsers()
    }
}

// Llamadas al cargar la página
printUsers()
// Volvemos la función addUser parte del objeto window
window.addUser = addUser
window.deleteUser = deleteUser
window.filter = filter



