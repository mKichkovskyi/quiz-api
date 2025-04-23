export type QuestionType = "single-choice" | "multiple-choice";

export type HttpError = Error & { status?: number };

export interface QuestionOptions {
  src: string;
  content: string;
}

export interface QuestionAttributes {
  id?: string;
  title: string;
  subTitle?: string;
  options?: QuestionOptions[] | null;
  questionType: QuestionType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AnswerAttributes {
  id?: string;
  answer: string[];
  questionId: string;
  userSessionId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateAnswerRequestBody = Omit<
  AnswerAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export interface UserSessionAttributes {
  id?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOptions {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends IOptions {
  totalItems: number;
  items: T[];
  totalPages: number;
}
