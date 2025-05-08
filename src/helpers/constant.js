export function useOrderStatus() {
  const ORDER_STATUS = {
    PENDING: { value: 0, label: "Chưa giải quyết", color: "warning" },
    PROCESSING: { value: 1, label: "Đã lên đơn", color: "info" },
    SHIPPED: { value: 2, label: "Đang giao hàng", color: "primary" },
    CONFIRMED: { value: 3, label: "Đã xác nhận", color: "default" },
    DELIVERED: { value: 4, label: "Đã giao", color: "success" },
    CANCELLED: { value: 5, label: "Đã hủy đơn", color: "danger" },
  };

  // Mảng để dùng cho <select>
  const statusOptions = Object.values(ORDER_STATUS).map((s) => ({
    value: s.value,
    label: s.label,
    color: s.color
  }));

  return {
    ORDER_STATUS,
    statusOptions,
  };
}
