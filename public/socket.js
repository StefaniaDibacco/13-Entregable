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


function render(data) {
  console.log(data);
  var html = data.map (elem => {
    return (`<div>
      <span class="email">${elem.author}</span>
      <span class="date"> [ ${elem.time} ]: </span>
      <span class="text">${elem.text}</span>
     </div>`)
  }).join(" ");
  
  
  document.getElementById('messages').innerHTML += html;
}

socket.on('message-update', function (data) {
  console.log('RECIBI MENSAJE message-update',data);
  render(data);
});


const offFocus = () => {
  console.log("perdí foco");
  document.getElementById('messages').innerHTML = '';
  const author = document.getElementById('username').value;
  socket.emit('inicio-messages', author);

} 

function addMessage(e){
  var mensaje={
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value,
  };
  document.getElementById('texto').value="";
  socket.emit('new-message', mensaje);
  return false;
}
