/**
 * Генерация унифицированного ответа
 * @param success - Указывает на успешность операции (true/false)
 * @param data - Данные, возвращаемые клиенту (может быть объектом, массивом или null)
 * @param meta - Дополнительная информация, например, сообщение или счетчики
 * @returns Унифицированный объект ответа
 */
export const createResponse = (
    success: boolean,
    data: any,
    meta: object = {}
  ): { success: boolean; data: any; meta: object } => {
    return {
      success,
      data,
      meta,
    };
  };
  