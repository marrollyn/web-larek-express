import { Schema, model } from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description?: string;
  price?: number;
}

const imageSchema = new Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  image: imageSchema,
  category: {
    type: String,
    required: true,
    enum: ['софт-скил', 'хард-скил', 'другое', 'дополнительное', 'кнопка'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
});

export default model<IProduct>('product', productSchema);
