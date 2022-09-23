import mongoose from 'mongoose'

const DB_CONNECT_OPTIONS = {}

export const Database = {
  connect: () => {
    mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.ac5wn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,

        DB_CONNECT_OPTIONS
      )
      .then(() => console.log('Database is connected.'))
      .catch(err => console.log(err))
  }
}
