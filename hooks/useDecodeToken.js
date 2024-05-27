// import { useState } from "react"

// import { Buffer } from "buffer"

// const decode = (token) => {
//   const parts = token.split('.').map((part) => {
//     return Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
//   });
//   const payload = JSON.parse(parts[1].toString());
//   return payload;
// }

// export const useDecodeToken = (token) => {

//   const [user, setUser] = useState(null);

//   const tokenData = decode(token);
//   setUser({
//     id: tokenData["id"],
//     userId:
//       tokenData[
//       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//       ],
//     email:
//       tokenData[
//       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
//       ],
//     role: tokenData[
//       "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//     ],
//     userName:
//       tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
//   });

//   return { user }
// }