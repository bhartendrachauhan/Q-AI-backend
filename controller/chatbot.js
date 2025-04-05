
const {openai} = require('../utils/openaiConfiguration')

module.exports = {
  getAnswer: async (req, res) => {
    try {
      const question = req.params.question;
      const messages = [
        {
          role: 'system',
          content: 'you are a helpful chatbot who provides easy to understand definition of the asked query.'
        },
        {
          role: 'user',
          content: question
        }
      ]
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 512
      })
      // const completion = await openai.createChatCompletion({
      //   model: "gpt-3.5-turbo",
      //   prompt: question,
      //   max_tokens: 512
      // })
      res.status(200).send({
        status:'success',
        message:completion.choices[0].message.content.trim()
      })
    } catch (e) {
        res.status(500).send({
            status:'error',
            message:'server issue',
            e
        })
    }
  },
};
