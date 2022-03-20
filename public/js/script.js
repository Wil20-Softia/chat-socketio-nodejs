window.addEventListener('load',()=>{
    const socket = io();
    var contenedorMensajes = document.getElementById('m');
    const formulario = document.getElementById("formularioChat");
    formulario.addEventListener('submit', (e)=>{
        e.preventDefault();
        socket.emit('chat message', contenedorMensajes.value);
        contenedorMensajes.value = "";
        return false;
    });

    socket.on('chat message', (msg)=>{
        var mensaje = document.createTextNode('>>> ' + msg);
        var li = document.createElement('div');
        li.classList.add('row');
        li.appendChild(mensaje);
        document.getElementById("messages").appendChild(li);
    });
});