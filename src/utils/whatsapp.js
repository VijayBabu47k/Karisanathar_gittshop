export function formatWhatsAppMessage(customer, items, total) {
  const itemLines = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`
    )
    .join('\n');

  const message = `🎁 *New Order - GiftShop*

👤 *Customer Details*
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
Address: ${customer.address}

🛍️ *Order Items*
${itemLines}

💰 *Total: ₹${total}*

Thank you for your order!`;

  return message;
}

export function openWhatsApp(customer, items, total) {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '917339501438';
  const message = formatWhatsAppMessage(customer, items, total);
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
