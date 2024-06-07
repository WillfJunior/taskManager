const validateTaskFields = (req, res, next) => {
    const { title, description } = req.body;
  
    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).send({ message: 'Both title and description must be strings' });
    }
  
    if (!title || !description) {
      return res.status(400).send({ message: 'Both title and description are required' });
    }
  
    next();
  };
  
  module.exports = { validateTaskFields };
  