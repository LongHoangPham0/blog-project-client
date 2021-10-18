export const checkImage = (file: File) => {
    const types = ['image/png', 'image/jpeg', 'image/gif']
    let err = ''
    if(!file) return err = "Tập tin không tồn tại."

    if(file.size > 1024 * 1024) //1mb
        err = 'Kích thước tập tin tối đa là 1mb.'

    if(!types.includes(file.type))
        err = 'Định dạng hình ảnh phải là png, jpeg hoặc gif.'

    return err;
}

export const imageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'x8ieqefl') //upload image using cloudinary
    formData.append('cloud_name', 'dtwo1zjqb')

    const res = await fetch('https://api.cloudinary.com/v1_1/dtwo1zjqb/upload', {
        method: 'POST',
        body: formData
    })

    const data = await res.json()
    return {public_id: data.public_id, url: data.secure_url};
}