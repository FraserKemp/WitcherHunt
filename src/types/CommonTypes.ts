type ResponseError = {
  status: "error";
  success: false;
  errorMessage: string;
};

type ResponseSuccess<T> = {
  status: "success";
  success: true;
  data: T;
};

type ApiResponse<T> = ResponseSuccess<T> | ResponseError;
