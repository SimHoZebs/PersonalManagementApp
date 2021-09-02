import mongoose from 'mongoose';

export interface FolderSchema {
  title: string;
  description: string;
  itemIds: mongoose.Types.ObjectId[];
}

const schema = new mongoose.Schema<FolderSchema>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  itemIds: [mongoose.Schema.Types.ObjectId],

})

export default mongoose.models.Folder || mongoose.model<FolderSchema>('Folder', schema)