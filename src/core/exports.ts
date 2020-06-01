import exceljs from "exceljs"
import { filter, map, sum } from "lodash"
import * as pdfMake from "pdfmake/build/pdfmake"
import * as pdfFonts from "pdfmake/build/vfs_fonts"

import { ExportType } from "./enums"
import { IColumn } from "./interfaces"

//@ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs

export const exportPdf = async (
  name: string,
  columns: IColumn[],
  rows: any[]
) => {
  const headers = map(columns, (column) => ({ text: column.title, bold: true }))
  const data = rows.map((row) =>
    columns.map((column) => (column.dataIndex && row[column.dataIndex]) || "")
  )

  const widths = map(columns, (column) => column.width || 100)

  const document = pdfMake.createPdf({
    pageSize: {
      width: sum(widths) + 200,
      height: "auto",
    },
    content: [
      {
        layout: "lightHorizontalLines", // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths,
          body: [headers, ...data],
        },
      },
    ],
  })

  document.download()
}

export const exportExcel = async (
  name: string,
  columns: IColumn[],
  rows: any[]
) => {
  const workbook = new exceljs.Workbook()
  const worksheet = workbook.addWorksheet(name)

  worksheet.columns = map(columns, (column) => ({
    key: column.dataIndex,
    header: column.title,
    width: (column.width || 10) / 10,
  }))
  worksheet.addRows(rows)

  const buffer = await workbook.xlsx.writeBuffer()

  var blob = new Blob([buffer])

  var link = document.createElement("a")
  link.href = window.URL.createObjectURL(blob)
  link.download = `${name}.xlsx`
  link.click()
}

export const exportFile = async (
  name: string,
  type: ExportType,
  columns: IColumn[],
  rows: any[]
) => {
  try {
    const exportColumns = filter(columns, { export: true })

    switch (type) {
      case ExportType.Excel:
        await exportExcel(name, exportColumns, rows)
        break

      case ExportType.Pdf:
        await exportPdf(name, exportColumns, rows)
        break

      default:
        throw new Error(`${type}: Upsupported this file type`)
    }
  } catch (error) {
    console.log(error)
  }
}
