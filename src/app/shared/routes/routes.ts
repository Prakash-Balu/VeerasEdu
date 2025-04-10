export class routes {
  private static Url = '';

  public static get baseUrl(): string {
    return this.Url;
  }

  public static get home(): string {
    return this.baseUrl + '/home';
  }

  public static get dashboard(): string {
    return this.baseUrl + '/dashboard';
  }

  public static get classroom(): string {
    return this.baseUrl + '/segments/classroom';
  }

  public static get speakingroom(): string {
    return this.baseUrl + '/segments/speakingroom';
  }

  public static get selfpractice(): string {
    return this.baseUrl + '/segments/selfpractice';
  }

  public static get practicewithmaster(): string {
    return this.baseUrl + '/segments/practicewithmaster';
  }
}
