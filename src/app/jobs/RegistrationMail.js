const Mail = require('../lib/Mail');

const RegistrationMail = {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { mailData } = data;

    await Mail.sendMail({
      from: `Queixa de Condomínio <admin@queixadecondominio.ga>`,
      to: `${mailData.nome} <${mailData.email}>`,
      subject: `${mailData.newSubject}`,
      html: `
      Olá, ${mailData.nome}! 
      <br/>A sua denúncia <strong>#${mailData.queixa_id}</strong> teve uma alteração!
      <br/>O seu status é ${mailData.queixa_status}
      <br/>Descrição: ${mailData.queixa_descricao}
      <br/>Mais informações no site <a>http://www.queixadecondominio.ga</a>
      `
    });
  },
};

module.exports = RegistrationMail