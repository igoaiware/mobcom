const ValidationError = require("./ValidationError");

module.exports = () => {
  function existsOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === "string" && !value.trim()) throw msg;
  }

  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg);
    } catch (msgError) {
      return;
    }
    throw new ValidationError(msg);
  }

  function equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB) throw new ValidationError(msg);
  }

  // function validCpf(c, msg) {
  //   // const invalidCpf = [];
  //   if ((c = c.replace(/[^\d]/g, '')).length != 11) throw new ValidationError(msg);

  //   if (c in ['00000000000', '11111111111', '22222222222']) throw new ValidationError(msg);

  //   let r;
  //   let s = 0;

  //   for (i = 1; i <= 9; i++) s += parseInt(c[i - 1]) * (11 - i);

  //   r = (s * 10) % 11;

  //   if ((r == 10) || (r == 11)) r = 0;

  //   if (r != parseInt(c[9])) throw new ValidationError(msg);

  //   s = 0;

  //   for (i = 1; i <= 10; i++) s += parseInt(c[i - 1]) * (12 - i);

  //   r = (s * 10) % 11;

  //   if ((r == 10) || (r == 11)) r = 0;

  //   if (r != parseInt(c[10])) throw new ValidationError(msg);
  // }

  return {
    existsOrError,
    notExistsOrError,
    equalsOrError
  };
};
