const Queue = require('../lib/Queue');

const MailController = {
  async store(req, res) {
    const { nome, email, queixa_id, queixa_descricao, queixa_status} = req.body;

    const mailData = {
      nome,
      email,
      queixa_id,
      queixa_descricao,
      queixa_status
    };

    // Adicionar job RegistrationMail na fila
    try {
      await Queue.add('RegistrationMail', { mailData });

    } catch (error) {
      console.log("Erro aconteceu")
      console.log(error)
    }
    return res.json(mailData);
  }
};

module.exports = MailController;