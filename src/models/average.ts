import { Schema, Types, model } from 'mongoose';

interface Average {
  kind: string,
  fastest: number,
  slowest: number,
  calculated: number,
  solves: Types.Array<string>
}

const schema = new Schema<Average>({
  kind: {
    type: String,
    required: true
  },
  fastest: {
    type: Number,
    required: true
  },
  slowest: {
    type: Number,
    required: true
  },
  calculated: {
    type: Number,
    required: true
  },
  solves: {
    type: [Number],
    required: true
  }
});

const Average = model<Average>('Average', schema);

export default Average;
