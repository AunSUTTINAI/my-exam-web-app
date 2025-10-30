export const statusColor = (status) => {
  switch (status.toLowerCase()) {
    case "high":
      return "rgba(244, 67, 54, 0.7)";
      break;
    case "nominal":
      return "rgba(255, 152, 0, 0.7)";
      break;
    case "low":
      return "rgba(76, 175, 80, 0.7)";
      break;
    default:
      return "rgba(158, 158, 158, 1)";
  }
};
