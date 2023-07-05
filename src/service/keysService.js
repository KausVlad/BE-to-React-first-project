const ApiError = require('../exceptions/apiError');
const keysModel = require('../models/keysModel');

async function addApiKeyService(emailName, apiKey) {
  try {
    let user = await keysModel.findOne({ emailName });
    if (!user) {
      user = await keysModel.create({ emailName, apiKeys: [apiKey] });
    } else {
      user.apiKeys.push(apiKey);
      await user.save();
    }

    const [allApiKeys] = await keysModel.find({ emailName });

    return { message: 'API key successfully added', apiKeys: allApiKeys };
  } catch (error) {
    throw ApiError.internalServerError();
  }
}

async function deleteApiKeyService(emailName, apiKeyIndex) {
  try {
    const user = await keysModel.findOne({ emailName });
    if (!user) {
      throw ApiError.notFoundError();
    }

    if (apiKeyIndex >= user.apiKeys.length || apiKeyIndex < 0) {
      throw ApiError.badRequestError('Invalid API key index');
    }

    user.apiKeys.splice(apiKeyIndex, 1);
    await user.save();

    const [allApiKeys] = await keysModel.find({ emailName });

    return { message: 'API key deleted successfully', apiKeys: allApiKeys };
  } catch (error) {
    throw ApiError.internalServerError();
  }
}

async function getAllApiKeysService(emailName) {
  try {
    const user = await keysModel.findOne({ emailName });
    if (!user) {
      throw ApiError.notFoundError();
    }

    return user.apiKeys;
  } catch (error) {
    throw ApiError.internalServerError();
  }
}

module.exports = {
  addApiKeyService,
  deleteApiKeyService,
  getAllApiKeysService,
};
