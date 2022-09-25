import { Document } from 'mongoose'

export interface CoreDocument extends Document {
  _id: string
  createdAt: Date
  updatedAt: Date
}
