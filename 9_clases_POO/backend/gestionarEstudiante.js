Estudiante = require('./modelo/estudiante');
Matricula = require('./modelo/matricula');
Materia = require('./modelo/Materia');

const matricula1 = new Matricula(1, 500000, 'Promoción 2024', '2024-01-01', 'Ingeniería de Sistemas');
const matricula2 = new Matricula(2, 450000, 'Promoción 2024', '2024-01-01', 'Ingeniería Industrial');
const matricula3 = new Matricula(3, 400000, 'Promoción 2024', '2024-01-01', 'Ingeniería Civil');
const matricula4 = new Matricula(4, 500000, 'Promoción 2024', '2024-01-01', 'Ingeniería de Sistemas');
const matricula5 = new Matricula(5, 450000, 'Promoción 2024', '2024-01-01', 'Ingeniería Industrial');
const matricula6 = new Matricula(6, 400000, 'Promoción 2024', '2024-01-01', 'Ingeniería Civil');

//Instanciacion de objetos materia
const materia1 = new Materia(1, 'Matemáticas', 4);
const materia2 = new Materia(2, 'Física', 3);
const materia3 = new Materia(3, 'Química', 2);
const materia4 = new Materia(4, 'Programación', 5);
const materia5 = new Materia(5, 'Algoritmos', 4);
const materia6 = new Materia(6, 'Estructuras de Datos', 3);
const materia7 = new Materia(7, 'Bases de Datos', 4);
const materia8 = new Materia(8, 'Redes', 3);
const materia9 = new Materia(9, 'Sistemas Operativos', 4);
const materia10 = new Materia(10, 'Inteligencia Artificial', 5);

//instanciacion de listas de objetos materia para cada estudiante
const materias1 = [materia1, materia2, materia3];
const materias2 = [materia4, materia5, materia6];
const materias3 = [materia7, materia8, materia9, materia10];
const materias4 = [materia1, materia4, materia7];
const materias5 = [materia2, materia5, materia8];
const materias6 = [materia3, materia6, materia9];
const materias7 = [materia1, materia5, materia9];
const materias8 = [materia2, materia6, materia10];
const materias9 = [materia3, materia4, materia7];
const materias10 = [materia1, materia2, materia3, materia4, materia5];

//instanciacion de objetos estudiante
const estudiante1 = new Estudiante(1, 'Juan', 'Carlos', 'Pérez', 'Gómez', 'Cédula de Ciudadanía', '1234567890', '2000-01-01', matricula1, materias1);
const estudiante2 = new Estudiante(2, 'María', 'Fernanda', 'López', 'Rodríguez', 'Cédula de Ciudadanía', '0987654321', '1999-05-15', matricula2, materias2);
const estudiante3 = new Estudiante(3, 'Carlos', 'Andrés', 'García', 'Martínez', 'Cédula de Ciudadanía', '1122334455', '2001-09-30', matricula3, materias3);
const estudiante4 = new Estudiante(4, 'Ana', 'Sofía', 'Ramírez', 'Hernández', 'Cédula de Ciudadanía', '5566778899', '2000-12-20', matricula4, materias4);
const estudiante5 = new Estudiante(5, 'Luis', 'Miguel', 'Torres', 'Díaz', 'Cédula   de Ciudadanía', '6677889900', '1998-03-10', matricula5, materias5);
const estudiante6 = new Estudiante(6, 'Sofía', 'Isabel', 'Vargas', 'Gómez', 'Cédula de Ciudadanía', '7788990011', '2002-07-25', matricula6, materias6);
const estudiante7 = new Estudiante(7, 'Andrés', 'Felipe', 'Mendoza', 'López', 'Cédula de Ciudadanía', '8899001122', '1999-11-05', matricula1, materias7);
const estudiante8 = new Estudiante(8, 'Valentina', 'Camila', 'Sánchez', 'Martínez', 'Cédula de Ciudadanía', '9900112233', '2001-04-18', matricula2, materias8);


//muestra de estudiantes con mensajes en consola
console.log(estudiante1.mostrarInformacion());

