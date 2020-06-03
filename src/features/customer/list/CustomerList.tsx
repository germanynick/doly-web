import { Button, Card, Table } from 'antd'
import { PaginationConfig } from 'antd/lib/pagination'
import { SorterResult } from 'antd/lib/table/interface'
import { filter } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'

import { CustomerEntity } from '@core/entities'
import { ExportType } from '@core/enums'
import { exportFile } from '@core/exports'
import { useNSTranslation } from '@core/i18next'
import { IColumn, IDataQuery } from '@core/interfaces'
import { customerService } from '@services'

import { CustomerDeleteButton } from '../delete'
import { CustomerUpdateButton } from '../update'
import { CustomerListHeader } from './CustomerListHeader'

const COLUMNS: IColumn<CustomerEntity>[] = [
  {
    key: 'name',
    title: 'NAME',
    dataIndex: 'name',
    width: 200,
    fixed: 'left',
    export: true,
  },
  {
    key: 'email',
    title: 'EMAIL',
    dataIndex: 'email',
    width: 200,
    export: true,
  },
  {
    key: 'gender',
    title: 'GENDER',
    dataIndex: 'gender',
    width: 150,
    export: true,
  },
  {
    key: 'type',
    title: 'TYPE',
    dataIndex: 'type',
    width: 100,
    export: true,
  },
  {
    key: 'balance',
    title: 'BALANCE',
    dataIndex: 'balance',
    width: 150,
    export: true,
  },
  {
    key: 'phone',
    title: 'PHONE',
    dataIndex: 'phone',
    width: 200,
    export: true,
  },

  {
    key: 'address',
    title: 'ADDRESS',
    dataIndex: 'address',
    width: 200,
    export: true,
  },
  {
    key: 'status',
    title: 'STATUS',
    dataIndex: 'status',
    width: 150,
    export: true,
  },
  {
    key: 'accountNumber',
    title: 'ACCOUNT_NUMBER',
    dataIndex: 'accountNumber',
    width: 200,
    export: true,
  },
]

export interface ICustomerListProps {}

export const CustomerList: React.FunctionComponent<ICustomerListProps> = () => {
  const { t } = useNSTranslation()
  const [sorter, updateSorter] = useState<SorterResult<CustomerEntity>>({})
  const [pagination, updatePagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 10,
  })
  const [fields, handleChangeFields] = useState<string[]>()

  const dataQuery = React.useMemo<IDataQuery>(() => {
    const order: any = sorter?.order && {
      [sorter.field as string]: sorter.order === 'ascend' ? 'ASC' : 'DESC',
    }

    const { current = 0, pageSize = 10 } = pagination
    const offset = (current - 1) * pageSize

    return { order, limit: pageSize, offset, fields }
  }, [sorter, pagination, fields])

  const [{ loading, value }, refetch] = useAsyncFn(() => {
    return customerService.getAll(dataQuery)
  }, [dataQuery])

  const columns = React.useMemo<IColumn<CustomerEntity>[]>(
    () => [
      ...filter(COLUMNS, (column) => (fields ? fields.includes(column.dataIndex as string) : true)),
      {
        key: 'action',
        width: 100,
        fixed: 'right',
        render: (_, { id }) => (
          <Button.Group>
            <CustomerUpdateButton id={id} onSuccess={refetch} />
            <CustomerDeleteButton id={id} onSuccess={refetch} />
          </Button.Group>
        ),
      },
    ],
    [refetch, fields],
  )

  const [, handleExport] = useAsyncFn(
    async (type: ExportType) => {
      const { data } = await customerService.getAll({
        ...dataQuery,
        offset: 0,
        limit: value?.total,
      } as IDataQuery)

      await exportFile('customers', type, columns, data)
    },
    [dataQuery, value],
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <Card
      title={
        <CustomerListHeader
          columns={COLUMNS}
          fields={fields}
          onChangeFields={handleChangeFields}
          onExport={handleExport}
          onCreate={refetch}
        />
      }
      bodyStyle={{ padding: 0 }}
    >
      <Table
        loading={loading}
        rowKey="id"
        dataSource={value?.data}
        scroll={{ x: 300, y: 500 }}
        onChange={(_, __, newSorter: any) => {
          updateSorter(newSorter)
        }}
        pagination={{
          total: value?.total,
          current: pagination?.current,
          pageSize: pagination?.pageSize,
          onChange: (current, pageSize) => updatePagination({ current, pageSize }),
          onShowSizeChange: (current, pageSize) => updatePagination({ current, pageSize }),
        }}
      >
        {columns.map(({ title, ...column }) => {
          return (
            <Table.Column
              {...column}
              title={t(title as string)}
              sorter={!!column.dataIndex}
              sortOrder={column.key === sorter.columnKey ? sorter.order : null}
            />
          )
        })}
      </Table>
    </Card>
  )
}
