// Unified cart badge logic
(function () {
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  }

  function computeCount() {
    return getCart().reduce((t, i) => t + (i.quantity || 1), 0);
  }

  window.updateCartBadge = function () {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const count = computeCount();
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  };

  document.addEventListener('DOMContentLoaded', window.updateCartBadge);
  window.addEventListener('storage', e => {
    if (e.key === 'cart') window.updateCartBadge();
  });
})();