// token
const tokenKey = "token";
// user
const userKey = "user";

export function removeToken() {
  localStorage.removeItem(tokenKey);
}

export function removeUser() {
  localStorage.removeItem(userKey);
}

export function getToken() {
  let output = null;
  const temp = localStorage.getItem(tokenKey);
  if (temp) {
    const now = Date.now();
    const { token, expires } = JSON.parse(temp);
    if (token && expires && expires > now) {
      output = token as string;
    } else {
      removeToken();
      removeUser();
    }
  }
  return output;
}

export function setToken(tokenBo: any) {
  const { value, expiration, expiresIn } = tokenBo;
  if (!value || !expiration || !expiresIn) {
    return;
  }
  const temp = JSON.stringify({
    token: value,
    expires: new Date(expiration.replace(/-/g, "/")).valueOf() + expiresIn,
  });

  localStorage.setItem(tokenKey, temp);
}

export function getUser() {
  let output: Record<string, any> = {};
  const temp = localStorage.getItem(userKey);
  if (temp) {
    output = JSON.parse(temp);
  }
  return output;
}

export function setUser(userBo: any) {
  localStorage.setItem(userKey, JSON.stringify(userBo));
}
