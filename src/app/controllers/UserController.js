import Queue from '../lib/Queue';

export default {
  async store(req, res) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    // Adicionar job RegistrationMail na fila
    try {
      
      await Queue.add('RegistrationMail', { user });
      // await Queue.add('UserReport', { user });

    } catch (error) {
      console.log("Erro aconteceu")
      console.log(error)
    }
   
    return res.json(user);
  }
};
