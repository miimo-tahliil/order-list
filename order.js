

document.addEventListener('DOMContentLoaded', function() {

  const cart = {};


  const cartList = document.querySelector('.cart-list');
  const cartCount = document.querySelector('.cart-count');
  const totalAmount = document.querySelector('.total-amount');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

 
  function updateCart() {
    cartList.innerHTML = '';
    let total = 0;
    let itemsCount = 0;
    for (const [name, item] of Object.entries(cart)) {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      itemsCount += item.qty;
      cartList.innerHTML += `
        <li class="cart-item">
          <span class="cart-item-name">${name}</span>
          <span class="cart-item-qty">${item.qty}x <span class="cart-item-price">$${item.price.toFixed(2)}</span></span>
          <span class="cart-item-total">$${itemTotal.toFixed(2)}</span>
          <button class="remove-btn" data-name="${name}" title="Remove"><span aria-hidden="true">✕</span></button>
        </li>
      `;
    }
    cartCount.textContent = `(${itemsCount})`;
    totalAmount.textContent = `$${total.toFixed(2)}`;

  
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.onclick = function() {
        const name = this.getAttribute('data-name');
        delete cart[name];
        updateCart();
      };
    });
  }

  
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = btn.closest('.dessert-cards');
      const name = card.getAttribute('data-name');
      const price = parseFloat(card.getAttribute('data-price'));
      if (cart[name]) {
        cart[name].qty += 1; 
      } else {
        cart[name] = { price, qty: 1 }:
      }
      updateCart();
    });
  });


  updateCart();
});
