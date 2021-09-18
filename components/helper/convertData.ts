export default function convertDate(date) {
  if (date) {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } else {
    return "Unknown";
  }
}