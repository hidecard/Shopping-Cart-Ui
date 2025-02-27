let tempProduct = {}; // add to cart ကပါတာကို သိမ်းဖို့

function addtoCart(productName,productPrice,productImg){
    tempProduct = {
        name : productName,
        price : productPrice,
        img : productImg
    }
    document.getElementById('box').classList.add('d-block'); // d-none နေရာ d-block ထည့်ဖို့
    document.getElementById('box').classList.remove('d-none'); // ရှိတဲ့ d-none ကိုဖျောက်ဖို့

}
function add(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [] ;
    let existingProduct = cart.find(item => item.name === tempProduct.name);
    if(existingProduct){
        existingProduct.quantity += 1;
    }else{
        let product = {
            id : cart.length +1,
            name : tempProduct.name,
            price : tempProduct.price,
            img : tempProduct.img,
            quantity : 1
        }
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    tempProduct = {};
    cancel();
}

function cancel(){
    document.getElementById('box').classList.remove('d-block');
    document.getElementById('box').classList.add('d-none');
}
function loadData(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let cartlist = document.querySelector(".carts");
    let price = document.querySelector("#total");
    let total = 0;
    cartlist.innerHTML = '';
    if(cart.length === 0){
        cartlist.innerHTML = `<h2>Your shopping cart is empty</h2>`;
    }else{
        cart.forEach((item,index)=> {
            cartlist.innerHTML += `<div class="cart d-flex justify-content-between">
        <img src="imgs/${item.img}" alt="" style="width: 100px; ">
        <div class="info text-end">
            <h4 class="m-0">${item.name}</h4>
            <p class="m-0 fs-4">Price: $ ${item.price}</p>
            <div class="btns">
                <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
            </div>
        </div>
    </div> <hr>`;

    total += item.price * item.quantity;
    price.textContent = total ;
        });
    }
}

function clearAll(){
    localStorage.removeItem('cart');
    loadData();
}
function changeQuantity(index,action){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(action === 'increase'){
        cart[index].quantity += 1;
    }else if(action === 'decrease'){
        cart[index].quantity -= 1;
    }
    if(cart[index].quantity === 0){
        cart.splice(index,1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadData();
}