const cuadradous = document.querySelectorAll(".cuadrado") //array de cuadrados
const x = "✖";
const o = "〇";
let turno = "J1";
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");


cuadradous.forEach((cuadrado) => {                
    cuadrado.addEventListener("click", () =>{       //añade evento a los cuadrados para que puedan ser clickeados
        if(turno==="terminado") return;
        if(cuadrado.textContent !== "") return;
        cuadrado.textContent= turno === "J1" ? x : o; //mete el simbolo del jugador según el turno
        turno = turno === "J1" ? "J2" : "J1";       //cambia de turno
        const posicionGanadora = verSiHayGanador();
        
        if(typeof posicionGanadora === "object"){
            ganar(posicionGanadora);    
                    
            return
        };

        if(posicionGanadora === "empate"){
            mostrarModal("Empate");
        }
    })
})


modal.querySelector("button").addEventListener("click", ()=>{
    cuadradous.forEach(cuadrado => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador",false);
    });
    modal.close();
    turno = "J1";
})

function verSiHayGanador(){
    const tablero = Array.from(cuadradous).map(cuadrado => cuadrado.textContent);

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

    if(tablero.includes("")) return false;
    return "empate";
}

function ganar(posicionesGanadoras){
    console.log(posicionesGanadoras)
    posicionesGanadoras.forEach(posicion => cuadradous[posicion].classList.toggle("ganador", true));
    mostrarModal("Ganador jugador " + (turno === "J1" ? "J2" : "J1"));
}


function mostrarModal(resultado){
    textoModal.innerText = resultado;
    modal.showModal();
    turno = "terminado";
}