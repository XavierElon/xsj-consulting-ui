'use client'
import { CSSProperties } from 'react'
import { productsArray } from '@/__mock__/productStore'
import ProductCard from '@/components/store/ProductCard'
import Layout from '@/components/Layout'

const Store = () => {
  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsArray.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Store
