let cart = [];
    let cartVisible = false;

    function toggleCart() {
      cartVisible = !cartVisible;
      document.getElementById('cart').style.display = cartVisible ? 'flex' : 'none';
    }

    function addToCart(name, price) {
      const found = cart.find(item => item.name === name);
      if (found) {
        found.count++;
      } else {
        cart.push({ name, price, count: 1 });
      }
      renderCart();
      if (!cartVisible) toggleCart();
    }

    function renderCart() {
      const cartEl = document.getElementById('cart-items');
      cartEl.innerHTML = '';
      let total = 0;
      
      cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <span>${item.name} x${item.count}</span>
          <span>${item.price * item.count} ₸ 
            <button class="remove-item" onclick="removeFromCart(${index})">❌</button>
          </span>
        `;
        cartEl.appendChild(itemEl);
        total += item.price * item.count;
      });
      
      document.getElementById('total').textContent = total;
      document.getElementById('checkout').style.display = total >= 7000 ? 'block' : 'none';
      
      // Обновляем количество в иконке корзины
      const cartCount = cart.reduce((sum, item) => sum + item.count, 0);
      const cartToggle = document.querySelector('.cart-toggle');
      if (cartCount > 0) {
        cartToggle.innerHTML = `${cartCount} 🛒`;
      } else {
        cartToggle.innerHTML = '🛒';
      }
    }

    function removeFromCart(index) {
      if (cart[index].count > 1) {
        cart[index].count--;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
    }

    function checkout() {
      let message = 'Здравствуйте! Хочу заказать:\n';
      cart.forEach(item => {
        message += `- ${item.name} x${item.count}\n`;
      });
      const total = cart.reduce((sum, i) => sum + i.price * i.count, 0);
      message += `Итого: ${total} ₸`;
      const phone = '77078072363';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }

    // Инициализация
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('cart').style.display = 'none';
    });