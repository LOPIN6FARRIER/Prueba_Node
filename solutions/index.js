import net from 'node:net'
import fs from 'node:fs'
import fsp from 'node:fs/promises'// para evitar el .promise aunque solo funciona con promesa


//Escribe las soluciones en el archivo `solutions/index.js` manteniendo el nombre de las funciones y sus `export`. Usa `ESModules` en tu proyecto de Node.js

// 1 - Arregla esta función para que el código posterior funcione como se espera:

// ```javascript
// import net from 'node:net'

// export const ping = (ip) => {
//   const startTime = process.hrtime()

//   const client = net.connect({ port: 80, host: ip }, () => {
//     client.end()
//     return { time: process.hrtime(startTime), ip }
//   })
  
//   client.on('error', (err) => {
//     throw err
//     client.end()
//   })
// }

// ping('midu.dev', (err, info) => {
//   if (err) console.error(err)
//   console.log(info)
// })
// ```
export const ping = (ip,callback) =>{   //falta el callback
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    //estono no funcion aya que es de la funcion return { time: process.hrtime(startTime), ip }
    callback(null, { time: process.hrtime(startTime), ip }) //null es el error asi que va  null
})
  
  client.on('error', (err) => {
      client.end()//movi el client arriba ya que estaba en never y no se cerraba
    callback(err) //falta el callback
    //throw err esto no funciona 
  })
}

ping('vinicioesparza-dev.me', (err, info) => {  //llega un callback asi que lo añadimos arriba 
  if (err) console.error(err)
  console.log(info)
})
//2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:
// export function obtenerDatosPromise(callback) {
//     setTimeout(() => {
//       callback(null, { data: 'datos importantes' });
//     }, 2000);
//   }

export function obtenerDatosPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({data: 'datos importantes'});
        }, 2000);
    });
}

//promis e.then
obtenerDatosPromise().then(data => {
    console.log(data);
})
.catch(err => {
    console.error(err);
})

//await 
try{
const{data}=await obtenerDatosPromise();
console.log(data);
}catch(err){
    console.error(err);
}


//3 - Explica qué hace la funcion. 
//Identifica y corrige los errores en el siguiente código.
// Si ves algo innecesario, elimínalo.
// Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad.


export function procesarArchivo(callback) {
  fs.readFile('input.txt', 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message);
     // return false; esto es dentro de la funcion por lo que no es alcanzabel
     callback(error);
    }
    //setTimeout(() => { //el timeout es inicesario
      const textoProcesado = contenido.toUpperCase();
      fs.writeFile('output.txt', textoProcesado, error => {
        if (error) {
          console.error('Error guardando archivo:', error.message);
          //return false;
            callback(error);
        }
        console.log('Archivo procesado y guardado con éxito');
        //return true
        callback(null);
      });
   // }, 1000);
  });
}

export async function procesarArchivoPromise(){
    let contenido=''
    try{
contenido=await fsp.readFile('input.txt', 'utf8');
}catch(err){
    console.error('Error leyendo archivo:', err.message);
throw err;
}
const textoProcesado = contenido.toUpperCase();
try{
    await fsp.writeFile('output.txt', textoProcesado);
    console.log('Archivo procesado y guardado con éxitom1');
}catch(err){
    console.error('Error guardando archivo:', err.message);
    throw err;
}
}

export function procesarArchivoPromisethen(){
    let contenido=''
    fsp.readFile('input.txt', 'utf8')
    .then(contenido => {
        const textoProcesado = contenido.toUpperCase();
        return fsp.writeFile('output.txt', textoProcesado);
    })
    .then(() => {
        console.log('Archivo procesado y guardado con éxito');
    })
    .catch(err => {
        console.error(err);
    })
}

await procesarArchivoPromise()
procesarArchivoPromisethen()

//4¿Cómo mejorarías el siguiente código y por qué? Arregla los tests si es necesario:
//secuencial uno detras del otro
// export async function leerArchivos() {
//   const archivo1 = await fsp.readFile('archivo1.txt', 'utf8');
//   const archivo2 = await fsp.readFile('archivo2.txt', 'utf8');
//   const archivo3 = await fsp.readFile('archivo3.txt', 'utf8');

//   return `${archivo1} ${archivo2} ${archivo3}`
// }

// leerArchivos();

//en paralelo

export async function leerArchivos() {
    console.time('leer archivos')
    const[archivo1, archivo2, archivo3]=await Promise.all([
    fsp.readFile('archivo1.txt', 'utf8'),
    fsp.readFile('archivo2.txt', 'utf8'),
    fsp.readFile('archivo3.txt', 'utf8')
    ])
    console.log('leer archivos')
    return `${archivo1} ${archivo2} ${archivo3}`
  }

//5 - Escribe una funcion `delay` que retorne una promesa que se resuelva después de `n` milisegundos. Por ejemplo:

export async function delay (time) {
  return new Promise((resolve)=>{
    setTimeout(() => {
        resolve()
    }, time);
  })
}


