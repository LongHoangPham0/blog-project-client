import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FormSubmit, RootStore, ICategory } from '../utils/typeScript';

import { createCategory, updateCategory, deleteCategory } from '../redux/actions/categoryAction'

import NotFound from '../components/global/notFound' 

const Category = () => {
    const [name, setName] = useState('')
    const [edit, setEdit] = useState<ICategory | null>(null)

    const { auth, categories } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if(edit) setName(edit.name)
    }, [edit])

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        if(!auth.access_token || !name) return;

        if (edit) {
            if(edit.name === name) return;
            const data = {...edit, name}
            dispatch(updateCategory(data, auth.access_token))
        } else {
            dispatch(createCategory(name, auth.access_token))
        }
        setName('')
        setEdit(null)
    }

    const handleDelete = (id: string) => {
        // console.log(id)
        if(!auth.access_token) return;
        if(window.confirm('Bạn có muốn xóa bài viết này? Thao tác này sẽ không thể hoàn lại')){
            dispatch(deleteCategory(id, auth.access_token))
        }
    }

    if(auth.user?.role !== 'admin') return <NotFound />
    return (
        <div className='category'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category'>Tạo thể loại</label>

                <div className='d-flex align-items-center'>
                    {
                        edit && <i className="fas fa-times me-2 text-danger" 
                        style={{cursor: 'pointer'}}
                        onClick={() => setEdit(null)} />
                    }
                    <input type='text' name='category' id='category' value={name} 
                    onChange={e => setName(e.target.value)} />

                    <button type='submit'>
                        { edit ? 'Cập nhập' : 'Tạo '}
                    </button>
                </div>
            </form>
        
            <div>
                {
                categories.map(category => (
                    <div className="category_row" key={category._id}>
                    <p className="m-0 text-capitalize">{category.name}</p>

                    <div>
                        <i className="fas fa-edit mx-2" onClick={() => setEdit(category)} />
                        <i className="fas fa-trash-alt" onClick={() => handleDelete(category._id)} />
                    </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Category
