import mongoose from 'mongoose'

const connectMongoDbDatabase = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL

    if (!mongoUrl) {
      throw new Error('MONGODB_URL nao definida no arquivo .env')
    }

    console.log(`
            Starting mongodb connection`)

    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    })

    console.log(`
            Created mongodb connection with success`)
  } catch (error: any) {
    throw new Error(
      'Problems to connect to mongodb database. ' +
        `Error: ${error.message as string}`
    )
  }
}

export { connectMongoDbDatabase }
