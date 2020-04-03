const exceptionConstructor = errMsg => ({
  statusCode: '200',
  error: 'Execption',
  message: errMsg,
  data: {},
  success: false,
});

export const exception = {
  PERMISSION_DENIED: exceptionConstructor('权限不足'),
  VERIFY_FAIL: exceptionConstructor('用户名或密码错误'),
  USER_EXISED: exceptionConstructor('该邮箱已注册过用户'),
  PARAMS_INVALID: exceptionConstructor('参数有误'),
};

export const success = data => ({
  statusCode: 200,
  error: '',
  message: '',
  data,
  success: true,
});
