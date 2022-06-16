class TokenService {
  public static getAccessToken(): string | null {
    return localStorage.getItem('accessToken1');
  }

  public static setAccessToken(value: string): void {
    localStorage.setItem('accessToken1', value);
  }

  public static clearAccessToken(): void {
    localStorage.removeItem('accessToken1');
  }
}

export default TokenService;
