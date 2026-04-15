const fs = require('fs');
const os = require('os');

fs.writeFileSync('nota1.txt', 'Los módulos son unidades de código reutilizables', 'utf-8')
fs.writeFileSync('nota2.txt', ' que permiten organizar y encapsular funcionalidades en archivos separados', 'utf-8');

const nota1 = fs.readFileSync('nota1.txt', 'utf-8');
const nota2 = fs.readFileSync('nota2.txt', 'utf-8');

const fraseCompleta = (nota1 + nota2).toUpperCase();
fs.writeFileSync ('frase.txt', fraseCompleta, 'utf-8')
const frase = fs.readFileSync ('frase.txt', 'utf-8')

const plataforma = os.platform();
console.log("Plataforma actual:", plataforma);

const arquitectura = os.arch();
const modeloCpu = os.cpus()[0].model;

const infoSistema = {
    "cpu": modeloCpu,
    "plataforma": plataforma,
    "arquitectura": arquitectura
};

const jsonString = JSON.stringify(infoSistema, null, 2);

fs.writeFileSync('sistema.json', jsonString, 'utf-8');

const archivoJsonLeido =fs.readFileSync('sistema.json','utf-8');

const datosParseados = JSON.parse(archivoJsonLeido);

console.log("\nDatos del sistema guardados en el JSON:");
console.table(datosParseados);