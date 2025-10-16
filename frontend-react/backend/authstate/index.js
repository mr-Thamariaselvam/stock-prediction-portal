import React from "react";

let authenticatedUser = null;

function getAccessToken() {
  let token = null;
  if (authenticatedUser && authenticatedUser.accessToken) {
    token = authenticatedUser.accessToken;
  }
  return token;
}

export { getAccessToken };
