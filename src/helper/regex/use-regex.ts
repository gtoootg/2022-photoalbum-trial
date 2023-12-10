export enum Regex {
  EMAIL = "^[a-zA-Z0-9]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\\.)+[a-zA-Z]{2,}$",
  PASSWORD = "[\\w\\[\\]`!@#$%\\^&*()={}:;<>+'-]{6,50}",
}

export const isMatchRegex = (regex: Regex, value: string) => {
  const regexForTest = new RegExp(regex);

  return regexForTest.test(value);
};
