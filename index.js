const cuadradous = document.querySelectorAll(".cuadrado")    //array de cuadrados
const x = "✖";
const o = "〇";
let turno = "J1";                                            //el turno del jugador, para despues cambiarlo, por eso no es un const
const modal = document.querySelector("dialog");              //selecciona todas las cosas dentro del dialog            
const textoModal = modal.querySelector("h2");                //va a seleccionar el texto dentro del h2


cuadradous.forEach((cuadrado) => {                  //la flechita es como un if, o mejor dicho "then"
    cuadrado.addEventListener("click", () =>{       //añade evento a los cuadrados para que puedan ser clickeados
        if(turno==="terminado") return;             //revisa que no haya terminado el programa
        if(cuadrado.textContent !== "") return;     //si en el cuadrado hay un símbolo vacío
        cuadrado.textContent= turno === "J1" ? x : o; //mete el simbolo del jugador según el turno
        turno = turno === "J1" ? "J2" : "J1";       //cambia de turno
        const posicionGanadora = verSiHayGanador(); //ejecuta la función para ver si hay ganador y se lo asigna a una variable
        
        if(typeof posicionGanadora === "object"){   //si el return de la función anterior es de tipo object, se gana, porque significa que devolvió una posición ganadora
            ganar(posicionGanadora);    
                    
            return
        };

        if(posicionGanadora === "empate"){
            mostrarModal("Empate");                 //simplemente si hay empate muestra ese mensaje
        }
    })
})


modal.querySelector("button").addEventListener("click", ()=>{  //añade un evento, para que se pueda clickear el cuadrado
    cuadradous.forEach(cuadrado => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador",false);
    });
    modal.close();
    turno = "J1";
})

function verSiHayGanador(){
    const tablero = Array.from(cuadradous).map(cuadrado => cuadrado.textContent);   //crea un array a partir de la lista de query

    //for para revisar si se gana horizontalmente
    for (let i = 0; i <= 9; i+= 3) {                //3 para q se haga de fila en fila
        if( tablero[i] &&                           //para q no evalue los cuadros vacíos
            tablero[i] === tablero[i+1] &&          
            tablero[i] === tablero[i+2]) {          //estas 2 lineas evaluan si los 3 cuadros son iguales
                return [i,i+1,i+2];

        }           
    }

    //for para revisar si se gana verticalmente
    for (let i = 0; i <= 3; i++) {                  //sólo se necesitan hacer 3 ciclos al sólo hacerse 3 revisiones. ya q se aumenta de a 1
        if( tablero[i] &&                           
            tablero[i] === tablero[i+3] && 
            tablero[i] === tablero[i+6]){
                return [i,i+3,i+6];
        }    
    }

    //revisar si se gana diagonalmente
    if( tablero[0] &&
        tablero[0] === tablero[4] &&
        tablero[0] === tablero[8]){
            return [0,4,8];
    }

    if( tablero[2] &&
        tablero[2] === tablero[4] &&
        tablero[2] === tablero[6]){
            return [2,4,6];
    }

    if(tablero.includes("")) return false; //si algún cuadrado esta vacío termina la función
    return "empate";                        //porque si la cuadrilla está llena y no ganó nadie, significa que hay empate
}

function ganar(posicionesGanadoras){
    posicionesGanadoras.forEach(posicion => cuadradous[posicion].classList.toggle("ganador", true)); 
    mostrarModal("Ganador jugador " + (turno === "J1" ? "J2" : "J1")); //muestra que jugador ganó
}


function mostrarModal(resultado){     //todo para mostrar al final un mensaje, ya sea que alguien ganó o se empató
    textoModal.innerText = resultado;
    modal.showModal();
    turno = "terminado";
}
