export interface Photo {
  id: string;
  title: string;
  imageData: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  photoId: string;
  createdAt: string;
}