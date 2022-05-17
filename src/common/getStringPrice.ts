class GetStringPrice {
  static getStringPrice(price: number): string {
    return Number(price).toFixed(2).toString().replace('.', ',');
  }
}

export { GetStringPrice };
