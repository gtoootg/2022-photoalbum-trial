export enum SqlValueDataType {
  VARCHAR,
  INT,
  DECIMAL,
  BIG_INT,
  BOOLEAN,
}

export type valueType = string | number | boolean;

export interface SqlValueProps {
  key: string;
  value?: valueType;
  dataType: SqlValueDataType;
}

export enum Table {
  POST = "post",
  FLICKR_PHOTO_ID = "flickr_photo_id",
}

const transFormValueForSqlStringAccordingToDataType = (
  sqlValue: SqlValueProps
) => {
  let transformedStringValueForSql = "";

  if (sqlValue.dataType === SqlValueDataType.VARCHAR) {
    transformedStringValueForSql = `"${sqlValue.value}"`;
  }

  if (
    sqlValue.dataType === SqlValueDataType.INT ||
    sqlValue.dataType === SqlValueDataType.DECIMAL ||
    sqlValue.dataType === SqlValueDataType.BIG_INT
  ) {
    transformedStringValueForSql = `${sqlValue.value}`;
  }

  return transformedStringValueForSql;
};

export const buildSqlInsertQuery = (
  table: Table,
  sqlColumnsAndValues: SqlValueProps[],
  valuesForQueryOnMultipleRows = undefined
) => {
  const columsForQuery = sqlColumnsAndValues
    .map((sqlValue) => sqlValue.key)
    .join(", ");
  const valuesForQuery = sqlColumnsAndValues
    .map((sqlValue) => transFormValueForSqlStringAccordingToDataType(sqlValue))
    .join(", ");

  if (valuesForQueryOnMultipleRows) {
    return `INSERT INTO ${table} (${columsForQuery}) VALUES ${valuesForQueryOnMultipleRows}`;
  }

  return `INSERT INTO ${table} (${columsForQuery}) VALUES (${valuesForQuery})`;
};
