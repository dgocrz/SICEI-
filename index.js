const express = require('express');
const app = express();
app.use(express.json());

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

// ENDPOINTS PARA ALUMNOS
app.get('/alumnos', (req, res) => {
    res.status(200).json(alumnos);
});

app.get('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id === parseInt(req.params.id));
    if (alumno) {
        res.status(200).json(alumno);
    } else {
        res.status(404).json({ message: "Alumno no encontrado" });
    }
});

app.post('/alumnos', (req, res) => {
    const nuevoAlumno = req.body;
    if (validarAlumno(nuevoAlumno)) {
        alumnos.push(nuevoAlumno);
        res.status(201).json(nuevoAlumno);
    } else {
        res.status(400).json({ message: "Datos de alumno inválidos" });
    }
});

app.put('/alumnos/:id', (req, res) => {
    const index = alumnos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        const alumnoActualizado = req.body;
        if (validarAlumno(alumnoActualizado)) {
            alumnos[index] = alumnoActualizado;
            res.status(200).json(alumnoActualizado);
        } else {
            res.status(400).json({ message: "Datos de alumno inválidos" });
        }
    } else {
        res.status(404).json({ message: "Alumno no encontrado" });
    }
});

app.delete('/alumnos/:id', (req, res) => {
    const index = alumnos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        const alumnoEliminado = alumnos.splice(index, 1);
        res.status(200).json(alumnoEliminado);
    } else {
        res.status(404).json({ message: "Alumno no encontrado" });
    }
});

// ENDPOINTS PARA PROFESORES
app.get('/profesores', (req, res) => {
    res.status(200).json(profesores);
});

app.get('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id === parseInt(req.params.id));
    if (profesor) {
        res.status(200).json(profesor);
    } else {
        res.status(404).json({ message: "Profesor no encontrado" });
    }
});

app.post('/profesores', (req, res) => {
    const nuevoProfesor = req.body;
    if (validarProfesor(nuevoProfesor)) {
        profesores.push(nuevoProfesor);
        res.status(201).json(nuevoProfesor);
    } else {
        res.status(400).json({ message: "Datos de profesor inválidos" });
    }
});

app.put('/profesores/:id', (req, res) => {
    const index = profesores.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        const profesorActualizado = req.body;
        if (validarProfesor(profesorActualizado)) {
            profesores[index] = profesorActualizado;
            res.status(200).json(profesorActualizado);
        } else {
            res.status(400).json({ message: "Datos de profesor inválidos" });
        }
    } else {
        res.status(404).json({ message: "Profesor no encontrado" });
    }
});

app.delete('/profesores/:id', (req, res) => {
    const index = profesores.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        const profesorEliminado = profesores.splice(index, 1);
        res.status(200).json(profesorEliminado);
    } else {
        res.status(404).json({ message: "Profesor no encontrado" });
    }
});

app.listen(80, () => console.log('Servidor en ejecución en http://localhost:80'));
