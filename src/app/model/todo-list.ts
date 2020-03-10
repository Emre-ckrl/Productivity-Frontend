export class ToDoList {
  text: string;
  condition: boolean;
  creator: any;

  constructor(text: string, condition: boolean) {
    this.text = text;
    this.condition = condition;
  }
}
