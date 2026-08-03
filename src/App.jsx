import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function App() {
  const [products, setProducts] = useState([])
  const shopId = "brig_shop_id" // your shop id
  const shopLink = `https://yoursite.com/shop/${shopId}`
  const myWhatsApp = "27821234567" // YOUR NUMBER - no +

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('shop_id', shopId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error(error)
    } else {
      setProducts(data || [])
    }
  }

  async function deleteProduct(id) {
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  function orderWhatsApp(product) {
    const msg = `Hi! I want to order:\n*${product.name}*\nPrice: ZAR ${product.price}\nIs it still available?`
    window.open(`https://wa.me/${myWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">My Status <span className="text-blue-500">Shop</span></h1>
        <button className="text-sm opacity-60">Sign out</button>
      </div>

      {/* STATUS LINK CARD */}
      <div className="bg-[#161C2E] rounded-[24px] p-5 mb-6">
        <p className="text-xs tracking-[2px] text-gray-400">YOUR STATUS LINK</p>
        <p className="truncate mt-2 font-medium">{shopLink}</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigator.clipboard.writeText(shopLink)}
            className="flex-1 bg-blue-500 rounded-full py-2"
          >
            Copy Link
          </button>
          <button className="bg-[#232A3E] rounded-full px-6">Preview</button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <button className="bg-blue-500 rounded-full px-5 py-2">+ Add</button>
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="bg-[#161C2E] rounded-[24px] p-3 flex gap-3 items-center">
            <img src={p.image_url} className="w-20 h-20 rounded-2xl object-cover" alt={p.name} />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium truncate w-40">{p.name}</h3>
                <span className="text-blue-400 font-bold">ZAR {p.price}</span>
              </div>
              <p className="text-sm text-gray-400">{p.description || "No description"}</p>
              <span className="text-xs bg-green-900/40 text-green-400 px-2 py-1 rounded-full">LIVE</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => orderWhatsApp(p)}
                className="text-xs bg-green-600 rounded-full px-3 py-1"
              >
                WhatsApp
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
                className="text-gray-500 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
