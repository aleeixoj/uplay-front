class GetStringPrice {
  static getStringPrice(price: number): string {
    const [op1, op2] = price.toFixed(2).toString().split('.');

    return `${op1},${op2}`;
  }
}

export { GetStringPrice };
