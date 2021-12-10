export default function formatCurrency(num) {
   if (num) {
      return '$' + parseInt(Number(num.toFixed(2)).toLocaleString() + ' ', 10).toFixed(2);
   }
}