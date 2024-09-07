const PasswordValidator = require('password-validator');

// Crie um esquema
const schema = new PasswordValidator();

// Adicione propriedades ao esquema
schema
  .is().min(8)                                   // Mínimo 8 caracteres
  .is().max(100)                                 // Máximo 100 caracteres
  .has().uppercase()                             // Deve ter letras maiúsculas
  .has().lowercase()                             // Deve ter letras minúsculas
  .has().digits(2)                               // Deve ter pelo menos 2 dígitos
  .has().not().spaces()                          // Não deve conter espaços
  .is().not().oneOf(['Passw0rd', 'Password123']); // Senhas proibidas


module.exports = schema;