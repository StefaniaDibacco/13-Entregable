const socket = io.connect();


socket.emit('inicio-productos');

socket.on('producto-update', (products) => {
    products.forEach((product) => {
        addTr(product);
        console.log(product)
    });
});

const addTr = (product) => {
    const table = $('#lista');
    const trClone = $('#lista tbody tr:first');
    
    const nuevoTr = 
        `<td>${product.title}</td>
        <td>${product.price}</td>
        <td>
            <img src="${product.thumbnail}" class="" alt="20px">
        </td>`;
    const tr = trClone.clone();
    tr.html(nuevoTr);
    tr.show();
    table.append(tr);   

}

socket.emit('askData');

function sendData(e) {
  const input = document.getElementById('pepe');
  socket.emit('new-message', input.value);
}

function render(data) {
  console.log(data);
  var html = data
    .map(function (elem, index) {
      return `<div>
                 <strong>Socket Id: ${elem.socketId} => </strong>:
                 <em>${elem.message}</em>
        </div>`;
    })
    .join(' ');

  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) {
  console.log('RECIBI MENSAJE');
  render(data);
});