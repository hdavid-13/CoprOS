// // app/copro/[id]/historique-transactions/transactions-content.tsx
// import { getTransactionsByCompte } from "./data";

// interface TransactionsContentProps {
//   id: string;
//   compte: string;
// }

// export default async function TransactionsContent({ id, compte }: TransactionsContentProps) {
//   const transactions = await getTransactionsByCompte(id, compte);

//   if (!transactions || transactions.length === 0) {
//     return (
//       <div className="p-6 text-center text-gray-600">
//         Aucune transaction trouvée pour le compte {compte}.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Libellé</th>
//             <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Débit</th>
//             <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Crédit</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {transactions.map((transaction: any) => (
//             <tr key={transaction.id} className="hover:bg-gray-50">
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                 {new Date(transaction.created_at).toLocaleDateString("fr-FR")}
//               </td>
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                 {transaction.libelle || "Aucun libellé"}
//               </td>
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
//                 {transaction.debit?.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) || "0,00 €"}
//               </td>
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
//                 {transaction.credit?.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) || "0,00 €"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }