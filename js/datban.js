document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form form");
  const peopleInput = form.querySelector('input[type="number"]');
  const tables = document.querySelectorAll(".table-card");
  let selectedTable = null;

  // ⚠️ THAY URL NÀY BẰNG URL APPS SCRIPT CỦA BẠN
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDw7MKHf-nlhtdXdEQH-gt7hxLkxbbZMbBOF53w08JBxpQIlNgWzQ8Mp-hSQimNCmmQQ/exec";

  peopleInput.addEventListener("input", () => {
    const people = parseInt(peopleInput.value) || 0;
    tables.forEach((table) => {
      const seats = parseInt(table.dataset.seats);
      if (people > seats) {
        table.classList.add("disabled");
        table.style.opacity = "0.4";
        table.style.pointerEvents = "none";
      } else {
        table.classList.remove("disabled");
        table.style.opacity = "1";
        table.style.pointerEvents = "auto";
      }
    });
  });

  tables.forEach((table) => {
    table.addEventListener("click", () => {
      if (table.classList.contains("disabled")) return;
      tables.forEach((t) => t.classList.remove("selected"));
      table.classList.add("selected");
      selectedTable = table.querySelector("h4").textContent;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const booking = {
      name: form.querySelector('input[type="text"]').value.trim(),
      email: form.querySelector('input[type="email"]').value.trim(),
      date: form.querySelector('input[type="date"]').value,
      time: form.querySelector('input[type="time"]').value,
      people: peopleInput.value,
      table: selectedTable || "Chưa chọn bàn",
      note: (form.querySelector("textarea")?.value || "").trim(),
      createdAt: new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'}),
    };

    // Validate
    if (!booking.name || !booking.email || !booking.date || !booking.time) {
      alert("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (!selectedTable) {
      alert("⚠️ Vui lòng chọn bàn phù hợp trước khi đặt!");
      return;
    }

    // Hiển thị loading
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Đang xử lý...';
    submitBtn.disabled = true;

    // Tạo FormData
    const formData = new FormData();
    Object.entries(booking).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Gửi dữ liệu
    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    })
      .then(response => {
        console.log('Response status:', response.status);
        return response.text();
      })
      .then(text => {
        console.log('Response text:', text);
        
        // Reset form
        form.reset();
        tables.forEach((t) => t.classList.remove("selected", "disabled"));
        tables.forEach((t) => {
          t.style.opacity = "1";
          t.style.pointerEvents = "auto";
        });
        selectedTable = null;
        
        // Thông báo thành công
        alert(`✅ Đặt bàn ${booking.table} thành công!\n\n` +
              `📋 Thông tin đã được lưu vào Google Sheets.\n` +
              `📧 Chúng tôi sẽ liên hệ với bạn qua email: ${booking.email}\n\n` +
              `Xem chi tiết: https://docs.google.com/spreadsheets/d/19bgv5vJiofSjLxY_qpgDromyXG4RLOBXRTZAUqKtZ0o/edit?gid=0#gid=0`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert("❌ Có lỗi khi gửi dữ liệu!\n\nVui lòng kiểm tra:\n1. URL Apps Script đã đúng chưa?\n2. Deploy đã chọn 'Anyone' chưa?\n3. Kết nối internet có ổn định không?");
      })
      .finally(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
});