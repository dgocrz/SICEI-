const http = require('http');

// Datos para simular la base de datos en memoria
const alumnos = [];
const profesores = [];

// Validación de datos
function validarAlumno(alumno) {
    return alumno && typeof alumno.id === 'number' &&
        typeof alumno.nombres === 'string' &&
        typeof alumno.apellidos === 'string' &&
        typeof alumno.matricula === 'string' &&
        typeof alumno.promedio === 'number';
}

function validarProfesor(profesor) {
    return profesor && typeof profesor.id === 'number' &&
        typeof profesor.numeroEmpleado === 'string' &&
        typeof profesor.nombres === 'string' &&
        typeof profesor.apellidos === 'string' &&
        typeof profesor.horasClase === 'number';
}

// Función para manejar las solicitudes HTTP
function requestHandler(req, res) {
    const { method, url } = req;

    // Rutas para alumnos
    if (url === '/alumnos' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(alumnos));
    } else if (url.startsWith('/alumnos/') && method === 'GET') {
        const id = parseInt(url.split('/')[2]);
        const alumno = alumnos.find(a => a.id === id);
        if (alumno) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(alumno));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Alumno no encontrado" }));
        }
    } else if (url === '/alumnos' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const nuevoAlumno = JSON.parse(body);
                if (validarAlumno(nuevoAlumno)) {
                    alumnos.push(nuevoAlumno);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(nuevoAlumno));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Datos de alumno inválidos" }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Error interno del servidor" }));
            }
        });
    } 
    // Puedes continuar agregando las rutas para PUT, DELETE, y las rutas para profesores aquí...
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Ruta no encontrada" }));
    }
}

// Configuración del servidor HTTP
const httpServer = http.createServer(requestHandler);
httpServer.listen(80, () => {
    console.log('Servidor HTTP en ejecución en http://localhost:80');
});
