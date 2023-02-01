import { PhotoAlbumTable } from "../../../server/data-base/mysql";

export enum SqlValueDataType {
  VARCHAR,
  INT,
  DECIMAL,
  BIG_INT,
  BOOLEAN,
}

export interface TableColumnProps {
  key: string;
  dataType: SqlValueDataType;
}

export type valueType = string | number | boolean;

export interface SqlValueProps {
  key: string;
  value?: valueType;
  dataType: SqlValueDataType;
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
  table: PhotoAlbumTable,
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

export const buildSqlInsertValue = (
  table: PhotoAlbumTable,
  columns: TableColumnProps[],
  valuesForMultipleRow: (string | boolean | number)[][]
) => {
  const valueForTableColumn = columns.map((column) => column.key).join(", ");

  const valuesForTableRows = valuesForMultipleRow
    .map((valuesForOneRow) => {
      const sqlValuesForOneRow = valuesForOneRow
        .map((value, i) => {
          return composeSqlValueBasedOnDataType(value, columns[i].dataType);
        })
        .join(", ");

      return `( ${sqlValuesForOneRow})`;
    })
    .join(", ");

  console.log(
    `INSERT INTO ${table} (${valueForTableColumn}) VALUES ${valuesForTableRows}`
  );
  return `INSERT INTO ${table} (${valueForTableColumn}) VALUES ${valuesForTableRows}`;
};

const composeSqlValueBasedOnDataType = (
  value: string | number | boolean,
  dataType: SqlValueDataType
) => {
  let sqlValue;

  if (dataType === SqlValueDataType.VARCHAR) {
    sqlValue = `"${value.toString()}"`;
  }
  if (
    dataType === SqlValueDataType.INT ||
    dataType === SqlValueDataType.BIG_INT
  ) {
    sqlValue = Number(value);
  }

  if (typeof value === "boolean") {
    sqlValue === true ? `1` : `0`;
  }

  return sqlValue;
};
