import { ExpressionInterface, OrExpressionDefine } from '@/types';

export class OrExpression implements ExpressionInterface {
  private expressions: Array<ExpressionInterface>;

  constructor(expressions: Array<ExpressionInterface>) {
    this.expressions = expressions;
  }

  public getOperation(): string {
    return 'OR';
  }

  public getExpression(): OrExpressionDefine {
    return {
      or: this.expressions.map((expression) => expression.getExpression()),
    };
  }

  public evaluate(data: object): boolean {
    return this.expressions.some((expression) => expression.evaluate(data));
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getExpression());
  }
}