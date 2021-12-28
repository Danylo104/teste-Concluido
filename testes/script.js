//obtendo todos os elementos necessários 
const inputBox = document.querySelector(".entrada input");
const addBtn = document.querySelector(".entrada button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".rodaPe button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //obter valor definido pelo usuário
    if(userData.trim() != 0){//se os valores do usuário não são apenas espaços
       addBtn.classList.add("active")//ativa o botão adicionar
    }else{
        addBtn.classList.remove("active");//desativa o botão adicionar
    }
}

showTasks();

//se o usuário clicar no botão adicionar
addBtn.onclick = ()=>{
    let userData =  inputBox.value; //obter valor definido pelo usuário
    let getLocalStorage = localStorage.getItem("Nova Lista"); //recebendo localstorage
    if(getLocalStorage == null){ //se localStorage for nulo
        listArr = []; //criar matriz em branco
    }else{
        listArr = JSON.parse(getLocalStorage);//transformando o string json em um objeto js
    } 
    listArr.push(userData);
    localStorage.setItem("Nova Lista", JSON.stringify(listArr));//transformando o objeto js em uma string json
    showTasks();
    addBtn.classList.remove("active");
}


function showTasks(){
    let getLocalStorage = localStorage.getItem("Nova Lista"); //recebendo localstorage
    if(getLocalStorage == null){ //se localStorage for nulo
        listArr = []; //criar matriz em branco
    }else{
        listArr = JSON.parse(getLocalStorage);//transformando o string json em um objeto js
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;

    let newLitag = '';
    listArr.forEach((element, index) =>{
        newLitag += `<li> ${element} <span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLitag;
    inputBox.value = "";
}

//deletar lista função
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("Nova Lista");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);

    localStorage.setItem("Nova Lista", JSON.stringify(listArr));
    showTasks();
}
deleteAllBtn.onclick = () =>{
    listArr = [];

    localStorage.setItem("Nova Lista", JSON.stringify(listArr));
    showTasks();
}
