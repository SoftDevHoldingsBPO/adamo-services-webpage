class AuthService {
  public static async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    console.log(email, password);
  }

  public static async signUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    console.log(email, password);
  }
}
