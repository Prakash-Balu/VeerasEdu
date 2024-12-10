export interface Comment {
  _id: string;
  userId: string;
  segmentId: string;
  seqNo: number;
  text: string;
  audioPath: string | null;
  replies: Reply[];
}

export interface Reply {
  _id: string;
  userId: string;
  commentId: string;
  seqNo: number;
  text: string;
  audioPath: string | null;
}
