class InvalidCredentials extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidCredentials';
    }
}
module.exports=InvalidCredentials;