const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  game: celebrate({
    [Segments.BODY]: Joi.object().keys({
      game: Joi.object().keys({
        team: Joi.object()
          .keys({
            A: Joi.object()
              .keys({
                score: Joi.number().positive().required(),
                players: Joi.array()
                  .items(
                    Joi.object().keys({
                      name: Joi.string().min(3).required(),
                    }),
                  )
                  .min(1)
                  .max(2)
                  .required(),
              })
              .required(),
            B: Joi.object()
              .keys({
                score: Joi.number().positive().required(),
                players: Joi.array()
                  .items(
                    Joi.object().keys({
                      name: Joi.string().min(3).required(),
                    }),
                  )
                  .min(1)
                  .max(2)
                  .required(),
              })
              .required(),
          })
          .required(),
        status: Joi.object()
          .keys({
            scoreDiff: Joi.number().positive().required(),
            winners: Joi.array()
              .items(
                Joi.object().keys({
                  name: Joi.string().min(3).required(),
                }),
              )
              .min(1)
              .max(2)
              .required(),
          })
          .required(),
      }),
    }),
  }),
};
