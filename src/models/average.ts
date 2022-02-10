import { Schema, Types, model } from 'mongoose';

enum PuzzleType {
  Cube2x2 = '2x2',
  Cube3x3 = '3x3',
  Cube4x4 = '4x4',
  Cube5x5 = '5x5',
  Cube6x6 = '6x6',
  Cube7x7 = '7x7',
  Pyraminx = 'Pyraminx',
  Megaminx = 'Megaminx'
}

interface Average {
  kind: string,
  fastest: number,
  slowest: number,
  calculated: number,
  solves: Types.Array<string>,
  puzzleType: PuzzleType
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
  },
  puzzleType: {
    type: String,
    default: PuzzleType.Cube3x3,
    enum: Object.values(PuzzleType)
  }
});

const Average = model<Average>('Average', schema);

export default Average;
