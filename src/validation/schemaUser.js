import yup from "./yup.js";

const schemaUser = yup.object().shape({
  username: yup.string().required("Campo usuário é obrigatório!"),
  email: yup
    .string()
    .email("Email inválido!")
    .required("Campo email é obrigatório!"),
  dataNascimento: yup
    .date()
    .max(new Date(), "Data de nascimento deve ser no passado!")
    .required("A data de nascimento é obrigatória!")
    .test("eh-adulto", "Você deve ser maior de 18 anos!", (value) => {
      const anoAtual = new Date().getFullYear();
      const anoFornecido = new Date(value).getFullYear();
      return anoAtual - anoFornecido >= 18;
    }),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres!")
    .required("O campo senha é obrigatório!"),
});

// const validData = {
//   username: "john",
//   email: "john@test.com",
//   dataNascimento: "1990-01-01",
//   password: "123456789",
// };

// const invalidData = {
//   username: "john",
//   email: "john@test.com",
//   dataNascimento: "2010-01-01",
//   password: "123456789",
// };

// schemaUser
//   .validate(validData)
//   .then((valid) => console.log("Valid Data:", valid))
//   .catch((error) => console.error("Validation Error for Valid Data:", error));

// schemaUser
//   .validate(invalidData)
//   .then((valid) => console.log("Valid Data:", valid))
//   .catch((error) => console.error("Validation Error for Invalid Data:", error));

export default schemaUser;
