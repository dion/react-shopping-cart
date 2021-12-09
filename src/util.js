export default function formatCurrency(num) {
   if (num) {
      return '$' + Number(num.toFixed(2)).toLocaleString() + ' ';
   }
}