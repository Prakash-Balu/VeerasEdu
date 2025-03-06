export interface ApiList {
  id: string;
  name: string;
  description: string;
}

export interface ApiResponse {
  code: number;
  message: string;
  timestamp: string;
}

export interface ApiCardId {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  shorts: [
    {
      shortUrl: string;
      question: string;
      answer: string;
      isDeleted: boolean;
      id: string;
      watched: true;
    }
  ];
}
