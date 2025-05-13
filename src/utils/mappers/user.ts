export const mapUserListToEntity = (param: any): any => {
  return {
    id: param.id,
    name: param.name,
    username: param.username,
    email: param.email,
    phone: param.phone,
    role: param.role.name,
    role_id: param.role.id,
    password: param.password,
    allow_login: param.canLogin,
  };
};
