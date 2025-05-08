export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatFixed(price) {
  return price + "%";
}

export function formatDate(dateString) {
  const from = new Date(dateString);
  const to = new Date();

  // Reset time để chỉ so sánh theo ngày
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0); // ngày cuối tháng trước
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years <= 0 && months <= 0 && days <= 0) return "0 day";

  const parts = [];
  if (years > 0) parts.push(`${years} năm`);
  if (months > 0) parts.push(`${months} tháng`);
  if (days > 0) parts.push(`${days} ngày`);

  return parts.join(" ");
}

export function formatDateTime(dateString) {
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString("vi-VN");
  return formatted;
}

export const getAvatarUrl = (avatar) => {
  if (!avatar) {
    return "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"; // ảnh fallback nếu không có
  }

  // Nếu là ảnh từ base64 hoặc là URL đầy đủ thì dùng trực tiếp
  if (
    avatar.startsWith("data:image") ||
    avatar.startsWith("http://") ||
    avatar.startsWith("https://")
  ) {
    return avatar;
  }

  // Nếu là ảnh từ storage Laravel (ví dụ 'avatars/abc.jpg')
  return `${import.meta.env.VITE_API_BASE_URL}storage/${avatar}`;
};

export const randomCode = () => {
  return Math.random().toString(36).substring(2, 12);
};
