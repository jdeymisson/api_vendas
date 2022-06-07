const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcrypt");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if(name && email && password) {
      const [ user ] = await knex("users").where({ email });

      if(user) {
        throw new AppError("Já existe um usuário cadastrado com esse e-mail vinculado.");
      };

      const cryptPassword = await hash(password, 8);

      await knex("users").insert({
        name,
        email,
        password: cryptPassword
      });

      response.status(201).json({
        message: `Usuário ${name} cadastrado com sucesso!`
      });
    } else {
      throw new AppError("Para cadastrar um usuário é necessário informar todos os campos.");
    };
  };

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const [ user ] = await knex("users").where({ id });

    if(!user) {
      throw new AppError("Usuário não foi encontrado!");
    };

    if(email) {
      const [ checkEmail ] = await knex("users").where({ email });

      if(checkEmail && checkEmail.id !== user.id) {
        throw new AppError("E-mail informado já está em uso!");
      };
    };

    if(password && !old_password) {
      throw new AppError("Para atualizar a senha, é necessario informar a senha atual.");
    };

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError("A senha atual informada não confere.");
      };
    };

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = await hash(password, 8) ?? user.password;

    await knex("users").update({
      name: user.name,
      email: user.email,
      password: user.password
    }).where({ id: user.id });
  };
};

module.exports = UsersController;