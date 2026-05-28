const response200Schema = (data?: any) => ({
    type: 'object',
    properties: {
        correlationId: {type: 'string'},
        messageCode:{type: 'number'},
        message: {type: 'string'},
        dateTime: {type: 'string'},
        data: data ? {...data} : false
    }
})

export {response200Schema};