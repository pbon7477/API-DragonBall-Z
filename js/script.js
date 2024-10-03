
let urlAnterior;
let urlPosterior='https://dragonball-api.com/api/characters';
let contador = 0;




document.querySelectorAll('button')[0].addEventListener('click', anteriorPagina);
document.querySelectorAll('button')[1].addEventListener('click', siguientePagina);

siguientePagina();

function siguientePagina(){
    controlBotones();
    
    if(urlPosterior != ''){
        cargarDatos(urlPosterior);
    }
    
}

function anteriorPagina(){
    controlBotones();
    
    if( urlAnterior != '' ){
        cargarDatos(urlAnterior)
        contador -=20;
    }
}


function cargarDatos(url){

    fetch( url )
    .then( respuesta => respuesta.json() )
    .then( valor => mostrar( valor ) )
}


function mostrar( dato ){
    document.querySelector('.caja').innerHTML='';
    document.querySelector('.caja').insertAdjacentHTML('beforeend',
        `<div>
            <h2>DragonBall Z</h2><hr>
            <div>(del ${contador+1}  al ${contador+10})</div>
        </div>`
    );
    //console.log( dato.items );

    dato.items.map( valor => {
        document.querySelector('.caja').insertAdjacentHTML('beforeend',`
                <div class='linea' onclick='leerPersonaje(this)'>
                ${++contador} - <span class='personaje' id='${valor.id}'>${valor.name}</span>
                </div>           

            `);
    });

    urlAnterior = dato.links.previous;
    urlPosterior = dato.links.next;
    controlBotones();
   console.log(contador);
}

/*--- limpiar color de  elementos seleccionados -- */
function limpiarTodos(){
    for( i=0; i < document.querySelectorAll('.linea').length; i++ ){
        document.querySelectorAll('.linea')[i].style=null;
    }
}

function leerPersonaje( element ){
    limpiarTodos()
    element.style.color='red';
    let nombre = element.querySelector('.personaje').innerText;
    let id_personaje = element.querySelector('.personaje').getAttribute('id');
    let urlPersonaje = `https://dragonball-api.com/api/characters/${ id_personaje }`;
    //alert(urlPersonaje);

    fetch( urlPersonaje )
    .then( data => data.json())
    .then( data => mostrarImagen( data ))
}


function mostrarImagen (data){
    document.querySelector('.imagen').innerHTML='';
    if( data.image ){
        document.querySelector('.imagen').insertAdjacentHTML('beforeend',
            `
            <img src='${data.image}' alt='sin imagen' />
            `); 
    }else{
        document.querySelector('.imagen').insertAdjacentHTML('beforeend',
             `
            <p>sin imagen</p>
            `);
    }
    document.querySelector('.info').innerHTML='';
    document.querySelector('.info').insertAdjacentHTML('beforeend',
        `
        <h2>Información</h2><hr>       
        <p><b>Nombre:</b> ${data.name} </p>
        <p><b>ki:</b> ${data.ki}</p>
        <p><b>Max ki:</b> ${data.maxKi}</p>
        <p><b>Raza:</b> ${data.race}</p>
        <p><b>Genero:</b> ${data.gender}</p>
        <p><b>Afiliación:</b> ${data.affiliation}</p><br>
        <p><b>Descripción:</b> ${data.description}</p>
        <br><hr>
        <h3><b>Planeta de origen:</b> ${data.originPlanet.name}</h3>
        <p><b>Descripción:</b> ${data.originPlanet.description}</p>
            <div class='planeta'>
                <img src='${data.originPlanet.image}' alt='' />     
            </div>
        `);
           
}



function controlBotones(){
    const boton = document.querySelectorAll('button');
    

    if( contador <= 10 ){      
       boton[0].style.visibility="hidden";
       
        
    }else{
        boton[0].style.visibility='visible';
        
    }
    
    if( contador > 51 ){       
        boton[1].style.visibility='hidden';
        
        
    }else{
        boton[1].style.visibility='visible';
        
        
    }
}
