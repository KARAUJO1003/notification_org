'use client'
import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Printer, ZoomIn, ZoomOut } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { toast } from 'sonner'

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
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$354600.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$654300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV065407',
    paymentStatus: 'Unpaid',
    totalAmount: '$645300654.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$6546300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV065407',
    paymentStatus: 'Unpaid',
    totalAmount: '$356600.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV06544507',
    paymentStatus: 'Unpai645654d',
    totalAmount: '$300.645600',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV645007',
    paymentStatus: 'Unpaid',
    totalAmount: '$6300.654600',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$6543645006546.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
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

  // const generatePDF = async () => {
  //   if (pdfRef.current) {
  //     const canvas = await html2canvas(pdfRef.current, {
  //       useCORS: true,
  //       allowTaint: true,
  //       logging: true,
  //       scale: 4,
  //     })
  //     const imgData = canvas.toDataURL('image/png')
  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'px',
  //       format: [canvas.width, canvas.height],
  //     })
  //     pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
  //     pdf.save('download.pdf')
  //   }
  // }

  // const handleGeneratePDF = useReactToPrint({
  //   content: () => pdfRef.current,
  // })

  // const pdfGenerator = useCallback(() => {
  //   if (zoomLevel !== 1) return
  //   handleGeneratePDF()
  // }, [zoomLevel, handleGeneratePDF])

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.ctrlKey && e.key === 'p') {
  //       e.preventDefault()
  //       pdfGenerator()
  //     }
  //   }

  //   window.addEventListener('keydown', handleKeyDown)
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [pdfGenerator])
  const generatePDF = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // Largura de uma página A4 em mm
      const pageHeight = 297 // Altura de uma página A4 em mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Adiciona a primeira imagem
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Adiciona páginas se o conteúdo exceder a altura de uma página
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      return pdf
    }
    return null
  }

  const handleDownloadPDF = async () => {
    const pdf = await generatePDF()
    if (pdf) {
      pdf.save('documento.pdf')
      toast.success('PDF baixado com sucesso!')
    }
  }

  const handlePrintPDF = async () => {
    const pdf = await generatePDF()
    if (pdf) {
      pdf.autoPrint() // Aciona a caixa de diálogo de impressão
      window.open(pdf.output('bloburl')) // Abre o PDF em uma nova janela
      toast.success('Preparando a impressão...')
    }
  }

  return (
    <main className="flex flex-col min-h-screen py-4">
      <div className="flex w-3/5 h-auto z-10 border border-muted-foreground/20 self-center rounded-full fixed bottom-4 mx-auto backdrop-blur-md p-2 px-4">
        <Button
          className="rounded-l-full"
          onClick={handlePrintPDF}
          variant="outline"
        >
          <Printer className="mr-2 size-4" /> Imprimir
        </Button>
        <Button
          className="rounded-r-full"
          onClick={handleDownloadPDF}
          variant="outline"
        >
          <Download className="mr-2 size-4" /> Baixar PDF
        </Button>
        <div className="ml-auto rounded-full flex items-center border p-1 bg-muted">
          <Button
            className="justify-center rounded-l-full size-7 px-5"
            variant="default"
            onClick={handleZoomOut}
          >
            <ZoomOut className="size-4 mx-auto min-w-4 min-h-4" />
          </Button>
          <span className="px-4 text-xs font-medium">
            {(zoomLevel * 100).toFixed(0)}%
          </span>
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
        className="min-w-[50%] border-4 rounded border-dashed border-muted-foreground/10 text-black mx-auto flex flex-col h-full"
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
                {invoices.map((invoice, index) => (
                  <TableRow
                    className="border-muted-foreground/20"
                    key={invoice.invoice}
                  >
                    <TableCell className="font-medium pl-4">
                      {index + 1}
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
