export interface IBaseError {
  message: string;
  code: number;
};

export class BaseError extends Error {
  code: number;

  constructor(data: IBaseError) {
    super(data.message);
    this.code = data.code;
  }
};
