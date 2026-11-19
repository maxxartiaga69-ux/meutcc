const isProd = process.env.NODE_ENV === "production";

const baseOptions = {
  httpOnly: true,
  secure: isProd,
  // "none" só é necessário se front e back estiverem em domínios diferentes em produção
  sameSite: isProd ? "none" : "lax",
  path: "/",
};

export function setAuthCookie(res, token) {
  res.cookie("token", token, {
    ...baseOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
  });
}

export function clearAuthCookie(res) {
  // sem maxAge, senão o Express 4 não limpa o cookie
  res.clearCookie("token", baseOptions);
}