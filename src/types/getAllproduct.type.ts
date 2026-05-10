export interface getAllproduct {
    success: boolean
    data: Product[]
  }
  
  export interface Product {
    pro_id: number
    pro_name: string
    pro_detail?: string
    pro_price: number | string
    pro_image: string | Record<string, unknown> | null
    pro_qty: number | string
    cate_id: number
    createdAt: string
    updatedAt: string
    category: Category
  }
  
  export interface Category {
    cate_id: number
    cate_name: string
    createdAt: string
    updatedAt: string
  }
  