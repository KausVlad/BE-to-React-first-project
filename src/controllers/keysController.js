const {
  addApiKeyService,
  deleteApiKeyService,
  getAllApiKeysService,
} = require('../service/keysService');

async function addApiKey(req, res) {
  try {
    const { emailName, apiKey } = req.body;
    console.log(emailName, apiKey);

    const response = await addApiKeyService(emailName, apiKey);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteApiKey(req, res) {
  try {
    const { emailName, apiKeyIndex } = req.body;

    const response = await deleteApiKeyService(emailName, apiKeyIndex);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllApiKeys(req, res) {
  try {
    const { emailName } = req.body;

    const keys = await getAllApiKeysService(emailName);
    res.json(keys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addApiKey,
  deleteApiKey,
  getAllApiKeys,
};
