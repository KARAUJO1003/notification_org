'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]
export default function Documents() {
  const pdfRef = useRef<HTMLDivElement | null>(null)

  const generatePDF = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: true,
        scale: 4,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save('download.pdf')
    }
  }
  return (
    <main className=" flex flex-col min-h-screen px-8 py-5">
      <Button
        className="self-end"
        variant="default"
        onClick={() => generatePDF()}
      >
        Exportar PDF <Download className="size-4 ml-2" />
      </Button>
      <div
        className="p-4 min-w-[50%] mx-auto flex flex-col h-[calc(43vw*1.414)]"
        ref={pdfRef}
      >
        <div className=" flex flex-col gap-2 border rounded bg-muted dark:bg-muted/30 h-full w-full p-6">
          <div className="min-h-24  grid grid-cols-4 divide-x gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-950 ring-2 ring-offset-4 ring-offset-background  ring-emerald-100 dark:ring-emerald-900 rounded-xl flex items-center justify-center font-bold">
              LOGO
            </div>
            <div className="bg-background shadow-sm rounded-sm px-4 flex items-center justify-center font-bold col-span-3">
              <span className="font-bold">Nome Empresa:</span>
            </div>
          </div>
          <div className="p-2 mt-2 flex bg-background shadow-sm rounded-sm px-4 items-center border">
            <span className="text-center text-lg uppercase w-full font-bold mx-auto">
              FICHA DE PAGAMENTOS
            </span>
          </div>
          <div className="border bg-background shadow-sm rounded-sm px-4 p-2 divide-y space-y-2 text-sm">
            <div className="grid grid-flow-col">
              <span className="font-bold">Nome:</span>
              <span>John Doe</span>
            </div>
            <div className="grid grid-flow-col">
              <span className="font-bold">Nome:</span>
              <span>John Doe</span>
            </div>
            <div className="grid grid-flow-col">
              <span className="font-bold">Nome:</span>
              <span>John Doe</span>
            </div>
            <div className="grid grid-flow-col">
              <span className="font-bold">Nome:</span>
              <span>John Doe</span>
            </div>
            <div className="grid grid-flow-col">
              <span className="font-bold">Nome:</span>
              <span>John Doe</span>
            </div>
            <div className="grid grid-flow-col">
              <span className="font-bold">Nome:</span>
              <span>John Doe</span>
            </div>
          </div>
          <div className="border bg-background shadow-sm rounded-sm ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium pl-4">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right pr-4">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="h-full bg-background shadow-sm rounded-sm px-4 border flex items-center justify-center">
            footer
          </div>
        </div>
      </div>
    </main>
  )
}
