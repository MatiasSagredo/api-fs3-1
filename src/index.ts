import fastify from 'fastify';

// Definicion del tipo usuario
interface Usuario {
    nombre: string;
    dni: string;
}

// Inicializacion
const app = fastify();

// Creacion metodo post
app.post<{ Body: Usuario }>('/usuario', async (request, reply) => {
    const { nombre, dni } = request.body;

    // Validacion de datos
    if (!nombre || !dni) {
        return reply.status(400).send({ error: 'nombre y dni son requeridos' });
    }

    // Chequear si los tipos son correctos
    if (typeof nombre !== 'string' || typeof dni !== 'string') {
        return reply.status(400).send({ error: 'nombre y dni deben ser una cadena' });
    }

    // Creacion del usuario
    const nuevoUsuario: Usuario = { nombre, dni };

    // Respuesta
    return reply.status(201).send({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
});
// Iniciar el servidor
app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
    console.log('Servidor escuchando en el puerto 3000');
}).catch((err) => {
    console.error('Error al iniciar el servidor:', err);
});
