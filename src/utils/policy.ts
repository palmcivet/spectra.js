import {
  ExpressionInterface,
  ResourceInterface,
  DataInterface,
  ArgumentValue,
  FieldName,
  FieldValue,
  ArgumentRef,
} from '@/types';

/**
 * @description Bisect an array into two arrays based on a callback.
 */
export function bisectArray<T>(
  array: Array<T>,
  callback: (data: T) => boolean
): [Array<T>, Array<T>] {
  const truthy: Array<T> = [];
  const falsy: Array<T> = [];

  array.forEach((item) => {
    if (callback(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  });

  return [truthy, falsy];
}

/**
 * @description Parse the dependences from an expression.
 */
export function parseDependences(expression: ExpressionInterface): ResourceInterface {
  const fields = expression.getFields();

  const dependences = fields.reduce((memo, field) => {
    const [resource, fieldPath] = field.split('.');
    if (!memo[resource]) {
      memo[resource] = [];
    }

    memo[resource].push(fieldPath);

    return memo;
  }, {} as ResourceInterface);

  return dependences;
}

/**
 * @description Check if the key is an ArgumentRef.
 */
export function isArgumentRef(key: any): key is ArgumentRef {
  return typeof key === 'object' && 'ref' in key && 'type' in key;
}

/**
 * @description Get the value from the key.
 */
export function getValueFromKey(
  data: DataInterface,
  key: FieldName | FieldValue
): ArgumentValue {
  if (typeof key === 'string') {
    return data[key];
  }

  if (key !== null && isArgumentRef(key)) {
    return data[key.ref];
  }

  return key;
}