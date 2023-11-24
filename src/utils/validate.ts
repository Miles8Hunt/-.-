// Запретить в инпуте ставить пробелы

export function validate(values: any) {
  const valid = /^\S(?:\s+\S)*$/.test(values.value);
  if (!valid) {
    values.value = values.value.replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
  }
}
