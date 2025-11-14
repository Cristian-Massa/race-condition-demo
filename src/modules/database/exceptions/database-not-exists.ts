export class DatabaseNotExistsException extends Error {
  constructor() {
    super();
    this.message =
      "Database file does not exists pleas create it in database folder at root directory project ";
  }
}
