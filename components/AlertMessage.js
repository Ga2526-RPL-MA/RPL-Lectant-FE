export default function AlertMessage({ type = "info", message }) {
  const baseStyle =
    "p-3 rounded-lg text-sm font-medium mb-2 border flex items-center gap-2";

  const styles = {
    success: `${baseStyle} bg-green-100 text-green-800 border-green-300`,
    error: `${baseStyle} bg-red-100 text-red-800 border-red-300`,
    warning: `${baseStyle} bg-yellow-100 text-yellow-800 border-yellow-300`,
    info: `${baseStyle} bg-blue-100 text-blue-800 border-blue-300`,
  };

  return <div className={styles[type] || styles.info}>{message}</div>;
}

