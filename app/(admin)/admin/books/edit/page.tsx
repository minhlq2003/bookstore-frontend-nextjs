'use client'

import { Button, Form, message, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import BookForm from '../BookForm'
import { Book, BookResponse } from '@/types/book'
import axiosClient from '@/lib/axiosClient'
import { useSearchParams } from 'next/navigation'
import { CheckCircleIcon } from 'lucide-react'

const EditBook = () => {
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState<Book | null>(null)
  const [form] = Form.useForm()
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleFetchBook = useCallback(
    async (id: string) => {
      setLoading(true)
      axiosClient
        .get<BookResponse>(`/books/${id}`)
        .then(res => {
          setBook(res.data.data)
          form.setFieldsValue(res.data.data)
          form.setFieldsValue({
            category: res.data.data.category?.id,
            publisher: res.data.data.publisher?.id,
            discount: res.data.data.discount?.id,
          })
          setUploadedImages(res.data.data.bookImages.map(image => image.url))
        })
        .catch(() => {})

      setLoading(false)
    },
    [form]
  )

  const onFinish = async (values: Book) => {
    const slug = values.title.trim().replace(/\s+/g, '-').toLowerCase()
    const dataPayload = {
      title: values.title,
      author: values.author,
      price: values.price,
      pages: values.pages,
      publishYear: values.publishYear,
      categoryId: values.category,
      publisherId: values.publisher,
      discountCode: values.discount,
      bookImages: uploadedImages.map(url => ({ url })),
      description: values.description,
      size: values.size,
      weight: values.weight,
      slug: slug,
    }

    try {
      axiosClient.put(`/books/${id}`, dataPayload)
      message.success('Book updated successfully!')
      form.resetFields()
      router.push('/admin/books')
    } catch {
      message.error('Failed to update book. Please try again.')
    }
  }

  useEffect(() => {
    if (id) {
      handleFetchBook(id)
    }
  }, [id, handleFetchBook])

  return (
    <div className='min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10'>
      {loading ? (
        <div className='flex items-center justify-center min-h-[500px]'>
          <Spin size='large' />
        </div>
      ) : (
        <div className='p-4 w-full'>
          <Space>
            <Title level={2}>Chỉnh sửa sách</Title>
          </Space>
          <div className='flex justify-between'>
            <BookForm
              form={form}
              onFinish={onFinish}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
            />
          </div>
          <Button
            type='primary'
            htmlType='submit'
            onClick={() => onFinish(form.getFieldsValue())}
            icon={<CheckCircleIcon />}
          >
            Lưu thay đổi
          </Button>
        </div>
      )}
    </div>
  )
}

export default EditBook
