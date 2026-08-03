// src/ShopPublic.jsx
// This is the page customers see when they open your WhatsApp status link

export function ShopPublic({ products }) {
  function order(product) {
    const myNumber = "27821234567" // replace with your real WhatsApp number
    const msg = `Hi, I want: ${product.name} ZAR ${product.price}`
    window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`)
  }

  return (
    <div className="p-4 grid grid-cols-2 gap-3 bg-[#0B0F1A] min-h-screen">
      {products.filter(p => p.is_live).map(p => (
        <div key={p.id} className="bg-[#161C2E] rounded-2xl p-2">
          <img
            src={p.image_url}
            alt={p.name}
            className="h-32 w-full object-cover rounded-xl"
          />
          <h3 className="text-white mt-2 font-medium">{p.name}</h3>
          <p className="text-blue-400 font-bold">ZAR {p.price}</p>
          <button
            onClick={() => order(p)}
            className="w-full mt-2 bg-green-500 text-white rounded-full py-2"
          >
            Order via WhatsApp
          </button>
        </div>
      ))}
    </div>
  )
}
