import { Button, Checkbox, Col, Divider, Dropdown, Input, Menu, Row, Space } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { map } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useToggle } from 'react-use'

import { Icon } from '@components/icon'
import { CustomerEntity } from '@core/entities'
import { ExportType } from '@core/enums'
import { useNSTranslation } from '@core/i18next'
import { IOption } from '@core/interfaces'

import { CustomerCreateButton } from '../create'

export interface ICustomerListHeaderProps {
  columns: ColumnProps<CustomerEntity>[]
  fields?: string[]
  onChangeFields: (fields: string[]) => void
  onCreate: () => Promise<any>
  onExport: (type: ExportType) => void
}

export const CustomerListHeader: React.FunctionComponent<ICustomerListHeaderProps> = ({
  columns,
  fields,
  onCreate,
  onChangeFields,
  onExport,
}) => {
  const { t } = useNSTranslation()
  const [innerFields, updateInnerFields] = useState<string[]>([])

  const [filterVisible, toggleFilterVisible] = useToggle(false)

  const options = useMemo<IOption[]>(() => {
    return map(columns, ({ dataIndex, title, fixed }) => ({
      label: t(title as string),
      value: dataIndex as string,
      disabled: !!fixed,
    }))
  }, [columns, t])

  useEffect(() => {
    if (filterVisible) {
      updateInnerFields(fields || (map(columns, 'dataIndex') as string[]))
    }
  }, [filterVisible, fields, columns])

  return (
    <Row justify="space-between">
      <Col>
        <Input
          style={{ width: '250px' }}
          placeholder="Search (Doesn't worked at this time)"
          prefix={<Icon name="SearchOutlined" />}
        />
      </Col>
      <Col>
        <Button.Group>
          <CustomerCreateButton onSuccess={onCreate} />
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu onClick={({ key }) => onExport(key as ExportType)}>
                {Object.entries(ExportType).map(([key, value]) => (
                  <Menu.Item key={value}>
                    <Icon name={`File${key}Filled` as any} /> {key}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button icon={<Icon name="DownloadOutlined" />} />
          </Dropdown>
          <Dropdown
            visible={filterVisible}
            trigger={['click']}
            overlay={
              <Row
                style={{
                  backgroundColor: 'white',
                  maxWidth: '300px',
                  padding: '10px',
                }}
              >
                <Checkbox.Group value={innerFields} onChange={updateInnerFields as any}>
                  <Row>
                    {options.map(({ label, value, disabled }) => (
                      <Col key={value} span={24} md={{ span: 12 }}>
                        <Checkbox style={{ whiteSpace: 'pre' }} value={value} disabled={disabled}>
                          {label}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>

                <Divider style={{ marginBottom: '12px' }} />
                <Row justify="end">
                  <Space>
                    <Button onClick={toggleFilterVisible}>Cancel</Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        onChangeFields(innerFields)
                        toggleFilterVisible()
                      }}
                    >
                      Apply
                    </Button>
                  </Space>
                </Row>
              </Row>
            }
          >
            <Button icon={<Icon name="TableOutlined" />} onClick={toggleFilterVisible} />
          </Dropdown>
        </Button.Group>
      </Col>
    </Row>
  )
}
