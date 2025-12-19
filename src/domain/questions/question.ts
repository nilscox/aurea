export abstract class Question<Options extends object = object, Answer = unknown> {
  public readonly options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  abstract isCorrect(answer: Answer): boolean;
}
