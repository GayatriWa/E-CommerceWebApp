import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const onSubmit = async(data) => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", data)

            alert("register succesfully")

            navigate("/")
        } catch (error) {
            console.log(error.response?.data)
            alert("registration failed")
        }
    }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <form onSubmit={handleSubmit(onSubmit)}
            className='bg-white p-8 rounded-2xl shadow-lg w-80'>

            <input type="Name"
            placeholder='Enter a Name'
            {...register("name")} 

            className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input type="email"
            placeholder='Enter a Email'
            {...register("email")} 

            className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input type="password"
            placeholder='********'
            {...register("password")} 

            className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Register</button>
        </form>
    </div>
  )
}

export default Register