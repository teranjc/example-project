export const headers = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
};

export const headersToken = () => {
  const baseHeaders = headers();
  const token = localStorage.getItem('7ddba081-171blicense');
  return {
    ...baseHeaders,
    Authorization: `Bearer ${token}`
  };
};

export default { headers, headersToken };