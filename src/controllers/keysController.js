const {
  addApiKeyService,
  deleteApiKeyService,
  getAllApiKeysService,
} = require('../service/keysService');

async function addApiKey(req, res, next) {
  try {
    const { emailName, apiKey } = req.body;

    const response = await addApiKeyService(emailName, apiKey);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function deleteApiKey(req, res, next) {
  try {
    const { emailName, apiKeyIndex } = req.body;

    const response = await deleteApiKeyService(emailName, apiKeyIndex);
    res.json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getAllApiKeys(req, res, next) {
  try {
    const { emailName } = req.params;

    const keys = await getAllApiKeysService(emailName);
    res.json(keys);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  addApiKey,
  deleteApiKey,
  getAllApiKeys,
};
