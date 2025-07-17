type UserInput = {
  id: number;
  name: string;
  email: string;
}

export class User {
  id: number;

  name: string;

  email: string;

  constructor(input: UserInput) {
    if (!input.id) {
      throw new Error("Missing id.");
    }

    if (!input.name) {
      throw new Error("Missing name.");
    }

    if (!input.email) {
      throw new Error("Missing email.");
    }

    this.id = input.id;
    this.name = input.name;
    this.email = input.email;
  }
}