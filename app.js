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