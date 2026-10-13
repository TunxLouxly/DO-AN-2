/* =========================================================
   TrangChu.js - Xử lý tương tác trang chủ TunxPet
   1) Hiển thị danh sách thú cưng
   2) Chuyển tab lọc theo loại
   3) Tìm kiếm theo tên
   4) Nút lên đầu trang
   ========================================================= */

// ----- 1. Dữ liệu mẫu (sau này sẽ lấy từ SQL Server) -----
// "anh" để trống thì hiện biểu tượng emoji. Có ảnh thật thì ghi đường dẫn, ví dụ: "images/mit.jpg"
const danhSachThuCung = [
    { id: 1,  ten: "Mít",    loai: "Chó",  tuoi: "6 tháng", gioiTinh: "Đực", icon: "🐶", anh: "" },
    { id: 2,  ten: "Lu",     loai: "Chó",  tuoi: "1 tuổi",  gioiTinh: "Cái", icon: "🐕", anh: "" },
    { id: 3,  ten: "Bông",   loai: "Chó",  tuoi: "3 tháng", gioiTinh: "Cái", icon: "🐩", anh: "" },
    { id: 4,  ten: "Vàng",   loai: "Chó",  tuoi: "2 tuổi",  gioiTinh: "Đực", icon: "🦮", anh: "" },
    { id: 5,  ten: "Mun",    loai: "Mèo",  tuoi: "4 tháng", gioiTinh: "Đực", icon: "🐱", anh: "" },
    { id: 6,  ten: "Kem",    loai: "Mèo",  tuoi: "8 tháng", gioiTinh: "Cái", icon: "😺", anh: "" },
    { id: 7,  ten: "Tam Thể", loai: "Mèo", tuoi: "1 tuổi",  gioiTinh: "Cái", icon: "🐈", anh: "" },
    { id: 8,  ten: "Xám",    loai: "Mèo",  tuoi: "2 tháng", gioiTinh: "Đực", icon: "🐈‍⬛", anh: "" },
    { id: 9,  ten: "Thỏ Bông", loai: "Khác", tuoi: "5 tháng", gioiTinh: "Cái", icon: "🐰", anh: "" },
    { id: 10, ten: "Hamster Nâu", loai: "Khác", tuoi: "3 tháng", gioiTinh: "Đực", icon: "🐹", anh: "" }
];

// ----- 2. Lấy các phần tử trên trang bằng id -----
const luoiThuCung = document.getElementById("luoiThuCung");
const dsTab       = document.getElementById("dsTab");
const formTimKiem = document.getElementById("formTimKiem");
const oTimKiem    = document.getElementById("oTimKiem");
const nutLenDau   = document.getElementById("nutLenDau");

// Lưu trạng thái đang chọn
let loaiDangChon = "Tất cả";
let tuKhoa = "";

// ----- 3. Hàm hiển thị danh sách thú cưng ra màn hình -----
function hienThi() {
    // Lọc theo loại (tab) và theo từ khóa tìm kiếm
    const ketQua = danhSachThuCung.filter(function (tc) {
        const dungLoai = (loaiDangChon === "Tất cả") || (tc.loai === loaiDangChon);
        const dungTen  = tc.ten.toLowerCase().includes(tuKhoa.toLowerCase());
        return dungLoai && dungTen;
    });

    // Không có kết quả
    if (ketQua.length === 0) {
        luoiThuCung.innerHTML = '<p class="khong-co">Không tìm thấy thú cưng phù hợp.</p>';
        return;
    }

    // Tạo HTML cho từng thẻ thú cưng
    let html = "";
    ketQua.forEach(function (tc) {
        const noiDungAnh = tc.anh
            ? '<img src="' + tc.anh + '" alt="' + tc.ten + '">'
            : tc.icon;

        html += `
            <div class="the-thu-cung">
                <div class="anh-thu-cung">${noiDungAnh}</div>
                <h3 class="ten-thu-cung">${tc.ten}</h3>
                <p class="thong-tin">${tc.tuoi} · ${tc.gioiTinh}</p>
                <a href="#" class="btn-chi-tiet">Xem chi tiết</a>
            </div>`;
    });
    luoiThuCung.innerHTML = html;
}

// ----- 4. Bấm vào tab -> đổi loại -----
dsTab.addEventListener("click", function (e) {
    const tab = e.target.closest(".tab");
    if (!tab) return;                       // bấm ra ngoài tab thì bỏ qua

    // Bỏ "active" của tất cả tab, rồi gán cho tab vừa bấm
    document.querySelectorAll(".tab").forEach(function (t) {
        t.classList.remove("active");
    });
    tab.classList.add("active");

    loaiDangChon = tab.dataset.loai;        // lấy giá trị data-loai trong HTML
    hienThi();
});

// ----- 5. Tìm kiếm -----
formTimKiem.addEventListener("submit", function (e) {
    e.preventDefault();                     // chặn trang tải lại
    tuKhoa = oTimKiem.value.trim();
    hienThi();
    document.getElementById("thu-cung").scrollIntoView({ behavior: "smooth" });
});

// ----- 6. Nút lên đầu trang -----
window.addEventListener("scroll", function () {
    nutLenDau.style.display = window.scrollY > 300 ? "block" : "none";
});
nutLenDau.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ----- 7. Chạy lần đầu khi mở trang -----
hienThi();