export default function formatCurrency(num) {
   if (num) {
      return '$' + Number(num.toFixed(1)).toLocaleString() + ' ';
   }
}