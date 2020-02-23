// const SlackWebhook = require("slack-webhook")
// const dateFormat = require('dateformat');

// KkZP6t4c7ipPehHsQjwDxjA4

// APHEV92NQ
// const slack = new SlackWebhook(
//   "https://hooks.slack.com/services/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",
//   {
//     defaults: {
//       username: "API",
//       channel: "#Erro Login NetProfessor",
//       icon_emoji: ':face_face',
//     },
//   },
// )
// module.exports = app => {

//   const sendlog = async (error) => {

//     await slack.send({
//       text: '---------------------------------------------------------------------------------------',
//       attachments: [
//         {
//           //pretext: 'Error',
//           fallback: 'GERAL',
//           author_name: 'GEDUC PORTAL PROFESSOR',
//           author_link: 'api.geduc.com.br',
//           author_icon: 'https://www.melhorhospedagemdesites.com/app/uploads/sites/5/2019/04/erro-502-bad-gateway.png',
//           fields: [
//             {
//               title: "CIDADE",
//               value: error.cidade,
//               short: true,
//             },
//             {
//               title: "ERROR",
//               value: error.error,
//               short: true,
//             },

//             {
//               title: "CPF",
//               value: error.cpf,
//               short: true,
//             },
//             {
//               title: "NOME",
//               value: error.nome,
//               short: true,
//             },
//             {
//               title: "Data/Hora",
//               value: dateFormat(new Date() , 'dd/mm/yyyy H:M'),
//               short: false,
//             },
//           ],
//           thumb_url: 'https://app.slack.com/services/BMUAZ4B6Y',
//           color: "good",
//         },
//       ],
//     })
//     //https://app.slack.com/services/BMUAZ4B6Y
//   }
//   return { sendlog }
// }
