export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

// Lấy toàn bộ danh sách user
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Lưu toàn bộ danh sách user
export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Đăng ký tài khoản mới
export const registerUser = (
  newUser: User
): { success: boolean; message: string } => {
  const users = getUsers();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === newUser.email.toLowerCase()
  );

  if (existingUser) {
    return {
      success: false,
      message: "Email này đã được đăng ký!",
    };
  }

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    message: "Đăng ký thành công!",
  };
};

// Đăng nhập
export const loginUser = (
  email: string,
  password: string
): { success: boolean; message: string; user?: Omit<User, "password"> } => {
  const users = getUsers();

  const foundUser = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!foundUser) {
    return {
      success: false,
      message: "Email hoặc mật khẩu không đúng!",
    };
  }

  const { password: _, ...safeUser } = foundUser;

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

  return {
    success: true,
    message: "Đăng nhập thành công!",
    user: safeUser,
  };
};

// Lấy user đang đăng nhập
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Đăng xuất
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Kiểm tra đã đăng nhập hay chưa
export const isAuthenticated = () => {
  return !!localStorage.getItem(CURRENT_USER_KEY);
};
