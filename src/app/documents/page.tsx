'use client'

import { useRef, useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Download, ZoomIn, ZoomOut } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
  const [zoomLevel, setZoomLevel] = useState(1)

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5))
  }

  const handleMouseWheel = (e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault()
      if (e.deltaY > 0) {
        handleZoomOut()
      } else {
        handleZoomIn()
      }
    }
  }

  useEffect(() => {
    const currentRef = pdfRef.current
    if (currentRef) {
      currentRef.addEventListener('wheel', handleMouseWheel)
      return () => {
        currentRef.removeEventListener('wheel', handleMouseWheel)
      }
    }
  }, [])

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
    <main className="flex flex-col min-h-screen px-8 pt-5 pb-20">
      <div className="flex w-3/5 h-auto z-10 border border-muted-foreground/20 self-center rounded-full fixed bottom-4 mx-auto backdrop-blur-md p-2 px-4">
        <Button
          className="self-end rounded-full"
          variant="default"
          onClick={generatePDF}
        >
          Exportar PDF <Download className="size-4 ml-2" />
        </Button>
        <div className="ml-auto rounded-full border p-1 bg-muted">
          <Button
            className="justify-center rounded-l-full size-7 px-5"
            variant="default"
            onClick={handleZoomOut}
          >
            <ZoomOut className="size-4 mx-auto min-w-4 min-h-4" />
          </Button>
          <Button
            className="justify-center rounded-r-full size-7 px-5"
            variant="default"
            onClick={handleZoomIn}
          >
            <ZoomIn className="size-4 mx-auto min-w-4 min-h-4" />
          </Button>
        </div>
      </div>
      <div
        className="p-4 min-w-[50%] border-4 rounded border-dashed border-muted-foreground/10 text-black mx-auto flex flex-col h-[calc(43vw*1.414)]"
        ref={pdfRef}
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="flex flex-col gap-2 rounded bg-zinc-100 h-full w-full p-6">
          <div className="min-h-24 grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl flex items-center justify-center font-bold">
              LOGO
            </div>
            <div className="bg-white text-black shadow-sm rounded-sm px-4 flex items-center justify-center font-bold col-span-3">
              <span className="font-bold">Nome Empresa:</span>
            </div>
          </div>
          <div className="p-2 mt-2 flex bg-white text-black shadow-sm rounded-sm px-4 items-center">
            <span className="text-center text-lg uppercase w-full font-bold mx-auto">
              FICHA DE PAGAMENTOS
            </span>
          </div>
          <div className="bg-white text-black shadow-sm rounded-sm px-4 p-2 divide-y divide-muted-foreground/20 space-y-2 text-sm">
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
          <div className="bg-white text-black shadow-sm rounded-sm">
            <Table className="border-muted-foreground/20">
              <TableHeader className="border-muted-foreground/20">
                <TableRow className="border-muted-foreground/20">
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-muted-foreground/20">
                {invoices.map((invoice) => (
                  <TableRow
                    className="border-muted-foreground/20"
                    key={invoice.invoice}
                  >
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
              <TableFooter className="bg-zinc-100 border-muted-foreground/20">
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="h-full bg-white text-black shadow-sm rounded-sm px-4 flex items-center justify-center">
            footer
          </div>
        </div>
      </div>
    </main>
  )
}
