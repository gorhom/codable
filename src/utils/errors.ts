export const errors = {
  missingValue: (key: string, type: string) =>
    `Missing value for a non optional property. key: '${key}', type: ${type}`,
  missingSubType: (key: string, type: string) =>
    `Missing a subtype for a complex property. key: '${key}', type: ${type}`,
  wrongType: (key: string, expectedType: string, foundType: string) =>
    `Value found with a wrong type. key: '${key}', expected type: '${expectedType}', found type: '${foundType}'`,
  subTypeNotSupported: (key: string, type: string, subType: string) =>
    `Subtype of a complex property is not supported. key: '${key}', type: ${type}, subtype: ${subType}`,
  missingParser: (key: string, type: string) =>
    `Missing date parser. key: '${key}', type: ${type}`,
  failToParse: (key: string, value: string, errorMessage: string) =>
    `Fail to parse date with custom parser. key: '${key}', value: '${value}', parser error: '${errorMessage}'`,
};
