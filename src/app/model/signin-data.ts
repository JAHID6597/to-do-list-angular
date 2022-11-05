export class SignInData {
  constructor(private email: string, private password: string) {}

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
}
