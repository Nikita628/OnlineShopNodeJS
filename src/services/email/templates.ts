import { config } from "../../config";

export function signupSuccess(strings: TemplateStringsArray, name: string) {
  return `<h1>Congratulations ${name}, you have successfully signed up!</h1>`;
}

export function passwordReset(strings: TemplateStringsArray, token: string) {
  return `<h1>
    Visit <a href="${config.host}/new-password/${token}">Link</a> to reset your password.
  </h1>`;
}
