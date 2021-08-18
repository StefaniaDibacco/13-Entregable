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