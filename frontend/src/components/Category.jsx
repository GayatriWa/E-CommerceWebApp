import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { items } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // ✅ group categories dynamically
  const categoryMap = {}

  items.forEach((item) => {
    if (item.category && !categoryMap[item.category]) {
      categoryMap[item.category] = item
    }
  })

  const categories = Object.values(categoryMap)

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-semibold mb-6'>Shop By Category</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/products/${item.category.toLowerCase()}`)
            }
            className='cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition'
          >
            <img
              src={item.image || "https://via.placeholder.com/300"}
              alt={item.category}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300")
              }
              className='w-full h-[250px] object-cover'
            />

            <div className='bg-black/40 text-white text-center py-2'>
              {item.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category