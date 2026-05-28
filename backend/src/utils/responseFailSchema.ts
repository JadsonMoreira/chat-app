
const responseFailSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    message: { type: 'string' },
  },
}

export {responseFailSchema};