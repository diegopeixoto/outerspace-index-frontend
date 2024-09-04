'use client'
import { useState } from 'react'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import Category from '@/components/Category'
import Header from '@/components/Header'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Download } from 'lucide-react'

const urlSchema = z.string().url()

export default function AddLink() {
  const [url, setUrl] = useState('')
  const [jsonPreview, setJsonPreview] = useState('')
  const [error, setError] = useState('')

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setError('')
  }

  const generateJson = () => {
    try {
      urlSchema.parse(url)
      const sanitizedUrl = encodeURI(url)
      const json = JSON.stringify({ url: sanitizedUrl }, null, 2)
      setJsonPreview(json)
      setError('')
    } catch (err) {
      setError('URL inválida. Por favor, insira uma URL válida.')
      setJsonPreview('')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(jsonPreview)
      .then(() => alert('JSON copiado para a área de transferência!'))
      .catch((err) => console.error('Erro ao copiar: ', err))
  }

  const downloadJson = () => {
    if (jsonPreview) {
      const blob = new Blob([jsonPreview], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${uuidv4()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-[800px] bg-[#1b1c21] w-full mx-auto p-4 h-screen">
        <Category
          title="Adicionar Links"
          description="Importe links do Forum Outer Space e gere o json para ser adicionado a lista."
        />
        <form onSubmit={(e) => e.preventDefault()} className="mt-4">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="ex: https://forum.outerspace.com.br/index.php?threads/..."
            className="w-full p-2 mb-2 bg-[#2a2b30] text-white rounded"
          />
          <button
            onClick={generateJson}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Gerar JSON
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {jsonPreview && (
          <div className="mt-4 bg-[#2a2b30] rounded overflow-hidden">
            <div className="flex justify-end p-2 bg-[#1e1e1e]">
              <button
                onClick={copyToClipboard}
                className="text-white p-1 rounded mr-2 hover:bg-blue-500 transition-colors"
                title="Copiar JSON"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={downloadJson}
                className="text-white p-1 rounded hover:bg-green-500 transition-colors"
                title="Download JSON"
              >
                <Download size={20} />
              </button>
            </div>
            <SyntaxHighlighter language="json" style={darcula}>
              {jsonPreview}
            </SyntaxHighlighter>
          </div>
        )}
        <div className="mt-4 text-white">
          <h3 className="text-xl font-bold">Instruções para envio:</h3>
          <ol className="list-decimal list-inside mt-2">
            <li>
              <Link
                href="https://github.com/diegopeixoto/outerspace-index-data/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                Crie uma issue no GitHub
              </Link>{' '}
              com o JSON gerado
            </li>
            <li>
              <Link
                href="https://github.com/diegopeixoto/outerspace-index-data/compare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                Faça um pull request
              </Link>{' '}
              incluindo o arquivo JSON gerado
            </li>
            <li>
              Envie um email para{' '}
              <Link
                href="mailto:outerspace+contato@diegopeixoto.com"
                className="text-blue-400"
              >
                outerspace+contato@diegopeixoto.com
              </Link>{' '}
              com o arquivo JSON anexado
            </li>
          </ol>
        </div>
      </main>
    </>
  )
}
